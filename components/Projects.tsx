import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/cv";

const HOME_SLUGS = ["grantpilot", "khawaja-law", "competitive-intelligence-monitor"];

export default function Projects() {
  const homeProjects = projects.filter((p) => HOME_SLUGS.includes(p.slug));

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" />
        </Reveal>

        <Reveal delay={40}>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
            A selection of the products I&apos;ve designed and built end-to-end — from
            AI-powered platforms like{" "}
            <a
              href="https://www.grantpilot.works"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              GrantPilot
            </a>{" "}
            to full-stack web and mobile apps.
          </p>
        </Reveal>

        <ProjectList projects={homeProjects} />

        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              View More Projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
