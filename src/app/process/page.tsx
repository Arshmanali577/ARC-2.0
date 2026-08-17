import { ProcessTimeline } from "@/components/process/process-timeline";
import { StageIndex } from "@/components/process/stage-index";
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
        imageAlt="Celeste Residence, Brisbane"
        mediaLabel="CELESTE RESIDENCE — BRISBANE"
      />

      <StageIndex />

      <ProcessTimeline />

      <CtaBand />
    </>
  );
}
