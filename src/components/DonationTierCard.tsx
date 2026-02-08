import type { DonationTier } from "@/types/site";

type DonationTierCardProps = {
  tier: DonationTier;
};

export default function DonationTierCard({ tier }: DonationTierCardProps) {
  return (
    <article className="card-base card-hover rounded-2xl p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
        {tier.title}
      </p>
      <p className="mt-2 text-4xl font-extrabold text-brand-primary">{tier.amount}</p>
      <p className="mt-3 text-base text-brand-muted">{tier.description}</p>
      <a href="/contact" className="btn-primary mt-5 w-full">
        Support at {tier.amount}
      </a>
    </article>
  );
}
