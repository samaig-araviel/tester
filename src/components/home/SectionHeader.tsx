"use client";

import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  helperText: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function SectionHeader({
  title,
  helperText,
  ctaText,
  ctaHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="font-heading text-[24px] font-semibold text-soft-navy">
          {title}
        </h2>
        <p className="font-body text-[14px] text-muted-grey mt-1">
          {helperText}
        </p>
      </div>
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="font-body text-[14px] font-medium text-warm-teal hover:text-primary-hover transition-colors whitespace-nowrap"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}
