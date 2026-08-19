import type { ComponentType } from "react";

import {
  HeadsetIcon,
  HomeIcon,
  PeopleIcon,
  ShieldPriceIcon,
} from "@/components/ui/icon";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { whyArc } from "@/content/homepage";
import { cn } from "@/lib/cn";

type Glyph = ComponentType<{ className?: string; size?: number }>;

/** Content names a glyph; the drawing itself stays out of the content file. */
const glyphs: Record<string, Glyph> = {
  people: PeopleIcon,
  price: ShieldPriceIcon,
  home: HomeIcon,
  service: HeadsetIcon,
};

/**
 * The one navy band on the page, and the only place four reasons are set out
 * side by side.
 *
 * Each cell opens on its numeral in brass with a rule running off to the right
 * of it — a drawn index, not a badge — and closes on the glyph, so the eye
 * enters at the number and leaves at the mark. The cells are divided by
 * hairlines rather than boxed, which is what lets four sit in a row without
 * reading as four cards.
 *
 * The pointer light is what makes the band answer the cursor: a warm pool
 * follows the pointer through whichever cell it is in, and that cell's rule
 * lifts into brass — so the row responds without anything jumping.
 */
export function WhyArc() {
  return (
    <Section
      id="why-arc"
      size="default"
      className="relative overflow-hidden choose-surface text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hatch-dark"
      />

      <div className="relative">
        <div className="reveal-group">
          <Eyebrow tone="gold" withRule>
            {whyArc.eyebrow}
          </Eyebrow>
          <SectionHeading size={52} className="mt-6">
            {whyArc.heading}
          </SectionHeading>
        </div>

        <div className="reveal-group mt-14 grid grid-cols-1 tab:grid-cols-2 nav:mt-16 nav:grid-cols-4">
          {whyArc.reasons.map((reason, index) => {
            const Icon = glyphs[reason.icon] ?? HomeIcon;

            return (
              <PointerGlow
                key={reason.index}
                tone="gold"
                className={cn(
                  "py-9 tab:px-8 tab:py-11 nav:px-9 nav:py-12",
                  // The divider always separates the cells the layout has
                  // actually put beside one another: a rule above each cell
                  // when they are stacked, down the left edge once they are
                  // not. Stated per breakpoint rather than per cell, because
                  // "second in the row" is a different cell at each width.
                  index > 0 && "border-t border-line-invert",
                  index === 1 && "tab:border-t-0 tab:border-l",
                  index === 3 && "tab:border-l",
                  index > 0 && "nav:border-t-0 nav:border-l",
                  // The outermost cells sit on the page gutter, so their own
                  // padding would push them off the measure everything else
                  // on the page is aligned to.
                  "tab:first:pl-0 tab:last:pr-0",
                )}
              >
                <span className="relative flex h-full flex-col">
                  <span className="flex items-center gap-5">
                    <span className="font-display text-[27px] leading-none tracking-[-0.02em] text-gold-soft">
                      {reason.index}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 bg-line-invert transition-colors duration-500 ease-out group-hover/glow:bg-gold"
                    />
                  </span>

                  <h3 className="m-0 mt-7 text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.14em]">
                    {reason.title}
                  </h3>

                  <p className="m-0 mt-4 max-w-[34ch] text-[16px] leading-[1.7] text-mist-deep">
                    {reason.body}
                  </p>

                  {/* Pushed to the foot of the cell so the four marks sit on
                      one line however unevenly the copy above them wraps. The
                      spacing lives on a wrapper, not on the glyph: preflight
                      puts every element in `border-box`, so padding on an
                      `<svg>` sized by its own attributes eats the drawing
                      rather than the box around it. */}
                  <span className="mt-9 block nav:mt-auto nav:pt-12">
                    <Icon
                      size={26}
                      className="text-gold transition-transform duration-500 ease-out group-hover/glow:-translate-y-1"
                    />
                  </span>
                </span>
              </PointerGlow>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
