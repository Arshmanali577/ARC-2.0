import { MediaPlate } from "@/components/ui/media-plate";
import { Section, SectionHeader } from "@/components/ui/section";
import { testimonialSection } from "@/content/homepage";
import { testimonials } from "@/content/testimonials";

const [lead, ...rest] = testimonials;

/**
 * The longest review is set as a full quote against a finished home; the other
 * four sit beneath in a divider grid. Attribution is a rule and a name — no
 * avatars, no cards, nothing that competes with the words.
 */
export function Testimonial() {
  return (
    <Section size="default">
      <SectionHeader
        eyebrow={testimonialSection.eyebrow}
        heading={testimonialSection.heading}
      />

      <figure className="m-0 mt-16 grid grid-cols-1 items-center gap-12 nav:grid-cols-[1fr_1.35fr] nav:gap-16">
        <MediaPlate
          {...testimonialSection.media}
          sizes="(max-width: 900px) 100vw, 40vw"
          className="aspect-[4/5] w-full"
        />

        <div>
          <span aria-hidden className="block h-0.5 w-16 bg-brand" />
          <blockquote className="m-0 mt-9 font-display text-[24px] font-normal leading-[1.4] tracking-[-0.01em] [text-wrap:pretty] nav:text-[32px]">
            “{lead.quote}”
          </blockquote>
          <figcaption className="mt-9 flex items-center gap-4 border-t border-line pt-7">
            <span aria-hidden className="h-0.5 w-11 bg-brand" />
            <span>
              <span className="block text-[16px] font-semibold">
                {lead.name}
              </span>
              <span className="mt-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                {lead.role}
              </span>
            </span>
          </figcaption>
        </div>
      </figure>

      <div className="reveal-group mt-20 grid grid-cols-1 gap-px bg-line-soft tab:grid-cols-2">
        {rest.map((item) => (
          <figure
            key={item.id}
            className="m-0 flex flex-col justify-between gap-8 bg-white px-8 py-10 nav:px-10 nav:py-12"
          >
            <blockquote className="m-0 text-[18px] leading-[1.75] text-body">
              “{item.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <span aria-hidden className="h-0.5 w-11 bg-brand" />
              <span>
                <span className="block text-[16px] font-semibold">
                  {item.name}
                </span>
                <span className="mt-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                  {item.role}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
