import type { ComponentType } from "react";

import { BlueprintHouse } from "@/components/ui/blueprint-house";
import { Button } from "@/components/ui/button";
import {
  ArmchairIcon,
  BathIcon,
  BedIcon,
  BifoldIcon,
  CalendarCheckIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  DraftIcon,
  ElevationIcon,
  GemIcon,
  HammerIcon,
  HomeIcon,
  PersonIcon,
  PinIcon,
  QuoteIcon,
  SofaIcon,
} from "@/components/ui/icon";
import { Counter } from "@/components/ui/counter";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import {
  projectStatus,
  projectTypeNames,
  type Project,
} from "@/content/projects";
import { cn } from "@/lib/cn";

const { labels, aboutHeading, galleryCta, features, stats } =
  projectsPage.detail;

type Glyph = ComponentType<{ className?: string; size?: number }>;

/** Content names a glyph; the drawing itself stays out of the content file. */
const featureGlyphs: Record<string, Glyph> = {
  architecture: ElevationIcon,
  openPlan: SofaIcon,
  materials: GemIcon,
  outdoor: BifoldIcon,
};

/* -- Specification card ---------------------------------------------------- */

/**
 * The eight facts about the build, on a floating white card that tracks the
 * write-up beside it. Rows are dropped rather than left blank when a project
 * has no figure for them, so the card never prints an empty value.
 */
