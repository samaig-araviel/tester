import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileContent from "@/components/profile/ProfileContent";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch full user profile
  const { data: profile } = await supabase
    .from("users")
    .select(
      "first_name, last_name, email, country, identity_type, child_count, child_age_buckets, is_expecting, town, support_needs, employment_type, work_location, working_pattern, share_data, marketing_opt_in, avatar_url, employer_id, onboarding_completed"
    )
    .eq("id", user.id)
    .single();

  // Fetch employer name if employer_id exists
  let employerName: string | null = null;
  if (profile?.employer_id) {
    const { data: employer } = await supabase
      .from("employers")
      .select("name")
      .eq("id", profile.employer_id)
      .single();
    employerName = employer?.name ?? null;
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <ProfileContent
          profile={{
            first_name: profile?.first_name ?? "",
            last_name: profile?.last_name ?? "",
            email: profile?.email ?? user.email ?? "",
            country: profile?.country ?? "",
            identity_type: profile?.identity_type ?? null,
            child_count: profile?.child_count ?? "0",
            child_age_buckets: profile?.child_age_buckets ?? [],
            is_expecting: profile?.is_expecting ?? false,
            town: profile?.town ?? "",
            employment_type: profile?.employment_type ?? "",
            work_location: profile?.work_location ?? "",
            working_pattern: profile?.working_pattern ?? "",
            share_data: profile?.share_data ?? false,
            marketing_opt_in: profile?.marketing_opt_in ?? false,
            avatar_url: profile?.avatar_url ?? null,
            onboarding_completed: profile?.onboarding_completed ?? false,
          }}
          employerName={employerName}
        />
      </main>

      <Footer />
    </div>
  );
}
