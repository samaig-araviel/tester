"use client";

import { useRouter } from "next/navigation";
import SectionHeader from "./SectionHeader";
import Carousel from "./Carousel";
import OfferCard from "./OfferCard";

interface Offer {
  id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
  banner_url: string | null;
  offer_headline: string;
  is_saved: boolean;
  is_new: boolean;
  category?: string | null;
  delivery_type?: string | null;
  short_descriptor?: string | null;
  age_relevance?: string[] | null;
}

interface NewFeaturedSectionProps {
  offers: Offer[];
  onToggleSave: (offerId: string) => void;
}

export default function NewFeaturedSection({
  offers,
  onToggleSave,
}: NewFeaturedSectionProps) {
  const router = useRouter();

  if (offers.length === 0) {
    return (
      <section>
        <SectionHeader
          title="New & Featured"
          helperText="New partners and offers added recently."
        />
        <p className="font-body text-[14px] text-muted-grey text-center py-8">
          No new offers this week. Check back soon.
        </p>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader
        title="New & Featured"
        helperText="New partners and offers added recently."
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
            isNew={offer.is_new}
            isSaved={offer.is_saved}
            category={offer.category}
            deliveryType={offer.delivery_type}
            shortDescriptor={offer.short_descriptor}
            ageRelevance={offer.age_relevance}
            onToggleSave={onToggleSave}
            onClick={() => router.push(`/offer/${offer.id}`)}
          />
        ))}
      </Carousel>
    </section>
  );
}
