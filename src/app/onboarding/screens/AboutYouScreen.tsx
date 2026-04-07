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
    <div className="flex flex-col h-full">
      <div className="w-full flex-1">
        <h2 className="font-heading text-[24px] font-bold text-text-primary mb-2">
          Which best describes you?
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          This helps us personalise your experience.
        </p>

        <div className="flex flex-col gap-3 mb-8">
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

      <div className="w-full space-y-3">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            disabled={isPending}
            className="flex items-center justify-center gap-1.5 h-[44px] px-4 rounded-xl bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors cursor-pointer disabled:opacity-50 font-body text-[15px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => selected && onNext(selected)}
            disabled={!selected || isPending}
            className="flex-1 h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Continue"}
          </button>
        </div>

        <button
          onClick={onSkip}
          disabled={isPending}
          className="w-full py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip this step
        </button>

        <button
          onClick={onSkipAll}
          disabled={isPending}
          className="w-full py-1 font-body text-[13px] text-text-secondary/70 hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip setup entirely
        </button>
      </div>
    </div>
  );
}
