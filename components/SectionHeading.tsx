import type { ReactNode } from "react";
import { getSection } from "@/lib/sections";

/**
 * Editorial section opener: a ruled line with the section number and label in
 * small mono, then the title in the display serif.
 */
export default function SectionHeading({
  id,
  title,
  intro,
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  const section = getSection(id);

  return (
    <div className="mb-12 md:mb-16">
      <p className="border-t border-foreground/70 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span className="text-accent">{section.number}</span> — {section.label}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <h2 className="font-display text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.01em] text-foreground">
          {title}
        </h2>
        {intro && (
          <p className="max-w-sm text-sm leading-relaxed text-muted md:pb-1.5 md:text-right">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
