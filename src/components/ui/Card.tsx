import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  highlighted?: boolean;
}

export function Card({
  children,
  className,
  interactive = false,
  highlighted = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-[var(--bg-surface)] p-6 sm:p-8 transition-all duration-200",
        highlighted
          ? "border-[var(--accent-primary)] shadow-md ring-1 ring-[var(--accent-primary)]/20"
          : "border-[var(--border-subtle)] shadow-xs",
        interactive &&
          "hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
