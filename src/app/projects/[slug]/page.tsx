import { notFound } from "next/navigation";

import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectMasthead } from "@/components/projects/project-masthead";
import {
  ProjectNav,
  getAdjacentProjects,
} from "@/components/projects/project-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { UnderlineLink } from "@/components/ui/button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import { getProject, projects } from "@/content/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const { detail } = projectsPage;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: [project.title, project.location, project.scope],
    images: [project.heroImage],
  });
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const specs = [
    { label: detail.labels.location, value: project.location },
    { label: detail.labels.scope, value: project.scope },
    { label: detail.labels.architect, value: project.architect },
    { label: detail.labels.year, value: project.year },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: projectsPage.heading, path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <ProjectMasthead
        project={project}
        position={projects.findIndex((item) => item.slug === project.slug) + 1}
        total={projects.length}
      />

      <Section size="default">
        <div className="grid grid-cols-1 items-start gap-14 nav:grid-cols-[1fr_1.5fr] nav:gap-20">
          {/* The specification rail tracks the write-up rather than stopping
              a third of the way down the column. */}
          <div className="nav:sticky nav:top-[120px]">
            <Eyebrow as="h2" withRule>
              {detail.detailsHeading}
            </Eyebrow>
            <dl className="reveal-group m-0 mt-8 border-t border-line">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-1 gap-1.5 border-b border-line py-5 tab:grid-cols-[92px_1fr] tab:gap-6"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                    {spec.label}
                  </dt>
                  <dd className="m-0 text-[15px] leading-[1.6] text-brand">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
            <UnderlineLink href="/projects" className="mt-9">
              {detail.backLink}
            </UnderlineLink>
          </div>

          <div>
            <SectionHeading size={54}>{detail.aboutHeading}</SectionHeading>
            <p className="m-0 mt-8 max-w-[62ch] text-[21px] font-light leading-[1.65]">
              {project.description}
            </p>
            <p className="m-0 mt-7 max-w-[68ch] text-[17px] leading-[1.8] text-body">
              {project.projectNarrative}
            </p>
          </div>
        </div>
      </Section>

      <ProjectGallery project={project} />

      <ProjectNav previous={previous} next={next} />

      <CtaBand />
    </>
  );
}
