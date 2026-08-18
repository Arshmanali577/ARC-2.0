"use client";

import { useEffect, useRef } from "react";

import { GalleryFrames } from "@/components/projects/gallery/gallery-frames";
import { GalleryArrow, pad } from "@/components/projects/gallery/gallery-stage";
import { useSwipe } from "@/components/projects/gallery/swipe";
import { CloseIcon } from "@/components/ui/icon";
import { projectsPage } from "@/content/pages";
import type { GalleryItem } from "@/content/project-gallery";

const labels = projectsPage.detail.gallery;

/**
 * Fullscreen viewing.
 *
 * Rendered inline rather than through a portal — the overlay is `fixed` and
 * sits above everything on the page already, and keeping it in the tree means
 * it stays a plain child of the showcase with no hydration seam. Escape and
 * the arrow keys are bound to the document while it is open, and the page
 * behind it is locked so a scroll wheel does not move the article underneath.
 */
export function GalleryLightbox({
  items,
  active,
  mounted,
  onPrevious,
  onNext,
  onClose,
}: {
  items: GalleryItem[];
  active: number;
  mounted: ReadonlySet<number>;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const swipe = useSwipe(onPrevious, onNext);
  const closeButton = useRef<HTMLButtonElement>(null);
  const item = items[active];

  useEffect(() => {
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrevious();
      else if (event.key === "ArrowRight") onNext();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={item.title}
      /* A click that lands on the backdrop closes; one that lands on the
         photograph or a control does not. */
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      {...swipe}
      className="fixed inset-0 z-[100] flex animate-[fade-in_260ms_ease-out_both] flex-col bg-ink/96 backdrop-blur-lg"
    >
      <div className="flex shrink-0 items-start justify-between gap-6 px-5 py-5 tab:px-8 tab:py-7">
        <div className="min-w-0">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-mist tab:text-[11px]">
            {item.categoryLabel}
          </p>
          <p className="m-0 mt-2 truncate font-display text-[20px] font-normal tracking-[-0.02em] text-white tab:text-[26px]">
            {item.title}
          </p>
        </div>

        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={labels.closeFullscreen}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-invert-strong text-white transition duration-300 ease-out hover:scale-110 hover:border-white hover:bg-white/12 motion-reduce:hover:scale-100"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <GalleryFrames
          items={items}
          active={active}
          mounted={mounted}
          fit="contain"
          sizes="100vw"
          className="inset-x-4 inset-y-0 tab:inset-x-20"
        />

        {items.length > 1 ? (
          <>
            <GalleryArrow
              direction="previous"
              onClick={onPrevious}
              label={labels.previous}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 tab:left-6"
            />
            <GalleryArrow
              direction="next"
              onClick={onNext}
              label={labels.next}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 tab:right-6"
            />
          </>
        ) : null}
      </div>

      <div className="flex shrink-0 items-end justify-between gap-8 px-5 py-5 tab:px-8 tab:py-7">
        <p className="m-0 max-w-[640px] text-[13px] leading-[1.65] text-mist-deep tab:text-[14px]">
          {item.description}
        </p>
        <p className="m-0 shrink-0 text-[12px] font-semibold tracking-[0.14em] text-white/85 tab:text-[13px]">
          {pad(active + 1)} <span className="text-white/45">/</span>{" "}
          {pad(items.length)}
        </p>
      </div>
    </div>
  );
}
