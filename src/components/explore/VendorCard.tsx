"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import type { ExploreVendor, PageType } from "@/lib/explore";

interface VendorCardProps {
  vendor: ExploreVendor;
  pageType: PageType;
  onClick: () => void;
}

function formatDeliveryType(dt: string | null): string {
  if (!dt) return "";
  const lower = dt.toLowerCase();
  if (lower.includes("online")) return "ONLINE";
  if (lower.includes("in_person") || lower.includes("in-person")) return "IN-PERSON";
  return dt.toUpperCase();
}

function formatCategory(cat: string | null): string {
  if (!cat) return "";
  return cat.replace(/_/g, " ").toUpperCase();
}

function formatAgeLabel(ageRel: string[] | string | null): string | null {
  if (!ageRel) return null;
  const joined = Array.isArray(ageRel) ? ageRel.join(", ") : ageRel;
  if (!joined) return null;
  const parts = joined.split(",").map((s) => s.trim());
  if (parts.length === 0) return null;
  // Map slug to readable label
  const labelMap: Record<string, string> = {
    expecting: "Trying to Conceive & Pregnancy",
    "0-6m": "Baby",
    "6-24m": "Toddler & Early Childhood",
    "2-5y": "Toddler & Early Childhood",
    "5-16y": "Primary & Secondary School",
    "0-1": "Baby",
    "2-4": "Toddler & Early Childhood",
    "5-11": "Primary & Secondary School",
    "12+": "Primary & Secondary School",
  };
  return labelMap[parts[0]] ?? parts[0];
}

export default function VendorCard({
  vendor,
  pageType,
  onClick,
}: VendorCardProps) {
  const deliveryLabel = formatDeliveryType(vendor.delivery_type);
  const categoryLabel = formatCategory(vendor.category);
  const tagLine = [deliveryLabel, categoryLabel].filter(Boolean).join(" \u00B7 ");
  const ageLabel = formatAgeLabel(vendor.age_relevance);

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
        ) : vendor.banner_url ? (
          <Image
            src={vendor.banner_url}
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

        {/* Top row: NEW badge left, heart right */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div>
            {vendor.is_new && (
              <span className="px-2.5 py-1 rounded-full bg-warm-teal text-white text-[11px] font-semibold uppercase tracking-wide">
                New
              </span>
            )}
          </div>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-150 flex-shrink-0 ${
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

        {/* Vendor name centered at top of image */}
        <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none">
          <span className="px-3 py-1 rounded-lg bg-white/80 backdrop-blur-sm font-body text-[11px] font-semibold text-charcoal shadow-sm max-w-[70%] truncate">
            {vendor.name}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col px-4 pt-3.5 pb-4 flex-1">
        {/* Category tag line */}
        {tagLine && (
          <p className="font-body text-[10px] font-medium text-muted-grey uppercase tracking-wider mb-1">
            {tagLine}
          </p>
        )}

        {/* Vendor name */}
        <h3 className="font-heading text-[15px] font-semibold text-soft-navy leading-snug">
          {vendor.name}
        </h3>

        {/* Short descriptor */}
        {vendor.short_descriptor && (
          <p className="font-body text-[13px] text-muted-grey mt-1 line-clamp-2 leading-relaxed">
            {vendor.short_descriptor}
          </p>
        )}

        {/* Bottom row: age pill + delivery type pill */}
        <div className="flex flex-wrap items-center gap-2 mt-auto pt-3">
          {ageLabel && (
            <span className="px-2.5 py-1 rounded-full border border-border text-muted-grey font-body text-[11px]">
              {ageLabel}
            </span>
          )}
          {pageType === "in-person" && (
            <span className="px-2.5 py-1 rounded-full border border-border text-muted-grey font-body text-[11px]">
              In-person
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
