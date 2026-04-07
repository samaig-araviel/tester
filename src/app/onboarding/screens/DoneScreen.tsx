"use client";

import { CheckCircle } from "lucide-react";

interface DoneScreenProps {
  onFinish: () => void;
  isPending: boolean;
}

export default function DoneScreen({ onFinish, isPending }: DoneScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 w-full">
      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>

      <div>
        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          You&apos;re all set
        </h2>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed max-w-md mx-auto">
          We&apos;ll use this to personalise your experience. You can update your preferences anytime in your profile.
        </p>
      </div>

      <button
        onClick={onFinish}
        disabled={isPending}
        className="w-full h-[44px] rounded-lg bg-primary text-white font-body font-medium text-[14px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Finishing..." : "Go to Parentfits"}
      </button>
    </div>
  );
}
