import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { VALUE_PILLARS } from "@/data/agency";

export function ValuePillars() {
  return (
    <Section subtle>
      <Container>
        <SectionHeading
          eyebrow="Strategy First"
          title="Designed like a storefront, engineered like modern software."
          description="Small business websites fail when they bury the phone number, load slowly on cellular data, or leave visitors guessing what you charge. Every build solves those problems first."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                {pillar.metricLabel}
              </p>
              <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)]">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
