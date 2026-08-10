import { UnderlineLink } from "@/components/ui/button";
import { MediaPlate } from "@/components/ui/media-plate";
import { Eyebrow, SectionHeading, gutter } from "@/components/ui/section";
import { pillars, practice } from "@/content/homepage";

export function Practice() {
  return (
    <section id="studio" className="bg-brand text-white">
      <div
        className={`grid grid-cols-1 items-start gap-20 py-[110px] nav:grid-cols-[1fr_1.15fr] ${gutter}`}
      >
        <div>
          <Eyebrow tone="light">{practice.eyebrow}</Eyebrow>
          <SectionHeading className="mt-[18px]">
            {practice.heading}
          </SectionHeading>
          <MediaPlate
            {...practice.media}
            sizes="(max-width: 900px) 100vw, 45vw"
            className="mt-[42px] h-[380px]"
          />
        </div>

        <div className="nav:pt-12">
          <p className="m-0 text-[21px] font-light leading-[1.65] text-white/92">
            {practice.lead}
          </p>
          <p className="m-0 mt-6 text-[17px] leading-[1.75] text-mist-deep">
            {practice.body}
          </p>

          {/* 1px gap over a translucent white ground draws the divider grid */}
          <div className="mt-[46px] grid grid-cols-1 gap-px bg-line-invert-soft nav:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.index} className="bg-brand px-[26px] py-7">
                <div className="text-[11px] font-semibold tracking-[0.16em] text-mist">
                  {pillar.index}
                </div>
                <h3 className="m-0 mt-3.5 text-[17px] font-semibold">
                  {pillar.title}
                </h3>
                <p className="m-0 mt-2 text-[14px] leading-[1.6] text-mist-deep">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <UnderlineLink
            href={practice.link.href}
            tone="light"
            className="mt-[38px]"
          >
            {practice.link.label}
          </UnderlineLink>
        </div>
      </div>
    </section>
  );
}
