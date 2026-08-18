import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * A footer column: the 11px uppercase label the rest of the site uses for an
 * eyebrow, sitting over a short azure rule, then the column's content.
 *
 * The rule is two elements rather than a border so the accent can fade out
 * along its length — the same "lit edge" treatment as the full-width dividers,
 * scaled down to 32px.
 */

type FooterColumnProps = {
  title: string;
  /** Ties the column's list to its heading for assistive technology. */
  id: string;
  className?: string;
  children: ReactNode;
};

export function FooterColumn({
  title,
  id,
  className,
  children,
}: FooterColumnProps) {
  return (
    <div className={cn("relative", className)}>
      <h2
        id={id}
        className="m-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-white"
      >
        {title}
      </h2>
      <span
        aria-hidden
        className="mt-[18px] block h-px w-8 bg-linear-to-r from-accent-soft to-accent/0"
      />
      <div className="mt-[26px]">{children}</div>
    </div>
  );
}
