import Link from "next/link";
import { Leaf } from "lucide-react";

interface FooterLinkGroup {
  heading: string;
  links: { label: string; href: string }[];
}

const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Parents Hub", href: "/parents-hub" },
      { label: "Resources", href: "/resources" },
      { label: "Maternity Calculator", href: "/parents-hub/maternity-calculator" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Shop online", href: "/explore/online" },
      { label: "Shop in-person", href: "/explore/in-person" },
      { label: "Saved perks", href: "/saved" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQs", href: "/support#faq" },
      { label: "About", href: "/support#about" },
      { label: "How it works", href: "/support#how-it-works" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-black/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-16 mb-16">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2"
              aria-label="Parentfits home"
            >
              <Leaf className="w-8 h-8 text-[#2A2A2A]" strokeWidth={2.5} />
              <span className="font-heading text-[2.5rem] leading-none font-bold tracking-[-1px] text-[#2A2A2A]">
                Parentfits
              </span>
            </Link>
            <p className="font-body text-[#666] leading-[1.8] mt-6 max-w-md">
              Supporting working parents with clarity, care, and comprehensive
              benefits guidance.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.heading}>
              <h4 className="font-body text-[0.85rem] uppercase tracking-[2px] text-[#2A2A2A] mb-6">
                {group.heading}
              </h4>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href} className="mb-3 last:mb-0">
                    <Link
                      href={link.href}
                      className="font-body text-[0.9rem] text-[#666] hover:text-[#C96846] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-black/10 text-center">
          <p className="font-body text-[0.85rem] uppercase tracking-[2px] text-[#999]">
            &copy; {year} Parentfits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
