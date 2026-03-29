"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PillButton from "@/components/onboarding/PillButton";
import { AGE_BUCKET_OPTIONS } from "@/lib/onboarding";

interface ChildAgesScreenProps {
  value: string[] | null;
  onNext: (ageBuckets: string[]) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function ChildAgesScreen({ value, onNext, onBack, onSkip, onSkipAll, isPending }: ChildAgesScreenProps) {
  const [selected, setSelected] = useState<string[]>(value || []);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <div>
      <div className="w-full">
        <button
          onClick={onBack}
          disabled={isPending}
          className="flex items-center gap-1.5 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer mb-6 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="font-heading text-[24px] font-bold text-text-primary mb-2">
          How old are your child(ren)?
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          Select all that apply.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {AGE_BUCKET_OPTIONS.map((option) => (
            <PillButton
              key={option.key}
              label={option.label}
              selected={selected.includes(option.key)}
              onClick={() => toggle(option.key)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => selected.length > 0 && onNext(selected)}
            disabled={selected.length === 0 || isPending}
            className="w-full max-w-[320px] h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Continue"}
          </button>

          <button
            onClick={onSkip}
            disabled={isPending}
            className="py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip this step
          </button>

          <button
            onClick={onSkipAll}
            disabled={isPending}
            className="py-1 font-body text-[13px] text-text-secondary/70 hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip setup entirely
          </button>
        </div>
      </div>
    </div>
  );
}
