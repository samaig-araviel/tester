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
      className={`px-5 py-2.5 rounded-full border font-body text-[14px] font-medium transition-all duration-200 cursor-pointer ${
        selected
          ? "border-primary bg-primary text-white"
          : "border-border bg-white text-text-primary hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
