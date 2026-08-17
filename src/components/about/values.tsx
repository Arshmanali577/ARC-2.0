import { Section, SectionHeader } from "@/components/ui/section";
import { aboutPage } from "@/content/pages";

const { values } = aboutPage;

/**
 * Four values in the divider grid the design uses for unordered sets — a 1px
 * gap over a hairline ground, no boxes. The index numeral is set large and
 * faint so the column reads as a schedule rather than four marketing cards.
 */
export function AboutValues() {
  return (
    <Section size="default" className="bg-surface">
      <SectionHeader eyebrow={values.eyebrow} heading={values.heading} />

      <div className="reveal-group mt-16 grid grid-cols-1 gap-px bg-line-soft tab:grid-cols-2 wide:grid-cols-4">
        {values.items.map((value) => (
          <article
            key={value.index}
            className="flex min-h-[280px] flex-col bg-surface px-8 py-10 nav:px-9 nav:py-12"
          >
            <span className="font-display text-[clamp(31px,9.5vw,40px)] leading-none text-faint">
              {value.index}
            </span>
            <h3 className="m-0 mt-10 font-display text-[24px] font-normal leading-[1.2] nav:text-[26px]">
              {value.title}
            </h3>
            <p className="m-0 mt-4 text-[15px] leading-[1.7] text-body">
              {value.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
