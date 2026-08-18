import type { ComponentType } from "react";

import { BlueprintHouse } from "@/components/ui/blueprint-house";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  AwardIcon,
  CalendarIcon,
  DraftIcon,
  HomeIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShieldPriceIcon,
  StarIcon,
  WhatsappIcon,
} from "@/components/ui/icon";
import { Eyebrow, Section } from "@/components/ui/section";
import { cta } from "@/content/homepage";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The closing band, repeated at the foot of every public page.
 *
 * Two halves that answer each other: the statement and the reasons to trust it
 * on the left, the proof and the ways to start a conversation on the right.
 * The consultation panel is the only lit surface in the band, which is what
 * makes it the thing the eye lands on after the heading.
 *
 * Copy lives in `content/homepage.ts`; every number and link is read from
 * `content/site.ts`, so nothing here is a hardcoded business fact.
 */

type Glyph = ComponentType<{ className?: string; size?: number }>;

/** Content names a glyph; the drawing itself stays out of the content file. */
const proofGlyphs: Record<string, Glyph> = {
  projects: HomeIcon,
  experience: CalendarIcon,
  licence: ShieldCheckIcon,
  reviews: StarIcon,
};

const assuranceGlyphs: Record<string, Glyph> = {
  design: DraftIcon,
  price: ShieldPriceIcon,
  accredited: AwardIcon,
};

/* -- Contact tile ---------------------------------------------------------- */

/**
 * One way to reach ARC. External by design: `tel:`, `mailto:` and the WhatsApp
 * deep link all leave the site, so each is a plain anchor rather than a router
 * link. WhatsApp keeps its own green — a channel mark that is not recognisable
 * is not doing its job.
 */
function ContactTile({
  href,
  label,
  value,
  Icon,
  tone = "accent",
}: {
  href: string;
  label: string;
  value: string;
  Icon: Glyph;
  tone?: "accent" | "whatsapp";
}) {
  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      /* A row on a phone, the design's stacked card from tablet up. Three
         stacked cards on a 390px screen is 400px of near-empty tile. */
      className="group/tile flex items-center gap-4 rounded-[12px] border border-line-invert bg-white/[0.045] p-4 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-line-invert-strong hover:bg-white/[0.09] tab:flex-col tab:items-stretch tab:gap-0"
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full tab:mb-3.5",
          tone === "whatsapp"
            ? "social-whatsapp text-white"
            : "bg-accent/20 text-accent-soft",
        )}
      >
        <Icon size={tone === "whatsapp" ? 18 : 16} />
      </span>

      <span className="min-w-0 flex-1 tab:flex-none">
        <span className="block text-[14px] font-medium leading-none">{label}</span>
        <span className="mt-2 block break-words text-[12.5px] leading-[1.45] text-white/55">
          {value}
        </span>
      </span>

      <ArrowRight className="shrink-0 text-white/45 transition-transform duration-300 ease-out group-hover/tile:translate-x-1 tab:mt-4 tab:self-end" />
    </a>
  );
}

/* -- Band ------------------------------------------------------------------ */

type CtaBandProps = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  /**
   * The panel's leading action. Pass `null` on /contact, where a button back to
   * the contact page would send the visitor to the page they are already on —
   * the panel falls back to the phone number instead.
   */
  primary?: { label: string; href: string } | null;
  /** The three contact tiles. Off on /contact, which already carries them. */
  details?: boolean;
};

