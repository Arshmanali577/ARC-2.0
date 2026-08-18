"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { GalleryArrow } from "@/components/projects/gallery/gallery-stage";
import { projectsPage } from "@/content/pages";
import type { GalleryItem } from "@/content/project-gallery";
import { cn } from "@/lib/cn";

const labels = projectsPage.detail.gallery;

/**
 * The strip under the stage.
 *
 * It is a real overflow scroller with scroll-snap, so a phone swipes it
 * natively and a trackpad flicks it; the two compact arrows are the pointer
 * affordance on top of that, not the only way through. Every thumbnail is
 * lazily loaded — a thirty-image project would otherwise pay for thirty
 * requests before the visitor has touched anything.
 */
export function GalleryThumbnails({
  items,
  active,
  onSelect,
}: {
  items: GalleryItem[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);

  /* Follows the stage: paging with the arrows, or filtering to a category,
     has to bring the matching thumbnail into view or the strip silently falls
     out of step with the image above it.
     `scrollLeft` on the rail rather than `scrollIntoView`, which would also
     scroll the *page* to the gallery the moment this mounts below the fold. */
  useEffect(() => {
    const node = rail.current;
    const thumb = activeThumb.current;
    if (!node || !thumb) return;

    const centred = thumb.offsetLeft - (node.clientWidth - thumb.clientWidth) / 2;
    node.scrollTo({ left: Math.max(0, centred), behavior: "smooth" });
  }, [active]);

  const scrollBy = (direction: 1 | -1) => {
    const node = rail.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="mt-3 flex items-center gap-3 tab:mt-4 tab:gap-4">
      {/* Wrapped rather than hidden on the button itself: the arrow already
          carries `inline-flex`, and two display utilities on one element are
          resolved by stylesheet order, not by the order they are written. */}
      <span className="hidden shrink-0 nav:block">
        <GalleryArrow
          direction="previous"
          size="compact"
          onClick={() => scrollBy(-1)}
          label={labels.scrollThumbsBack}
        />
      </span>

      <div
        ref={rail}
        aria-label={labels.thumbnails}
        className={cn(
          // `relative` makes the rail the offset parent, so a thumbnail's
          // `offsetLeft` is its position in the strip and nothing else.
          "relative flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 tab:gap-4",
          // The rail is swiped, not read as a scrollbar.
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <button
              key={item.src}
              ref={isActive ? activeThumb : undefined}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`${item.title} — image ${index + 1}`}
              aria-current={isActive}
              className={cn(
                "group/thumb relative aspect-[16/9] w-[104px] shrink-0 snap-start overflow-hidden rounded-[10px] border-2 bg-plate-2 transition duration-300 ease-out tab:w-[122px] nav:w-[136px]",
                isActive
                  ? "scale-[1.04] border-accent shadow-glow-soft"
                  : "border-transparent opacity-70 hover:-translate-y-0.5 hover:opacity-100",
                "motion-reduce:scale-100 motion-reduce:hover:translate-y-0",
              )}
            >
              <Image
                src={item.src}
                alt=""
                fill
                loading="lazy"
                sizes="136px"
                className="object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-105 motion-reduce:transition-none"
              />
            </button>
          );
        })}
      </div>

      <span className="hidden shrink-0 nav:block">
        <GalleryArrow
          direction="next"
          size="compact"
          onClick={() => scrollBy(1)}
          label={labels.scrollThumbsForward}
        />
      </span>
    </div>
  );
}
