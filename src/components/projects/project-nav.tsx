import Link from "next/link";

import { ArrowRight } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { Section } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";

const { previousLabel, nextLabel } = projectsPage.detail;

/** The projects either side of this one, wrapping at the ends of the list. */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

/**
 * Continues the walk through the portfolio rather than dead-ending on a
 * project. Two halves of one rule, split by a hairline.
 */
export function ProjectNav({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  if (!previous && !next) return null;

  return (
    <Section as="nav" size="tight" aria-label="Project navigation">
      <div className="reveal grid grid-cols-1 gap-px border-y border-line bg-line-soft nav:grid-cols-2">
        {previous ? (
          <NavCard project={previous} label={previousLabel} direction="prev" />
        ) : (
          <span className="bg-white" />
        )}
        {next ? (
          <NavCard project={next} label={nextLabel} direction="next" />
        ) : (
          <span className="bg-white" />
        )}
      </div>
    </Section>
  );
}

function NavCard({
  project,
  label,
  direction,
}: {
  project: Project;
  label: string;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex items-center gap-6 bg-white px-6 py-7 transition-colors duration-300 ease-out hover:bg-surface nav:px-9 nav:py-8",
        isNext && "nav:flex-row-reverse nav:text-right",
      )}
    >
      <div className="relative aspect-[4/3] w-[84px] shrink-0 overflow-hidden bg-surface tab:w-[110px] nav:w-[118px]">
        <MediaPlate
          label={project.title}
          tone="plate-3"
          src={project.heroImage}
          alt={project.title}
          sizes="(max-width: 639px) 84px, 120px"
          className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted",
            isNext && "nav:justify-end",
          )}
        >
          {!isNext ? (
            <ArrowRight
              size={14}
              className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            />
          ) : null}
          {label}
          {isNext ? (
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          ) : null}
        </span>
        <span className="mt-3 block font-display text-[20px] font-normal leading-[1.2] [text-wrap:balance] tab:text-[24px] nav:text-[28px]">
          {project.title}
        </span>
        <span className="mt-2 block text-[12px] font-medium uppercase tracking-[0.14em] text-faint">
          {project.location}
        </span>
      </div>
    </Link>
  );
}
