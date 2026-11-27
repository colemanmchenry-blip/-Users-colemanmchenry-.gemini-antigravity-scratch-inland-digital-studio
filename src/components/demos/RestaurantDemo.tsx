"use client";

import React, { useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import { ConceptBanner } from "@/components/ui/ConceptBanner";
import {
  RESTAURANT_MENU,
  type DietaryTag,
  type MenuSection,
} from "@/data/demos";
import { cn, formatCurrency } from "@/lib/utils";

const TIME_SLOTS = ["5:15 PM", "6:00 PM", "6:45 PM", "7:30 PM", "8:15 PM"];

export function RestaurantDemo() {
  const [section, setSection] = useState<MenuSection>("dinner");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryTag | "all">("all");

  const [partySize, setPartySize] = useState("2 Guests");
  const [seating, setSeating] = useState("Main Dining Room");
  const [date, setDate] = useState("2026-12-04");
  const [timeSlot, setTimeSlot] = useState("6:45 PM");
  const [guestName, setGuestName] = useState("");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const filteredMenu = useMemo(() => {
    return RESTAURANT_MENU.filter((item) => {
      if (item.section !== section) return false;
      if (dietaryFilter !== "all" && !item.tags.includes(dietaryFilter)) {
        return false;
      }
      return true;
    });
  }, [dietaryFilter, section]);

  const handleReserve = (event: React.FormEvent) => {
    event.preventDefault();
    setReservationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1916] dark:bg-[#120f0d] dark:text-[#f5efe8]">
      <ConceptBanner
        conceptName="Cedar & Hearth Kitchen"
        industry="Restaurant Concept"
      />

      <header className="border-b border-amber-950/10 bg-white/80 backdrop-blur-md dark:border-amber-100/10 dark:bg-[#191411]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c2d12] text-amber-50 dark:bg-amber-500 dark:text-[#1f1208]">
              <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight">
                Cedar &amp; Hearth Kitchen
              </p>
              <p className="text-[11px] uppercase tracking-wider text-[#8c431f] dark:text-amber-300">
                Concept Website • Spokane Dining
              </p>
            </div>
          </div>

          <nav aria-label="Restaurant concept navigation" className="hidden gap-6 text-sm font-medium sm:flex">
            <a href="#menu" className="hover:text-[#7c2d12] dark:hover:text-amber-300">
              Menus
            </a>
            <a href="#reserve" className="hover:text-[#7c2d12] dark:hover:text-amber-300">
              Reservations
            </a>
          </nav>

          <a
            href="#reserve"
            className="rounded-lg bg-[#7c2d12] px-4 py-2 text-xs font-semibold text-white hover:bg-[#9a3412] dark:bg-amber-400 dark:text-[#1c1208] sm:text-sm"
          >
            Reserve a Table
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-amber-950/10 py-16 sm:py-20 dark:border-amber-100/10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-900/20 bg-amber-900/10 px-3 py-1 text-xs font-medium text-[#7c2d12] dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Fictional Concept • Downtown / Kendall Yards Style Dining
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Wood-fired Inland Northwest plates, mobile-first menus, zero PDF pinch-zooming.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c5048] dark:text-[#bfb4aa]">
                Built to turn hungry local searchers into seated tables—featuring
                live dietary filters, seasonal hours, and an instant reservation
                request flow.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#reserve"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#7c2d12] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9a3412] dark:bg-amber-400 dark:text-[#1c1208]"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Book a Concept Table
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center rounded-xl border border-amber-950/20 bg-white px-5 py-3 text-sm font-medium hover:bg-amber-950/5 dark:border-amber-100/20 dark:bg-[#1b1512]"
                >
                  Explore Live Menu
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-amber-950/10 bg-white p-6 shadow-sm dark:border-amber-100/15 dark:bg-[#191411]">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8c431f] dark:text-amber-300">
                  Sample Hours &amp; Details (Concept)
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-amber-950/10 pb-2.5 dark:border-amber-100/10">
                    <dt className="text-[#5c5048] dark:text-[#bfb4aa]">Wed – Sun Dinner</dt>
                    <dd className="font-medium">4:30 PM – 9:30 PM</dd>
                  </div>
                  <div className="flex justify-between border-b border-amber-950/10 pb-2.5 dark:border-amber-100/10">
                    <dt className="text-[#5c5048] dark:text-[#bfb4aa]">Sat – Sun Brunch</dt>
                    <dd className="font-medium">9:30 AM – 2:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#5c5048] dark:text-[#bfb4aa]">Location</dt>
                    <dd className="font-medium">Spokane, WA (Concept)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Menu */}
        <section id="menu" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8c431f] dark:text-amber-300">
                  Interactive Menu
                </p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Seasonal Dishes &amp; Drinks
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="tablist"
                  aria-label="Menu categories"
                  className="inline-flex rounded-xl border border-amber-950/15 bg-white p-1 dark:border-amber-100/15 dark:bg-[#191411]"
                >
                  {(
                    [
                      { id: "dinner", label: "Dinner" },
                      { id: "brunch", label: "Brunch" },
                      { id: "drinks", label: "Drinks" },
                    ] as const
                  ).map((tab) => {
                    const active = section === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSection(tab.id)}
                        className={cn(
                          "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                          active
                            ? "bg-[#7c2d12] text-white dark:bg-amber-400 dark:text-[#1c1208]"
                            : "text-[#5c5048] hover:text-[#1f1916] dark:text-[#bfb4aa]"
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-1.5" aria-label="Dietary filters">
                  {(["all", "GF", "Veg", "Local"] as const).map((tag) => {
                    const active = dietaryFilter === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDietaryFilter(tag)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium cursor-pointer",
                          active
                            ? "border-[#7c2d12] bg-[#7c2d12]/10 text-[#7c2d12] dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-200"
                            : "border-amber-950/15 bg-white text-[#5c5048] dark:border-amber-100/15 dark:bg-[#191411] dark:text-[#bfb4aa]"
                        )}
                      >
                        {tag === "all" ? "All Items" : tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {filteredMenu.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-amber-950/10 bg-white p-8 text-center text-sm text-[#5c5048] dark:border-amber-100/15 dark:bg-[#191411] dark:text-[#bfb4aa]">
                No items match that dietary filter in this menu section. Try selecting &ldquo;All Items&rdquo;.
              </div>
            ) : (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {filteredMenu.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-amber-950/10 bg-white p-6 dark:border-amber-100/15 dark:bg-[#191411]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="font-mono text-base font-semibold text-[#7c2d12] dark:text-amber-300">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#5c5048] dark:text-[#bfb4aa]">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-amber-950/5 px-2 py-0.5 font-mono text-[11px] font-medium text-[#7c2d12] dark:bg-amber-400/10 dark:text-amber-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Interactive Reservation Request */}
        <section
          id="reserve"
          className="border-t border-amber-950/10 bg-white/70 py-16 dark:border-amber-100/10 dark:bg-[#16120f]"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-amber-950/15 bg-white p-6 shadow-sm sm:p-8 dark:border-amber-100/15 dark:bg-[#191411]">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8c431f] dark:text-amber-300">
                Interactive Concept Booking
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Request a Table Reservation
              </h2>

              {reservationConfirmed ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-emerald-700/20 bg-emerald-50 p-6 dark:border-emerald-400/25 dark:bg-emerald-950/40"
                >
                  <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-200">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Concept Reservation Preview Confirmed
                  </div>
                  <p className="mt-2 text-sm text-emerald-900/85 dark:text-emerald-100/85">
                    Simulated table hold for{" "}
                    <strong>{guestName || "Guest"}</strong> ({partySize}) on{" "}
                    <strong>{date}</strong> at <strong>{timeSlot}</strong> (
                    {seating}). Because this is a concept demo, no real
                    reservation was placed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setReservationConfirmed(false)}
                    className="mt-4 text-xs font-semibold underline cursor-pointer"
                  >
                    Modify concept booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserve} className="mt-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="res-party" className="block text-xs font-semibold uppercase tracking-wider text-[#5c5048] dark:text-[#bfb4aa]">
                        Party Size
                      </label>
                      <select
                        id="res-party"
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-amber-950/20 bg-[#faf7f2] px-3 py-2.5 text-sm dark:border-amber-100/20 dark:bg-[#120f0d]"
                      >
                        <option>2 Guests</option>
                        <option>4 Guests</option>
                        <option>6 Guests</option>
                        <option>8 Guests (Private Table)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="res-date" className="block text-xs font-semibold uppercase tracking-wider text-[#5c5048] dark:text-[#bfb4aa]">
                        Date
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-amber-950/20 bg-[#faf7f2] px-3 py-2.5 text-sm dark:border-amber-100/20 dark:bg-[#120f0d]"
                      />
                    </div>
                    <div>
                      <label htmlFor="res-seating" className="block text-xs font-semibold uppercase tracking-wider text-[#5c5048] dark:text-[#bfb4aa]">
                        Seating Preference
                      </label>
                      <select
                        id="res-seating"
                        value={seating}
                        onChange={(e) => setSeating(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-amber-950/20 bg-[#faf7f2] px-3 py-2.5 text-sm dark:border-amber-100/20 dark:bg-[#120f0d]"
                      >
                        <option>Main Dining Room</option>
                        <option>Covered Heated Patio</option>
                        <option>Chef&apos;s Counter</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#5c5048] dark:text-[#bfb4aa]">
                      Available Evening Times
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const selected = timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold cursor-pointer",
                              selected
                                ? "border-[#7c2d12] bg-[#7c2d12] text-white dark:border-amber-400 dark:bg-amber-400 dark:text-[#1c1208]"
                                : "border-amber-950/15 bg-[#faf7f2] hover:border-[#7c2d12]/40 dark:border-amber-100/15 dark:bg-[#120f0d]"
                            )}
                          >
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
                    <div>
                      <label htmlFor="res-name" className="block text-xs font-semibold uppercase tracking-wider text-[#5c5048] dark:text-[#bfb4aa]">
                        Guest Name (Demo)
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="mt-1.5 w-full rounded-xl border border-amber-950/20 bg-[#faf7f2] px-3.5 py-2.5 text-sm dark:border-amber-100/20 dark:bg-[#120f0d]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#7c2d12] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9a3412] dark:bg-amber-400 dark:text-[#1c1208] cursor-pointer"
                    >
                      Preview Reservation Hold
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
