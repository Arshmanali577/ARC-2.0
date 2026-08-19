import { Button } from "@/components/ui/button";
import { gutter } from "@/components/ui/section";
import { maintenancePage } from "@/content/pages";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  ...maintenancePage.seo,
  noIndex: true,
});

/** Same masthead vocabulary as the rest of the site: hatched navy ground, an
 *  inset drawing frame, and the two direct ways to reach the office. */
export default function MaintenancePage() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-ink text-white nav:min-h-[calc(100svh-92px)]">
      <div aria-hidden className="absolute inset-0 hatch-dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-white/12 nav:inset-7"
      />

      <div className={`relative w-full py-[120px] ${gutter}`}>
        <span className="flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-white/45" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-mist">
            {site.name}
          </span>
        </span>

        <h1 className="m-0 mt-7 max-w-[16ch] font-display text-[clamp(29px,9vw,38px)] font-normal leading-[1.04] tracking-[-0.03em] [text-wrap:balance] nav:text-[62px]">
          {maintenancePage.heading}
        </h1>
        <p className="m-0 mt-7 max-w-[52ch] text-[19px] font-light leading-[1.7] text-white/72">
          {maintenancePage.body}
        </p>

        <div className="mt-11 flex flex-col items-stretch gap-3 nav:flex-row nav:items-center nav:gap-4">
          <Button
            href={site.contact.phoneHref}
            variant="heroSolid"
            className="justify-center nav:justify-start"
            withArrow
          >
            Call {site.contact.phone}
          </Button>
          <Button
            href={site.contact.emailHref}
            variant="heroOutline"
            className="justify-center nav:justify-start"
          >
            {site.contact.email}
          </Button>
        </div>
      </div>
    </section>
  );
}
