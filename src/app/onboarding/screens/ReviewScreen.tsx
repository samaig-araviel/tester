"use client";

import { Pencil } from "lucide-react";
import type { OnboardingData } from "@/lib/onboarding";
import { IDENTITY_DISPLAY, SUPPORT_NEED_DISPLAY } from "@/lib/onboarding";

interface ReviewScreenProps {
  data: OnboardingData;
  onConfirm: () => void;
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
    <div className="flex items-start justify-between py-3 border-b border-border/50 last:border-b-0">
      <div className="flex-1 min-w-0">
        <span className="font-body text-[13px] text-text-secondary block">{label}</span>
        <span
          className={`font-body text-[15px] block mt-0.5 ${
            value ? "text-text-primary font-medium" : "text-text-secondary/60 italic"
          }`}
        >
          {value || "Not provided"}
        </span>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 text-primary font-body text-[13px] font-medium hover:underline cursor-pointer ml-4 mt-1 flex-shrink-0"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </button>
    </div>
  );
}

export default function ReviewScreen({ data, onConfirm, onSkip, onEdit, isPending }: ReviewScreenProps) {
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
    <div className="pt-8 sm:pt-12">
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 sm:p-10 w-full max-w-[520px] mx-auto">
        <h2 className="font-heading text-[24px] font-bold text-text-primary mb-2">
          Here&apos;s what you&apos;ve told us
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          Review your answers below. You can edit any of them before confirming.
        </p>

        <div className="mb-8">
          <ReviewRow label="I am a..." value={identityDisplay} onEdit={() => onEdit(2)} />
          <ReviewRow label="Children" value={childCountDisplay} onEdit={() => onEdit(3)} />
          <ReviewRow label="Ages" value={agesDisplay} onEdit={() => onEdit(4)} />
          <ReviewRow label="Location" value={locationDisplay} onEdit={() => onEdit(5)} />
          <ReviewRow label="Support needs" value={needsDisplay} onEdit={() => onEdit(6)} />
        </div>

        <button
          onClick={onConfirm}
          disabled={isPending}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Confirm & finish"}
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
