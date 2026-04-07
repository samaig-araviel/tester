"use client";

import { useState } from "react";
import { School, Heart, Home, Baby, BookOpen, Brain, Check } from "lucide-react";
import ScreenShell from "@/components/onboarding/ScreenShell";
import { SUPPORT_NEED_OPTIONS } from "@/lib/onboarding";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  School,
  Heart,
  Home,
  Baby,
  BookOpen,
  Brain,
};

interface SupportNeedsScreenProps {
  value: string[] | null;
  onNext: (needs: string[]) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function SupportNeedsScreen({
  value,
  onNext,
  onBack,
  onSkip,
  onSkipAll,
  isPending,
}: SupportNeedsScreenProps) {
  const [selected, setSelected] = useState<string[]>(value || []);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <ScreenShell
      title="What kind of support matters most right now?"
      subtitle="Select all that apply."
      onBack={onBack}
      onContinue={() => onNext(selected)}
      canContinue={selected.length > 0}
      onSkip={onSkip}
      onSkipAll={onSkipAll}
      isPending={isPending}
    >
      <div className="grid grid-cols-2 gap-3">
        {SUPPORT_NEED_OPTIONS.map((option) => {
          const Icon = ICON_MAP[option.icon];
          const isSelected = selected.includes(option.key);
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => toggle(option.key)}
              aria-pressed={isSelected}
              className={`group relative flex flex-col items-center gap-3 rounded-2xl border bg-white p-5 text-center transition-all duration-200 ${
                isSelected
                  ? "border-[#2962FF] shadow-[0_8px_24px_-12px_rgba(41,98,255,0.35)]"
                  : "border-[#EEF0F4] shadow-[0_6px_20px_-18px_rgba(15,23,42,0.35)] hover:border-[#C6D2FF]"
              }`}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#2962FF] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                  isSelected
                    ? "border-[#2962FF] bg-[#EEF3FF] text-[#2962FF]"
                    : "border-[#D9DEE8] bg-white text-[#2962FF]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-body text-[12px] font-semibold leading-tight text-[#1A1F36]">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </ScreenShell>
  );
}
