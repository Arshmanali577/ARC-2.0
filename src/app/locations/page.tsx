import { LocationCard } from "@/components/locations/location-card";
import { LocationIndex } from "@/components/locations/location-index";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { localAreas } from "@/content/local-areas";
import { locationsPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(locationsPage.seo);

/** The lead area takes the feature row; the remaining nine fill a 3×3 grid. */
const [lead, ...rest] = localAreas;

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow={locationsPage.eyebrow}
        heading={locationsPage.heading}
        lead={locationsPage.lead}
        image={locationsPage.heroImage}
        imageAlt="Lumiere Residence, Camp Hill"
        mediaLabel="LUMIERE RESIDENCE — CAMP HILL"
      />

      <LocationIndex />

      <Section size="default">
        <div className="reveal-group grid grid-cols-1 gap-x-9 gap-y-16 tab:grid-cols-2 wide:grid-cols-3">
          <LocationCard
            area={lead}
            variant="feature"
            className="tab:col-span-2 wide:col-span-3"
          />
          {rest.map((area) => (
            <LocationCard key={area.slug} area={area} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
