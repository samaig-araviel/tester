"use client";

import { Sparkles, ArrowLeft } from "lucide-react";

interface IntroductionScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function IntroductionScreen({ onNext, onBack, onSkip }: IntroductionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center gap-8 w-full">
      <div>
        <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>

        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          Help us tailor this to you
        </h2>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed max-w-md mx-auto">
          Answer a few quick questions so we can show you the most relevant support.
        </p>
      </div>

      <div className="w-full space-y-3 pt-4">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-lg bg-white border-2 border-primary text-primary hover:bg-primary-light transition-colors cursor-pointer font-body text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={onNext}
            className="flex-1 h-[44px] rounded-lg bg-primary text-white font-body font-medium text-[14px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
          >
            Get started
          </button>
        </div>

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
