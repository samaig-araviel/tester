"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

interface HeroBannerProps {
  firstName: string;
  isReturning: boolean;
}

const FAMILY_IMAGE_URL =
  "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80&auto=format&fit=crop";

export default function HeroBanner({ firstName, isReturning }: HeroBannerProps) {
  const bodyText = isReturning
    ? "From finding the right childcare, to accessing wellbeing support and exclusive family perks, Parentfits helps you get more from your benefits."
    : "From finding the right childcare, to accessing wellbeing support and exclusive family perks, Parentfits helps you get more from your benefits.";

  return (
    <section className="w-full py-8 md:py-12">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        {/* Left: Text content */}
        <div
          className="flex-1 flex flex-col justify-center max-w-xl"
          style={{ animation: "fadeSlideIn 0.5s ease-out" }}
        >
          {/* Label */}
          <span className="inline-block self-start font-body text-[13px] font-semibold tracking-widest uppercase text-primary mb-6">
            {isReturning ? `Welcome back, ${firstName}!` : "Explore now!"}
          </span>

          {/* Large serif heading */}
          <h1 className="leading-[1.1] text-soft-navy mb-8">
            <span
              className="block text-[36px] md:text-[48px] lg:text-[56px] font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Find the right
            </span>
            <span
              className="block text-[36px] md:text-[48px] lg:text-[56px] font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              support for your
            </span>
            <span
              className="block text-[36px] md:text-[48px] lg:text-[56px] font-bold italic text-primary"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              family
            </span>
          </h1>

          {/* Body text */}
          <p className="font-body text-[16px] md:text-[17px] text-muted-grey leading-relaxed max-w-[440px] mb-8">
            {bodyText}
          </p>

          {/* CTA + Social proof row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              href="/explore/online"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-primary text-white font-body text-[15px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg active:translate-y-0"
            >
              Online Services
            </Link>
            <Link
              href="/explore/in-person"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-surface text-text-primary font-body text-[15px] font-medium border border-border transition-all duration-200 hover:border-primary hover:shadow-sm"
            >
              In-Person Services
            </Link>
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-2 mt-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <span className="font-body text-[14px] font-semibold text-soft-navy">
              5.0
            </span>
            <span className="font-body text-[13px] text-muted-grey">
              from 200+ <span className="underline">reviews</span>
            </span>
          </div>
        </div>

        {/* Right: Bento grid */}
        <div
          className="flex-1 w-full lg:max-w-[540px]"
          style={{ animation: "slideLeft 0.6s ease-out 0.15s both" }}
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Top-left: Family photo (larger) */}
            <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden bg-warm-sand aspect-[4/3]">
              <Image
                src={FAMILY_IMAGE_URL}
                alt="Happy family spending quality time together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 280px"
                priority
              />
            </div>

            {/* Top-right: Services stat card */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col justify-between aspect-[4/3]" style={{ backgroundColor: "#F0EBE3" }}>
              <span
                className="text-[36px] md:text-[44px] font-bold text-soft-navy leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                100+
              </span>
              <div className="flex items-end justify-between mt-auto">
                <span className="font-body text-[14px] md:text-[15px] text-muted-grey font-medium">
                  Services
                </span>
                {/* Globe icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="opacity-80"
                >
                  <circle cx="24" cy="24" r="20" stroke="#0A2342" strokeWidth="1.5" fill="none" />
                  <ellipse cx="24" cy="24" rx="10" ry="20" stroke="#0A2342" strokeWidth="1.5" fill="none" />
                  <line x1="4" y1="24" x2="44" y2="24" stroke="#0A2342" strokeWidth="1.5" />
                  <line x1="8" y1="14" x2="40" y2="14" stroke="#0A2342" strokeWidth="1" opacity="0.6" />
                  <line x1="8" y1="34" x2="40" y2="34" stroke="#0A2342" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Bottom-left: Families active card */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden p-5 md:p-6 bg-surface border border-border flex flex-col justify-between aspect-[4/3]">
              {/* Sparkle icons */}
              <div className="flex items-center gap-1.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#0A2342" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#0A2342" />
                </svg>
              </div>

              <div>
                <p className="font-body text-[14px] md:text-[15px] text-soft-navy font-medium mb-3">
                  Families Active
                </p>
                {/* Avatar row */}
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[
                      "bg-amber-200",
                      "bg-rose-200",
                      "bg-sky-200",
                    ].map((bg, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8" r="4" fill="#0A2342" opacity="0.4" />
                          <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#0A2342" strokeWidth="1.5" opacity="0.4" fill="none" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-right: Trusted partners card (dark) */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col justify-between aspect-[4/3]" style={{ backgroundColor: "#0A2342" }}>
              <div className="flex items-start justify-between">
                <span
                  className="text-[28px] md:text-[36px] font-bold text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  50+
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-1">
                  <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Mini chart line */}
              <div className="flex-1 flex items-end py-2">
                <svg viewBox="0 0 200 60" fill="none" className="w-full h-10 md:h-12">
                  <path
                    d="M0 50 C30 50, 40 35, 60 38 C80 41, 90 20, 110 22 C130 24, 140 10, 160 15 C180 20, 190 8, 200 5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M0 50 C30 50, 40 35, 60 38 C80 41, 90 20, 110 22 C130 24, 140 10, 160 15 C180 20, 190 8, 200 5 L200 60 L0 60Z"
                    fill="white"
                    opacity="0.05"
                  />
                </svg>
              </div>

              <span className="font-body text-[14px] md:text-[15px] text-white/70 font-medium">
                Trusted Partners
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
