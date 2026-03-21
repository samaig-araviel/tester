import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfferDetailContent from "@/components/offer/OfferDetailContent";

interface PageProps {
  params: Promise<{ offerId: string }>;
}

export default async function OfferDetailPage({ params }: PageProps) {
  const { offerId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the offer with vendor data
  const { data: offerRaw } = await supabase
    .from("offers")
    .select(
      `
      id,
      offer_headline,
      status,
      featured,
      is_new,
      created_at,
      vendor_id,
      discount_code,
      vendors (
        name,
        logo_url,
        banner_url,
        category,
        delivery_type,
        short_descriptor,
        location_name,
        website_url,
        active
      )
    `
    )
    .eq("id", offerId)
    .eq("status", "LIVE")
    .single();

  if (!offerRaw) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offer = offerRaw as any;
  const vendor = Array.isArray(offer.vendors)
    ? offer.vendors[0] ?? null
    : offer.vendors ?? null;

  if (!vendor || vendor.active === false) {
    notFound();
  }

  // Determine online vs in-person
  const dt = (vendor.delivery_type ?? "").toLowerCase();
  const isOnline = dt.includes("online");

  // Check saved status
  const { data: savedRow } = await supabase
    .from("saved_offers")
    .select("offer_id")
    .eq("user_id", user.id)
    .eq("offer_id", offerId)
    .maybeSingle();

  const isSaved = !!savedRow;

  // Fetch similar offers (same category, exclude current)
  const { data: similarRaw } = await supabase
    .from("offers")
    .select(
      `
      id,
      offer_headline,
      is_new,
      created_at,
      vendor_id,
      vendors (
        name,
        logo_url,
        banner_url,
        category,
        delivery_type,
        active
      )
    `
    )
    .eq("status", "LIVE")
    .neq("id", offerId)
    .order("created_at", { ascending: false })
    .limit(20);

  // Fetch user's saved offers for similar
  const { data: savedRows } = await supabase
    .from("saved_offers")
    .select("offer_id")
    .eq("user_id", user.id);

  const savedIds = new Set(
    (savedRows ?? []).map((r: { offer_id: string }) => r.offer_id)
  );

  // Filter similar by category, map to UI format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const similarOffers = ((similarRaw ?? []) as any[])
    .map((o) => {
      const v = Array.isArray(o.vendors)
        ? o.vendors[0] ?? null
        : o.vendors ?? null;
      if (!v || v.active === false) return null;
      return {
        id: o.id,
        vendor_name: v.name ?? "Unknown",
        vendor_logo_url: v.logo_url ?? null,
        banner_url: v.banner_url ?? null,
        offer_headline: o.offer_headline ?? "",
        is_new: o.is_new ?? false,
        is_saved: savedIds.has(o.id),
        delivery_type: v.delivery_type ?? null,
        category: v.category ?? null,
      };
    })
    .filter((o): o is NonNullable<typeof o> => o !== null)
    .filter(
      (o) =>
        vendor.category &&
        o.category?.toLowerCase() === vendor.category.toLowerCase()
    )
    .slice(0, 12) as {
    id: string;
    vendor_name: string;
    vendor_logo_url: string | null;
    banner_url: string | null;
    offer_headline: string;
    is_new: boolean;
    is_saved: boolean;
    delivery_type: string | null;
  }[];

  // If fewer than 4 same-category, backfill from other categories
  if (similarOffers.length < 4) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const backfill = ((similarRaw ?? []) as any[])
      .map((o) => {
        const v = Array.isArray(o.vendors)
          ? o.vendors[0] ?? null
          : o.vendors ?? null;
        if (!v || v.active === false) return null;
        return {
          id: o.id,
          vendor_name: v.name ?? "Unknown",
          vendor_logo_url: v.logo_url ?? null,
          banner_url: v.banner_url ?? null,
          offer_headline: o.offer_headline ?? "",
          is_new: o.is_new ?? false,
          is_saved: savedIds.has(o.id),
          delivery_type: v.delivery_type ?? null,
          category: v.category ?? null,
        };
      })
      .filter((o): o is NonNullable<typeof o> => o !== null)
      .filter(
        (o) =>
          !similarOffers.some((s) => s.id === o.id)
      )
      .slice(0, 12 - similarOffers.length) as typeof similarOffers;

    similarOffers.push(...backfill);
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <OfferDetailContent
          offerId={offerId}
          offerHeadline={offer.offer_headline ?? ""}
          discountCode={offer.discount_code ?? null}
          vendor={{
            name: vendor.name ?? "Unknown",
            logo_url: vendor.logo_url ?? null,
            banner_url: vendor.banner_url ?? null,
            category: vendor.category ?? null,
            delivery_type: vendor.delivery_type ?? null,
            short_descriptor: vendor.short_descriptor ?? null,
            location_name: vendor.location_name ?? null,
            website_url: vendor.website_url ?? null,
          }}
          isOnline={isOnline}
          isSaved={isSaved}
          userId={user.id}
          similarOffers={similarOffers}
        />
      </main>
      <Footer />
    </div>
  );
}
