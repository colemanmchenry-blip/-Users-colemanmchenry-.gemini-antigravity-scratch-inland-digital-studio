import { Accordion } from "@/components/ui/Accordion";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { FAQ_ITEMS } from "@/data/agency";

export function FaqSection() {
  return (
    <Section id="faq" subtle>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Clear answers before you reach out."
              description="Everything you need to know about pricing, timelines, ownership, and ongoing support for Spokane small businesses."
            />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={FAQ_ITEMS} defaultOpenId={FAQ_ITEMS[0]?.id} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
