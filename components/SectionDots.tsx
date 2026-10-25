"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/sections";

/**
 * Section rail: a fixed progress line on wide screens that fills as you
 * scroll, with a node for each section.
 */
export default function SectionDots() {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === active);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-10 left-6 top-28 z-40 hidden xl:flex"
    >
      <div className="relative flex h-full flex-col items-center justify-between">
        <div aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-accent"
          style={{ height: `${progress * 100}%` }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent)]"
          style={{ top: `${progress * 100}%` }}
        />
        {sections.map((step, i) => {
          const isActive = step.id === active;
          const passed = i <= activeIndex;
          return (
            <a
              key={step.id}
              href={`#${step.id}`}
              aria-label={step.label}
              aria-current={isActive ? "true" : undefined}
              className="group relative z-10 flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[8px] transition-all duration-300 ${
                  isActive
                    ? "scale-110 border-accent bg-accent text-accent-ink"
                    : passed
                      ? "border-accent/60 bg-background text-accent"
                      : "border-border bg-background text-muted group-hover:border-accent"
                }`}
              >
                {step.number}
              </span>
              <span
                className={`pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] tracking-[0.08em] transition-opacity ${
                  isActive
                    ? "text-accent opacity-0 group-hover:opacity-100 2xl:opacity-100"
                    : "text-muted opacity-0 group-hover:opacity-100"
                }`}
              >
                {step.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
