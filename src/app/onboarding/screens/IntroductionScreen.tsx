"use client";

import { Sparkles, Compass, ShieldCheck } from "lucide-react";
import ScreenShell from "@/components/onboarding/ScreenShell";

interface IntroductionScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Personalised for your family",
    body: "We tailor recommendations to your children and priorities.",
  },
  {
    icon: Compass,
    title: "Local and relevant",
    body: "See nearby support based on where you live.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Your answers stay private and you can change them anytime.",
  },
] as const;

export default function IntroductionScreen({
  onNext,
  onBack,
  onSkip,
}: IntroductionScreenProps) {
  return (
    <ScreenShell
      title="Help us tailor this to you"
      subtitle="Answer a few quick questions so we can show you the most relevant support."
      onBack={onBack}
      onContinue={onNext}
      continueLabel="Get started"
      onSkip={onSkip}
      skipLabel="Skip for now"
    >
      <ul className="flex flex-col gap-3">
        {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-[#EEF0F4] bg-white p-4 shadow-[0_6px_20px_-18px_rgba(15,23,42,0.35)]"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#D9DEE8] bg-[#E5EDEB] text-[#0B4F4F]">
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-body text-[14px] font-semibold text-[#1A1F36]">
                {title}
              </span>
              <span className="mt-0.5 font-body text-[13px] text-[#6B7280]">
                {body}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </ScreenShell>
  );
}
