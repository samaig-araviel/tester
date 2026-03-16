/* ─── Parents Hub — Static content data ─── */

export interface HubArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  gradientFrom: string;
  gradientTo: string;
}

export interface HubToolkit {
  id: string;
  title: string;
  description: string;
  tags: string[];
  fileUrl: string;
  format: string;
  icon: "Calendar" | "FileText" | "CheckSquare" | "ClipboardList" | "BookOpen" | "FileCheck";
}

export interface MoneyArticle {
  id: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ExternalResource {
  id: string;
  org: string;
  description: string;
  url: string;
  ctaLabel: string;
}

/* ─── Filter pill labels ─── */

export const ARTICLE_FILTERS = [
  "Planning for your leave",
  "Pregnancy",
  "Returning to Work",
  "Flexible Working",
  "Money & Childcare",
  "Navigating working motherhood",
  "Navigating working fatherhood",
] as const;

/* ─── Articles ─── */

export const ARTICLES: HubArticle[] = [
  {
    id: "art-1",
    title: "Tips for Returning to Work",
    slug: "tips-returning-to-work",
    excerpt: "Guidance for a smooth transition back to work after parental leave.",
    category: "Returning to Work",
    tags: ["Returning to Work", "Planning for your leave"],
    isFeatured: true,
    gradientFrom: "#E6F2EF",
    gradientTo: "#F0D5BF",
  },
  {
    id: "art-2",
    title: "Navigating Working Motherhood",
    slug: "navigating-working-motherhood",
    excerpt: "Support and practical advice for balancing work and motherhood.",
    category: "Navigating working motherhood",
    tags: ["Navigating working motherhood"],
    isFeatured: true,
    gradientFrom: "#FBE8D8",
    gradientTo: "#E8F5F1",
  },
  {
    id: "art-3",
    title: "Flexible Working Request Template",
    slug: "flexible-working-request-template",
    excerpt: "Templates and guidance for requesting flexible work arrangements.",
    category: "Flexible Working",
    tags: ["Flexible Working", "Returning to Work"],
    isFeatured: true,
    gradientFrom: "#EEF4F8",
    gradientTo: "#E6F2EF",
  },
  {
    id: "art-4",
    title: "Planning Your Maternity Leave",
    slug: "planning-maternity-leave",
    excerpt: "A step-by-step guide to planning your time away from work.",
    category: "Planning for your leave",
    tags: ["Planning for your leave", "Pregnancy"],
    isFeatured: true,
    gradientFrom: "#E6F2EF",
    gradientTo: "#EEF4F8",
  },
  {
    id: "art-5",
    title: "Your Pregnancy Rights at Work",
    slug: "pregnancy-rights-at-work",
    excerpt: "Know your legal rights and protections during pregnancy.",
    category: "Pregnancy",
    tags: ["Pregnancy", "Planning for your leave"],
    isFeatured: false,
    gradientFrom: "#FBE8D8",
    gradientTo: "#F7F4EF",
  },
  {
    id: "art-6",
    title: "How to Request Flexible Working",
    slug: "how-to-request-flexible-working",
    excerpt: "Step-by-step guidance to submit a strong flexible working request.",
    category: "Flexible Working",
    tags: ["Flexible Working"],
    isFeatured: false,
    gradientFrom: "#EEF4F8",
    gradientTo: "#F0D5BF",
  },
  {
    id: "art-7",
    title: "Childcare Costs Explained",
    slug: "childcare-costs-explained",
    excerpt: "Understanding the true cost of childcare and how to get support.",
    category: "Money & Childcare",
    tags: ["Money & Childcare"],
    isFeatured: false,
    gradientFrom: "#E6F2EF",
    gradientTo: "#FBE8D8",
  },
  {
    id: "art-8",
    title: "Navigating Working Fatherhood",
    slug: "navigating-working-fatherhood",
    excerpt: "Practical tips for balancing career progression with active fatherhood.",
    category: "Navigating working fatherhood",
    tags: ["Navigating working fatherhood"],
    isFeatured: false,
    gradientFrom: "#EEF4F8",
    gradientTo: "#E6F2EF",
  },
  {
    id: "art-9",
    title: "Shared Parental Leave Guide",
    slug: "shared-parental-leave-guide",
    excerpt: "How to split parental leave between partners and what you need to know.",
    category: "Planning for your leave",
    tags: ["Planning for your leave", "Navigating working fatherhood"],
    isFeatured: false,
    gradientFrom: "#F7F4EF",
    gradientTo: "#E8F5F1",
  },
  {
    id: "art-10",
    title: "Returning to Work After Loss",
    slug: "returning-to-work-after-loss",
    excerpt: "Sensitive guidance for returning to work after pregnancy loss or bereavement.",
    category: "Returning to Work",
    tags: ["Returning to Work", "Pregnancy"],
    isFeatured: false,
    gradientFrom: "#E8F5F1",
    gradientTo: "#EEF4F8",
  },
];

/* ─── Toolkits ─── */

export const TOOLKITS: HubToolkit[] = [
  {
    id: "tk-1",
    title: "Return to work calendar",
    description: "Pay, timelines and entitlements",
    tags: ["Return to Work"],
    fileUrl: "#",
    format: "Interactive",
    icon: "Calendar",
  },
  {
    id: "tk-2",
    title: "Flexible Working",
    description: "How to request flexibility",
    tags: ["Flexible Working", "Return to Work"],
    fileUrl: "#",
    format: "PDF",
    icon: "FileText",
  },
  {
    id: "tk-3",
    title: "Key steps for returning to work",
    description: "Planning guide",
    tags: ["Return to Work", "Wellbeing"],
    fileUrl: "#",
    format: "PDF",
    icon: "CheckSquare",
  },
  {
    id: "tk-4",
    title: "Maternity leave checklist",
    description: "Everything to do before, during and after leave",
    tags: ["Planning for your leave", "Pregnancy"],
    fileUrl: "#",
    format: "PDF",
    icon: "ClipboardList",
  },
  {
    id: "tk-5",
    title: "Childcare options comparison",
    description: "Compare nurseries, childminders and nannies",
    tags: ["Money & Childcare"],
    fileUrl: "#",
    format: "Interactive",
    icon: "BookOpen",
  },
];

/* ─── Money & Financial Support ─── */

export const MONEY_ARTICLES: MoneyArticle[] = [
  {
    id: "money-1",
    title: "Tax Relief & Allowances",
    description: "Reclaim from government sources",
    gradientFrom: "#E6F2EF",
    gradientTo: "#F0D5BF",
  },
  {
    id: "money-2",
    title: "How to confidently request flexible working",
    description: "Negotiation tips and scripts",
    gradientFrom: "#FBE8D8",
    gradientTo: "#E8F5F1",
  },
  {
    id: "money-3",
    title: "Tips for working from home with a toddler",
    description: "Practical strategies for balance",
    gradientFrom: "#EEF4F8",
    gradientTo: "#E6F2EF",
  },
  {
    id: "money-4",
    title: "A guide to maternity leave pay and benefits",
    description: "Understanding your entitlements",
    gradientFrom: "#E6F2EF",
    gradientTo: "#EEF4F8",
  },
];

/* ─── Trusted External Resources ─── */

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  {
    id: "ext-1",
    org: "GOV.UK",
    description: "Official government advice on parental rights and benefits",
    url: "https://www.gov.uk/browse/childcare-parenting",
    ctaLabel: "Read more",
  },
  {
    id: "ext-2",
    org: "Working Families",
    description: "The UK's national charity for working parents and carers",
    url: "https://workingfamilies.org.uk",
    ctaLabel: "Read more",
  },
  {
    id: "ext-3",
    org: "Pregnant Then Screwed",
    description: "Campaigning for better support for pregnant women and mothers",
    url: "https://pregnantthenscrewed.com",
    ctaLabel: "Read more",
  },
  {
    id: "ext-4",
    org: "Pregnant and Protected",
    description: "Free legal advice for workplace pregnancy discrimination",
    url: "https://pregnantandprotected.com",
    ctaLabel: "View details",
  },
];

