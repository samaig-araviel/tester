"use client";

import {
  School,
  Heart,
  Home,
  Baby,
  BookOpen,
  Brain,
} from "lucide-react";
import type { PageType } from "@/lib/explore";
import { CATEGORY_OPTIONS } from "@/lib/explore";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  School,
  Heart,
  Home,
  Baby,
  BookOpen,
  Brain,
};

interface CategoryStripProps {
  pageType: PageType;
  activeCategories: string[];
  onToggle: (key: string) => void;
  onClear: () => void;
}

export default function CategoryStrip({
  pageType,
  activeCategories,
  onToggle,
  onClear,
}: CategoryStripProps) {
  const title =
    pageType === "online"
      ? "Explore all online partners"
      : "Explore all in-person services";

  return (
    <section className="mt-10">
      {/* Section header */}
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-heading text-[24px] font-semibold text-soft-navy">
          {title}
        </h2>
        {activeCategories.length > 0 && (
          <button
            onClick={onClear}
            className="font-body text-[14px] font-medium text-warm-teal hover:text-primary-hover transition-colors cursor-pointer"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Category grid: 3 columns × 2 rows */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
        {CATEGORY_OPTIONS.map((cat) => {
          const isActive = activeCategories.includes(cat.key);
          const Icon = ICON_MAP[cat.icon];

          return (
            <button
              key={cat.key}
              onClick={() => onToggle(cat.key)}
              className={`flex items-center gap-3 h-16 px-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-warm-teal-light border-warm-teal"
                  : "bg-warm-sand border-border hover:border-muted-grey"
              }`}
            >
              {Icon && (
                <Icon
                  className={`w-6 h-6 flex-shrink-0 ${
                    isActive ? "text-warm-teal" : "text-warm-teal"
                  }`}
                />
              )}
              <span className="font-body text-[15px] font-medium text-charcoal text-left">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
