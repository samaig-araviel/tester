"use client";

import Image from "next/image";
import { ArrowUp, MapPin } from "lucide-react";
import type { ExploreVendor, PageType } from "@/lib/explore";

interface VendorCardProps {
  vendor: ExploreVendor;
  pageType: PageType;
  onClick: () => void;
}

export default function VendorCard({
  vendor,
  pageType,
  onClick,
}: VendorCardProps) {
  const isBoosted = vendor.featured && vendor.is_new;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center bg-surface rounded-xl border border-border px-4 pt-6 pb-5 min-h-[180px] transition-all duration-150 hover:border-[#C8C3BB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] cursor-pointer text-center w-full"
    >
      {/* Vendor logo */}
      <div className="w-full flex items-center justify-center mb-3" style={{ height: 80 }}>
        {vendor.logo_url ? (
          <Image
            src={vendor.logo_url}
            alt={`${vendor.name} logo`}
            width={120}
            height={80}
            className="object-contain max-h-[80px] max-w-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center">
            <span className="font-heading text-[24px] font-semibold text-primary">
              {vendor.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Vendor name */}
      <p className="font-body text-[14px] font-medium text-charcoal truncate w-full">
        {vendor.name}
      </p>

      {/* Location line (in-person only) */}
      {pageType === "in-person" && vendor.location_name && (
        <p className="flex items-center justify-center gap-1 font-body text-[13px] text-muted-grey mt-0.5 truncate w-full">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {vendor.location_name}
        </p>
      )}

      {/* Offer headline */}
      {vendor.offer_headline && (
        <div className="mt-2">
          {isBoosted ? (
            <span className="inline-flex items-center gap-0.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#3A9D7A] text-[14px] font-semibold">
              <ArrowUp className="w-3.5 h-3.5" />
              {vendor.offer_headline}
            </span>
          ) : (
            <span className="font-body text-[14px] font-semibold text-charcoal">
              {vendor.offer_headline}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
