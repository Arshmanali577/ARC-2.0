import Link from "next/link";

import { Eyebrow, Section } from "@/components/ui/section";
import { serviceAreaSection, serviceAreas } from "@/content/homepage";

export function ServiceAreas() {
  return (
    <Section className="pb-[110px]">
      <div className="flex flex-col items-start justify-between gap-2 border-b border-line pb-5 nav:flex-row nav:items-baseline nav:gap-0">
        <Eyebrow>{serviceAreaSection.eyebrow}</Eyebrow>
        <Link
          href={serviceAreaSection.link.href}
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-250 ease-out hover:text-brand"
        >
          {serviceAreaSection.link.label}
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {serviceAreas.map((area) => (
          <Link
            key={area}
            href="#enquire"
            className="border border-line-strong px-5 py-3 text-[14px] text-brand transition duration-250 ease-out hover:border-brand hover:bg-brand hover:text-white"
          >
            {area}
          </Link>
        ))}
      </div>
    </Section>
  );
}
