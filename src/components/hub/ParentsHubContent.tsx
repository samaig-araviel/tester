"use client";

import { useState, useEffect } from "react";
import HubHero from "./HubHero";
import RecommendedGuides from "./RecommendedGuides";
import Testimonial from "./Testimonial";
import ArticlesSection from "./ArticlesSection";
import PodcastsSection from "./PodcastsSection";
import MoneySection from "./MoneySection";
import ExternalResources from "./ExternalResources";
import type {
  HubArticle,
  HubPodcast,
  MoneyArticle,
  ExternalResource,
} from "@/lib/hub-data";

interface ParentsHubContentProps {
  recommendedArticles: HubArticle[];
  allArticles: HubArticle[];
  podcasts: HubPodcast[];
  moneyArticles: MoneyArticle[];
  externalResources: ExternalResource[];
}

export default function ParentsHubContent({
  recommendedArticles,
  allArticles,
  podcasts,
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
      {/* Hero — full-bleed terracotta */}
      <HubHero />

      {/* Recommended guides */}
      <div className="max-w-[1200px] mx-auto px-6 pt-16">
        <RecommendedGuides articles={recommendedArticles} />
      </div>

      {/* Testimonial */}
      <Testimonial
        quote="Parenfits helped me navigate my return to work with confidence. The personalized timeline and toolkit made all the difference in planning my transition back."
        author="Sarah, London"
      />

      {/* Articles + Podcasts */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <ArticlesSection
            articles={allArticles}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            onClearFilters={clearFilters}
          />
          <PodcastsSection podcasts={podcasts} />
        </div>
      </div>

      {/* Money & Financial Support — full-bleed dark */}
      <MoneySection articles={moneyArticles} />
    </>
  );
}