/* ─── Personalisation ─── */

interface UserProfileForHub {
  identity_type: string | null;
  child_age_buckets: string[];
  support_needs: string[];
}

export function personalizeRecommended(
  articles: HubArticle[],
  profile: UserProfileForHub
): HubArticle[] {
  const featured = articles.filter((a) => a.isFeatured);
  if (!profile.identity_type && profile.child_age_buckets.length === 0 && profile.support_needs.length === 0) {
    return featured.slice(0, 4);
  }

  function score(article: HubArticle): number {
    let s = 0;

    // Identity match
    if (
      profile.identity_type === "EXPECTANT_PARENT" &&
      article.tags.some((t) => t.toLowerCase().includes("pregnancy") || t.toLowerCase().includes("planning"))
    ) {
      s += 50;
    }

    // Child age match — boost early years / return content for young children
    if (profile.child_age_buckets.includes("0-1") || profile.child_age_buckets.includes("expecting")) {
      if (article.tags.some((t) => t.toLowerCase().includes("return") || t.toLowerCase().includes("planning"))) {
        s += 30;
      }
    }

    // Support needs match
    const needKeywords: Record<string, string[]> = {
      childcare: ["childcare", "money"],
      pregnancy_postpartum: ["pregnancy", "planning"],
      home_support: ["flexible", "working from home"],
      baby_early_years: ["return", "early years"],
      after_school: ["childcare"],
      wellbeing: ["motherhood", "fatherhood", "wellbeing"],
    };
    for (const need of profile.support_needs) {
      const keywords = needKeywords[need] ?? [];
      if (article.tags.some((t) => keywords.some((kw) => t.toLowerCase().includes(kw)))) {
        s += 40;
      }
    }

    // Featured boost
    if (article.isFeatured) s += 10;

    return s;
  }

  return [...featured, ...articles.filter((a) => !a.isFeatured)]
    .sort((a, b) => score(b) - score(a))
    .slice(0, 4);
}
