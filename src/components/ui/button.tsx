import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRight } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/**
 * The button treatments used in the design. Each variant reproduces its
 * source padding, type and hover transition — add a variant here rather than
 * one-off classes in a section.
 */
export type ButtonVariant =
  | "headerSolid" // navy pill in the sticky header
  | "heroSolid" // white block, hero primary
  | "heroOutline" // hairline outline, hero secondary
  | "actionSolid" // white full-width row, enquire band
  | "actionOutline" // outlined full-width row, enquire band
  | "cardSolid" // rounded navy row, foot of a floating card
  | "panelSolid"; // rounded white row, enquire band's consultation panel

const base =
  "group/button relative inline-flex items-center gap-3 transition duration-300 ease-out";

const variants: Record<ButtonVariant, string> = {
  headerSolid:
    "bg-brand px-6 py-[14px] text-[13px] font-medium uppercase tracking-[0.12em] text-white hover:bg-ink",
  heroSolid:
    "bg-white px-8 py-[19px] text-[13px] font-semibold uppercase tracking-[0.12em] text-brand hover:-translate-y-0.5 hover:bg-mist",
  heroOutline:
    "border border-line-invert-hero px-8 py-[19px] text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/12",
  actionSolid:
    "justify-between bg-white px-7 py-[22px] text-[15px] font-semibold tracking-[0.06em] text-brand hover:bg-mist",
  actionOutline:
    "justify-between border border-line-invert-strong px-7 py-[22px] text-[15px] font-medium tracking-[0.06em] text-white hover:border-white hover:bg-white/8",
  // The only rounded button in the set: it closes a rounded card, so a square
  // block would read as a foreign object sitting inside one.
  cardSolid:
    "w-full justify-center rounded-full bg-brand px-7 py-[17px] text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-plate hover:-translate-y-0.5 hover:bg-ink hover:shadow-plate-strong",
  // The enquire panel's primary. Label optically centred with the arrow pinned
  // to the right edge — a `justify-between` row would push the label hard left
  // and leave the button looking unbalanced at full width.
  panelSolid:
    "w-full justify-center rounded-[10px] bg-white px-6 py-[19px] text-[12px] font-semibold uppercase tracking-[0.1em] text-brand hover:-translate-y-0.5 hover:bg-mist [&>svg]:absolute [&>svg]:right-5 tab:px-14 tab:text-[13px] tab:tracking-[0.14em] tab:[&>svg]:right-7",
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
  // A same-page hash has to stay a plain anchor: that is what lets the
  // `scroll-behavior: smooth` set in `globals.css` drive the jump, with no
  // client JavaScript and no router work for a destination already rendered.
  const isPlainAnchor = /^(https?:|tel:|mailto:|#)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight className="transition-transform duration-300 ease-out group-hover/button:translate-x-1" />
      ) : null}
    </>
  );
  const classes = cn(base, variants[variant], className);

  if (isPlainAnchor) {
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
  tone?: "dark" | "light" | "accent";
  /** Trailing arrow that slides on hover. */
  withArrow?: boolean;
  className?: string;
};

/** "All projects" / "More about ARC" — 13px uppercase with a rule under it. */
export function UnderlineLink({
  href,
  children,
  tone = "dark",
  withArrow = false,
  className,
}: UnderlineLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2.5 whitespace-nowrap border-b pb-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-[border-color,opacity,color] duration-300 ease-out",
        tone === "light" && "border-white/50 text-white hover:border-white",
        tone === "dark" && "border-brand text-brand hover:opacity-60",
        // The footer's azure treatment: the rule stays dim until the link is
        // hovered, so a column of suburbs is not competing with its own action.
        tone === "accent" &&
          "border-accent/40 text-accent-soft hover:border-accent-soft hover:text-white",
        className,
      )}
    >
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight className="transition-transform duration-300 ease-out group-hover/link:translate-x-1" />
      ) : null}
    </Link>
  );
}
