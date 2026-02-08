import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ScreenshotSlide } from "@/types/site";

type ScreenshotsCarouselProps = {
  slides: ScreenshotSlide[];
};

export default function ScreenshotsCarousel({ slides }: ScreenshotsCarouselProps) {
  const [index, setIndex] = useState(0);

  const current = slides[index];

  function next() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slides.length]);

  return (
    <div className="rounded-3xl border border-brand-border bg-brand-card p-5 md:p-8">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto w-full max-w-[420px] rounded-2xl border border-brand-border bg-white p-4 shadow-card"
            aria-live="polite"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-foreground">
                {current.headline}
              </span>
              <span className="text-xs text-brand-muted">Screen {index + 1}/5</span>
            </div>
            <div className="grid gap-3">
              {current.visualKpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-brand-border bg-brand-background p-3"
                >
                  <p className="text-xs uppercase tracking-wide text-brand-muted">{kpi.label}</p>
                  <p className="mt-1 text-xl font-bold text-brand-foreground">{kpi.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-copy`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text-3xl font-bold text-brand-foreground">{current.headline}</h3>
            <ul className="mt-4 space-y-2 text-base text-brand-muted">
              {current.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
            {current.cta ? (
              <a href="/download" className="btn-primary mt-6" aria-label={current.cta}>
                {current.cta}
              </a>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-foreground hover:bg-brand-background"
            onClick={prev}
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-foreground hover:bg-brand-background"
            onClick={next}
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2" role="tablist" aria-label="Screenshots">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === slideIndex}
              aria-label={`Go to ${slide.headline}`}
              className={`focus-ring h-2.5 w-2.5 rounded-full transition ${
                index === slideIndex ? "bg-brand-primary" : "bg-brand-border"
              }`}
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
