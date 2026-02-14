import type { TrustStat } from "@/types/site";

type TrustStatsProps = {
  stats: TrustStat[];
};

export default function TrustStats({ stats }: TrustStatsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {stats.map((stat) => (
        <div key={stat.id}>
          <p
            className={`text-5xl font-extrabold ${
              stat.tone === "success" ? "text-brand-success" : "text-brand-primary"
            }`}
          >
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
