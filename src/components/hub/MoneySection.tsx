"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { MoneyArticle } from "@/lib/hub-data";

interface MoneySectionProps {
  articles: MoneyArticle[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MoneySection({ articles }: MoneySectionProps) {
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
    const cardWidth = 300 + 24;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <section>
      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
            Money &amp; Financial Support
          </h2>
          <p className="font-body text-[14px] text-muted-grey mt-1">
            Practical help to reduce financial stress during pregnancy and early
            parenthood.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center transition-all duration-150 hover:border-warm-teal hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center transition-all duration-150 hover:border-warm-teal hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-charcoal" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="group flex-shrink-0 w-[300px] cursor-pointer"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image + category row */}
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className="relative w-[120px] h-[90px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="120px"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <span className="font-body text-[11px] font-semibold tracking-widest uppercase text-warm-teal">
                  {article.category}
                </span>
                <h3 className="font-heading text-[15px] font-semibold text-soft-navy leading-snug mt-1.5 line-clamp-3">
                  {article.title}
                </h3>
                <p className="font-body text-[12px] text-muted-grey mt-2">
                  {article.author} &bull; {formatDate(article.publishedDate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
