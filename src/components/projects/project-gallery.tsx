import { MediaPlate } from "@/components/ui/media-plate";
import { Section, SectionHeading } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import type { Project } from "@/content/projects";

/**
 * Every gallery frame on one crop. Galleries here run from six to thirty
 * images, so a single 4:3 ratio across the grid is what keeps a long set
 * scannable — the rhythm comes from the column count changing at each
 * breakpoint, not from tiles of different shapes.
 *
 * Only the masthead image is eager; every frame below loads lazily through
 * `next/image`.
 */
export function ProjectGallery({ project }: { project: Project }) {
  const count = project.images.length;

  return (
    <Section size="default" className="bg-surface">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-7 nav:flex-row nav:items-baseline nav:gap-12">
        <SectionHeading>{projectsPage.detail.galleryHeading}</SectionHeading>
        <p className="m-0 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {count} {count === 1 ? "image" : "images"}
        </p>
      </div>

      <ul className="reveal-group m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 tab:grid-cols-2 wide:grid-cols-3">
        {project.images.map((image, index) => (
          <li key={image} className="group relative overflow-hidden bg-white">
            <MediaPlate
              label={`${project.title} — ${index + 1}`}
              tone="plate-2"
              src={image}
              alt={`${project.title}, image ${index + 1} of ${count}`}
              sizes="(max-width: 639px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="aspect-[4/3] w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/40"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
