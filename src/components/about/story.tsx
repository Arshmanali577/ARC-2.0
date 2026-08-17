import { UnderlineLink } from "@/components/ui/button";
import { MediaPlate } from "@/components/ui/media-plate";
import { Section, SectionHeading } from "@/components/ui/section";
import { projectsSection } from "@/content/homepage";
import { aboutPage } from "@/content/pages";

const { story } = aboutPage;

/**
 * The company story. Two frames of the same completed home are layered — the
 * establishing view with a second plate stepped off its corner — so the column
 * beside the copy has depth without a carousel or a collage.
 *
 * The inset only overlaps from 901px up; below that the frames simply stack.
 */
export function AboutStory() {
  return (
    <Section size="default">
      <div className="grid grid-cols-1 items-start gap-14 nav:grid-cols-[1fr_1.15fr] nav:gap-20 wide:gap-24">
        <div className="relative nav:mb-20">
          <MediaPlate
            label={story.media.label}
            tone="plate-1"
            src={story.media.src}
            alt={story.media.alt}
            sizes="(max-width: 900px) 100vw, 42vw"
            className="aspect-[4/5] w-full"
          />

          <div className="mt-5 nav:absolute nav:-bottom-20 nav:-right-12 nav:mt-0 nav:w-[58%] nav:border-[10px] nav:border-white wide:-right-16">
            <MediaPlate
              label={story.mediaInset.label}
              tone="plate-3"
              src={story.mediaInset.src}
              alt={story.mediaInset.alt}
              sizes="(max-width: 900px) 100vw, 25vw"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>

        <div>
          <SectionHeading size={54}>{story.heading}</SectionHeading>

          {story.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "m-0 mt-9 max-w-[60ch] text-[21px] font-light leading-[1.65]"
                  : "m-0 mt-7 max-w-[64ch] text-[17px] leading-[1.8] text-body"
              }
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-11 border-t border-line pt-8">
            <UnderlineLink href={projectsSection.link.href} withArrow>
              {projectsSection.link.label}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
