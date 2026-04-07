"use client";

import { Pencil } from "lucide-react";
import ScreenShell from "@/components/onboarding/ScreenShell";
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

const AGE_LABEL_MAP: Record<string, string> = {
  expecting: "Expecting",
  "0-6m": "0-6 months",
  "6-24m": "6-24 months",
  "2-5y": "2-5 years",
  "5-16y": "5-16 years",
};

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
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <span className="block font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[#9AA2B1]">
          {label}
        </span>
        <span
          className={`mt-1 block font-body text-[14px] ${
            value ? "font-medium text-[#1A1F36]" : "italic text-[#9AA2B1]"
          }`}
        >
          {value || "Not provided"}
        </span>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex flex-shrink-0 items-center gap-1 font-body text-[12px] font-semibold text-[#2962FF] transition-colors hover:text-[#1F4EE6]"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>
    </div>
  );
}

function formatChildCount(data: OnboardingData): string | null {
  if (!data.child_count && !data.is_expecting) return null;
  const parts: string[] = [];
  if (data.is_expecting) parts.push("Expecting");
  if (data.child_count && data.child_count !== "expecting") {
    parts.push(
      `${data.child_count} ${data.child_count === "1" ? "child" : "children"}`
    );
  }
  return parts.join(" + ") || null;
}

export default function ReviewScreen({
  data,
  onConfirm,
  onBack,
  onSkip,
  onEdit,
  isPending,
}: ReviewScreenProps) {
  const identityDisplay = data.identity_type
    ? IDENTITY_DISPLAY[data.identity_type] || data.identity_type
    : null;

  const childCountDisplay = formatChildCount(data);

  const agesDisplay = data.child_age_buckets?.length
    ? data.child_age_buckets.map((b) => AGE_LABEL_MAP[b] ?? b).join(", ")
    : null;

  const needsDisplay = data.support_needs?.length
    ? data.support_needs.map((n) => SUPPORT_NEED_DISPLAY[n] || n).join(", ")
    : null;

  return (
    <ScreenShell
      title="Here's what you've told us"
      subtitle="Review your answers below. You can edit any of them before confirming."
      onBack={onBack}
      onContinue={onConfirm}
      continueLabel="Confirm & finish"
      onSkip={onSkip}
      skipLabel="Skip for now"
      isPending={isPending}
    >
      <div className="divide-y divide-[#EEF0F4] rounded-2xl border border-[#EEF0F4] bg-white p-6 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]">
        <ReviewRow
          label="I am a..."
          value={identityDisplay}
          onEdit={() => onEdit(2)}
        />
        <ReviewRow
          label="Children"
          value={childCountDisplay}
          onEdit={() => onEdit(3)}
        />
        <ReviewRow label="Ages" value={agesDisplay} onEdit={() => onEdit(4)} />
        <ReviewRow
          label="Location"
          value={data.postcode ?? null}
          onEdit={() => onEdit(5)}
        />
        <ReviewRow
          label="Support needs"
          value={needsDisplay}
          onEdit={() => onEdit(6)}
        />
      </div>
    </ScreenShell>
  );
}
