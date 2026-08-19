import { AboutApproach } from "@/components/about/approach";
import { AboutStory } from "@/components/about/story";
import { AboutValues } from "@/components/about/values";
import { AboutWhatWeBuild } from "@/components/about/what-we-build";
import { AboutWhyArc } from "@/components/about/why-arc";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { aboutPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(aboutPage.seo);

const { heading, heroCta } = aboutPage;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        heading={
          <>
            {heading.line1}
            <br />
            {heading.line2}
            {/* The one point of colour in the masthead. */}
            <span className="text-accent-soft">{heading.accent}</span>
          </>
        }
        lead={aboutPage.lead}
        image={aboutPage.heroImage}
        imageAlt={aboutPage.heroImageAlt}
        mediaLabel={aboutPage.heroMediaLabel}
        /* The masthead letterboxes to 3:1 on a wide screen. Anchored above
           centre so the vertical crop takes sky and pool foreground rather
           than the roofline and the top of the stone pier. */
        imagePosition="center 15%"
        size="tall"
      >
        <Button
          href={heroCta.href}
          variant="heroOutline"
          withArrow
          className="mt-10"
        >
          {heroCta.label}
        </Button>
      </PageHero>

      {/* The statement, with the experience and the licence stepped over the
          photograph beside it. */}
      <AboutStory />

      <AboutValues />

      <AboutApproach />

      <AboutWhatWeBuild />

      <AboutWhyArc />

      <CtaBand />
    </>
  );
}
