"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SortOption {
  readonly key: string;
  readonly label: string;
}

interface FilterSortRowProps {
  sortBy: string;
  onSortChange: (key: string) => void;
  filterCount: number;
  onOpenFilter: () => void;
  sortOptions: readonly SortOption[];
}

export default function FilterSortRow({
  sortBy,
  onSortChange,
  filterCount,
  onOpenFilter,
  sortOptions,
}: FilterSortRowProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLabel =
    sortOptions.find((o) => o.key === sortBy)?.label ?? "Sort by";

  return (
    <div className="flex items-center justify-between mt-8 mb-6">
      {/* Filter button */}
      <button
        onClick={onOpenFilter}
        className={`flex items-center gap-2 h-10 px-4 rounded-xl border transition-all duration-150 cursor-pointer font-body text-[14px] font-medium ${
          filterCount > 0
            ? "bg-warm-teal-light border-warm-teal text-charcoal"
            : "bg-surface border-border text-charcoal hover:border-muted-grey"
        }`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filter{filterCount > 0 ? ` (${filterCount})` : ""}
      </button>

      {/* Sort dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-surface font-body text-[14px] font-medium text-charcoal hover:border-muted-grey transition-all duration-150 cursor-pointer"
        >
          <span className="text-muted-grey mr-1">Sort by</span>
          {currentLabel}
          <ChevronDown
            className={`w-4 h-4 text-muted-grey transition-transform duration-150 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-56 bg-surface rounded-xl shadow-lg border border-border overflow-hidden z-30 animate-[fadeSlideIn_150ms_ease-out]">
            <div className="p-1.5">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    onSortChange(option.key);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center w-full h-10 px-3 rounded-lg font-body text-[14px] transition-colors cursor-pointer ${
                    sortBy === option.key
                      ? "bg-warm-teal-light text-warm-teal font-medium"
                      : "text-charcoal hover:bg-primary-light"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
