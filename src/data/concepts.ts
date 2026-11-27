export interface ConceptItem {
  id: string;
  slug: string;
  href: string;
  businessName: string;
  industry: string;
  recommendedPackage: string;
  conversionGoal: string;
  description: string;
  highlights: string[];
  accentBg: string;
  accentText: string;
}

export const CONCEPT_PROJECTS: ConceptItem[] = [
  {
    id: "landscaping",
    slug: "landscaping",
    href: "/demos/landscaping",
    businessName: "Pine & Basalt Landscaping",
    industry: "Landscaping & Outdoor Care",
    recommendedPackage: "Professional ($850+)",
    conversionGoal: "Turn seasonal searchers into qualified estimate requests",
    description:
      "Built for Spokane's four-season climate—featuring seasonal service filtering and an interactive yard scope estimator that qualifies leads before they submit.",
    highlights: [
      "4-season Spokane service filter",
      "Interactive yard estimate calculator",
      "Pre-filled project quote request",
    ],
    accentBg: "bg-emerald-950/10 dark:bg-emerald-500/10",
    accentText: "text-emerald-800 dark:text-emerald-300",
  },
  {
    id: "restaurant",
    slug: "restaurant",
    href: "/demos/restaurant",
    businessName: "Cedar & Hearth Kitchen",
    industry: "Neighborhood Restaurant",
    recommendedPackage: "Professional ($850+)",
    conversionGoal: "Drive direct table reservations and mobile menu views",
    description:
      "An editorial hospitality concept with instant menu category tabs, dietary filters, and a friction-free reservation request flow without PDF menus.",
    highlights: [
      "Filterable Brunch, Dinner & Drinks menus",
      "Dietary tags (GF, Veg, Local Sourcing)",
      "Interactive table reservation request",
    ],
    accentBg: "bg-amber-950/10 dark:bg-amber-500/10",
    accentText: "text-amber-800 dark:text-amber-300",
  },
  {
    id: "cleaning",
    slug: "cleaning",
    href: "/demos/cleaning",
    businessName: "Lilac City Spotless",
    industry: "Residential & Office Cleaning",
    recommendedPackage: "Starter ($500+) or Professional ($850+)",
    conversionGoal: "Convert visitors with transparent instant pricing estimates",
    description:
      "Designed for high trust and fast bookings—combining a live frequency quote calculator with an interactive room-by-room cleaning checklist.",
    highlights: [
      "Home & office instant quote estimator",
      "Recurring frequency discount calculator",
      "Interactive room checklist tabs",
    ],
    accentBg: "bg-sky-950/10 dark:bg-sky-500/10",
    accentText: "text-sky-800 dark:text-sky-300",
  },
];
