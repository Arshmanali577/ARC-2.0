import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Horizontal page gutter from the design: 56px desktop, 24px at <=900px.
 * Used by every full-width band so the rhythm never drifts.
 */
export const gutter = "px-6 nav:px-14";

type SectionProps = {
  id?: string;
  as?: ElementType;
  className?: string;
  /** Applies the standard page gutter. Turn off for full-bleed bands. */
  padded?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  as: Tag = "section",
  className,
  padded = true,
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(padded && gutter, className)}>
      {children}
    </Tag>
  );
}

/* -- Shared type styles --------------------------------------------------- */

type EyebrowProps = {
  children: ReactNode;
  tone?: "muted" | "light";
  className?: string;
};

/** 11px, 0.28em tracking, uppercase — the small label above every heading. */
export function Eyebrow({
  children,
  tone = "muted",
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.28em]",
        tone === "light" ? "text-mist" : "text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type HeadingProps = {
  children: ReactNode;
  /** Matches the per-section desktop size in the design. */
  size?: 52 | 54;
  className?: string;
};

/** Section H2: Century Gothic / Questrial, 34px mobile → 52–54px desktop. */
export function SectionHeading({
  children,
  size = 52,
  className,
}: HeadingProps) {
  return (
    <h2
      className={cn(
        "m-0 font-display text-[34px] font-normal leading-[1.1] tracking-[-0.02em]",
        size === 54
          ? "nav:text-[54px] nav:leading-[1.08]"
          : "nav:text-[52px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
