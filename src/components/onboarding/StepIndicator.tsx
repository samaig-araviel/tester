"use client";

import { STEP_LABELS } from "@/lib/onboarding";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number; // 0-6 mapping to the 7 steps
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-32 bg-white border-l-4 border-primary flex flex-col items-center py-8 px-4">
      <div className="flex flex-col items-center gap-8">
        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const stepNumber = index + 1;

          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              {/* Step circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-200 ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "bg-primary text-white ring-2 ring-primary-light"
                      : "bg-gray-200 text-text-secondary"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Label */}
              <span
                className={`font-body text-xs text-center transition-colors duration-200 max-w-20 leading-tight ${
                  isCompleted || isCurrent
                    ? "text-text-primary font-medium"
                    : "text-text-secondary"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
