import { MediaPlate } from "@/components/ui/media-plate";
import { Eyebrow, Section } from "@/components/ui/section";
import { testimonial } from "@/content/homepage";

export function Testimonial() {
  return (
    <Section className="pb-[110px]">
      <figure className="m-0 grid grid-cols-1 items-center gap-16 bg-surface p-8 nav:grid-cols-[1.3fr_1fr] nav:p-16">
        <div>
          <Eyebrow>{testimonial.eyebrow}</Eyebrow>
          <blockquote className="m-0 mt-[22px] font-display text-[24px] font-normal leading-[1.4] tracking-[-0.01em] [text-wrap:pretty] nav:text-[32px]">
            {testimonial.quote}
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-4">
            <span aria-hidden className="h-0.5 w-11 bg-brand" />
            <span>
              <span className="block text-[15px] font-semibold">
                {testimonial.author}
              </span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {testimonial.project}
              </span>
            </span>
          </figcaption>
        </div>

        <MediaPlate
          {...testimonial.media}
          sizes="(max-width: 900px) 100vw, 40vw"
          className="h-[400px]"
        />
      </figure>
    </Section>
  );
}
