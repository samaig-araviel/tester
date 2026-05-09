import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParentalLeaveRegistration from "@/components/registration/ParentalLeaveRegistration";
import { getCoaches } from "@/lib/coaches";

export const metadata = {
  title: "Register your parental leave | Parentfits",
  description:
    "Register your maternity, paternity, shared or adoption leave and use your employer-funded coaching session.",
};

export default async function RegisterLeavePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const coaches = await getCoaches();

  return (
    <div className="min-h-screen bg-onboarding-bg">
      <Navbar />
      <main>
        <ParentalLeaveRegistration coaches={coaches} />
      </main>
      <Footer />
    </div>
  );
}
