import { Button } from "@/components/ui/button";
import { Eyebrow, gutter } from "@/components/ui/section";
import { enquire } from "@/content/homepage";
import { addressLine1, addressLine2, site } from "@/content/site";

export function Enquire() {
  return (
    <section id="enquire" className="relative bg-ink text-white">
      <div aria-hidden className="absolute inset-0 hatch-dark" />

      <div
        className={`relative grid grid-cols-1 items-end gap-[72px] py-[120px] nav:grid-cols-[1.1fr_1fr] ${gutter}`}
      >
        <div>
          <Eyebrow tone="light">{enquire.eyebrow}</Eyebrow>
          <h2 className="m-0 mt-[18px] font-display text-[34px] font-normal leading-[1.04] tracking-[-0.03em] nav:text-[68px]">
            {enquire.heading}
          </h2>
          <p className="m-0 mt-[22px] max-w-[490px] text-[18px] font-light leading-[1.7] text-white/72">
            {enquire.body}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button href="#enquire" variant="actionSolid" withArrow>
            Book a free consultation
          </Button>
          <Button href={site.contact.phoneHref} variant="actionOutline" withArrow>
            Call {site.contact.phone}
          </Button>
          <Button
            href={site.contact.whatsappHref}
            variant="actionOutline"
            withArrow
          >
            Message us on WhatsApp
          </Button>
          <address className="mt-2.5 text-[13px] not-italic leading-[1.7] text-white/50">
            {addressLine1}, {addressLine2}
            <br />
            <a href={site.contact.emailHref} className="hover:text-white">
              {site.contact.email}
            </a>
          </address>
        </div>
      </div>
    </section>
  );
}
