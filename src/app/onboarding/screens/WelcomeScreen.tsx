"use client";

import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <section className="flex flex-col">
      <header className="mb-10">
        <h2 className="text-center font-heading text-[30px] font-bold leading-tight text-[#1A1F36]">
          Welcome to Parentfits
        </h2>
        <p className="mt-3 text-center font-body text-[15px] leading-relaxed text-[#6B7280]">
          Your personalised support hub for every stage of work and family life, all in one place.
        </p>
      </header>

      <footer className="mt-10 space-y-3">
        <button
          type="button"
          onClick={onNext}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0B4F4F] font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#093F3F]"
        >
          Get started
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onSkip}
            className="font-body text-[13px] text-[#6B7280] transition-colors hover:text-[#1A1F36]"
          >
            Skip for now
          </button>
        </div>
      </footer>
    </section>
  );
}
