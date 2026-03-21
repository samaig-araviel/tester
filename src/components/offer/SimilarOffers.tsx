"use client";

import { useRouter } from "next/navigation";
import Carousel from "@/components/home/Carousel";
import OfferCard from "@/components/home/OfferCard";
import SectionHeader from "@/components/home/SectionHeader";

interface SimilarOffer {
  id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
  banner_url: string | null;
  offer_headline: string;
  is_new: boolean;
  is_saved: boolean;
  delivery_type: string | null;
  category?: string | null;
  short_descriptor?: string | null;
  age_relevance?: string[] | null;
}

interface SimilarOffersProps {
  offers: SimilarOffer[];
  category: string | null;
  onToggleSave: (offerId: string) => void;
}

function formatCategoryDisplay(cat: string | null): string | undefined {
  if (!cat) return undefined;
  return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SimilarOffers({
  offers,
  category,
  onToggleSave,
}: SimilarOffersProps) {
  const router = useRouter();

  if (offers.length === 0) return null;

  const categoryDisplay = formatCategoryDisplay(category);
  const explorePath = category ? `/explore/online` : undefined;

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <SectionHeader
        title="You might also like..."
        helperText=""
        ctaText={categoryDisplay ? `View all in ${categoryDisplay}` : undefined}
        ctaHref={explorePath}
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
