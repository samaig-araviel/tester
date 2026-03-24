"use client";

import Link from "next/link";
import Image from "next/image";

interface HeroBannerProps {
  firstName: string;
  isReturning: boolean;
}

const FAMILY_IMAGE_URL =
  "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80&auto=format&fit=crop";

export default function HeroBanner({ firstName, isReturning }: HeroBannerProps) {
  const subheading = isReturning
    ? "Welcome back! Let's find the best support for you and your family."
    : "Discover trusted services and support designed for working parents like you.";

  return (
    <section className="w-full rounded-2xl overflow-hidden relative" style={{ minHeight: 380 }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #EDF6F4 0%, #F7F4EF 30%, #FBF0E6 60%, #EEF4F8 100%)",
        }}
      />

      {/* Mobile image */}
      <div className="md:hidden relative w-full h-48 overflow-hidden">
        <Image
          src={FAMILY_IMAGE_URL}
          alt="Happy family spending quality time together"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(247,244,239,0.9) 100%)",
          }}
        />
      </div>

      <div className="relative flex flex-col md:flex-row items-center h-full" style={{ minHeight: 380 }}>
        {/* Left: Text content */}
        <div className="flex-1 py-8 px-8 md:py-12 md:pl-12 md:pr-6 z-10 flex flex-col justify-center">
          <h1
            className="font-heading text-[28px] md:text-[36px] font-semibold text-soft-navy leading-tight"
            style={{ animation: "fadeSlideIn 0.5s ease-out" }}
          >
            Hi {firstName},
          </h1>
          <p
            className="font-body text-[16px] md:text-[18px] text-charcoal mt-3 leading-relaxed max-w-[440px]"
            style={{ animation: "fadeSlideIn 0.5s ease-out 0.1s both" }}
          >
            {subheading}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 mt-6"
            style={{ animation: "fadeSlideIn 0.5s ease-out 0.2s both" }}
          >
            <Link
              href="/explore/online"
              className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-primary text-white font-body text-[15px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg active:translate-y-0"
            >
              Online Services
            </Link>
            <Link
              href="/explore/in-person"
              className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-surface text-text-primary font-body text-[15px] font-medium border border-border transition-all duration-200 hover:border-primary hover:shadow-sm"
            >
              In-Person Services
            </Link>
          </div>
        </div>

        {/* Right: Family image */}
        <div className="flex-1 relative hidden md:block h-full" style={{ minHeight: 380 }}>
          <div
            className="absolute inset-4 rounded-2xl overflow-hidden shadow-lg"
            style={{ animation: "slideLeft 0.6s ease-out 0.15s both" }}
          >
            <Image
              src={FAMILY_IMAGE_URL}
              alt="Happy family spending quality time together"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Soft gradient overlay for blending */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(247,244,239,0.35) 0%, transparent 25%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
