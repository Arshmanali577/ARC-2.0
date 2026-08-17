import type { ReactNode } from "react";

import { MediaPlate } from "@/components/ui/media-plate";
import { gutter } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * The masthead every internal page opens with. Same navy plate, tint and type
 * scale as the homepage hero, one step down in size so the page H1 never
 * competes with it.
 */

const heights = {
  default: "min-h-[440px]",
  tall: "min-h-[540px] nav:min-h-[640px]",
} as const;

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  /** Art-direction note shown when no photograph is supplied. */
  mediaLabel?: string;
  /** `tall` gives the photograph more room on pages that open on a story. */
  size?: keyof typeof heights;
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
  size = "default",
  children,
  className,
}: PageHeroProps) {
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
      <div className="absolute inset-0">
        <MediaPlate
          label={mediaLabel}
          tone="dark"
          src={image}
          alt={imageAlt}
          priority
          align="end"
          labelPadding={20}
          sizes="100vw"
          className="h-full w-full"
        />
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

      <div className={`relative z-10 pb-[64px] pt-[112px] text-white ${gutter}`}>
        <span className="flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-white/45" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mist">
            {eyebrow}
          </span>
        </span>

        <h1 className="m-0 mt-7 max-w-[18ch] font-display text-[clamp(29px,9vw,38px)] font-normal leading-[1.04] tracking-[-0.03em] [text-wrap:balance] nav:text-[54px] wide:text-[68px]">
          {heading}
        </h1>

        {lead ? (
          <p className="m-0 mt-7 max-w-[56ch] text-[18px] font-light leading-[1.7] text-white/82">
            {lead}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
