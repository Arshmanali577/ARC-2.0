import { FeaturedCarousel } from "@/components/projects/featured-carousel";
import { Approach } from "@/components/sections/approach";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Locations } from "@/components/sections/locations";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Reviews } from "@/components/sections/reviews";
import { Services } from "@/components/sections/services";
import { WhyArc } from "@/components/sections/why-arc";
import { featuredSection } from "@/content/homepage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  // The root page shares the root layout's segment, so `title.template` does
  // not apply to it — the suffix is spelled out to match the live title.
  title: "Custom Home Builder Brisbane & South East Queensland | ARC Builders",
  description:
    "ARC Builders designs and builds custom homes, renovations and premium family residences with clear pricing across Brisbane, Logan, Rochedale and South East Queensland.",
  path: "/",
  keywords: [
    "custom home builder Brisbane Southside",
    "builder Logan Queensland",
    "custom home builder Calamvale",
    "custom home builder Pallara",
    "custom home builder Greenbank",
    "custom home builder Eight Mile Plains",
    "custom home builder Mount Gravatt",
    "custom home builder Bahrs Scrub",
    "transparent pricing home builder",
  ],
  images: ["/projects/25-langford-st/hero.webp"],
});

/**
 * Section order follows the homepage reference design: the statement and its
 * figures, the portfolio, the reasons, what we build, how we build it, where
 * we build it, what clients said, and the enquiry.
 *
 * The featured band is the portfolio page's own carousel, given this page's
 * labels — one band, one behaviour, in both of the places it appears.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <FeaturedCarousel
        eyebrow={featuredSection.eyebrow}
        link={featuredSection.link}
        counter
        className="bg-white"
      />
      <WhyArc />
      <Services />
      <ProcessSteps />
      <Locations />
      <Reviews />
      <CtaBand />
    </>
  );
}
