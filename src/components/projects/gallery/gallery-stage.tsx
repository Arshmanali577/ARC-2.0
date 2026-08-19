"use client";

import { GalleryFrames } from "@/components/projects/gallery/gallery-frames";
import { useSwipe } from "@/components/projects/gallery/swipe";
import {
  ChevronLeft,
  ChevronRight,
  ExpandIcon,
} from "@/components/ui/icon";
import { projectsPage } from "@/content/pages";
import type { GalleryItem } from "@/content/project-gallery";
import { cn } from "@/lib/cn";

const labels = projectsPage.detail.gallery;

/** Two digits, so the counter never changes width as the set advances. */
export const pad = (value: number) => String(value).padStart(2, "0");

/* -- Circular navigation --------------------------------------------------- */

export function GalleryArrow({
  direction,
  onClick,
  label,
  size = "default",
  className,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  label: string;
  /** `compact` is the thumbnail rail's smaller, outlined twin. */
  size?: "default" | "compact";
  className?: string;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition duration-300 ease-out hover:scale-110 active:scale-100 motion-reduce:hover:scale-100",
        size === "default"
          ? "size-11 bg-brand text-white shadow-plate hover:bg-ink hover:shadow-plate-strong tab:size-[52px]"
          : "size-9 border border-line bg-white text-brand hover:border-line-strong hover:bg-surface tab:size-10",
        className,
      )}
    >
      <Icon size={size === "default" ? 20 : 16} />
    </button>
  );
}

/* -- Stage ----------------------------------------------------------------- */

/**
 * The single large frame the whole section is built around: image, the two
 * navy arrows, the fullscreen action, and the gradient that carries the
 * caption. The stage itself is focusable so the arrow keys work without the
 * gallery having to listen on `window` and fight the rest of the page for
 * them.
 */
export function GalleryStage({
  items,
  active,
  mounted,
  onPrevious,
  onNext,
  onOpenFullscreen,
}: {
  items: GalleryItem[];
  active: number;
  mounted: ReadonlySet<number>;
  onPrevious: () => void;
  onNext: () => void;
  onOpenFullscreen: () => void;
}) {
  const swipe = useSwipe(onPrevious, onNext);
  const item = items[active];

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${item.title} — image ${active + 1} of ${items.length}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onPrevious();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          onNext();
        }
      }}
      {...swipe}
      /* The ratio sets the shape; the `max-h` is what keeps the stage *and*
         the thumbnail strip on one screen. The 400px it subtracts is measured,
         not guessed: sticky header, band padding, the heading block, the gap,
         the strip and a few pixels of air all together come to just under it,
         so the stage takes exactly the height that is actually left. Clamped
         at both ends — a laptop never drops below a usable 380px, and a tall
         monitor does not hand the gallery most of the page. Height wins over
         the ratio, so a wide screen reads as a more cinematic crop rather than
         a taller band. */
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-plate-2 shadow-plate tab:aspect-[3/2] tab:max-h-[62vh] tab:rounded-[24px] nav:aspect-[7/3] nav:max-h-[clamp(380px,calc(100vh_-_400px),720px)]"
    >
      <GalleryFrames
        items={items}
        active={active}
        mounted={mounted}
        sizes="(max-width: 900px) 100vw, 94vw"
      />

      {/* Readability for the caption and the counter, nothing more: the top
          two-thirds of the photograph is left untouched. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink/88 from-0% via-ink/28 via-26% to-transparent to-58%"
      />

      <button
        type="button"
        onClick={onOpenFullscreen}
        className="absolute right-4 top-4 z-30 inline-flex items-center gap-2.5 rounded-full bg-white/95 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand shadow-plate backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-plate-strong tab:right-6 tab:top-6 tab:px-5 tab:py-3 tab:text-[12px]"
      >
        <span>{labels.fullscreen}</span>
        <ExpandIcon size={14} />
      </button>

      {/* Off on a phone. The caption below fills the lower half of a 4:3 crop
          at 375px, so a disc parked at the stage's vertical centre sits on top
          of the frame title — and touch already has the swipe this stage
          listens for, with the thumbnail strip under it as the visible control.
          Wrapped rather than hidden on the button itself: the arrow already
          carries `inline-flex`, and two display utilities on one element are
          resolved by stylesheet order, not by the order they are written. */}
      {items.length > 1 ? (
        <>
          <span className="hidden tab:block">
            <GalleryArrow
              direction="previous"
              onClick={onPrevious}
              label={labels.previous}
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 tab:left-5"
            />
          </span>
          <span className="hidden tab:block">
            <GalleryArrow
              direction="next"
              onClick={onNext}
              label={labels.next}
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 tab:right-5"
            />
          </span>
        </>
      ) : null}

      {/* Keyed on the source so the caption cross-fades with its own image
          rather than snapping to the new text a frame early. */}
      <div
        key={item.src}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-5 p-5 tab:gap-8 tab:p-8 nav:p-10"
      >
        <div className="min-w-0 max-w-[560px] animate-[fade-in_600ms_ease-out_both]">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-mist tab:text-[12px]">
            {item.categoryLabel}
          </p>
          <p className="m-0 mt-2 font-display text-[20px] font-normal leading-[1.15] tracking-[-0.02em] text-white tab:mt-2.5 tab:text-[30px] nav:text-[34px]">
            {item.title}
          </p>
          {/* Clamped on a phone: the caption sits over a 4:3 crop there, and
              an unclamped third line would run into the navigation arrows. */}
          <p className="m-0 mt-2.5 line-clamp-2 text-[14px] leading-[1.6] text-white/80 tab:mt-3 tab:line-clamp-none tab:text-[16px] tab:leading-[1.65]">
            {item.description}
          </p>
        </div>

        <p className="m-0 shrink-0 text-[13px] font-semibold tracking-[0.14em] text-white/85 tab:text-[14px]">
          {pad(active + 1)} <span className="text-white/45">/</span>{" "}
          {pad(items.length)}
        </p>
      </div>
    </div>
  );
}
