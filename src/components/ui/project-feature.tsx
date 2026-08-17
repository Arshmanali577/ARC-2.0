import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icon";
import { HoverVideo } from "@/components/ui/hover-video";
import { MediaPlate } from "@/components/ui/media-plate";
import { projectsPage } from "@/content/pages";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

const { labels, viewLabel } = projectsPage.detail;

type ProjectFeatureProps = {
  project: Project;
  /** Zero-based; rendered as the 01–NN marker. */
  index?: number;
  aspect?: string;
  sizes?: string;
  className?: string;
};

/**
 * A project given a full row: establishing photograph on one side, the
 * write-up and its two headline specifications on the other. Used for the lead
 * project on the homepage and for the featured band on /projects, so both read
 * as the same object at the same weight.
 */
export function ProjectFeature({
  project,
  index = 0,
  aspect = "aspect-[16/11]",
  sizes = "(max-width: 1200px) 100vw, 60vw",
  className,
}: ProjectFeatureProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group grid grid-cols-1 items-end gap-10 wide:grid-cols-[1.55fr_1fr] wide:gap-14",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-surface transition-shadow duration-500 ease-out group-hover:shadow-plate-strong">
        <MediaPlate
          label={project.title}
          tone="plate-1"
          src={project.heroImage}
          alt={project.title}
          sizes={sizes}
          className={cn(
            "w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]",
            aspect,
          )}
        />
        {project.heroVideo ? (
          <HoverVideo
            src={project.heroVideo}
            zoom="group-hover:scale-[1.03]"
          />
        ) : null}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
        />
      </div>

      <div className="wide:pb-2">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {project.location}
          </span>
        </div>

        <h3 className="m-0 mt-6 font-display text-[clamp(26px,7.6vw,32px)] font-normal leading-[1.1] tracking-[-0.01em] nav:text-[40px]">
          {project.title}
        </h3>

        <p className="m-0 mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-body">
          {project.description}
        </p>

        <dl className="m-0 mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-7">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {labels.scope}
            </dt>
            <dd className="m-0 mt-2 text-[14px] leading-[1.5] text-brand">
              {project.scope}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {labels.year}
            </dt>
            <dd className="m-0 mt-2 text-[14px] leading-[1.5] text-brand">
              {project.year}
            </dd>
          </div>
        </dl>

        <span className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand">
          {viewLabel}
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
