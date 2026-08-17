import { Button } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/ui/section";
import { cta } from "@/content/homepage";
import { contactPage } from "@/content/pages";
import { addressFull, site } from "@/content/site";

/**
 * The closing band. The live site repeats this call to action at the foot of
 * every public page, so it takes its copy from `content/homepage.ts` and can be
 * overridden per page.
 *
 * Statement on the left, the three ways to start a conversation stacked on the
 * right — one action per row, largest first, so the primary path is unmissable.
 */

type CtaBandProps = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  /**
   * The leading action. Pass `null` on /contact, where a button back to the
   * contact page would send the visitor to the page they are already on.
   */
  primary?: { label: string; href: string } | null;
  /** The address/email rail. Off on /contact, which already carries both. */
  details?: boolean;
};

export function CtaBand({
  eyebrow = cta.eyebrow,
  heading = cta.heading,
  body = cta.body,
  primary = { label: cta.primaryCta.label, href: "/contact" },
  details = true,
}: CtaBandProps) {
  return (
    <Section id="enquire" size="open" className="relative bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 hatch-dark" />

      <div className="relative grid grid-cols-1 items-start gap-14 nav:grid-cols-[1.05fr_1fr] nav:gap-20">
        <div>
          <Eyebrow tone="light" withRule>
            {eyebrow}
          </Eyebrow>
          <h2 className="m-0 mt-7 max-w-[14ch] font-display text-[clamp(27px,8vw,34px)] font-normal leading-[1.04] tracking-[-0.03em] [text-wrap:balance] nav:text-[58px] wide:text-[68px]">
            {heading}
          </h2>
          <p className="m-0 mt-7 max-w-[52ch] text-[18px] font-light leading-[1.7] text-white/72">
            {body}
          </p>

          {details ? (
            <dl className="m-0 mt-14 grid grid-cols-1 gap-x-12 gap-y-7 border-t border-line-invert pt-8 nav:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {contactPage.labels.address}
                </dt>
                <dd className="m-0 mt-2.5 text-[14px] leading-[1.6] text-white/72">
                  {addressFull}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {contactPage.labels.email}
                </dt>
                <dd className="m-0 mt-2.5 text-[14px] leading-[1.6]">
                  <a
                    href={site.contact.emailHref}
                    className="text-white/72 transition-colors duration-250 ease-out hover:text-white"
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 nav:pt-3">
          {primary ? (
            <Button href={primary.href} variant="actionSolid" withArrow>
              {primary.label}
            </Button>
          ) : null}
          <Button
            href={site.contact.phoneHref}
            variant={primary ? "actionOutline" : "actionSolid"}
            withArrow
          >
            Call {site.contact.phone}
          </Button>
          <Button
            href={site.contact.whatsappHref}
            variant="actionOutline"
            withArrow
          >
            Message us on WhatsApp
          </Button>
          <p className="m-0 mt-5 flex items-center gap-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            <span aria-hidden className="h-px w-6 bg-white/25" />
            {site.licence.label} · {site.licence.number}
          </p>
        </div>
      </div>
    </Section>
  );
}
