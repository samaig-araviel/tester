"use client";

import { useState } from "react";
import { School, Heart, Home, Baby, BookOpen, Brain } from "lucide-react";
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
  onSkip: () => void;
  isPending: boolean;
}

export default function SupportNeedsScreen({ value, onNext, onSkip, isPending }: SupportNeedsScreenProps) {
  const [selected, setSelected] = useState<string[]>(value || []);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <div className="pt-8 sm:pt-12">
      <div className="w-full max-w-[520px] mx-auto">
        <h2 className="font-heading text-[24px] font-bold text-text-primary mb-2">
          What kind of support matters most right now?
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          Select all that apply.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {SUPPORT_NEED_OPTIONS.map((option) => {
            const isSelected = selected.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => toggle(option.key)}
                className={`relative flex flex-col items-center text-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary-light/40"
                    : "border-border bg-white hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className={`${isSelected ? "text-primary" : "text-text-secondary"} transition-colors`}>
                  {ICON_MAP[option.icon]}
                </div>
                <span className="font-body text-[13px] font-medium text-text-primary leading-tight">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => selected.length > 0 && onNext(selected)}
          disabled={selected.length === 0 || isPending}
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
  );
}
