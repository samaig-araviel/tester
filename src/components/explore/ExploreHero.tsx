"use client";

import { Search } from "lucide-react";
import type { PageType } from "@/lib/explore";

const COPY = {
  online: {
    pill: "Online services",
    heading:
      "Discover online brands offering exclusive benefits for Parentfits members.",
    searchPlaceholder: "Search services, activities\u2026",
  },
  "in-person": {
    pill: "In-person services",
    heading:
      "Discover local services and in-person support for you and your family.",
    searchPlaceholder: "Search services, activities\u2026",
  },
} as const;

interface ExploreHeroProps {
  pageType: PageType;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ExploreHero({
  pageType,
  searchQuery,
  onSearchChange,
}: ExploreHeroProps) {
  const copy = COPY[pageType];

  return (
    <section className="relative">
      {/* Background banner */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          height: 300,
          background:
            pageType === "online"
              ? "linear-gradient(135deg, #E6F2EF 0%, #EEF4F8 25%, #F0D5BF 50%, #FBF0E6 75%, #E6F2EF 100%)"
              : "linear-gradient(135deg, #EEF4F8 0%, #E6F2EF 30%, #FBF0E6 60%, #F0D5BF 100%)",
        }}
      >
        {/* Subtle decorative elements */}
        <svg
          className="w-full h-full opacity-[0.15]"
          viewBox="0 0 1200 300"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="200" cy="80" r="120" fill="#117A65" />
          <circle cx="900" cy="200" r="100" fill="#F0D5BF" />
          <circle cx="600" cy="50" r="60" fill="#0A2342" />
          <circle cx="1050" cy="100" r="80" fill="#117A65" />
          <circle cx="350" cy="250" r="50" fill="#F0D5BF" />
        </svg>
      </div>

      {/* Overlay card */}
      <div className="flex justify-center" style={{ marginTop: -120 }}>
        <div
          className="relative bg-surface rounded-2xl px-8 py-7 text-center"
          style={{
            maxWidth: 680,
            width: "100%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          {/* Pill tag */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-warm-teal-light text-warm-teal text-[13px] font-medium">
            {copy.pill}
          </span>

          {/* Heading */}
          <h1 className="font-heading text-[28px] md:text-[32px] font-semibold text-soft-navy leading-snug mt-4 mx-auto max-w-[560px]">
            {copy.heading}
          </h1>

          {/* Search bar */}
          <div className="mt-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-grey" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-surface font-body text-[15px] text-charcoal placeholder:text-muted-grey transition-colors duration-150 focus:outline-none focus:border-warm-teal"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
