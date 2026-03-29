"use client";

import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
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
  discountCode,
  websiteUrl,
  isSaved,
  onToggleSave,
}: VendorCardOnlineProps) {
  const [redeemState, setRedeemState] = useState<"idle" | "copying" | "done">("idle");

  const handleRedeem = useCallback(async () => {
    if (redeemState !== "idle") return;

    if (discountCode) {
      // Flow 2: Copy code, show message, then open website after 2s
      try {
        await navigator.clipboard.writeText(discountCode);
      } catch {
        // Clipboard may fail silently
      }
      setRedeemState("copying");
      setTimeout(() => {
        if (websiteUrl) {
          window.open(websiteUrl, "_blank", "noopener,noreferrer");
        }
        setRedeemState("done");
        // Reset back to idle after the website opens
        setTimeout(() => setRedeemState("idle"), 1000);
      }, 2000);
    } else if (websiteUrl) {
      // Flow 1: No discount code, just open the website
      window.open(websiteUrl, "_blank", "noopener,noreferrer");
    }
  }, [redeemState, discountCode, websiteUrl]);

  const redeemLabel =
    redeemState === "copying"
      ? "Code copied, launching website..."
      : "Redeem";

  return (
    <div
      className="bg-surface border border-border rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      style={{ position: "sticky", top: 96 }}
    >
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

      {/* Redeem + Save row */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleRedeem}
          disabled={redeemState === "copying"}
          className="flex-1 h-11 rounded-full bg-warm-teal text-white font-body text-[14px] font-medium transition-all duration-150 hover:opacity-90 cursor-pointer disabled:cursor-wait"
        >
          {redeemLabel}
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
    </div>
  );
}
