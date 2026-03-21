import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportContent from "@/components/support/SupportContent";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-10 lg:px-20">
        <SupportContent />
      </main>
      <Footer />
    </div>
  );
}
