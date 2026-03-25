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
    <footer className="bg-warm-sand">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="w-6 h-6 text-primary" strokeWidth={2.5} />
          <span className="font-heading text-lg font-bold text-primary">
            Parentfits
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-[14px] text-muted-grey hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-body text-[13px] text-muted-grey text-center">
          &copy; {year} Parentfits. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
