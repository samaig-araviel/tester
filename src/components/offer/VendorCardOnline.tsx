"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import RedemptionPanel from "./RedemptionPanel";

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
  discountCode,
  websiteUrl,
  isSaved,
  onToggleSave,
}: VendorCardOnlineProps) {
  const [redeemOpen, setRedeemOpen] = useState(false);

  return (
    <div
      className="bg-surface border border-border rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      style={{ position: "sticky", top: 96 }}
    >
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

      {/* Redeem + Save row */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setRedeemOpen(!redeemOpen)}
          className="flex-1 h-11 rounded-full bg-warm-teal text-white font-body text-[14px] font-medium transition-all duration-150 hover:opacity-90 cursor-pointer"
        >
          {redeemOpen ? "Hide" : "Redeem"}
        </button>
        <button
          onClick={onToggleSave}
          className="w-11 h-11 rounded-full border border-border flex items-center justify-center transition-all duration-150 hover:border-warm-teal cursor-pointer"
          aria-label={isSaved ? "Unsave offer" : "Save offer"}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-150 ${
              isSaved
                ? "fill-warm-teal text-warm-teal"
                : "text-muted-grey"
            }`}
          />
        </button>
      </div>

      {/* Terms link */}
      <p className="text-center mt-3">
        <button
          onClick={() => {
            // Scroll to terms accordion
            document.getElementById("accordion-terms")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="font-body text-[13px] text-warm-teal hover:underline cursor-pointer"
        >
          Terms & conditions
        </button>
      </p>

      {/* Redemption panel */}
      {redeemOpen && (
        <RedemptionPanel
          offerHeadline={offerHeadline}
          discountCode={discountCode}
          websiteUrl={websiteUrl}
        />
      )}
    </div>
  );
}
