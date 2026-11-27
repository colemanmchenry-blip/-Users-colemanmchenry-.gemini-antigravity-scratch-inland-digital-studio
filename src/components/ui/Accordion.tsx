"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)]/50 cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200",
                    isOpen && "rotate-180 text-[var(--accent-text)]"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-200 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
