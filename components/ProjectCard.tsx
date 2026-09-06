import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/cv";

export default function ProjectCard({ project }: { project: Project }) {
  const isDeployed = project.status === "Completed · Deployed";
  const previewUrl = project.liveUrl ?? project.links[0]?.href;

  return (
    <div className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_18%,transparent)]">
      {project.image && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} live site`}
          className="group/preview relative mb-4 block aspect-[1900/867] w-full overflow-hidden rounded-lg border border-border bg-surface-2"
        >
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            className="object-contain transition-transform duration-500 group-hover/preview:scale-[1.03]"
            sizes="(min-width: 768px) 24rem, 100vw"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
            Visit live site
            <ArrowUpRight size={13} />
          </span>
        </a>
      )}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
        <span
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            isDeployed
              ? "border-accent/30 bg-accent/5 text-accent"
              : "border-border text-muted"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDeployed ? "bg-accent" : "bg-muted"
            }`}
          />
          {project.status}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/70">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.links.length > 0) && (
        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Visit Live Site
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-accent"
            >
              {link.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
