"use client";

import { Heart, ExternalLink } from "lucide-react";
import Image from "next/image";

interface VendorCardInPersonProps {
  vendorName: string;
  vendorLogoUrl: string | null;
  shortDescriptor: string | null;
  offerTitle: string | null;
  websiteUrl: string | null;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function VendorCardInPerson({
  vendorName,
  vendorLogoUrl,
  shortDescriptor,
  offerTitle,
  websiteUrl,
  isSaved,
  onToggleSave,
}: VendorCardInPersonProps) {
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
        In-Person
      </span>

      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
          {vendorLogoUrl ? (
            <Image
              src={vendorLogoUrl}
              alt={`${vendorName} logo`}
              width={40}
              height={40}
              className="object-contain"
            />
          ) : (
            <span className="font-heading text-[16px] font-semibold text-primary">
              {vendorName.charAt(0)}
            </span>
          )}
        </div>
        <h2 className="font-heading text-[20px] font-semibold text-charcoal pr-10">
          {vendorName}
        </h2>
      </div>

      {/* Descriptor */}
      {shortDescriptor && (
        <p className="font-body text-[14px] text-muted-grey mt-3 leading-relaxed">
          {shortDescriptor}
        </p>
      )}

      {/* Offer title */}
      {offerTitle && (
        <p className="font-body text-[16px] text-muted-grey mt-3 leading-relaxed text-center">
          {offerTitle}
        </p>
      )}

      {/* Launch vendor site */}
      {websiteUrl && (
        <>
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full h-11 rounded-full bg-warm-teal text-white font-body text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-150 hover:opacity-90"
          >
            Launch vendor site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="font-body text-[12px] text-muted-grey text-center mt-1.5">
            You&apos;ll be redirected to the partner website in a new tab.
          </p>
        </>
      )}
    </div>
  );
}
