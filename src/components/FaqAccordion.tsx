import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { FaqItem } from "@/types/site";
import { trackFaqToggle } from "@/lib/tracking";

type FaqAccordionProps = {
  items: FaqItem[];
  alternatingBackground?: boolean;
};

export default function FaqAccordion({
  items,
  alternatingBackground = true
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border-b border-brand-border last:border-b-0 ${
              alternatingBackground && index % 2 === 1 ? "bg-brand-surface/30" : "bg-white"
            }`}
          >
            <h3>
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between px-4 py-4 text-left text-base font-bold text-brand-foreground md:px-6"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-header-${item.id}`}
                onClick={() => {
                  const nextOpen = !isOpen;
                  setOpenId(nextOpen ? item.id : null);
                  trackFaqToggle(item.id, nextOpen);
                }}
              >
                {item.question}
                <ChevronRight
                  className={`h-5 w-5 text-brand-muted transition-transform duration-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-header-${item.id}`}
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden px-4 pb-4 text-sm leading-8 text-brand-muted md:px-6">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
