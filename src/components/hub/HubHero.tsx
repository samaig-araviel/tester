"use client";

import Link from "next/link";

const GHOST_HEADLINE = "Stop guessing.\nStart planning.";

export default function HubHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#C96846] to-[#B55A3C] px-6 py-24 md:px-12 md:py-32 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center"
      >
        <span className="font-heading font-bold text-white/[0.08] text-[8rem] leading-[1.1] text-center whitespace-pre">
          {GHOST_HEADLINE}
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto text-center">
        <p className="font-body text-[0.95rem] md:text-[1.1rem] uppercase tracking-[2px] opacity-90">
          The Parents Hub
        </p>
        <h1 className="font-heading font-bold leading-[1.1] mt-6 md:mt-8 text-[3rem] md:text-[5.5rem]">
          Stop guessing.
          <br />
          Start planning.
        </h1>
        <p className="font-body mt-6 md:mt-8 max-w-[700px] mx-auto opacity-95 text-[1.1rem] md:text-[1.5rem]">
          Practical guidance, benefits clarity and trusted support, all in one
          place.
        </p>
        <div className="mt-10 md:mt-12 flex justify-center">
          <Link
            href="/parents-hub/register-leave"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#C96846] font-body font-bold text-[0.85rem] md:text-[0.95rem] uppercase tracking-[1px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
          >
            Register Your Parental Leave
          </Link>
        </div>
      </div>
    </section>
  );
}
