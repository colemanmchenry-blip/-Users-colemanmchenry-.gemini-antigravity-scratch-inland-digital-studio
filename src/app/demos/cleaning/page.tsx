import type { Metadata } from "next";
import { CleaningDemo } from "@/components/demos/CleaningDemo";

export const metadata: Metadata = {
  title: "Lilac City Spotless (Interactive Concept) | Inland Digital Studio",
  description:
    "Interactive cleaning business website concept for Spokane, WA featuring a recurring quote estimator and room-by-room checklist.",
};

export default function CleaningConceptPage() {
  return <CleaningDemo />;
}
