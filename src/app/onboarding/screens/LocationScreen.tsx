"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface LocationScreenProps {
  postcode: string | null;
  onNext: (postcode: string) => void;
  onSkip: () => void;
  isPending: boolean;
}

export default function LocationScreen({ postcode, onNext, onSkip, isPending }: LocationScreenProps) {
  const [value, setValue] = useState(postcode ?? "");

  const isValid = value.trim().length >= 3;

  return (
    <div className="pt-8 sm:pt-12">
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 sm:p-10 w-full max-w-[520px] mx-auto">
        <h2 className="font-heading text-[24px] font-bold text-text-primary mb-2">
          Where are you based?
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          Enter your postcode so we can show nearby services and support.
        </p>

        <div className="mb-8">
          <label htmlFor="postcode" className="block font-body text-[13px] font-medium text-text-primary mb-1.5">
            Postcode
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-grey" />
            <input
              id="postcode"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
              placeholder="e.g. SW1A 1AA"
              className="w-full h-[44px] pl-9 pr-4 rounded-xl border border-border bg-surface font-body text-[15px] text-text-primary placeholder:text-muted-grey focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              autoComplete="postal-code"
            />
          </div>
        </div>

        <button
          onClick={() => isValid && onNext(value.trim())}
          disabled={!isValid || isPending}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Continue"}
        </button>

        <button
          onClick={onSkip}
          disabled={isPending}
          className="w-full mt-3 py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
