import type { ReleaseNote } from "@/types/site";

type ReleaseTimelineProps = {
  items: ReleaseNote[];
};

export default function ReleaseTimeline({ items }: ReleaseTimelineProps) {
  return (
    <div className="relative space-y-6">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-brand-border md:block" aria-hidden="true" />
      {items.map((item) => (
        <article
          key={item.version}
          className="relative rounded-2xl border border-brand-border bg-white p-6 shadow-card md:ml-10"
        >
          <span className="absolute -left-[34px] top-8 hidden h-4 w-4 rounded-full bg-brand-primary md:block" />
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-brand-foreground">v{item.version}</h3>
            <span className="rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-muted">
              {item.date}
            </span>
          </div>
          <p className="mt-3 text-base text-brand-muted">{item.summary}</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-brand-foreground">
                Features
              </h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-brand-muted">
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-brand-foreground">
                Fixes
              </h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-brand-muted">
                {item.fixes.map((fix) => (
                  <li key={fix}>{fix}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
