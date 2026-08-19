"use client";

import { useMemo, useState } from "react";

import { ChevronDown } from "@/components/ui/icon";
import { ProjectTile } from "@/components/ui/project-tile";
import { projectsPage } from "@/content/pages";
import {
  projectTypeLabels,
  type Project,
  type ProjectType,
} from "@/content/projects";
import { cn } from "@/lib/cn";

const { sort: sortCopy } = projectsPage.index;

type SortKey = "latest" | "oldest" | "title";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "latest", label: sortCopy.latest },
  { value: "oldest", label: sortCopy.oldest },
  { value: "title", label: sortCopy.title },
];

/**
 * Newest first, and within a year the later project first — the portfolio is
 * ordered oldest to newest in `content/projects.ts`, so the id is a reliable
 * tiebreak where the year alone leaves a dozen builds sharing a rank.
 */
function compare(a: Project, b: Project, key: SortKey) {
  if (key === "title") return a.title.localeCompare(b.title);

  const direction = key === "latest" ? -1 : 1;
  const byYear = Number(a.year) - Number(b.year);

  return direction * (byYear !== 0 ? byYear : Number(a.id) - Number(b.id));
}

/**
 * The complete catalogue with its two controls: the type filter on one edge
 * and the sort on the other. Both are the only pieces of this page that need
 * the client, and the count they produce is announced rather than printed —
 * the grid itself is the visible answer, but a screen reader has no way of
 * seeing eleven tiles turn into four.
 */
export function ProjectsIndex({
  projects,
  allLabel,
  className,
}: {
  projects: Project[];
  allLabel: string;
  className?: string;
}) {
  const [active, setActive] = useState<ProjectType | "all">("all");
  const [sort, setSort] = useState<SortKey>("latest");

  const types = useMemo(
    () => Array.from(new Set(projects.map((project) => project.type))),
    [projects],
  );

  const visible = useMemo(() => {
    const matching =
      active === "all"
        ? projects
        : projects.filter((project) => project.type === active);

    return [...matching].sort((a, b) => compare(a, b, sort));
  }, [projects, active, sort]);

  const filters: { value: ProjectType | "all"; label: string }[] = [
    { value: "all", label: allLabel },
    ...types.map((type) => ({ value: type, label: projectTypeLabels[type] })),
  ];

  return (
    <div className={className}>
      <div className="reveal-soft flex flex-col items-start justify-between gap-6 nav:flex-row nav:items-center nav:gap-12">
        <div
          role="group"
          aria-label="Filter projects by type"
          className="flex flex-wrap gap-2.5"
        >
          {filters.map((filter) => {
            const isActive = filter.value === active;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(filter.value)}
                className={cn(
                  "border px-5 py-3 text-[13px] font-medium uppercase tracking-[0.12em] transition duration-300 ease-out active:scale-[0.97]",
                  isActive
                    ? "border-brand bg-brand text-white"
                    : "border-line-strong text-brand hover:border-brand hover:bg-brand hover:text-white",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            id="projects-sort-label"
            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted"
          >
            {sortCopy.label}
          </span>

          {/* A native select, styled down rather than rebuilt: it keeps the
              platform's own keyboard handling and its phone picker, which no
              amount of custom listbox code matches. */}
          <span className="relative inline-flex items-center">
            <select
              value={sort}
              aria-labelledby="projects-sort-label"
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="cursor-pointer appearance-none bg-transparent pr-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand transition-opacity duration-300 ease-out hover:opacity-70"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-0 text-brand"
            />
          </span>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="reveal-group mt-9 grid grid-cols-1 gap-4 tab:grid-cols-2 nav:grid-cols-3 nav:gap-5 wide:grid-cols-4">
        {visible.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
