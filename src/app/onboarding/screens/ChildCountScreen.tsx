"use client";

import { useState } from "react";
import PillButton from "@/components/onboarding/PillButton";
import { CHILD_COUNT_OPTIONS } from "@/lib/onboarding";

interface ChildCountScreenProps {
  childCount: string | null;
  isExpecting: boolean;
  onNext: (childCount: string, isExpecting: boolean) => void;
  onSkip: () => void;
  isPending: boolean;
}

export default function ChildCountScreen({
  childCount: initialCount,
  isExpecting: initialExpecting,
  onNext,
  onSkip,
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
    <div className="pt-8 sm:pt-12">
      <div className="w-full max-w-[520px] mx-auto">
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

        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={!hasSelection || isPending}
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
    </div>
  );
}
