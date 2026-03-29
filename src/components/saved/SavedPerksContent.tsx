"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Heart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Toast from "@/components/home/Toast";

/* ─── Types ─── */

export interface SavedOffer {
  offer_id: string;
  saved_at: string;
  vendor_name: string;
  vendor_logo_url: string | null;
  cover_image_url: string | null;
  offer_headline: string;
  delivery_type: string | null;
  category: string | null;
  is_new: boolean;
}

interface SavedPerksContentProps {
  savedOffers: SavedOffer[];
  userId: string;
}

/* ─── Helpers ─── */

type FilterType = "all" | "online" | "in-person";
type SortType = "recent" | "a-z" | "z-a";

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "online", label: "Online" },
  { key: "in-person", label: "In-person" },
];

const SORT_OPTIONS: { key: SortType; label: string }[] = [
  { key: "recent", label: "Recently saved" },
  { key: "a-z", label: "A to Z" },
  { key: "z-a", label: "Z to A" },
];

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  if (weeks < 5) return `${weeks} weeks ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function matchesDeliveryType(
  deliveryType: string | null,
  filter: FilterType
): boolean {
  if (filter === "all") return true;
  const dt = (deliveryType ?? "").toLowerCase();
  if (filter === "online") return dt.includes("online");
  return dt.includes("in-person") || dt.includes("in_person") || (!dt.includes("online") && dt.length > 0);
}

/* ─── Sort Dropdown ─── */

function SortDropdown({
  sortBy,
  onSortChange,
}: {
  sortBy: SortType;
  onSortChange: (key: SortType) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel =
    SORT_OPTIONS.find((o) => o.key === sortBy)?.label ?? "Recently saved";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 h-[40px] px-4 rounded-[12px] border border-[#E7E2DA] bg-surface font-body text-[14px] text-charcoal hover:border-muted-grey transition-colors cursor-pointer"
      >
        {activeLabel}
        <ChevronDown
          className={`w-4 h-4 text-muted-grey transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-48 bg-surface rounded-xl shadow-lg border border-border overflow-hidden animate-[fadeSlideIn_150ms_ease-out] z-50 p-1.5">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onSortChange(option.key);
                setOpen(false);
              }}
              className={`flex items-center w-full h-[40px] px-3 rounded-lg font-body text-[14px] transition-colors cursor-pointer ${
                sortBy === option.key
                  ? "bg-warm-teal-light text-warm-teal font-medium"
                  : "text-charcoal hover:bg-primary-light"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Saved Offer Card ─── */

function SavedOfferCard({
  offer,
  removing,
  onUnsave,
}: {
  offer: SavedOffer;
  removing: boolean;
  onUnsave: (offerId: string) => void;
}) {
  function handleHeartClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onUnsave(offer.offer_id);
  }

  const deliveryLabel = (offer.delivery_type ?? "").toLowerCase().includes("online")
    ? "Online"
    : "In-person";

  const categoryLabel = formatCategory(offer.category);

  return (
    <div
      className={`transition-all duration-200 ${
        removing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <Link
        href={`/offer/${offer.offer_id}`}
        className="group flex flex-col bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#C8C3BB]"
      >
        {/* Cover image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 3" }}
        >
          {offer.cover_image_url ? (
            <Image
              src={offer.cover_image_url}
              alt={offer.vendor_name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-warm-teal-light to-primary-light flex items-center justify-center">
              <span className="font-heading text-[40px] font-bold text-primary/30">
                {offer.vendor_name.charAt(0)}
              </span>
            </div>
          )}

          {/* Heart button - always filled */}
          <button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-warm-teal flex items-center justify-center backdrop-blur-sm transition-all duration-150 hover:bg-primary-hover cursor-pointer"
            aria-label="Remove from saved"
          >
            <Heart className="w-[18px] h-[18px] fill-white text-white" />
          </button>

          {/* New badge */}
          {offer.is_new && (
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
          <div
            className="flex items-center justify-center mb-2"
            style={{ height: 40 }}
          >
            {offer.vendor_logo_url ? (
              <Image
                src={offer.vendor_logo_url}
                alt={`${offer.vendor_name} logo`}
                width={100}
                height={40}
                className="object-contain max-h-[40px] max-w-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <span className="font-heading text-[18px] font-bold text-primary">
                  {offer.vendor_name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Vendor name */}
          <p className="font-body text-[14px] font-medium text-charcoal truncate w-full text-center">
            {offer.vendor_name}
          </p>

          {/* Delivery type + Category tag */}
          {(deliveryLabel || categoryLabel) && (
            <p className="font-body text-[12px] text-muted-grey mt-0.5 truncate w-full text-center">
              {deliveryLabel}
              {categoryLabel && ` · ${categoryLabel}`}
            </p>
          )}

          {/* Offer headline */}
          {offer.offer_headline && (
            <span className="font-body text-[13px] font-semibold text-warm-teal mt-1.5 truncate w-full text-center block">
              {offer.offer_headline}
            </span>
          )}
        </div>
      </Link>

      {/* Saved time - below the card */}
      <p className="font-body text-[12px] text-muted-grey text-center mt-2">
        Saved {relativeTime(offer.saved_at)}
      </p>
    </div>
  );
}

function formatCategory(category: string | null): string {
  if (!category) return "";
  const map: Record<string, string> = {
    childcare: "Childcare",
    pregnancy_postpartum: "Pregnancy",
    home_support: "Home Support",
    baby_early_years: "Baby & Early Years",
    after_school: "After-School",
    wellbeing: "Wellbeing",
  };
  return map[category] ?? category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ─── Empty State ─── */

function EmptyState({ hasFilters, onClearFilter }: { hasFilters: boolean; onClearFilter: () => void }) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-surface border border-border rounded-2xl p-12 text-center max-w-md mx-auto">
          <Heart className="w-12 h-12 text-border mx-auto mb-4" />
          <h2 className="font-heading text-[20px] font-semibold text-charcoal">
            No saved perks match this filter
          </h2>
          <p className="font-body text-[15px] text-muted-grey mt-2">
            Try a different filter to see your saved offers.
          </p>
          <button
            onClick={onClearFilter}
            className="mt-6 inline-flex items-center justify-center h-[44px] px-6 rounded-xl bg-primary text-white font-body text-[14px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-surface border border-border rounded-2xl p-12 text-center max-w-md mx-auto">
        <Heart className="w-16 h-16 text-border mx-auto mb-4" strokeWidth={1.2} />
        <h2 className="font-heading text-[20px] font-semibold text-charcoal">
          No saved perks yet
        </h2>
        <p className="font-body text-[15px] text-muted-grey mt-2 max-w-sm mx-auto">
          Tap the heart on any offer to save it here for easy access later.
        </p>
        <Link
          href="/explore/online"
          className="mt-6 inline-flex items-center justify-center h-[44px] px-6 rounded-xl bg-primary text-white font-body text-[14px] font-semibold hover:bg-primary-hover transition-colors"
        >
          Explore services
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Content ─── */

export default function SavedPerksContent({
  savedOffers: initialOffers,
  userId,
}: SavedPerksContentProps) {
  const [offers, setOffers] = useState<SavedOffer[]>(initialOffers);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("recent");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    undo?: () => void;
  } | null>(null);

  // Filter + sort pipeline
  const filteredOffers = useMemo(() => {
    let result = offers.filter((o) => matchesDeliveryType(o.delivery_type, filterType));

    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime()
        );
        break;
      case "a-z":
        result.sort((a, b) => a.vendor_name.localeCompare(b.vendor_name));
        break;
      case "z-a":
        result.sort((a, b) => b.vendor_name.localeCompare(a.vendor_name));
        break;
    }

    return result;
  }, [offers, filterType, sortBy]);

  const handleUnsave = useCallback(
    (offerId: string) => {
      const removedOffer = offers.find((o) => o.offer_id === offerId);
      if (!removedOffer) return;

      // Start fade-out animation
      setRemovingId(offerId);

      // After animation completes, remove from state and call DB
      setTimeout(async () => {
        setOffers((prev) => prev.filter((o) => o.offer_id !== offerId));
        setRemovingId(null);

        const supabase = createClient();
        const { error } = await supabase
          .from("saved_offers")
          .delete()
          .eq("user_id", userId)
          .eq("offer_id", offerId);

        if (error) {
          // Revert on error
          setOffers((prev) =>
            [...prev, removedOffer].sort(
              (a, b) =>
                new Date(b.saved_at).getTime() -
                new Date(a.saved_at).getTime()
            )
          );
          return;
        }

        // Show toast with undo
        setToast({
          message: "Removed from saved perks",
          undo: async () => {
            const sb = createClient();
            const { error: undoError } = await sb
              .from("saved_offers")
              .insert({ user_id: userId, offer_id: offerId });

            if (!undoError) {
              setOffers((prev) =>
                [...prev, removedOffer].sort(
                  (a, b) =>
                    new Date(b.saved_at).getTime() -
                    new Date(a.saved_at).getTime()
                )
              );
            }
          },
        });
      }, 200);
    },
    [offers, userId]
  );

  const totalCount = offers.length;

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-heading text-[28px] md:text-[32px] font-bold text-soft-navy">
            Saved Perks
          </h1>
          {totalCount > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-warm-sand font-body text-[13px] text-muted-grey">
              {totalCount} saved
            </span>
          )}
        </div>
        <p className="font-body text-[15px] text-muted-grey">
          Your saved offers and services, all in one place.
        </p>
      </div>

      {/* Filter/Sort Row */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Filter pills */}
          <div className="flex items-center gap-2">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilterType(option.key)}
                className={`h-[36px] px-4 rounded-full font-body text-[13px] font-medium border transition-all duration-150 cursor-pointer ${
                  filterType === option.key
                    ? "bg-[#D9EFEA] border-[#14827C] text-[#14827C]"
                    : "bg-[#EDE5D5] border-[#E7E2DA] text-charcoal hover:border-muted-grey"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      )}

      {/* Grid or Empty State */}
      {filteredOffers.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <SavedOfferCard
              key={offer.offer_id}
              offer={offer}
              removing={removingId === offer.offer_id}
              onUnsave={handleUnsave}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          hasFilters={filterType !== "all"}
          onClearFilter={() => setFilterType("all")}
        />
      )}

      {/* Toast */}
      <Toast
        message={toast?.message ?? ""}
        undoAction={toast?.undo}
        visible={!!toast}
        onClose={() => setToast(null)}
      />
    </>
  );
}
