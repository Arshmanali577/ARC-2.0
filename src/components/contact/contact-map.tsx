import { Section } from "@/components/ui/section";
import { addressFull, site } from "@/content/site";

/**
 * The existing Google embed, framed the way a photograph is framed elsewhere
 * on the site: one plate at a fixed ratio with a hairline and a caption on a
 * rule beneath it. Wide and short on desktop, squarer on a phone so the street
 * layout stays legible.
 */
export function ContactMap() {
  return (
    <Section size="tight">
      <div className="border border-line">
        <iframe
          src={site.contact.mapEmbed}
          title={`Map showing ${site.name} in ${site.contact.address.locality}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block aspect-[4/3] w-full nav:aspect-[2/1] wide:aspect-[21/9]"
        />
      </div>

      <div className="mt-5 flex items-center gap-5">
        <span aria-hidden className="h-px w-10 bg-line-strong" />
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          {addressFull}
        </span>
      </div>
    </Section>
  );
}
