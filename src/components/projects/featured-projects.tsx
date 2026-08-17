import { ProjectCard } from "@/components/ui/project-card";
import { ProjectFeature } from "@/components/ui/project-feature";
import { Section, SectionHeader } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import { featuredProjects } from "@/content/projects";

const [lead, ...rest] = featuredProjects;

/**
 * The showcase band. One project takes a full editorial row, the remaining
 * featured builds sit beneath it two-up at a wider crop than the index grid
 * below — so the hierarchy reads editorial → featured → catalogue without a
 * single project being left out further down the page.
 */
export function FeaturedProjects() {
  return (
    <Section size="default">
      <SectionHeader
        eyebrow={projectsPage.featured.eyebrow}
        heading={projectsPage.featured.heading}
      />

      <ProjectFeature project={lead} index={0} className="mt-16" />

      <div className="reveal-group mt-20 grid grid-cols-1 gap-x-11 gap-y-16 tab:grid-cols-2">
        {rest.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index + 1}
            aspect="aspect-[4/3]"
            sizes="(max-width: 639px) 100vw, 50vw"
            showDescription={false}
            showIndex
            showAction
            emphasis
          />
        ))}
      </div>
    </Section>
  );
}
