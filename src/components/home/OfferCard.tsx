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
  return cat.replace(/_/g, " ").toUpperCase();
}

function formatAgeLabel(ageRel: string[] | null | undefined): string | null {
  if (!ageRel || ageRel.length === 0) return null;
  const labelMap: Record<string, string> = {
    expecting: "Pregnancy",
    "0-6m": "Baby",
    "6-24m": "Toddler",
    "2-5y": "Pre-school",
    "5-16y": "School age",
    "0-1": "Baby",
    "2-4": "Toddler",
    "5-11": "School age",
    "12+": "Teens",
  };
  return labelMap[ageRel[0]] ?? ageRel[0];
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
  const ageLabel = formatAgeLabel(ageRelevance);

  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-full bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#C8C3BB] hover:scale-[1.03] flex flex-col"
    >
      {/* Vendor image */}
      <div className="relative w-full h-[160px] bg-primary-light overflow-hidden">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={vendorName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-warm-teal-light to-primary-light flex items-center justify-center">
            <span className="font-heading text-[36px] font-bold text-primary/20">
              {vendorName.charAt(0)}
            </span>
          </div>
        )}

        {/* Top row: NEW badge left, heart right - no overlap */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div>
            {isNew && (
              <span className="px-2.5 py-1 rounded-full bg-warm-teal text-white text-[11px] font-semibold uppercase tracking-wide">
                New
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all duration-150 hover:bg-black/40 cursor-pointer flex-shrink-0"
            aria-label={saved ? "Unsave offer" : "Save offer"}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-150 ${
                saved ? "fill-warm-teal text-warm-teal" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Vendor name centered at top */}
        <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none">
          <span className="px-3 py-1 rounded-lg bg-white/80 backdrop-blur-sm font-body text-[11px] font-semibold text-charcoal shadow-sm max-w-[60%] truncate">
            {vendorName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
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
        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2.5">
          {ageLabel && (
            <span className="px-2 py-0.5 rounded-full border border-border text-muted-grey font-body text-[10px]">
              {ageLabel}
            </span>
          )}
          {deliveryLabel && (
            <span className="px-2 py-0.5 rounded-full border border-border text-muted-grey font-body text-[10px]">
              {deliveryLabel === "IN-PERSON" ? "In-person" : "Online"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
