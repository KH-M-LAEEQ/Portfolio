import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/cv";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" />
        </Reveal>

        {featured && (
          <Reveal className="mb-8">
            <FeaturedProject project={featured} />
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 60, 240)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
