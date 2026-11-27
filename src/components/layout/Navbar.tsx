"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Concept Work", href: "/#portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:text-[#071910]"
      >
        Skip to main content
      </a>

      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 text-[var(--text-primary)] transition-opacity hover:opacity-85"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-white dark:text-[#071910]"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="h-4 w-4"
              >
                <path d="M4 19V5l8 5 8-5v14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 19h16" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="whitespace-nowrap text-sm font-semibold tracking-tight sm:text-base">
                Inland Digital Studio
              </span>
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                Spokane, WA
              </span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button href="/#inquiry" size="sm">
                Start a Project
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] md:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-nav-drawer"
        className={cn(
          "border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <Container className="py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[var(--border-subtle)]">
              <Button
                href="/#inquiry"
                size="md"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Start a Project
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
