"use client";

import { Leaf } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center text-center gap-12 w-full">
      <div className="flex items-center gap-2.5">
        <Leaf className="w-8 h-8 text-primary" strokeWidth={2.5} />
        <span className="font-heading text-[28px] font-bold text-primary">Parentfits</span>
      </div>

      <div>
        <h1 className="font-heading text-[32px] font-bold text-text-primary mb-3">
          Welcome to Parentfits.
        </h1>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed max-w-md mx-auto">
          Your dedicated parent support hub with everything you need as a parent, in one place.
        </p>
      </div>

      <div className="w-full space-y-3 pt-4">
        <button
          onClick={onNext}
          className="w-full h-[44px] rounded-lg bg-primary text-white font-body font-medium text-[14px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
        >
          Continue
        </button>

        <div className="text-center pt-2">
          <button
            onClick={onSkip}
            className="py-2 font-body text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
