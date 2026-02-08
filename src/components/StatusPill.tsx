type StatusPillProps = {
  label: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
  className?: string;
};

const toneClasses = {
  success: "bg-brand-success/10 text-brand-success border-brand-success/30",
  warning: "bg-brand-warning/20 text-brand-foreground border-brand-warning/30",
  danger: "bg-brand-destructive/10 text-brand-destructive border-brand-destructive/30",
  info: "bg-brand-info/15 text-brand-foreground border-brand-info/35",
  neutral: "bg-brand-surface text-brand-muted border-brand-border"
};

export default function StatusPill({
  label,
  tone = "neutral",
  className
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        toneClasses[tone]
      } ${className ?? ""}`}
    >
      {label}
    </span>
  );
}
