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

  useEffect(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    if (hash && NAV_ITEMS.some((n) => n.id === hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

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
    <div className="flex gap-12">
      {/* Left column: Sticky side navigation */}
      <nav className="hidden lg:block w-[240px] flex-shrink-0">
        <div className="sticky top-[96px]">
          <ul className="space-y-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-5 py-3.5 font-body text-[14px] transition-all duration-150 cursor-pointer border-l-[3px] ${
                      isActive
                        ? "border-warm-teal text-warm-teal font-semibold bg-transparent"
                        : "border-transparent text-charcoal hover:text-soft-navy"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
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
        {/* FAQ */}
        <section
          id="faq"
          ref={(el) => { sectionRefs.current["faq"] = el; }}
          className="mb-16"
        >
          <FAQSection />
        </section>

        <hr className="border-border mb-16" />

        {/* About */}
        <section
          id="about"
          ref={(el) => { sectionRefs.current["about"] = el; }}
          className="mb-16"
        >
          <AboutSection />
        </section>

        <hr className="border-border mb-16" />

        {/* How it works */}
        <section
          id="how-it-works"
          ref={(el) => { sectionRefs.current["how-it-works"] = el; }}
          className="mb-16"
        >
          <HowItWorksSection />
        </section>

        <hr className="border-border mb-16" />

        {/* Data protection */}
        <section
          id="data-protection"
          ref={(el) => { sectionRefs.current["data-protection"] = el; }}
          className="mb-16"
        >
          <DataProtectionSection />
        </section>

        <hr className="border-border mb-16" />

        {/* Safeguarding */}
        <section
          id="safeguarding"
          ref={(el) => { sectionRefs.current["safeguarding"] = el; }}
        >
          <SafeguardingSection />
        </section>
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
    q: "How does the platform work?",
    a: "Your employer provides access to Parentfits. Once you log in, you can browse parent-focused offers and services, redeem discounts using a code or link, and save your favourites to come back to anytime.",
  },
  {
    q: "What benefits and discounts are available?",
    a: "Parentfits offers a combination of discounts on family-focused products and services, access to trusted parent-focused providers, and practical resources and guidance.",
  },
  {
    q: "How do I access these services?",
    a: "Parentfits is offered through participating employers. If your organisation provides access as part of its benefits package, you will be able to log in and start using Parentfits.",
  },
  {
    q: "Is Parentfits available through my employer?",
    a: "You can check with your HR or benefits team. If your employer does not currently offer Parentfits, you can let them know you would like access. Employers can get in touch to find out how to offer the platform to their teams.",
  },
  {
    q: "How is my personal data protected?",
    a: "We only collect the information needed to personalise your experience and confirm eligibility. Employer reporting is aggregated and anonymised. We do not access employer HR records and your data is never sold.",
  },
  {
    q: "What safeguarding measures do you take?",
    a: "We work with vetted partners and provide clear guidance for services involving children and families. If you ever have concerns about a partner experience, you can report it to our support team.",
  },
  {
    q: "How can I update my preferences?",
    a: "You can update your profile, family details, and preferences at any time from the My Profile page. Changes are saved instantly and your recommendations will update accordingly.",
  },
  {
    q: "Who can use this platform?",
    a: "Parentfits is designed for all parents and caregivers, including fathers, adoptive parents, and guardians. It is not limited to mums.",
  },
  {
    q: "How can I contact support?",
    a: "If you need help or have a question that is not answered here, you can reach our support team by emailing hello@parentfits.co.uk.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h1 className="font-heading text-[32px] font-semibold text-soft-navy mb-4">
        Frequently Asked Questions
      </h1>
      <p className="font-body text-[16px] text-muted-grey mb-10 leading-relaxed max-w-[640px]">
        Find answers to common questions about our platform services. If you can&apos;t find what you&apos;re looking for, please get in touch with us.
      </p>

      <div className="space-y-0">
        {FAQ_DATA.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border-b border-[#E8E4DE]"
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
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              >
                <span className="font-body text-[15px] font-medium text-charcoal pr-6">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 text-warm-teal text-[22px] leading-none font-light">
                  {isOpen ? "\u2212" : "+"}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-150 ease-in-out"
                style={{
                  maxHeight: isOpen ? "300px" : "0",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="pb-5 font-body text-[14px] text-muted-grey leading-relaxed pr-12">
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
      <h1 className="font-heading text-[32px] font-semibold text-soft-navy mb-4">
        About Parentfits
      </h1>
      <p className="font-body text-[16px] text-muted-grey leading-relaxed max-w-[640px]">
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
      <h1 className="font-heading text-[32px] font-semibold text-soft-navy mb-8">
        How it works
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="bg-[#F7FAF9] rounded-xl p-6 border border-border/40"
          >
            <span className="font-heading text-[32px] font-semibold text-warm-teal leading-none">
              {step.number}
            </span>
            <h3 className="font-heading text-[16px] font-semibold text-soft-navy mt-3 mb-2">
              {step.title}
            </h3>
            <p className="font-body text-[15px] text-muted-grey leading-relaxed">
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
      <h1 className="font-heading text-[32px] font-semibold text-soft-navy mb-4">
        Data Protection
      </h1>
      <div className="font-body text-[16px] text-muted-grey leading-relaxed space-y-4 max-w-[640px]">
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
      <h1 className="font-heading text-[32px] font-semibold text-soft-navy mb-4">
        Safeguarding
      </h1>
      <p className="font-body text-[16px] text-muted-grey leading-relaxed max-w-[640px]">
        We work with vetted partners and provide clear guidance for services involving children and families. If you ever have concerns about a partner experience, you can report it to our support team.
      </p>
    </div>
  );
}
