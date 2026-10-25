import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Card from "@/components/Card";
import type { Project } from "@/data/cv";

export function ProjectStatus({ project }: { project: Project }) {
  const isLive = project.status === "Completed · Deployed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] ${
        isLive ? "text-accent" : "text-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-accent animate-pulse-dot" : "border border-muted"}`}
      />
      {isLive ? "live in production" : "shipped"}
    </span>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && project.links.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1 font-semibold text-foreground transition-colors hover:text-accent"
        >
          Visit live site
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      )}
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-muted transition-colors hover:text-accent"
        >
          {link.label}
          <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const previewUrl = project.liveUrl ?? project.links[0]?.href;

  return (
    <Card className="group flex h-full flex-col rounded-xl p-5 md:p-6">
      {project.image && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          className="relative mb-5 block w-full overflow-hidden rounded-xl border border-border bg-surface-2"
          style={{ aspectRatio: project.imageAspect ?? "16/9" }}
        >
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 32rem, 100vw"
          />
        </a>
      )}

      <div className="mb-3 flex items-center justify-between gap-3">
        <ProjectStatus project={project} />
        {index !== undefined && (
          <span className="font-mono text-[11px] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <h3 className="font-display text-3xl leading-tight text-foreground">{project.name}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
        {project.description}
      </p>

      <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
        {project.tags.map((tag) => (
          <span key={tag}>#{tag.toLowerCase().replace(/[\s/]+/g, "-")}</span>
        ))}
      </p>

      {(project.liveUrl || project.links.length > 0) && (
        <div className="mt-5 border-t border-border pt-4">
          <ProjectLinks project={project} />
        </div>
      )}
    </Card>
  );
}
