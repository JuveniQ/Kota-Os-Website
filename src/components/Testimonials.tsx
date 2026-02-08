import { Star } from "lucide-react";
import type { Testimonial } from "@/types/site";

type TestimonialsProps = {
  items: Testimonial[];
};

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="card-base rounded-xl p-5 transition duration-300 md:hover:-translate-y-1"
        >
          <div className="mb-2 flex items-center gap-1">
            {Array.from({ length: item.stars }).map((_, index) => (
              <Star
                key={`${item.id}-${index}`}
                className="h-4 w-4 fill-brand-primary text-brand-primary"
                aria-hidden="true"
              />
            ))}
          </div>
          <blockquote className="text-sm italic leading-relaxed text-brand-muted">
            "{item.quote}"
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-brand-foreground">{item.author}</p>
          <p className="text-sm text-brand-muted">{item.role}</p>
        </article>
      ))}
    </div>
  );
}
