import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ArticleList from "@/components/ArticleList";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { articles } from "@/data/cv";
import {
  PERSON_ID,
  SITE_URL,
  absoluteUrl,
  baseOpenGraph,
  baseTwitter,
  defaultSocialImage,
} from "@/lib/site";

const PAGE_URL = absoluteUrl("/articles");

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Writing by Khawaja Muhammad Laeeq on agentic AI, LLM application development, and the practical engineering details of building and deploying AI agents.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/articles",
    title: "Articles | Khawaja Muhammad Laeeq",
    description:
      "Writing by Khawaja Muhammad Laeeq on agentic AI and LLM application development.",
    images: [defaultSocialImage],
  },
  twitter: {
    ...baseTwitter,
    title: "Articles | Khawaja Muhammad Laeeq",
    description:
      "Writing by Khawaja Muhammad Laeeq on agentic AI and LLM application development.",
    images: [defaultSocialImage],
  },
};

// Upcoming drafts have no URL yet, so only published articles are listed.
const publishedArticles = articles.filter((article) => article.href && !article.upcoming);

const articlesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Articles", item: PAGE_URL },
      ],
    },
    {
      "@type": "ItemList",
      name: "Articles by Khawaja Muhammad Laeeq",
      url: PAGE_URL,
      numberOfItems: publishedArticles.length,
      itemListElement: publishedArticles.map((article, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "BlogPosting",
          headline: article.title,
          url: article.href,
          ...(article.description && { description: article.description }),
          ...(article.image && { image: absoluteUrl(article.image) }),
          ...(article.date && { datePublished: article.date }),
          ...(article.publication && {
            publisher: { "@type": "Organization", name: article.publication },
          }),
          author: { "@id": PERSON_ID },
        },
      })),
    },
  ],
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={articlesJsonLd} />
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
