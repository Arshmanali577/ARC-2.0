import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { localExpertise } from "@/content/homepage";

/**
 * Opens the service-area band. Heading on the left, the positioning statement
 * on the right at its own reading measure — the areas grid follows directly
 * beneath, so this section carries no bottom padding of its own.
 */
export function LocalExpertise() {
  return (
    <Section className="pt-[92px] nav:pt-[128px]">
      <div className="reveal-rows grid grid-cols-1 gap-10 nav:grid-cols-[1fr_1fr] nav:gap-20">
        <div>
          <Eyebrow withRule>{localExpertise.eyebrow}</Eyebrow>
          <SectionHeading size={54} className="mt-6 max-w-[16ch]">
            {localExpertise.heading}
          </SectionHeading>
        </div>
        <p className="m-0 max-w-[54ch] text-[20px] font-light leading-[1.7] text-body nav:self-end">
          {localExpertise.lead}
        </p>
      </div>
    </Section>
  );
}
