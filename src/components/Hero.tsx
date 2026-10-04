import { ArrowRight } from "lucide-react";
import type { HeroMetric } from "@/types/site";
import { trackHeroCTA } from "@/lib/tracking";

type HeroProps = {
  metrics: HeroMetric[];
};

export default function Hero({ metrics }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff9ee] via-white to-[#ffe9cc] pt-28">
      <div className="pointer-events-none absolute -right-20 top-12 h-96 w-96 rounded-full bg-brand-primary/15 blur-3xl" aria-hidden="true" />
      <div className="container-wide relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 py-14 lg:grid-cols-[1.12fr,0.88fr]">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex animate-float items-center rounded-full border border-brand-primary/35 bg-white/75 px-4 py-2 text-sm font-semibold text-brand-foreground backdrop-blur-sm">
            14-Day Free Trial
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-brand-primary xs:text-5xl md:text-[56px]">
            Food operations that work offline
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-brand-muted md:text-2xl">
            Built for food businesses serving customers in Gauteng.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-foreground">
            Track each sale, deduct recipe ingredients, record waste, spot low stock and review your day, even when the connection drops.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/download"
              className="btn-primary"
              onClick={() => trackHeroCTA("start_free_trial")}
            >
              Download for Android
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/#screenshots"
              className="btn-secondary"
              onClick={() => trackHeroCTA("view_demo")}
            >
              View Demo
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-brand-foreground md:gap-4">
            {metrics.map((metric) => (
              <li
                key={metric.label}
                className="rounded-full border border-brand-border/75 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm"
              >
                <span className="text-brand-primary">{metric.value}</span> {metric.label}
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative mx-auto w-full max-w-[250px] lg:max-w-[350px]">
          <div className="rounded-[38px] border-[7px] border-zinc-900 bg-zinc-900 p-2 shadow-[0_24px_64px_rgba(40,26,12,0.26)]">
            <div className="overflow-hidden rounded-[24px] bg-white">
              <img
                src="/20261004-201410.926-8.jpg"
                alt="Kota-OS v1.0.5 home dashboard showing sales, active orders, low-stock status and order actions"
                width={717}
                height={1563}
                className="block h-auto w-full"
                fetchPriority="high"
                loading="eager"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs font-medium text-brand-muted">Kota-OS app dashboard</figcaption>
        </figure>
      </div>
    </section>
  );
}
