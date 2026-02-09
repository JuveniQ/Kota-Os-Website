import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type FocusEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { ScreenshotSlide } from "@/types/site";

type ScreenshotsCarouselProps = {
  slides: ScreenshotSlide[];
};

const AUTOPLAY_DELAY_MS = 5000;

export default function ScreenshotsCarousel({ slides }: ScreenshotsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = slides.length;
  const current = slides[index];

  function next() {
    setIndex((prev) => (prev + 1) % slideCount);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  function handleBlurCapture(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setIsPaused(false);
  }

  useEffect(() => {
    if (index > slideCount - 1) {
      setIndex(0);
    }
  }, [index, slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, slideCount]);

  if (!current) return null;

  return (
    <div
      className="focus-ring rounded-3xl border border-brand-border bg-brand-card p-5 md:p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="App screenshots carousel"
    >
      <div className="grid items-center gap-8 md:grid-cols-[0.9fr,1.1fr]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mx-auto w-full max-w-[320px] rounded-[28px] border border-brand-border bg-white p-3 shadow-card md:max-w-[360px]"
            aria-live="polite"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-full bg-brand-primary/15 px-3 py-1 text-xs font-semibold text-brand-foreground">
                {current.headline}
              </span>
              <span className="text-xs text-brand-muted">Screen {index + 1}/5</span>
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-brand-border bg-brand-background">
              <img
                src={current.imageSrc}
                alt={current.imageAlt}
                className="mx-auto h-[520px] w-full object-contain object-top md:h-[640px]"
                width={360}
                height={640}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.figure>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-copy`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-w-xl"
          >
            <h3 className="text-3xl font-bold text-brand-foreground">{current.headline}</h3>
            <ul className="mt-4 space-y-2 text-base text-brand-muted">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span aria-hidden="true" className="pt-[1px] text-brand-primary">
                    -
                  </span>
                  <span>{point}</span>
                </li>
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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
              aria-label={"Go to " + slide.headline}
              className={
                "focus-ring h-2.5 w-2.5 rounded-full transition " +
                (index === slideIndex ? "bg-brand-primary" : "bg-brand-border")
              }
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
        <p className="text-xs text-brand-muted">
          {isPaused ? "Autoplay paused" : "Auto-slide every 5s"}
        </p>
      </div>
    </div>
  );
}
