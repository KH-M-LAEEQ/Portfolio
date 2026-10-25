import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import type { Article } from "@/data/cv";

function ArticleCardContent({ article }: { article: Article }) {
  return (
    <Card
      className={`flex h-full flex-col rounded-xl p-5 md:p-6 ${
        article.upcoming || !article.href
          ? "border-dashed border-border opacity-80"
          : ""
      }`}
    >
      {article.image && (
        <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-surface-2">
          <Image
            src={article.image}
            alt={`${article.title} cover image`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 24rem, 100vw"
          />
        </div>
      )}
      <p className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>
          {article.upcoming
            ? "upcoming"
            : [article.publication, article.date].filter(Boolean).join(" · ")}
        </span>
        {!article.upcoming && article.href && (
          <ArrowUpRight
            size={16}
            className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        )}
      </p>
      <h3 className="font-display text-2xl leading-tight text-foreground">{article.title}</h3>
      {article.description && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">{article.description}</p>
      )}
    </Card>
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
    <ol className={`grid gap-5 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {articles.map((article, i) => (
        <li key={article.href ?? article.title} className="h-full">
          <Reveal delay={Math.min(80 + i * 80, 240)} className="h-full">
            {article.upcoming || !article.href ? (
              <div className="group block h-full">
                <ArticleCardContent article={article} />
              </div>
            ) : (
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
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
