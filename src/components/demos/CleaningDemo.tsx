"use client";

import React, { useMemo, useState } from "react";
import { Check, CheckCircle2, Droplets, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { ConceptBanner } from "@/components/ui/ConceptBanner";
import { CLEANING_CHECKLIST, type CleaningRoom } from "@/data/demos";
import { cn, formatCurrency } from "@/lib/utils";

type SpaceType = "home" | "office";
type FrequencyType = "one-time" | "biweekly" | "weekly";

const FREQUENCY_DISCOUNT: Record<
  FrequencyType,
  { label: string; discountPct: number; badge?: string }
> = {
  "one-time": { label: "One-Time Deep Clean", discountPct: 0 },
  biweekly: { label: "Bi-Weekly", discountPct: 0.15, badge: "Save 15%" },
  weekly: { label: "Weekly", discountPct: 0.2, badge: "Save 20%" },
};

const CLEANING_EXTRAS = [
  { id: "appliances", label: "Inside Oven & Refrigerator", price: 45 },
  { id: "windows", label: "Interior Windows & Tracks", price: 40 },
  { id: "moveout", label: "Move-In / Move-Out Cabinets", price: 65 },
] as const;

export function CleaningDemo() {
  const [spaceType, setSpaceType] = useState<SpaceType>("home");
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [officeSqFt, setOfficeSqFt] = useState(2000);
  const [frequency, setFrequency] = useState<FrequencyType>("biweekly");
  const [extras, setExtras] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<CleaningRoom>("kitchen");
  const [bookingEmail, setBookingEmail] = useState("");
  const [booked, setBooked] = useState(false);

  const pricing = useMemo(() => {
    const base =
      spaceType === "home"
        ? 110 + bedrooms * 24 + bathrooms * 28
        : 120 + Math.round((officeSqFt / 500) * 35);

    const extrasTotal = extras.reduce((sum, id) => {
      const found = CLEANING_EXTRAS.find((e) => e.id === id);
      return sum + (found?.price ?? 0);
    }, 0);

    const discountPct = FREQUENCY_DISCOUNT[frequency].discountPct;
    const discountedBase = Math.round(base * (1 - discountPct));
    const total = discountedBase + extrasTotal;
    const savings = base - discountedBase;

    return { total, savings };
  }, [bathrooms, bedrooms, extras, frequency, officeSqFt, spaceType]);

  const toggleExtra = (id: string) => {
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBook = (event: React.FormEvent) => {
    event.preventDefault();
    setBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f9fb] text-[#0f1d24] dark:bg-[#091115] dark:text-[#ecf4f7]">
      <ConceptBanner
        conceptName="Lilac City Spotless"
        industry="Cleaning Business Concept"
      />

      <header className="border-b border-sky-950/10 bg-white/85 backdrop-blur-md dark:border-sky-200/10 dark:bg-[#0e191f]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-700 text-white dark:bg-sky-400 dark:text-sky-950">
              <Droplets className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight">
                Lilac City Spotless
              </p>
              <p className="text-[11px] uppercase tracking-wider text-sky-700 dark:text-sky-300">
                Concept Website • Spokane Cleaning
              </p>
            </div>
          </div>

          <nav aria-label="Cleaning concept navigation" className="hidden gap-6 text-sm font-medium sm:flex">
            <a href="#calculator" className="hover:text-sky-700 dark:hover:text-sky-300">
              Instant Quote
            </a>
            <a href="#checklist" className="hover:text-sky-700 dark:hover:text-sky-300">
              Cleaning Checklist
            </a>
          </nav>

          <a
            href="#calculator"
            className="rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 dark:bg-sky-400 dark:text-sky-950 sm:text-sm"
          >
            Get Instant Quote
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-sky-950/10 py-16 sm:py-20 dark:border-sky-200/10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-800/20 bg-sky-700/10 px-3 py-1 text-xs font-medium text-sky-900 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-200">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Fictional Concept • Spokane, Liberty Lake &amp; Cheney
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Transparent cleaning quotes in 20 seconds—for Spokane homes &amp; offices.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#425560] dark:text-[#a6bbc5]">
                Local cleaning buyers want clear pricing and knowing exactly what
                is scrubbed. This concept pairs a live frequency calculator with
                an interactive room checklist.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-sky-950/10 bg-white p-6 shadow-sm dark:border-sky-200/15 dark:bg-[#0e191f]">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-800 dark:text-sky-300">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  Built for High Booking Trust
                </div>
                <ul className="mt-4 space-y-2.5 text-sm text-[#425560] dark:text-[#a6bbc5]">
                  <li>• Upfront recurring discounts (Bi-weekly &amp; Weekly)</li>
                  <li>• Supports both residential and commercial office quotes</li>
                  <li>• Room-by-room scope clarity reduces pre-booking friction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quote Calculator */}
        <section id="calculator" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-6 rounded-2xl border border-sky-950/10 bg-white p-6 sm:p-8 dark:border-sky-200/15 dark:bg-[#0e191f] lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">
                    Interactive Cleaning Estimator
                  </h2>
                  <div className="inline-flex rounded-xl border border-sky-950/15 bg-[#f5f9fb] p-1 dark:border-sky-200/15 dark:bg-[#091115]">
                    {(
                      [
                        { id: "home", label: "Residential" },
                        { id: "office", label: "Office" },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSpaceType(item.id)}
                        className={cn(
                          "rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer",
                          spaceType === item.id
                            ? "bg-sky-700 text-white dark:bg-sky-400 dark:text-sky-950"
                            : "text-[#425560] dark:text-[#a6bbc5]"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {spaceType === "home" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="clean-beds" className="block text-sm font-medium">
                        Bedrooms: <strong>{bedrooms}</strong>
                      </label>
                      <input
                        id="clean-beds"
                        type="range"
                        min={1}
                        max={6}
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="mt-2 w-full accent-sky-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="clean-baths" className="block text-sm font-medium">
                        Bathrooms: <strong>{bathrooms}</strong>
                      </label>
                      <input
                        id="clean-baths"
                        type="range"
                        min={1}
                        max={5}
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="mt-2 w-full accent-sky-700"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="clean-sqft" className="block text-sm font-medium">
                      Office Area: <strong>{officeSqFt.toLocaleString()} sq ft</strong>
                    </label>
                    <input
                      id="clean-sqft"
                      type="range"
                      min={1000}
                      max={6000}
                      step={500}
                      value={officeSqFt}
                      onChange={(e) => setOfficeSqFt(Number(e.target.value))}
                      className="mt-2 w-full accent-sky-700"
                    />
                  </div>
                )}

                <div>
                  <span className="block text-sm font-semibold">Cleaning Frequency</span>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                    {(Object.keys(FREQUENCY_DISCOUNT) as FrequencyType[]).map((key) => {
                      const info = FREQUENCY_DISCOUNT[key];
                      const active = frequency === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFrequency(key)}
                          className={cn(
                            "rounded-xl border p-3 text-left cursor-pointer",
                            active
                              ? "border-sky-700 bg-sky-700/10 dark:border-sky-400 dark:bg-sky-400/15"
                              : "border-sky-950/15 dark:border-sky-200/15"
                          )}
                        >
                          <p className="text-sm font-semibold">{info.label}</p>
                          <p className="mt-0.5 font-mono text-xs text-sky-700 dark:text-sky-300">
                            {info.badge || "Standard rate"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold">Optional Deep-Clean Add-Ons</span>
                  <div className="mt-2.5 space-y-2">
                    {CLEANING_EXTRAS.map((extra) => (
                      <label
                        key={extra.id}
                        className="flex items-center justify-between rounded-xl border border-sky-950/10 px-4 py-2.5 text-sm cursor-pointer dark:border-sky-200/15"
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={extras.includes(extra.id)}
                            onChange={() => toggleExtra(extra.id)}
                            className="h-4 w-4 accent-sky-700"
                          />
                          <span>{extra.label}</span>
                        </span>
                        <span className="font-mono text-xs text-sky-700 dark:text-sky-300">
                          +${extra.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-900/20 bg-sky-950 p-6 text-sky-50 dark:border-sky-400/25 dark:bg-[#0f2430] lg:col-span-5">
                <p className="font-mono text-xs uppercase tracking-widest text-sky-300">
                  Estimated Visit Total
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">
                    {formatCurrency(pricing.total)}
                  </span>
                  <span className="text-sm text-sky-200/80">/ visit</span>
                </div>
                {pricing.savings > 0 && (
                  <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-sky-400/20 px-2.5 py-0.5 text-xs font-medium text-sky-200">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Includes {formatCurrency(pricing.savings)} recurring savings
                  </p>
                )}

                <p className="mt-4 text-xs leading-relaxed text-sky-200/80">
                  {spaceType === "home"
                    ? `${bedrooms} bed / ${bathrooms} bath home`
                    : `${officeSqFt.toLocaleString()} sq ft office`}{" "}
                  • {FREQUENCY_DISCOUNT[frequency].label}
                </p>

                {booked ? (
                  <div
                    role="status"
                    className="mt-6 rounded-xl border border-sky-400/30 bg-sky-900/50 p-4 text-sm"
                  >
                    <div className="flex items-center gap-2 font-semibold text-sky-200">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Concept Booking Previewed
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-sky-100/85">
                      Simulated estimate of {formatCurrency(pricing.total)} ready
                      for confirmation. Because this is a concept demo, no
                      real cleaning appointment was scheduled.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBooked(false)}
                      className="mt-3 text-xs font-semibold underline cursor-pointer"
                    >
                      Adjust concept quote
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBook} className="mt-6 space-y-3 border-t border-sky-800 pt-5">
                    <div>
                      <label htmlFor="clean-email" className="block text-xs font-medium text-sky-200">
                        Demo Email (not stored)
                      </label>
                      <input
                        id="clean-email"
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-lg border border-sky-700 bg-sky-900/60 px-3 py-2 text-sm text-white placeholder:text-sky-300/50"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-sky-950 hover:bg-sky-300 cursor-pointer"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Preview Concept Booking ({formatCurrency(pricing.total)})
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Room-by-Room Checklist */}
        <section
          id="checklist"
          className="border-t border-sky-950/10 bg-white/70 py-16 dark:border-sky-200/10 dark:bg-[#0d161b]"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">
                What&apos;s Included
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Room-by-Room Cleaning Checklist
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Cleaning checklist rooms"
              className="mt-8 flex flex-wrap justify-center gap-2"
            >
              {(Object.keys(CLEANING_CHECKLIST) as CleaningRoom[]).map((room) => {
                const active = activeRoom === room;
                return (
                  <button
                    key={room}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveRoom(room)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-semibold cursor-pointer",
                      active
                        ? "bg-sky-700 text-white dark:bg-sky-400 dark:text-sky-950"
                        : "border border-sky-950/15 bg-white text-[#425560] dark:border-sky-200/15 dark:bg-[#0e191f] dark:text-[#a6bbc5]"
                    )}
                  >
                    {CLEANING_CHECKLIST[room].title}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              className="mt-6 rounded-2xl border border-sky-950/10 bg-white p-6 sm:p-8 dark:border-sky-200/15 dark:bg-[#0e191f]"
            >
              <h3 className="text-lg font-semibold">
                {CLEANING_CHECKLIST[activeRoom].title}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {CLEANING_CHECKLIST[activeRoom].items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-700 dark:text-sky-300"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
