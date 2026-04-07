"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import ScreenShell from "@/components/onboarding/ScreenShell";

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

interface LocationScreenProps {
  postcode: string | null;
  onNext: (postcode: string) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function LocationScreen({
  postcode,
  onNext,
  onBack,
  onSkip,
  onSkipAll,
  isPending,
}: LocationScreenProps) {
  const [value, setValue] = useState(postcode ?? "");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  function validate(v: string): boolean {
    if (!v.trim()) return false;
    return UK_POSTCODE_REGEX.test(v.trim());
  }

  function handleBlur() {
    setTouched(true);
    if (value.trim() && !validate(value)) {
      setError("Please enter a valid UK postcode");
    } else {
      setError(null);
    }
  }

  function handleChange(v: string) {
    setValue(v.toUpperCase());
    if (touched && error && validate(v)) {
      setError(null);
    }
  }

  function handleSubmit() {
    if (!validate(value)) {
      setError("Please enter a valid UK postcode");
      return;
    }
    onNext(value.trim());
  }

  return (
    <ScreenShell
      title="Where are you based?"
      subtitle="We use this to show nearby and relevant support."
      onBack={onBack}
      onContinue={handleSubmit}
      canContinue={value.trim().length > 0}
      onSkip={onSkip}
      onSkipAll={onSkipAll}
      isPending={isPending}
    >
      <label
        htmlFor="postcode"
        className="mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1F36]"
      >
        Postcode
      </label>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9AA2B1]" />
        <input
          id="postcode"
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter your postcode"
          autoComplete="postal-code"
          className={`h-[52px] w-full rounded-xl border bg-white pl-12 pr-4 font-body text-[15px] text-[#1A1F36] placeholder:text-[#9AA2B1] transition-colors focus:outline-none ${
            error
              ? "border-[#EF4444] focus:border-[#EF4444]"
              : "border-[#E1E4EA] focus:border-[#2962FF]"
          }`}
        />
      </div>
      {error && (
        <p className="mt-2 font-body text-[13px] text-[#EF4444]">{error}</p>
      )}
    </ScreenShell>
  );
}
