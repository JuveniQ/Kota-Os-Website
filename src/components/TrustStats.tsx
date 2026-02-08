import AnimatedCounter from "@/components/AnimatedCounter";
import type { TrustStat } from "@/types/site";

type TrustStatsProps = {
  stats: TrustStat[];
};

function parseStatValue(value: string) {
  if (value.endsWith("%")) {
    return { number: Number(value.replace("%", "")), suffix: "%" };
  }
  if (value.includes("/")) {
    const [left, right] = value.split("/");
    return { number: Number(left), suffix: `/${right}` };
  }
  if (value.endsWith("+")) {
    return { number: Number(value.replace(/[,+]/g, "")), suffix: "+" };
  }
  return { number: Number(value.replace(/,/g, "")), suffix: "" };
}

export default function TrustStats({ stats }: TrustStatsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {stats.map((stat) => {
        const parsed = parseStatValue(stat.value);
        return (
          <div key={stat.id}>
            <p
              className={`text-5xl font-extrabold ${
                stat.tone === "success" ? "text-brand-success" : "text-brand-primary"
              }`}
            >
              <AnimatedCounter value={parsed.number} suffix={parsed.suffix} />
            </p>
            <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
