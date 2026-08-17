"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ui/project-card";
import {
  projectTypeLabels,
  type Project,
  type ProjectType,
} from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * The complete catalogue and its type filter, as on the live site. The filter
 * is the only piece of this page that needs the client; the count beside it
 * keeps the control honest when a filter narrows the list.
 */
export function ProjectsIndex({
  projects,
  allLabel,
}: {
  projects: Project[];
  allLabel: string;
}) {
  const [active, setActive] = useState<ProjectType | "all">("all");

  const types = useMemo(
    () => Array.from(new Set(projects.map((project) => project.type))),
    [projects],
  );

  const visible =
    active === "all"
      ? projects
      : projects.filter((project) => project.type === active);

  const filters: { value: ProjectType | "all"; label: string }[] = [
    { value: "all", label: allLabel },
    ...types.map((type) => ({ value: type, label: projectTypeLabels[type] })),
  ];

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-7 nav:flex-row nav:items-center nav:gap-12">
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
                  "border px-5 py-3.5 text-[13px] uppercase tracking-[0.12em] transition duration-300 ease-out",
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

        <p
          aria-live="polite"
          className="m-0 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"
        >
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="reveal-group mt-14 grid grid-cols-1 gap-x-9 gap-y-16 tab:grid-cols-2 wide:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            aspect="aspect-[4/5]"
            sizes="(max-width: 639px) 100vw, (max-width: 1200px) 50vw, 33vw"
            showDescription={false}
            showAction
          />
        ))}
      </div>
    </>
  );
}
