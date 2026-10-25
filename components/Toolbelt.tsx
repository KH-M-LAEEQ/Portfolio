"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SkillUse, ToolGroup } from "@/lib/skillUsage";

const KIND_LABEL: Record<SkillUse["kind"], string> = {
  project: "project",
  role: "role",
};

/**
 * The skills section as an agent's tool registry. Picking a tool "calls" it
 * and the result lists every project and role on the site that uses it.
 */
export default function Toolbelt({ groups: allGroups }: { groups: ToolGroup[] }) {
  // Lead with the AI tools: they're the heart of the work, and on phones the
  // selected tab should be the first one visible in the scrolling row.
  const groups = [
    ...allGroups.filter((g) => g.category === "AI"),
    ...allGroups.filter((g) => g.category !== "AI"),
  ];
  const initialGroup = groups[0];
  const [category, setCategory] = useState(initialGroup.category);
  const [toolName, setToolName] = useState(
    [...initialGroup.tools].sort((a, b) => b.uses.length - a.uses.length)[0]?.name ?? "",
  );

  const group = groups.find((g) => g.category === category) ?? groups[0];
  const tool = group.tools.find((t) => t.name === toolName) ?? group.tools[0];

  function selectCategory(next: ToolGroup) {
    setCategory(next.category);
    const best = [...next.tools].sort((a, b) => b.uses.length - a.uses.length)[0];
    setToolName(best?.name ?? "");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[13rem_1fr]">
      <div
        role="tablist"
        aria-label="Skill categories"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((g) => {
          const active = g.category === category;
          return (
            <button
              key={g.category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(g)}
              className={`flex flex-shrink-0 items-center justify-between gap-4 rounded-xl border px-4 py-2.5 text-left font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "border-foreground text-foreground"
                  : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {g.category}
              <span className="opacity-70">{g.tools.length}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
        <div role="tabpanel" aria-label={`${group.category} tools`} className="flex flex-wrap content-start gap-2.5">
          {group.tools.map((t) => {
            const active = t.name === tool?.name;
            return (
              <button
                key={t.name}
                type="button"
                aria-pressed={active}
                onClick={() => setToolName(t.name)}
                onMouseEnter={() => setToolName(t.name)}
                onFocus={() => setToolName(t.name)}
                className={`group relative rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-border bg-surface text-foreground/85 hover:-translate-y-0.5 hover:border-accent/60"
                }`}
              >
                {t.name}
                {t.uses.length > 0 && (
                  <sup
                    className={`ml-1 font-mono text-[10px] ${active ? "text-accent-ink/70" : "text-accent"}`}
                  >
                    {t.uses.length}
                  </sup>
                )}
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="card min-h-[15rem] overflow-hidden rounded-xl font-mono text-[13px]"
        >
          <p className="flex items-center gap-2 border-b border-border px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            tool call
          </p>
          <div className="space-y-2 p-5">
            <p>
              <span className="text-muted">› call </span>
              <span className="text-foreground">use_tool(</span>
              <span className="text-accent">&quot;{tool?.name}&quot;</span>
              <span className="text-foreground">)</span>
            </p>
            <p>
              <span className="text-muted">› result </span>
              <span className="text-foreground/85">
                {tool && tool.uses.length > 0
                  ? `${tool.uses.length} match${tool.uses.length === 1 ? "" : "es"} on this site`
                  : "core skill, used across coursework and practice"}
              </span>
            </p>
            {tool && tool.uses.length > 0 && (
              <ul className="mt-4 space-y-1 border-t border-border pt-4 font-sans text-sm">
                {tool.uses.map((use) => {
                  const inner = (
                    <>
                      <span className="w-16 flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        {KIND_LABEL[use.kind]}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-foreground/85">{use.label}</span>
                      {use.href && (
                        <ArrowUpRight size={14} className="flex-shrink-0 text-muted transition-colors group-hover/use:text-accent" />
                      )}
                    </>
                  );
                  return (
                    <li key={use.kind + use.label}>
                      {use.href ? (
                        <a
                          href={use.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/use -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-2"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="-mx-2 flex items-center gap-3 px-2 py-1.5">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
