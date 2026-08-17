import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ServiceRows } from "@/components/ui/service-rows";
import { commercialPage } from "@/content/pages";
import { commercialServices } from "@/content/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(commercialPage.seo);

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow={commercialPage.eyebrow}
        heading={commercialPage.heading}
        lead={commercialPage.lead}
        image={commercialPage.heroImage}
        imageAlt="Halcyon Residence, Mount Gravatt"
        mediaLabel="HALCYON RESIDENCE — MOUNT GRAVATT"
      />

      <Section size="default">
        <ServiceRows services={commercialServices} withAnchors headingLevel={2} />
      </Section>

      <CtaBand />
    </>
  );
}
