import Image from "next/image";
import Card from "@/components/Card";
import { ProjectLinks, ProjectStatus } from "@/components/ProjectCard";
import type { Project } from "@/data/cv";

export default function FeaturedProject({ project }: { project: Project }) {
  const previewUrl = project.liveUrl ?? project.links[0]?.href;

  return (
    <Card className="group overflow-hidden rounded-xl">
      {/* Full-width screenshot, sized to the image's own aspect ratio so
          nothing is cropped. */}
      {project.image && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          className="block border-b border-border bg-surface-2 p-3 sm:p-6 md:p-10"
        >
          <div
            className="relative w-full overflow-hidden rounded-lg border border-border shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)]"
            style={{ aspectRatio: project.imageAspect ?? "16/9" }}
          >
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              sizes="(min-width: 1152px) 64rem, 100vw"
              priority
            />
          </div>
        </a>
      )}

      <div className="grid gap-8 p-6 md:grid-cols-[1.3fr_1fr] md:gap-12 md:p-10">
        <div>
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-accent">Featured</span>
            <ProjectStatus project={project} />
          </p>
          <h3 className="font-display text-5xl leading-[1.02] text-foreground md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-5 leading-relaxed text-foreground/70">{project.description}</p>
        </div>
        <div className="flex flex-col justify-end gap-6">
          <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
            {project.tags.map((tag) => (
              <span key={tag}>#{tag.toLowerCase().replace(/[\s/]+/g, "-")}</span>
            ))}
          </p>
          <ProjectLinks project={project} />
        </div>
      </div>
    </Card>
  );
}
