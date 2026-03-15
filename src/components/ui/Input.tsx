"use client";

import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  rightIcon?: ReactNode;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full h-12 bg-surface border rounded-xl px-4 font-body text-[15px]
              text-text-primary placeholder:text-text-secondary/50
              transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light
              ${error ? "border-error" : "border-border"}
              ${rightIcon ? "pr-12" : ""}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-body text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
