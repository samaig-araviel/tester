import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreContent from "@/components/explore/ExploreContent";
import { type ExploreVendor, type UserProfile, MOCK_ONLINE_VENDORS } from "@/lib/explore";
import { getVendorFallbackImage } from "@/lib/vendor-images";

export default async function ExploreOnlinePage() {
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
      "support_needs, child_age_buckets, is_expecting, identity_type, postcode"
    )
    .eq("id", user.id)
    .single();

  const userProfile: UserProfile = {
    support_needs: profile?.support_needs ?? [],
    child_age_buckets: profile?.child_age_buckets ?? [],
    is_expecting: profile?.is_expecting ?? false,
    identity_type: profile?.identity_type ?? null,
    postcode: profile?.postcode ?? null,
  };

  // Fetch saved offer IDs
  const { data: savedRows } = await supabase
    .from("saved_offers")
    .select("offer_id")
    .eq("user_id", user.id);

  const savedIds = new Set(
    (savedRows ?? []).map((r: { offer_id: string }) => r.offer_id)
  );

  // Fetch live offers with vendor data
  const { data: offersRaw } = await supabase
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
      vendors (
        name,
        logo_url,
        banner_url,
        category,
        delivery_type,
        age_relevance,
        priority_weight,
        short_descriptor,
        location_name,
        active
      )
    `
    )
    .eq("status", "LIVE")
    .order("created_at", { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendors: ExploreVendor[] = ((offersRaw ?? []) as any[])
    .map((o) => {
      const v = Array.isArray(o.vendors)
        ? o.vendors[0] ?? null
        : o.vendors ?? null;
      if (!v || v.active === false) return null;
      // Filter for online delivery type
      const dt = (v.delivery_type ?? "").toLowerCase();
      if (!dt.includes("online")) return null;
      const vendorName = v.name ?? "Unknown";
      const fallbackImage = getVendorFallbackImage(vendorName, v.category);
      return {
        id: v.name + "-" + o.id,
        name: vendorName,
        logo_url: v.logo_url ?? fallbackImage,
        cover_image_url: null,
        banner_url: v.banner_url ?? fallbackImage,
        location_name: v.location_name ?? null,
        category: v.category ?? null,
        delivery_type: v.delivery_type ?? null,
        age_relevance: v.age_relevance ?? null,
        priority_weight: v.priority_weight ?? null,
        short_descriptor: v.short_descriptor ?? null,
        offer_id: o.id,
        offer_headline: o.offer_headline ?? "",
        is_new: o.is_new ?? false,
        featured: o.featured ?? false,
        is_saved: savedIds.has(o.id),
        created_at: o.created_at,
      } satisfies ExploreVendor;
    })
    .filter(Boolean) as ExploreVendor[];

  // Fall back to mock vendors when the database has no online offers
  const displayVendors = vendors.length > 0 ? vendors : MOCK_ONLINE_VENDORS;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <ExploreContent
          pageType="online"
          vendors={displayVendors}
          userProfile={userProfile}
          userId={user.id}
        />
      </main>
      <Footer />
    </div>
  );
}
