"use client";

import { ChevronRight } from "lucide-react";

interface HubCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  gradientFrom?: string;
  gradientTo?: string;
  illustrationHeight?: number;
  onClick?: () => void;
}

export default function HubCard({
  title,
  description,
  ctaLabel,
  gradientFrom = "#D9EFEA",
  gradientTo = "#C8A96E",
  illustrationHeight = 140,
  onClick,
}: HubCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:scale-[1.03]"
    >
      {/* Illustration area */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: illustrationHeight,
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      >
        <svg
          viewBox="0 0 120 80"
          fill="none"
          className="w-20 h-14 opacity-40"
          aria-hidden="true"
        >
          <rect x="20" y="15" width="80" height="50" rx="6" fill="#0B4F4F" />
          <circle cx="60" cy="35" r="12" fill="#117A65" />
          <path d="M30 60 L45 45 L65 55 L80 40 L100 60Z" fill="#C8A96E" />
        </svg>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-3">
        <h3 className="font-heading text-[16px] font-semibold text-charcoal leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="font-body text-[13px] text-muted-grey mt-1 line-clamp-1">
          {description}
        </p>
        <div className="flex items-center gap-1 mt-3">
          <span className="font-body text-[14px] font-medium text-warm-teal group-hover:underline">
            {ctaLabel}
          </span>
          <ChevronRight className="w-4 h-4 text-warm-teal transition-transform duration-150 group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
