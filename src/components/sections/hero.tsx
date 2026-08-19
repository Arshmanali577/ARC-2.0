import { Button } from "@/components/ui/button";
import { ArrowDown } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaPlate } from "@/components/ui/media-plate";
import { splitWords, wordsClass } from "@/components/ui/split-text";
import { gutter } from "@/components/ui/section";
import { hero } from "@/content/homepage";

/**
 * The hero is one photograph, one statement and two actions, composed on the
 * page grid: copy sits on the lower-left, the credit line and the licence sit
 * on the baseline rail, and a hairline frame holds the whole thing together.
 * The scroll cue is deliberate — the design brief asks the first viewport to
 * show that more follows.
 *
 * This is one of the two places on the site that animates on the clock rather
 * than off the scroll position: the hero is already on screen when the page
 * paints, so a `view()` timeline would resolve straight to its end state and
 * nothing would move. `enter-stagger` walks the copy column's own children, so
 * the hero states itself in the order it reads — eyebrow, heading, lead,
 * actions, rail — and the whole run is over inside a second.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[660px] flex-col overflow-hidden nav:min-h-[calc(100svh-92px)] nav:max-h-[1000px]">
      {/* MediaPlate owns `relative` for `next/image fill`, so the layer that
          takes it out of flow has to be this wrapper. */}
      <div className="enter-plate absolute inset-0">
        {/* The drift lives on a layer of its own: `enter-plate` animates `scale`
            here on the clock, and two utilities on one element would overwrite
            each other's `animation` rather than compose. */}
        <div className="parallax-plate h-full w-full">
          <MediaPlate
            {...hero.media}
            priority
            align="end"
            labelPadding={20}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Bottom-weighted scrim: the copy clears AA contrast without the
          photograph disappearing into a dark crop. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,26,56,0.94) 0%, rgba(0,26,56,0.78) 26%, rgba(0,43,92,0.42) 58%, rgba(0,43,92,0.18) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(0,26,56,0.62) 0%, rgba(0,26,56,0.12) 52%, transparent 78%)",
        }}
      />

      {/* Drawing frame, set inside the page gutter so the copy never touches it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-white/12 nav:inset-7"
      />

      <div
        className={`enter-stagger relative z-10 mt-auto pb-11 pt-[140px] ${gutter}`}
      >
        <span className="flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-white/45" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-mist">
            {hero.eyebrow}
          </span>
        </span>

        {/* The one line the whole page is built around, so it is written
            rather than faded: each word arrives in reading order, starting
            after the eyebrow has landed. */}
        <h1
          className={`${wordsClass.enter} m-0 mt-8 max-w-[15ch] font-display text-[clamp(34px,11vw,46px)] font-normal leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance] nav:text-[62px] wide:text-[86px]`}
        >
          {splitWords(hero.heading, "enter", 120)}
        </h1>

        <p className="m-0 mt-8 max-w-[52ch] text-[20px] font-light leading-[1.7] text-white/82">
          {hero.body}
        </p>

        {/* Only the primary leans towards the cursor. Two magnetic buttons
            side by side fight each other for the pointer; one states which
            action the page is actually asking for. */}
        <div className="mt-11 flex flex-col items-stretch gap-3 nav:flex-row nav:items-center nav:gap-4">
          <Magnetic className="justify-center nav:justify-start">
            <Button
              href={hero.primaryCta.href}
              variant="heroSolid"
              className="w-full justify-center nav:w-auto nav:justify-start"
              withArrow
            >
              {hero.primaryCta.label}
            </Button>
          </Magnetic>
          <Button
            href={hero.secondaryCta.href}
            variant="heroOutline"
            className="justify-center nav:justify-start"
          >
            {hero.secondaryCta.label}
          </Button>
        </div>

        {/* Baseline rail: the scroll cue on one edge, the photograph's credit
            on the other — both sitting on the same hairline. */}
        <div className="mt-14 flex items-center gap-5 border-t border-white/20 pt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">
          <ArrowDown size={14} />
          <span>Scroll</span>
          <span aria-hidden className="h-px flex-1 bg-white/12" />
          <span className="hidden tracking-[0.14em] text-mist nav:inline">
            {hero.media.label}
          </span>
        </div>
      </div>
    </section>
  );
}
