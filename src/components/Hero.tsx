import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { HeroMetric } from "@/types/site";
import { trackHeroCTA } from "@/lib/tracking";

type HeroProps = {
  metrics: HeroMetric[];
};

export default function Hero({ metrics }: HeroProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const updateParallax = () => {
      if (!backgroundRef.current) return;
      const offset = window.scrollY * 0.5;
      backgroundRef.current.style.transform = `translateY(${offset * 0.08}px)`;
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => window.removeEventListener("scroll", updateParallax);
  }, []);

  return (
    <section className="bg-hero-gradient relative min-h-screen overflow-hidden pt-28">
      <div ref={backgroundRef} className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="absolute left-0 top-56 h-72 w-72 rounded-full bg-brand-warning/20 blur-3xl" />
      </div>

      <div className="container-wide relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="grid w-full items-center gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <span className="mb-5 inline-flex animate-float items-center rounded-full border border-brand-primary/30 bg-brand-warning/30 px-4 py-2 text-sm font-semibold text-brand-foreground">
              14-Day Free Trial
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-brand-primary xs:text-5xl md:text-[56px]">
              Your Complete Point-of-Sale System
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-brand-muted md:text-2xl">
              Built for Township Fast-Food Vendors. Fast. Offline. Professional.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-foreground">
              Kota-OS helps you run quicker checkouts, tighter inventory, and clearer reports
              on one reliable platform. Sell confidently with local-first performance and upgrade
              to a secure license when your trial ends.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/download"
                className="btn-primary"
                onClick={() => trackHeroCTA("start_free_trial")}
              >
                Start Your Free Trial
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

            <ul className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-brand-muted md:gap-6">
              {metrics.map((metric) => (
                <li key={metric.label}>
                  <span className="text-brand-foreground">{metric.value}</span> {metric.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:col-span-2 md:block">
            <div className="rounded-3xl border border-brand-border bg-white p-5 shadow-warm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-brand-muted">Kota-OS Live POS</p>
                <span className="rounded-full bg-brand-success/15 px-3 py-1 text-xs font-semibold text-brand-success">
                  Offline Ready
                </span>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl bg-brand-background p-3">
                  <p className="text-xs uppercase tracking-wide text-brand-muted">Current Queue</p>
                  <p className="text-xl font-bold text-brand-foreground">8 Active Orders</p>
                </div>
                <div className="rounded-xl bg-brand-background p-3">
                  <p className="text-xs uppercase tracking-wide text-brand-muted">Avg Checkout</p>
                  <p className="text-xl font-bold text-brand-foreground">00:03 sec</p>
                </div>
                <div className="rounded-xl bg-brand-background p-3">
                  <p className="text-xs uppercase tracking-wide text-brand-muted">Low Stock</p>
                  <p className="text-xl font-bold text-brand-foreground">2 Ingredients</p>
                </div>
              </div>
              <a href="/download" className="btn-primary mt-4 w-full text-center">
                Get License
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
