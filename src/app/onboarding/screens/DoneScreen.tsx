"use client";

import { CheckCircle } from "lucide-react";

interface DoneScreenProps {
  onFinish: () => void;
  isPending: boolean;
}

export default function DoneScreen({ onFinish, isPending }: DoneScreenProps) {
  return (
    <div className="pt-8 sm:pt-12">
      <div className="w-full max-w-[520px] mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-text-primary mb-4">
          You&apos;re all set
        </h2>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8">
          We&apos;ll use this to personalise your experience. You can update your preferences anytime in your profile.
        </p>

        <button
          onClick={onFinish}
          disabled={isPending}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Finishing..." : "Go to Parentfits"}
        </button>
      </div>
    </div>
  );
}
