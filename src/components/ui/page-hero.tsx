import type { ReactNode } from "react";

import { MediaPlate } from "@/components/ui/media-plate";
import { gutter } from "@/components/ui/section";
import { hasWords, splitWords, wordsClass } from "@/components/ui/split-text";
import { cn } from "@/lib/cn";

/**
 * The masthead every internal page opens with. Same navy plate, tint and type
 * scale as the homepage hero, one step down in size so the page H1 never
 * competes with it — and the same entrance: the photograph settles out of a
 * slight overscale while `enter-stagger` walks the copy column, so every
 * internal page opens in the same hand as the homepage.
 *
 * Anything a page passes as `children` — the About page's action, the Contact
 * page's channel tiles — is the last child of that column, so it arrives last
 * without either page having to say so.
 */

const heights = {
  default: "min-h-[440px]",
  tall: "min-h-[540px] nav:min-h-[640px]",
  /* One step beyond `tall`, for a page whose masthead photograph is the
     opening statement rather than a backdrop to the H1. */
  full: "min-h-[560px] nav:min-h-[720px] wide:min-h-[780px]",
} as const;

type PageHeroProps = {
  eyebrow: string;
  /** A node, not a string, so a page can set one word of its H1 apart. */
  heading: ReactNode;
  lead?: string;
  image?: string;
  imageAlt?: string;
  /** Art-direction note shown when no photograph is supplied. */
  mediaLabel?: string;
  /** `object-position` for the photograph, e.g. `"center 15%"`. */
  imagePosition?: string;
  /** `tall` gives the photograph more room on pages that open on a story. */
  size?: keyof typeof heights;
  /** `brass` picks the eyebrow out in the journey's stage colour. */
  eyebrowTone?: "mist" | "brass";
  /** Draws the short brass rule between the H1 and the lead. */
  divider?: boolean;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  heading,
  lead,
  image,
  imageAlt,
  mediaLabel = "ARC BUILDERS",
  imagePosition,
  size = "default",
  eyebrowTone = "mist",
  divider = false,
  children,
  className,
}: PageHeroProps) {
  // A page can pass its H1 as markup — one word in the accent colour, a hard
  // line break — and `splitWords` walks through those, so the reveal survives
  // whatever shape the heading is.
  const splitHeading = hasWords(heading);

  return (
    <section
      className={cn(
        "relative flex flex-col justify-end overflow-hidden",
        heights[size],
        className,
      )}
    >
      {/* MediaPlate owns `relative` for `next/image fill`, so the layer that
          takes it out of flow has to be this wrapper. */}
      <div className="enter-plate absolute inset-0">
        {/* The drift lives on a layer of its own: `enter-plate` animates `scale`
            here on the clock, and two utilities on one element would overwrite
            each other's `animation` rather than compose. */}
        <div className="parallax-plate h-full w-full">
          <MediaPlate
            label={mediaLabel}
            tone="dark"
            src={image}
            alt={imageAlt}
            position={imagePosition}
            priority
            align="end"
            labelPadding={20}
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Same bottom-weighted scrim as the homepage hero and the project
          masthead, so every masthead on the site reads as one treatment. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,26,56,0.94) 0%, rgba(0,26,56,0.76) 28%, rgba(0,43,92,0.4) 62%, rgba(0,43,92,0.18) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(0,26,56,0.58) 0%, rgba(0,26,56,0.1) 54%, transparent 80%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-white/12 nav:inset-7"
      />

      <div
        className={`enter-stagger relative z-10 pb-[52px] pt-[92px] text-white tab:pb-[64px] tab:pt-[112px] ${gutter}`}
      >
        <span className="flex items-center gap-4">
          <span
            aria-hidden
            className={cn(
              "h-px w-10",
              eyebrowTone === "brass" ? "bg-gold-soft/60" : "bg-white/45",
            )}
          />
          <span
            className={cn(
              "text-[12px] font-semibold uppercase tracking-[0.28em]",
              eyebrowTone === "brass" ? "text-gold-soft" : "text-mist",
            )}
          >
            {eyebrow}
          </span>
        </span>

        <h1
          className={cn(
            "m-0 mt-7 max-w-[18ch] font-display text-[clamp(29px,9vw,38px)] font-normal leading-[1.04] tracking-[-0.03em] [text-wrap:balance] nav:text-[54px] wide:text-[68px]",
            splitHeading && wordsClass.enter,
          )}
        >
          {splitHeading ? splitWords(heading, "enter", 120) : heading}
        </h1>

        {divider ? (
          <span aria-hidden className="mt-8 block h-0.5 w-14 bg-gold-soft" />
        ) : null}

        {lead ? (
          <p className="m-0 mt-6 max-w-[56ch] text-[17px] font-light leading-[1.7] text-white/82 tab:mt-7 tab:text-[19px]">
            {lead}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
