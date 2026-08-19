import type { ElementType, ReactNode } from "react";

import { UnderlineLink } from "@/components/ui/button";
import { hasWords, splitWords, wordsClass } from "@/components/ui/split-text";
import { cn } from "@/lib/cn";

/**
 * Horizontal page gutter: the design's 56px desktop and 24px phone values,
 * with a 40px step in between so a tablet in portrait is not read at phone
 * margins. Used by every full-width band so the rhythm never drifts.
 */
export const gutter = "px-6 tab:px-10 nav:px-14";

/**
 * Vertical rhythm. `default` is the homepage's band spacing; pages that still
 * carry their own padding simply leave `size` off and nothing changes. Small
 * screens take a shorter band so a phone is not scrolling through 92px of
 * empty space between every section.
 */
const paddings = {
  none: "",
  default: "py-[68px] tab:py-[92px] nav:py-[128px]",
  tight: "py-[56px] tab:py-[72px] nav:py-[96px]",
  open: "py-[80px] tab:py-[110px] nav:py-[152px]",
} as const;

type SectionProps = {
  id?: string;
  as?: ElementType;
  className?: string;
  /** Applies the standard page gutter. Turn off for full-bleed bands. */
  padded?: boolean;
  size?: keyof typeof paddings;
  /** Names the landmark when the band is rendered as `nav` or `aside`. */
  "aria-label"?: string;
  children: ReactNode;
};

export function Section({
  id,
  as: Tag = "section",
  className,
  padded = true,
  size = "none",
  "aria-label": ariaLabel,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(padded && gutter, paddings[size], className)}
    >
      {children}
    </Tag>
  );
}

/* -- Shared type styles --------------------------------------------------- */

type EyebrowProps = {
  children: ReactNode;
  /** `brass` picks the rule out in the journey's stage colour, leaving the
   *  label itself in brand navy — the treatment the portfolio bands open on.
   *  `gold` takes the label into that colour as well: the homepage's own
   *  treatment, where the eyebrow is the only thing labelling a band and has
   *  to carry it on its own. */
  tone?: "muted" | "light" | "brass" | "gold";
  /** Draws the short hairline tick the homepage bands lead with. */
  withRule?: boolean;
  /** Promote to a heading when the eyebrow is what labels a block of content. */
  as?: ElementType;
  className?: string;
};

/** 11px, 0.28em tracking, uppercase — the small label above every heading. */
export function Eyebrow({
  children,
  tone = "muted",
  withRule = false,
  as: Tag = "span",
  className,
}: EyebrowProps) {
  const label = (
    <span
      className={cn(
        "text-[12px] font-semibold uppercase tracking-[0.28em]",
        tone === "light" && "text-mist",
        tone === "muted" && "text-muted",
        tone === "brass" && "text-brand",
        tone === "gold" && "text-gold",
      )}
    >
      {children}
    </span>
  );

  if (!withRule) {
    return <Tag className={cn("m-0 block", className)}>{label}</Tag>;
  }

  return (
    <Tag className={cn("m-0 flex items-center gap-4", className)}>
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "light" && "bg-line-invert-hero",
          tone === "muted" && "bg-line-strong",
          tone === "brass" && "bg-gold",
          tone === "gold" && "bg-gold",
        )}
      />
      {label}
    </Tag>
  );
}

type HeadingProps = {
  children: ReactNode;
  /** Matches the per-section desktop size in the design. */
  size?: 52 | 54;
  /** Turn the word-by-word reveal off where a heading needs to arrive whole. */
  words?: boolean;
  className?: string;
};

/**
 * Section H2: Century Gothic / Questrial, 34px mobile → 52–54px desktop.
 *
 * Every section heading on the site reveals word by word as it is scrolled to,
 * from this one place — so the treatment can never be applied unevenly, and a
 * band that opts out has to say so. A heading built entirely out of elements
 * with no text of its own falls back to the block reveal, because there are no
 * words to walk.
 */
export function SectionHeading({
  children,
  size = 52,
  words = true,
  className,
}: HeadingProps) {
  const split = words && hasWords(children);

  return (
    <h2
      className={cn(
        "m-0 font-display text-[clamp(27px,8vw,34px)] font-normal leading-[1.1] tracking-[-0.02em] [text-wrap:balance]",
        size === 54 ? "nav:text-[54px] nav:leading-[1.08]" : "nav:text-[52px]",
        split && wordsClass.scroll,
        className,
      )}
    >
      {split ? splitWords(children, "scroll") : children}
    </h2>
  );
}

/* -- Section header ------------------------------------------------------- */

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  lead?: string;
  action?: { label: string; href: string };
  tone?: "dark" | "light";
  size?: 52 | 54;
  /** Hairline under the header. Off for bands that open straight into copy. */
  rule?: boolean;
  className?: string;
};

/**
 * Eyebrow → heading → lead, with an optional action on the opposite edge and
 * a closing hairline. Every homepage band opens with this, which is what keeps
 * the vertical rhythm identical from section to section.
 */
export function SectionHeader({
  eyebrow,
  heading,
  lead,
  action,
  tone = "dark",
  size = 54,
  rule = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-9 nav:flex-row nav:items-end nav:gap-16",
        rule && "border-b pb-8",
        rule && (tone === "light" ? "border-line-invert" : "border-line"),
        className,
      )}
    >
      {/* `reveal-group` walks its own children, so every band on the site opens
          in the order it reads — eyebrow, then heading, then lead — from one
          class here rather than a decision taken again in each section. */}
      <div className="reveal-group max-w-[720px]">
        <Eyebrow tone={tone === "light" ? "light" : "muted"} withRule>
          {eyebrow}
        </Eyebrow>
        <SectionHeading size={size} className="mt-6">
          {heading}
        </SectionHeading>
        {lead ? (
          <p
            className={cn(
              "m-0 mt-5 max-w-[620px] text-[17px] leading-[1.75] tab:mt-6 tab:text-[18px]",
              tone === "light" ? "text-mist-deep" : "text-body",
            )}
          >
            {lead}
          </p>
        ) : null}
      </div>

      {action ? (
        <UnderlineLink
          href={action.href}
          tone={tone === "light" ? "light" : "dark"}
          withArrow
          className="reveal-soft shrink-0"
        >
          {action.label}
        </UnderlineLink>
      ) : null}
    </div>
  );
}
