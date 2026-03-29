"use client";

import { Sparkles, ArrowLeft } from "lucide-react";

interface IntroductionScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function IntroductionScreen({ onNext, onBack, onSkip }: IntroductionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>

        <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-text-primary mb-4">
          Help us tailor this to you
        </h2>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8">
          Answer a few quick questions so we can show you the most relevant support.
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onNext}
            className="w-full max-w-[320px] h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
          >
            Get started
          </button>

          <button
            onClick={onSkip}
            className="py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
