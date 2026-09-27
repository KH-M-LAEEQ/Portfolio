import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectList from "@/components/ProjectList";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { projects } from "@/data/cv";

const HOME_SLUGS = ["grantpilot", "khawaja-law", "competitive-intelligence-monitor"];

export default function ProjectsPage() {
  const restProjects = projects.filter((p) => !HOME_SLUGS.includes(p.slug));

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/#projects"
            className="flex items-center gap-1.5 font-mono text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              More of what I've built
            </p>
            <h1 className="mb-10 text-3xl font-semibold text-foreground md:text-4xl">
              All Projects
            </h1>
            <ProjectList projects={restProjects} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
