"use client";

interface PillButtonProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

export default function PillButton({ selected, onClick, label }: PillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-5 py-2.5 font-body text-[13px] font-semibold transition-all duration-200 ${
        selected
          ? "border-[#2962FF] bg-[#2962FF] text-white shadow-[0_6px_16px_-8px_rgba(41,98,255,0.45)]"
          : "border-[#E1E4EA] bg-white text-[#1A1F36] hover:border-[#2962FF] hover:text-[#2962FF]"
      }`}
    >
      {label}
    </button>
  );
}
