"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SelectionCard from "@/components/onboarding/SelectionCard";
import { IDENTITY_OPTIONS } from "@/lib/onboarding";

interface AboutYouScreenProps {
  value: string | null;
  onNext: (identityType: string) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function AboutYouScreen({ value, onNext, onBack, onSkip, onSkipAll, isPending }: AboutYouScreenProps) {
  const [selected, setSelected] = useState<string | null>(value);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          Which best describes you?
        </h2>
        <p className="font-body text-[15px] text-text-secondary mb-8">
          This helps us personalise your experience.
        </p>

        <div className="flex flex-col gap-3">
          {IDENTITY_OPTIONS.map((option) => (
            <SelectionCard
              key={option.key}
              selected={selected === option.key}
              onClick={() => setSelected(option.key)}
              icon={<span>{option.icon}</span>}
              title={option.label}
              variant="radio"
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            disabled={isPending}
            className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-lg bg-white border-2 border-primary text-primary hover:bg-primary-light transition-colors cursor-pointer disabled:opacity-50 font-body text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => selected && onNext(selected)}
            disabled={!selected || isPending}
            className="flex-1 h-[44px] rounded-lg bg-primary text-white font-body font-medium text-[14px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Continue"}
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onSkip}
            disabled={isPending}
            className="py-2 font-body text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip this step
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onSkipAll}
            disabled={isPending}
            className="py-1 font-body text-[12px] text-text-secondary/60 hover:text-text-secondary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip setup entirely
          </button>
        </div>
      </div>
    </div>
  );
}
