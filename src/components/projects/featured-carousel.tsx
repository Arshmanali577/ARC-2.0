"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSwipe } from "@/components/projects/gallery/swipe";
import { Button, UnderlineLink } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PinIcon } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { PointerLabel } from "@/components/ui/pointer-label";
import { Eyebrow, Section, gutter } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import {
  featuredProjects,
  projectTypeNames,
  type Project,
} from "@/content/projects";
import { cn } from "@/lib/cn";

const labels = projectsPage.featured;
const { viewLabel } = projectsPage.detail;

/**
 * How long a slide holds when its project has no film. Film-backed slides
 * ignore this entirely — they are timed by the footage itself.
 */
const STILL_DURATION = 7000;

/**
 * Distance from the centre to a neighbouring slide, as a percentage of a
 * slide's own width. Exactly one width apart: the gap that separates the two
 * cards is then the peek's own `scale(0.94)`, which is what keeps it constant
 * as a proportion of the card rather than drifting with the viewport.
 */
const STEP = 100;

/* -- Circular navigation --------------------------------------------------- */

/**
 * The same navy disc the project gallery uses, written out here rather than
 * imported from `gallery-stage`: importing it would pull the stage, the frame
 * loader and the lightbox into this route's bundle for the sake of one button.
 */
function CarouselArrow({
  direction,
  onClick,
  label,
  className,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  label: string;
  className?: string;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-plate transition duration-300 ease-out hover:scale-110 hover:bg-ink hover:shadow-plate-strong active:scale-100 motion-reduce:hover:scale-100 tab:size-[52px] nav:size-14",
        className,
      )}
    >
      <Icon size={20} />
    </button>
  );
}

/* -- Slide ----------------------------------------------------------------- */

