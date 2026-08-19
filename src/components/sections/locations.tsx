import Link from "next/link";

import { UnderlineLink } from "@/components/ui/button";
import { HomeIcon } from "@/components/ui/icon";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { Eyebrow, Section } from "@/components/ui/section";
import { homeAreaSlugs, locationsSection } from "@/content/homepage";
import { localAreas } from "@/content/local-areas";

const homeAreas = homeAreaSlugs
  .map((slug) => localAreas.find((area) => area.slug === slug))
  .filter((area) => area !== undefined);

/**
 * Eight suburbs as a divider grid: a mark, a name, and nothing else. The
 * question this band answers is "do you build where I live", and the shortest
 * possible answer is the right one — the detail is one click away on the area
 * page itself.
 *
 * The 1px gap over a tinted ground is the same rule-work the rest of the site
 * uses for a grid; the tiles are white so the hairlines read as drawn lines
 * rather than as borders around eight boxes.
 */
export function Locations() {
  return (
    <Section id="locations" size="default">
      <div className="reveal-soft flex flex-col items-start justify-between gap-4 tab:flex-row tab:items-center tab:gap-6">
        <Eyebrow tone="gold" withRule as="h2">
          {locationsSection.eyebrow}
        </Eyebrow>
        <UnderlineLink
          href={locationsSection.link.href}
          tone="quiet"
          withArrow
        >
          {locationsSection.link.label}
        </UnderlineLink>
      </div>

      <div className="reveal-group mt-9 grid grid-cols-2 gap-px bg-line-soft tab:grid-cols-4 nav:mt-11 wide:grid-cols-8">
        {homeAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/locations/${area.slug}`}
            className="group bg-white transition-colors duration-300 ease-out hover:bg-surface"
          >
            <PointerGlow
              tone="navy"
              className="flex h-full flex-col items-center justify-center gap-4 px-4 py-9 text-center nav:py-10"
            >
              <span className="relative flex flex-col items-center gap-4">
                <HomeIcon
                  size={26}
                  className="text-gold transition-transform duration-500 ease-out group-hover:-translate-y-1"
                />
                <span className="text-[15px] font-medium leading-[1.35] text-brand">
                  {area.name}
                </span>
              </span>
            </PointerGlow>
          </Link>
        ))}
      </div>
    </Section>
  );
}
