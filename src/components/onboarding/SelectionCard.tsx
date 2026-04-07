"use client";

import type { ReactNode } from "react";

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
}

/**
 * A horizontal card used for single-choice options (e.g. identity type).
 * Mirrors the LLC / Corporation cards in the reference design.
 */
export default function SelectionCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-5 rounded-2xl border bg-white p-5 text-left transition-all duration-200 ${
        selected
          ? "border-[#2962FF] shadow-[0_8px_24px_-12px_rgba(41,98,255,0.35)]"
          : "border-[#EEF0F4] shadow-[0_6px_20px_-18px_rgba(15,23,42,0.35)] hover:border-[#C6D2FF] hover:shadow-[0_8px_24px_-16px_rgba(41,98,255,0.25)]"
      }`}
    >
      {icon && (
        <span
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border text-[22px] transition-colors ${
            selected
              ? "border-[#2962FF] bg-[#EEF3FF] text-[#2962FF]"
              : "border-[#D9DEE8] bg-white text-[#2962FF] group-hover:border-[#C6D2FF]"
          }`}
        >
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1F36]">
          {title}
        </span>
        {description && (
          <span className="mt-1 font-body text-[13px] text-[#6B7280]">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
