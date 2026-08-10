import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The five button treatments used in the design. Each variant reproduces its
 * source padding, type and hover transition exactly — add a variant here
 * rather than one-off classes in a section.
 */
export type ButtonVariant =
  | "headerSolid" // navy pill in the sticky header
  | "heroSolid" // white block, hero primary
  | "heroOutline" // hairline outline, hero secondary
  | "actionSolid" // white full-width row, enquire band
  | "actionOutline"; // outlined full-width row, enquire band

const base =
  "inline-flex items-center transition duration-300 ease-out";

const variants: Record<ButtonVariant, string> = {
  headerSolid:
    "bg-brand px-6 py-[14px] text-[13px] font-medium uppercase tracking-[0.12em] text-white hover:bg-ink",
  heroSolid:
    "bg-white px-8 py-[19px] text-[13px] font-semibold uppercase tracking-[0.12em] text-brand hover:-translate-y-0.5 hover:bg-mist",
  heroOutline:
    "border border-line-invert-hero px-8 py-[19px] text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:border-white hover:bg-white/12",
  actionSolid:
    "justify-between bg-white px-7 py-[22px] text-[15px] font-semibold tracking-[0.06em] text-brand hover:bg-mist",
  actionOutline:
    "justify-between border border-line-invert-strong px-7 py-[22px] text-[15px] font-medium tracking-[0.06em] text-white hover:border-white",
};

type ButtonProps = {
  href: string;
  variant: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** Renders the trailing arrow used by the enquire-band rows. */
  withArrow?: boolean;
};

export function Button({
  href,
  variant,
  children,
  className,
  withArrow,
}: ButtonProps) {
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <span aria-hidden>→</span> : null}
    </>
  );
  const classes = cn(base, variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/* -- Text links ----------------------------------------------------------- */

type UnderlineLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** "All projects →" / "More about ARC →" — 13px uppercase with a rule under it. */
export function UnderlineLink({
  href,
  children,
  tone = "dark",
  className,
}: UnderlineLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block whitespace-nowrap border-b pb-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-[border-color,opacity] duration-300 ease-out",
        tone === "light"
          ? "border-white/50 text-white hover:border-white"
          : "border-brand text-brand hover:opacity-60",
        className,
      )}
    >
      {children}
    </Link>
  );
}
