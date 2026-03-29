"use client";

import { Check } from "lucide-react";

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  variant?: "radio" | "checkbox";
}

export default function SelectionCard({
  selected,
  onClick,
  icon,
  title,
  description,
  variant = "radio",
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
        selected
          ? "border-primary bg-primary-light/40"
          : "border-border bg-white hover:border-gray-300"
      }`}
    >
      {icon && (
        <span className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center">
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <span className="font-body font-medium text-[15px] text-text-primary block">
          {title}
        </span>
        {description && (
          <span className="font-body text-[13px] text-text-secondary block mt-0.5">
            {description}
          </span>
        )}
      </div>
      {/* Indicator */}
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${
          selected
            ? "border-primary bg-primary"
            : "border-gray-300 bg-white"
        } ${variant === "checkbox" ? "rounded-md" : ""}`}
      >
        {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>
    </button>
  );
}
