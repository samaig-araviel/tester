import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const firstName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.user_metadata?.name?.split(" ")[0] ??
    "there";

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome section */}
        <section className="mb-10">
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
            Welcome back, {firstName}
          </h1>
          <p className="font-body text-text-secondary">
            Explore benefits that work for your family.
          </p>
        </section>

        {/* Quick-start cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <QuickCard
            icon={<Heart className="w-5 h-5 text-primary" />}
            title="Family Benefits"
            description="Browse employer-enabled benefits tailored for working parents."
          />
          <QuickCard
            icon={<Sparkles className="w-5 h-5 text-primary" />}
            title="Recommendations"
            description="Get personalised recommendations based on your family profile."
          />
          <QuickCard
            icon={<ArrowRight className="w-5 h-5 text-primary" />}
            title="Getting Started"
            description="Complete your profile to unlock the full Parentfits experience."
          />
        </section>
      </main>
    </div>
  );
}

function QuickCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer group">
      <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-text-primary mb-1.5 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="font-body text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
