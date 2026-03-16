"use client";

import { useState } from "react";
import TownCombobox from "@/components/onboarding/TownCombobox";

interface LocationScreenProps {
  town: string | null;
  county: string | null;
  onNext: (town: string, county: string) => void;
  onSkip: () => void;
  isPending: boolean;
}

export default function LocationScreen({ town, county, onNext, onSkip, isPending }: LocationScreenProps) {
  const [selectedTown, setSelectedTown] = useState<string | null>(town);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(county);

  function handleSelect(townName: string, countyName: string) {
    setSelectedTown(townName || null);
    setSelectedCounty(countyName || null);
  }

  return (
    <div className="pt-8 sm:pt-12">
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 sm:p-10 w-full max-w-[520px] mx-auto">
        <h2 className="font-heading text-[24px] font-bold text-text-primary mb-2">
          Where are you based?
        </h2>
        <p className="font-body text-[14px] text-text-secondary mb-6">
          We use this to show nearby and relevant support.
        </p>

        <div className="mb-8">
          <TownCombobox
            value={selectedTown}
            county={selectedCounty}
            onSelect={handleSelect}
          />
        </div>

        <button
          onClick={() => selectedTown && selectedCounty && onNext(selectedTown, selectedCounty)}
          disabled={!selectedTown || isPending}
          className="w-full h-[44px] rounded-xl bg-primary text-white font-body font-medium text-[15px] hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Continue"}
        </button>

        <button
          onClick={onSkip}
          disabled={isPending}
          className="w-full mt-3 py-2 font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
