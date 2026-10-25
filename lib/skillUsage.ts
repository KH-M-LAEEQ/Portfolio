import { experience, projects, skillGroups } from "@/data/cv";

export type SkillUse = {
  kind: "project" | "role";
  label: string;
  href?: string;
};

export type ToolGroup = {
  category: string;
  tools: { name: string; uses: SkillUse[] }[];
};

// Search terms per skill when the skill name alone would miss or over-match.
// An empty list means "don't try to match" (e.g. "C" would match everything).
const ALIASES: Record<string, string[]> = {
  C: [],
  XML: [],
  Postman: [],
  "Next.js": ["next.js", "nextjs"],
  "LLM Applications": ["llm", "llms"],
  "Agentic AI": ["agentic", "agent", "agents"],
  "Vector Databases": ["vector database", "vector databases", "pgvector"],
  Embeddings: ["embedding", "embeddings"],
  "REST APIs": ["rest api", "rest apis"],
  "Android SDK": ["android"],
  "AWS EC2": ["aws ec2", "ec2"],
  "AWS EKS": ["eks"],
  "AWS DynamoDB": ["dynamodb"],
  "AWS S3": ["s3"],
  "AWS CloudWatch": ["cloudwatch"],
};

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matcher(skill: string) {
  const terms = ALIASES[skill] ?? [skill];
  if (terms.length === 0) return null;
  // Whole-word match so "Java" doesn't hit "JavaScript" and "Git" doesn't hit "GitHub".
  return new RegExp(
    `(^|[^a-z0-9])(${terms.map(escapeRegex).join("|")})($|[^a-z0-9+])`,
    "i",
  );
}

/** For every skill, where it actually shows up across projects and roles. */
export function buildToolGroups(): ToolGroup[] {
  const sources: (SkillUse & { text: string })[] = [
    ...projects.map((p) => ({
      kind: "project" as const,
      label: p.name,
      href: p.liveUrl ?? p.links[0]?.href,
      text: `${p.name} ${p.description} ${p.tags.join(" ")}`,
    })),
    ...experience.map((e) => ({
      kind: "role" as const,
      label: `${e.company} internship`,
      text: `${e.role} ${e.description}`,
    })),
  ];

  return skillGroups.map((group) => ({
    category: group.category,
    tools: group.skills.map((name) => {
      const re = matcher(name);
      const uses = re
        ? sources.filter((s) => re.test(s.text)).map(({ kind, label, href }) => ({ kind, label, href }))
        : [];
      return { name, uses };
    }),
  }));
}
