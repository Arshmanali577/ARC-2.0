import type { ComponentType } from "react";

import { ClockIcon, MailIcon, PhoneIcon } from "@/components/ui/icon";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";

/**
 * The three quick channels carried on the hero plate: the two a visitor can
 * act on immediately, and the hours that tell them whether acting now will
 * reach anyone. Hairline tiles rather than filled cards — the hero is already
 * a lit surface, and a second fill on top of it would flatten the photograph.
 */

type Glyph = ComponentType<{ className?: string; size?: number }>;

type Channel = {
  label: string;
  Icon: Glyph;
  href?: string;
  value?: string;
  /** The hours tile carries two rows instead of a single value. */
  rows?: readonly { days: string; time: string }[];
};

export function ContactChannels() {
  const channels: Channel[] = [
    {
      label: contactPage.heroChannels.phone,
      Icon: PhoneIcon,
      href: site.contact.phoneHref,
      value: site.contact.phone,
    },
    {
      label: contactPage.heroChannels.email,
      Icon: MailIcon,
      href: site.contact.emailHref,
      value: site.contact.email,
    },
    {
      label: contactPage.heroChannels.hours,
      Icon: ClockIcon,
      rows: site.contact.hours,
    },
  ];

  return (
    <ul className="m-0 mt-8 flex list-none flex-col gap-2.5 p-0 tab:mt-11 tab:flex-row tab:flex-wrap tab:gap-4">
      {channels.map(({ label, Icon, href, value, rows }) => {
        const body = (
          <>
            <span className="flex size-11 shrink-0 items-center justify-center border border-line-invert-soft text-mist transition-colors duration-300 ease-out group-hover/tile:border-white/55 group-hover/tile:text-white">
              <Icon size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-mist-deep">
                {label}
              </span>
              {rows ? (
                rows.map((row) => (
                  <span
                    key={row.days}
                    className="mt-1.5 block text-[15px] leading-[1.45] text-white/85"
                  >
                    {row.days}: {row.time}
                  </span>
                ))
              ) : (
                <span className="mt-1.5 block break-words text-[16px] leading-[1.4] text-white">
                  {value}
                </span>
              )}
            </span>
          </>
        );

        const className =
          "group/tile flex items-center gap-3.5 border border-line-invert bg-white/[0.06] px-4 py-3.5 backdrop-blur-[2px] transition duration-300 ease-out tab:gap-4 tab:px-5 tab:py-4";

        return (
          <li key={label}>
            {href ? (
              <a
                href={href}
                className={`${className} hover:-translate-y-0.5 hover:border-line-invert-strong hover:bg-white/[0.12]`}
              >
                {body}
              </a>
            ) : (
              <div className={className}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
