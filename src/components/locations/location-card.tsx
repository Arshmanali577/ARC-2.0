import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import type { LocalArea } from "@/content/local-areas";
import { locationsPage } from "@/content/pages";
import { cn } from "@/lib/cn";

type LocationCardProps = {
  area: LocalArea;
  /** `feature` lays the card out as a row and takes a landscape crop. */
  variant?: "default" | "feature";
  className?: string;
};

/**
 * One card handles both weights on /locations: the lead area gets the row
 * treatment across the full grid, every other area gets the standard tile.
 * Same hover language as the project cards — lift, navy-cast shadow, image
 * zoom, frame.
 */
export function LocationCard({
  area,
  variant = "default",
  className,
}: LocationCardProps) {
  const isFeature = variant === "feature";

  return (
    <Link
      href={`/locations/${area.slug}`}
      className={cn(
        "group block transition-transform duration-500 ease-out hover:-translate-y-1",
        isFeature &&
          "grid grid-cols-1 items-center gap-9 nav:grid-cols-[1.4fr_1fr] nav:gap-14",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-surface transition-shadow duration-500 ease-out group-hover:shadow-plate">
        <MediaPlate
          label={area.name}
          src={area.heroImage}
          alt={area.title}
          sizes={
            isFeature
              ? "(max-width: 900px) 100vw, 58vw"
              : "(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className={cn(
            "w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]",
            isFeature ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
        />
      </div>

      <div className={cn(!isFeature && "mt-6")}>
        <span className="flex items-center gap-4">
          <span aria-hidden className="h-px w-6 bg-line-strong" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {area.regionLabel}
          </span>
        </span>

        <h2
          className={cn(
            "m-0 mt-4 font-display font-normal leading-[1.15] tracking-[-0.01em]",
            isFeature
              ? "text-[clamp(25px,7vw,30px)] nav:text-[38px]"
              : "text-[24px] nav:text-[26px]",
          )}
        >
          {area.title}
        </h2>

        <p
          className={cn(
            "m-0 mt-4 leading-[1.7] text-body",
            isFeature ? "max-w-[46ch] text-[17px]" : "text-[15px]",
          )}
        >
          {area.intro}
        </p>

        <span className="mt-7 inline-flex items-center gap-2.5 border-b border-brand pb-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand transition-opacity duration-300 ease-out group-hover:opacity-60">
          {locationsPage.viewLabel}
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
