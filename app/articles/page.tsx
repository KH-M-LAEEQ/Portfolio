import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleList from "@/components/ArticleList";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { articles } from "@/data/cv";

const PAGE_URL = "https://khawajalaeeq.me/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Writing by Khawaja Muhammad Laeeq on agentic AI, LLM application development, and the practical engineering details of building and deploying AI agents.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Articles | Khawaja Muhammad Laeeq",
    description:
      "Writing by Khawaja Muhammad Laeeq on agentic AI and LLM application development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles | Khawaja Muhammad Laeeq",
    description:
      "Writing by Khawaja Muhammad Laeeq on agentic AI and LLM application development.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://khawajalaeeq.me" },
    { "@type": "ListItem", position: 2, name: "Articles", item: PAGE_URL },
  ],
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/#articles"
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
                  Articles
                </li>
              </ol>
            </nav>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              More of what I&apos;ve written
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              All Articles
            </h1>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
              Writing on agentic AI and LLM application development — practical lessons from
              building, deploying, and streaming responses from real AI agents.
            </p>
            <ArticleList articles={articles} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
