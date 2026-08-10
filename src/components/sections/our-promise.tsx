import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { promise } from "@/content/homepage";

export function OurPromise() {
  return (
    <Section className="py-[110px]">
      <div className="grid grid-cols-1 items-center gap-[72px] nav:grid-cols-[1fr_1.15fr]">
        <div>
          <Eyebrow>{promise.eyebrow}</Eyebrow>
          <SectionHeading size={54} className="mt-[18px]">
            {promise.heading}
          </SectionHeading>
        </div>
        <div>
          <p className="m-0 text-[21px] font-light leading-[1.65]">
            {promise.lead}
          </p>
          <p className="m-0 mt-6 text-[17px] leading-[1.75] text-body">
            {promise.body}
          </p>
        </div>
      </div>
    </Section>
  );
}
