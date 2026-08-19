import type { ComponentType } from "react";

import {
  ClockIcon,
  DraftIcon,
  HammerIcon,
  PeopleIcon,
  ShieldCheckIcon,
} from "@/components/ui/icon";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { contactPage } from "@/content/pages";
import { cn } from "@/lib/cn";

/**
 * The reassurance band between the form and the map: five reasons the enquiry
 * is worth sending, set as a ruled row rather than five cards. Content names
 * each glyph in `content/pages.ts`; the drawing is resolved here.
 */

type Glyph = ComponentType<{ className?: string; size?: number }>;

const glyphs: Record<string, Glyph> = {
  shield: ShieldCheckIcon,
  draft: DraftIcon,
  craft: HammerIcon,
  schedule: ClockIcon,
  client: PeopleIcon,
};

export function WhyChoose() {
  const { eyebrow, heading, items } = contactPage.why;

  return (
    <Section size="default" className="bg-surface">
      <div className="reveal-rows flex flex-col items-center text-center">
        <Eyebrow withRule>{eyebrow}</Eyebrow>
        <SectionHeading size={52} className="mt-6 max-w-[22ch]">
          {heading}
        </SectionHeading>
      </div>

      {/* Two up on a phone, five across once there is room. The trailing cell
          of an odd row spans both columns so the grid never ends ragged. */}
      <ul className="reveal-group m-0 mt-14 grid list-none grid-cols-2 gap-y-12 p-0 tab:grid-cols-3 nav:mt-16 nav:grid-cols-5 nav:gap-y-0">
        {items.map((item, index) => {
          const Icon = glyphs[item.icon] ?? ShieldCheckIcon;

          return (
            <li
              key={item.title}
              className={cn(
                "flex flex-col items-center px-4 text-center nav:px-6",
                // Ruled off from the cell on its left, at whichever column
                // count is in play.
                index % 2 === 1 && "border-l border-line-soft",
                index % 3 === 0
                  ? "tab:border-l-0"
                  : "tab:border-l tab:border-line-soft",
                index === 0
                  ? "nav:border-l-0"
                  : "nav:border-l nav:border-line-soft",
                // Five items on a two-column grid leaves one alone on the last
                // row; centre it across both instead of stranding it left.
                index === items.length - 1 &&
                  items.length % 2 === 1 &&
                  "col-span-2 border-l-0 tab:col-span-1",
              )}
            >
              <span className="flex size-16 items-center justify-center rounded-full border border-line bg-white text-brand">
                <Icon size={24} />
              </span>
              <p className="m-0 mt-6 text-[17px] font-semibold leading-[1.35] text-brand">
                {item.title}
              </p>
              <p className="m-0 mt-3 max-w-[26ch] text-[16px] leading-[1.65] text-body">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
