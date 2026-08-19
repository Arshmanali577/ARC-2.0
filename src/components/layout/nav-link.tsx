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
        "transition-[border-color,color] duration-250 ease-out",
        variant === "bar"
          ? "whitespace-nowrap border-b pb-[3px]"
          : "border-b border-line-soft py-4 text-[14px] font-medium uppercase tracking-[0.08em]",
        variant === "bar" && (active ? "border-brand" : "border-transparent hover:border-brand"),
        variant === "stacked" && (active ? "text-brand" : "text-brand/70"),
      )}
    >
      {label}
    </Link>
  );
}
