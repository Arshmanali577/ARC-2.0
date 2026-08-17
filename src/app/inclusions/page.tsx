import { InclusionsTool } from "@/components/inclusions/inclusions-tool";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { inclusionsPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

/** Private client tool — the live site keeps it out of the index. */
export const metadata = createPageMetadata({
  ...inclusionsPage.seo,
  noIndex: true,
});

export default function InclusionsPage() {
  return (
    <>
      <PageHero
        eyebrow={inclusionsPage.eyebrow}
        heading={inclusionsPage.heading}
        lead={inclusionsPage.lead}
        image={inclusionsPage.heroImage}
        imageAlt="ARC Builders custom home"
        mediaLabel="ARC BUILDERS"
      />

      <Section size="default">
        <InclusionsTool />
      </Section>
    </>
  );
}
