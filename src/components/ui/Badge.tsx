import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "accent" | "concept" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral:
    "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  accent:
    "bg-[var(--accent-soft)] text-[var(--accent-text)] border border-emerald-700/15 dark:border-emerald-400/20",
  concept:
    "bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800/60",
  outline:
    "bg-transparent text-[var(--text-secondary)] border border-[var(--border-strong)]",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
