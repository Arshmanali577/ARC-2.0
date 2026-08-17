import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { localAreas } from "@/content/local-areas";
import { locationsPage } from "@/content/pages";
import { cn } from "@/lib/cn";

/**
 * Every service area as one scannable register, built from the area names the
 * project already carries. It heads /locations as a fast path for someone who
 * knows their suburb, and repeats at the foot of each area page so a visitor
 * can move sideways without going back — the current area is marked rather
 * than dropped, so the list also shows where they are.
 *
 * Ten cells divide cleanly into two and five, so no breakpoint leaves an
 * orphan in the last row.
 */
export function LocationIndex({
  activeSlug,
  className,
}: {
  activeSlug?: string;
  className?: string;
}) {
  return (
    <Section
      as="nav"
      aria-label={locationsPage.indexLabel}
      size="tight"
      className={cn("bg-surface", className)}
    >
      <ol className="m-0 grid list-none grid-cols-1 gap-px bg-line-soft p-0 tab:grid-cols-2 wide:grid-cols-5">
        {localAreas.map((area) => {
          const isActive = area.slug === activeSlug;

          return (
            <li key={area.slug}>
              <Link
                href={`/locations/${area.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex h-full items-start justify-between gap-4 px-5 py-6 transition-colors duration-300 ease-out nav:px-6",
                  isActive
                    ? "bg-brand text-white"
                    : "bg-surface text-brand hover:bg-white",
                )}
              >
                <span className="font-display text-[17px] leading-[1.25] nav:text-[18px]">
                  {area.name}
                </span>
                <ArrowUpRight
                  size={16}
                  className={cn(
                    "mt-1 shrink-0 transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                    isActive ? "text-mist" : "text-faint group-hover:text-brand",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
