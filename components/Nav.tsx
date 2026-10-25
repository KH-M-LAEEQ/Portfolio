"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/cv";

// Section links are absolute ("/#about") so the same bar works on /projects
// and /articles; on the home page they resolve to in-page jumps.
const links = [
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#experience", label: "Experience", sectionId: "experience" },
  { href: "/projects", label: "Projects", sectionId: "projects" },
  { href: "/articles", label: "Articles", sectionId: "articles" },
  { href: "/#skills", label: "Skills", sectionId: "skills" },
  { href: "/#certifications", label: "Certifications", sectionId: "certifications" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
];

const iconLinkClass =
  "flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground";

function NavLinks({ active, className }: { active: string; className: string }) {
  return (
    <ul className={className}>
      {links.map((link) => {
        const isActive = active === link.sectionId;
        const linkClass = `block whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          isActive ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground"
        }`;
        return (
          <li key={link.href}>
            {link.href.startsWith("/#") ? (
              <a href={link.href} className={linkClass} aria-current={isActive ? "location" : undefined}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={linkClass} aria-current={isActive ? "page" : undefined}>
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!isHome) return;

    const sections = links
      .map((link) => document.getElementById(link.sectionId))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Off the home page, highlight the link for the page itself.
  const active = isHome ? activeSection : pathname.replace(/^\//, "");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav aria-label="Main" className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/#top" className="flex-shrink-0 font-mono font-semibold text-foreground">
            <span className="text-accent-2">&lt;</span>
            Khawaja Laeeq
            <span className="text-accent-2">/&gt;</span>
          </Link>

          <NavLinks active={active} className="hidden items-center gap-1 lg:flex" />

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 border-r border-border pr-2 sm:flex">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={iconLinkClass}
              >
                <GithubIcon width={17} height={17} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconLinkClass}
              >
                <LinkedinIcon width={17} height={17} />
              </a>
              <a
                href={profile.medium}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className={iconLinkClass}
              >
                <MediumIcon width={17} height={17} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className={iconLinkClass}>
                <Mail size={17} />
              </a>
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* Below lg the links get their own always-visible row, scrolling
            sideways on narrow phones instead of collapsing into a drawer. */}
        <NavLinks
          active={active}
          className="-mx-6 flex items-center gap-1 overflow-x-auto px-6 pb-3 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        />
      </nav>
    </header>
  );
}
