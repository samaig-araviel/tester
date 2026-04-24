"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { HubArticle } from "@/lib/hub-data";

interface RecommendedGuidesProps {
  articles: HubArticle[];
}

export default function RecommendedGuides({ articles }: RecommendedGuidesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320 + 24; // card min-width + gap
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <section>
      {/* Section header — centred tag, heading, subheading */}
      <div className="text-center mb-12">
        <p className="font-body text-[0.85rem] uppercase tracking-[2px] text-[#999]">
          Recommended for you
        </p>
        <h2 className="font-heading text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#2A2A2A] leading-[1.2] mt-4 lg:whitespace-nowrap">
          Guides curated for your journey
        </h2>
        <p className="font-body text-[1.1rem] text-[#666] mt-4 leading-relaxed max-w-[600px] mx-auto">
          Personalized content based on where you are in your parenting path.
        </p>
      </div>

      {/* Carousel arrows above scroll row */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center transition-all duration-150 hover:border-[#C96846] hover:text-[#C96846] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-charcoal" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center transition-all duration-150 hover:border-[#C96846] hover:text-[#C96846] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-charcoal" />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="group flex-shrink-0 w-[320px] bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image */}
            <div className="relative w-full h-[180px] overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="320px"
              />
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
                {article.readTime} Min read
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
