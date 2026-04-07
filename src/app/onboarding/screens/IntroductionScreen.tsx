"use client";

import { Sparkles, ArrowLeft } from "lucide-react";

interface IntroductionScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function IntroductionScreen({ onNext, onBack, onSkip }: IntroductionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center h-full justify-between">
      <div className="w-full">
        <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-heading text-[32px] sm:text-[36px] font-bold text-text-primary mb-4">
          Help us tailor this to you
        </h2>
        <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-md mx-auto">
          Answer a few quick questions so we can show you the most relevant support.
        </p>
      </div>

      <div className="w-full space-y-3">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 h-[48px] px-6 rounded-lg bg-white border-2 border-primary text-primary hover:bg-primary-light hover:text-primary transition-colors cursor-pointer font-body text-[15px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={onNext}
            className="flex-1 h-[48px] rounded-lg bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
          >
            Get started
          </button>
        </div>

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
