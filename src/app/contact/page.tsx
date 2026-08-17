import { ContactDetails } from "@/components/contact/contact-details";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { contactPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(contactPage.seo);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        lead={contactPage.lead}
        image={contactPage.heroImage}
        imageAlt="Lumiere Residence, Camp Hill"
        mediaLabel="LUMIERE RESIDENCE — CAMP HILL"
      />

      <Section size="default">
        {/* Details first in the DOM so a phone number is the first thing on a
            small screen; the form takes the wider column on desktop. */}
        <div className="grid grid-cols-1 items-start gap-16 nav:grid-cols-[1fr_1.45fr] nav:gap-20 wide:gap-24">
          <ContactDetails />

          <div className="bg-surface p-8 nav:p-12 wide:p-14">
            <h2
              id="enquiry-heading"
              className="m-0 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.15] nav:text-[34px]"
            >
              {contactPage.form.heading}
            </h2>
            <div className="mt-10">
              <ContactForm labelledBy="enquiry-heading" />
            </div>
          </div>
        </div>
      </Section>

      <ContactMap />

      {/* No leading button: it would point at the page the visitor is on. No
          detail rail either — the page opened with the address and email. */}
      <CtaBand primary={null} details={false} />
    </>
  );
}
