import { ArrowUpRight, PinIcon } from "@/components/ui/icon";
import { Eyebrow, Section } from "@/components/ui/section";
import { contactPage } from "@/content/pages";
import { addressLine1, addressLine2, site } from "@/content/site";

/**
 * The office, stated and then shown. The address card and the directions link
 * carry the left column; the Google embed takes the right, framed the way a
 * photograph is framed elsewhere on the site — one plate with a hairline round
 * it. Squarer on a phone so the street layout stays legible when the two
 * columns stack.
 */
export function ContactMap() {
  const { eyebrow, heading, lead, action } = contactPage.location;

  return (
    <Section size="default">
      <div className="grid grid-cols-1 items-center gap-12 nav:grid-cols-[0.82fr_1.18fr] nav:gap-16 wide:gap-20">
        <div className="reveal-rows">
          <Eyebrow as="h2" withRule>
            {eyebrow}
          </Eyebrow>

          <p className="m-0 mt-6 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.14] tracking-[-0.02em] text-brand nav:text-[34px]">
            {heading}
          </p>

          <p className="m-0 mt-5 max-w-[38ch] text-[17px] leading-[1.75] text-body">
            {lead}
          </p>

          <div className="mt-9 border border-line">
            <p className="m-0 flex items-start gap-4 px-6 py-6 text-[17px] leading-[1.6] text-brand">
              <span
                aria-hidden
                className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-brand"
              >
                <PinIcon size={16} />
              </span>
              <span>
                {addressLine1},
                <br />
                {addressLine2}
              </span>
            </p>

            <a
              href={site.contact.directionsHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-8 border-t border-line px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-brand transition duration-300 ease-out hover:bg-brand hover:text-white"
            >
              <span>{action}</span>
              <ArrowUpRight
                size={18}
                className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="reveal border border-line">
          <iframe
            src={site.contact.mapEmbed}
            title={`Map showing ${site.name} in ${site.contact.address.locality}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full nav:aspect-[16/11]"
          />
        </div>
      </div>
    </Section>
  );
}
