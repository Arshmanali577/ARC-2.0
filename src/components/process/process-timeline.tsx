import { MediaPlate } from "@/components/ui/media-plate";
import { Section } from "@/components/ui/section";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * The journey as a drawn measure: a continuous rule down the page with a
 * numbered marker at each stage, the write-up beside it and a supporting
 * photograph alongside.
 *
 * The rule and its markers only appear from 901px, where there is room for a
 * left rail; below that each stage leads with its marker and stacks. The rule
 * terminates at the final marker rather than running past the last stage.
 */
export function ProcessTimeline() {
  return (
    <Section size="default">
      <ol className="m-0 list-none p-0">
        {processSteps.map((step, index) => {
          const isLast = index === processSteps.length - 1;

          return (
            <li
              key={step.id}
              id={`stage-${step.id}`}
              className={cn(
                "group reveal relative scroll-mt-28",
                isLast ? "pb-0" : "pb-24 nav:pb-28",
              )}
            >
              {/* The rule. On the last stage it stops at the marker. */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-7 top-0 hidden w-px bg-line nav:block",
                  isLast ? "h-14" : "h-full",
                )}
              />

              {/* One element: stacked above the title on small screens, sitting
                  on the rule from 901px up. */}
              <span
                aria-hidden
                className="mb-8 flex h-14 w-14 items-center justify-center border border-line-strong bg-white font-display text-[18px] leading-none text-brand transition-colors duration-500 ease-out group-hover:border-brand group-hover:bg-brand group-hover:text-white nav:absolute nav:left-0 nav:top-0 nav:mb-0"
              >
                {String(step.id).padStart(2, "0")}
              </span>

              <div className="grid grid-cols-1 gap-10 nav:pl-[104px] wide:grid-cols-[1.05fr_1fr] wide:items-start wide:gap-16">
                <div>
                  <h2 className="m-0 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.12] tracking-[-0.01em] nav:text-[38px]">
                    {step.title}
                  </h2>

                  <p className="m-0 mt-6 max-w-[54ch] text-[17px] leading-[1.8] text-body">
                    {step.description}
                  </p>

                  <ul className="m-0 mt-9 grid list-none grid-cols-1 gap-px bg-line-soft p-0 tab:grid-cols-2">
                    {step.details.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3.5 bg-white px-5 py-4 text-[15px] leading-[1.6] text-brand"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-brand"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <figure className="m-0">
                  <div className="relative overflow-hidden bg-surface">
                    <MediaPlate
                      label={step.media.caption}
                      tone="plate-2"
                      src={step.media.src}
                      alt={step.media.alt}
                      sizes="(max-width: 1200px) 100vw, 42vw"
                      className="aspect-[4/3] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-center gap-4">
                    <span aria-hidden className="h-px w-8 bg-line-strong" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                      {step.media.caption}
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
