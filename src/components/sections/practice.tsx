import { MediaPlate } from "@/components/ui/media-plate";
import { Section, SectionHeader } from "@/components/ui/section";
import { pillars, practice } from "@/content/homepage";

/**
 * The navy band. A tall portrait on the left, the write-up on the right, and
 * the four capabilities beneath as a divider grid — the 1px gap over a
 * translucent ground is the same rule work used across the design.
 */
export function Practice() {
  return (
    <Section id="studio" size="default" className="relative bg-brand text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 hatch-dark" />

      <div className="relative">
        <SectionHeader
          eyebrow={practice.eyebrow}
          heading={practice.heading}
          tone="light"
          action={practice.link}
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-12 nav:grid-cols-[1fr_1.25fr] nav:gap-16">
          {/* The portrait tracks the write-up rather than leaving a column of
              dead navy beside it. Positioning lives on the wrapper — MediaPlate
              keeps `relative` for `next/image fill`. */}
          <div className="nav:sticky nav:top-[120px]">
            <MediaPlate
              {...practice.media}
              sizes="(max-width: 900px) 100vw, 42vw"
              className="reveal-plate aspect-[4/5] w-full"
            />
          </div>

          <div>
            <p className="reveal-soft m-0 text-[21px] font-light leading-[1.65] text-white/92">
              {practice.lead}
            </p>
            {practice.body.map((paragraph) => (
              <p
                key={paragraph}
                className="reveal-soft m-0 mt-6 text-[18px] leading-[1.75] text-mist-deep"
              >
                {paragraph}
              </p>
            ))}

            <div className="reveal-group mt-12 grid grid-cols-1 gap-px bg-line-invert-soft tab:grid-cols-2">
              {pillars.map((pillar) => (
                <div key={pillar.index} className="bg-brand px-7 py-8">
                  <div className="flex items-center gap-3.5">
                    <span className="text-[12px] font-semibold tracking-[0.16em] text-mist">
                      {pillar.index}
                    </span>
                    <span aria-hidden className="h-px w-6 bg-line-invert-strong" />
                  </div>
                  <h3 className="m-0 mt-5 text-[18px] font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="m-0 mt-2.5 text-[16px] leading-[1.6] text-mist-deep">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="reveal-soft m-0 mt-10 border-t border-line-invert pt-8 text-[16px] leading-[1.75] text-mist-deep">
              {practice.note}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
