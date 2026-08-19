import { ProcessTimeline } from "@/components/process/process-timeline";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { processPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(processPage.seo);

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow={processPage.eyebrow}
        heading={processPage.heading}
        lead={processPage.lead}
        image={processPage.heroImage}
        imageAlt="A completed ARC home lit from within at dusk"
        mediaLabel="ARC BUILDERS"
        size="full"
        eyebrowTone="brass"
        imagePosition="center 62%"
      />

      <ProcessTimeline />

      <CtaBand />
    </>
  );
}
