"use client";

import { useState } from "react";
import SelectionCard from "@/components/onboarding/SelectionCard";
import { IDENTITY_OPTIONS } from "@/lib/onboarding";

interface AboutYouScreenProps {
  value: string | null;
  onNext: (identityType: string) => void;
  onSkip: () => void;
  isPending: boolean;
}

export default function AboutYouScreen({ value, onNext, onSkip, isPending }: AboutYouScreenProps) {
  const [selected, setSelected] = useState<string | null>(value);

  return (
    <div className="pt-8 sm:pt-12">
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 sm:p-10 w-full max-w-[520px] mx-auto">
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

        <button
          onClick={() => selected && onNext(selected)}
          disabled={!selected || isPending}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Continue"}
        </button>

        <button
          onClick={onSkip}
          disabled={isPending}
          className="w-full mt-3 py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
