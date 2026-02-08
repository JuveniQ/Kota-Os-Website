import type { PricingTier } from "@/types/site";
import { Check } from "lucide-react";
import { trackPricingCTA } from "@/lib/tracking";

type PricingCardProps = {
  tier: PricingTier;
  compact?: boolean;
};

export default function PricingCard({ tier, compact = false }: PricingCardProps) {
  return (
    <article className="relative mx-auto w-full max-w-[420px] rounded-2xl border-2 border-brand-primary bg-white p-8 shadow-warm md:p-10">
      <span className="absolute right-4 top-4 rounded-full bg-brand-success px-3 py-1 text-xs font-semibold text-white">
        {tier.badge}
      </span>
      <h3 className="text-2xl font-bold text-brand-foreground">{tier.title}</h3>
      <p className="mt-4 text-6xl font-extrabold text-brand-primary md:text-7xl">{tier.price}</p>
      <p className="mt-2 text-sm text-brand-muted">{tier.period}</p>
      <p className="mt-4 text-base leading-relaxed text-brand-muted">{tier.description}</p>

      <ul className="mt-6 space-y-3">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-brand-foreground">
            <Check className="mt-[1px] h-4 w-4 text-brand-success" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href="/download"
        className="btn-primary mt-7 w-full"
        onClick={() => trackPricingCTA(compact ? "pricing_page" : "home_pricing")}
      >
        Get License Now
      </a>
      <a href="/download" className="mt-3 block text-center text-sm font-semibold text-brand-primary underline">
        Download Free Trial
      </a>

      <p className="mt-6 text-xs leading-relaxed text-brand-muted">
        {tier.legalNote}{" "}
        <a href="/faq" className="font-semibold text-brand-primary underline">
          View License FAQ
        </a>
      </p>
    </article>
  );
}
