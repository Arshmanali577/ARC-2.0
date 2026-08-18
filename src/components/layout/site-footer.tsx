import type { ReactNode } from "react";

import { FooterColumn } from "@/components/layout/footer/footer-column";
import { FooterFact, FooterLink } from "@/components/layout/footer/footer-link";
import { BlueprintHouse } from "@/components/ui/blueprint-house";
import { UnderlineLink } from "@/components/ui/button";
import {
  BuildingIcon,
  CabinIcon,
  DraftIcon,
  ExtendIcon,
  HammerIcon,
  HomeIcon,
  LicenceIcon,
  MailIcon,
  MedicalIcon,
  PhoneIcon,
  PinIcon,
  QuoteIcon,
  StoreIcon,
} from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import {
  addressLine1,
  addressLine2,
  allAreasLink,
  footerAreas,
  footerCreed,
  footerCreedEcho,
  footerLabels,
  footerServices,
  site,
  type ServiceIconName,
} from "@/content/site";

/**
 * The site footer.
 *
 * Four columns over a divided bottom bar. The brand column sits on an
 * axonometric line drawing of a house that bleeds off the left gutter; the
 * three list columns each lead with an eyebrow over a short azure rule, and
 * every row carries the glyph for what it is. Below a lit divider the bottom
 * bar splits into four cells — the studio line, its answering line, the
 * copyright and the licence — separated by vertical hairlines rather than
 * boxed.
 *
 * Everything here is a Server Component. The reveal on scroll is the site's own
 * `reveal-group`, driven by `animation-timeline: view()` and so costing no
 * JavaScript, and every other movement is a CSS transition on a `group`.
 */

/** Service glyphs, keyed by the name each service carries in `content/site`. */
const serviceIcons: Record<ServiceIconName, typeof HomeIcon> = {
  home: HomeIcon,
  building: BuildingIcon,
  draft: DraftIcon,
  hammer: HammerIcon,
  extend: ExtendIcon,
  cabin: CabinIcon,
  store: StoreIcon,
  medical: MedicalIcon,
};

