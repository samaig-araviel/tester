"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface ScreenShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  /**
   * If provided, shows a "Back" button at the bottom-left of the screen.
   */
  onBack?: () => void;
  /**
   * Primary action. Shown as the right-hand button in the footer row.
   */
  onContinue?: () => void;
  canContinue?: boolean;
  continueLabel?: string;
  onSkip?: () => void;
  onSkipAll?: () => void;
  /** Label for the soft secondary "skip this step" action. */
  skipLabel?: string;
  isPending?: boolean;
}

/**
 * Shared chrome for every onboarding question screen. Keeps title, body,
 * and footer actions visually consistent across the flow.
 */
export default function ScreenShell({
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  canContinue = true,
  continueLabel = "Continue",
  onSkip,
  onSkipAll,
  skipLabel = "Skip this step",
  isPending = false,
}: ScreenShellProps) {
  const hasFooterActions = Boolean(onBack || onContinue);
  const disabled = isPending || !canContinue;

  return (
    <section className="flex flex-col">
      <header className="mb-10">
        <h2 className="font-heading text-[30px] font-bold leading-tight text-[#1A1F36]">
          {title}
        </h2>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-[#6B7280]">
          {subtitle}
        </p>
      </header>

      <div>{children}</div>

      {hasFooterActions && (
        <footer className="mt-10 space-y-3">
          <div className="flex gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                disabled={isPending}
                className="flex h-[48px] items-center justify-center gap-2 rounded-xl border border-[#E1E4EA] bg-white px-6 font-body text-[14px] font-medium text-[#1A1F36] transition-colors hover:border-[#0B4F4F] hover:text-[#0B4F4F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
            {onContinue && (
              <button
                type="button"
                onClick={onContinue}
                disabled={disabled}
                className="h-[48px] flex-1 rounded-xl bg-[#0B4F4F] font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#093F3F] disabled:cursor-not-allowed disabled:bg-[#0B4F4F]/50"
              >
                {isPending ? "Saving..." : continueLabel}
              </button>
            )}
          </div>

          {(onSkip || onSkipAll) && (
            <div className="flex flex-col items-center gap-1 pt-1">
              {onSkip && (
                <button
                  type="button"
                  onClick={onSkip}
                  disabled={isPending}
                  className="font-body text-[13px] text-[#6B7280] transition-colors hover:text-[#1A1F36] disabled:opacity-50"
                >
                  {skipLabel}
                </button>
              )}
              {onSkipAll && (
                <button
                  type="button"
                  onClick={onSkipAll}
                  disabled={isPending}
                  className="font-body text-[12px] text-[#9AA2B1] transition-colors hover:text-[#1A1F36] disabled:opacity-50"
                >
                  Skip setup entirely
                </button>
              )}
            </div>
          )}
        </footer>
      )}
    </section>
  );
}
