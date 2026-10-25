"use client";

import { useState } from "react";
import type { ToolGroup } from "@/lib/skillUsage";

function CategoryCard({ group }: { group: ToolGroup }) {
  const [active, setActive] = useState<string | null>(null);
  const tool = group.tools.find((t) => t.name === active);
  const hasUses = group.tools.some((t) => t.uses.length > 0);

  return (
    <div className="card flex h-full flex-col rounded-xl p-6">
      <h3 className="font-display text-2xl text-foreground">{group.category}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.tools.map((t) => {
          const isActive = t.name === active;
          return (
            <li key={t.name}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(isActive ? null : t.name)}
                onMouseEnter={() => setActive(t.name)}
                onFocus={() => setActive(t.name)}
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
