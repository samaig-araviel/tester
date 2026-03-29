"use client";

import { Sparkles } from "lucide-react";

interface IntroductionScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function IntroductionScreen({ onNext, onSkip }: IntroductionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center pt-16 sm:pt-24">
      <div className="w-full max-w-[520px]">
        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>

        <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-text-primary mb-4">
          Help us tailor this to you
        </h2>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8">
          Answer a few quick questions so we can show you the most relevant support.
        </p>

        <button
          onClick={onNext}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
        >
          Get started
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
