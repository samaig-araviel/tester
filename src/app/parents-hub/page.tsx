import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParentsHubContent from "@/components/hub/ParentsHubContent";
import {
  ARTICLES,
  PODCASTS,
  MONEY_ARTICLES,
  EXTERNAL_RESOURCES,
  personalizeRecommended,
} from "@/lib/hub-data";

export default async function ParentsHubPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile for personalisation
  const { data: profile } = await supabase
    .from("users")
    .select("identity_type, child_age_buckets, support_needs")
    .eq("id", user.id)
    .single();

  const userProfile = {
    identity_type: profile?.identity_type ?? null,
    child_age_buckets: profile?.child_age_buckets ?? [],
    support_needs: profile?.support_needs ?? [],
  };

  const recommendedArticles = personalizeRecommended(ARTICLES, userProfile);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <ParentsHubContent
          recommendedArticles={recommendedArticles}
          allArticles={ARTICLES}
          podcasts={PODCASTS}
          moneyArticles={MONEY_ARTICLES}
          externalResources={EXTERNAL_RESOURCES}
        />
      </main>
      <Footer />
    </div>
  );
}
