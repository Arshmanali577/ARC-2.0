import type { ComponentType, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsappIcon,
} from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section";
import { contactPage } from "@/content/pages";
import { addressLine1, addressLine2, site } from "@/content/site";

/**
 * Every way to reach ARC, as a schedule: a navy glyph, a label, and the value
 * — linked where the value is something a visitor can act on. Hours close the
 * list rather than open it, because they qualify the three above them.
 *
 * WhatsApp and the consultation panel sit under the list as actions rather
 * than as two more rows: both open something instead of stating a fact.
 */

type Glyph = ComponentType<{ className?: string; size?: number }>;

type Channel = {
  label: string;
  Icon: Glyph;
  href?: string;
  value: ReactNode;
};

export function ContactDetails() {
  const channels: Channel[] = [
    {
      label: contactPage.labels.address,
      Icon: PinIcon,
      value: (
        <>
          {addressLine1},
          <br />
          {addressLine2}
        </>
      ),
    },
    {
      label: contactPage.labels.phone,
      Icon: PhoneIcon,
      href: site.contact.phoneHref,
      value: site.contact.phone,
    },
    {
      label: contactPage.labels.email,
      Icon: MailIcon,
      href: site.contact.emailHref,
      value: site.contact.email,
    },
    {
      label: contactPage.labels.hours,
      Icon: ClockIcon,
      value: site.contact.hours.map((row) => (
        <span key={row.days} className="block">
          {row.days}: {row.time}
        </span>
      )),
    },
  ];

  return (
    <div className="reveal-fade nav:sticky nav:top-[120px]">
      <Eyebrow as="h2" withRule>
        {contactPage.infoEyebrow}
      </Eyebrow>

      <p className="m-0 mt-6 max-w-[15ch] font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.14] tracking-[-0.02em] text-brand nav:text-[34px]">
        {contactPage.infoHeading}
      </p>

      <dl className="m-0 mt-10 border-t border-line">
        {channels.map(({ label, Icon, href, value }) => (
          <div key={label} className="flex gap-5 border-b border-line py-6">
            <span
              aria-hidden
              className="mt-0.5 flex size-11 shrink-0 items-center justify-center bg-brand text-white"
            >
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-faint">
                {label}
              </dt>
              <dd className="m-0 mt-2 break-words text-[17.5px] leading-[1.6] text-brand">
                {href ? (
                  <a
                    href={href}
                    className="inline-block border-b border-transparent transition-colors duration-300 ease-out hover:border-brand"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      {/* The one row that opens a conversation rather than stating a fact, so
          it sits under the schedule rather than in it — but it keeps the same
          size-11 mark as the rows above, so the column still reads as one
          list. The mark stays WhatsApp green through the navy hover: a channel
          that is not recognisable is not doing its job, which is the same
          reason the enquire band's tile keeps its colour. */}
      <a
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="group mt-8 flex items-center gap-5 border border-line-strong py-5 pl-5 pr-6 text-[16px] text-brand transition duration-300 ease-out hover:border-brand hover:bg-brand hover:text-white"
      >
        <span
          aria-hidden
          className="social-whatsapp flex size-11 shrink-0 items-center justify-center text-white"
        >
          <WhatsappIcon size={22} />
        </span>
        <span className="min-w-0 flex-1">{contactPage.whatsapp}</span>
        <ArrowUpRight
          size={18}
          className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      {/* The one lit surface in the column, so it is what the eye lands on
          after the list. Its action is an in-page anchor: the form it books
          through is a few hundred pixels to the right. */}
      <div className="mt-5 bg-brand p-7 text-white">
        <p className="m-0 font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em]">
          {contactPage.consultation.heading}
        </p>
        <p className="m-0 mt-3 max-w-[34ch] text-[16px] leading-[1.65] text-mist">
          {contactPage.consultation.body}
        </p>
        <Button
          href={contactPage.consultation.action.href}
          variant="heroSolid"
          withArrow
          className="mt-7"
        >
          {contactPage.consultation.action.label}
        </Button>
      </div>
    </div>
  );
}
