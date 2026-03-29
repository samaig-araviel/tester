"use client";

import { STEP_LABELS } from "@/lib/onboarding";

interface StepIndicatorProps {
  currentStep: number; // 0-6 mapping to the 7 steps
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-[600px] mx-auto px-4 pt-6 pb-2">
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={label} className="flex items-center flex-1 last:flex-0">
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    isCompleted
                      ? "bg-primary"
                      : isCurrent
                        ? "bg-primary ring-2 ring-primary-light"
                        : "bg-gray-200"
                  }`}
                />
                {/* Label */}
                <span
                  className={`mt-2 text-[11px] font-body whitespace-nowrap hidden sm:block ${
                    isCompleted || isCurrent
                      ? "text-primary font-medium"
                      : "text-text-secondary"
                  }`}
                >
                  {label}
                </span>
              </div>
              {/* Connecting line */}
              {index < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1.5 mt-[-16px] sm:mt-0 transition-colors duration-200 ${
                    index < currentStep ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
