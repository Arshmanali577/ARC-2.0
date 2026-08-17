import { Capability } from "@/components/sections/capability";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { LocalExpertise } from "@/components/sections/local-expertise";
import { Practice } from "@/components/sections/practice";
import { SelectedWork } from "@/components/sections/selected-work";
import { ServiceAreas } from "@/components/sections/service-areas";
import { StatsBar } from "@/components/sections/stats-bar";
import { Testimonial } from "@/components/sections/testimonial";
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

/** Section order follows the live homepage. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <SelectedWork />
      <Practice />
      <Capability />
      <LocalExpertise />
      <ServiceAreas />
      <Journey />
      <Testimonial />
      <CtaBand />
    </>
  );
}
