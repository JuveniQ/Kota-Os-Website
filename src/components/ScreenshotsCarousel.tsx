import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useEffect,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent
} from "react";
import type { ScreenshotSlide } from "@/types/site";

type ScreenshotsCarouselProps = {
  slides: ScreenshotSlide[];
};

const AUTOPLAY_DELAY_MS = 5000;
const TRANSITION_MS = 260;

export default function ScreenshotsCarousel({ slides }: ScreenshotsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slideCount = slides.length;
  const current = slides[index];

  function setSlide(nextIndex: number) {
    if (!slideCount) return;
    const normalized = ((nextIndex % slideCount) + slideCount) % slideCount;
    if (normalized === index) return;
    setIsTransitioning(true);
    setIndex(normalized);
  }

  function next() {
    setSlide(index + 1);
  }

  function prev() {
    setSlide(index - 1);
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
      setSlide(index + 1);
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [index, isPaused, slideCount]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = window.setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [index, isTransitioning]);

  useEffect(() => {
    if (!slideCount) return;
    [index, (index + 1) % slideCount, (index - 1 + slideCount) % slideCount].forEach((slideIndex) => {
      const image = new Image();
      image.src = slides[slideIndex].imageSrc;
    });
  }, [index, slideCount, slides]);

  if (!current) return null;

  const transitionClass =
    "transition-all duration-300 ease-out " +
    (isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0");

  return (
    <div
      className="focus-ring rounded-3xl border border-brand-border bg-brand-card p-4 md:p-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="App screenshots carousel"
    >
      <div className="grid items-center gap-6 md:grid-cols-[0.82fr,1.18fr] lg:gap-8">
        <figure
          className={
            "mx-auto w-full max-w-[232px] rounded-[34px] border border-zinc-800 bg-zinc-950 p-2 " +
            "shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:max-w-[248px] md:max-w-[260px] " +
            transitionClass
          }
          aria-live="polite"
        >
          <div className="relative mb-2.5 overflow-hidden rounded-[26px] border border-zinc-700/70 bg-zinc-900 p-2.5">
            <div className="mx-auto mb-2.5 h-5 w-24 rounded-full bg-zinc-800" aria-hidden="true" />
            <div className="absolute left-1.5 top-20 h-10 w-1 rounded-full bg-zinc-700/80" aria-hidden="true" />
            <div className="absolute left-1.5 top-32 h-14 w-1 rounded-full bg-zinc-700/80" aria-hidden="true" />
            <div className="absolute right-1.5 top-24 h-16 w-1 rounded-full bg-zinc-700/80" aria-hidden="true" />

            <div className="mb-2.5 flex items-center justify-between gap-2 px-0.5">
              <span className="rounded-full bg-brand-primary/15 px-3 py-1 text-[10px] font-semibold text-brand-background">
                {current.headline}
              </span>
              <span className="text-[10px] text-zinc-300">Screen {index + 1}/{slideCount}</span>
            </div>

            <div className="relative overflow-hidden rounded-[20px] border border-brand-border/70 bg-brand-background">
              <img
                src={current.imageSrc}
                alt={current.imageAlt}
                className="mx-auto h-[300px] w-full object-contain object-top sm:h-[330px] md:h-[350px]"
                width={360}
                height={640}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </figure>

        <div className={`max-w-xl ${transitionClass}`}>
          <h3 className="text-2xl font-bold text-brand-foreground md:text-3xl">{current.headline}</h3>
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
        </div>
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
              onClick={() => setSlide(slideIndex)}
            />
          ))}
        </div>
        <p className="text-xs text-brand-muted">{isPaused ? "Autoplay paused" : "Auto-slide every 5s"}</p>
      </div>
    </div>
  );
}
