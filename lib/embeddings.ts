import OpenAI from "openai";
import { buildChunks, detectBroadCategory, PINNED_CHUNK_ID, type Chunk } from "@/lib/knowledge";

// The OpenAI SDK's constructor throws synchronously if apiKey is falsy,
// which would crash this module at import time (before getChatReply's own
// "no key -> use placeholder" check in lib/llm.ts ever runs) whenever
// NVIDIA_API_KEY isn't set. The placeholder string just needs to be
// non-empty to satisfy the constructor — this client is never actually
// called when the real key is missing.
const nvidia = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || "placeholder-key-not-configured",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const EMBEDDING_MODEL = "nvidia/nemotron-3-embed-1b";
const TOP_K = 5;

async function embed(texts: string[], inputType: "query" | "passage"): Promise<number[][]> {
  console.log("NVIDIA embeddings request:", { baseURL: nvidia.baseURL, model: EMBEDDING_MODEL, inputType });
  const response = await nvidia.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    // @ts-expect-error input_type is an NVIDIA NIM extension, not in the OpenAI SDK's types
    input_type: inputType,
  });
  return response.data.map((d) => d.embedding as unknown as number[]);
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

type Index = { chunks: Chunk[]; vectors: number[][] };

// Built once per warm server instance and reused — 17 short chunks is cheap
// enough to embed at cold start, and re-embedding on every request would
// just be latency and cost for a corpus that doesn't change at runtime.
let indexPromise: Promise<Index> | null = null;

function getIndex(): Promise<Index> {
  if (!indexPromise) {
    indexPromise = (async () => {
      const chunks = buildChunks();
      const vectors = await embed(
        chunks.map((c) => c.text),
        "passage"
      );
      return { chunks, vectors };
    })();
    // If embedding the corpus failed, don't cache the rejection forever —
    // let the next call retry instead of permanently breaking retrieval.
    indexPromise.catch(() => {
      indexPromise = null;
    });
  }
  return indexPromise;
}

/**
 * Retrieves the chunks relevant to `query`: the top-K by cosine similarity
 * (handles specific questions — "tell me about the Fake News Detector"),
 * merged with every chunk in a category the query names outright (handles
 * enumerate-everything questions — "what projects have you built" — where
 * semantic similarity alone can't tell "list all projects" apart from
 * "what are your skills"; see detectBroadCategory in lib/knowledge.ts),
 * plus the always-included profile/contact chunk. Falls back to the entire
 * knowledge base if embedding fails, so a flaky embeddings call degrades to
 * "answer from everything" rather than "answer from nothing."
 */
export async function retrieveRelevantChunks(query: string): Promise<Chunk[]> {
  try {
    const { chunks, vectors } = await getIndex();
    const [queryVector] = await embed([query], "query");

    const scored = chunks
      .map((chunk, i) => ({ chunk, score: cosineSimilarity(queryVector, vectors[i]) }))
      .sort((a, b) => b.score - a.score);

    const selected = new Map<string, Chunk>();
    for (const s of scored.slice(0, TOP_K)) selected.set(s.chunk.id, s.chunk);

    const broadCategory = detectBroadCategory(query);
    if (broadCategory) {
      for (const chunk of chunks) {
        if (chunk.category === broadCategory) selected.set(chunk.id, chunk);
      }
    }

    const pinned = chunks.find((c) => c.id === PINNED_CHUNK_ID);
    if (pinned) selected.set(pinned.id, pinned);

    return [...selected.values()];
  } catch (err) {
    const status = (err as { status?: number } | undefined)?.status;
    console.error("RAG retrieval failed, falling back to full knowledge base:", {
      baseURL: nvidia.baseURL,
      model: EMBEDDING_MODEL,
      status,
      message: err instanceof Error ? err.message : String(err),
      body: (err as { error?: unknown } | undefined)?.error,
    });
    return buildChunks();
  }
}
