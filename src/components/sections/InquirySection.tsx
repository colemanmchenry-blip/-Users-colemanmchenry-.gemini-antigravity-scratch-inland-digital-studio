"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { SERVICE_AREAS, STUDIO_INFO, type PackageId } from "@/data/agency";
import { cn } from "@/lib/utils";

const PACKAGE_OPTIONS: Array<{ id: PackageId; label: string; price: string }> = [
  { id: "starter", label: "Starter Website", price: "$500+" },
  { id: "professional", label: "Professional Website", price: "$850+" },
  { id: "maintenance", label: "Monthly Maintenance", price: "$49+/mo" },
  { id: "custom", label: "Custom / Not Sure", price: "Quote" },
];

interface FormErrors {
  name?: string;
  email?: string;
  businessName?: string;
  message?: string;
  general?: string;
}

function subscribeEmpty(): () => void {
  return () => {};
}

function getPackageFromUrl(): PackageId | null {
  const params = new URLSearchParams(window.location.search);
  const paramPkg = params.get("package") as PackageId | null;
  if (paramPkg && PACKAGE_OPTIONS.some((option) => option.id === paramPkg)) {
    return paramPkg;
  }
  return null;
}

export function InquirySection() {
  const urlPackage = useSyncExternalStore(
    subscribeEmpty,
    getPackageFromUrl,
    () => null
  );
  const [manualPackageId, setManualPackageId] = useState<PackageId | null>(null);
  const packageId: PackageId = manualPackageId ?? urlPackage ?? "professional";
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyFaxTrap, setCompanyFaxTrap] = useState("");
  const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const handleSelectPackage = (event: Event) => {
      const customEvent = event as CustomEvent<PackageId>;
      if (customEvent.detail) {
        setManualPackageId(customEvent.detail);
      }
    };

    window.addEventListener("ids-select-package", handleSelectPackage);
    return () =>
      window.removeEventListener("ids-select-package", handleSelectPackage);
  }, []);

  const validateClient = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (businessName.trim().length < 2) {
      nextErrors.businessName = "Please enter your business or project name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 15) {
      nextErrors.message =
        "Tell us a bit about your business and website goals (at least 15 characters).";
    }
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          businessName,
          email,
          phone,
          packageId,
          message,
          companyFaxTrap,
          formStartedAt,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        referenceId?: string;
        message?: string;
        error?: string;
        fieldErrors?: FormErrors;
      };

      if (!response.ok || !data.ok) {
        setErrors({
          ...(data.fieldErrors ?? {}),
          general: data.error || "Unable to submit right now. Please try again.",
        });
        return;
      }

      setSubmittedResult({
        referenceId: data.referenceId || "IDS-NEW",
        message:
          data.message ||
          "Thank you—your inquiry has been received. We respond within one business day.",
      });
    } catch {
      setErrors({
        general:
          "Network error while sending your inquiry. Please retry or email hello@inlanddigitalstudio.com.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setName("");
    setBusinessName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrors({});
    setFormStartedAt(Date.now());
  };

  return (
    <Section id="inquiry">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Start a Project"
              title="Ready for a website that brings in local leads?"
              description="Share a few details about your Spokane business. You'll receive a clear, zero-pressure recommendation and itemized flat-rate quote within one business day."
            />

            <div className="mt-8 space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Local Spokane Coverage
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {SERVICE_AREAS.join(" • ")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[var(--border-subtle)] pt-4">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Direct Studio Email
                  </p>
                  <a
                    href={`mailto:${STUDIO_INFO.email}`}
                    className="mt-1 inline-block text-sm text-[var(--accent-text)] hover:underline"
                  >
                    {STUDIO_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-8">
              {submittedResult ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-8 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--accent-text)]">
                    Reference: {submittedResult.referenceId}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                    Project Inquiry Received
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
                    {submittedResult.message}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="mt-6"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <span className="block text-sm font-medium text-[var(--text-primary)]">
                      Interested Package
                    </span>
                    <div
                      role="radiogroup"
                      aria-label="Interested Package"
                      className="mt-2.5 grid gap-2.5 sm:grid-cols-2"
                    >
                      {PACKAGE_OPTIONS.map((option) => {
                        const selected = packageId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setManualPackageId(option.id)}
                            className={cn(
                              "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all cursor-pointer",
                              selected
                                ? "border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--text-primary)] ring-1 ring-[var(--accent-primary)]/30"
                                : "border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                            )}
                          >
                            <span className="font-medium">{option.label}</span>
                            <span className="font-mono text-xs text-[var(--accent-text)]">
                              {option.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Honeypot field hidden from screen readers and keyboard users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="companyFaxTrap">Company Fax</label>
                    <input
                      id="companyFaxTrap"
                      name="companyFaxTrap"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={companyFaxTrap}
                      onChange={(e) => setCompanyFaxTrap(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-sm font-medium text-[var(--text-primary)]"
                      >
                        Your Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        placeholder="Jordan Taylor"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                      {errors.name && (
                        <p id="err-name" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-business"
                        className="block text-sm font-medium text-[var(--text-primary)]"
                      >
                        Business Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="inquiry-business"
                        name="businessName"
                        type="text"
                        required
                        autoComplete="organization"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        aria-invalid={Boolean(errors.businessName)}
                        aria-describedby={
                          errors.businessName ? "err-business" : undefined
                        }
                        placeholder="Spokane Valley Plumbing"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                      {errors.businessName && (
                        <p
                          id="err-business"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                        >
                          {errors.businessName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-sm font-medium text-[var(--text-primary)]"
                      >
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        placeholder="you@yourbusiness.com"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                      {errors.email && (
                        <p id="err-email" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-sm font-medium text-[var(--text-primary)]"
                      >
                        Phone <span className="text-xs font-normal text-[var(--text-muted)]">(optional)</span>
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(509) 555-0140"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-sm font-medium text-[var(--text-primary)]"
                    >
                      What does your website need to do?{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      placeholder="Example: We're a Spokane HVAC team needing a clean 4-page site with a service quote form and better Google visibility."
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    />
                    {errors.message && (
                      <p id="err-message" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {errors.general && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200"
                    >
                      {errors.general}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[var(--text-muted)]">
                      No spam or mailing lists—we reply directly within 1 business day.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="sm:w-auto"
                    >
                      {submitting ? "Sending Inquiry..." : "Request Project Quote"}
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
