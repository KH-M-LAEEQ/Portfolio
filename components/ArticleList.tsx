import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Article } from "@/data/cv";

function ArticleCardContent({ article }: { article: Article }) {
  return (
    <>
      {article.image && (
        <div
          className="relative mb-4 w-full overflow-hidden rounded-lg border border-border bg-surface-2"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={article.image}
            alt={`${article.title} cover image`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 24rem, 100vw"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
        {!article.upcoming && (
          <ExternalLink
            size={14}
            className="mt-1 flex-shrink-0 text-muted transition-colors group-hover:text-accent"
          />
        )}
      </div>
      {article.upcoming ? (
        <p className="mt-1 text-sm font-medium text-muted">Upcoming</p>
      ) : (
        (article.publication || article.date) && (
          <p className="mt-1 text-sm font-medium text-accent">
            {[article.publication, article.date].filter(Boolean).join(" · ")}
          </p>
        )
      )}
      {article.description && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          {article.description}
        </p>
      )}
    </>
  );
}

export default function ArticleList({
  articles,
  columns = 2,
}: {
  articles: Article[];
  columns?: 2 | 3;
}) {
  if (articles.length === 0) {
    return <p className="text-sm text-muted">Coming soon.</p>;
  }

  return (
    <ol className={`grid gap-4 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {articles.map((article, i) => (
        <li key={article.href ?? article.title} className="h-full">
          <Reveal delay={Math.min(80 + i * 80, 240)} className="h-full">
            {article.upcoming || !article.href ? (
              <div className="group block h-full rounded-xl border border-dashed border-border bg-surface p-6 opacity-80">
                <ArticleCardContent article={article} />
              </div>
            ) : (
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <ArticleCardContent article={article} />
              </a>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
