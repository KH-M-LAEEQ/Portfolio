"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function SectionDots() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === active);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-24 bottom-10 z-40 hidden lg:flex"
    >
      <div className="relative flex h-full flex-col items-center justify-between">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-accent transition-all duration-300"
          style={{
            height:
              activeIndex <= 0
                ? "0%"
                : `${(activeIndex / (sections.length - 1)) * 100}%`,
          }}
        />
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
              className="group relative z-10 flex h-3 w-3 items-center justify-center"
            >
              <span
                className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "scale-125 border-accent bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)]"
                    : "border-border bg-surface group-hover:border-accent group-hover:bg-accent/50"
                }`}
              />
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
