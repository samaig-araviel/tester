"use client";

import { useState } from "react";
import PillButton from "@/components/onboarding/PillButton";
import ScreenShell from "@/components/onboarding/ScreenShell";
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
    <ScreenShell
      title="How many children do you have?"
      subtitle='Select one option. You can also toggle "Expecting" alongside a number.'
      onBack={onBack}
      onContinue={handleContinue}
      canContinue={hasSelection}
      onSkip={onSkip}
      onSkipAll={onSkipAll}
      isPending={isPending}
    >
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
        <p className="mt-6 font-body text-[13px] font-medium text-[#0B4F4F]">
          Expecting + {count} {count === "1" ? "child" : "children"}
        </p>
      )}
    </ScreenShell>
  );
}
