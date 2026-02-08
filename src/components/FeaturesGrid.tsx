import FeatureCard from "@/components/FeatureCard";
import { trackFeatureClick } from "@/lib/tracking";
import type { FeatureItem } from "@/types/site";

type FeaturesGridProps = {
  items: FeatureItem[];
};

export default function FeaturesGrid({ items }: FeaturesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} onClick={trackFeatureClick} />
      ))}
    </div>
  );
}
