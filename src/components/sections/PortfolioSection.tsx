import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { CONCEPT_PROJECTS } from "@/data/concepts";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  return (
    <Section id="portfolio">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Concept Portfolio"
            title="Test three live, interactive Spokane industry concepts."
            description="Instead of showing static screenshots or invented testimonials, we built three working concept websites so you can try the quote calculators, menu filters, and booking flows firsthand."
          />
          <Badge variant="concept" className="self-start md:self-auto">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Clearly labeled interactive concepts
          </Badge>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CONCEPT_PROJECTS.map((project) => (
            <Card key={project.id} interactive className="flex flex-col justify-between">
              <div>
                <div
                  className={cn(
                    "mb-6 rounded-xl border border-[var(--border-subtle)] p-4",
                    project.accentBg
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Concept Demo
                    </span>
                    <span className={cn("text-xs font-semibold", project.accentText)}>
                      {project.industry}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                    {project.businessName}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Goal: {project.conversionGoal}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-4 border-t border-[var(--border-subtle)]">
                <p className="mb-3 font-mono text-[11px] text-[var(--text-muted)]">
                  Typical tier: {project.recommendedPackage}
                </p>
                <Button href={project.href} variant="secondary" className="w-full">
                  Launch Interactive Concept
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-xs text-[var(--text-muted)]">
          Note: Pine &amp; Basalt Landscaping, Cedar &amp; Hearth Kitchen, and
          Lilac City Spotless are fictional concept demonstrations created by{" "}
          <Link href="/#inquiry" className="underline hover:text-[var(--text-primary)]">
            Inland Digital Studio
          </Link>{" "}
          to illustrate UX, responsiveness, and conversion design.
        </p>
      </Container>
    </Section>
  );
}
