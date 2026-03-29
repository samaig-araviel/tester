"use client";

import Link from "next/link";

type ExploreVariant = "dark" | "light";

interface ExploreBlockProps {
  variant: ExploreVariant;
  heading: string;
  headingAccent: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imageSquare?: boolean;
}

/* Four-pointed sparkle star */
function Sparkle({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <path
        d="M24 0C24 0 28 18 24 24C18 28 0 24 0 24C0 24 18 20 24 24C20 18 24 0 24 0ZM24 48C24 48 20 30 24 24C30 20 48 24 48 24C48 24 30 28 24 24C28 30 24 48 24 48Z"
        fill="currentColor"
      />
    </svg>
  );
}

const variantConfig: Record<
  ExploreVariant,
  {
    bg: string;
    textColor: string;
    bodyColor: string;
    sparkleColor: string;
    btnBg: string;
    btnText: string;
    btnHover: string;
  }
> = {
  dark: {
    bg: "#0B4F4F",
    textColor: "text-white",
    bodyColor: "text-white/70",
    sparkleColor: "text-white/20",
    btnBg: "bg-white",
    btnText: "text-soft-navy",
    btnHover: "hover:bg-white/90",
  },
  light: {
    bg: "#EDE5D5",
    textColor: "text-soft-navy",
    bodyColor: "text-muted-grey",
    sparkleColor: "text-primary/20",
    btnBg: "bg-primary",
    btnText: "text-white",
    btnHover: "hover:bg-primary-hover",
  },
};

export default function ExploreBlock({
  variant,
  heading,
  headingAccent,
  body,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
  imageSquare = false,
}: ExploreBlockProps) {
  const config = variantConfig[variant];

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
      style={{ backgroundColor: config.bg }}
    >
      {/* Constrain inner content to page max-width */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`flex flex-col ${variant === "light" ? "md:flex-row-reverse" : "md:flex-row"} items-stretch min-h-[480px] md:min-h-[600px]`}>
          {/* Text content */}
          <div className="flex-1 flex flex-col justify-center py-14 md:py-20 lg:py-24 relative z-10">
            <h2 className={`leading-[1.1] ${config.textColor} mb-6`}>
              <span
                className="block text-[30px] md:text-[40px] lg:text-[48px] font-bold"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {heading}
              </span>
              <span
                className="block text-[30px] md:text-[40px] lg:text-[48px] font-bold italic"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {headingAccent}
              </span>
            </h2>

            <p className={`font-body text-[15px] md:text-[17px] leading-relaxed max-w-[440px] mb-10 ${config.bodyColor}`}>
              {body}
            </p>

            <Link
              href={ctaHref}
              className={`inline-flex items-center justify-center self-start h-[52px] px-8 rounded-full font-body text-[15px] font-semibold transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 ${config.btnBg} ${config.btnText} ${config.btnHover}`}
            >
              {ctaText}
            </Link>
          </div>

          {/* Decorative sparkles + Image */}
          <div className="flex-1 relative min-h-[320px] md:min-h-0">
            {/* Sparkle decorations */}
            <div className={`absolute top-8 md:top-10 z-10 flex items-start gap-1.5 ${variant === "light" ? "left-0" : "right-0"}`}>
              <Sparkle size={60} className={`${config.sparkleColor} hidden md:block`} />
              <Sparkle size={44} className={config.sparkleColor} />
              <Sparkle size={72} className={`${config.sparkleColor} -mt-2`} />
            </div>

            {/* Image with rounded corners and breathing room */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${variant === "light" ? "left-0" : "right-0"} overflow-hidden rounded-2xl ${
                imageSquare
                  ? "w-[75%] md:w-[68%] aspect-square"
                  : "w-[85%] md:w-[78%] h-[76%]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
