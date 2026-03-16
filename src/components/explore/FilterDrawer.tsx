"use client";

import { useEffect } from "react";
import { X, Check } from "lucide-react";
import { AGE_FILTER_OPTIONS } from "@/lib/explore";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  ageFilters: string[];
  onApply: (ageFilters: string[]) => void;
  onClear: () => void;
}

export default function FilterDrawer({
  open,
  onClose,
  ageFilters,
  onApply,
  onClear,
}: FilterDrawerProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleAge(key: string) {
    const next = ageFilters.includes(key)
      ? ageFilters.filter((k) => k !== key)
      : [...ageFilters, key];
    onApply(next);
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/30 backdrop-blur-[2px] z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full md:w-[360px] bg-surface z-50 shadow-2xl flex flex-col animate-[slideInFromRight_200ms_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border flex-shrink-0">
          <h2 className="font-heading text-[18px] font-semibold text-soft-navy">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-charcoal" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Best for */}
          <div>
            <h3 className="font-body text-[14px] font-semibold text-charcoal mb-4">
              Best for
            </h3>
            <div className="flex flex-col gap-2">
              {AGE_FILTER_OPTIONS.map((option) => {
                const isChecked = ageFilters.includes(option.key);
                return (
                  <button
                    key={option.key}
                    onClick={() => toggleAge(option.key)}
                    className="flex items-center gap-3 py-3 px-1 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                        isChecked
                          ? "bg-warm-teal border-warm-teal"
                          : "border-2 border-border group-hover:border-muted-grey"
                      }`}
                    >
                      {isChecked && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <span className="font-body text-[15px] text-charcoal">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0 flex items-center gap-4">
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="font-body text-[14px] font-medium text-warm-teal hover:text-primary-hover transition-colors cursor-pointer"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-warm-teal text-white font-body text-[15px] font-semibold transition-all duration-150 hover:opacity-90 cursor-pointer"
          >
            Apply filters
          </button>
        </div>
      </div>
    </>
  );
}
