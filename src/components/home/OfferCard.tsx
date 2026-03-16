"use client";

import { useState } from "react";
import { Heart, ArrowUp } from "lucide-react";
import Image from "next/image";

interface OfferCardProps {
  id: string;
  vendorName: string;
  vendorLogoUrl: string | null;
  bannerUrl: string | null;
  offerHeadline: string;
  isNew?: boolean;
  isBoosted?: boolean;
  isSaved?: boolean;
  onToggleSave?: (offerId: string) => void;
  onClick?: () => void;
}

export default function OfferCard({
  id,
  vendorName,
  vendorLogoUrl,
  bannerUrl,
  offerHeadline,
  isNew,
  isBoosted,
  isSaved: initialSaved = false,
  onToggleSave,
  onClick,
}: OfferCardProps) {
  const [saved, setSaved] = useState(initialSaved);

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation();
    setSaved(!saved);
    onToggleSave?.(id);
  }

  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[264px] bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Vendor image */}
      <div className="relative w-full h-[160px] bg-primary-light overflow-hidden">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={vendorName}
            fill
            className="object-cover"
            sizes="264px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-light to-accent/40" />
        )}

        {/* New pill */}
        {isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-warm-teal text-white text-[12px] font-medium">
            New
          </span>
        )}

        {/* Save heart */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal/40 backdrop-blur-sm flex items-center justify-center transition-all duration-150 hover:bg-charcoal/60 cursor-pointer"
          aria-label={saved ? "Unsave offer" : "Save offer"}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-150 ${
              saved ? "fill-warm-teal text-warm-teal" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-0 text-center">
        {/* Vendor logo */}
        <div className="flex justify-center -mt-6 mb-2">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center overflow-hidden shadow-sm">
            {vendorLogoUrl ? (
              <Image
                src={vendorLogoUrl}
                alt={`${vendorName} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <span className="font-heading text-[14px] font-semibold text-primary">
                {vendorName.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Vendor name */}
        <p className="font-body text-[14px] font-medium text-charcoal truncate">
          {vendorName}
        </p>

        {/* Offer headline */}
        <p
          className={`font-body text-[14px] font-semibold mt-1 truncate ${
            isBoosted ? "text-warm-teal" : "text-warm-teal"
          }`}
        >
          {isBoosted && (
            <ArrowUp className="w-3.5 h-3.5 inline-block mr-0.5 -mt-0.5" />
          )}
          {offerHeadline}
        </p>
      </div>
    </div>
  );
}
