import Link from "next/link";
import type { ReactNode } from "react";

/**
 * An icon + label row in a footer column.
 *
 * Three things move on hover, all of them cheap: the label lifts to white, the
 * rule under it wipes in from the left, and the glyph scales a touch and takes
 * on the accent glow. Everything is a transition on a `group`, so the column
 * stays a Server Component.
 */

type FooterLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export function FooterLink({ href, icon, children }: FooterLinkProps) {
  const isExternal = /^(tel:|mailto:|https?:)/.test(href);

  const content = (
    <>
      <span className="mt-px text-accent transition-[color,transform,filter] duration-300 ease-out group-hover:scale-110 group-hover:text-accent-soft group-hover:glow-accent">
        {icon}
      </span>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 block h-px w-full origin-left scale-x-0 bg-linear-to-r from-accent-soft to-accent/0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
    </>
  );

  const className =
    "group flex w-fit items-start gap-3.5 py-[7px] text-[16px] leading-[1.5] transition-colors duration-300 ease-out hover:text-white";

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** The same row without a destination — the postal address. */
export function FooterFact({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5 py-[7px] text-[16px] leading-[1.5]">
      <span className="mt-px text-accent">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
