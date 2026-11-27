import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface ConceptBannerProps {
  conceptName: string;
  industry: string;
}

export function ConceptBanner({ conceptName, industry }: ConceptBannerProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-amber-300/60 bg-amber-50/95 text-amber-950 backdrop-blur-md dark:border-amber-700/50 dark:bg-amber-950/90 dark:text-amber-100">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-900 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-50 dark:bg-amber-400 dark:text-amber-950">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Interactive Concept
          </span>
          <span className="font-medium">
            {conceptName} ({industry})
          </span>
          <span className="hidden text-amber-800/80 dark:text-amber-200/80 md:inline">
            • Fictional sample built by Inland Digital Studio, Spokane WA
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-amber-950 transition-colors hover:bg-amber-200/70 dark:text-amber-100 dark:hover:bg-amber-800/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Studio
          </Link>
          <Link
            href="/?package=professional#inquiry"
            className="inline-flex items-center rounded-lg bg-amber-950 px-3 py-1.5 text-xs font-semibold text-amber-50 transition-opacity hover:opacity-90 dark:bg-amber-200 dark:text-amber-950"
          >
            Request a Site Like This
          </Link>
          <ThemeToggle className="h-8 w-8 border-amber-300 dark:border-amber-700" />
        </div>
      </div>
    </div>
  );
}
