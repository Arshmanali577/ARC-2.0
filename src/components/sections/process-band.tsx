import { MediaPlate } from "@/components/ui/media-plate";
import { UnderlineLink } from "@/components/ui/button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { processBand, processStages } from "@/content/process";

/**
 * The five stages as a numbered rail, drawn on a darkened photograph — the
 * closing reassurance on the contact page: this is what happens after the
 * enquiry is sent.
 *
 * Deliberately not the homepage's `Journey`: that band is a ruled column per
 * stage that leads into the full /process page. This one is a single line of
 * markers, so it reads as a sequence at a glance rather than as five cards.
 */
export function ProcessBand() {
  return (
    <Section size="default" className="relative overflow-hidden bg-ink text-white">
      {/* MediaPlate owns `relative` for `next/image fill`, so the layer that
          takes the photograph out of flow has to be this wrapper. */}
      <div aria-hidden className="absolute inset-0">
        <MediaPlate
          label={processBand.media.label}
          tone="dark"
          src={processBand.media.src}
          alt=""
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      {/* Heavy enough that the numerals and the dotted rule hold at every
          screen width — the photograph is ground here, not subject. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,26,56,0.93) 0%, rgba(0,26,56,0.88) 50%, rgba(0,26,56,0.94) 100%)",
        }}
      />

      <div className="relative">
        <div className="reveal-rows flex flex-col items-center text-center">
          <Eyebrow tone="light" withRule>
            {processBand.eyebrow}
          </Eyebrow>
          <SectionHeading size={52} className="mt-6 max-w-[20ch]">
            {processBand.heading}
          </SectionHeading>
          <p className="m-0 mt-5 max-w-[46ch] text-[17px] font-light leading-[1.75] text-white/70 tab:text-[18px]">
            {processBand.lead}
          </p>
        </div>

        <ol className="reveal-group relative m-0 mt-14 grid list-none grid-cols-1 gap-y-12 p-0 tab:grid-cols-3 tab:gap-x-6 nav:mt-16 nav:grid-cols-5 nav:gap-x-5">
          {/* The rule runs between the centres of the first and last markers —
              with five columns each centre sits at (i + 0.5)/5, so that is a
              tenth of the row in from each edge, at the markers' midline. The
              beads mark the midpoint of each gap in the run: four gaps between
              five markers, evenly spaced along it. Off below `nav`, where the
              stages wrap and a horizontal connector would join the wrong
              ones. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden nav:block"
          >
            <span className="block border-t border-dashed border-white/25" />
            {["left-[12.5%]", "left-[37.5%]", "left-[62.5%]", "left-[87.5%]"].map(
              (position) => (
                <span
                  key={position}
                  className={`absolute top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft/80 ${position}`}
                />
              ),
            )}
          </span>

          {processStages.map((step) => (
            <li
              key={step.id}
              className="relative flex flex-col items-center px-1 text-center tab:px-2"
            >
              {/* Filled in the band's own navy so the dotted rule reads as
                  stopping at each marker rather than running under it. */}
              <span className="flex size-16 items-center justify-center rounded-full border border-white/35 bg-ink font-display text-[21px] leading-none tracking-[-0.01em] text-white">
                {String(step.id).padStart(2, "0")}
              </span>

              <h3 className="m-0 mt-6 text-[16px] font-semibold leading-[1.35]">
                {step.title}
              </h3>
              <p className="m-0 mt-3 max-w-[24ch] text-[15px] leading-[1.65] text-white/60">
                {step.summary}
              </p>
            </li>
          ))}
        </ol>

        <div className="reveal-soft mt-14 flex justify-center">
          <UnderlineLink href={processBand.link.href} tone="light" withArrow>
            {processBand.link.label}
          </UnderlineLink>
        </div>
      </div>
    </Section>
  );
}
