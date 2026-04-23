"use client";

import type { MoneyArticle } from "@/lib/hub-data";

interface MoneySectionProps {
  articles: MoneyArticle[];
}

export default function MoneySection({ articles }: MoneySectionProps) {
  return (
    <section className="bg-[#2A2A2A] text-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-body text-[0.85rem] uppercase tracking-[2px] text-white/50">
            Financial Guidance
          </p>
          <h2 className="font-heading text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.2] mt-4">
            Money &amp; Financial Support
          </h2>
          <p className="font-body text-[1.1rem] text-white/70 mt-4 leading-relaxed">
            Practical help to reduce financial stress during pregnancy and early
            parenthood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white/5 border-2 border-transparent p-8 lg:p-10 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#C96846] hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="w-12 h-1 bg-[#C96846] mb-8"
              />
              <h3 className="font-heading text-[1.5rem] lg:text-[1.8rem] font-bold leading-tight">
                {article.title}
              </h3>
              <p className="font-body text-white/80 leading-relaxed mt-4">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
