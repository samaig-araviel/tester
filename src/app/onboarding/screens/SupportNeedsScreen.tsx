"use client";

import { useState } from "react";
import { School, Heart, Home, Baby, BookOpen, Brain, ArrowLeft } from "lucide-react";
import { Check } from "lucide-react";
import { SUPPORT_NEED_OPTIONS } from "@/lib/onboarding";

const ICON_MAP: Record<string, React.ReactNode> = {
  School: <School className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Baby: <Baby className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
};

interface SupportNeedsScreenProps {
  value: string[] | null;
  onNext: (needs: string[]) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function SupportNeedsScreen({ value, onNext, onBack, onSkip, onSkipAll, isPending }: SupportNeedsScreenProps) {
  const [selected, setSelected] = useState<string[]>(value || []);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          What kind of support matters most right now?
        </h2>
        <p className="font-body text-[15px] text-text-secondary mb-8">
          Select all that apply.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {SUPPORT_NEED_OPTIONS.map((option) => {
            const isSelected = selected.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => toggle(option.key)}
                className={`relative flex flex-col items-center text-center gap-2 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary-light/30"
                    : "border-border bg-white hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className={`text-xl ${isSelected ? "text-primary" : "text-text-secondary"} transition-colors`}>
                  {ICON_MAP[option.icon]}
                </div>
                <span className="font-body text-[12px] font-medium text-text-primary leading-tight">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
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
            onClick={() => selected.length > 0 && onNext(selected)}
            disabled={selected.length === 0 || isPending}
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
