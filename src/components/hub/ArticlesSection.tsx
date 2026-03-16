"use client";

import { useState, useEffect } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { HubArticle } from "@/lib/hub-data";
import { ARTICLE_FILTERS } from "@/lib/hub-data";

interface ArticlesSectionProps {
  articles: HubArticle[];
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeFilters: Set<string>;
  onToggleFilter: (filter: string) => void;
  onClearFilters: () => void;
}

const ITEMS_PER_PAGE = 4;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function ArticlesSection({
  articles,
  searchQuery,
  onSearchChange,
  activeFilters,
  onToggleFilter,
  onClearFilters,
}: ArticlesSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, activeFilters]);

  // Filter articles
  const filtered = articles.filter((article) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !article.title.toLowerCase().includes(q) &&
        !article.excerpt.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (activeFilters.size > 0) {
      return article.tags.some((tag) => activeFilters.has(tag));
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section id="articles-section" className="flex-[0_0_58%] min-w-0">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
            Helpful Articles &amp; Parent Tips
          </h2>
          <p className="font-body text-[14px] text-muted-grey mt-1">
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

      {/* Filter pills — square-rounded edges */}
      <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
        {ARTICLE_FILTERS.map((filter) => {
          const isActive = activeFilters.has(filter);
          return (
            <button
              key={filter}
              onClick={() => onToggleFilter(filter)}
              className={`px-4 py-2 rounded-lg font-body text-[13px] font-medium border transition-all duration-150 cursor-pointer ${
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
            className="flex items-center gap-1 px-3 py-2 rounded-lg font-body text-[13px] text-muted-grey hover:text-charcoal transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Article list */}
      {pageItems.length > 0 ? (
        <div className="flex flex-col">
          {pageItems.map((article) => (
            <div
              key={article.id}
              className="border-t border-border py-6 first:border-t-0 first:pt-0"
            >
              <div className="flex gap-5">
                {/* Image / illustration */}
                <div
                  className="flex-shrink-0 w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${article.gradientFrom} 0%, ${article.gradientTo} 100%)`,
                  }}
                >
                  <svg
                    viewBox="0 0 120 80"
                    fill="none"
                    className="w-14 h-10 opacity-30"
                    aria-hidden="true"
                  >
                    <rect x="20" y="15" width="80" height="50" rx="6" fill="#0A2342" />
                    <circle cx="60" cy="35" r="12" fill="#117A65" />
                    <path d="M30 60 L45 45 L65 55 L80 40 L100 60Z" fill="#F0D5BF" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Category + date row */}
                  <div className="flex items-center gap-0">
                    <span className="font-body text-[11px] font-semibold tracking-widest uppercase text-muted-grey flex-shrink-0">
                      {article.category}
                    </span>
                    <span className="flex-1 h-px bg-border mx-3" />
                    <span className="font-body text-[13px] text-muted-grey flex-shrink-0">
                      {formatDate(article.publishedDate)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[18px] font-semibold text-soft-navy leading-snug mt-2">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-body text-[14px] text-muted-grey leading-relaxed mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex justify-end mt-3">
                    <span className="font-body text-[14px] text-soft-navy underline cursor-pointer hover:text-warm-teal transition-colors">
                      Read full blog
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="font-body text-[14px] text-muted-grey">
            No articles match your search or filters.
          </p>
        </div>
      )}

      {/* Pagination controls */}
      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-warm-teal disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-charcoal" />
          </button>
          <span className="font-body text-[13px] text-muted-grey">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-warm-teal disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 text-charcoal" />
          </button>
        </div>
      )}
    </section>
  );
}
