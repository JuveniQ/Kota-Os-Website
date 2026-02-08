import type { StepItem } from "@/types/site";

type HowItWorksTimelineProps = {
  steps: StepItem[];
};

export default function HowItWorksTimeline({ steps }: HowItWorksTimelineProps) {
  return (
    <div className="relative grid gap-6 md:grid-cols-3">
      <div
        className="pointer-events-none absolute left-[16%] top-6 hidden h-[2px] w-[68%] bg-brand-primary md:block"
        aria-hidden="true"
      />

      {steps.map((step) => (
        <article
          key={step.id}
          className="relative rounded-2xl border border-brand-border bg-brand-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
              {step.step}
            </span>
            <h3 className="text-2xl font-bold text-brand-foreground">{step.title}</h3>
          </div>
          <p className="mb-4 text-base leading-relaxed text-brand-muted">{step.description}</p>
          <div className="rounded-xl border border-brand-border bg-white p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              {step.visualTitle}
            </h4>
            <ul className="mt-2 space-y-2 text-sm text-brand-foreground">
              {step.visualPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
