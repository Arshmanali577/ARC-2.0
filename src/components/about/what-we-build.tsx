import Link from "next/link";

import { ArrowRight } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { Section, SectionHeader } from "@/components/ui/section";
import { aboutPage } from "@/content/pages";

const { build } = aboutPage;

/**
 * The four things ARC builds, each a plate over a labelled row. Deliberately
 * not `ServiceRows`: that list is the full scope of a service page, and this
 * band is a four-image answer to "what do you actually build" — the detail
 * lives one click away on /residential and /commercial.
 */
export function AboutWhatWeBuild() {
  return (
    <Section size="default">
      <SectionHeader
        eyebrow={build.eyebrow}
        heading={build.heading}
        lead={build.lead}
        action={build.link}
        rule={false}
      />

      <div className="reveal-group mt-14 grid grid-cols-1 gap-5 tab:grid-cols-2 wide:grid-cols-4 wide:gap-6">
        {build.items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group block border border-line-soft bg-white transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-line hover:shadow-plate"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <MediaPlate
                label={item.title}
                tone="plate-2"
                src={item.src}
                alt={item.alt}
                sizes="(max-width: 639px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
              {/* Reads as a drawing frame rather than a shadowed card. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <h3 className="m-0 font-display text-[19px] font-normal leading-[1.2] tracking-[-0.01em] text-brand">
                {item.title}
              </h3>
              <ArrowRight
                size={18}
                className="shrink-0 text-faint transition-[color,transform] duration-300 ease-out group-hover:translate-x-1 group-hover:text-brand"
              />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
