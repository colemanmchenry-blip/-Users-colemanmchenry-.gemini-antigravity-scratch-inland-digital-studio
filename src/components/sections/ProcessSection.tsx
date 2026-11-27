import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PROCESS_STEPS } from "@/data/agency";

export function ProcessSection() {
  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From quick kickoff call to live Spokane launch."
          description="A streamlined four-step workflow designed for busy small business owners—no endless meetings or confusing jargon."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] font-mono text-xs font-semibold text-[var(--accent-text)]">
                  {item.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>

              <p className="mt-5 border-t border-[var(--border-subtle)] pt-3 font-mono text-[11px] text-[var(--text-muted)]">
                Output: {item.deliverable}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
