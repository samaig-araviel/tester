"use client";

import { Leaf } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center text-center h-full justify-between">
      <div className="flex items-center gap-2.5 mb-12">
        <Leaf className="w-8 h-8 text-primary" strokeWidth={2.5} />
        <span className="font-heading text-[28px] font-bold text-primary">Parentfits</span>
      </div>

      <div className="w-full flex-1">
        <h1 className="font-heading text-[36px] sm:text-[40px] font-bold text-text-primary mb-5">
          Welcome to Parentfits.
        </h1>
        <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-md mx-auto">
          Your dedicated parent support hub with everything you need as a parent, in one place.
        </p>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={onNext}
          className="w-full h-[48px] rounded-lg bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
        >
          Continue
        </button>

        <button
          onClick={onSkip}
          className="w-full py-2.5 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
