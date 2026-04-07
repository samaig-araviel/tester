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
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="font-heading text-[32px] font-bold text-text-primary mb-3">
          How old are your child(ren)?
        </h2>
        <p className="font-body text-[16px] text-text-secondary mb-10">
          Select all that apply.
        </p>

        <div className="flex flex-wrap gap-4">
          {AGE_BUCKET_OPTIONS.map((option) => (
            <PillButton
              key={option.key}
              label={option.label}
              selected={selected.includes(option.key)}
              onClick={() => toggle(option.key)}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-3">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            disabled={isPending}
            className="flex items-center justify-center gap-2 h-[48px] px-6 rounded-lg bg-white border-2 border-primary text-primary hover:bg-primary-light hover:text-primary transition-colors cursor-pointer disabled:opacity-50 font-body text-[15px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => selected.length > 0 && onNext(selected)}
            disabled={selected.length === 0 || isPending}
            className="flex-1 h-[48px] rounded-lg bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Continue"}
          </button>
        </div>

        <button
          onClick={onSkip}
          disabled={isPending}
          className="w-full py-2.5 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip this step
        </button>

        <button
          onClick={onSkipAll}
          disabled={isPending}
          className="w-full py-2 font-body text-[13px] text-text-secondary/70 hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip setup entirely
        </button>
      </div>
    </div>
  );
}
