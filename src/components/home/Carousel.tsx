"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  itemCount: number;
}

export default function Carousel({ children, itemCount }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    setScrollProgress(
      scrollWidth > clientWidth
        ? scrollLeft / (scrollWidth - clientWidth)
        : 0
    );
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
    const cardWidth = 264 + 24; // card width + gap
    el.scrollBy({
      left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>

      {/* Controls */}
      {itemCount > 4 && (
        <div className="flex items-center gap-4 mt-5">
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all duration-150 hover:border-warm-teal hover:text-warm-teal disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-surface"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all duration-150 hover:border-warm-teal hover:text-warm-teal disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-surface"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-[3px] bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-warm-teal rounded-full transition-all duration-150"
              style={{
                width: `${Math.max(20, (1 / Math.ceil(itemCount / 4)) * 100)}%`,
                marginLeft: `${scrollProgress * (100 - Math.max(20, (1 / Math.ceil(itemCount / 4)) * 100))}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
