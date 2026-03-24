import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/home/HomeContent";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("users")
    .select(
      "first_name, identity_type, child_age_buckets, postcode, support_needs, onboarding_completed, last_login, is_expecting"
    )
    .eq("id", user.id)
    .single();

  const firstName =
    profile?.first_name ??
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.user_metadata?.name?.split(" ")[0] ??
    "there";

  const onboardingCompleted = profile?.onboarding_completed ?? false;
  const isReturning = !!profile?.last_login;

  // Fetch saved offer IDs for current user
  const { data: savedOfferRows } = await supabase
    .from("saved_offers")
    .select("offer_id, saved_at")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  const savedOfferIds = new Set(
    (savedOfferRows ?? []).map((r: { offer_id: string }) => r.offer_id)
  );

  // Fetch active offers with vendor data
  const { data: offersRaw } = await supabase
    .from("offers")
    .select(
      `
      id,
      offer_headline,
      status,
      featured,
      featured_order,
      is_new,
      created_at,
      vendor_id,
      vendors (
        name,
        logo_url,
        banner_url,
        category,
        delivery_type,
        age_relevance,
        short_descriptor,
        service_radius_km,
        location_name,
        active
      )
    `
    )
    .eq("status", "LIVE")
    .order("created_at", { ascending: false });

  type VendorData = {
    name: string;
    logo_url: string | null;
    banner_url: string | null;
    category: string | null;
    delivery_type: string | null;
    age_relevance: string[] | null;
    short_descriptor: string | null;
    service_radius_km: number | null;
    location_name: string | null;
    active: boolean;
  };

  type OfferRow = {
    id: string;
    offer_headline: string;
    status: string;
    featured: boolean;
    featured_order: number | null;
    is_new: boolean;
    created_at: string;
    vendor_id: string;
    vendors: VendorData | null;
  };

  // Supabase may return vendors as array or object depending on relation type
  // Normalize to a single vendor object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offers: OfferRow[] = ((offersRaw ?? []) as any[])
    .map((o) => ({
      ...o,
      vendors: Array.isArray(o.vendors) ? o.vendors[0] ?? null : o.vendors ?? null,
    }))
    .filter((o) => o.vendors?.active !== false);

  // Map offers to UI format
  function mapOffer(o: OfferRow) {
    return {
      id: o.id,
      vendor_name: o.vendors?.name ?? "Unknown",
      vendor_logo_url: o.vendors?.logo_url ?? null,
      banner_url: o.vendors?.banner_url ?? null,
      offer_headline: o.offer_headline ?? "",
      is_new: o.is_new ?? false,
      is_saved: savedOfferIds.has(o.id),
      category: o.vendors?.category ?? null,
      delivery_type: o.vendors?.delivery_type ?? null,
      short_descriptor: o.vendors?.short_descriptor ?? null,
      age_relevance: o.vendors?.age_relevance ?? null,
    };
  }

  // ─── Recommended offers ───
  // Rank by: support_needs match > life stage > child age > fallback to featured
  const userNeeds: string[] = profile?.support_needs ?? [];
  const userAgeBuckets: string[] = profile?.child_age_buckets ?? [];
  const isExpecting = profile?.is_expecting ?? false;

  function recommendationScore(o: OfferRow): number {
    let score = 0;
    const cat = o.vendors?.category ?? "";
    const ageRel: string[] = o.vendors?.age_relevance ?? [];
    const ageRelJoined = ageRel.join(" ").toLowerCase();

    // Support needs match (highest weight)
    if (userNeeds.some((need) => cat.toLowerCase().includes(need.toLowerCase()))) {
      score += 100;
    }

    // Life stage boost
    if (isExpecting && (cat.toLowerCase().includes("pregnancy") || cat.toLowerCase().includes("maternity") || cat.toLowerCase().includes("postpartum"))) {
      score += 50;
    }

    // Child age match
    if (userAgeBuckets.some((bucket) => ageRelJoined.includes(bucket.toLowerCase()))) {
      score += 30;
    }

    // Featured boost
    if (o.featured) {
      score += 20;
    }

    return score;
  }

  const recommendedOffers = onboardingCompleted
    ? [...offers]
        .sort((a, b) => recommendationScore(b) - recommendationScore(a))
        .slice(0, 12)
        .map(mapOffer)
    : [];

  // ─── New & Featured ───
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  let newFeaturedOffers = offers
    .filter(
      (o) =>
        o.is_new ||
        o.featured ||
        new Date(o.created_at) >= thirtyDaysAgo
    )
    .sort((a, b) => {
      // Featured first, then by recency
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 12)
    .map(mapOffer);

  // Fallback to 90 days if fewer than 6
  if (newFeaturedOffers.length < 6) {
    newFeaturedOffers = offers
      .filter(
        (o) =>
          o.is_new ||
          o.featured ||
          new Date(o.created_at) >= ninetyDaysAgo
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 12)
      .map(mapOffer);
  }

  // ─── Saved vendors (favourites) ───
  const savedVendors = (savedOfferRows ?? [])
    .map((row: { offer_id: string; saved_at: string }) => {
      const offer = offers.find((o) => o.id === row.offer_id);
      if (!offer) return null;
      return {
        id: `saved-${row.offer_id}`,
        offer_id: row.offer_id,
        vendor_name: offer.vendors?.name ?? "Unknown",
        vendor_logo_url: offer.vendors?.logo_url ?? null,
      };
    })
    .filter(Boolean) as {
    id: string;
    offer_id: string;
    vendor_name: string;
    vendor_logo_url: string | null;
  }[];

  // Update last_login for returning visit detection
  await supabase
    .from("users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", user.id);

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 pt-10 pb-0">
        <HomeContent
          firstName={firstName}
          isReturning={isReturning}
          onboardingCompleted={onboardingCompleted}
          recommendedOffers={recommendedOffers}
          newFeaturedOffers={newFeaturedOffers}
          savedVendors={savedVendors}
          userId={user.id}
        />
      </main>

      <Footer />
    </div>
  );
}
