import type { BenefitItem } from "@/types/site";
import { Download, Lock, RefreshCcw, Users, WifiOff, Zap } from "lucide-react";

type BenefitCardProps = {
  benefit: BenefitItem;
};

const iconMap = {
  "wifi-off": WifiOff,
  lock: Lock,
  zap: Zap,
  download: Download,
  users: Users,
  sync: RefreshCcw
};

const iconColorMap = {
  primary: "text-brand-primary",
  success: "text-brand-success",
  warning: "text-brand-warning"
};

const iconBgMap = {
  primary: "bg-brand-primary/10",
  success: "bg-brand-success/10",
  warning: "bg-brand-warning/20"
};

export default function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = iconMap[benefit.icon];
  const tone = benefit.iconColor;

  return (
    <article className="card-base card-hover rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${
          iconBgMap[tone]
        }`}
      >
        <Icon className={`h-6 w-6 ${iconColorMap[tone]}`} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-brand-foreground">{benefit.title}</h3>
      <p className="mt-2 text-base leading-relaxed text-brand-muted">
        {benefit.description}
      </p>
    </article>
  );
}
