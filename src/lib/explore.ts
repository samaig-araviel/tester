export type PageType = "online" | "in-person";

export interface ExploreVendor {
  id: string;
  name: string;
  logo_url: string | null;
  location_name: string | null;
  category: string | null;
  delivery_type: string | null;
  age_relevance: string | null;
  priority_weight: number | null;
  short_descriptor: string | null;
  offer_id: string;
  offer_headline: string;
  is_new: boolean;
  featured: boolean;
  is_saved: boolean;
  created_at: string;
}

export interface UserProfile {
  support_needs: string[];
  child_age_buckets: string[];
  is_expecting: boolean;
  identity_type: string | null;
  town: string | null;
  county: string | null;
}

export const CATEGORY_OPTIONS = [
  { key: "childcare", label: "Childcare & Nurseries", icon: "School" },
  { key: "pregnancy_postpartum", label: "Pregnancy & Postpartum", icon: "Heart" },
  { key: "home_support", label: "Home Support", icon: "Home" },
  { key: "baby_early_years", label: "Baby & Early Years", icon: "Baby" },
  { key: "after_school", label: "After-School & Tutoring", icon: "BookOpen" },
  { key: "wellbeing", label: "Wellbeing", icon: "Brain" },
] as const;

export const AGE_FILTER_OPTIONS = [
  { key: "expecting", label: "Expecting parents" },
  { key: "0-1", label: "New parents (0–1)" },
  { key: "2-4", label: "Toddlers (2–4)" },
  { key: "5-11", label: "Primary age (5–11)" },
  { key: "12+", label: "Teens (12+)" },
] as const;

export const SORT_OPTIONS_ONLINE = [
  { key: "recommended", label: "Recommended for you" },
  { key: "popular", label: "Most popular" },
  { key: "newest", label: "Newest" },
] as const;

export const SORT_OPTIONS_IN_PERSON = [
  { key: "recommended", label: "Recommended for you" },
  { key: "popular", label: "Most popular" },
  { key: "newest", label: "Newest" },
] as const;

export function recommendationScore(
  vendor: ExploreVendor,
  profile: UserProfile
): number {
  let score = 0;
  const cat = vendor.category ?? "";
  const ageRel = vendor.age_relevance ?? "";

  // Support needs match (highest weight)
  if (
    profile.support_needs.some((need) =>
      cat.toLowerCase().includes(need.toLowerCase())
    )
  ) {
    score += 100;
  }

  // Life stage boost
  if (
    profile.is_expecting &&
    (cat.toLowerCase().includes("pregnancy") ||
      cat.toLowerCase().includes("maternity") ||
      cat.toLowerCase().includes("postpartum"))
  ) {
    score += 50;
  }

  // Child age match
  if (
    profile.child_age_buckets.some((bucket) =>
      ageRel.toLowerCase().includes(bucket.toLowerCase())
    )
  ) {
    score += 30;
  }

  // Featured boost
  if (vendor.featured) {
    score += 20;
  }

  // Editorial priority
  score += vendor.priority_weight ?? 0;

  return score;
}
