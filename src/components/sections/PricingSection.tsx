"use client";

import { Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PRICING_TIERS, type PackageId } from "@/data/agency";

export function selectAgencyPackage(packageId: PackageId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PackageId>("ids-select-package", { detail: packageId })
  );
  const el = document.getElementById("inquiry");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function PricingSection() {
  return (
    <Section id="pricing" subtle>
      <Container>
        <SectionHeading
          eyebrow="Services & Transparent Pricing"
          title="Straightforward rates built for local business budgets."
          description="Know what your website will cost before our first call. No surprise add-ons, and you receive an itemized flat-rate scope before work starts."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.id}
              highlighted={tier.highlighted}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {tier.name}
                  </h3>
                  {tier.badge && <Badge variant="accent">{tier.badge}</Badge>}
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {tier.priceLabel}
                  </span>
                  {tier.id === "maintenance" && (
                    <span className="text-sm font-medium text-[var(--text-muted)]">
                      / month
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                  {tier.priceSubtext}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {tier.summary}
                </p>

                <ul className="mt-6 space-y-3 border-t border-[var(--border-subtle)] pt-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  type="button"
                  onClick={() => selectAgencyPackage(tier.id)}
                  variant={tier.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.ctaLabel}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)]">
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]"
            aria-hidden="true"
          />
          <p>
            <strong className="font-semibold text-[var(--text-primary)]">
              Transparent scope policy:
            </strong>{" "}
            Domain registration (~$12–$20/yr) and third-party email/booking
            subscriptions (if needed) are billed directly under your own business
            accounts so you always maintain 100% control.
          </p>
        </div>
      </Container>
    </Section>
  );
}