export function CtaBand({
  eyebrow = cta.eyebrow,
  heading = cta.heading,
  body = cta.body,
  primary = { label: cta.panel.action.label, href: cta.panel.action.href },
  details = true,
}: CtaBandProps) {
  const { channels } = cta.panel;

  return (
    <Section
      id="enquire"
      size="default"
      className="relative overflow-hidden cta-surface text-white"
    >
      {/* The drawing sits under the statement column, bled off the gutter the
          way a site plan runs off the sheet. Off on phones, where the two
          columns stack and there is no empty quarter for it to occupy. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[2%] -left-[7%] hidden w-[54%] text-accent-soft opacity-[0.07] tab:block nav:w-[42%] wide:w-[38%] wide:opacity-[0.1]"
      >
        <BlueprintHouse />
      </span>

      <div className="relative grid grid-cols-1 items-start gap-14 nav:grid-cols-[1.02fr_1fr] nav:gap-16 wide:gap-20">
        {/* -- Statement ---------------------------------------------------- */}
        <div>
          <Eyebrow tone="light" withRule>
            {eyebrow}
          </Eyebrow>

          <h2 className="m-0 mt-7 max-w-[17ch] font-display text-[clamp(29px,8vw,36px)] font-normal leading-[1.07] tracking-[-0.03em] [text-wrap:balance] nav:text-[48px] wide:text-[56px]">
            {heading}
          </h2>

          <p className="m-0 mt-6 max-w-[46ch] text-[17px] font-light leading-[1.75] text-white/72">
            {body}
          </p>

          <ul className="m-0 mt-10 flex list-none flex-col gap-6 p-0 tab:mt-12 tab:flex-row tab:items-center tab:gap-0">
            {cta.assurances.map((assurance, index) => {
              const Icon = assuranceGlyphs[assurance.icon] ?? DraftIcon;

              return (
                <li
                  key={assurance.label}
                  className={cn(
                    "flex items-center gap-3.5 tab:pr-6 wide:pr-8",
                    index > 0 &&
                      "tab:border-l tab:border-line-invert tab:pl-6 wide:pl-8",
                  )}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/45 text-accent-soft">
                    <Icon size={18} />
                  </span>
                  <span className="max-w-[10ch] text-[14px] leading-[1.35] text-white/80">
                    {assurance.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* -- Proof and panel ---------------------------------------------- */}
        <div>
          <ul className="m-0 grid list-none grid-cols-2 gap-y-9 p-0 tab:grid-cols-4 tab:gap-y-0">
            {cta.proof.map((figure, index) => {
              const Icon = proofGlyphs[figure.icon] ?? HomeIcon;

              return (
                <li
                  key={figure.label}
                  className={cn(
                    "flex flex-col items-center px-2 text-center",
                    // Divided from the second cell on a phone's two-up grid,
                    // and from every cell but the first once they sit in a row.
                    index % 2 === 1 && "border-l border-line-invert",
                    index > 0 && "tab:border-l tab:border-line-invert",
                  )}
                >
                  <Icon size={22} className="text-accent-soft" />
                  <p className="m-0 mt-3.5 font-display text-[25px] font-normal leading-none tracking-[-0.02em] nav:text-[29px]">
                    {figure.value}
                  </p>
                  <p className="m-0 mt-2.5 text-[12px] leading-[1.4] text-white/55">
                    {figure.label}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-11 rounded-[20px] border border-line-invert bg-white/[0.035] p-5 tab:mt-14 tab:p-8">
            <div className="flex items-start gap-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line-invert-soft text-accent-soft">
                <CalendarIcon size={22} />
              </span>
              <div className="min-w-0">
                <p className="m-0 font-display text-[23px] font-normal leading-[1.15] tracking-[-0.02em] tab:text-[28px]">
                  {cta.panel.heading}
                </p>
                <p className="m-0 mt-2 text-[15px] leading-[1.6] text-white/65">
                  {cta.panel.body}
                </p>
              </div>
            </div>

            <Button
              href={primary ? primary.href : site.contact.phoneHref}
              variant="panelSolid"
              withArrow
              className="mt-7"
            >
              {primary ? primary.label : `Call ${site.contact.phone}`}
            </Button>

            {details ? (
              <>
                <span
                  aria-hidden
                  className="mt-8 block h-px w-full bg-line-invert"
                />

                <div className="mt-6 grid grid-cols-1 gap-3 tab:grid-cols-3">
                  <ContactTile
                    href={site.contact.phoneHref}
                    label={channels.phone}
                    value={site.contact.phone}
                    Icon={PhoneIcon}
                  />
                  <ContactTile
                    href={site.contact.emailHref}
                    label={channels.email}
                    value={site.contact.email}
                    Icon={MailIcon}
                  />
                  <ContactTile
                    href={site.contact.whatsappHref}
                    label={channels.whatsapp}
                    value={channels.whatsappValue}
                    Icon={WhatsappIcon}
                    tone="whatsapp"
                  />
                </div>
              </>
            ) : null}
          </div>

          <p className="m-0 mt-7 flex items-center gap-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            <span aria-hidden className="h-px w-6 bg-white/25" />
            {site.licence.label} · {site.licence.number}
          </p>
        </div>
      </div>
    </Section>
  );
}
