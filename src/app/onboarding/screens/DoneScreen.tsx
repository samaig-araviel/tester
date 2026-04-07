"use client";

import { CheckCircle } from "lucide-react";

interface DoneScreenProps {
  onFinish: () => void;
  isPending: boolean;
}

export default function DoneScreen({ onFinish, isPending }: DoneScreenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-8">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>

      <h2 className="font-heading text-[32px] sm:text-[36px] font-bold text-text-primary mb-4">
        You&apos;re all set
      </h2>
      <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-md mx-auto mb-10">
        We&apos;ll use this to personalise your experience. You can update your preferences anytime in your profile.
      </p>

      <button
        onClick={onFinish}
        disabled={isPending}
        className="w-full h-[48px] rounded-lg bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Finishing..." : "Go to Parentfits"}
      </button>
    </div>
  );
}
