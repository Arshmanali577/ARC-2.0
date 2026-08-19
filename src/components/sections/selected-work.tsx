import { ProjectCard } from "@/components/ui/project-card";
import { ProjectFeature } from "@/components/ui/project-feature";
import { Section, SectionHeader } from "@/components/ui/section";
import { projectsSection } from "@/content/homepage";
import { featuredProjects } from "@/content/projects";

/** The four featured projects the live homepage surfaces, in data order. */
const [lead, ...supporting] = featuredProjects.slice(0, 4);

/**
 * One project carries the section — a wide establishing view with the write-up
 * beside it — and the remaining three sit under it in a measured row. Peers on
 * a flat grid give the eye nowhere to land; a lead and a row does.
 */
export function SelectedWork() {
  return (
    <Section id="projects" size="default">
      <SectionHeader
        eyebrow={projectsSection.eyebrow}
        heading={projectsSection.heading}
        action={projectsSection.link}
      />

      <ProjectFeature project={lead} index={0} className="reveal mt-16" />

      <div className="reveal-group mt-20 grid grid-cols-1 gap-x-9 gap-y-14 tab:grid-cols-2 nav:grid-cols-3">
        {supporting.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index + 1}
            aspect="aspect-[4/5]"
            sizes="(max-width: 639px) 100vw, (max-width: 900px) 50vw, 33vw"
            showDescription={false}
            showIndex
          />
        ))}
      </div>
    </Section>
  );
}
