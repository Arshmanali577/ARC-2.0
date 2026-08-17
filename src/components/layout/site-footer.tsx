import Link from "next/link";
import type { ReactNode } from "react";

import { Wordmark } from "@/components/ui/wordmark";
import {
  addressLine1,
  addressLine2,
  footerAreas,
  footerNav,
  footerServices,
  site,
  type NavItem,
} from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-brand px-6 pb-[38px] pt-16 text-mist-deep nav:px-14">
      <div className="grid grid-cols-1 gap-11 nav:grid-cols-2 wide:grid-cols-[1.4fr_1fr_1fr_1.1fr_1fr]">
        <div>
          <Wordmark tone="light" size={24} />
          <p className="m-0 mt-5 max-w-[300px] text-[14px] leading-[1.7]">
            {site.tagline}
          </p>
        </div>

        <FooterColumn title="Navigation">
          {footerNav.map((item) => (
            <FooterLink key={item.label} item={item} />
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {footerServices.map((item) => (
            <FooterLink key={item.label} item={item} />
          ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <span className="leading-[1.6]">
            {addressLine1}
            <br />
            {addressLine2}
          </span>
          <a
            href={site.contact.phoneHref}
            className="transition-colors duration-250 ease-out hover:text-white"
          >
            {site.contact.phone}
          </a>
          <a
            href={site.contact.emailHref}
            className="transition-colors duration-250 ease-out hover:text-white"
          >
            {site.contact.email}
          </a>
          <span className="mt-3 block border-t border-line-invert pt-3.5">
            <span className="block text-[13px] font-semibold text-white">
              {site.licence.label}
            </span>
            <span className="mt-1 block text-[13px]">{site.licence.number}</span>
          </span>
        </FooterColumn>

        <FooterColumn title="Service Areas">
          {footerAreas.map((item) => (
            <FooterLink key={item.label} item={item} />
          ))}
        </FooterColumn>
      </div>

      <div className="mt-[52px] flex flex-col items-start gap-2 border-t border-line-invert pt-[22px] text-[12px] text-white/50 nav:flex-row nav:items-center nav:justify-between nav:gap-0">
        <span>
          © {site.copyrightYear} {site.legalName}. All rights reserved.
        </span>
        <span>
          {site.licence.authority} Licence: {site.licence.number}
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="m-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h2>
      <div className="mt-[18px] flex flex-col gap-0.5 text-[14px]">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="-my-1 py-1 transition-colors duration-250 ease-out hover:text-white"
    >
      {item.label}
    </Link>
  );
}
