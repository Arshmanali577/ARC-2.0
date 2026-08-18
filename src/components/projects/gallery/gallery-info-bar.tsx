import {
  CalendarCheckIcon,
  DraftIcon,
  HomeIcon,
  PinIcon,
} from "@/components/ui/icon";
import { projectsPage } from "@/content/pages";
import type { Project } from "@/content/projects";

const { labels } = projectsPage.detail;

/**
 * The four facts that identify the build, closing the gallery band.
 *
 * Deliberately a summary, not a second specification card: the eight-row
 * version already sits in the About section above, so this repeats only what a
 * visitor who has scrolled through thirty photographs needs re-anchoring on —
 * whose house it is, where, when, and how it was delivered.
 */
export function GalleryInfoBar({ project }: { project: Project }) {
  const facts = [
    { label: labels.project, value: project.title, Icon: HomeIcon },
    { label: labels.location, value: project.location, Icon: PinIcon },
    { label: labels.yearCompleted, value: project.year, Icon: CalendarCheckIcon },
    { label: labels.buildType, value: project.buildType, Icon: DraftIcon },
  ];

  return (
    <dl className="m-0 mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-line-soft bg-line-soft shadow-plate tab:mt-6 tab:grid-cols-2 nav:grid-cols-4">
      {facts.map((fact) => (
        <div
          key={`${fact.label}-${fact.value}`}
          className="flex items-center gap-3.5 bg-white px-5 py-[18px] tab:px-6 tab:py-5"
        >
          <fact.Icon size={18} className="text-muted" />
          <div className="min-w-0">
            <dt className="m-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
              {fact.label}
            </dt>
            <dd className="m-0 mt-1 truncate text-[14px] font-medium text-ink tab:text-[15px]">
              {fact.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
