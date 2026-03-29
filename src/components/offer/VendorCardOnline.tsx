"use client";

import { Heart, ExternalLink } from "lucide-react";
import Image from "next/image";

interface VendorCardOnlineProps {
  vendorName: string;
  vendorLogoUrl: string | null;
  offerHeadline: string;
  discountCode: string | null;
  websiteUrl: string | null;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function VendorCardOnline({
  vendorName,
  vendorLogoUrl,
  offerHeadline,
  websiteUrl,
  isSaved,
  onToggleSave,
}: VendorCardOnlineProps) {
  function handleRedeem() {
    if (websiteUrl) {
      window.open(websiteUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div
      className="relative bg-surface border border-border rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      style={{ position: "sticky", top: 96 }}
    >
      {/* Save button — top right */}
      <button
        onClick={onToggleSave}
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-150 hover:border-warm-teal cursor-pointer bg-surface"
        aria-label={isSaved ? "Unsave offer" : "Save offer"}
      >
        <Heart
          className={`w-[18px] h-[18px] transition-colors duration-150 ${
            isSaved
              ? "fill-warm-teal text-warm-teal"
              : "text-muted-grey"
          }`}
        />
      </button>

      {/* Service type tag */}
      <span className="inline-block px-2.5 py-1 mb-4 rounded-md bg-primary-light text-primary font-body text-[11px] font-semibold uppercase tracking-wide">
        Online
      </span>

      {/* Vendor logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-xl bg-surface border border-border flex items-center justify-center overflow-hidden">
          {vendorLogoUrl ? (
            <Image
              src={vendorLogoUrl}
              alt={`${vendorName} logo`}
              width={52}
              height={52}
              className="object-contain"
            />
          ) : (
            <span className="font-heading text-[20px] font-semibold text-primary">
              {vendorName.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Offer headline */}
      <p className="font-heading text-[15px] font-semibold text-charcoal text-center">
        {offerHeadline}
      </p>

      {/* Redeem button */}
      <button
        onClick={handleRedeem}
        disabled={!websiteUrl}
        className="w-full h-11 rounded-full bg-warm-teal text-white font-body text-[14px] font-medium flex items-center justify-center gap-1.5 mt-4 transition-all duration-150 hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Redeem
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
