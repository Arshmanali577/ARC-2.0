import { ArrowUpRight } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section";
import { contactPage } from "@/content/pages";
import { addressFull, site } from "@/content/site";

/**
 * The three ways to reach ARC, as a schedule: label, value, and — where the
 * value is reachable — a link on the value itself. WhatsApp closes the rail as
 * an action rather than a fourth row, because it opens an app rather than
 * stating a fact.
 */
export function ContactDetails() {
  const channels = [
    { label: contactPage.labels.address, value: addressFull, href: null },
    {
      label: contactPage.labels.phone,
      value: site.contact.phone,
      href: site.contact.phoneHref,
    },
    {
      label: contactPage.labels.email,
      value: site.contact.email,
      href: site.contact.emailHref,
    },
  ];

  return (
    <div className="nav:sticky nav:top-[120px]">
      <Eyebrow as="h2" withRule>
        {contactPage.infoHeading}
      </Eyebrow>

      <dl className="m-0 mt-9 border-t border-line">
        {channels.map((channel) => (
          <div key={channel.label} className="border-b border-line py-7">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {channel.label}
            </dt>
            <dd className="m-0 mt-3 text-[19px] leading-[1.5] text-brand">
              {channel.href ? (
                <a
                  href={channel.href}
                  className="inline-block border-b border-transparent transition-colors duration-300 ease-out hover:border-brand"
                >
                  {channel.value}
                </a>
              ) : (
                channel.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="group mt-9 flex items-center justify-between gap-8 border border-line-strong px-6 py-5 text-[14px] text-brand transition duration-300 ease-out hover:border-brand hover:bg-brand hover:text-white"
      >
        <span>Message us on WhatsApp</span>
        <ArrowUpRight
          size={18}
          className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}
