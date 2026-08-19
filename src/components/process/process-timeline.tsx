import { glyphFor } from "@/components/process/stage-glyphs";
import { CheckCircleIcon } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { Section } from "@/components/ui/section";
import { processStages } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * The journey as a drawn measure: a continuous rule down the page with a
 * marked stage on it, the write-up beside it, and the photograph of what that
 * stage produces alongside — with the outcome of the stage set on a card over
 * the photograph's corner.
 *
 * The rule and its markers only appear from 901px, where there is room for a
 * left rail; below that each stage leads with its marker and stacks. The rule
 * terminates at the final marker rather than running past the last stage.
 *
 * Everything moves off the scroll position — the rule draws itself, the copy
 * comes in from the left, the plate from the right, the outcome card lands
 * last. All of it is CSS on `animation-timeline: view()`, so the page stays a
 * Server Component, costs no JavaScript, and simply renders in place for a
 * visitor who has asked for reduced motion.
 */

export function ProcessTimeline() {
  return (
    <Section size="default">
      <ol className="m-0 list-none p-0">
        {processStages.map((step, index) => {
          const isLast = index === processStages.length - 1;
          const Glyph = glyphFor(step.id);

          return (
            <li
              key={step.id}
              id={`stage-${step.id}`}
              className={cn(
                "group relative scroll-mt-28",
                isLast ? "pb-0" : "pb-20 nav:pb-24",
              )}
            >
              {/* The rule: a full-run hairline with the drawn line over it, so
                  the part of the journey still ahead stays visible. On the
                  last stage both stop at the marker. */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-7 top-0 hidden w-px bg-line-soft nav:block",
                  isLast ? "h-14" : "h-full",
                )}
              >
                <span className="rail-draw absolute inset-0 block bg-brand/40" />
              </span>

              {/* One marker: stacked above the stage number on small screens,
                  sitting on the rule from 901px up. */}
              <span
                aria-hidden
                className="reveal-marker mb-8 flex size-14 items-center justify-center rounded-full bg-brand text-white transition-colors duration-500 ease-out group-hover:bg-ink nav:absolute nav:left-0 nav:top-0 nav:mb-0"
              >
                <Glyph size={24} />
              </span>

              <div className="grid grid-cols-1 items-center gap-12 nav:pl-[104px] wide:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] wide:gap-14">
                <div className="reveal-left">
                  <span className="flex items-center gap-4">
                    <span className="font-display text-[22px] leading-none text-faint">
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-px w-8 bg-gold" />
                  </span>

                  <h2 className="m-0 mt-4 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.12] tracking-[-0.01em] nav:text-[38px]">
                    {step.title}
                  </h2>

                  <p className="m-0 mt-5 max-w-[52ch] text-[17px] leading-[1.8] text-body">
                    {step.description}
                  </p>

                  <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-3.5 p-0">
                    {step.details.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3.5 text-[16px] leading-[1.6] text-brand"
                      >
                        <CheckCircleIcon
                          size={17}
                          className="mt-[3px] text-gold"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <figure className="reveal-right relative m-0">
                  {/* Outer box clips, inner box carries the settle, so the
                      plate's overscale is cropped instead of spilling over
                      the copy beside it. */}
                  <div className="overflow-hidden bg-surface">
                    <div className="plate-settle">
                      <MediaPlate
                        label={step.media.caption}
                        tone="plate-2"
                        src={step.media.src}
                        alt={step.media.alt}
                        sizes="(max-width: 900px) 100vw, (max-width: 1200px) 90vw, 46vw"
                        className="aspect-[5/3] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>

                  {/* The outcome line, set over the corner of the plate. It hangs
                      off the left edge from 901px, where the rail has already
                      pushed the column inboard and there is room for it. */}
                  <figcaption className="reveal-lift absolute bottom-5 left-5 flex max-w-[272px] items-center gap-3.5 bg-white p-4 shadow-plate transition-shadow duration-500 ease-out group-hover:shadow-plate-strong nav:-left-9 nav:bottom-7">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center bg-gold text-white"
                    >
                      <Glyph size={19} />
                    </span>
                    <span className="block text-[15px] leading-[1.55] text-brand">
                      {step.outcome}
                    </span>
                  </figcaption>
                </figure>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
