"use client";

import type { ReactNode } from "react";
import BrandMark from "./BrandMark";
import StepIndicator from "./StepIndicator";

interface OnboardingLayoutProps {
  /**
   * `"hero"` renders the blue decorative left panel used for pre-onboarding
   * (welcome / introduction) screens. `"stepped"` renders the white timeline
   * panel used while the user is answering questions.
   */
  variant: "hero" | "stepped";
  /** Required when `variant === "stepped"`. */
  stepIndex?: number;
  /** Optional override for the hero headline. */
  heroTitle?: string;
  /** Optional override for the hero subtitle. */
  heroSubtitle?: string;
  children: ReactNode;
}

const DEFAULT_HERO_TITLE = "A few clicks away from personalising your support.";
const DEFAULT_HERO_SUBTITLE =
  "Set up Parentfits in minutes. Save time and find the right help, fast.";

function HeroPanel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <aside className="relative hidden w-full max-w-[520px] flex-col justify-between overflow-hidden bg-[#0B4F4F] px-12 py-10 text-white lg:flex">
      <BrandMark variant="light" />

      <div className="relative z-10 max-w-[380px]">
        <h1 className="font-heading text-[40px] font-bold leading-[1.1] tracking-tight">
          {title}
        </h1>
        <p className="mt-6 font-body text-[15px] leading-relaxed text-white/80">
          {subtitle}
        </p>
      </div>
    </aside>
  );
}

function SteppedPanel({ stepIndex }: { stepIndex: number }) {
  return (
    <aside className="relative hidden w-full max-w-[360px] flex-col border-r border-[#EEF0F4] bg-white px-10 py-10 lg:flex">
      <BrandMark variant="dark" />

      <div className="mt-16 flex-1">
        <StepIndicator currentStep={stepIndex} />
      </div>
    </aside>
  );
}

export default function OnboardingLayout({
  variant,
  stepIndex = 0,
  heroTitle = DEFAULT_HERO_TITLE,
  heroSubtitle = DEFAULT_HERO_SUBTITLE,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {variant === "hero" ? (
        <HeroPanel title={heroTitle} subtitle={heroSubtitle} />
      ) : (
        <SteppedPanel stepIndex={stepIndex} />
      )}

      <main className="relative flex flex-1 flex-col bg-[#F8FAFC]">
        <header className="flex items-center justify-between px-8 pt-8 lg:px-14">
          <div className="lg:hidden">
            <BrandMark variant="dark" />
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-8 py-10 lg:px-14">
          <div className="w-full max-w-[560px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
