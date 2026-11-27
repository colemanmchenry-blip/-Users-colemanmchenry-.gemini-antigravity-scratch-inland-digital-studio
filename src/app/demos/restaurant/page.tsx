import type { Metadata } from "next";
import { RestaurantDemo } from "@/components/demos/RestaurantDemo";

export const metadata: Metadata = {
  title: "Cedar & Hearth Kitchen (Interactive Concept) | Inland Digital Studio",
  description:
    "Interactive restaurant website concept for Spokane, WA featuring dietary menu filters and a table reservation request widget.",
};

export default function RestaurantConceptPage() {
  return <RestaurantDemo />;
}
