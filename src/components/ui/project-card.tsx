import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icon";
import { HoverVideo } from "@/components/ui/hover-video";
import { MediaPlate } from "@/components/ui/media-plate";
import type { Project } from "@/content/projects";
import { projectsPage } from "@/content/pages";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  index?: number;
  /** Rendered plate height. Prefer `aspect` for crops that stay consistent. */
  height?: string;
  /** Aspect-ratio class, e.g. `aspect-[4/5]`. Takes precedence over `height`. */
  aspect?: string;
  sizes?: string;
  /** Offsets the card down a row in the two-column grid. */
  staggered?: boolean;
  /** Hides the description in tighter grids where only the label is shown. */
  showDescription?: boolean;
  /** Shows the 01–NN marker used in the homepage's selected work. */
  showIndex?: boolean;
  /** Shows the "View project" action under the meta row. */
  showAction?: boolean;
  /** Larger title and meta, for the featured band on /projects. */
  emphasis?: boolean;
  className?: string;
};

export function ProjectCard({
  project,
  index = 0,
  height = "h-[500px]",
  aspect,
  sizes = "(max-width: 900px) 100vw, 50vw",
  staggered = false,
  showDescription = true,
  showIndex = false,
  showAction = false,
  emphasis = false,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block transition-transform duration-500 ease-out hover:-translate-y-1",
        staggered && "nav:mt-14",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-surface transition-shadow duration-500 ease-out group-hover:shadow-plate",
          aspect ?? height,
        )}
      >
        <MediaPlate
          label={project.title}
          src={project.heroImage}
          alt={project.title}
          sizes={sizes}
          className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        {/* Projects with footage play it under the cursor; the still above is
            the poster the film fades up from, so cards stay identical until
            hovered — and identical for good if the project has no video. */}
        {project.heroVideo ? <HoverVideo src={project.heroVideo} /> : null}
        {/* Reads as a drawing frame rather than a shadowed card. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-6 border-t border-line pt-5 transition-colors duration-300 ease-out group-hover:border-brand">
        <div>
          {showIndex ? (
            <span className="block text-[11px] font-semibold tracking-[0.16em] text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <h3
            className={cn(
              "m-0 font-display font-normal leading-[1.15]",
              emphasis
                ? "text-[28px] nav:text-[32px]"
                : "text-[26px] nav:text-[28px]",
              showIndex && "mt-3",
            )}
          >
            {project.title}
          </h3>
          <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {project.location}
          </span>
        </div>

        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-faint transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        />
      </div>

      {showDescription ? (
        <p className="m-0 mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-body">
          {project.description}
        </p>
      ) : null}

      {showAction ? (
        <span className="mt-5 inline-flex items-center gap-2.5 border-b border-brand pb-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand transition-opacity duration-300 ease-out group-hover:opacity-60">
          {projectsPage.detail.viewLabel}
        </span>
      ) : null}
    </Link>
  );
}
