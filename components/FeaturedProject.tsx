import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/cv";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-surface shadow-md">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Featured Project
          </p>
          <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
            {project.name}
          </h3>
          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {project.status}
          </span>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-2 px-2 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 font-medium text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
              >
                Visit Live Site
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-border px-4 py-2 font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                {link.label}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center border-t border-border bg-surface-2 p-6 md:border-l md:border-t-0 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_60%)]" />
          {project.image ? (
            <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 truncate rounded bg-surface px-2 py-0.5 text-[11px] text-muted">
                  www.grantpilot.works
                </span>
              </div>
              <div className="relative aspect-video w-full">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 24rem, 100vw"
                />
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 truncate rounded bg-surface px-2 py-0.5 text-[11px] text-muted">
                  www.grantpilot.works
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="h-3 w-2/3 rounded bg-surface-2" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-14 rounded bg-surface-2" />
                  <div className="h-14 rounded border border-accent/30 bg-accent/5" />
                  <div className="h-14 rounded bg-surface-2" />
                </div>
                <div className="h-2 w-full rounded bg-surface-2" />
                <div className="h-2 w-5/6 rounded bg-surface-2" />
                <div className="h-2 w-3/4 rounded bg-surface-2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
