import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-primary)] text-white dark:text-[#071910] hover:bg-[var(--accent-primary-hover)] shadow-sm",
  secondary:
    "bg-[var(--text-primary)] text-[var(--bg-page)] hover:opacity-90 shadow-sm",
  outline:
    "border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]",
  ghost:
    "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg",
  md: "h-10 px-5 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 cursor-pointer whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
