"use client";

import type { HubArticle } from "@/lib/hub-data";

interface RecommendedGuidesProps {
  articles: HubArticle[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RecommendedGuides({ articles }: RecommendedGuidesProps) {
  const visible = articles.slice(0, 3);

  function scrollToArticles() {
    const el = document.getElementById("articles-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section>
      <h2 className="font-heading text-[24px] font-semibold text-soft-navy mb-6">
        Recommended guides and resources for you
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((article) => (
          <div
            key={article.id}
            className="group bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            {/* Image / illustration area */}
            <div
              className="w-full flex items-center justify-center"
              style={{
                height: 180,
                background: `linear-gradient(135deg, ${article.gradientFrom} 0%, ${article.gradientTo} 100%)`,
              }}
            >
              <svg
                viewBox="0 0 120 80"
                fill="none"
                className="w-20 h-14 opacity-30"
                aria-hidden="true"
              >
                <rect x="20" y="15" width="80" height="50" rx="6" fill="#0A2342" />
                <circle cx="60" cy="35" r="12" fill="#117A65" />
                <path d="M30 60 L45 45 L65 55 L80 40 L100 60Z" fill="#F0D5BF" />
              </svg>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-heading text-[16px] font-semibold text-soft-navy leading-snug line-clamp-2">
                {article.title}
              </h3>
              <p className="font-body text-[13px] text-muted-grey mt-2 line-clamp-2">
                {article.excerpt}
              </p>
              <p className="font-body text-[12px] text-muted-grey mt-3">
                {formatDate(article.publishedDate)} | {article.readTime} Min read
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* See more button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={scrollToArticles}
          className="bg-warm-teal text-white rounded-full px-8 py-3 font-body text-[14px] font-medium transition-all duration-150 hover:opacity-90 cursor-pointer"
        >
          See more guides
        </button>
      </div>
    </section>
  );
}
