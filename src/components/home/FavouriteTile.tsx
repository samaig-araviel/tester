"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FavouriteTileProps {
  vendorName: string;
  vendorLogoUrl: string | null;
  href: string;
}

export function FavouriteTile({
  vendorName,
  vendorLogoUrl,
  href,
}: FavouriteTileProps) {
  return (
    <Link href={href} className="flex-shrink-0 group">
      <div className="w-[140px] h-[100px] rounded-xl border border-border bg-surface flex items-center justify-center transition-all duration-150 group-hover:border-warm-teal overflow-hidden">
        {vendorLogoUrl ? (
          <Image
            src={vendorLogoUrl}
            alt={`${vendorName} logo`}
            width={96}
            height={64}
            className="object-contain max-w-[80%] max-h-[80%]"
          />
        ) : (
          <span className="font-heading text-[20px] font-semibold text-primary">
            {vendorName.charAt(0)}
          </span>
        )}
      </div>
      <p className="font-body text-[13px] text-charcoal text-center mt-2 truncate w-[140px]">
        {vendorName}
      </p>
    </Link>
  );
}

export function SeeAllTile({ href }: { href: string }) {
  return (
    <Link href={href} className="flex-shrink-0 group">
      <div className="w-[140px] h-[100px] rounded-xl border border-border bg-surface flex items-center justify-center transition-all duration-150 group-hover:border-warm-teal">
        <MoreHorizontal className="w-6 h-6 text-muted-grey group-hover:text-warm-teal transition-colors" />
      </div>
      <p className="font-body text-[13px] text-charcoal text-center mt-2">
        See all
      </p>
    </Link>
  );
}
