import Link from "next/link";

import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { capabilities, capabilitySection } from "@/content/homepage";

export function Capability() {
  return (
    <Section id="capability" className="py-[110px]">
      <div className="max-w-[620px]">
        <Eyebrow>{capabilitySection.eyebrow}</Eyebrow>
        <SectionHeading className="mt-4">
          {capabilitySection.heading}
        </SectionHeading>
      </div>

      <div className="mt-[50px] border-t border-line">
        {capabilities.map((item) => (
          <Link
            key={item.index}
            href={item.href}
            className="grid grid-cols-1 items-center gap-7 border-b border-line py-8 transition-[padding-left,background-color] duration-300 ease-out hover:bg-surface nav:grid-cols-[70px_320px_1fr_40px] nav:hover:pl-5"
          >
            <span className="text-[11px] font-semibold tracking-[0.16em] text-faint">
              {item.index}
            </span>
            <h3 className="m-0 font-display text-[30px] font-normal">
              {item.title}
            </h3>
            <p className="m-0 text-[16px] leading-[1.6] text-body">
              {item.body}
            </p>
            <span aria-hidden className="text-[22px] text-brand nav:text-right">
              →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
