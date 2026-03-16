export interface OnboardingData {
  identity_type: string | null;
  child_count: string | null;
  is_expecting: boolean;
  child_age_buckets: string[] | null;
  town: string | null;
  county: string | null;
  support_needs: string[] | null;
  onboarding_completed: boolean;
}

export const IDENTITY_OPTIONS = [
  { key: "parent", label: "Parent", icon: "👤" },
  { key: "expectant_parent", label: "Expectant parent", icon: "🤰" },
  { key: "prefer_not_to_say", label: "Prefer not to say", icon: "—" },
] as const;

export const CHILD_COUNT_OPTIONS = ["1", "2", "3", "4", "5+"] as const;

export const AGE_BUCKET_OPTIONS = [
  { key: "expecting", label: "Expecting" },
  { key: "0-1", label: "0–1" },
  { key: "2-4", label: "2–4" },
  { key: "5-11", label: "5–11" },
  { key: "12+", label: "12+" },
] as const;

export const SUPPORT_NEED_OPTIONS = [
  { key: "childcare", label: "Childcare & nurseries", icon: "School" },
  { key: "pregnancy_postpartum", label: "Pregnancy & postpartum support", icon: "Heart" },
  { key: "home_support", label: "Home support", icon: "Home" },
  { key: "baby_early_years", label: "Baby & early years", icon: "Baby" },
  { key: "after_school", label: "After-school & tutoring", icon: "BookOpen" },
  { key: "wellbeing", label: "Wellbeing & mental health", icon: "Brain" },
] as const;

export const STEP_LABELS = [
  "About You",
  "Children",
  "Ages",
  "Location",
  "Your Needs",
  "Review",
  "Done",
] as const;

export const SUPPORT_NEED_DISPLAY: Record<string, string> = {
  childcare: "Childcare & nurseries",
  pregnancy_postpartum: "Pregnancy & postpartum support",
  home_support: "Home support",
  baby_early_years: "Baby & early years",
  after_school: "After-school & tutoring",
  wellbeing: "Wellbeing & mental health",
};

export const IDENTITY_DISPLAY: Record<string, string> = {
  parent: "Parent",
  expectant_parent: "Expectant parent",
  prefer_not_to_say: "Prefer not to say",
};
