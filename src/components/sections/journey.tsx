import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { journeySection, stages } from "@/content/homepage";

export function Journey() {
  return (
    <Section id="journey" className="bg-surface py-[110px]">
      <div className="max-w-[620px]">
        <Eyebrow>{journeySection.eyebrow}</Eyebrow>
        <SectionHeading className="mt-4">
          {journeySection.heading}
        </SectionHeading>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 nav:grid-cols-2 wide:grid-cols-4">
        {stages.map((stage, index) => (
          <div
            key={stage.index}
            className={`border-t-2 pt-[22px] ${
              index === 0 ? "border-brand" : "border-line-stage"
            }`}
          >
            <div className="text-[11px] font-semibold tracking-[0.16em] text-muted">
              {stage.index}
            </div>
            <h3 className="m-0 mt-3.5 font-display text-[26px] font-normal">
              {stage.title}
            </h3>
            <p className="m-0 mt-2.5 text-[15px] leading-[1.65] text-body">
              {stage.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
