/**
 * Provides fallback Unsplash banner images for vendors whose
 * banner_url / logo_url columns in the database are null.
 *
 * Images are curated, family-friendly, and thematically matched
 * to each vendor's service area. Unsplash is already configured
 * as a remote image source in next.config.ts.
 */

const VENDOR_BANNER_MAP: Record<string, string> = {
  // ── Childcare & Nurseries ────────────────────────────────
  "bright horizons":
    "https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=600&h=400&fit=crop",
  "busy bees":
    "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=400&fit=crop",
  "tinies":
    "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&h=400&fit=crop",
  "tinies childcare":
    "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&h=400&fit=crop",
  "koru kids":
    "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&h=400&fit=crop",
  "n family club":
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
  "kidsunlimited":
    "https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&h=400&fit=crop",
  "happity":
    "https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&h=400&fit=crop",

  // ── Education & Tutoring ─────────────────────────────────
  "kumon":
    "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop",
  "explore learning":
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
  "sensational tutors":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  "premier education":
    "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&h=400&fit=crop",
  "tutorful":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  "kidstart":
    "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&h=400&fit=crop",

  // ── Baby & Early Years ───────────────────────────────────
  "kidly":
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop",
  "jojo maman bébé":
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop",
  "kiddyum":
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop",
  "my babiie":
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  "natural baby shower":
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop",
  "little tikes":
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop",
  "babybj\u00f6rn":
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop",
  "baby sensory":
    "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&h=400&fit=crop",
  "etta loves":
    "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&h=400&fit=crop",

  // ── Pregnancy & Postpartum ───────────────────────────────
  "elvie":
    "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop",
  "mama mio":
    "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&h=400&fit=crop",
  "hatch":
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop",
  "doula uk":
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=400&fit=crop",
  "nct":
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
  "vitabiotics":
    "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop",

  // ── Wellness & Nutrition ─────────────────────────────────
  "tiny hearts education":
    "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop",
  "the mindful mums club":
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  "calm":
    "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&h=400&fit=crop",
  "headspace":
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
  "wild nutrition":
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",

  // ── Food & Meal Services ─────────────────────────────────
  "hellofresh":
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
  "gousto":
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  "little dish":
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",

  // ── Family & Home Support ────────────────────────────────
  "bloom & wild":
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop",
  "bloom & blossom":
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop",
  "the white company":
    "https://images.unsplash.com/photo-1565843248736-8c41e6db117b?w=600&h=400&fit=crop",
  "home-start":
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop",
  "care.com":
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&h=400&fit=crop",
  "sitters":
    "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&h=400&fit=crop",

  // ── Community & Social ───────────────────────────────────
  "mumsnet":
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
  "peanut":
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop",
  "dadpad":
    "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&h=400&fit=crop",

  // ── Activities ───────────────────────────────────────────
  "classpass":
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  "gymboree":
    "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&h=400&fit=crop",
  "monkey music":
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop",
  "podcastone parenting":
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
};

/** Category-level fallbacks when vendor name is not in the map. */
const CATEGORY_FALLBACK_MAP: Record<string, string> = {
  childcare:
    "https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&h=400&fit=crop",
  education:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  after_school:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
  baby:
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop",
  early_years:
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop",
  pregnancy:
    "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop",
  postpartum:
    "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop",
  wellbeing:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  nutrition:
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
  home_support:
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop",
};

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&h=400&fit=crop";

/**
 * Returns a fallback banner image URL for a vendor when the database
 * value is null. Tries exact name match first, then partial match,
 * then category-based fallback, then a generic family image.
 */
export function getVendorFallbackImage(
  vendorName: string,
  category?: string | null
): string {
  const key = vendorName.toLowerCase().trim();

  // Exact match
  if (VENDOR_BANNER_MAP[key]) return VENDOR_BANNER_MAP[key];

  // Partial match (handles "Tinies Childcare" matching "tinies", etc.)
  for (const [mapKey, url] of Object.entries(VENDOR_BANNER_MAP)) {
    if (key.includes(mapKey) || mapKey.includes(key)) return url;
  }

  // Category-based fallback
  if (category) {
    const catLower = category.toLowerCase();
    for (const [catKey, url] of Object.entries(CATEGORY_FALLBACK_MAP)) {
      if (catLower.includes(catKey)) return url;
    }
  }

  return DEFAULT_BANNER;
}
