import type { ComponentType } from "react";

import { Counter } from "@/components/ui/counter";
import { AwardIcon, DraftIcon, HomeIcon, PinIcon } from "@/components/ui/icon";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { Eyebrow, Section } from "@/components/ui/section";
import { splitWords, wordsClass } from "@/components/ui/split-text";
import { approach } from "@/content/homepage";
import { cn } from "@/lib/cn";

type Glyph = ComponentType<{ className?: string; size?: number }>;

/** Content names a glyph; the drawing itself stays out of the content file. */
const glyphs: Record<string, Glyph> = {
  award: AwardIcon,
  home: HomeIcon,
  pin: PinIcon,
  draft: DraftIcon,
};

/**
 * The band the page opens on under the hero: the statement on the left, the
 * four figures that back it on the right.
 *
 * The figures are a scale rather than four cards — each cell is opened by a
 * hairline down its left edge, which is the same marker the process rail and
 * the enquire band's proof row use, so all three read as one device. Each cell
 * takes the pointer light as you pass over it, so the row answers the cursor
 * without any of the four ever changing colour.
 */
export function Approach() {
  return (
    <Section id="approach" size="default" className="bg-surface">
      <div className="grid grid-cols-1 items-start gap-14 nav:grid-cols-[1fr_1.15fr] nav:gap-16 wide:grid-cols-[1fr_1.25fr] wide:gap-24">
        <div className="reveal-group">
          <Eyebrow tone="gold" withRule as="h2">
            {approach.eyebrow}
          </Eyebrow>

          <p
            className={cn(
              wordsClass.scroll,
              "m-0 mt-7 max-w-[19ch] font-display text-[clamp(28px,8vw,34px)] font-normal leading-[1.14] tracking-[-0.02em] [text-wrap:balance] nav:text-[40px] wide:text-[46px]",
            )}
          >
            {splitWords(approach.heading)}
          </p>

          <p className="m-0 mt-7 max-w-[54ch] text-[17px] leading-[1.75] text-body nav:text-[18px]">
            {approach.body}
          </p>
        </div>

        {/* Two-up on a phone, four across from tablet — a 320px screen with
            four cells side by side is four columns of one word each. */}
        <div className="reveal-group grid grid-cols-2 gap-y-12 tab:grid-cols-4 tab:gap-y-0">
          {approach.figures.map((figure, index) => {
            const Icon = glyphs[figure.icon] ?? HomeIcon;

            return (
              <PointerGlow
                key={figure.label.join(" ")}
                tone="navy"
                className={cn(
                  "px-5 py-2 text-center wide:px-7",
                  // Divided from the second cell on a phone's two-up grid, and
                  // from every cell but the first once they sit in a row.
                  index % 2 === 1 && "border-l border-line",
                  index > 0 && "tab:border-l tab:border-line",
                )}
              >
                {/* The glow is an absolutely positioned sibling, so it paints
                    above anything static beside it. One positioned wrapper puts
                    the whole cell back on top of its own light. */}
                <span className="relative block">
                  <Icon
                    size={30}
                    className="mx-auto text-gold transition-transform duration-500 ease-out group-hover/glow:-translate-y-0.5"
                  />

                  <span
                    className={cn(
                      "mt-5 block text-brand",
                      figure.word
                        ? "text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.06em]"
                        : "font-display text-[clamp(28px,9vw,34px)] font-normal leading-none tracking-[-0.02em] nav:text-[38px]",
                    )}
                  >
                    {figure.word ? (
                      figure.value
                    ) : (
                      <Counter value={figure.value} />
                    )}
                  </span>

                  <span className="mt-4 block text-[12px] font-semibold uppercase leading-[1.6] tracking-[0.16em] text-muted">
                    {figure.label.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
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
