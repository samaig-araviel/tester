import { Leaf } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "FAQs", href: "/support#faq" },
  { label: "About", href: "/support#about" },
  { label: "How it works", href: "/support#how-it-works" },
  { label: "Data protection", href: "/support#data-protection" },
  { label: "Safeguarding", href: "/support#safeguarding" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        {/* Logo + Links row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
            <span className="font-heading text-lg font-bold text-white">
              Parentfits
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-[14px] text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="font-body text-[13px] text-white/50 text-center">
          &copy; {year} Parentfits. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
