"use client";

import { Search, X } from "lucide-react";
import type { HubArticle } from "@/lib/hub-data";
import { ARTICLE_FILTERS } from "@/lib/hub-data";
import HubCard from "./HubCard";

interface ArticlesSectionProps {
  articles: HubArticle[];
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeFilters: Set<string>;
  onToggleFilter: (filter: string) => void;
  onClearFilters: () => void;
}

export default function ArticlesSection({
  articles,
  searchQuery,
  onSearchChange,
  activeFilters,
  onToggleFilter,
  onClearFilters,
}: ArticlesSectionProps) {
  // Filter articles
  const filtered = articles.filter((article) => {
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !article.title.toLowerCase().includes(q) &&
        !article.excerpt.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    // Category filter
    if (activeFilters.size > 0) {
      return article.tags.some((tag) => activeFilters.has(tag));
    }
    return true;
  });

  return (
    <section className="flex-[0_0_58%]">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
            Helpful Articles & Parent Tips
          </h2>
          <p className="font-body text-[15px] text-muted-grey mt-1">
            Written with working parents in mind.
          </p>
        </div>
        {/* Search */}
        <div className="relative flex-shrink-0 mt-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-grey pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="h-10 w-44 pl-9 pr-3 rounded-xl border border-border bg-surface font-body text-[13px] text-charcoal placeholder:text-muted-grey focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
        {ARTICLE_FILTERS.map((filter) => {
          const isActive = activeFilters.has(filter);
          return (
            <button
              key={filter}
              onClick={() => onToggleFilter(filter)}
              className={`px-4 py-2 rounded-full font-body text-[13px] font-medium border transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-warm-teal-light border-warm-teal text-warm-teal"
                  : "bg-warm-sand border-border text-charcoal hover:border-muted-grey"
              }`}
            >
              {filter}
            </button>
          );
        })}
        {activeFilters.size > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-full font-body text-[13px] text-muted-grey hover:text-charcoal transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Article cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((article) => (
            <HubCard
              key={article.id}
              title={article.title}
              description={article.excerpt}
              ctaLabel="Read more"
              gradientFrom={article.gradientFrom}
              gradientTo={article.gradientTo}
              illustrationHeight={120}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="font-body text-[14px] text-muted-grey">
            No articles match your search or filters.
          </p>
        </div>
      )}
    </section>
  );
}
