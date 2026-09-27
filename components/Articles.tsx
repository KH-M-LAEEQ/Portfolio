import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ArticleList from "@/components/ArticleList";
import Reveal from "@/components/Reveal";
import { articles } from "@/data/cv";

const HOME_COUNT = 3;

export default function Articles() {
  const homeArticles = articles.slice(0, HOME_COUNT);
  const hasMore = articles.length > HOME_COUNT;

  return (
    <section id="articles" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Writing" title="Articles" />
        </Reveal>

        <ArticleList articles={homeArticles} columns={3} />

        {hasMore && (
          <Reveal delay={120}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/articles"
                className="flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                View More Articles
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
