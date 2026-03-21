"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";

interface OfferCardProps {
  id: string;
  vendorName: string;
  vendorLogoUrl: string | null;
  bannerUrl: string | null;
  offerHeadline: string;
  isNew?: boolean;
  isSaved?: boolean;
  category?: string | null;
  deliveryType?: string | null;
  shortDescriptor?: string | null;
  ageRelevance?: string[] | null;
  onToggleSave?: (offerId: string) => void;
  onClick?: () => void;
}

function formatDeliveryType(dt: string | null | undefined): string {
  if (!dt) return "";
  const lower = dt.toLowerCase();
  if (lower.includes("online")) return "ONLINE";
  if (lower.includes("in_person") || lower.includes("in-person")) return "IN-PERSON";
  return dt.toUpperCase();
}

function formatCategory(cat: string | null | undefined): string {
  if (!cat) return "";
  return cat.toUpperCase();
}

function formatAgeRelevance(ageRel: string[] | null | undefined): string | null {
  if (!ageRel || ageRel.length === 0) return null;
  return ageRel[0];
}

export default function OfferCard({
  id,
  vendorName,
  bannerUrl,
  isNew,
  isSaved: initialSaved = false,
  category,
  deliveryType,
  shortDescriptor,
  ageRelevance,
  onToggleSave,
  onClick,
}: OfferCardProps) {
  const [saved, setSaved] = useState(initialSaved);

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation();
    setSaved(!saved);
    onToggleSave?.(id);
  }

  const deliveryLabel = formatDeliveryType(deliveryType);
  const categoryLabel = formatCategory(category);
  const tagLine = [deliveryLabel, categoryLabel].filter(Boolean).join(" \u00B7 ");
  const ageLabel = formatAgeRelevance(ageRelevance);

  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-full bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
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
          <div className="w-full h-full bg-gradient-to-br from-warm-teal-light to-primary-light flex items-center justify-center">
            <span className="font-heading text-[36px] font-bold text-primary/20">
              {vendorName.charAt(0)}
            </span>
          </div>
        )}

        {/* New / Match pill */}
        {isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-warm-teal text-white text-[11px] font-semibold uppercase tracking-wide">
            New
          </span>
        )}

        {/* Save heart */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all duration-150 hover:bg-black/40 cursor-pointer"
          aria-label={saved ? "Unsave offer" : "Save offer"}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-150 ${
              saved ? "fill-warm-teal text-warm-teal" : "text-white"
            }`}
          />
        </button>

        {/* Vendor name pill at bottom of image */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm font-body text-[11px] font-semibold text-charcoal shadow-sm">
            {vendorName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4">
        {/* Category tag line */}
        {tagLine && (
          <p className="font-body text-[10px] font-medium text-muted-grey uppercase tracking-wider mb-1">
            {tagLine}
          </p>
        )}

        {/* Vendor name */}
        <h3 className="font-heading text-[14px] font-semibold text-soft-navy leading-snug">
          {vendorName}
        </h3>

        {/* Short descriptor */}
        {shortDescriptor && (
          <p className="font-body text-[12px] text-muted-grey mt-0.5 line-clamp-2 leading-relaxed">
            {shortDescriptor}
          </p>
        )}

        {/* Bottom pills */}
        {ageLabel && (
          <div className="mt-2.5">
            <span className="px-2 py-0.5 rounded-full border border-primary/20 text-primary font-body text-[10px] font-medium">
              {ageLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
