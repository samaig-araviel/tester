"use client";

import type { HubArticle } from "@/lib/hub-data";
import HubCard from "./HubCard";

interface RecommendedGuidesProps {
  articles: HubArticle[];
}

export default function RecommendedGuides({ articles }: RecommendedGuidesProps) {
  return (
    <section>
      <h2 className="font-heading text-[24px] font-semibold text-soft-navy mb-6">
        Recommended guides and resources for you
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.map((article) => {
          const isDownload = article.tags.some(
            (t) => t.toLowerCase().includes("flexible") || t.toLowerCase().includes("toolkit")
          );
          return (
            <HubCard
              key={article.id}
              title={article.title}
              description={article.excerpt}
              ctaLabel={isDownload ? "Download" : "Read more"}
              gradientFrom={article.gradientFrom}
              gradientTo={article.gradientTo}
            />
          );
        })}
      </div>
    </section>
  );
}
