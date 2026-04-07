"use client";

import { Pencil, ArrowLeft } from "lucide-react";
import type { OnboardingData } from "@/lib/onboarding";
import { IDENTITY_DISPLAY, SUPPORT_NEED_DISPLAY } from "@/lib/onboarding";

interface ReviewScreenProps {
  data: OnboardingData;
  onConfirm: () => void;
  onBack: () => void;
  onSkip: () => void;
  onEdit: (screenIndex: number) => void;
  isPending: boolean;
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string | null;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <span className="font-body text-[13px] text-text-secondary block">{label}</span>
        <span
          className={`font-body text-[15px] block mt-1 ${
            value ? "text-text-primary font-medium" : "text-text-secondary/60 italic"
          }`}
        >
          {value || "Not provided"}
        </span>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 text-primary font-body text-[13px] font-medium hover:underline cursor-pointer ml-4 flex-shrink-0"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </button>
    </div>
  );
}

export default function ReviewScreen({ data, onConfirm, onBack, onSkip, onEdit, isPending }: ReviewScreenProps) {
  const identityDisplay = data.identity_type
    ? IDENTITY_DISPLAY[data.identity_type] || data.identity_type
    : null;

  const childCountDisplay = (() => {
    if (!data.child_count && !data.is_expecting) return null;
    const parts: string[] = [];
    if (data.is_expecting) parts.push("Expecting");
    if (data.child_count && data.child_count !== "expecting") {
      parts.push(`${data.child_count} ${data.child_count === "1" ? "child" : "children"}`);
    }
    return parts.join(" + ") || null;
  })();

  const ageLabelMap: Record<string, string> = {
    expecting: "Expecting",
    "0-6m": "0-6 months",
    "6-24m": "6-24 months",
    "2-5y": "2-5 years",
    "5-16y": "5-16 years",
  };
  const agesDisplay = data.child_age_buckets?.length
    ? data.child_age_buckets.map((b) => ageLabelMap[b] ?? b).join(", ")
    : null;

  const locationDisplay = data.postcode ?? null;

  const needsDisplay = data.support_needs?.length
    ? data.support_needs.map((n) => SUPPORT_NEED_DISPLAY[n] || n).join(", ")
    : null;

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          Here&apos;s what you&apos;ve told us
        </h2>
        <p className="font-body text-[15px] text-text-secondary mb-8">
          Review your answers below. You can edit any of them before confirming.
        </p>

        <div className="space-y-4 bg-gray-50 rounded-lg p-5">
          <ReviewRow label="I am a..." value={identityDisplay} onEdit={() => onEdit(2)} />
          <ReviewRow label="Children" value={childCountDisplay} onEdit={() => onEdit(3)} />
          <ReviewRow label="Ages" value={agesDisplay} onEdit={() => onEdit(4)} />
          <ReviewRow label="Location" value={locationDisplay} onEdit={() => onEdit(5)} />
          <ReviewRow label="Support needs" value={needsDisplay} onEdit={() => onEdit(6)} />
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
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 h-[44px] rounded-lg bg-primary text-white font-body font-medium text-[14px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Confirm & finish"}
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onSkip}
            disabled={isPending}
            className="py-2 font-body text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
