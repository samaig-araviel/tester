"use client";

export default function HubHero() {
  return (
    <section
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        minHeight: 300,
        background:
          "linear-gradient(135deg, #d4e8e0 0%, #e8ddd0 40%, #f5e6d8 70%, #eef4f0 100%)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center h-full min-h-[300px]">
        {/* Left — Text */}
        <div className="flex-[0_0_40%] flex flex-col justify-center px-8 md:pl-12 py-10 md:py-0 z-10">
          <h1 className="font-heading text-[32px] font-semibold text-soft-navy leading-tight">
            Welcome to the
            <br />
            Parents Hub
          </h1>
          <p className="font-body text-[16px] text-charcoal leading-relaxed mt-4 max-w-[380px]">
            Practical guidance, benefits clarity and trusted support, all in one
            place.
          </p>
        </div>

        {/* Right — Illustration */}
        <div className="flex-[0_0_60%] relative flex items-end justify-center h-full min-h-[260px] md:min-h-[300px]">
          <svg
            viewBox="0 0 520 300"
            fill="none"
            className="w-full h-full max-h-[300px]"
            aria-hidden="true"
          >
            {/* Background elements */}
            <circle cx="420" cy="60" r="36" fill="#C8A96E" opacity="0.5" />
            <circle cx="80" cy="240" r="20" fill="#D9EFEA" opacity="0.6" />

            {/* Clock */}
            <circle cx="430" cy="64" r="28" fill="#FFFFFF" stroke="#E8E4DE" strokeWidth="2" />
            <circle cx="430" cy="64" r="2" fill="#0B4F4F" />
            <line x1="430" y1="64" x2="430" y2="46" stroke="#0B4F4F" strokeWidth="2" strokeLinecap="round" />
            <line x1="430" y1="64" x2="442" y2="64" stroke="#117A65" strokeWidth="2" strokeLinecap="round" />

            {/* Desk */}
            <rect x="180" y="200" width="220" height="8" rx="4" fill="#E8E4DE" />
            <rect x="200" y="208" width="4" height="60" fill="#E8E4DE" />
            <rect x="376" y="208" width="4" height="60" fill="#E8E4DE" />

            {/* Laptop on desk */}
            <rect x="230" y="168" width="100" height="32" rx="4" fill="#0B4F4F" />
            <rect x="236" y="172" width="88" height="24" rx="2" fill="#117A65" opacity="0.3" />
            <rect x="220" y="200" width="120" height="4" rx="2" fill="#6F6F6F" />

            {/* Books stack */}
            <rect x="360" y="180" width="30" height="8" rx="2" fill="#117A65" opacity="0.6" />
            <rect x="358" y="172" width="34" height="8" rx="2" fill="#C8A96E" />
            <rect x="362" y="164" width="26" height="8" rx="2" fill="#D9EFEA" />

            {/* Plant */}
            <rect x="140" y="180" width="12" height="20" rx="4" fill="#D4A574" />
            <ellipse cx="146" cy="174" rx="16" ry="14" fill="#117A65" opacity="0.5" />
            <ellipse cx="140" cy="168" rx="10" ry="10" fill="#117A65" opacity="0.6" />
            <ellipse cx="154" cy="170" rx="8" ry="8" fill="#0F7B6C" opacity="0.4" />

            {/* Parent figure */}
            <circle cx="280" cy="120" r="22" fill="#F5D5C0" />
            <rect x="264" y="142" width="32" height="50" rx="8" fill="#117A65" />
            <rect x="260" y="142" width="10" height="30" rx="5" fill="#117A65" />
            <rect x="290" y="142" width="10" height="30" rx="5" fill="#117A65" />
            {/* Hair */}
            <path d="M258 118 Q260 96 280 94 Q300 96 302 118" fill="#4A3728" />

            {/* Child figure */}
            <circle cx="320" cy="150" r="14" fill="#F5D5C0" />
            <rect x="312" y="164" width="16" height="30" rx="6" fill="#C8A96E" />
            {/* Child hair */}
            <path d="M306 148 Q308 136 320 134 Q332 136 334 148" fill="#8B6B47" />

            {/* Hearts */}
            <g transform="translate(350, 120)" opacity="0.6">
              <path d="M0 4 C0 0 4 -2 6 2 C8 -2 12 0 12 4 C12 8 6 14 6 14 C6 14 0 8 0 4Z" fill="#E8686A" />
            </g>
            <g transform="translate(200, 100)" opacity="0.4">
              <path d="M0 3 C0 0 3 -1.5 4.5 1.5 C6 -1.5 9 0 9 3 C9 6 4.5 10.5 4.5 10.5 C4.5 10.5 0 6 0 3Z" fill="#E8686A" />
            </g>

            {/* Sparkles */}
            <g transform="translate(470, 140)" opacity="0.5">
              <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3Z" fill="#117A65" />
            </g>
            <g transform="translate(120, 130)" opacity="0.4">
              <path d="M3 0 L4 2.5 L6.5 3 L4 3.5 L3 6 L2 3.5 L0 3 L2 2.5Z" fill="#C8A96E" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