function ProjectFactCard({
  project,
  galleryHref,
}: {
  project: Project;
  galleryHref: string;
}) {
  const facts: { label: string; value: string; Icon: Glyph }[] = [
    { label: labels.location, value: project.location, Icon: PinIcon },
    {
      label: labels.projectType,
      value: projectTypeNames[project.type],
      Icon: HomeIcon,
    },
    { label: labels.buildType, value: project.buildType, Icon: DraftIcon },
    { label: labels.architect, value: project.architect, Icon: PersonIcon },
    { label: labels.scope, value: project.scope, Icon: HammerIcon },
    { label: labels.yearCompleted, value: project.year, Icon: CalendarIcon },
    {
      label: labels.duration,
      value: project.buildDuration,
      Icon: ClockIcon,
    },
    { label: labels.status, value: projectStatus, Icon: CheckCircleIcon },
  ].filter((fact) => Boolean(fact.value));

  return (
    <div className="reveal rounded-[22px] border border-line-soft bg-white p-5 shadow-plate tab:rounded-[24px] tab:p-7">
      <dl className="m-0">
        {facts.map(({ label, value, Icon }, index) => (
          <div
            key={label}
            className={cn(
              "group/row flex items-start gap-4 py-[15px]",
              index > 0 && "border-t border-line-soft",
            )}
          >
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-brand transition-[background-color,color,transform] duration-500 ease-out group-hover/row:-translate-y-0.5 group-hover/row:bg-brand group-hover/row:text-white"
            >
              <Icon size={19} />
            </span>
            <div className="min-w-0">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                {label}
              </dt>
              <dd className="m-0 mt-[5px] text-[16px] leading-[1.5] text-brand">
                {value}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <Button
        href={galleryHref}
        variant="cardSolid"
        withArrow
        className="mt-6"
      >
        {galleryCta}
      </Button>
    </div>
  );
}

/* -- Statistics ------------------------------------------------------------ */

/**
 * Bedrooms, bathrooms, living areas and the year, counted off the project's
 * own gallery. Two columns on a phone, one row from tablet up; the column
 * count is picked from a fixed set so the class names stay static.
 */
function ProjectStats({ project }: { project: Project }) {
  const cells = [
    { key: "bed", value: project.bedrooms, label: stats.bedrooms, Icon: BedIcon },
    {
      key: "bath",
      value: project.bathrooms,
      label: stats.bathrooms,
      Icon: BathIcon,
    },
    {
      key: "living",
      value: project.livingAreas,
      label: stats.livingAreas,
      Icon: ArmchairIcon,
    },
    {
      key: "year",
      value: project.year,
      label: stats.completed,
      Icon: CalendarCheckIcon,
    },
  ].filter(
    (cell): cell is typeof cell & { value: string | number } =>
      cell.value !== undefined,
  );

  if (cells.length < 2) return null;

  const columns =
    { 2: "tab:grid-cols-2", 3: "tab:grid-cols-3", 4: "tab:grid-cols-4" }[
      Math.min(cells.length, 4) as 2 | 3 | 4
    ] ?? "tab:grid-cols-4";

  return (
    <dl
      className={cn(
        "reveal m-0 mt-5 grid grid-cols-2 overflow-hidden rounded-[20px] border border-line-soft bg-white shadow-plate",
        columns,
      )}
    >
      {cells.map(({ key, value, label, Icon }, index) => (
        <div
          key={key}
          className={cn(
            "flex items-center gap-3.5 px-5 py-6 tab:px-4 wide:px-6",
            index % 2 === 1 && "border-l border-line-soft",
            index >= 2 && "border-t border-line-soft tab:border-t-0",
            index > 0 && "tab:border-l tab:border-line-soft",
          )}
        >
          <Icon size={26} className="shrink-0 text-brand" />
          {/* `dt` leads in the markup, as a description list requires, and the
              column is reversed so the figure still reads above its label. */}
          <div className="flex min-w-0 flex-col-reverse">
            <dt className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {label}
            </dt>
            <dd className="m-0 font-display text-[26px] leading-none text-brand wide:text-[30px]">
              {/* Bedrooms and bathrooms count from zero; the completion year
                  rolls the last thirty, because `0 → 2024` reads as a bug. */}
              <Counter value={String(value)} />
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/* -- Section --------------------------------------------------------------- */

/**
 * "About This Project": the specification card on a sticky rail, the write-up,
 * the four things every ARC home is built around, the counted rooms, and the
 * project's own statement on a navy plate. The whole band sits on a 72px
 * draughting grid held at the threshold of visibility.
 */
export function ProjectAbout({
  project,
  /** Anchor the card's action scrolls to — the gallery below this band. */
  galleryHref,
}: {
  project: Project;
  galleryHref: string;
}) {
  return (
    // No `overflow-hidden` here: it would make this band a scroll container
    // and the card's sticky rail would pin to the section instead of the page.
    // The one decorative layer is inset to the band, so nothing needs clipping.
    <Section size="default" className="relative bg-surface">
      <div
        aria-hidden
        className="blueprint-grid-light pointer-events-none absolute inset-0"
      />

      {/* The write-up leads in the markup and the card is placed into the
          first column explicitly, so a phone reads "what this project is"
          before eight rows of specification — and the DOM order still matches
          the visual order at every width. */}
      <div className="relative grid grid-cols-1 items-start gap-12 nav:grid-cols-[minmax(0,330px)_minmax(0,1fr)] nav:gap-14 wide:grid-cols-[minmax(0,380px)_minmax(0,1fr)] wide:gap-20">
        <div className="nav:col-start-2 nav:row-start-1">
          {/* The band's heading is the project title below; this stays a
              label so the page keeps one h1 and one h2 per section. */}
          <Eyebrow as="p" withRule className="reveal-soft">
            {aboutHeading}
          </Eyebrow>

          <SectionHeading size={54} className="reveal-soft mt-6">
            {project.title}
          </SectionHeading>

          <p className="reveal-soft m-0 mt-7 max-w-[62ch] text-[19px] font-light leading-[1.7] text-body nav:text-[20px]">
            {project.description}
          </p>

          <ul className="reveal-group m-0 mt-11 grid list-none grid-cols-1 gap-4 p-0 tab:grid-cols-2 wide:grid-cols-4">
            {features.map((feature) => {
              const Icon = featureGlyphs[feature.icon] ?? ElevationIcon;

              return (
                <li
                  key={feature.title}
                  className="group flex flex-col items-center rounded-[18px] border border-line-soft bg-white px-5 py-7 text-center transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-line hover:shadow-plate"
                >
                  <Icon
                    size={34}
                    className="text-brand transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.06]"
                  />
                  <h3 className="m-0 mt-5 font-display text-[20px] font-normal leading-[1.25] tracking-[-0.01em] text-brand">
                    {feature.title}
                  </h3>
                  <p className="m-0 mt-3 text-[15px] leading-[1.6] text-body">
                    {feature.body}
                  </p>
                </li>
              );
            })}
          </ul>

          <ProjectStats project={project} />

          <figure className="reveal relative m-0 mt-5 overflow-hidden rounded-[20px] bg-brand px-6 py-8 text-white tab:px-9 tab:py-9">
            {/* The drawing the footer is built on, reused at a whisper. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-8 w-[380px] opacity-[0.11] tab:w-[520px]"
            >
              <BlueprintHouse className="text-white" />
            </div>

            <div className="relative">
              <QuoteIcon size={24} className="text-accent-soft" />
              <blockquote className="m-0 mt-4 max-w-[60ch] font-display text-[19px] font-normal leading-[1.5] tracking-[-0.01em] tab:text-[21px]">
                {project.projectNarrative}
              </blockquote>
              <figcaption className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                — {project.architect}
              </figcaption>
            </div>
          </figure>
        </div>

        {/* The card tracks the write-up rather than stopping a third of the
            way down the column. */}
        <div className="nav:col-start-1 nav:row-start-1 nav:sticky nav:top-[112px]">
          <ProjectFactCard project={project} galleryHref={galleryHref} />
        </div>
      </div>
    </Section>
  );
}
