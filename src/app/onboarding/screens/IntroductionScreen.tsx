"use client";

import { Sparkles, ArrowLeft } from "lucide-react";

interface IntroductionScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function IntroductionScreen({ onNext, onBack, onSkip }: IntroductionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center h-full">
      <div className="w-full flex-1">
        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>

        <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-text-primary mb-4">
          Help us tailor this to you
        </h2>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8">
          Answer a few quick questions so we can show you the most relevant support.
        </p>
      </div>

      <div className="w-full space-y-3">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1.5 h-[44px] px-4 rounded-xl bg-surface border border-primary text-text-secondary hover:text-text-primary transition-colors cursor-pointer font-body text-[15px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={onNext}
            className="flex-1 h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
          >
            Get started
          </button>
        </div>

        <button
          onClick={onSkip}
          className="w-full py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
