import type { FeatureItem } from "@/types/site";
import { BarChart3, Check, Package, ShoppingCart } from "lucide-react";

type FeatureCardProps = {
  feature: FeatureItem;
};

const iconMap = {
  "shopping-cart": ShoppingCart,
  package: Package,
  "bar-chart": BarChart3
};

const iconColorMap = {
  primary: "text-brand-primary",
  success: "text-brand-success",
  warning: "text-brand-warning"
};

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon];
  const iconColor = iconColorMap[feature.iconColor];

  return (
    <article className="card-base card-hover rounded-[16px] p-8">
      <Icon className={`mb-5 h-12 w-12 ${iconColor}`} aria-hidden="true" />
      <h3 className="text-[1.5rem] font-bold text-brand-foreground">{feature.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-brand-muted">
        {feature.description}
      </p>
      <ul className="mt-5 space-y-2">
        {feature.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-brand-foreground">
            <Check className="mt-[2px] h-4 w-4 text-brand-success" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
