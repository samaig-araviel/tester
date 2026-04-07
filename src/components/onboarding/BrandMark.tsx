"use client";

import { Leaf } from "lucide-react";

interface BrandMarkProps {
  variant?: "light" | "dark";
}

/**
 * The Parentfits logo lockup used throughout the onboarding flow.
 * `light` renders on dark backgrounds (blue hero), `dark` on white.
 */
export default function BrandMark({ variant = "dark" }: BrandMarkProps) {
  const isLight = variant === "light";
  const iconWrapClass = isLight
    ? "bg-white text-[#0B4F4F]"
    : "bg-[#0B4F4F] text-white";
  const wordClass = isLight ? "text-white" : "text-[#1A1F36]";
  const softWordClass = isLight ? "text-white/70" : "text-[#6B7280]";

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${iconWrapClass}`}
      >
        <Leaf className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="font-heading text-[20px] font-bold tracking-tight">
        <span className={wordClass}>Parent</span>
        <span className={softWordClass}>fits</span>
      </span>
    </div>
  );
}
