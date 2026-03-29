"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Breadcrumb from "./Breadcrumb";
import BannerHero from "./BannerHero";
import VendorCardOnline from "./VendorCardOnline";
import VendorCardInPerson from "./VendorCardInPerson";
import Accordion from "./Accordion";
import type { AccordionItem } from "./Accordion";
import HowToRedeem from "./HowToRedeem";
import SimilarOffers from "./SimilarOffers";
import Toast from "@/components/home/Toast";

interface VendorData {
  name: string;
  logo_url: string | null;
  banner_url: string | null;
  category: string | null;
  delivery_type: string | null;
  short_descriptor: string | null;
  location_name: string | null;
  website_url: string | null;
}

interface SimilarOffer {
  id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
  banner_url: string | null;
  offer_headline: string;
  is_new: boolean;
  is_saved: boolean;
  delivery_type: string | null;
}

interface OfferDetailContentProps {
  offerId: string;
  offerTitle: string | null;
  offerHeadline: string;
  discountCode: string | null;
  vendor: VendorData;
  isOnline: boolean;
  isSaved: boolean;
  userId: string;
  similarOffers: SimilarOffer[];
}

export default function OfferDetailContent({
  offerId,
  offerTitle,
  offerHeadline,
  discountCode,
  vendor,
  isOnline,
  isSaved: initialSaved,
  userId,
  similarOffers: initialSimilar,
}: OfferDetailContentProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [similarOffers, setSimilarOffers] = useState(initialSimilar);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    isOnline ? null : "how-to-redeem"
  );
  const [toast, setToast] = useState<{
    message: string;
    undo?: () => void;
  } | null>(null);

  const toggleAccordion = useCallback((id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  }, []);

  const toggleSave = useCallback(async () => {
    const supabase = createClient();
    const wasSaved = saved;
    setSaved(!wasSaved);

    if (wasSaved) {
      const { error } = await supabase
        .from("saved_offers")
        .delete()
        .eq("user_id", userId)
        .eq("offer_id", offerId);
      if (!error) {
        setToast({ message: "Removed from favourites", undo: () => toggleSave() });
      } else {
        setSaved(wasSaved);
      }
    } else {
      const { error } = await supabase
        .from("saved_offers")
        .insert({ user_id: userId, offer_id: offerId });
      if (!error) {
        setToast({ message: "Saved to favourites", undo: () => toggleSave() });
      } else {
        setSaved(wasSaved);
      }
    }
  }, [saved, userId, offerId]);

  const toggleSimilarSave = useCallback(
    async (simOfferId: string) => {
      const supabase = createClient();
      const offer = similarOffers.find((o) => o.id === simOfferId);
      if (!offer) return;
      const wasSaved = offer.is_saved;

      setSimilarOffers((prev) =>
        prev.map((o) =>
          o.id === simOfferId ? { ...o, is_saved: !wasSaved } : o
        )
      );

      if (wasSaved) {
        await supabase
          .from("saved_offers")
          .delete()
          .eq("user_id", userId)
          .eq("offer_id", simOfferId);
      } else {
        await supabase
          .from("saved_offers")
          .insert({ user_id: userId, offer_id: simOfferId });
      }
    },
    [similarOffers, userId]
  );

  // Build breadcrumb
  const deliveryLabel = isOnline ? "Explore online" : "Explore in-person";
  const deliveryHref = isOnline ? "/explore/online" : "/explore/in-person";
  const breadcrumbSegments = [
    { label: deliveryLabel, href: deliveryHref },
    ...(vendor.category
      ? [{ label: vendor.category, href: deliveryHref }]
      : []),
    { label: vendor.name },
  ];

  // Build accordion items
  const accordionItems: AccordionItem[] = [];

  if (!isOnline) {
    accordionItems.push({
      id: "how-to-redeem",
      title: "How to redeem",
      defaultOpen: true,
      content: <HowToRedeem />,
    });
  }

  accordionItems.push({
    id: "terms",
    title: "Terms and conditions",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Offer is available to verified Parentfits members only.</li>
        <li>
          Offer cannot be combined with other promotions unless stated.
        </li>
        <li>
          Offer is subject to availability and may be withdrawn by the
          partner.
        </li>
        <li>Standard partner terms apply at checkout/booking.</li>
      </ul>
    ),
  });

  accordionItems.push({
    id: "why-vendor",
    title: isOnline ? `Why ${vendor.name}` : "Why this vendor",
    content: (
      <div>
        <p className="mb-3">Why we chose {vendor.name}:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Trusted provider aligned to working-parent needs</li>
          <li>High-quality service and clear customer support</li>
          <li>
            Strong fit for {vendor.category ?? "family services"} and
            relevant life stages
          </li>
          <li>Simple redemption and transparent terms</li>
        </ul>
      </div>
    ),
  });

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb segments={breadcrumbSegments} />

      {/* Banner */}
      <BannerHero bannerUrl={vendor.banner_url} vendorName={vendor.name} />

      {/* Main two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left: Vendor Card */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          {isOnline ? (
            <VendorCardOnline
              vendorName={vendor.name}
              vendorLogoUrl={vendor.logo_url}
              offerHeadline={offerHeadline}
              offerTitle={offerTitle}
              discountCode={discountCode}
              websiteUrl={vendor.website_url}
              isSaved={saved}
              onToggleSave={toggleSave}
            />
          ) : (
            <VendorCardInPerson
              vendorName={vendor.name}
              vendorLogoUrl={vendor.logo_url}
              shortDescriptor={vendor.short_descriptor}
              offerTitle={offerTitle}
              category={vendor.category}
              websiteUrl={vendor.website_url}
              isSaved={saved}
              onToggleSave={toggleSave}
            />
          )}
        </div>

        {/* Right: Info panels */}
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-[28px] font-semibold text-soft-navy mb-6">
            {isOnline
              ? `Exclusive offer with ${vendor.name}`
              : `${offerHeadline}`}
          </h1>
          <div id="accordion-terms">
            <Accordion
              items={accordionItems}
              activeId={activeAccordion}
              onToggle={toggleAccordion}
            />
          </div>
        </div>
      </div>

      {/* Similar Offers */}
      <SimilarOffers
        offers={similarOffers}
        category={vendor.category}
        onToggleSave={toggleSimilarSave}
      />

      {/* Toast */}
      <Toast
        message={toast?.message ?? ""}
        undoAction={toast?.undo}
        visible={!!toast}
        onClose={() => setToast(null)}
      />
    </>
  );
}
