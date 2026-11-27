import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

const STUDIO_STANDARDS = [
  {
    label: "Transparent Starting Rates",
    value: "$500 Starter • $850 Pro • $49/mo Care",
  },
  {
    label: "Local Search Readiness",
    value: "Spokane SEO metadata, sitemap & JSON-LD schema",
  },
  {
    label: "Performance & Accessibility",
    value: "Mobile-first, fast load times, light & dark modes",
  },
  {
    label: "Full Ownership",
    value: "You control your domain, hosting, and code",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-emerald-950/[0.04] to-transparent dark:from-emerald-400/[0.05]"
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Badge variant="accent" className="mb-6">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Serving Spokane &amp; the Inland Northwest
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Websites built to bring Spokane small businesses more calls and bookings.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Inland Digital Studio designs fast, minimalist, mobile-ready
              websites with clear pricing starting at{" "}
              <strong className="font-semibold text-[var(--text-primary)]">$500</strong>
              —helping local trades, restaurants, and service businesses convert
              nearby Google searches into paying clients.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button href="/#inquiry" size="lg">
                Start a Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/#portfolio" variant="outline" size="lg">
                Explore Concept Sites
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[var(--accent-text)]"
                  aria-hidden="true"
                />
                No bloated retainers
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[var(--accent-text)]"
                  aria-hidden="true"
                />
                1–3 week typical launch
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[var(--accent-text)]"
                  aria-hidden="true"
                />
                Built for local SEO
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--accent-text)]">
                    Studio Standards
                  </p>
                  <p className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                    What every client site includes
                  </p>
                </div>
                <ShieldCheck
                  className="h-6 w-6 text-[var(--accent-text)]"
                  aria-hidden="true"
                />
              </div>

              <dl className="mt-5 space-y-4">
                {STUDIO_STANDARDS.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 px-4 py-3"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-center justify-between pt-1 text-xs text-[var(--text-muted)]">
                <span>Spokane • Spokane Valley • Liberty Lake</span>
                <a
                  href="#pricing"
                  className="font-medium text-[var(--accent-text)] hover:underline"
                >
                  View packages →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
