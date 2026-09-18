export type AskEvent =
  | { type: "token"; delta: string }
  | { type: "audio"; text: string; audioBase64: string }
  | { type: "audio_error"; text: string; error: string }
  | { type: "needs_human" }
  | { type: "error"; error: string }
  | { type: "done"; answer: string };

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

function parseSseBlock(block: string): AskEvent | null {
  let eventName = "message";
  let dataLine: string | null = null;

  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) {
      eventName = line.slice("event:".length).trim();
    } else if (line.startsWith("data:")) {
      dataLine = line.slice("data:".length).trim();
    }
  }

  if (dataLine === null) return null;
  const data = JSON.parse(dataLine);

  switch (eventName) {
    case "token":
      return { type: "token", delta: data.delta };
    case "audio":
      return { type: "audio", text: data.text, audioBase64: data.audio_base64 };
    case "audio_error":
      return { type: "audio_error", text: data.text, error: data.error };
    case "needs_human":
      return { type: "needs_human" };
    case "error":
      return { type: "error", error: data.error };
    case "done":
      return { type: "done", answer: data.answer };
    default:
      return null;
  }
}

/** Parses a raw SSE response body into discrete AskEvents, in order. */
export async function* parseSseStream(body: ReadableStream<Uint8Array>): AsyncGenerator<AskEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let boundary: number;
      while ((boundary = buffer.indexOf("\n\n")) !== -1) {
        const rawEvent = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const parsed = parseSseBlock(rawEvent);
        if (parsed) yield parsed;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/** Calls /api/ask and yields events as they stream in. Throws RateLimitError
 * on a 429 (with the backend's message), or a plain Error for anything else. */
export async function* streamAsk(
  apiBaseUrl: string,
  sessionId: string,
  question: string,
  signal?: AbortSignal,
): AsyncGenerator<AskEvent> {
  const response = await fetch(`${apiBaseUrl}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, question }),
    signal,
  });

  if (response.status === 429) {
    let message = "You've reached today's call limit. Please try again later.";
    try {
      const body = await response.json();
      message = body?.detail?.message ?? message;
    } catch {
      // fall back to default message
    }
    throw new RateLimitError(message);
  }

  if (!response.ok || !response.body) {
    throw new Error(`/api/ask failed with status ${response.status}`);
  }

  yield* parseSseStream(response.body);
}

export function base64WavToObjectUrl(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

/** Submits contact info after a NEEDS_HUMAN answer so Laeeq can follow up
 * personally. Returns whether an email notification actually went out -
 * the lead is saved either way, this is just informational. */
export async function submitLead(
  apiBaseUrl: string,
  sessionId: string,
  name: string,
  contact: string,
  question: string,
): Promise<{ notified: boolean }> {
  const response = await fetch(`${apiBaseUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, name: name || null, contact, question }),
  });

  if (!response.ok) {
    throw new Error(`/api/leads failed with status ${response.status}`);
  }

  return response.json();
}
