"use client";

import { useState } from "react";
import { MapPin, ArrowLeft } from "lucide-react";

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

interface LocationScreenProps {
  postcode: string | null;
  onNext: (postcode: string) => void;
  onBack: () => void;
  onSkip: () => void;
  onSkipAll: () => void;
  isPending: boolean;
}

export default function LocationScreen({ postcode, onNext, onBack, onSkip, onSkipAll, isPending }: LocationScreenProps) {
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
    if (touched && error) {
      if (validate(v)) setError(null);
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
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="font-heading text-[28px] font-bold text-text-primary mb-2">
          Where are you based?
        </h2>
        <p className="font-body text-[15px] text-text-secondary mb-8">
          We use this to show nearby and relevant support.
        </p>

        <div>
          <label htmlFor="postcode" className="block font-body text-[13px] font-medium text-text-primary mb-2">
            Postcode
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-grey" />
            <input
              id="postcode"
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter your postcode"
              className={`w-full h-[44px] pl-10 pr-4 rounded-lg border-2 bg-white font-body text-[14px] text-text-primary placeholder:text-muted-grey focus:outline-none transition-colors ${
                error
                  ? "border-red-400 focus:border-red-400"
                  : "border-border focus:border-primary"
              }`}
              autoComplete="postal-code"
            />
          </div>
          {error && (
            <p className="font-body text-[12px] text-red-500 mt-1.5">{error}</p>
          )}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            disabled={isPending}
            className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-lg bg-white border-2 border-primary text-primary hover:bg-primary-light transition-colors cursor-pointer disabled:opacity-50 font-body text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={!value.trim() || isPending}
            className="flex-1 h-[44px] rounded-lg bg-primary text-white font-body font-medium text-[14px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Continue"}
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onSkip}
            disabled={isPending}
            className="py-2 font-body text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip this step
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onSkipAll}
            disabled={isPending}
            className="py-1 font-body text-[12px] text-text-secondary/60 hover:text-text-secondary transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip setup entirely
          </button>
        </div>
      </div>
    </div>
  );
}
