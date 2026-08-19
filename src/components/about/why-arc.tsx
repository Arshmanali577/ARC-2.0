import type { ComponentType } from "react";

import {
  ClockIcon,
  DraftIcon,
  MailIcon,
  PinIcon,
} from "@/components/ui/icon";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { aboutPage } from "@/content/pages";

const { whyArc } = aboutPage;

type Glyph = ComponentType<{ className?: string; size?: number }>;

const reasonGlyphs: Record<string, Glyph> = {
  tailored: DraftIcon,
  communication: MailIcon,
  onTime: ClockIcon,
  local: PinIcon,
};

/**
 * The closing argument before the enquire band. Positioning on the left, the
 * four reasons on the right as a two-by-two of marked rows — no boxes, so it
 * settles the page down rather than adding a fourth set of cards to it.
 */
export function AboutWhyArc() {
  return (
    <Section size="default" className="bg-surface">
      <div className="grid grid-cols-1 items-start gap-12 nav:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] nav:gap-16 wide:gap-24">
        <div className="reveal-rows">
          <Eyebrow withRule>{whyArc.eyebrow}</Eyebrow>
          <SectionHeading size={54} className="mt-6 max-w-[20ch]">
            {whyArc.heading}
          </SectionHeading>
          <p className="m-0 mt-6 max-w-[46ch] text-[17px] leading-[1.8] text-body tab:mt-7 tab:text-[18px]">
            {whyArc.body}
          </p>
        </div>

        <ul className="reveal-group m-0 grid list-none grid-cols-1 gap-x-12 gap-y-10 p-0 tab:grid-cols-2">
          {whyArc.items.map((item) => {
            const Icon = reasonGlyphs[item.icon] ?? DraftIcon;

            return (
              <li key={item.title} className="group flex items-start gap-5">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-line-soft bg-white text-brand transition-[background-color,color,transform] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-white"
                >
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <h3 className="m-0 text-[17px] font-semibold leading-[1.3] text-brand">
                    {item.title}
                  </h3>
                  <p className="m-0 mt-2.5 text-[16px] leading-[1.7] text-body">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
