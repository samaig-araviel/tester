"use client";

import { STEP_LABELS } from "@/lib/onboarding";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number; // 0-6 mapping to the 7 steps
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-64 bg-white border-r border-border flex flex-col">
      <div className="px-6 py-8 flex-1">
        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const stepNumber = index + 1;

          return (
            <div key={label} className="mb-6 last:mb-0">
              <div className="flex items-start gap-4">
                {/* Left border indicator */}
                <div
                  className={`w-1 h-full rounded-r transition-colors duration-200 ${
                    isCompleted || isCurrent ? "bg-primary" : "bg-border"
                  }`}
                  style={{
                    minHeight: "48px",
                  }}
                />

                <div className="flex-1 pt-1">
                  {/* Step number and status */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-colors duration-200 ${
                        isCompleted
                          ? "bg-primary text-white"
                          : isCurrent
                            ? "bg-primary text-white ring-2 ring-primary-light"
                            : "bg-gray-100 text-text-secondary"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        stepNumber
                      )}
                    </span>
                  </div>

                  {/* Label */}
                  <span
                    className={`font-body text-sm transition-colors duration-200 block ${
                      isCompleted || isCurrent
                        ? "text-text-primary font-medium"
                        : "text-text-secondary"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
