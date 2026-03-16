import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingWizard from "./OnboardingWizard";
import type { OnboardingData } from "@/lib/onboarding";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("identity_type, child_count, is_expecting, child_age_buckets, town, county, support_needs, onboarding_completed")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_completed) {
    redirect("/dashboard");
  }

  const initialData: OnboardingData = {
    identity_type: profile?.identity_type ?? null,
    child_count: profile?.child_count ?? null,
    is_expecting: profile?.is_expecting ?? false,
    child_age_buckets: profile?.child_age_buckets ?? null,
    town: profile?.town ?? null,
    county: profile?.county ?? null,
    support_needs: profile?.support_needs ?? null,
    onboarding_completed: profile?.onboarding_completed ?? false,
  };

  return <OnboardingWizard initialData={initialData} />;
}
