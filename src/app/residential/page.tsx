import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectCard } from "@/components/ui/project-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServiceRows } from "@/components/ui/service-rows";
import { residentialPage } from "@/content/pages";
import { getProjects } from "@/content/projects";
import { residentialServices } from "@/content/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(residentialPage.seo);

const recentWork = getProjects(residentialPage.work.projectSlugs);

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow={residentialPage.eyebrow}
        heading={residentialPage.heading}
        lead={residentialPage.lead}
        image={residentialPage.heroImage}
        imageAlt="Oakmont Residence, Greenbank"
        mediaLabel="OAKMONT RESIDENCE — GREENBANK"
      />

      <Section size="default">
        <ServiceRows services={residentialServices} withAnchors headingLevel={2} showArrow={false} />
      </Section>

      <Section size="default" className="bg-surface">
        <SectionHeader
          eyebrow={residentialPage.work.eyebrow}
          heading={residentialPage.work.heading}
        />

        <div className="reveal-group mt-14 grid grid-cols-1 gap-x-9 gap-y-14 tab:grid-cols-2 nav:grid-cols-3">
          {recentWork.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              aspect="aspect-[4/5]"
              sizes="(max-width: 639px) 100vw, (max-width: 900px) 50vw, 33vw"
              showDescription={false}
              showAction
            />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
