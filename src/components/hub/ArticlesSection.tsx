"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function ArticlesSection({
  articles,
  searchQuery,
  onSearchChange,
  activeFilters,
  onToggleFilter,
  onClearFilters,
}: ArticlesSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, activeFilters]);

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
    <section
      id="articles-section"
      className="flex-[0_0_66%] min-w-0 bg-surface p-8 lg:p-16"
    >
      <h2 className="font-heading text-[2rem] lg:text-[2.5rem] font-bold text-[#2A2A2A] leading-tight">
        Helpful Articles &amp; Parent Tips
      </h2>
      <p className="font-body text-[#666] text-[1rem] mt-3">
        Written with working parents in mind.
      </p>

      <div className="mt-12">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles and guides..."
          aria-label="Search articles and guides"
          className="w-full px-5 py-4 bg-surface border-2 border-[#E5E5E5] font-body text-[1rem] text-[#2A2A2A] placeholder:text-[#999] focus:outline-none focus:border-[#C96846] transition-colors"
        />
      </div>

      <div
        role="group"
        aria-label="Filter articles by category"
        className="mt-8 flex flex-wrap gap-3"
      >
        {ARTICLE_FILTERS.map((filter) => {
          const isActive = activeFilters.has(filter);
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onToggleFilter(filter)}
              aria-pressed={isActive}
              className={`px-5 py-2.5 font-body text-[0.8rem] uppercase tracking-[1px] transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#C96846] text-white"
                  : "bg-[#F5F1E8] text-[#2A2A2A] hover:bg-[#C96846] hover:text-white"
              }`}
            >
              {filter}
            </button>
          );
        })}
        {activeFilters.size > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="px-5 py-2.5 font-body text-[0.8rem] uppercase tracking-[1px] text-[#C96846] hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {pageItems.length > 0 ? (
        <ul className="mt-12 flex flex-col">
          {pageItems.map((article) => (
            <li
              key={article.id}
              className="border-b border-[#E5E5E5] pb-8 mb-8 last:mb-0 transition-transform duration-300 hover:translate-x-[10px]"
            >
              <p className="font-body text-[0.75rem] font-semibold uppercase tracking-[2px] text-[#C96846]">
                {article.category}
              </p>
              <h3 className="font-heading text-[1.5rem] font-bold text-[#2A2A2A] leading-snug mt-2">
                {article.title}
              </h3>
              <p className="font-body text-[0.95rem] text-[#666] leading-relaxed mt-3">
                {article.excerpt}
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 font-body font-bold text-[0.85rem] uppercase tracking-[1px] text-[#C96846] cursor-pointer hover:opacity-80 transition-opacity"
              >
                Read full blog
                <span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-12 text-center">
          <p className="font-body text-[0.95rem] text-[#666]">
            No articles match your search or filters.
          </p>
        </div>
      )}

      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="w-9 h-9 border border-[#E5E5E5] flex items-center justify-center hover:border-[#C96846] hover:text-[#C96846] disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default text-[#2A2A2A]"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-body text-[0.85rem] text-[#666]">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="w-9 h-9 border border-[#E5E5E5] flex items-center justify-center hover:border-[#C96846] hover:text-[#C96846] disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default text-[#2A2A2A]"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
