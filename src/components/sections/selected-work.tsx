import Link from "next/link";

import { UnderlineLink } from "@/components/ui/button";
import { MediaPlate } from "@/components/ui/media-plate";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { projects, projectsSection, type Project } from "@/content/homepage";

export function SelectedWork() {
  return (
    <Section id="projects" className="pb-[110px]">
      <div className="flex flex-col items-start justify-between gap-10 border-b border-line pb-[30px] nav:flex-row nav:items-end">
        <div>
          <Eyebrow>{projectsSection.eyebrow}</Eyebrow>
          <SectionHeading size={54} className="mt-4">
            {projectsSection.heading}
          </SectionHeading>
        </div>
        <UnderlineLink href={projectsSection.link.href}>
          {projectsSection.link.label}
        </UnderlineLink>
      </div>

      <div className="mt-[52px] grid grid-cols-1 gap-11 nav:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className={`group block ${project.staggered ? "nav:mt-14" : ""}`}
    >
      <MediaPlate
        {...project.media}
        sizes="(max-width: 900px) 100vw, 50vw"
        className="h-[500px]"
      />
      <div className="mt-[18px] flex flex-col items-start justify-between gap-1 nav:flex-row nav:items-baseline nav:gap-0">
        <h3 className="m-0 font-display text-[28px] font-normal">
          {project.name}
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          {project.location}
        </span>
      </div>
      <p className="m-0 mt-2.5 text-[15px] leading-[1.6] text-body">
        {project.summary}
      </p>
    </Link>
  );
}
