"use client";

import { useState } from "react";
import { Cloud, Code2, LayoutTemplate, Server, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ToolGroup } from "@/lib/skillUsage";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: LayoutTemplate,
  Mobile: Smartphone,
  Backend: Server,
  "Cloud & Tools": Cloud,
  AI: Sparkles,
};

function CategoryCard({ group }: { group: ToolGroup }) {
  const [active, setActive] = useState<string | null>(null);
  const tool = group.tools.find((t) => t.name === active);
  const hasUses = group.tools.some((t) => t.uses.length > 0);
  const Icon = CATEGORY_ICONS[group.category] ?? Sparkles;

  return (
    <div className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/25">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/15 blur-[60px] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />
      <div className="relative flex items-center gap-2.5">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon size={15} strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-2xl text-foreground">{group.category}</h3>
      </div>
      <ul className="relative mt-5 flex flex-wrap gap-2">
        {group.tools.map((t) => {
          const isActive = t.name === active;
          return (
            <li key={t.name}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(isActive ? null : t.name)}
                onMouseEnter={() => setActive(t.name)}
                onMouseLeave={() =>
                  setActive((current) => (current === t.name ? null : current))
                }
                onFocus={() => setActive(t.name)}
                onBlur={() =>
                  setActive((current) => (current === t.name ? null : current))
                }
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-border text-foreground/85 hover:border-foreground/40"
                }`}
              >
                {t.name}
              </button>
            </li>
          );
        })}
      </ul>

      {hasUses && (
        <p aria-live="polite" className="mt-auto pt-5 text-sm text-muted">
          {!tool ? (
            "Tap a skill to see where I've used it."
          ) : tool.uses.length === 0 ? (
            <>
              <span className="text-foreground">{tool.name}</span>: used in coursework and
              practice.
            </>
          ) : (
            <>
              <span className="text-foreground">{tool.name}</span> used in{" "}
              {tool.uses.map((use, i) => (
                <span key={use.label}>
                  {i > 0 && (i === tool.uses.length - 1 ? " and " : ", ")}
                  {use.href ? (
                    <a
                      href={use.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline-offset-4 hover:underline"
                    >
                      {use.label}
                    </a>
                  ) : (
                    <span className="text-foreground/85">{use.label}</span>
                  )}
                </span>
              ))}
              .
            </>
          )}
        </p>
      )}
    </div>
  );
}

/**
 * Skills grouped by category, all visible at once. Hovering or tapping a skill
 * shows the projects and roles on the site that use it.
 */
export default function Toolbelt({ groups: allGroups }: { groups: ToolGroup[] }) {
  // Lead with the AI tools: they're the heart of the work.
  const groups = [
    ...allGroups.filter((g) => g.category === "AI"),
    ...allGroups.filter((g) => g.category !== "AI"),
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <CategoryCard key={group.category} group={group} />
      ))}
    </div>
  );
}
