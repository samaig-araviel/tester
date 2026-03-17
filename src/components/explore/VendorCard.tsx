"use client";

import Image from "next/image";
import { Heart, ArrowUp, MapPin } from "lucide-react";
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
      className="group flex flex-col bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#C8C3BB] cursor-pointer text-left w-full"
    >
      {/* Cover image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        {vendor.cover_image_url ? (
          <Image
            src={vendor.cover_image_url}
            alt={vendor.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-warm-teal-light to-primary-light flex items-center justify-center">
            <span className="font-heading text-[40px] font-bold text-primary/30">
              {vendor.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Save heart button */}
        <div className="absolute top-3 right-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-150 ${
              vendor.is_saved
                ? "bg-warm-teal text-white"
                : "bg-black/20 text-white hover:bg-black/40"
            }`}
          >
            <Heart
              className={`w-[18px] h-[18px] ${vendor.is_saved ? "fill-white" : ""}`}
            />
          </div>
        </div>

        {/* New badge */}
        {vendor.is_new && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-warm-teal text-white text-[11px] font-semibold uppercase tracking-wide">
              New
            </span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col items-center px-4 py-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-2" style={{ height: 40 }}>
          {vendor.logo_url ? (
            <Image
              src={vendor.logo_url}
              alt={`${vendor.name} logo`}
              width={100}
              height={40}
              className="object-contain max-h-[40px] max-w-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
              <span className="font-heading text-[18px] font-bold text-primary">
                {vendor.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Vendor name */}
        <p className="font-body text-[14px] font-medium text-charcoal truncate w-full text-center">
          {vendor.name}
        </p>

        {/* Location line (in-person only) */}
        {pageType === "in-person" && vendor.location_name && (
          <p className="flex items-center justify-center gap-1 font-body text-[12px] text-muted-grey mt-0.5 truncate w-full">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {vendor.location_name}
          </p>
        )}

        {/* Offer headline */}
        {vendor.offer_headline && (
          <div className="mt-1.5">
            {isBoosted ? (
              <span className="inline-flex items-center gap-0.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-warm-teal text-[13px] font-semibold">
                <ArrowUp className="w-3.5 h-3.5" />
                {vendor.offer_headline}
              </span>
            ) : (
              <span className="font-body text-[13px] font-semibold text-warm-teal">
                {vendor.offer_headline}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
