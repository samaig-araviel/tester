"use client";

import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white font-body text-[15px] font-semibold
    hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg
    active:translate-y-0
  `,
  outline: `
    bg-surface text-text-primary font-body text-[15px] font-medium
    border border-border
    hover:border-primary hover:shadow-sm
  `,
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        h-12 rounded-xl
        transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
