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
          How many children do you have?
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          Select one option. You can also toggle &quot;Expecting&quot; alongside a number.
        </p>

        <div className="flex flex-wrap gap-3 mb-4">
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
          <p className="font-body text-[13px] text-primary mb-4">
            Expecting + {count} {count === "1" ? "child" : "children"}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleContinue}
            disabled={!hasSelection || isPending}
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
