import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/cv";

const HOME_SLUGS = ["grantpilot", "khawaja-law", "competitive-intelligence-monitor"];

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
    >
      {children}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Projects() {
  const homeProjects = projects.filter((p) => HOME_SLUGS.includes(p.slug));

  return (
    <section id="projects" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            id="projects"
            title={
              <>
                Selected <span className="italic text-accent">projects</span>
              </>
            }
            intro={
              <>
                Products I designed and built end to end, from AI platforms like{" "}
                <a
                  href="https://www.grantpilot.works"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  GrantPilot
                </a>{" "}
                to full-stack web and mobile apps.
              </>
            }
          />
        </Reveal>

        <ProjectList projects={homeProjects} />

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <MoreLink href="/projects">All {projects.length} projects</MoreLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
