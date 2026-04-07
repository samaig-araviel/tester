"use client";

import { CheckCircle2 } from "lucide-react";

interface DoneScreenProps {
  onFinish: () => void;
  isPending: boolean;
}

export default function DoneScreen({ onFinish, isPending }: DoneScreenProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <span className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF3FF] text-[#2962FF] shadow-[0_0_0_10px_rgba(41,98,255,0.08)]">
        <CheckCircle2 className="h-10 w-10" strokeWidth={2} />
      </span>

      <h2 className="font-heading text-[32px] font-bold leading-tight text-[#1A1F36]">
        You&apos;re all set
      </h2>
      <p className="mx-auto mt-4 max-w-md font-body text-[15px] leading-relaxed text-[#6B7280]">
        We&apos;ll use this to personalise your experience. You can update your
        preferences anytime in your profile.
      </p>

      <button
        type="button"
        onClick={onFinish}
        disabled={isPending}
        className="mt-10 h-[48px] w-full rounded-xl bg-[#2962FF] font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#1F4EE6] disabled:cursor-not-allowed disabled:bg-[#2962FF]/50"
      >
        {isPending ? "Finishing..." : "Go to Parentfits"}
      </button>
    </section>
  );
}
