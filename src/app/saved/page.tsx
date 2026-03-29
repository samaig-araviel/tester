import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavedPerksContent from "@/components/saved/SavedPerksContent";
import { getVendorFallbackImage } from "@/lib/vendor-images";

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch saved offers with offer + vendor data in a single joined query
  const { data: savedRows } = await supabase
    .from("saved_offers")
    .select(
      `
      id,
      offer_id,
      saved_at,
      offers (
        id,
        offer_headline,
        status,
        is_new,
        featured,
        vendor_id,
        vendors (
          name,
          logo_url,
          banner_url,
          category,
          delivery_type,
          location_name,
          active
        )
      )
    `
    )
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  type VendorData = {
    name: string;
    logo_url: string | null;
    banner_url: string | null;
    category: string | null;
    delivery_type: string | null;
    location_name: string | null;
    active: boolean;
  };

  type OfferData = {
    id: string;
    offer_headline: string;
    status: string;
    is_new: boolean;
    featured: boolean;
    vendor_id: string;
    vendors: VendorData | VendorData[] | null;
  };

  type SavedRow = {
    id: string;
    offer_id: string;
    saved_at: string;
    offers: OfferData | OfferData[] | null;
  };

  // Normalize and filter: only live offers with active vendors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const savedOffers = ((savedRows ?? []) as any[])
    .map((row: SavedRow) => {
      const offer = Array.isArray(row.offers)
        ? row.offers[0] ?? null
        : row.offers ?? null;
      if (!offer || offer.status !== "live") return null;

      const vendor = Array.isArray(offer.vendors)
        ? offer.vendors[0] ?? null
        : offer.vendors ?? null;
      if (!vendor || vendor.active === false) return null;

      const vendorName = vendor.name ?? "Unknown";
      const fallbackImage = getVendorFallbackImage(vendorName, vendor.category);
      return {
        offer_id: row.offer_id,
        saved_at: row.saved_at,
        vendor_name: vendorName,
        vendor_logo_url: vendor.logo_url ?? fallbackImage,
        cover_image_url: vendor.banner_url ?? fallbackImage,
        offer_headline: offer.offer_headline ?? "",
        delivery_type: vendor.delivery_type,
        category: vendor.category,
        is_new: offer.is_new ?? false,
      };
    })
    .filter(Boolean) as {
    offer_id: string;
    saved_at: string;
    vendor_name: string;
    vendor_logo_url: string | null;
    cover_image_url: string | null;
    offer_headline: string;
    delivery_type: string | null;
    category: string | null;
    is_new: boolean;
  }[];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <SavedPerksContent savedOffers={savedOffers} userId={user.id} />
      </main>

      <Footer />
    </div>
  );
}
