import { Section, SectionHeader } from "@/components/ui/section";
import { journeySection } from "@/content/homepage";
import { processStages } from "@/content/process";

/**
 * Five stages on a drawn scale. Each stage opens with a rule and a marker, and
 * the first is picked out in brand navy so the sequence has a clear start —
 * the same convention as the figures band at the top of the page.
 *
 * Three columns at tablet rather than two: five stages split 3 + 2, which
 * leaves one orphan on the last row instead of a lone stage under two full
 * rows.
 */
export function Journey() {
  return (
    <Section id="journey" size="default" className="bg-surface">
      <SectionHeader
        eyebrow={journeySection.eyebrow}
        heading={journeySection.heading}
        lead={journeySection.lead}
        action={journeySection.link}
      />

      <ol className="reveal-group m-0 mt-16 grid list-none grid-cols-1 gap-x-8 gap-y-14 p-0 tab:grid-cols-3 wide:grid-cols-5">
        {processStages.map((step, index) => (
          <li key={step.id}>
            <div
              className={`border-t-2 ${
                index === 0 ? "border-brand" : "border-line-stage"
              }`}
            >
              <div className="flex items-center gap-3.5 pt-6">
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 ${
                    index === 0 ? "bg-brand" : "bg-line-stage"
                  }`}
                />
                <span className="text-[12px] font-semibold tracking-[0.16em] text-muted">
                  STAGE {String(step.id).padStart(2, "0")}
                </span>
              </div>
            </div>

            <h3 className="m-0 mt-5 font-display text-[26px] font-normal leading-[1.15] wide:text-[23px]">
              {step.title}
            </h3>
            <p className="m-0 mt-3.5 text-[16px] leading-[1.7] text-body wide:text-[15px]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
