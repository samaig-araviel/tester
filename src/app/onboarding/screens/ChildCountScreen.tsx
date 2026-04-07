"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PillButton from "@/components/onboarding/PillButton";
import { CHILD_COUNT_OPTIONS } from "@/lib/onboarding";

interface ChildCountScreenProps {
  childCount: string | null;
  isExpecting: boolean;
  onNext: (childCount: string, isExpecting: boolean) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function ChildCountScreen({
  childCount: initialCount,
  isExpecting: initialExpecting,
  onNext,
  onBack,
  onSkip,
  onSkipAll,
  isPending,
}: ChildCountScreenProps) {
  const [count, setCount] = useState<string | null>(initialCount);
  const [expecting, setExpecting] = useState(initialExpecting);

  const hasSelection = count !== null || expecting;

  function handleCountSelect(value: string) {
    setCount(count === value ? null : value);
  }

  function handleContinue() {
    if (!hasSelection) return;
    const finalCount = count || (expecting ? "expecting" : null);
    if (finalCount) {
      onNext(finalCount, expecting);
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          How many children do you have?
        </h2>
        <p className="font-body text-[15px] text-text-secondary mb-8">
          Select one option. You can also toggle &quot;Expecting&quot; alongside a number.
        </p>

        <div className="flex flex-wrap gap-3">
          <PillButton
            label="Expecting"
            selected={expecting}
            onClick={() => setExpecting(!expecting)}
          />
          {CHILD_COUNT_OPTIONS.map((num) => (
            <PillButton
              key={num}
              label={num}
              selected={count === num}
              onClick={() => handleCountSelect(num)}
            />
          ))}
        </div>

        {expecting && count && (
          <p className="font-body text-[13px] text-primary mt-4">
            Expecting + {count} {count === "1" ? "child" : "children"}
          </p>
        )}
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
            onClick={handleContinue}
            disabled={!hasSelection || isPending}
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
