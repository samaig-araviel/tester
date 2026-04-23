import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourcesContent from "@/components/resources/ResourcesContent";

export const metadata = {
  title: "Resources | Parentfits",
  description:
    "Toolkits, calculators and resources to support you through pregnancy, parental leave and returning to work.",
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <ResourcesContent />
      </main>
      <Footer />
    </div>
  );
}
