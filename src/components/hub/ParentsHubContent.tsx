"use client";

import { useState, useEffect } from "react";
import HubHero from "./HubHero";
import RecommendedGuides from "./RecommendedGuides";
import ArticlesSection from "./ArticlesSection";
import ToolkitsSection from "./ToolkitsSection";
import MoneySection from "./MoneySection";
import ExternalResources from "./ExternalResources";
import type {
  HubArticle,
  HubToolkit,
  MoneyArticle,
  ExternalResource,
} from "@/lib/hub-data";

interface ParentsHubContentProps {
  recommendedArticles: HubArticle[];
  allArticles: HubArticle[];
  toolkits: HubToolkit[];
  moneyArticles: MoneyArticle[];
  externalResources: ExternalResource[];
}

export default function ParentsHubContent({
  recommendedArticles,
  allArticles,
  toolkits,
  moneyArticles,
  externalResources,
}: ParentsHubContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function toggleFilter(filter: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  }

  function clearFilters() {
    setActiveFilters(new Set());
  }

  return (
    <>
      {/* Hero */}
      <HubHero />

      {/* Recommended Guides */}
      <div className="mt-12">
        <RecommendedGuides articles={recommendedArticles} />
      </div>

      {/* Articles + Toolkits two-column */}
      <div className="mt-12 flex flex-col lg:flex-row gap-8">
        <ArticlesSection
          articles={allArticles}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
          onClearFilters={clearFilters}
        />
        <ToolkitsSection toolkits={toolkits} />
      </div>

      {/* Money & Financial Support */}
      <div className="mt-12">
        <MoneySection articles={moneyArticles} />
      </div>

      {/* Trusted External Resources */}
      <div className="mt-12">
        <ExternalResources resources={externalResources} />
      </div>
    </>
  );
}
