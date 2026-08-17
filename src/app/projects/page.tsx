import { FeaturedProjects } from "@/components/projects/featured-projects";
import { ProjectsIndex } from "@/components/projects/projects-index";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import { projects } from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(projectsPage.seo);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={projectsPage.eyebrow}
        heading={projectsPage.heading}
        lead={projectsPage.lead}
        image={projectsPage.heroImage}
        imageAlt="Aurelia Residence, Pallara"
        mediaLabel="AURELIA RESIDENCE — PALLARA"
      />

      <FeaturedProjects />

      <Section size="default" className="bg-surface">
        <SectionHeader
          eyebrow={projectsPage.index.eyebrow}
          heading={projectsPage.index.heading}
          rule={false}
          className="mb-12"
        />
        <ProjectsIndex
          projects={projects}
          allLabel={projectsPage.allFilterLabel}
        />
      </Section>

      <CtaBand />
    </>
  );
}
