"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

/**
 * A nav link that knows whether it is the page you are on. Section routes
 * match their children too, so an area or project page still marks its parent
 * in the bar — and `aria-current` carries the same fact to a screen reader.
 */
export function useIsActive(href: string) {
  const pathname = usePathname();
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  label,
  onNavigate,
  variant = "bar",
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  /** `bar` is the desktop row; `stacked` is the mobile panel. */
  variant?: "bar" | "stacked";
}) {
  const active = useIsActive(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "transition-[color,opacity] duration-250 ease-out",
        variant === "bar"
          ? "group/nav relative whitespace-nowrap pb-[3px]"
          : "border-b border-line-soft py-4 text-[14px] font-medium uppercase tracking-[0.08em]",
        variant === "stacked" && (active ? "text-brand" : "text-brand/70"),
        variant === "stacked" && "hover:text-brand",
      )}
    >
      {label}
      {/* The rule under a desktop link is drawn rather than faded in: it wipes
          from the left on hover and stays drawn on the page you are on. Same
          1px hairline in the same place as before — only the way it arrives
          has changed. `scale-x` rather than a width, so it is a compositor
          transform and never touches the row's layout. */}
      {variant === "bar" ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-brand transition-transform duration-300 ease-out",
            active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
          )}
        />
      ) : null}
    </Link>
  );
}
