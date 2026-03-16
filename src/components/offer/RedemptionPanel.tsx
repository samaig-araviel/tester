"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface RedemptionPanelProps {
  offerHeadline: string;
  discountCode: string | null;
  websiteUrl: string | null;
}

export default function RedemptionPanel({
  offerHeadline,
  discountCode,
  websiteUrl,
}: RedemptionPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!discountCode) return;
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="mt-4 pt-4 border-t border-border animate-[fadeSlideIn_200ms_ease-out]">
      <p className="font-heading text-[14px] font-semibold text-charcoal">
        Your member offer
      </p>
      <p className="font-body text-[14px] text-charcoal mt-1">
        Offer: {offerHeadline}
      </p>

      {discountCode && (
        <>
          {/* Code block */}
          <div className="mt-3">
            <p className="font-body text-[12px] text-muted-grey mb-1">
              Your code
            </p>
            <div className="bg-warm-sand rounded-xl px-3 py-3 text-center">
              <span className="font-heading text-[18px] font-semibold text-charcoal tracking-wide">
                {discountCode}
              </span>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="mt-3 w-full h-11 rounded-full border border-border bg-surface font-body text-[14px] font-medium text-charcoal flex items-center justify-center gap-2 transition-all duration-150 hover:border-primary hover:shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-warm-teal" />
                Code copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy code
              </>
            )}
          </button>
          <p className="font-body text-[12px] text-muted-grey text-center mt-1.5">
            Enter this code at checkout on the partner site.
          </p>
        </>
      )}

      {/* Launch vendor site */}
      {websiteUrl && (
        <>
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full h-11 rounded-full bg-warm-teal text-white font-body text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-150 hover:opacity-90"
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
