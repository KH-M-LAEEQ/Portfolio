import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/cv";

type Chunk =
  | { type: "featured"; project: Project }
  | { type: "grid"; items: Project[]; heading?: string };

const GROUP_HEADINGS = {
  selected: "Selected Projects",
  coursework: "Coursework & Learning Projects",
} as const;

function chunkProjects(items: Project[], showGroupLabels: boolean): Chunk[] {
  if (!showGroupLabels) {
    const chunks: Chunk[] = [];
    let buffer: Project[] = [];

    for (const project of items) {
      if (project.featured) {
        if (buffer.length) {
          chunks.push({ type: "grid", items: buffer });
          buffer = [];
        }
        chunks.push({ type: "featured", project });
      } else {
        buffer.push(project);
      }
    }
    if (buffer.length) chunks.push({ type: "grid", items: buffer });

    return chunks;
  }

  // Grouped mode: featured project(s) first, then selected work, then
  // coursework/learning projects — surfacing the existing "group" field
  // instead of leaving selected and coursework projects interleaved.
  const chunks: Chunk[] = [];
  const featured = items.filter((p) => p.featured);
  const rest = items.filter((p) => !p.featured);
  const selected = rest.filter((p) => p.group !== "coursework");
  const coursework = rest.filter((p) => p.group === "coursework");

  for (const project of featured) {
    chunks.push({ type: "featured", project });
  }
  if (selected.length) {
    chunks.push({ type: "grid", items: selected, heading: GROUP_HEADINGS.selected });
  }
  if (coursework.length) {
    chunks.push({ type: "grid", items: coursework, heading: GROUP_HEADINGS.coursework });
  }

  return chunks;
}

export default function ProjectList({
  projects,
  showGroupLabels = false,
}: {
  projects: Project[];
  showGroupLabels?: boolean;
}) {
  const chunks = chunkProjects(projects, showGroupLabels);

  return (
    <div className="space-y-8">
      {chunks.map((chunk, i) =>
        chunk.type === "featured" ? (
          <Reveal key={chunk.project.slug}>
            <FeaturedProject project={chunk.project} />
          </Reveal>
        ) : (
          <div key={`grid-${i}`}>
            {chunk.heading && (
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                {chunk.heading}
              </h2>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              {chunk.items.map((project, j) => (
                <Reveal key={project.slug} delay={Math.min(j * 60, 240)}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
