import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactMap } from "@/components/contact/contact-map";
import { WhyChoose } from "@/components/contact/why-choose";
import { ContactForm } from "@/components/forms/contact-form";
import { ProcessBand } from "@/components/sections/process-band";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow, Section } from "@/components/ui/section";
import { contactPage } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(contactPage.seo);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        heading={
          <>
            {contactPage.heading.lead}{" "}
            <span className="text-accent-soft">
              {contactPage.heading.accent}
            </span>
          </>
        }
        lead={contactPage.lead}
        image={contactPage.heroImage}
        imageAlt="Lumiere Residence, Camp Hill"
        mediaLabel="LUMIERE RESIDENCE — CAMP HILL"
        size="tall"
      >
        <ContactChannels />
      </PageHero>

      <Section size="default">
        {/* Details first in the DOM so a phone number is the first thing on a
            small screen; the form takes the wider column on desktop. */}
        <div className="grid grid-cols-1 items-start gap-16 nav:grid-cols-[1fr_1.45fr] nav:gap-16 wide:gap-20">
          <ContactDetails />

          <div
            id="enquiry"
            className="reveal scroll-mt-[120px] bg-surface p-6 tab:p-8 nav:p-12 wide:p-14"
          >
            <Eyebrow>{contactPage.form.eyebrow}</Eyebrow>

            <h2
              id="enquiry-heading"
              className="m-0 mt-5 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.15] tracking-[-0.02em] nav:text-[34px]"
            >
              {contactPage.form.heading}
            </h2>

            <p className="m-0 mt-4 max-w-[52ch] text-[16px] leading-[1.75] text-body tab:text-[17px]">
              {contactPage.form.lead}
            </p>

            <div className="mt-10">
              <ContactForm labelledBy="enquiry-heading" />
            </div>
          </div>
        </div>
      </Section>

      <WhyChoose />

      <ContactMap />

      {/* The four stages close the page: what happens after the enquiry is
          sent. No enquire band under it — every channel that band carries,
          phone, email, WhatsApp and the booking action, is already above. */}
      <ProcessBand />
    </>
  );
}
