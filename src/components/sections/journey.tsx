import { Section, SectionHeader } from "@/components/ui/section";
import { journeySection } from "@/content/homepage";
import { processSteps } from "@/content/process";

/**
 * Four stages on a drawn scale. Each stage opens with a rule and a marker, and
 * the first is picked out in brand navy so the sequence has a clear start —
 * the same convention as the figures band at the top of the page.
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

      <ol className="reveal-group m-0 mt-16 grid list-none grid-cols-1 gap-x-9 gap-y-14 p-0 tab:grid-cols-2 wide:grid-cols-4">
        {processSteps.map((step, index) => (
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
                <span className="text-[11px] font-semibold tracking-[0.16em] text-muted">
                  STAGE {String(step.id).padStart(2, "0")}
                </span>
              </div>
            </div>

            <h3 className="m-0 mt-5 font-display text-[26px] font-normal leading-[1.15]">
              {step.title}
            </h3>
            <p className="m-0 mt-3.5 text-[15px] leading-[1.7] text-body">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
