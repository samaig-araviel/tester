"use client";

import Link from "next/link";
import Image from "next/image";

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
}: ExploreBlockProps) {
  const config = variantConfig[variant];

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
      style={{ backgroundColor: config.bg }}
    >
      {/* Constrain inner content to page max-width */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`flex flex-col ${variant === "light" ? "md:flex-row-reverse" : "md:flex-row"} items-stretch min-h-[400px] md:min-h-[480px]`}>
          {/* Text content */}
          <div className="flex-1 flex flex-col justify-center py-12 md:py-16 lg:py-20 relative z-10">
            <h2 className={`leading-[1.1] ${config.textColor} mb-5`}>
              <span
                className="block text-[28px] md:text-[36px] lg:text-[42px] font-bold"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {heading}
              </span>
              <span
                className="block text-[28px] md:text-[36px] lg:text-[42px] font-bold italic"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {headingAccent}
              </span>
            </h2>

            <p className={`font-body text-[15px] md:text-[16px] leading-relaxed max-w-[420px] mb-8 ${config.bodyColor}`}>
              {body}
            </p>

            <Link
              href={ctaHref}
              className={`inline-flex items-center justify-center self-start h-[48px] px-7 rounded-full font-body text-[15px] font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 ${config.btnBg} ${config.btnText} ${config.btnHover}`}
            >
              {ctaText}
            </Link>
          </div>

          {/* Decorative sparkles + Image */}
          <div className="flex-1 relative min-h-[280px] md:min-h-0">
            {/* Sparkle decorations */}
            <div className={`absolute top-6 md:top-8 z-10 flex items-start gap-1 ${variant === "light" ? "left-0" : "right-0"}`}>
              <Sparkle size={56} className={`${config.sparkleColor} hidden md:block`} />
              <Sparkle size={40} className={config.sparkleColor} />
              <Sparkle size={64} className={`${config.sparkleColor} -mt-2`} />
            </div>

            {/* Image positioned with rounded corner */}
            <div
              className={`absolute bottom-0 ${variant === "light" ? "left-0" : "right-0"} w-[80%] md:w-[72%] h-[85%] overflow-hidden`}
              style={{
                borderTopLeftRadius: variant === "light" ? undefined : "2rem",
                borderTopRightRadius: variant === "light" ? "2rem" : undefined,
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 36vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
