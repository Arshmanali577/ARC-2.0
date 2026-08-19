import { FeaturedCarousel } from "@/components/projects/featured-carousel";
import { ProjectsIndex } from "@/components/projects/projects-index";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
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
        size="full"
        eyebrowTone="brass"
        divider
      />

      <FeaturedCarousel />

      {/* The showcase band's "view all projects" lands here. */}
      <Section id="all-projects" size="default">
        <h2 className="reveal-soft m-0 font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.1em] text-brand nav:text-[26px]">
          {projectsPage.index.heading}
        </h2>

        <ProjectsIndex
          projects={projects}
          allLabel={projectsPage.allFilterLabel}
          className="mt-8"
        />
      </Section>

      <CtaBand />
    </>
  );
}
