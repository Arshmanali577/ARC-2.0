import { AboutStory } from "@/components/about/story";
import { AboutValues } from "@/components/about/values";
import { CtaBand } from "@/components/sections/cta-band";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeatureImage } from "@/components/ui/feature-image";
import { PageHero } from "@/components/ui/page-hero";
import { aboutPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(aboutPage.seo);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        heading={aboutPage.heading}
        lead={aboutPage.lead}
        image={aboutPage.heroImage}
        imageAlt="Solstice Residence, Eight Mile Plains"
        mediaLabel="SOLSTICE RESIDENCE — EIGHT MILE PLAINS"
        size="tall"
      />

      {/* Experience, delivered work and the QBCC licence, on the record before
          the story starts. */}
      <StatsBar stats={aboutPage.stats} />

      <AboutStory />

      <FeatureImage
        src={aboutPage.feature.src}
        alt={aboutPage.feature.alt}
        caption={aboutPage.feature.caption}
        className="pb-[92px] nav:pb-[128px]"
      />

      <AboutValues />

      <CtaBand />
    </>
  );
}
