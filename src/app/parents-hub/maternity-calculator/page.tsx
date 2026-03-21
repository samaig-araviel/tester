import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaternityCalculator from "@/components/calculator/MaternityCalculator";

export const metadata = {
  title: "Maternity Pay Calculator | Parentfits",
  description:
    "Estimate your maternity pay week by week, based on your salary and employer policy.",
};

export default async function MaternityCalculatorPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-onboarding-bg">
      <Navbar />
      <main>
        <MaternityCalculator />
      </main>
      <Footer />
    </div>
  );
}
