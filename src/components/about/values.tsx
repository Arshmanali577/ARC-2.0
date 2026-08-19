import type { ComponentType } from "react";

import {
  AwardIcon,
  GemIcon,
  PeopleIcon,
  ShieldPriceIcon,
} from "@/components/ui/icon";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { aboutPage } from "@/content/pages";

const { values } = aboutPage;

type Glyph = ComponentType<{ className?: string; size?: number }>;

const valueGlyphs: Record<string, Glyph> = {
  transparency: ShieldPriceIcon,
  detail: GemIcon,
  client: PeopleIcon,
  excellence: AwardIcon,
};

/**
 * The four values. The heading holds its own column so the cards beside it
 * read as the answer to it, and each card is the same white plate the feature
 * row on a project page uses — one card treatment across the whole site.
 */
export function AboutValues() {
  return (
    <Section size="default" className="bg-surface">
      <div className="grid grid-cols-1 items-start gap-12 nav:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] nav:gap-16 wide:gap-20">
        <div className="reveal-rows">
          <Eyebrow withRule>{values.eyebrow}</Eyebrow>
          <SectionHeading size={54} className="mt-6 max-w-[20ch]">
            {values.heading}
          </SectionHeading>
          <p className="m-0 mt-6 max-w-[40ch] text-[17px] leading-[1.75] text-body">
            {values.lead}
          </p>
        </div>

        <ul className="reveal-group m-0 grid list-none grid-cols-1 gap-4 p-0 tab:grid-cols-2 wide:grid-cols-4">
          {values.items.map((value) => {
            const Icon = valueGlyphs[value.icon] ?? ShieldPriceIcon;

            return (
              <li
                key={value.index}
                className="group flex flex-col items-center rounded-[18px] border border-line-soft bg-white px-6 py-9 text-center transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-line hover:shadow-plate"
              >
                <span
                  aria-hidden
                  className="grid size-14 place-items-center rounded-full bg-surface text-brand transition-[background-color,color,transform] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-white"
                >
                  <Icon size={22} />
                </span>
                <h3 className="m-0 mt-6 font-display text-[20px] font-normal leading-[1.25] tracking-[-0.01em] text-brand">
                  {value.title}
                </h3>
                <p className="m-0 mt-3.5 text-[15px] leading-[1.7] text-body">
                  {value.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
