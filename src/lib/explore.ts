export type PageType = "online" | "in-person";

export interface ExploreVendor {
  id: string;
  name: string;
  logo_url: string | null;
  cover_image_url: string | null;
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

export const MOCK_ONLINE_VENDORS: ExploreVendor[] = [
  {
    id: "mock-kidly",
    name: "Kidly",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop",
    location_name: null,
    category: "baby_early_years",
    delivery_type: "online",
    age_relevance: "0-1,2-4",
    priority_weight: 90,
    short_descriptor: "Curated baby & toddler essentials",
    offer_id: "mock-kidly-offer",
    offer_headline: "15% off first order",
    is_new: true,
    featured: true,
    is_saved: false,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "mock-jojo",
    name: "JoJo Maman Bébé",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop",
    location_name: null,
    category: "baby_early_years",
    delivery_type: "online",
    age_relevance: "expecting,0-1,2-4",
    priority_weight: 85,
    short_descriptor: "Award-winning maternity & baby clothing",
    offer_id: "mock-jojo-offer",
    offer_headline: "20% off selected lines",
    is_new: false,
    featured: true,
    is_saved: false,
    created_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "mock-tinyhearts",
    name: "Tiny Hearts Education",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop",
    location_name: null,
    category: "wellbeing",
    delivery_type: "online",
    age_relevance: "0-1,2-4",
    priority_weight: 80,
    short_descriptor: "Online first aid courses for parents",
    offer_id: "mock-tinyhearts-offer",
    offer_headline: "Free baby first aid class",
    is_new: true,
    featured: false,
    is_saved: false,
    created_at: "2026-03-05T00:00:00Z",
  },
  {
    id: "mock-kiddyum",
    name: "Kiddyum",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop",
    location_name: null,
    category: "baby_early_years",
    delivery_type: "online",
    age_relevance: "0-1,2-4,5-11",
    priority_weight: 75,
    short_descriptor: "Healthy frozen meals for kids",
    offer_id: "mock-kiddyum-offer",
    offer_headline: "Buy 2 get 1 free",
    is_new: false,
    featured: false,
    is_saved: false,
    created_at: "2026-02-10T00:00:00Z",
  },
  {
    id: "mock-happity",
    name: "Happity",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&h=400&fit=crop",
    location_name: null,
    category: "childcare",
    delivery_type: "online",
    age_relevance: "0-1,2-4",
    priority_weight: 70,
    short_descriptor: "Find baby & toddler classes near you",
    offer_id: "mock-happity-offer",
    offer_headline: "1 month free trial",
    is_new: true,
    featured: true,
    is_saved: false,
    created_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "mock-mybabiie",
    name: "My Babiie",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    location_name: null,
    category: "baby_early_years",
    delivery_type: "online",
    age_relevance: "expecting,0-1",
    priority_weight: 65,
    short_descriptor: "Stylish pushchairs, highchairs & more",
    offer_id: "mock-mybabiie-offer",
    offer_headline: "10% off all pushchairs",
    is_new: false,
    featured: true,
    is_saved: false,
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "mock-elvie",
    name: "Elvie",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop",
    location_name: null,
    category: "pregnancy_postpartum",
    delivery_type: "online",
    age_relevance: "expecting,0-1",
    priority_weight: 82,
    short_descriptor: "Smart technology for new mums",
    offer_id: "mock-elvie-offer",
    offer_headline: "£30 off Elvie Pump",
    is_new: false,
    featured: true,
    is_saved: false,
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "mock-koru-kids",
    name: "Koru Kids",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&h=400&fit=crop",
    location_name: null,
    category: "childcare",
    delivery_type: "online",
    age_relevance: "0-1,2-4,5-11",
    priority_weight: 78,
    short_descriptor: "Vetted after-school nannies",
    offer_id: "mock-korukids-offer",
    offer_headline: "First week free",
    is_new: true,
    featured: false,
    is_saved: false,
    created_at: "2026-03-08T00:00:00Z",
  },
  {
    id: "mock-bloom-wild",
    name: "Bloom & Wild",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop",
    location_name: null,
    category: "home_support",
    delivery_type: "online",
    age_relevance: "expecting,0-1,2-4,5-11,12+",
    priority_weight: 60,
    short_descriptor: "Letterbox flowers delivered to your door",
    offer_id: "mock-bloomwild-offer",
    offer_headline: "25% off your first bouquet",
    is_new: false,
    featured: false,
    is_saved: false,
    created_at: "2026-01-25T00:00:00Z",
  },
  {
    id: "mock-tutorful",
    name: "Tutorful",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    location_name: null,
    category: "after_school",
    delivery_type: "online",
    age_relevance: "5-11,12+",
    priority_weight: 72,
    short_descriptor: "Expert online tutors for every subject",
    offer_id: "mock-tutorful-offer",
    offer_headline: "Free introductory session",
    is_new: false,
    featured: true,
    is_saved: false,
    created_at: "2026-02-15T00:00:00Z",
  },
  {
    id: "mock-mindful-mums",
    name: "The Mindful Mums Club",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    location_name: null,
    category: "wellbeing",
    delivery_type: "online",
    age_relevance: "expecting,0-1,2-4",
    priority_weight: 68,
    short_descriptor: "Wellbeing workshops for parents",
    offer_id: "mock-mindfulmums-offer",
    offer_headline: "7-day free trial",
    is_new: true,
    featured: false,
    is_saved: false,
    created_at: "2026-03-12T00:00:00Z",
  },
  {
    id: "mock-natural-baby",
    name: "Natural Baby Shower",
    logo_url: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop",
    location_name: null,
    category: "baby_early_years",
    delivery_type: "online",
    age_relevance: "expecting,0-1",
    priority_weight: 74,
    short_descriptor: "Eco-friendly baby gifts & essentials",
    offer_id: "mock-naturalbabyshower-offer",
    offer_headline: "Free gift with orders over £50",
    is_new: false,
    featured: false,
    is_saved: false,
    created_at: "2026-02-05T00:00:00Z",
  },
];

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
