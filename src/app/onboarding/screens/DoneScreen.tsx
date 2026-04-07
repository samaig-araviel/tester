"use client";

import { CheckCircle2 } from "lucide-react";

interface DoneScreenProps {
  onFinish: () => void;
  isPending: boolean;
}

export default function DoneScreen({ onFinish, isPending }: DoneScreenProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <span className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#E5EDEB] text-[#0B4F4F] shadow-[0_0_0_10px_rgba(11,79,79,0.08)]">
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
        className="mt-10 h-[48px] w-full rounded-xl bg-[#0B4F4F] font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#093F3F] disabled:cursor-not-allowed disabled:bg-[#0B4F4F]/50"
      >
        {isPending ? "Finishing..." : "Go to Parentfits"}
      </button>
    </section>
  );
}