export function SiteFooter() {
  return (
    <footer className="footer-surface relative isolate overflow-hidden text-mist-deep">
      {/* Lit top edge — the seam between the enquire band and the footer */}
      <span aria-hidden className="rule-glow absolute inset-x-0 top-0 h-px" />

      {/* Draughting paper, dissolving before it reaches the copy */}
      <span
        aria-hidden
        className="blueprint-grid pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative px-6 pb-12 pt-[72px] tab:px-10 nav:px-14 nav:pb-16 nav:pt-[104px]">
        {/* The house. Anchored to the foot of the column block and bled off
            the gutter, the way a site plan runs off the sheet. Off on phones,
            where there is no room for it beside the text. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 -left-[6%] -z-10 hidden w-[58%] text-accent-soft opacity-[0.07] tab:block nav:w-[46%] wide:w-[42%] wide:opacity-[0.13]"
        >
          <BlueprintHouse />
        </span>

        <div className="reveal-group grid grid-cols-1 gap-x-14 gap-y-[52px] tab:grid-cols-2 nav:gap-y-16 wide:grid-cols-[1.45fr_1fr_1.15fr_0.95fr] wide:gap-x-16">
          {/* -- Brand -------------------------------------------------------- */}
          <div className="max-w-[380px]">
            <Wordmark tone="light" size={24} />
            <span
              aria-hidden
              className="mt-6 block h-px w-14 bg-linear-to-r from-accent-soft to-accent/0"
            />
            <p className="m-0 mt-6 text-[15px] leading-[1.75]">
              {site.shortDescription}
            </p>
          </div>

          {/* -- Services ----------------------------------------------------- */}
          <nav aria-labelledby="footer-services">
            <FooterColumn id="footer-services" title={footerLabels.services}>
              <ul className="m-0 flex list-none flex-col p-0">
                {footerServices.map((service) => {
                  const Glyph = serviceIcons[service.icon];
                  return (
                    <li key={service.label}>
                      <FooterLink href={service.href} icon={<Glyph size={17} />}>
                        {service.label}
                      </FooterLink>
                    </li>
                  );
                })}
              </ul>
            </FooterColumn>
          </nav>

          {/* -- Contact ------------------------------------------------------ */}
          <FooterColumn id="footer-contact" title={footerLabels.contact}>
            <address className="not-italic">
              <FooterFact icon={<PinIcon size={17} />}>
                {addressLine1}
                <br />
                {addressLine2}
              </FooterFact>
              <FooterLink
                href={site.contact.phoneHref}
                icon={<PhoneIcon size={17} />}
              >
                {site.contact.phone}
              </FooterLink>
              <FooterLink
                href={site.contact.emailHref}
                icon={<MailIcon size={17} />}
              >
                {site.contact.email}
              </FooterLink>
            </address>

            {/* The licence gets its own plate, so it reads as credentials
                rather than a fourth contact row. */}
            <div className="mt-7 flex items-center gap-4 border-t border-line-invert pt-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/6 text-accent-soft ring-1 ring-white/12">
                <LicenceIcon size={20} />
              </span>
              <span className="block">
                <span className="block text-[14px] font-semibold text-white">
                  {site.licence.label}
                </span>
                <span className="mt-0.5 block text-[14px] tracking-[0.04em] text-accent-soft">
                  {site.licence.number}
                </span>
              </span>
            </div>
          </FooterColumn>

          {/* -- Service areas ------------------------------------------------ */}
          <nav aria-labelledby="footer-areas">
            <FooterColumn id="footer-areas" title={footerLabels.areas}>
              <ul className="m-0 flex list-none flex-col p-0">
                {footerAreas.map((area) => (
                  <li key={area.label}>
                    <FooterLink href={area.href} icon={<PinIcon size={17} />}>
                      {area.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
              <UnderlineLink
                href={allAreasLink.href}
                tone="accent"
                withArrow
                className="mt-6"
              >
                {allAreasLink.label}
              </UnderlineLink>
            </FooterColumn>
          </nav>
        </div>
      </div>

      {/* -- Bottom bar ------------------------------------------------------- */}

      <div className="relative">
        <span aria-hidden className="rule-glow absolute inset-x-0 top-0 h-px" />

        <div className="grid grid-cols-1 gap-y-10 px-6 py-11 tab:grid-cols-2 tab:gap-x-12 tab:px-10 nav:px-14 wide:grid-cols-[1.1fr_0.95fr_1.05fr_0.8fr] wide:items-stretch wide:gap-x-0">
          {/* The studio line */}
          <div className="flex flex-col justify-center wide:pr-11">
            <QuoteIcon size={20} className="text-accent-soft/80" />
            <p className="m-0 mt-3.5 border-l-2 border-accent/70 pl-5 text-[15px] leading-[1.7]">
              <span className="block text-white">{footerCreed.lead}</span>
              <span className="block text-accent-soft">{footerCreed.echo}</span>
            </p>
          </div>

          {/* Its answering line, set in the same hand */}
          <Cell>
            <QuoteIcon size={20} className="text-accent-soft/80" />
            <p className="m-0 mt-3.5 border-l-2 border-accent/70 pl-5 text-[15px] leading-[1.7]">
              <span className="block text-white">{footerCreedEcho.lead}</span>
              <span className="block text-accent-soft">
                {footerCreedEcho.echo}
              </span>
            </p>
          </Cell>

          <Cell>
            <p className="m-0 text-[13px] leading-[1.7] text-white/55">
              © {site.copyrightYear} {site.legalName}.{" "}
              {footerLabels.rights}
            </p>
          </Cell>

          <Cell>
            <p className="m-0 text-[13px] leading-[1.7] text-white/55">
              {site.licence.authority} Licence:{" "}
              <span className="font-medium tracking-[0.04em] text-accent-soft">
                {site.licence.number}
              </span>
            </p>
          </Cell>
        </div>
      </div>
    </footer>
  );
}

/**
 * A bottom-bar cell, preceded by a vertical lit hairline. The divider only
 * appears once the bar is genuinely side by side — stacked on a phone, a
 * vertical rule between rows would be nonsense.
 */
function Cell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col justify-center wide:px-11">
      <span
        aria-hidden
        className="rule-glow-y absolute inset-y-0 left-0 hidden w-px wide:block"
      />
      {children}
    </div>
  );
}
