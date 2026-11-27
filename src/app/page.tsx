import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { InquirySection } from "@/components/sections/InquirySection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ValuePillars } from "@/components/sections/ValuePillars";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <ValuePillars />
        <PortfolioSection />
        <PricingSection />
        <ProcessSection />
        <FaqSection />
        <InquirySection />
      </main>
      <Footer />
    </>
  );
}
