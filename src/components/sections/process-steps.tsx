import { UnderlineLink } from "@/components/ui/button";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { glyphFor } from "@/components/process/stage-glyphs";
import { Eyebrow, Section } from "@/components/ui/section";
import { processSection } from "@/content/homepage";
import { processStages } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * The five stages as one line across the page: the glyph, the rule that
 * carries the eye to the next glyph, then the number, the stage and one line
 * of what happens in it.
 *
 * Deliberately not the /contact band, which draws the same five stages as
 * numbered discs on a photograph. This is the flattest of the three
 * treatments, because on the homepage the journey is a caption under the
 * portfolio rather than the subject of the page.
 *
 * The connector is drawn per cell rather than as one rule across the row, so
 * it wraps with the stages instead of running through them at every width, and
 * the last stage simply has nothing to its right.
 */
export function ProcessSteps() {
  return (
    <Section id="process" size="default" className="bg-surface">
      <div className="reveal-soft flex items-center justify-between gap-6">
        <Eyebrow tone="gold" withRule as="h2">
          {processSection.eyebrow}
        </Eyebrow>
        <UnderlineLink
          href={processSection.link.href}
          tone="quiet"
          withArrow
          className="hidden tab:inline-flex"
        >
          {processSection.link.label}
        </UnderlineLink>
      </div>

      <ol className="reveal-rows m-0 mt-12 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 tab:grid-cols-3 nav:mt-14 nav:grid-cols-5 nav:gap-x-10">
        {processStages.map((stage, index) => {
          const Icon = glyphFor(stage.id);

          return (
            <li key={stage.id}>
              <PointerGlow tone="navy" className="h-full">
                <div className="relative">
                  <div className="flex items-center gap-5">
                    <Icon
                      size={34}
                      className="shrink-0 text-gold transition-transform duration-500 ease-out group-hover/glow:-translate-y-1"
                    />
                    {/* Runs to the next glyph. Off on the last cell of each
                        row, where there is nothing for it to reach. */}
                    <span
                      aria-hidden
                      className={cn(
                        "hidden h-px flex-1 bg-line transition-colors duration-500 ease-out group-hover/glow:bg-gold tab:block",
                        index % 3 === 2 && "tab:hidden nav:block",
                        index === processStages.length - 1 && "nav:hidden",
                      )}
                    />
                  </div>

                  <p className="m-0 mt-7 text-[12px] font-semibold tracking-[0.16em] text-faint">
                    {String(stage.id).padStart(2, "0")}
                  </p>

                  <h3 className="m-0 mt-3 font-display text-[22px] font-normal leading-[1.15] nav:text-[23px]">
                    {stage.title}
                  </h3>

                  <p className="m-0 mt-3 max-w-[30ch] text-[16px] leading-[1.65] text-body nav:text-[15px]">
                    {stage.summary}
                  </p>
                </div>
              </PointerGlow>
            </li>
          );
        })}
      </ol>

      <div className="reveal-soft mt-12 flex tab:hidden">
        <UnderlineLink href={processSection.link.href} tone="quiet" withArrow>
          {processSection.link.label}
        </UnderlineLink>
      </div>
    </Section>
  );
}
