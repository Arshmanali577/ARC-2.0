import { notFound } from "next/navigation";

import { LocationIndex } from "@/components/locations/location-index";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { UnderlineLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectCard } from "@/components/ui/project-card";
import {
  Eyebrow,
  Section,
  SectionHeader,
  SectionHeading,
} from "@/components/ui/section";
import { projectsSection } from "@/content/homepage";
import {
  areaBody,
  areaFaqs,
  getLocalArea,
  localAreas,
} from "@/content/local-areas";
import { locationsPage } from "@/content/pages";
import { getProjects } from "@/content/projects";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const { area: areaCopy } = locationsPage;

export function generateStaticParams() {
  return localAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata(props: PageProps<"/locations/[slug]">) {
  const { slug } = await props.params;
  const area = getLocalArea(slug);

  if (!area) return {};

  return createPageMetadata({
    title: area.title,
    description: area.metaDescription,
    path: `/locations/${area.slug}`,
    keywords: [
      `custom home builder ${area.name}`,
      `builder ${area.name}`,
      `home builder ${area.name}`,
    ],
    images: [area.heroImage],
  });
}

export default async function LocationDetailPage(
  props: PageProps<"/locations/[slug]">,
) {
  const { slug } = await props.params;
  const area = getLocalArea(slug);

  if (!area) notFound();

  const body = areaBody(area);
  const faqs = areaFaqs(area);
  const relevantProjects = getProjects(area.projectSlugs);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: locationsPage.heading, path: "/locations" },
          { name: area.title, path: `/locations/${area.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow={area.regionLabel}
        heading={area.title}
        lead={area.intro}
        image={area.heroImage}
        imageAlt={area.title}
        mediaLabel={area.regionLabel.toUpperCase()}
        size="tall"
      />

      <Section size="default">
        <div className="grid grid-cols-1 items-start gap-14 nav:grid-cols-[1.25fr_1fr] nav:gap-20">
          <div className="reveal-rows">
            <SectionHeading size={54}>
              {areaCopy.buildingHeading(area.name)}
            </SectionHeading>
            {body.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "m-0 mt-8 max-w-[60ch] text-[18px] font-light leading-[1.7] tab:mt-9 tab:text-[20px]"
                    : "m-0 mt-6 max-w-[64ch] text-[16px] leading-[1.8] text-body tab:mt-7 tab:text-[18px]"
                }
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-11 border-t border-line pt-8">
              <UnderlineLink href="/locations" withArrow>
                {areaCopy.backLink}
              </UnderlineLink>
            </div>
          </div>

          {/* The local strengths, read as a schedule rather than a panel of
              marketing bullets. */}
          <div className="reveal-fade nav:sticky nav:top-[120px]">
            <Eyebrow as="h2" withRule>
              {areaCopy.strengthsHeading}
            </Eyebrow>
            <ul className="reveal-group m-0 mt-8 grid list-none grid-cols-1 gap-px bg-line-soft p-0">
              {area.strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex items-start gap-4 bg-white px-6 py-6 text-[17px] leading-[1.65] text-brand"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-brand"
                  />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section size="default" className="bg-surface">
        <SectionHeader
          eyebrow={projectsSection.eyebrow}
          heading={areaCopy.projectsHeading}
        />
        <div className="reveal-group mt-14 grid grid-cols-1 gap-x-9 gap-y-14 tab:grid-cols-2 nav:grid-cols-3">
          {relevantProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              aspect="aspect-[4/5]"
              sizes="(max-width: 639px) 100vw, (max-width: 900px) 50vw, 33vw"
              showDescription={false}
              showAction
            />
          ))}
        </div>
      </Section>

      <Section size="default">
        <SectionHeader
          eyebrow={areaCopy.faqEyebrow}
          heading={areaCopy.faqHeading(area.name)}
        />

        <ul className="m-0 mt-12 list-none p-0">
          {faqs.map((faq, index) => (
            <li
              key={faq.question}
              className="grid grid-cols-1 gap-5 border-b border-line py-10 nav:grid-cols-[64px_1fr_1.35fr] nav:gap-14"
            >
              <span className="text-[12px] font-semibold tracking-[0.16em] text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 font-display text-[22px] font-normal leading-[1.3] nav:text-[24px]">
                {faq.question}
              </h3>
              <p className="m-0 text-[17px] leading-[1.8] text-body">
                {faq.answer}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <LocationIndex activeSlug={area.slug} />

      <CtaBand />
    </>
  );
}
