"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/cv";

const links = [
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#experience", label: "Experience", sectionId: "experience" },
  { href: "/projects", label: "Projects", sectionId: "projects" },
  { href: "#skills", label: "Skills", sectionId: "skills" },
  { href: "#certifications", label: "Certifications", sectionId: "certifications" },
  { href: "/articles", label: "Articles", sectionId: "articles" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.sectionId))
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

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono font-semibold text-foreground">
          <span className="text-accent-2">&lt;</span>
          Khawaja Laeeq
          <span className="text-accent-2">/&gt;</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const className = `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active === link.sectionId
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground"
            }`;
            return (
              <li key={link.href}>
                {link.href.startsWith("/") ? (
                  <Link href={link.href} className={className}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={className}>
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 border-r border-border pr-2 sm:flex">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <GithubIcon width={17} height={17} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <LinkedinIcon width={17} height={17} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <Mail size={17} />
            </a>
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const className = `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active === link.sectionId
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground"
              }`;
              return (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} onClick={() => setOpen(false)} className={className}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} onClick={() => setOpen(false)} className={className}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex items-center gap-1 border-t border-border pt-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <GithubIcon width={17} height={17} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <LinkedinIcon width={17} height={17} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
