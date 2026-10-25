"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type ConsoleLine = { key: string; value: string };

const CHAR_MS = 18;
const LINE_PAUSE_MS = 420;
const HOLD_MS = 5200;

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * A quiet terminal that "types" an agent run, line by line, then loops. Every line
 * is always in the DOM (untyped characters are just transparent), so layout
 * never shifts and screen readers get the full text.
 */
export default function AgentConsole({ lines }: { lines: ConsoleLine[] }) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [cursor, setCursor] = useState({ line: 0, char: 0 });

  const lengths = lines.map((l) => l.value.length);
  const done = cursor.line >= lines.length;

  useEffect(() => {
    if (reduceMotion) return;

    let delay = CHAR_MS;
    if (done) delay = HOLD_MS;
    else if (cursor.char >= lengths[cursor.line]) delay = LINE_PAUSE_MS;

    const timer = setTimeout(() => {
      setCursor((c) => {
        if (c.line >= lines.length) return { line: 0, char: 0 };
        if (c.char >= lengths[c.line]) return { line: c.line + 1, char: 0 };
        return { line: c.line, char: c.char + 1 };
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [cursor, done, lengths, lines.length, reduceMotion]);

  const shown = reduceMotion ? { line: lines.length, char: 0 } : cursor;
  const finished = shown.line >= lines.length;
  const progress = Math.min(shown.line, lines.length) / lines.length;

  return (
    <div className="card overflow-hidden rounded-xl shadow-[0_30px_70px_-40px_color-mix(in_srgb,var(--foreground)_45%,transparent)]">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <p className="truncate font-mono text-xs text-muted">agent run · khawaja-laeeq</p>
        <p className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-accent ${finished ? "" : "animate-pulse-dot"}`}
          />
          {finished ? "done" : "running"}
        </p>
      </div>

      <ol className="space-y-2 px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:px-5 sm:text-[13px]">
        {lines.map((line, i) => {
          const reached = i < shown.line || (i === shown.line && !finished);
          const typed = i < shown.line ? line.value.length : i === shown.line ? shown.char : 0;
          const isActive = i === shown.line && !finished;
          return (
            <li key={line.key + i} className="grid grid-cols-[4.5rem_1fr] gap-3">
              <span className={`transition-colors ${reached ? "text-accent" : "text-transparent"}`}>
                {line.key}
              </span>
              <span className="min-w-0 text-foreground/80">
                <span>{line.value.slice(0, typed)}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="animate-caret ml-px inline-block h-[1.05em] w-[0.45em] translate-y-[0.15em] bg-foreground/70"
                  />
                )}
                <span className="text-transparent">{line.value.slice(typed)}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center gap-3 border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted">
        <span>
          {Math.min(shown.line + (finished ? 0 : 1), lines.length)}/{lines.length}
        </span>
        <span className="h-px flex-1 bg-border">
          <span
            className="block h-px bg-accent transition-[width] duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </span>
      </div>
    </div>
  );
}
