"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const NAV_ITEMS = [
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "about", label: "About" },
  { id: "how-it-works", label: "How it works" },
  { id: "data-protection", label: "Data protection" },
  { id: "safeguarding", label: "Safeguarding" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

export default function SupportContent() {
  const [activeSection, setActiveSection] = useState<SectionId>("faq");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isClickNav = useRef(false);

  // Handle hash on initial load
  useEffect(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    if (hash && NAV_ITEMS.some((n) => n.id === hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickNav.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveSection(id);
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    for (const item of NAV_ITEMS) {
      const el = sectionRefs.current[item.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((id: SectionId) => {
    setActiveSection(id);
    window.history.replaceState(null, "", `#${id}`);
    isClickNav.current = true;
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isClickNav.current = false;
    }, 800);
  }, []);

  return (
    <div className="flex gap-10">
      {/* Left column: Sticky side navigation */}
      <nav className="hidden lg:block w-[260px] flex-shrink-0">
        <div className="sticky top-[96px]">
          <p className="font-body text-[12px] font-medium text-muted-grey uppercase tracking-wider mb-4 px-4">
            Support
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-body text-[14px] transition-all duration-150 cursor-pointer ${
                    activeSection === item.id
                      ? "bg-[#E6F2EF] text-soft-navy font-semibold border-l-[3px] border-warm-teal"
                      : "text-charcoal hover:bg-[#F1F1F1]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-40 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap px-3 py-2 rounded-full font-body text-[13px] transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "bg-primary text-white font-medium"
                  : "text-charcoal hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right column: Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-8 sm:p-12">
          {/* FAQ */}
          <section
            id="faq"
            ref={(el) => { sectionRefs.current["faq"] = el; }}
          >
            <FAQSection />
          </section>

          <hr className="my-12 border-border" />

          {/* About */}
          <section
            id="about"
            ref={(el) => { sectionRefs.current["about"] = el; }}
          >
            <AboutSection />
          </section>

          <hr className="my-12 border-border" />

          {/* How it works */}
          <section
            id="how-it-works"
            ref={(el) => { sectionRefs.current["how-it-works"] = el; }}
          >
            <HowItWorksSection />
          </section>

          <hr className="my-12 border-border" />

          {/* Data protection */}
          <section
            id="data-protection"
            ref={(el) => { sectionRefs.current["data-protection"] = el; }}
          >
            <DataProtectionSection />
          </section>

          <hr className="my-12 border-border" />

          {/* Safeguarding */}
          <section
            id="safeguarding"
            ref={(el) => { sectionRefs.current["safeguarding"] = el; }}
          >
            <SafeguardingSection />
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Section ─── */

const FAQ_DATA = [
  {
    q: "What is Parentfits?",
    a: "Parentfits is a dedicated platform for parents that provides access to discounts, services, and practical support. It is designed to support parents across everyday needs, from family finances and wellbeing to childcare and household services.",
  },
  {
    q: "How do I access Parentfits?",
    a: "Parentfits is offered through participating employers. If your organisation provides access as part of its benefits package, you will be able to log in and start using Parentfits.",
  },
  {
    q: "What type of discounts and support are included?",
    a: "Parentfits offers a combination of discounts on family-focused products and services, access to trusted parent-focused providers, and practical resources and guidance.",
  },
  {
    q: "Is Parentfits only for mums?",
    a: "No. Parentfits is designed for all parents and caregivers, including fathers, adoptive parents, and guardians.",
  },
  {
    q: "Is Parentfits free to use?",
    a: "Yes. Parentfits is provided as part of an employer benefits offering and is free for eligible parents to use.",
  },
  {
    q: "What if my employer does not currently offer Parentfits?",
    a: "You can let your employer know you would like access to Parentfits. Employers can get in touch to find out how to offer the platform to their teams.",
  },
  {
    q: "How is Parentfits different from other discount platforms?",
    a: "Parentfits is designed specifically for parents. It combines savings with practical support and trusted services, rather than offering generic discounts that do not reflect family needs.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h1 className="font-heading text-[28px] font-semibold text-soft-navy mb-3">
        Frequently Asked Questions
      </h1>
      <p className="font-body text-[15px] text-[#555555] mb-8">
        Find answers to common questions about the platform. If you cannot find what you are looking for, please get in touch.
      </p>

      <div className="space-y-3">
        {FAQ_DATA.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-[#E6E6E6] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : i);
                  }
                }}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-4 py-4 text-left cursor-pointer"
              >
                <span className="font-body text-[15px] font-medium text-charcoal pr-4">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-grey text-[18px] leading-none transition-transform duration-150">
                  {isOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-150 ease-in-out"
                style={{
                  maxHeight: isOpen ? "200px" : "0",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="px-4 pb-4 font-body text-[14px] text-[#555555] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── About Section ─── */

function AboutSection() {
  return (
    <div>
      <h1 className="font-heading text-[28px] font-semibold text-soft-navy mb-3">
        About Parentfits
      </h1>
      <p className="font-body text-[15px] text-[#555555] leading-relaxed">
        Parentfits is a parent-first hub designed to make family life easier. It brings together exclusive discounts, trusted services, and practical support all in one place. Built with the realities of modern parenthood in mind, Parentfits helps parents save money, reduce stress, and feel genuinely supported at work and at home.
      </p>
    </div>
  );
}

/* ─── How It Works Section ─── */

const STEPS = [
  {
    number: 1,
    title: "Your employer provides access",
    body: "Your employer provides access to Parentfits as part of your benefits package.",
  },
  {
    number: 2,
    title: "Browse offers and services",
    body: "You browse parent-focused offers and services tailored to your family stage.",
  },
  {
    number: 3,
    title: "Redeem easily",
    body: "Redeem easily using a discount code, link, or in-store offer.",
  },
  {
    number: 4,
    title: "Save and revisit",
    body: "Save favourites and come back anytime to discover new offers.",
  },
];

function HowItWorksSection() {
  return (
    <div>
      <h1 className="font-heading text-[28px] font-semibold text-soft-navy mb-8">
        How it works
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="bg-[#F7FAF9] rounded-xl p-5 border border-border/50"
          >
            <span className="font-heading text-[32px] font-semibold text-warm-teal leading-none">
              {step.number}
            </span>
            <h3 className="font-heading text-[16px] font-semibold text-soft-navy mt-3 mb-2">
              {step.title}
            </h3>
            <p className="font-body text-[15px] text-[#555555] leading-relaxed">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data Protection Section ─── */

function DataProtectionSection() {
  return (
    <div>
      <h1 className="font-heading text-[28px] font-semibold text-soft-navy mb-3">
        Data Protection
      </h1>
      <div className="font-body text-[15px] text-[#555555] leading-relaxed space-y-4">
        <p>
          We only collect the information needed to personalise your experience and confirm eligibility. Employer reporting is aggregated and anonymised. We do not access employer HR records. We only use your information to provide the Parentfits service.
        </p>
        <p>
          Your data is not sold and is handled in line with UK data protection standards.
        </p>
      </div>
    </div>
  );
}

/* ─── Safeguarding Section ─── */

function SafeguardingSection() {
  return (
    <div>
      <h1 className="font-heading text-[28px] font-semibold text-soft-navy mb-3">
        Safeguarding
      </h1>
      <p className="font-body text-[15px] text-[#555555] leading-relaxed">
        We work with vetted partners and provide clear guidance for services involving children and families. If you ever have concerns about a partner experience, you can report it to our support team.
      </p>
    </div>
  );
}
