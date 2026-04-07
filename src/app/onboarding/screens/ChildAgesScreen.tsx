"use client";

import { useState } from "react";
import PillButton from "@/components/onboarding/PillButton";
import ScreenShell from "@/components/onboarding/ScreenShell";
import { AGE_BUCKET_OPTIONS } from "@/lib/onboarding";

interface ChildAgesScreenProps {
  value: string[] | null;
  onNext: (ageBuckets: string[]) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function ChildAgesScreen({
  value,
  onNext,
  onBack,
  onSkip,
  onSkipAll,
  isPending,
}: ChildAgesScreenProps) {
  const [selected, setSelected] = useState<string[]>(value || []);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <ScreenShell
      title="How old are your child(ren)?"
      subtitle="Select all that apply."
      onBack={onBack}
      onContinue={() => onNext(selected)}
      canContinue={selected.length > 0}
      onSkip={onSkip}
      onSkipAll={onSkipAll}
      isPending={isPending}
    >
      <div className="flex flex-wrap gap-3">
        {AGE_BUCKET_OPTIONS.map((option) => (
          <PillButton
            key={option.key}
            label={option.label}
            selected={selected.includes(option.key)}
            onClick={() => toggle(option.key)}
          />
        ))}
      </div>
    </ScreenShell>
  );
}
