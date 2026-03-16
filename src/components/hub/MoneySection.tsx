"use client";

import type { MoneyArticle } from "@/lib/hub-data";
import HubCard from "./HubCard";
import Carousel from "@/components/home/Carousel";

interface MoneySectionProps {
  articles: MoneyArticle[];
}

export default function MoneySection({ articles }: MoneySectionProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
          Money & Financial Support
        </h2>
        <p className="font-body text-[15px] text-muted-grey mt-1">
          Practical help to reduce financial stress during pregnancy and early
          parenthood.
        </p>
      </div>
      <Carousel itemCount={articles.length}>
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 w-[264px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <HubCard
              title={article.title}
              description={article.description}
              ctaLabel="Read more"
              gradientFrom={article.gradientFrom}
              gradientTo={article.gradientTo}
              illustrationHeight={120}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
