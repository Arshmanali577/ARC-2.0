import { UnderlineLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServiceRows } from "@/components/ui/service-rows";
import { capabilitySection, homeServiceIds } from "@/content/homepage";
import { allServices } from "@/content/services";

const homeServices = homeServiceIds
  .map((id) => allServices.find((service) => service.id === id))
  .filter((service) => service !== undefined);

export function Capability() {
  return (
    <Section id="capability" size="default" className="bg-surface">
      <SectionHeader
        eyebrow={capabilitySection.eyebrow}
        heading={capabilitySection.heading}
        lead={capabilitySection.lead}
        rule={false}
      />

      <div className="mt-14">
        <ServiceRows services={homeServices} />
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-7 nav:flex-row nav:items-center nav:gap-16">
        <p className="m-0 max-w-[46ch] text-[17px] leading-[1.65] text-body">
          {capabilitySection.footnote}
        </p>
        <div className="flex flex-col items-start gap-5 nav:flex-row nav:items-center nav:gap-10">
          {capabilitySection.links.map((link) => (
            <UnderlineLink key={link.href} href={link.href} withArrow>
              {link.label}
            </UnderlineLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
