import { notFound } from "next/navigation";

import { ProjectAbout } from "@/components/projects/project-about";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectMasthead } from "@/components/projects/project-masthead";
import {
  ProjectNav,
  getAdjacentProjects,
} from "@/components/projects/project-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { projectsPage } from "@/content/pages";
import { getProject, projects } from "@/content/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

/** The gallery's scroll target, linked from the About card's action. */
const GALLERY_ANCHOR = "project-gallery";

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

      <ProjectAbout project={project} galleryHref={`#${GALLERY_ANCHOR}`} />

      {/* The gallery's own markup is left alone; the scroll target lives here
          so the card's action has somewhere to land, clear of the header. */}
      <div id={GALLERY_ANCHOR} aria-hidden className="scroll-mt-[92px]" />
      <ProjectGallery project={project} />

      <ProjectNav previous={previous} next={next} />

      <CtaBand />
    </>
  );
}
