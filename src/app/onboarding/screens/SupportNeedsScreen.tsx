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
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="font-heading text-[32px] font-bold text-text-primary mb-3">
          What kind of support matters most right now?
        </h2>
        <p className="font-body text-[16px] text-text-secondary mb-10">
          Select all that apply.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {SUPPORT_NEED_OPTIONS.map((option) => {
            const isSelected = selected.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => toggle(option.key)}
                className={`relative flex flex-col items-center text-center gap-3 p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary-light/20"
                    : "border-border bg-white hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className={`text-2xl ${isSelected ? "text-primary" : "text-text-secondary"} transition-colors`}>
                  {ICON_MAP[option.icon]}
                </div>
                <span className="font-body text-[13px] font-medium text-text-primary leading-tight">
                  {option.label}
                </span>
              </button>
            );
          })}
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
