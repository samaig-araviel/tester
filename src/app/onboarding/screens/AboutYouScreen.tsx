"use client";

import { useState } from "react";
import { User, Baby, HelpCircle } from "lucide-react";
import SelectionCard from "@/components/onboarding/SelectionCard";
import ScreenShell from "@/components/onboarding/ScreenShell";
import { IDENTITY_OPTIONS } from "@/lib/onboarding";

interface AboutYouScreenProps {
  value: string | null;
  onNext: (identityType: string) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

const IDENTITY_META: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; description: string }
> = {
  PARENT: {
    icon: User,
    description: "I have one or more children.",
  },
  EXPECTANT_PARENT: {
    icon: Baby,
    description: "I'm expecting a baby.",
  },
  PREFER_NOT_TO_SAY: {
    icon: HelpCircle,
    description: "Keep things general for now.",
  },
};

export default function AboutYouScreen({
  value,
  onNext,
  onBack,
  onSkip,
  onSkipAll,
  isPending,
}: AboutYouScreenProps) {
  const [selected, setSelected] = useState<string | null>(value);

  return (
    <ScreenShell
      title="Which best describes you?"
      subtitle="This helps us personalise your experience."
      onBack={onBack}
      onContinue={() => selected && onNext(selected)}
      canContinue={Boolean(selected)}
      onSkip={onSkip}
      onSkipAll={onSkipAll}
      isPending={isPending}
    >
      <div className="flex flex-col gap-4">
        {IDENTITY_OPTIONS.map((option) => {
          const meta = IDENTITY_META[option.key];
          const Icon = meta.icon;
          return (
            <SelectionCard
              key={option.key}
              selected={selected === option.key}
              onClick={() => setSelected(option.key)}
              icon={<Icon className="h-6 w-6" />}
              title={option.label}
              description={meta.description}
            />
          );
        })}
      </div>
    </ScreenShell>
  );
}
