import Link from "next/link";

import { HoverVideo } from "@/components/ui/hover-video";
import { PinIcon } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { projectTypeNames, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * The catalogue tile: one photograph carrying its own label rather than a
 * plate with a caption block under it. That is what lets the portfolio grid
 * run four-up without the page turning into rows of text — and it is why the
 * type sits on a scrim here instead of on the page ground, as it does on
 * `ProjectCard`, which is still the right object wherever a project needs a
 * description beside it.
 */
export function ProjectTile({
  project,
  sizes = "(max-width: 639px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw",
  className,
}: {
  project: Project;
  sizes?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block aspect-[16/15] overflow-hidden bg-brand-deep transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-plate-strong",
        className,
      )}
    >
      <MediaPlate
        label={project.title}
        tone="dark"
        src={project.heroImage}
        alt={project.title}
        sizes={sizes}
        className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />

      {/* Same treatment as the featured band and the project cards: the still
          is the poster the film fades up from, so a tile is identical until it
          is hovered — and identical for good if the project has no footage. */}
      {project.heroVideo ? (
        <HoverVideo src={project.heroVideo} zoom="group-hover:scale-[1.06]" />
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,26,56,0.94) 0%, rgba(0,26,56,0.62) 28%, rgba(0,43,92,0.14) 62%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white tab:p-6">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
          {projectTypeNames[project.type]}
        </span>

        <h3 className="m-0 mt-2.5 font-display text-[20px] font-normal leading-[1.15] tracking-[-0.01em] tab:text-[22px]">
          {project.title}
        </h3>

        <span className="mt-2 flex items-center gap-1.5 text-[12px] font-medium tracking-[0.04em] text-white/72">
          <PinIcon size={13} className="text-white/55" />
          {project.location}
        </span>
      </div>

      {/* Reads as a drawing frame rather than a shadowed card. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
      />
    </Link>
  );
}
