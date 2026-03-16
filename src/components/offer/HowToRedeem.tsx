"use client";

import { AlertCircle } from "lucide-react";

const STEPS = [
  {
    title: "Add your membership card to your phone",
    description:
      "If you haven't already, add your Parentfits membership card to your phone wallet.",
  },
  {
    title: "Visit the venue",
    description:
      "Go to the participating location during their normal opening hours.",
  },
  {
    title: "Open your digital membership card",
    description:
      "At the point of payment or check-in, open your phone wallet and select your Parentfits card.",
  },
  {
    title: "Show your card to staff",
    description:
      "Show your digital membership card to a member of staff before you pay or complete your booking. They will apply the offer for you.",
  },
];

export default function HowToRedeem() {
  return (
    <div>
      {/* Steps */}
      <div className="flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Step number */}
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-warm-teal text-white flex items-center justify-center">
              <span className="font-heading text-[14px] font-semibold">
                {i + 1}
              </span>
            </div>
            <div>
              <h4 className="font-heading text-[15px] font-semibold text-charcoal">
                {step.title}
              </h4>
              <p className="font-body text-[14px] text-muted-grey mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Important note */}
      <div className="mt-6 flex items-start gap-3 bg-[#F0EDED] rounded-xl p-4">
        <AlertCircle className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" />
        <p className="font-body text-[14px] text-charcoal leading-relaxed">
          <span className="font-semibold">Important note:</span> Offers must be
          shown at the time of purchase or check-in and cannot be applied
          retrospectively.
        </p>
      </div>
    </div>
  );
}
