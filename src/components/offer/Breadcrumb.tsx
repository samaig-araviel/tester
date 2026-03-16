"use client";

import Link from "next/link";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export default function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav className="py-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap font-body text-[13px]">
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-muted-grey" aria-hidden="true">
                  &rarr;
                </span>
              )}
              {isLast || !seg.href ? (
                <span className="text-muted-grey">{seg.label}</span>
              ) : (
                <Link
                  href={seg.href}
                  className="text-warm-teal hover:underline transition-colors"
                >
                  {seg.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
