import { Capability } from "@/components/sections/capability";
import { Enquire } from "@/components/sections/enquire";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Practice } from "@/components/sections/practice";
import { OurPromise } from "@/components/sections/our-promise";
import { SelectedWork } from "@/components/sections/selected-work";
import { ServiceAreas } from "@/components/sections/service-areas";
import { StatsBar } from "@/components/sections/stats-bar";
import { Testimonial } from "@/components/sections/testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <OurPromise />
      <SelectedWork />
      <Practice />
      <Journey />
      <Capability />
      <Testimonial />
      <ServiceAreas />
      <Enquire />
    </>
  );
}
