"use client";

import React, { useMemo, useState } from "react";
import { Calculator, Check, CheckCircle2, MapPin, Shield, Trees } from "lucide-react";
import { ConceptBanner } from "@/components/ui/ConceptBanner";
import { LANDSCAPING_SERVICES, type SeasonCategory } from "@/data/demos";
import { cn, formatCurrency } from "@/lib/utils";

type LotSize = "compact" | "standard" | "estate";
type EstimateService = "mowing" | "cleanup" | "xeriscape" | "hardscape";

const LOT_MULTIPLIERS: Record<LotSize, { label: string; sub: string; mult: number }> = {
  compact: { label: "Compact Lot", sub: "Under 5,000 sq ft", mult: 1 },
  standard: { label: "Standard Lot", sub: "5,000 – 10,000 sq ft", mult: 1.35 },
  estate: { label: "Large / Acreage", sub: "10,000+ sq ft", mult: 1.8 },
};

const SERVICE_BASE_RATES: Record<
  EstimateService,
  { label: string; min: number; max: number; unit: string }
> = {
  mowing: { label: "Weekly Mowing & Edging", min: 55, max: 75, unit: "per visit" },
  cleanup: { label: "Seasonal Leaf & Bed Cleanup", min: 185, max: 280, unit: "one-time" },
  xeriscape: { label: "Water-Wise Xeriscape Bed", min: 750, max: 1350, unit: "project" },
  hardscape: { label: "Basalt Patio / Walkway", min: 2400, max: 4200, unit: "project" },
};

const ADD_ONS = [
  { id: "irrigation", label: "Sprinkler Zone Audit / Blowout", price: 95 },
  { id: "mulch", label: "Fresh Pine Bark Mulch Refresh", price: 180 },
  { id: "snow", label: "Priority Winter Snow Clearing Retainer", price: 160 },
] as const;

