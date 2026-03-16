"use client";

interface HeroBannerProps {
  firstName: string;
  isReturning: boolean;
}

export default function HeroBanner({ firstName, isReturning }: HeroBannerProps) {
  const subheading = isReturning
    ? "Welcome back! Let's find the best support for you and your family"
    : "Welcome! Let's find the best support for you and your family";

  return (
    <section className="w-full rounded-2xl overflow-hidden relative" style={{ minHeight: 340 }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #EDF6F4 0%, #F7F4EF 30%, #FBF0E6 60%, #EEF4F8 100%)",
        }}
      />

      <div className="relative flex items-center h-full" style={{ minHeight: 340 }}>
        {/* Text content */}
        <div className="flex-1 py-12 pl-12 pr-6 z-10" style={{ maxWidth: 480 }}>
          <h1 className="font-heading text-[32px] font-semibold text-soft-navy leading-tight">
            Hi {firstName},
          </h1>
          <p className="font-body text-[18px] text-charcoal mt-3 leading-relaxed" style={{ maxWidth: 440 }}>
            {subheading}
          </p>
        </div>

        {/* Illustration area */}
        <div className="flex-1 relative h-full hidden md:flex items-end justify-center overflow-hidden" style={{ minHeight: 340 }}>
          {/* Decorative SVG illustration */}
          <svg
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ maxWidth: 460 }}
          >
            {/* Warm background circles */}
            <circle cx="260" cy="220" r="140" fill="#E6F2EF" opacity="0.6" />
            <circle cx="320" cy="180" r="80" fill="#F0D5BF" opacity="0.4" />
            <circle cx="180" cy="280" r="60" fill="#EEF4F8" opacity="0.5" />

            {/* Plant pot */}
            <rect x="80" y="280" width="40" height="50" rx="4" fill="#D4A574" opacity="0.7" />
            <ellipse cx="100" cy="280" rx="24" ry="6" fill="#C49564" opacity="0.7" />
            <path d="M92 280 C92 250, 85 230, 95 210" stroke="#117A65" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="95" cy="212" rx="12" ry="16" fill="#117A65" opacity="0.3" />
            <path d="M100 280 C100 255, 108 240, 105 220" stroke="#117A65" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="106" cy="222" rx="10" ry="13" fill="#117A65" opacity="0.25" />

            {/* Laptop */}
            <rect x="320" y="290" width="90" height="55" rx="6" fill="#0A2342" opacity="0.15" />
            <rect x="325" y="295" width="80" height="42" rx="3" fill="#E6F2EF" />
            <rect x="300" y="345" width="130" height="5" rx="2.5" fill="#0A2342" opacity="0.12" />

            {/* Books stack */}
            <rect x="390" y="310" width="50" height="10" rx="2" fill="#117A65" opacity="0.3" />
            <rect x="393" y="300" width="45" height="10" rx="2" fill="#F0D5BF" opacity="0.6" />
            <rect x="391" y="290" width="48" height="10" rx="2" fill="#0A2342" opacity="0.15" />

            {/* Parent figure */}
            <circle cx="250" cy="140" r="28" fill="#F0D5BF" />
            <ellipse cx="250" cy="135" rx="24" ry="25" fill="#F5DCC8" />
            {/* Hair */}
            <path d="M226 130 C226 105, 274 105, 274 130" fill="#5C3D2E" opacity="0.7" />
            <path d="M224 132 C222 120, 226 108, 250 106 C274 108, 278 120, 276 132" fill="#5C3D2E" opacity="0.6" />
            {/* Eyes */}
            <circle cx="240" cy="138" r="2.5" fill="#0A2342" opacity="0.7" />
            <circle cx="260" cy="138" r="2.5" fill="#0A2342" opacity="0.7" />
            {/* Smile */}
            <path d="M243 148 C247 153, 253 153, 257 148" stroke="#D4A574" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Body - sweater */}
            <path d="M220 170 C220 165, 230 160, 250 160 C270 160, 280 165, 280 170 L285 250 L215 250 Z" fill="#117A65" opacity="0.4" />
            <path d="M220 170 C220 165, 230 160, 250 160 C270 160, 280 165, 280 170 L285 250 L215 250 Z" fill="#0F7B6C" opacity="0.3" />

            {/* Arms */}
            <path d="M220 180 C200 195, 195 220, 210 240" stroke="#F0D5BF" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M280 180 C300 195, 305 215, 290 230" stroke="#F0D5BF" strokeWidth="12" fill="none" strokeLinecap="round" />

            {/* Baby */}
            <circle cx="230" cy="230" r="18" fill="#FBF0E6" />
            <circle cx="230" cy="226" r="15" fill="#F5DCC8" />
            {/* Baby face */}
            <circle cx="225" cy="225" r="1.5" fill="#0A2342" opacity="0.6" />
            <circle cx="235" cy="225" r="1.5" fill="#0A2342" opacity="0.6" />
            <path d="M227 230 C229 232, 231 232, 233 230" stroke="#D4A574" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Baby blanket */}
            <path d="M215 235 C215 250, 245 250, 245 235" fill="#E6F2EF" />

            {/* Coffee mug */}
            <rect x="150" y="300" width="20" height="25" rx="3" fill="#F0D5BF" opacity="0.6" />
            <path d="M170 308 C178 308, 178 320, 170 320" stroke="#F0D5BF" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Small floating hearts */}
            <path d="M300 150 C300 146, 305 143, 308 146 C311 143, 316 146, 316 150 C316 156, 308 160, 308 160 C308 160, 300 156, 300 150Z" fill="#F0D5BF" opacity="0.4" />
            <path d="M170 170 C170 167, 174 165, 176 167 C178 165, 182 167, 182 170 C182 174, 176 177, 176 177 C176 177, 170 174, 170 170Z" fill="#E6F2EF" opacity="0.6" />

            {/* Stars / sparkles */}
            <circle cx="340" cy="140" r="3" fill="#F0D5BF" opacity="0.5" />
            <circle cx="160" cy="150" r="2" fill="#117A65" opacity="0.3" />
            <circle cx="380" cy="200" r="2.5" fill="#F0D5BF" opacity="0.4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
