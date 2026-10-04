import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectList from "@/components/ProjectList";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/data/cv";

const PAGE_URL = "https://khawajalaeeq.me/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web, mobile, and AI-powered applications built by Khawaja Muhammad Laeeq, including GrantPilot, an AI-powered scholarship-matching platform, and a Competitive Intelligence Monitor for e-commerce tracking.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Projects | Khawaja Muhammad Laeeq",
    description: "Web, mobile, and AI-powered applications built by Khawaja Muhammad Laeeq.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Khawaja Muhammad Laeeq",
    description: "Web, mobile, and AI-powered applications built by Khawaja Muhammad Laeeq.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://khawajalaeeq.me" },
    { "@type": "ListItem", position: 2, name: "Projects", item: PAGE_URL },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={breadcrumbJsonLd} />
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
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  Projects
                </li>
              </ol>
            </nav>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Everything I&apos;ve built
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              All Projects
            </h1>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
              The full list of what I&apos;ve built — production projects deployed for real
              users, plus coursework and personal projects where I practiced specific skills.
            </p>
            <ProjectList projects={projects} showGroupLabels />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
