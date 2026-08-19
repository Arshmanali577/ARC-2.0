import Link from "next/link";

import { ArrowRight } from "@/components/ui/icon";
import type { Service } from "@/content/services";

/**
 * The design's row list: index, title, description, arrow. Used for the four
 * services on the homepage and the full lists on /residential and /commercial.
 * The row is a rule that the pointer walks down, not a card.
 */
export function ServiceRows({
  services,
  /** Anchors the row so the footer's deep links land on it. */
  withAnchors = false,
  /**
   * The rows sit under a section heading on the homepage, but they are the
   * page's top-level content on /residential and /commercial — so the level
   * has to follow the page, or the outline skips from h1 to h3.
   */
  headingLevel = 3,
  /**
   * The service pages drop the arrow: every row there is a link already, and a
   * column of ten identical arrows reads as chrome rather than as an affordance.
   */
  showArrow = true,
}: {
  services: Service[];
  withAnchors?: boolean;
  headingLevel?: 2 | 3;
  showArrow?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="reveal-group border-t border-line">
      {services.map((service, index) => (
        <Link
          key={service.id}
          id={withAnchors ? service.anchor : undefined}
          href={service.href}
          className={`group relative grid scroll-mt-28 grid-cols-1 items-baseline gap-4 border-b border-line py-9 transition-colors duration-500 ease-out hover:border-brand nav:items-center nav:gap-12 nav:py-10 ${
            showArrow
              ? "nav:grid-cols-[64px_minmax(220px,1fr)_1.5fr_auto]"
              : "nav:grid-cols-[64px_minmax(220px,1fr)_1.5fr]"
          }`}
        >
          {/* Fills from the left on hover — a rule being drawn, not a wash. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
          />

          <span className="text-[12px] font-semibold tracking-[0.16em] text-faint transition-colors duration-300 ease-out group-hover:text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>

          <Heading className="m-0 font-display text-[28px] font-normal leading-[1.15] transition-transform duration-500 ease-out nav:text-[30px] nav:group-hover:translate-x-1">
            {service.title}
          </Heading>

          <p className="m-0 max-w-[52ch] text-[17px] leading-[1.65] text-body">
            {service.description}
          </p>

          {showArrow ? (
            <span className="flex h-11 w-11 items-center justify-center border border-line text-brand transition-colors duration-300 ease-out group-hover:border-brand group-hover:bg-brand group-hover:text-white nav:justify-self-end">
              <ArrowRight size={18} />
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
