import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { SERVICE_AREAS, STUDIO_INFO } from "@/data/agency";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
              {STUDIO_INFO.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
              Focused, fast-loading websites designed to help Spokane small
              businesses win local search visibility and convert visitors into
              paying customers.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--accent-text)]" aria-hidden="true" />
                {STUDIO_INFO.location}
              </span>
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
              >
                <Mail className="h-4 w-4 text-[var(--accent-text)]" aria-hidden="true" />
                {STUDIO_INFO.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Interactive Concepts
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/demos/landscaping" className="hover:text-[var(--text-primary)]">
                  Pine &amp; Basalt Landscaping (Concept)
                </Link>
              </li>
              <li>
                <Link href="/demos/restaurant" className="hover:text-[var(--text-primary)]">
                  Cedar &amp; Hearth Kitchen (Concept)
                </Link>
              </li>
              <li>
                <Link href="/demos/cleaning" className="hover:text-[var(--text-primary)]">
                  Lilac City Spotless (Concept)
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[var(--text-primary)]">
                  Transparent Pricing ($500–$850+)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Spokane &amp; Inland Northwest
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              Serving small businesses across {SERVICE_AREAS.join(", ")}.
            </p>
            <p className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 p-3.5 text-xs leading-relaxed text-[var(--text-muted)]">
              Transparency note: All demonstration sites in our portfolio are
              original interactive concepts created to show layout and
              functionality. They do not represent real client engagements.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. Built for Spokane small businesses.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#faq" className="hover:text-[var(--text-primary)]">
              FAQ
            </Link>
            <Link href="/#inquiry" className="hover:text-[var(--text-primary)]">
              Start a Project
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
