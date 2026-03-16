"use client";

import { Search } from "lucide-react";
import VendorCard from "./VendorCard";
import type { ExploreVendor, PageType } from "@/lib/explore";

interface VendorGridProps {
  vendors: ExploreVendor[];
  pageType: PageType;
  onVendorClick: (vendorId: string) => void;
  hasActiveFilters: boolean;
  hasSearchQuery: boolean;
  onClearFilters: () => void;
  onClearSearch: () => void;
}

export default function VendorGrid({
  vendors,
  pageType,
  onVendorClick,
  hasActiveFilters,
  hasSearchQuery,
  onClearFilters,
  onClearSearch,
}: VendorGridProps) {
  if (vendors.length === 0) {
    // Empty state
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-warm-sand flex items-center justify-center mb-4">
          <Search className="w-6 h-6 text-muted-grey" />
        </div>

        {hasSearchQuery ? (
          <>
            <p className="font-body text-[16px] font-medium text-charcoal mb-1">
              No results found
            </p>
            <p className="font-body text-[14px] text-muted-grey mb-4 max-w-sm">
              Try a different search term.
            </p>
            <button
              onClick={onClearSearch}
              className="font-body text-[14px] font-medium text-warm-teal hover:text-primary-hover transition-colors cursor-pointer"
            >
              Clear search
            </button>
          </>
        ) : hasActiveFilters ? (
          <>
            <p className="font-body text-[16px] font-medium text-charcoal mb-1">
              No {pageType === "online" ? "offers" : "services"} match your
              filters
            </p>
            <p className="font-body text-[14px] text-muted-grey mb-4 max-w-sm">
              Try removing a filter or adjusting your selection.
            </p>
            <button
              onClick={onClearFilters}
              className="font-body text-[14px] font-medium text-warm-teal hover:text-primary-hover transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </>
        ) : (
          <p className="font-body text-[14px] text-muted-grey">
            No {pageType === "online" ? "partners" : "services"} available yet.
            Check back soon.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {vendors.map((vendor, i) => (
        <div
          key={vendor.offer_id}
          className="animate-[fadeSlideIn_200ms_ease-out]"
          style={{ animationDelay: `${Math.min(i * 30, 300)}ms`, animationFillMode: "both" }}
        >
          <VendorCard
            vendor={vendor}
            pageType={pageType}
            onClick={() => onVendorClick(vendor.offer_id)}
          />
        </div>
      ))}
    </div>
  );
}
