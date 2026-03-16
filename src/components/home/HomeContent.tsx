"use client";

import { useState, useCallback } from "react";
import HeroBanner from "./HeroBanner";
import RecommendedSection from "./RecommendedSection";
import NewFeaturedSection from "./NewFeaturedSection";
import FavouritesSection from "./FavouritesSection";
import ExploreBlock from "./ExploreBlock";
import Toast from "./Toast";
import { createClient } from "@/lib/supabase/client";

interface OfferWithVendor {
  id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
  banner_url: string | null;
  offer_headline: string;
  is_new: boolean;
  is_saved: boolean;
}

interface SavedVendor {
  id: string;
  offer_id: string;
  vendor_name: string;
  vendor_logo_url: string | null;
}

interface HomeContentProps {
  firstName: string;
  isReturning: boolean;
  onboardingCompleted: boolean;
  recommendedOffers: OfferWithVendor[];
  newFeaturedOffers: OfferWithVendor[];
  savedVendors: SavedVendor[];
  userId: string;
}

export default function HomeContent({
  firstName,
  isReturning,
  onboardingCompleted,
  recommendedOffers: initialRecommended,
  newFeaturedOffers: initialNewFeatured,
  savedVendors: initialSaved,
  userId,
}: HomeContentProps) {
  const [recommendedOffers, setRecommendedOffers] = useState(initialRecommended);
  const [newFeaturedOffers, setNewFeaturedOffers] = useState(initialNewFeatured);
  const [savedVendors, setSavedVendors] = useState(initialSaved);
  const [toast, setToast] = useState<{
    message: string;
    undo?: () => void;
  } | null>(null);

  const toggleSave = useCallback(
    async (offerId: string) => {
      const supabase = createClient();

      // Check if already saved
      const isSaved = recommendedOffers.find((o) => o.id === offerId)?.is_saved ??
        newFeaturedOffers.find((o) => o.id === offerId)?.is_saved ??
        false;

      // Optimistic update
      const updateOffers = (offers: OfferWithVendor[]) =>
        offers.map((o) =>
          o.id === offerId ? { ...o, is_saved: !isSaved } : o
        );

      setRecommendedOffers(updateOffers);
      setNewFeaturedOffers(updateOffers);

      if (isSaved) {
        // Remove from saved
        const { error } = await supabase
          .from("saved_offers")
          .delete()
          .eq("user_id", userId)
          .eq("offer_id", offerId);

        if (!error) {
          setSavedVendors((prev) => prev.filter((v) => v.offer_id !== offerId));
          setToast({
            message: "Removed from favourites",
            undo: () => toggleSave(offerId),
          });
        }
      } else {
        // Add to saved
        const { error } = await supabase
          .from("saved_offers")
          .insert({ user_id: userId, offer_id: offerId });

        if (!error) {
          // Find the offer to add to favourites
          const offer =
            recommendedOffers.find((o) => o.id === offerId) ??
            newFeaturedOffers.find((o) => o.id === offerId);

          if (offer) {
            setSavedVendors((prev) => [
              {
                id: `saved-${offerId}`,
                offer_id: offerId,
                vendor_name: offer.vendor_name,
                vendor_logo_url: offer.vendor_logo_url,
              },
              ...prev,
            ]);
          }
          setToast({
            message: "Saved to favourites",
            undo: () => toggleSave(offerId),
          });
        }
      }
    },
    [recommendedOffers, newFeaturedOffers, userId]
  );

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner firstName={firstName} isReturning={isReturning} />

      {/* Recommended for You */}
      <div className="mt-12">
        <RecommendedSection
          offers={recommendedOffers}
          onboardingCompleted={onboardingCompleted}
          onToggleSave={toggleSave}
        />
      </div>

      {/* New & Featured */}
      <div className="mt-12">
        <NewFeaturedSection
          offers={newFeaturedOffers}
          onToggleSave={toggleSave}
        />
      </div>

      {/* Favourites */}
      <div className="mt-12">
        <FavouritesSection savedVendors={savedVendors} />
      </div>

      {/* Explore Online Services */}
      <div className="mt-12">
        <ExploreBlock
          direction="image-right"
          pillText="Online services"
          heading="Explore online services"
          body="Access online brands and services offering exclusive benefits for working parents, from baby essentials and wellbeing to learning and family support."
          ctaText="Browse our partners"
          ctaHref="/explore/online"
          imageSrc={null}
          imageAlt="Parent browsing online on a laptop"
        />
      </div>

      {/* Explore In-Person Services */}
      <div className="mt-12">
        <ExploreBlock
          direction="image-left"
          pillText="In-person services"
          heading="Explore in-person services"
          body="Discover local and in-person services near you, including childcare, classes, wellbeing services, and family support."
          ctaText="Find out more"
          ctaHref="/explore/in-person"
          imageSrc={null}
          imageAlt="Parent visiting a local childcare centre"
        />
      </div>

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
