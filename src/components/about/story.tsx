import type { ComponentType } from "react";

import {
  BuildingIcon,
  CalendarIcon,
  PinIcon,
  ShieldCheckIcon,
} from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { Section, SectionHeading } from "@/components/ui/section";
import { aboutPage } from "@/content/pages";

const { story } = aboutPage;

type Glyph = ComponentType<{ className?: string; size?: number }>;

/** Content names a glyph; the drawing itself stays out of the content file. */
const statGlyphs: Record<string, Glyph> = {
  experience: CalendarIcon,
  projects: BuildingIcon,
  areas: PinIcon,
  licence: ShieldCheckIcon,
};

/**
 * The company statement. Copy on the left signed off the way a letter from the
 * office would be; the photograph on the right with the figures stepped over
 * its foot on a navy plate, so the claim and the evidence for it read as one
 * object rather than as a separate band of statistics.
 *
 * The overlap only exists from 640px up — below that the panel simply follows
 * the photograph, because a 40% overlap on a phone eats the image.
 */
export function AboutStory() {
  return (
    <Section size="default">
      <div className="grid grid-cols-1 items-center gap-14 nav:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] nav:gap-20 wide:gap-24">
        <div>
          <SectionHeading size={54} className="max-w-[18ch]">
            {story.heading}
          </SectionHeading>

          {/* The drawn rule the design opens a statement with. */}
          <span aria-hidden className="mt-8 block h-0.5 w-14 bg-brand" />

          {story.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "m-0 mt-9 max-w-[58ch] text-[20px] font-light leading-[1.7]"
                  : "m-0 mt-6 max-w-[62ch] text-[17px] leading-[1.8] text-body"
              }
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-11 border-t border-line pt-8">
            <p className="m-0 font-display text-[21px] leading-[1.2] text-brand">
              {story.signature.name}
            </p>
            <p className="m-0 mt-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
              {story.signature.note}
            </p>
          </div>
        </div>

        <div>
          <MediaPlate
            label={story.media.label}
            tone="plate-1"
            src={story.media.src}
            alt={story.media.alt}
            sizes="(max-width: 900px) 100vw, 52vw"
            className="aspect-[4/3] w-full"
          />

          {/* Stepped over the photograph rather than butted under it. The 1px
              gaps over a translucent ground are the same divider grid the navy
              bands elsewhere on the site use. */}
          <div className="reveal-group relative grid grid-cols-2 gap-px bg-line-invert-soft tab:-mt-14 wide:grid-cols-4 wide:-mt-16">
            {story.stats.map((stat) => {
              const Icon = statGlyphs[stat.icon] ?? CalendarIcon;

              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center bg-brand px-4 py-8 text-center text-white nav:px-5 nav:py-10"
                >
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center rounded-full border border-white/30 text-mist"
                  >
                    <Icon size={19} />
                  </span>
                  <span className="mt-5 font-display text-[27px] leading-none nav:text-[31px]">
                    {stat.value}
                  </span>
                  <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-deep">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
