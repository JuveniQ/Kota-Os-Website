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
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div ref={backgroundRef} className="pointer-events-none absolute inset-0 will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero-bg-mobile.webp" type="image/webp" />
          <source media="(max-width: 767px)" srcSet="/hero-bg-mobile.jpg" type="image/jpeg" />
          <source srcSet="/hero-bg.webp" type="image/webp" />
          <img
            src="/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[72%_center] md:object-right"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        <div className="hero-media-overlay absolute inset-0" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brand-warning/20 blur-3xl" />
      </div>

      <div className="container-wide relative z-10 flex min-h-[calc(100vh-7rem)] items-center py-12">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex animate-float items-center rounded-full border border-brand-primary/35 bg-white/75 px-4 py-2 text-sm font-semibold text-brand-foreground backdrop-blur-sm">
            30-Day Free Trial
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-brand-primary xs:text-5xl md:text-[56px]">
            Your Complete Point-of-Sale System
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-brand-muted md:text-2xl">
            Built for Township Fast-Food Vendors. Fast. Offline. Professional.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-foreground">
            Kota-OS helps you run quicker checkouts, tighter inventory, and clearer reports
            on one reliable platform. Sell confidently with local-first performance while
            commercial plans are being finalized.
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
      </div>
    </section>
  );
}
