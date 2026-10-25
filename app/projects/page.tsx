import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/data/cv";
import {
  PERSON_ID,
  SITE_URL,
  absoluteUrl,
  baseOpenGraph,
  baseTwitter,
  defaultSocialImage,
} from "@/lib/site";

const PAGE_URL = absoluteUrl("/projects");

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web, mobile, and AI-powered applications built by Khawaja Muhammad Laeeq, including GrantPilot, an AI-powered scholarship-matching platform, and a Competitive Intelligence Monitor for e-commerce tracking.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/projects",
    title: "Projects | Khawaja Muhammad Laeeq",
    description: "Web, mobile, and AI-powered applications built by Khawaja Muhammad Laeeq.",
    images: [defaultSocialImage],
  },
  twitter: {
    ...baseTwitter,
    title: "Projects | Khawaja Muhammad Laeeq",
    description: "Web, mobile, and AI-powered applications built by Khawaja Muhammad Laeeq.",
    images: [defaultSocialImage],
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Projects", item: PAGE_URL },
      ],
    },
    {
      "@type": "ItemList",
      name: "Projects by Khawaja Muhammad Laeeq",
      url: PAGE_URL,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: project.liveUrl ?? project.links[0]?.href ?? `${PAGE_URL}#${project.slug}`,
          ...(project.image && { image: absoluteUrl(project.image) }),
          keywords: project.tags.join(", "),
          creator: { "@id": PERSON_ID },
        },
      })),
    },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={projectsJsonLd} />
      <Nav />

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
