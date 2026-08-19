import Link from "next/link";

import { MediaPlate } from "@/components/ui/media-plate";
import { gutter } from "@/components/ui/section";
import { splitWords, wordsClass } from "@/components/ui/split-text";
import { projectsPage } from "@/content/pages";
import type { Project } from "@/content/projects";

const { backLink } = projectsPage.detail;

/**
 * The project masthead. Same vocabulary as the homepage hero — bottom-weighted
 * scrim, inset drawing frame, baseline rail — with the photograph given the
 * whole viewport, and the same clocked entrance, so arriving on a project
 * reads as the same movement as arriving anywhere else. The specifications
 * deliberately stay in the Project Details rail below rather than being
 * printed twice.
 */
export function ProjectMasthead({
  project,
  position,
  total,
}: {
  project: Project;
  /** One-based position in the portfolio, shown on the baseline rail. */
  position: number;
  total: number;
}) {
  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden nav:min-h-[calc(100svh-92px)] nav:max-h-[900px]">
      {/* MediaPlate owns `relative` for `next/image fill`, so the layer that
          takes it out of flow has to be this wrapper. */}
      <div className="enter-plate absolute inset-0">
        <MediaPlate
          label={project.title.toUpperCase()}
          tone="dark"
          src={project.heroImage}
          video={project.heroVideo}
          alt={project.title}
          priority
          align="end"
          labelPadding={20}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,26,56,0.94) 0%, rgba(0,26,56,0.74) 28%, rgba(0,43,92,0.36) 62%, rgba(0,43,92,0.16) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-white/12 nav:inset-7"
      />

      <div
        className={`enter-stagger relative z-10 mt-auto pb-11 pt-[132px] ${gutter}`}
      >
        <Link
          href="/projects"
          className="inline-block border-b border-white/40 pb-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors duration-300 ease-out hover:border-white hover:text-white"
        >
          {backLink}
        </Link>

        <span className="mt-10 flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-white/45" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-mist">
            {project.location}
          </span>
        </span>

        <h1
          className={`${wordsClass.enter} m-0 mt-7 max-w-[14ch] font-display text-[clamp(33px,10.5vw,44px)] font-normal leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance] nav:text-[62px] wide:text-[80px]`}
        >
          {splitWords(project.title, "enter", 150)}
        </h1>

        {/* Where this build sits in the portfolio — the counterpart to the
            previous/next walk at the foot of the page. */}
        <div className="mt-14 flex items-center gap-5 border-t border-white/20 pt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">
          <span>
            Project {String(position).padStart(2, "0")} / {total}
          </span>
          <span aria-hidden className="h-px flex-1 bg-white/12" />
          <span className="tracking-[0.14em] text-mist">{project.year}</span>
        </div>
      </div>
    </section>
  );
}
