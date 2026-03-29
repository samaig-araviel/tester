"use client";

import { Leaf } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center text-center pt-16 sm:pt-24">
      <div className="flex items-center gap-2.5 mb-8">
        <Leaf className="w-8 h-8 text-primary" strokeWidth={2.5} />
        <span className="font-heading text-[28px] font-bold text-primary">Parentfits</span>
      </div>

      <div className="w-full max-w-[520px]">
        <h1 className="font-heading text-[28px] sm:text-[32px] font-bold text-text-primary mb-4">
          Welcome to Parentfits.
        </h1>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8">
          Your dedicated parent support hub with everything you need as a parent, in one place.
        </p>

        <button
          onClick={onNext}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
        >
          Continue
        </button>

        <button
          onClick={onSkip}
          className="w-full mt-3 py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
