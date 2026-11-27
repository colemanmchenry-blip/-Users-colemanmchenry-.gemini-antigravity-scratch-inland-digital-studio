import type { Metadata } from "next";
import { LandscapingDemo } from "@/components/demos/LandscapingDemo";

export const metadata: Metadata = {
  title: "Pine & Basalt Landscaping (Interactive Concept) | Inland Digital Studio",
  description:
    "Interactive landscaping website concept for Spokane, WA featuring seasonal service filters and a live yard estimate calculator.",
};

export default function LandscapingConceptPage() {
  return <LandscapingDemo />;
}
