import {
  profile,
  education,
  experience,
  projects,
  skillGroups,
  certifications,
  articles,
} from "@/data/cv";

export type ChunkCategory =
  | "profile"
  | "education"
  | "skills"
  | "project"
  | "experience"
  | "certifications"
  | "articles";

export type Chunk = {
  id: string;
  category: ChunkCategory;
  text: string;
};

// Each chunk is one retrievable, self-contained unit of knowledge about
// ${profile.name}, derived from the same data/cv.ts the rest of the site
// renders from. Chunked at the "natural entity" level (one project, one job,
// one grouped list) rather than one per sentence — coarse enough that each
// chunk stands alone and answers a plausible visitor question by itself.
export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    category: "profile",
    text: `${profile.name} — ${profile.title}, based in ${profile.location}.\n${profile.summary}\nContact: email ${profile.email}, LinkedIn ${profile.linkedin}, GitHub ${profile.github}.`,
  });

  chunks.push({
    id: "education",
    category: "education",
    text: `Education:\n${education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`).join("\n")}`,
  });

  chunks.push({
    id: "skills",
    category: "skills",
    text: `Skills:\n${skillGroups.map((g) => `- ${g.category}: ${g.skills.join(", ")}`).join("\n")}`,
  });

  for (const p of projects) {
    // liveUrl and the GitHub repo are different things the model needs
    // separately — the get_github_repo tool needs the actual repo URL, which
    // previously got shadowed whenever a project also had a liveUrl.
    const githubLink = p.links.find(
      (l) => l.label.toLowerCase().includes("github") || l.href.includes("github.com")
    )?.href;
    const otherLink = p.liveUrl ?? p.links.find((l) => l.href !== githubLink)?.href;
    chunks.push({
      id: `project:${p.slug}`,
      category: "project",
      text: `Project — ${p.name} (${p.status}): ${p.description} Built with: ${p.tags.join(", ")}.${
        otherLink ? ` Link: ${otherLink}` : ""
      }${githubLink ? ` GitHub repo: ${githubLink}` : ""}`,
    });
  }

  for (const [i, e] of experience.entries()) {
    chunks.push({
      id: `experience:${i}`,
      category: "experience",
      text: `Experience — ${e.role} at ${e.company} (${e.period}): ${e.description}`,
    });
  }

  chunks.push({
    id: "certifications",
    category: "certifications",
    text: `Certifications:\n${certifications.map((c) => `- ${c.courseTitle ?? c.name}${c.issuer ? ` (${c.issuer})` : ""}`).join("\n")}`,
  });

  for (const [i, a] of articles.entries()) {
    const status = a.upcoming
      ? " (not yet published — don't offer a link for this one, just say it's upcoming)"
      : a.publication
        ? ` (${a.publication})`
        : "";
    chunks.push({
      id: `article:${i}`,
      category: "articles",
      text: `Article — "${a.title}"${status}: ${a.description ?? "No summary available."}${
        a.href ? ` Link: ${a.href}` : ""
      }`,
    });
  }

  return chunks;
}

// Always included regardless of retrieval score — baseline identity/contact
// info that's relevant to nearly every question, not just ones that happen
// to be semantically close to it.
export const PINNED_CHUNK_ID = "profile";

// Semantic search alone doesn't cleanly separate "list every project" from
// "what are your skills" — for a small, categorized corpus like this one,
// all project chunks score in the same narrow band as unrelated categories,
// with no natural similarity cutoff between them (verified empirically: the
// gap between the lowest-scoring project chunk and the highest-scoring
// unrelated chunk was under 0.02). A "list everything in category X" intent
// is a lexical signal, not a semantic-similarity one, so it's matched with
// keywords here and merged with the semantic results — a small hybrid
// retrieval step, not a full replacement for embeddings.
const CATEGORY_KEYWORDS: Record<ChunkCategory, RegExp> = {
  project: /\bproject/i,
  skills: /\bskills?\b|\btech(nolog(y|ies))?\b|\bstack\b|\blanguages?\b|\bframeworks?\b/i,
  experience: /\bexperience|\bwork(ed)?\b|\bjobs?\b|\brole\b|\bintern(ship)?/i,
  certifications: /\bcertificat/i,
  articles: /\barticles?\b|\bwrit(e|ing|ten)\b|\bblog\b|\bmedium\b/i,
  education: /\beducation|\bdegree|\bstudi(ed|es)|\buniversity|\bcollege/i,
  profile: /\bwho are you|\babout you\b/i,
};

export function detectBroadCategory(query: string): ChunkCategory | null {
  for (const [category, pattern] of Object.entries(CATEGORY_KEYWORDS) as [ChunkCategory, RegExp][]) {
    if (pattern.test(query)) return category;
  }
  return null;
}
