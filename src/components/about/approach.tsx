import { glyphFor } from "@/components/process/stage-glyphs";
import { Button } from "@/components/ui/button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { aboutPage } from "@/content/pages";
import { processStages } from "@/content/process";

const { approach } = aboutPage;

/**
 * The navy band: what happens after the enquiry, in five markers. The stages
 * and their glyphs are read from `process.ts` and `stage-glyphs.ts` rather
 * than restated here, so the About page, the homepage journey and the
 * /process page can never drift apart.
 *
 * The markers run down the column rather than across it. Five of them will not
 * sit in one legible row inside the narrower half of a two-column band — at
 * 1201px that is barely 110px a stage — and turning the connector on its side
 * has the further benefit of reading as the same drawn measure the /process
 * timeline is built on.
 */
export function AboutApproach() {
  return (
    <Section size="default" className="relative bg-brand text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 hatch-dark" />

      <div className="relative grid grid-cols-1 items-start gap-14 nav:grid-cols-[minmax(0,0.95fr)_minmax(0,1.5fr)] nav:gap-16 wide:gap-20">
        <div className="reveal-rows">
          <Eyebrow tone="light" withRule>
            {approach.eyebrow}
          </Eyebrow>
          <SectionHeading size={54} className="mt-6">
            {approach.heading}
          </SectionHeading>
          <p className="m-0 mt-6 max-w-[44ch] text-[17px] leading-[1.75] text-mist-deep tab:mt-7 tab:text-[18px]">
            {approach.lead}
          </p>

          <Button
            href={approach.link.href}
            variant="heroOutline"
            withArrow
            className="mt-10"
          >
            {approach.link.label}
          </Button>
        </div>

        <ol className="reveal-group relative m-0 grid list-none grid-cols-1 gap-0 p-0">
          {processStages.map((step, index) => {
            const Icon = glyphFor(step.id);
            const isLast = index === processStages.length - 1;

            return (
              <li
                key={step.id}
                className={`relative flex gap-4 tab:gap-6 ${isLast ? "pb-0" : "pb-8 tab:pb-9"}`}
              >
                {/* The connector, drawn from the underside of one marker to
                    the top of the next. Not on the last stage, where a rule
                    would run off into the band. */}
                {isLast ? null : (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-6 top-12 border-l border-dashed border-white/25 tab:left-7 tab:top-14"
                  />
                )}

                {/* Filled in the band's own navy so the dashed rule reads as
                    stopping at each marker rather than running under it. */}
                <span
                  aria-hidden
                  className="relative grid size-12 shrink-0 place-items-center rounded-full border border-white/35 bg-brand text-mist tab:size-14"
                >
                  <Icon size={22} />
                </span>

                <div className="pt-1.5">
                  <span className="font-display text-[15px] leading-none tracking-[0.06em] text-white/70">
                    {String(step.id).padStart(2, "0")}
                  </span>

                  <h3 className="m-0 mt-2.5 text-[16px] font-semibold leading-[1.35]">
                    {step.title}
                  </h3>
                  <p className="m-0 mt-2 max-w-[46ch] text-[15px] leading-[1.65] text-mist-deep">
                    {step.summary}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
