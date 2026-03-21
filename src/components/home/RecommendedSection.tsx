"use client";

import { useRouter } from "next/navigation";
import SectionHeader from "./SectionHeader";
import Carousel from "./Carousel";
import OfferCard from "./OfferCard";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface Offer {
  id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
  banner_url: string | null;
  offer_headline: string;
  is_saved: boolean;
}

interface RecommendedSectionProps {
  offers: Offer[];
  onboardingCompleted: boolean;
  onToggleSave: (offerId: string) => void;
}

export default function RecommendedSection({
  offers,
  onboardingCompleted,
  onToggleSave,
}: RecommendedSectionProps) {
  const router = useRouter();

  // Empty state when onboarding not completed
  if (!onboardingCompleted) {
    return (
      <section>
        <SectionHeader
          title="Recommended for you"
          helperText="Based on your preferences and life stage."
        />
        <div className="flex items-center justify-center py-8">
          <div className="max-w-md w-full rounded-2xl border border-border bg-primary-light/30 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-warm-teal-light flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-warm-teal" />
            </div>
            <h3 className="font-heading text-[18px] font-semibold text-soft-navy mb-2">
              Tell us what you need
            </h3>
            <p className="font-body text-[14px] text-muted-grey mb-6 leading-relaxed">
              Complete your profile so we can personalise your
              recommendations.
            </p>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center px-6 h-[44px] rounded-full bg-primary text-white font-body text-[15px] font-medium transition-all duration-150 hover:bg-primary-hover"
            >
              Complete my profile
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Onboarding complete but no offers matched
  if (offers.length === 0) {
    return (
      <section>
        <SectionHeader
          title="Recommended for you"
          helperText="Based on your preferences and life stage."
        />
        <div className="flex items-center justify-center py-8">
          <div className="max-w-md w-full rounded-2xl border border-border bg-primary-light/30 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-warm-teal-light flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-warm-teal" />
            </div>
            <h3 className="font-heading text-[18px] font-semibold text-soft-navy mb-2">
              No recommendations yet
            </h3>
            <p className="font-body text-[14px] text-muted-grey mb-6 leading-relaxed">
              Update your preferences in your profile to get personalised recommendations.
            </p>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center px-6 h-[44px] rounded-full bg-primary text-white font-body text-[15px] font-medium transition-all duration-150 hover:bg-primary-hover"
            >
              Update preferences
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader
        title="Recommended for you"
        helperText="Based on your preferences and life stage."
      />
      <Carousel itemCount={offers.length}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            id={offer.id}
            vendorName={offer.vendor_name}
            vendorLogoUrl={offer.vendor_logo_url}
            bannerUrl={offer.banner_url}
            offerHeadline={offer.offer_headline}
            isSaved={offer.is_saved}
            onToggleSave={onToggleSave}
            onClick={() => router.push(`/offer/${offer.id}`)}
          />
        ))}
      </Carousel>
    </section>
  );
}