function Slide({
  project,
  offset,
  isActive,
  videoRef,
  onSelect,
  onProgress,
  onEnded,
  playFilm,
}: {
  project: Project;
  /** Signed distance from the showing slide, wrapped to the shorter way round. */
  offset: number;
  isActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onSelect: () => void;
  onProgress: (value: number) => void;
  onEnded: () => void;
  /** False under reduced motion, and while the band is off screen. */
  playFilm: boolean;
}) {
  const [filmReady, setFilmReady] = useState(false);
  const visible = Math.abs(offset) <= 1;
  const showFilm = isActive && playFilm && Boolean(project.heroVideo);

  return (
    <div
      aria-hidden={!isActive}
      className={cn(
        "absolute left-1/2 top-0 h-full w-[88%] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] tab:w-[84%] nav:w-[80%]",
        !visible && "pointer-events-none",
      )}
      style={{
        transform: `translateX(calc(-50% + ${offset * STEP}%)) scale(${
          isActive ? 1 : 0.94
        })`,
        opacity: visible ? (isActive ? 1 : 0.42) : 0,
        zIndex: isActive ? 20 : visible ? 10 : 0,
      }}
    >
      <div className="relative h-full w-full overflow-hidden bg-brand-deep shadow-plate">
        <MediaPlate
          label={project.title}
          tone="dark"
          src={project.heroImage}
          alt={project.title}
          sizes="(max-width: 639px) 88vw, (max-width: 900px) 84vw, 80vw"
          className="h-full w-full"
        />

        {/* The film is mounted only for the slide that is showing, so a band of
            five projects never has five videos fetching at once. It fades up
            over its own poster frame — the same still the plate above already
            renders — so a slow start is invisible rather than a black hole. */}
        {showFilm ? (
          <video
            key={project.slug}
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
              filmReady ? "opacity-100" : "opacity-0",
            )}
            muted
            playsInline
            autoPlay
            preload="auto"
            poster={project.heroImage}
            tabIndex={-1}
            aria-hidden
            onLoadedData={() => setFilmReady(true)}
            onTimeUpdate={(event) => {
              const film = event.currentTarget;
              if (film.duration > 0) {
                onProgress(film.currentTime / film.duration);
              }
            }}
            onEnded={onEnded}
          >
            <source src={project.heroVideo} type="video/mp4" />
          </video>
        ) : null}

        {/* Carries the overlay copy. Only the showing slide takes it: the peeks
            are photographs, and a scrim on them would read as a third card
            state rather than the same card further away. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out",
            isActive ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(to top, rgba(0,26,56,0.92) 0%, rgba(0,26,56,0.6) 32%, rgba(0,43,92,0.16) 66%, transparent 100%)",
          }}
        />

        {isActive ? (
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white tab:p-10 nav:p-14">
            <span
              className="feature-rise block text-[12px] font-semibold uppercase tracking-[0.24em] text-gold-soft"
              style={{ animationDelay: "60ms" }}
            >
              {projectTypeNames[project.type]}
            </span>

            <h3
              className="feature-rise m-0 mt-3 max-w-[14ch] font-display text-[clamp(26px,7vw,34px)] font-normal leading-[1.06] tracking-[-0.02em] tab:mt-4 nav:text-[46px]"
              style={{ animationDelay: "140ms" }}
            >
              {project.title}
            </h3>

            <span
              className="feature-rise mt-3 flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-white/78 tab:mt-4"
              style={{ animationDelay: "220ms" }}
            >
              <PinIcon size={14} className="text-gold-soft" />
              {project.location}
            </span>

            <span
              className="feature-rise mt-5 block tab:mt-7"
              style={{ animationDelay: "300ms" }}
            >
              <Button
                href={`/projects/${project.slug}`}
                variant="mediaSolid"
                withArrow
              >
                {viewLabel}
              </Button>
            </span>
          </div>
        ) : null}

        {/* A peek is a target, not decoration: clicking one brings it forward,
            so the arrows are not the only way through the band. */}
        {!isActive && visible ? (
          <button
            type="button"
            onClick={onSelect}
            className="absolute inset-0 z-30 cursor-pointer"
          >
            <span className="sr-only">
              {labels.show} {project.title}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

/* -- Band ------------------------------------------------------------------ */

/**
 * The portfolio's showcase band: one project held centre stage with its
 * neighbours peeking in from either side.
 *
 * The band times itself off the footage rather than off a clock — when a
 * project's film reaches its end the next project slides in, so the hand-off
 * lands on the cut the film itself ends on. Projects without a film fall back
 * to `STILL_DURATION`, and the dash under the stage fills in both cases, so
 * the two read as one control.
 *
 * Three things hold it back, all deliberate: it does not advance while it is
 * off screen, it does not advance at all under `prefers-reduced-motion`, and
 * the arrows and dashes keep working in every one of those states.
 */
type FeaturedCarouselProps = {
  /** The band's own label. Defaults to the portfolio page's. */
  eyebrow?: string;
  /** Where "view all" goes. The portfolio page jumps to its own index below. */
  link?: { label: string; href: string };
  /** Prints `01 / 04` beside the dashes — the homepage band's own measure. */
  counter?: boolean;
  /**
   * One word that rides the cursor across the stage, saying what a click does.
   * Off by default: the portfolio page has already said it in the band above.
   */
  pointerHint?: string;
  className?: string;
};

export function FeaturedCarousel({
  eyebrow = labels.eyebrow,
  link = { label: labels.viewAll, href: "#all-projects" },
  counter = false,
  pointerHint,
  className,
}: FeaturedCarouselProps = {}) {
  const items = featuredProjects;
  const count = items.length;

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Every way of changing slide goes through one of these three, so a new
     slide always starts its measure from zero. Resetting it in an effect keyed
     on `active` would work too, but only by rendering the incoming slide once
     with the outgoing slide's progress still on the dash. */
  const select = useCallback((index: number) => {
    setActive(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setActive((index) => (index + 1) % count);
    setProgress(0);
  }, [count]);

  const previous = useCallback(() => {
    setActive((index) => (index - 1 + count) % count);
    setProgress(0);
  }, [count]);

  const swipe = useSwipe(previous, next);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playFilm = inView && !reduced;

  /* `autoPlay` covers the first mount of a film; this covers scrolling back to
     a band that has already been paused once. */
  useEffect(() => {
    const film = videoRef.current;
    if (!film) return;

    if (playFilm) void film.play().catch(() => {});
    else film.pause();
  }, [playFilm, active]);

  const current = items[active];
  const hasFilm = Boolean(current.heroVideo) && playFilm;

  useEffect(() => {
    if (reduced || hasFilm || !inView) return;

    const timer = window.setTimeout(next, STILL_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, hasFilm, inView, next, reduced]);

  /* Extracted so the pointer hint can wrap it without the band being
     written out twice. */
  const stage = (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${current.title} — project ${active + 1} of ${count}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
      {...swipe}
      /* Full-bleed on purpose: the peeks are meant to run off both edges of
         the page. The ratio is the container's, so the showing card's own shape
         is that ratio divided by its width — 2.2:1 on a wide monitor, opening
         up as the page narrows. The phone takes the tallest of the three
         because the overlay copy on the showing card is a fixed number of
         lines: at 3:2 the card was 250px tall and the block over it was not. */
      className="relative aspect-[4/3] w-full overflow-hidden tab:aspect-[2/1] nav:aspect-[11/4]"
    >
      {items.map((project, index) => {
        /* Wrapped to the shorter way round, so stepping from the last
           project to the first slides forward rather than rewinding the
           whole band. */
        let offset = index - active;
        if (offset > count / 2) offset -= count;
        if (offset < -count / 2) offset += count;

        return (
          <Slide
            key={project.slug}
            project={project}
            offset={offset}
            isActive={index === active}
            videoRef={videoRef}
            onSelect={() => select(index)}
            onProgress={setProgress}
            onEnded={next}
            playFilm={playFilm}
          />
        );
      })}

      {/* Off on a phone. The overlay copy fills almost the whole of a
          phone-sized card, so a disc parked at its vertical centre lands on the
          project title however it is positioned — and a touch device has the
          swipe this stage already listens for, with the dashes below as the
          visible control. Wrapped rather than hidden on the button itself: the
          arrow already carries `inline-flex`, and two display utilities on one
          element are resolved by stylesheet order, not by the order they are
          written. */}
      <span className="hidden tab:block">
        <CarouselArrow
          direction="previous"
          onClick={previous}
          label={labels.previous}
          className="left-3 tab:left-6 nav:left-10"
        />
      </span>
      <span className="hidden tab:block">
        <CarouselArrow
          direction="next"
          onClick={next}
          label={labels.next}
          className="right-3 tab:right-6 nav:right-10"
        />
      </span>
    </div>
  );

  return (
    <Section size="default" padded={false} className={cn("bg-surface", className)}>
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-4 pb-8 tab:flex-row tab:items-center tab:gap-6 tab:pb-11",
          gutter,
        )}
      >
        <Eyebrow tone="brass" withRule as="h2">
          {eyebrow}
        </Eyebrow>
        <UnderlineLink href={link.href} tone="quiet" withArrow>
          {link.label}
        </UnderlineLink>
      </div>

      {pointerHint ? (
        <PointerLabel label={pointerHint}>{stage}</PointerLabel>
      ) : (
        stage
      )}

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 tab:mt-8 tab:flex-nowrap">
        {counter ? (
          <span className="mr-2 text-[12px] font-semibold tracking-[0.16em] text-muted tab:mr-4">
            <span className="text-brand">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="px-1.5 text-faint">/</span>
            {String(count).padStart(2, "0")}
          </span>
        ) : null}
        {items.map((project, index) => {
          const isActive = index === active;
          const runsKeyframe = isActive && !hasFilm && !reduced && inView;

          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => select(index)}
              aria-label={`${labels.show} ${project.title}`}
              aria-current={isActive}
              className="group/dot py-3 tab:py-2"
            >
              <span className="block h-[3px] w-8 overflow-hidden rounded-full bg-brand/15 transition-colors duration-300 ease-out group-hover/dot:bg-brand/30 tab:w-11">
                {isActive ? (
                  <span
                    /* Two ways of filling one bar. A film-backed slide is
                       driven from its own `currentTime`, which is what ties the
                       measure to the footage; a still runs the keyframe for as
                       long as the fallback timer it is paired with. Anything
                       else — reduced motion, off screen — simply sits full. */
                    className={cn(
                      "block h-full w-full origin-left rounded-full bg-gold",
                      hasFilm && "transition-transform duration-200 ease-linear",
                      runsKeyframe && "feature-progress",
                    )}
                    style={
                      hasFilm
                        ? { transform: `scaleX(${progress})` }
                        : runsKeyframe
                          ? { animationDuration: `${STILL_DURATION}ms` }
                          : undefined
                    }
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
