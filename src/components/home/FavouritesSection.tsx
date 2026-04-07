"use client";

import SectionHeader from "./SectionHeader";
import { FavouriteTile, SeeAllTile } from "./FavouriteTile";
import { Heart } from "lucide-react";

interface SavedVendor {
  id: string;
  offer_id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
}

interface FavouritesSectionProps {
  savedVendors: SavedVendor[];
}

export default function FavouritesSection({
  savedVendors,
}: FavouritesSectionProps) {
  const showSeeAll = savedVendors.length > 7;
  const visibleVendors = savedVendors.slice(0, 7);

  // Empty state
  if (savedVendors.length === 0) {
    return (
      <section>
        <SectionHeader
          title="My favourites"
          helperText="Your saved perks, ready when you need them."
        />
        <div className="flex items-center gap-4">
          {/* Ghost tiles */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-[140px] h-[100px] rounded-xl border border-dashed border-border bg-bg flex items-center justify-center">
                <Heart className="w-5 h-5 text-border" />
              </div>
              <div className="h-4 w-16 mx-auto mt-2 rounded bg-border/30" />
            </div>
          ))}
        </div>
        <p className="font-body text-[14px] text-muted-grey text-center mt-4">
          You haven&apos;t saved anything yet. Tap ♡ on any offer to keep it here.
        </p>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader
        title="My favourites"
        helperText="Your saved perks, ready when you need them."
        ctaText={showSeeAll ? "See all" : undefined}
        ctaHref={showSeeAll ? "/saved" : undefined}
      />
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {visibleVendors.map((vendor) => (
          <FavouriteTile
            key={vendor.id}
            vendorName={vendor.vendor_name}
            vendorLogoUrl={vendor.vendor_logo_url}
            href={`/offer/${vendor.offer_id}`}
          />
        ))}
        {showSeeAll && <SeeAllTile href="/saved" />}
      </div>
      {savedVendors.length > 0 && savedVendors.length < 3 && (
        <p className="font-body text-[13px] text-muted-grey italic mt-4">
          Save offers you want to come back to.
        </p>
      )}
    </section>
  );
}
