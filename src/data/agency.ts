import type { AccordionItemData } from "@/components/ui/Accordion";

export type PackageId = "starter" | "professional" | "maintenance" | "custom";

export interface PricingTier {
  id: Exclude<PackageId, "custom">;
  name: string;
  badge?: string;
  priceLabel: string;
  priceSubtext: string;
  summary: string;
  highlighted?: boolean;
  features: string[];
  ctaLabel: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  metricLabel: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export const STUDIO_INFO = {
  name: "Inland Digital Studio",
  tagline: "Conversion-focused websites for Spokane small businesses.",
  location: "Spokane, Washington",
  email: "hello@inlanddigitalstudio.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://inlanddigitalstudio.com",
} as const;

export const SERVICE_AREAS = [
  "Spokane",
  "Spokane Valley",
  "Liberty Lake",
  "Cheney",
  "Mead",
  "Medical Lake",
  "Coeur d'Alene",
] as const;

export const VALUE_PILLARS: ValuePillar[] = [
  {
    metricLabel: "Built to Convert",
    title: "Clear calls-to-action over clutter",
    description:
      "Every layout guides local visitors directly to calling, requesting an estimate, or booking—especially on mobile phones.",
  },
  {
    metricLabel: "Spokane Local SEO",
    title: "Structured for local Google searches",
    description:
      "Clean semantic HTML, local schema markup, fast Core Web Vitals, and neighborhood-focused copy help nearby customers find you.",
  },
  {
    metricLabel: "Zero Lock-In",
    title: "You own your domain, code, and content",
    description:
      "No proprietary page-builder traps. Your business retains full ownership of your domain registrar, hosting account, and website assets.",
  },
  {
    metricLabel: "Accessible & Secure",
    title: "Engineered with modern web standards",
    description:
      "Keyboard-accessible navigation, WCAG-conscious contrast in light and dark modes, validated forms, and strict security headers.",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Website",
    priceLabel: "$500",
    priceSubtext: "Starting at • One-time build",
    summary:
      "Ideal for sole proprietors, contractors, and new Spokane businesses ready to replace a social-only link with a fast, credible web presence.",
    features: [
      "1 to 3 custom responsive pages (Home, Services, Contact)",
      "Mobile-first design with light & dark mode support",
      "Validated quote or contact inquiry form",
      "Foundational Spokane local SEO & metadata",
      "Google Business Profile link & map readiness",
      "Pre-launch speed, accessibility & link check",
    ],
    ctaLabel: "Choose Starter ($500+)",
  },
  {
    id: "professional",
    name: "Professional Website",
    badge: "Most Popular",
    priceLabel: "$850",
    priceSubtext: "Starting at • One-time build",
    highlighted: true,
    summary:
      "Built for established small businesses that want a multi-page site with interactive conversion tools tailored to how customers buy.",
    features: [
      "Up to 6 tailored pages built with reusable components",
      "Custom interactive feature (estimate calculator, menu filter, or booking intake)",
      "Enhanced Spokane & Inland NW local SEO + JSON-LD schema",
      "Conversion-focused copy structure & clear trust hierarchy",
      "Google Search Console & privacy-friendly analytics setup",
      "Two rounds of design & content refinement before launch",
    ],
    ctaLabel: "Choose Professional ($850+)",
  },
  {
    id: "maintenance",
    name: "Monthly Maintenance",
    priceLabel: "$49",
    priceSubtext: "Starting at • Per month (optional)",
    summary:
      "Hands-off upkeep for owners who prefer to focus on running their business while keeping their website updated, secure, and fast.",
    features: [
      "Framework, security & dependency updates",
      "Uptime checks and scheduled off-site backups",
      "Up to 45 minutes/month of text, photo, or pricing edits",
      "Seasonal promo or hours updates (snow, holidays, menus)",
      "Priority email support with clear turnaround",
      "Month-to-month flexibility—cancel anytime",
    ],
    ctaLabel: "Add Maintenance ($49+/mo)",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "15-Minute Local Discovery",
    description:
      "Tell us what services you offer, who your best Spokane customers are, and what action you want visitors to take.",
    deliverable: "Clear scope & fixed price quote",
  },
  {
    step: "02",
    title: "Interactive Concept Preview",
    description:
      "Instead of static wireframes, we share a working preview link so you can click through your site on your phone.",
    deliverable: "Live staging preview URL",
  },
  {
    step: "03",
    title: "Local SEO & Form Setup",
    description:
      "We wire your lead forms, local Spokane schema markup, fast fonts, accessible components, and security headers.",
    deliverable: "Tested lead capture & SEO metadata",
  },
  {
    step: "04",
    title: "Launch & Optional Care",
    description:
      "Your site goes live on your domain with zero lock-in. Manage updates yourself or hand upkeep to our $49/mo plan.",
    deliverable: "Production launch & ownership handoff",
  },
];

export const FAQ_ITEMS: AccordionItemData[] = [
  {
    id: "scope-pricing",
    question: "What does 'starting at $500' and 'starting at $850' mean in practice?",
    answer:
      "For most local service businesses needing a focused 1–3 page site (Starter) or a 4–6 page site with one interactive quote/menu/booking tool (Professional), the starting price covers the entire build. If you need custom integrations such as online payments, third-party POS syncing, or extensive copywriting from scratch, we provide an itemized flat-rate quote upfront before any work begins.",
  },
  {
    id: "timeline",
    question: "How long does it take to launch a small business website?",
    answer:
      "A Starter Website typically moves from kickoff to launch in 1 to 2 weeks once we have your business details and photos. A Professional Website with interactive estimators or custom menus typically takes 2 to 3 weeks.",
  },
  {
    id: "ownership",
    question: "Who owns the domain name, hosting, and website code?",
    answer:
      "You do. We help set up your domain registrar and modern hosting (such as Vercel) under accounts you control, and you retain full ownership of your site code and content.",
  },
  {
    id: "maintenance-required",
    question: "Do I have to sign up for the $49/month maintenance plan?",
    answer:
      "No. Monthly maintenance is completely optional. It is designed for Spokane business owners who want security patches, backups, and regular updates (like seasonal hours, menu changes, or new photos) handled for them without touching code.",
  },
  {
    id: "concepts",
    question: "Are the landscaping, restaurant, and cleaning sites real clients?",
    answer:
      "No—and we label them clearly as Interactive Concepts. We built them from scratch so prospective clients can test real interactive layouts, quote calculators, and mobile responsiveness before hiring us, without inventing fake testimonials or using real businesses without permission.",
  },
  {
    id: "local-seo",
    question: "How do you handle Spokane local SEO?",
    answer:
      "Every site includes clean semantic headings, mobile speed optimization, local Spokane & Inland Northwest keyword structure, OpenGraph sharing tags, an XML sitemap, and structured JSON-LD schema so search engines clearly understand what you do and where you serve.",
  },
];
