export type SeasonCategory = "all" | "spring-summer" | "hardscape" | "fall-winter";

export interface LandscapingService {
  id: string;
  name: string;
  season: Exclude<SeasonCategory, "all">;
  seasonLabel: string;
  startingRate: string;
  summary: string;
  idealFor: string;
}

export const LANDSCAPING_SERVICES: LandscapingService[] = [
  {
    id: "lawn-irrigation",
    name: "Weekly Lawn Care & Irrigation Checks",
    season: "spring-summer",
    seasonLabel: "Spring & Summer",
    startingRate: "From $55 / visit",
    summary:
      "Consistent mowing, crisp edging, sprinkler zone audits, and blowout scheduling tailored to Spokane's dry summers.",
    idealFor: "South Hill, North Side & Valley homeowners",
  },
  {
    id: "basalt-hardscaping",
    name: "Basalt Patios, Walkways & Retaining Walls",
    season: "hardscape",
    seasonLabel: "Design & Hardscape",
    startingRate: "Custom quote",
    summary:
      "Locally quarried basalt borders, paver patios, fire-pit seating pads, and drought-tolerant xeriscape planting beds.",
    idealFor: "Outdoor living upgrades & sloped yards",
  },
  {
    id: "xeriscape-conversion",
    name: "Water-Wise Native Planting & Rock Beds",
    season: "spring-summer",
    seasonLabel: "Spring & Summer",
    startingRate: "From $650 / bed",
    summary:
      "Replace high-water turf sections with ponderosa mulch, ornamental grasses, and drip lines built for Inland Northwest soil.",
    idealFor: "Low-maintenance curb appeal",
  },
  {
    id: "fall-cleanup-snow",
    name: "Leaf Removal, Aeration & Winter Snow Clearing",
    season: "fall-winter",
    seasonLabel: "Fall & Winter",
    startingRate: "From $145 / cleanup",
    summary:
      "Full autumn leaf haul-away, core aeration, sprinkler winterization, and dependable driveway/walkway snow clearing.",
    idealFor: "Year-round residential & small commercial lots",
  },
];

export type MenuSection = "dinner" | "brunch" | "drinks";
export type DietaryTag = "GF" | "Veg" | "Local";

export interface RestaurantMenuItem {
  id: string;
  section: MenuSection;
  name: string;
  price: number;
  description: string;
  tags: DietaryTag[];
}

export const RESTAURANT_MENU: RestaurantMenuItem[] = [
  {
    id: "cedar-salmon",
    section: "dinner",
    name: "Cedar-Planked Steelhead",
    price: 29,
    description:
      "Charred lemon butter, roasted Palouse fingerling potatoes, blistered green beans.",
    tags: ["GF", "Local"],
  },
  {
    id: "hearth-flatbread",
    section: "dinner",
    name: "Wild Mushroom & Thyme Flatbread",
    price: 18,
    description:
      "Wood-fired sourdough crust, roasted cremini, caramelized Walla Walla onion, goat cheese.",
    tags: ["Veg", "Local"],
  },
  {
    id: "bison-shortrib",
    section: "dinner",
    name: "Braised Short Rib & Polenta",
    price: 34,
    description:
      "Slow-braised beef short rib, creamy white cheddar polenta, rosemary jus.",
    tags: ["GF"],
  },
  {
    id: "harvest-bowl",
    section: "dinner",
    name: "Charred Squash & Farro Bowl",
    price: 21,
    description:
      "Delicata squash, toasted hazelnuts, baby kale, apple cider vinaigrette.",
    tags: ["Veg", "Local"],
  },
  {
    id: "huckleberry-toast",
    section: "brunch",
    name: "Brioche French Toast & Huckleberry Compote",
    price: 17,
    description:
      "Thick-cut brioche, whipped mascarpone, regional huckleberry reduction, toasted pecans.",
    tags: ["Veg", "Local"],
  },
  {
    id: "skillet-hash",
    section: "brunch",
    name: "Cast-Iron Herb Potato & Egg Skillet",
    price: 16,
    description:
      "Crisp Yukon potatoes, roasted peppers, two pasture eggs, avocado salsa verde.",
    tags: ["GF", "Veg"],
  },
  {
    id: "smoked-old-fashioned",
    section: "drinks",
    name: "Inland Cedar Old Fashioned",
    price: 14,
    description:
      "Small-batch bourbon, maple bitters, expressed orange peel over hand-cut ice.",
    tags: ["GF"],
  },
  {
    id: "spiced-pear-spritz",
    section: "drinks",
    name: "Spiced Orchard Pear Spritz (Zero-Proof)",
    price: 9,
    description:
      "Pressed Washington pear, ginger-cardamom shrub, sparkling mineral water.",
    tags: ["GF", "Veg", "Local"],
  },
];

export type CleaningRoom = "kitchen" | "bathrooms" | "living" | "move-out";

export const CLEANING_CHECKLIST: Record<
  CleaningRoom,
  { title: string; items: string[] }
> = {
  kitchen: {
    title: "Kitchen & Dining",
    items: [
      "Sanitize countertops, backsplash, and prep islands",
      "Scrub sink, faucet fixtures, and polish stainless steel",
      "Wipe exterior cabinets, range hood, and stovetop",
      "Clean microwave interior & wipe exterior appliances",
      "Vacuum and damp-mop hard floors with pet-safe solution",
    ],
  },
  bathrooms: {
    title: "Bathrooms",
    items: [
      "Disinfect showers, glass doors, tile grout, and tubs",
      "Sanitize toilets inside, base, and behind fixtures",
      "Clean mirrors, vanity tops, and chrome hardware",
      "Empty wastebaskets and replace liners",
      "Hand-wash baseboards and sanitize tile floors",
    ],
  },
  living: {
    title: "Bedrooms & Living Spaces",
    items: [
      "Dust ceiling fans, window sills, blinds, and baseboards",
      "Vacuum carpets, rugs, and under accessible furniture",
      "Wipe high-touch light switches, doorknobs, and railings",
      "Straighten linens, cushions, and tidy surface clutter",
      "Spot-clean interior entryway glass",
    ],
  },
  "move-out": {
    title: "Move-In / Move-Out Extras",
    items: [
      "Wipe inside empty kitchen and bathroom drawers & cabinets",
      "Deep-clean interior oven racks and refrigerator shelves",
      "Detailed window track & closet shelf dusting",
      "Baseboard and doorframe scuff wipe-down",
      "Final walkthrough checklist tailored to Spokane lease standards",
    ],
  },
};
