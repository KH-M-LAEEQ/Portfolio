import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/cv";

type Chunk = { type: "featured"; project: Project } | { type: "grid"; items: Project[] };

function chunkProjects(items: Project[]): Chunk[] {
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

export default function Projects() {
  const chunks = chunkProjects(projects);

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" />
        </Reveal>

        <div className="space-y-8">
          {chunks.map((chunk, i) =>
            chunk.type === "featured" ? (
              <Reveal key={chunk.project.slug}>
                <FeaturedProject project={chunk.project} />
              </Reveal>
            ) : (
              <div key={`grid-${i}`} className="grid gap-6 md:grid-cols-2">
                {chunk.items.map((project, j) => (
                  <Reveal key={project.slug} delay={Math.min(j * 60, 240)}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
