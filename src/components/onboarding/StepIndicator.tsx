"use client";

import { Check, ArrowRight } from "lucide-react";
import { STEP_LABELS } from "@/lib/onboarding";

interface StepIndicatorProps {
  /** Zero-based index of the step currently being worked on. */
  currentStep: number;
}

type StepState = "completed" | "current" | "upcoming";

function getStepState(index: number, currentStep: number): StepState {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

function StepBadge({ state, number }: { state: StepState; number: number }) {
  if (state === "completed") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0B4F4F] text-white shadow-[0_0_0_4px_rgba(11,79,79,0.12)]">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0B4F4F] bg-white text-[13px] font-semibold text-[#0B4F4F] shadow-[0_0_0_4px_rgba(11,79,79,0.12)]">
        {number}
      </span>
    );
  }

  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E4EA] bg-white text-[13px] font-medium text-[#9AA2B1]">
      {number}
    </span>
  );
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Onboarding progress" className="w-full">
      <ol className="flex flex-col gap-1">
        {STEP_LABELS.map((label, index) => {
          const state = getStepState(index, currentStep);
          const isCurrent = state === "current";
          const isUpcoming = state === "upcoming";

          return (
            <li
              key={label}
              className="flex items-center gap-4 py-3"
              aria-current={isCurrent ? "step" : undefined}
            >
              <StepBadge state={state} number={index + 1} />
              <span
                className={`font-body text-[13px] font-semibold uppercase tracking-[0.12em] ${
                  isCurrent
                    ? "text-[#0B4F4F]"
                    : isUpcoming
                      ? "text-[#9AA2B1]"
                      : "text-[#C8CCD4]"
                }`}
              >
                {label}
              </span>
              {isCurrent && (
                <ArrowRight
                  className="ml-auto h-4 w-4 text-[#C8CCD4]"
                  strokeWidth={2.25}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
