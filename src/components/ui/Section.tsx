import React from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  subtle = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  subtle?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 scroll-mt-20",
        subtle && "bg-[var(--bg-subtle)]/60 border-y border-[var(--border-subtle)]",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
