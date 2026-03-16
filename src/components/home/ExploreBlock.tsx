"use client";

import Link from "next/link";
import Image from "next/image";

interface ExploreBlockProps {
  direction: "image-right" | "image-left";
  pillText: string;
  heading: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string | null;
  imageAlt: string;
}

export default function ExploreBlock({
  direction,
  pillText,
  heading,
  body,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: ExploreBlockProps) {
  const textContent = (
    <div className="flex flex-col justify-center py-8 px-2">
      <span className="inline-block self-start px-3 py-1 rounded-full bg-warm-teal-light text-warm-teal text-[12px] font-medium mb-4">
        {pillText}
      </span>
      <h2 className="font-heading text-[28px] font-semibold text-soft-navy leading-snug">
        {heading}
      </h2>
      <p className="font-body text-[15px] text-muted-grey mt-3 leading-relaxed max-w-[420px]">
        {body}
      </p>
      <Link
        href={ctaHref}
        className="inline-flex items-center justify-center self-start mt-6 px-7 h-[44px] rounded-full bg-soft-navy text-white font-body text-[15px] font-medium transition-all duration-150 hover:opacity-90 hover:scale-[1.02]"
      >
        {ctaText}
      </Link>
    </div>
  );

  const imageContent = (
    <div className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background:
              direction === "image-right"
                ? "linear-gradient(135deg, #E6F2EF 0%, #F0D5BF 50%, #EEF4F8 100%)"
                : "linear-gradient(135deg, #EEF4F8 0%, #E6F2EF 50%, #F0D5BF 100%)",
          }}
        >
          {/* Placeholder illustration */}
          <div className="w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 200 160"
              fill="none"
              className="w-40 h-32 opacity-30"
            >
              <rect x="40" y="40" width="120" height="80" rx="8" fill="#0A2342" />
              <circle cx="100" cy="70" r="20" fill="#117A65" />
              <path d="M60 110 L80 85 L110 100 L130 75 L160 110Z" fill="#F0D5BF" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-surface rounded-2xl border border-border overflow-hidden">
      <div
        className={`flex flex-col md:flex-row gap-0 ${
          direction === "image-left" ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <div className="flex-1 p-8 md:p-12 flex items-center">
          {textContent}
        </div>
        <div className="flex-1 p-6 md:p-8">
          {imageContent}
        </div>
      </div>
    </section>
  );
}
