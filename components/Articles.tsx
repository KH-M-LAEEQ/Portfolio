import SectionHeading from "@/components/SectionHeading";
import ArticleList from "@/components/ArticleList";
import Reveal from "@/components/Reveal";
import { MoreLink } from "@/components/Projects";
import { articles } from "@/data/cv";

const HOME_COUNT = 3;

export default function Articles() {
  // Only articles with a cover image appear on the home page so the cards
  // stay visually even; the rest are still listed on /articles.
  const homeArticles = articles.filter((article) => article.image).slice(0, HOME_COUNT);
  const hasMore = articles.length > homeArticles.length;

  return (
    <section id="articles" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            id="articles"
            title={
              <>
                Writing on <span className="italic text-accent">agentic AI</span>
              </>
            }
            intro="Reflections from building agents in production: what broke, what held, and why. Published on Medium."
          />
        </Reveal>

        <ArticleList articles={homeArticles} columns={3} />

        {hasMore && (
          <Reveal delay={120}>
            <div className="mt-12 flex justify-center">
              <MoreLink href="/articles">All {articles.length} articles</MoreLink>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
