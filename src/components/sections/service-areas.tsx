import Link from "next/link";

import { UnderlineLink } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/ui/icon";
import { Eyebrow, Section } from "@/components/ui/section";
import { homeAreaSlugs, serviceAreaSection } from "@/content/homepage";
import { localAreas } from "@/content/local-areas";

const homeAreas = homeAreaSlugs
  .map((slug) => localAreas.find((area) => area.slug === slug))
  .filter((area) => area !== undefined);

/**
 * Each suburb carries the local strength the live homepage lists with it. The
 * divider grid keeps eight entries legible without eight boxes — the hairline
 * between cells is the only separation the layout needs.
 */
export function ServiceAreas() {
  return (
    <Section className="pb-[92px] pt-16 nav:pb-[128px] nav:pt-20">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-6 nav:flex-row nav:items-baseline nav:gap-0">
        <Eyebrow>{serviceAreaSection.eyebrow}</Eyebrow>
        <UnderlineLink href={serviceAreaSection.link.href} withArrow>
          {serviceAreaSection.link.label}
        </UnderlineLink>
      </div>

      <div className="reveal-group mt-px grid grid-cols-1 gap-px bg-line-soft tab:grid-cols-2 wide:grid-cols-4">
        {homeAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/locations/${area.slug}`}
            className="group flex flex-col justify-between gap-8 bg-white px-7 py-9 transition-colors duration-300 ease-out hover:bg-surface"
          >
            <div>
              <h3 className="m-0 font-display text-[22px] font-normal leading-[1.2]">
                {area.name}
              </h3>
              <p className="m-0 mt-3 text-[14px] leading-[1.6] text-body">
                {area.strengths[0]}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="text-faint transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