export function LandscapingDemo() {
  const [seasonFilter, setSeasonFilter] = useState<SeasonCategory>("all");
  const [lotSize, setLotSize] = useState<LotSize>("standard");
  const [service, setService] = useState<EstimateService>("cleanup");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["irrigation"]);
  const [neighborhood, setNeighborhood] = useState("South Hill");
  const [contactEmail, setContactEmail] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const visibleServices = useMemo(() => {
    if (seasonFilter === "all") return LANDSCAPING_SERVICES;
    return LANDSCAPING_SERVICES.filter((item) => item.season === seasonFilter);
  }, [seasonFilter]);

  const estimate = useMemo(() => {
    const base = SERVICE_BASE_RATES[service];
    const mult = LOT_MULTIPLIERS[lotSize].mult;
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const found = ADD_ONS.find((item) => item.id === id);
      return sum + (found?.price ?? 0);
    }, 0);

    return {
      low: Math.round(base.min * mult + addOnTotal),
      high: Math.round(base.max * mult + addOnTotal),
      unit: base.unit,
    };
  }, [lotSize, selectedAddOns, service]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuoteSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#151c17] dark:bg-[#0b100d] dark:text-[#edf2ee]">
      <ConceptBanner
        conceptName="Pine & Basalt Landscaping"
        industry="Landscaping Concept"
      />

      {/* Concept Site Header */}
      <header className="border-b border-emerald-950/10 bg-white/80 backdrop-blur-md dark:border-emerald-200/10 dark:bg-[#101713]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900 text-emerald-50 dark:bg-emerald-500 dark:text-emerald-950">
              <Trees className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight">
                Pine &amp; Basalt Landscaping
              </p>
              <p className="text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Concept Website • Spokane, WA
              </p>
            </div>
          </div>
          <nav aria-label="Landscaping concept navigation" className="hidden gap-6 text-sm font-medium sm:flex">
            <a href="#services" className="hover:text-emerald-700 dark:hover:text-emerald-300">
              Seasonal Services
            </a>
            <a href="#estimator" className="hover:text-emerald-700 dark:hover:text-emerald-300">
              Instant Estimator
            </a>
          </nav>
          <a
            href="#estimator"
            className="rounded-lg bg-emerald-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 sm:text-sm"
          >
            Estimate My Yard
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-emerald-950/10 py-16 sm:py-20 dark:border-emerald-200/10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-900/10 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Fictional Concept • South Hill, North Side &amp; Spokane Valley
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Four-season outdoor care built for Spokane yards and basalt soil.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#465249] dark:text-[#a8b5ab]">
                From spring irrigation startups and drought-smart xeriscaping to
                autumn leaf haul-aways and winter snow clearing—get an instant
                ballpark range before booking a walkthrough.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#estimator"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950"
                >
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                  Launch Yard Estimator
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center rounded-xl border border-emerald-950/20 bg-white px-5 py-3 text-sm font-medium hover:bg-emerald-950/5 dark:border-emerald-200/20 dark:bg-[#131b16] dark:hover:bg-emerald-200/5"
                >
                  Browse Seasonal Services
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm dark:border-emerald-200/15 dark:bg-[#111914]">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                  Conversion UX Highlights
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-2.5">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                    <span>Filters seasonal Spokane services so visitors find snow or irrigation fast.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                    <span>Pre-qualifies lot size &amp; budget via an interactive scope calculator.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                    <span>Placeholder contact info—built as a live interactive concept demo.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Services Filter */}
        <section id="services" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                  Seasonal Capabilities
                </p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Filter services by Spokane season
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Filter landscaping services by season"
                className="flex flex-wrap gap-2"
              >
                {(
                  [
                    { id: "all", label: "All Seasons" },
                    { id: "spring-summer", label: "Spring & Summer" },
                    { id: "hardscape", label: "Hardscaping" },
                    { id: "fall-winter", label: "Fall & Winter" },
                  ] as const
                ).map((tab) => {
                  const active = seasonFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSeasonFilter(tab.id)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                        active
                          ? "bg-emerald-900 text-white dark:bg-emerald-400 dark:text-emerald-950"
                          : "border border-emerald-950/15 bg-white text-[#465249] hover:bg-emerald-950/5 dark:border-emerald-200/15 dark:bg-[#131b16] dark:text-[#a8b5ab]"
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {visibleServices.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-emerald-950/10 bg-white p-6 dark:border-emerald-200/15 dark:bg-[#111914]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-emerald-900/10 px-2.5 py-0.5 text-xs font-medium text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200">
                      {item.seasonLabel}
                    </span>
                    <span className="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      {item.startingRate}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#465249] dark:text-[#a8b5ab]">
                    {item.summary}
                  </p>
                  <p className="mt-4 border-t border-emerald-950/10 pt-3 text-xs text-[#647067] dark:border-emerald-200/10 dark:text-[#86948a]">
                    Ideal for: {item.idealFor}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Estimator */}
        <section
          id="estimator"
          className="border-t border-emerald-950/10 bg-white/70 py-16 dark:border-emerald-200/10 dark:bg-[#0f1612]"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                Interactive Concept Tool
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Instant Yard &amp; Project Estimate Calculator
              </h2>
              <p className="mt-2 text-sm text-[#465249] dark:text-[#a8b5ab]">
                Try adjusting yard size, primary service, and add-ons below to see
                how an interactive estimator increases lead quality for local trades.
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="space-y-6 rounded-2xl border border-emerald-950/10 bg-white p-6 dark:border-emerald-200/15 dark:bg-[#111914] lg:col-span-7">
                <div>
                  <label className="block text-sm font-semibold">
                    1. Select Property Size
                  </label>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                    {(Object.keys(LOT_MULTIPLIERS) as LotSize[]).map((key) => {
                      const active = lotSize === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setLotSize(key)}
                          className={cn(
                            "rounded-xl border p-3 text-left transition-all cursor-pointer",
                            active
                              ? "border-emerald-800 bg-emerald-900/10 dark:border-emerald-400 dark:bg-emerald-400/15"
                              : "border-emerald-950/15 hover:border-emerald-800/40 dark:border-emerald-200/15"
                          )}
                        >
                          <p className="text-sm font-semibold">
                            {LOT_MULTIPLIERS[key].label}
                          </p>
                          <p className="mt-0.5 text-xs text-[#5d6a60] dark:text-[#98a69b]">
                            {LOT_MULTIPLIERS[key].sub}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="landscaping-service-select"
                    className="block text-sm font-semibold"
                  >
                    2. Primary Project Scope
                  </label>
                  <select
                    id="landscaping-service-select"
                    value={service}
                    onChange={(e) => setService(e.target.value as EstimateService)}
                    className="mt-2 w-full rounded-xl border border-emerald-950/20 bg-[#f7f8f5] px-3.5 py-2.5 text-sm dark:border-emerald-200/20 dark:bg-[#0b100d]"
                  >
                    {(Object.keys(SERVICE_BASE_RATES) as EstimateService[]).map(
                      (key) => (
                        <option key={key} value={key}>
                          {SERVICE_BASE_RATES[key].label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-semibold">
                    3. Optional Seasonal Add-Ons
                  </span>
                  <div className="mt-2.5 space-y-2">
                    {ADD_ONS.map((addon) => {
                      const checked = selectedAddOns.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className="flex items-center justify-between rounded-xl border border-emerald-950/10 px-4 py-2.5 text-sm cursor-pointer hover:bg-emerald-950/[0.03] dark:border-emerald-200/15"
                        >
                          <span className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAddOn(addon.id)}
                              className="h-4 w-4 accent-emerald-800"
                            />
                            <span>{addon.label}</span>
                          </span>
                          <span className="font-mono text-xs text-emerald-800 dark:text-emerald-300">
                            +${addon.price}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-900/20 bg-emerald-950 p-6 text-emerald-50 dark:border-emerald-400/25 dark:bg-[#132219] lg:col-span-5">
                <p className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                  Estimated Range ({estimate.unit})
                </p>
                <p className="mt-3 text-4xl font-semibold tracking-tight">
                  {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-emerald-200/80">
                  Illustrative concept estimate for{" "}
                  {LOT_MULTIPLIERS[lotSize].label.toLowerCase()} •{" "}
                  {SERVICE_BASE_RATES[service].label}.
                </p>

                {quoteSubmitted ? (
                  <div
                    role="status"
                    className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-900/50 p-4 text-sm"
                  >
                    <div className="flex items-center gap-2 font-semibold text-emerald-200">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Concept Quote Previewed
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-100/85">
                      In a live client site, this submits the visitor&apos;s{" "}
                      {neighborhood} estimate ({formatCurrency(estimate.low)}–
                      {formatCurrency(estimate.high)}) directly to your business
                      inbox.
                    </p>
                    <button
                      type="button"
                      onClick={() => setQuoteSubmitted(false)}
                      className="mt-3 text-xs font-semibold underline cursor-pointer"
                    >
                      Reset preview
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-3 border-t border-emerald-800 pt-5">
                    <div>
                      <label htmlFor="concept-neighborhood" className="block text-xs font-medium text-emerald-200">
                        Spokane Neighborhood
                      </label>
                      <select
                        id="concept-neighborhood"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-emerald-700 bg-emerald-900/60 px-3 py-2 text-sm text-white"
                      >
                        <option>South Hill</option>
                        <option>North Spokane</option>
                        <option>Spokane Valley</option>
                        <option>Liberty Lake</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="concept-email" className="block text-xs font-medium text-emerald-200">
                        Demo Email (not stored)
                      </label>
                      <input
                        id="concept-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="homeowner@example.com"
                        className="mt-1 w-full rounded-lg border border-emerald-700 bg-emerald-900/60 px-3 py-2 text-sm text-white placeholder:text-emerald-300/50"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-300 cursor-pointer"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Preview Concept Quote Submission
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
