"use client";

import { useCallback, useMemo, useState } from "react";

import {
  GalleryFilters,
  type FilterOption,
} from "@/components/projects/gallery/gallery-filters";
import { GalleryLightbox } from "@/components/projects/gallery/gallery-lightbox";
import { GalleryStage } from "@/components/projects/gallery/gallery-stage";
import { GalleryThumbnails } from "@/components/projects/gallery/gallery-thumbnails";
import { Eyebrow, SectionHeading } from "@/components/ui/section";
import { projectsPage } from "@/content/pages";
import {
  galleryAllFilterLabel,
  galleryCategories,
  type GalleryItem,
} from "@/content/project-gallery";

const { galleryEyebrow, galleryHeading, gallery: labels } = projectsPage.detail;

const ALL = "all";

/** The active frame plus its two neighbours — what a fade needs to be ready. */
const frameWindow = (index: number, length: number) =>
  [index, (index + 1) % length, (index - 1 + length) % length];

/**
 * The interactive half of the gallery band: filter rail, stage, thumbnail
 * strip and lightbox, all driven from one index.
 *
 * The index is into the *filtered* list, so switching category resets to its
 * first frame — the alternative, mapping the current image across filters,
 * either lands on nothing or silently jumps the visitor to an unrelated
 * photograph. `mounted` is the set of frames that have ever been shown; it is
 * what keeps a thirty-image project down to one image on first paint.
 */
export function GalleryShowcase({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState<ReadonlySet<number>>(
    () => new Set(frameWindow(0, Math.max(items.length, 1))),
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const visible = useMemo(
    () =>
      category === ALL
        ? items
        : items.filter((item) => item.category === category),
    [items, category],
  );

  /** Only the categories this project actually photographed. */
  const options = useMemo<FilterOption[]>(() => {
    const present = new Set(items.map((item) => item.category));

    return [
      { id: ALL, label: galleryAllFilterLabel },
      ...galleryCategories.filter((entry) => present.has(entry.id)),
    ];
  }, [items]);

  const goTo = useCallback(
    (next: number, length: number) => {
      const index = ((next % length) + length) % length;
      setActive(index);
      setMounted((current) => {
        const grown = new Set(current);
        for (const i of frameWindow(index, length)) grown.add(i);
        return grown;
      });
    },
    [setActive],
  );

  const select = useCallback(
    (index: number) => goTo(index, visible.length),
    [goTo, visible.length],
  );
  const previous = useCallback(
    () => goTo(active - 1, visible.length),
    [goTo, active, visible.length],
  );
  const next = useCallback(
    () => goTo(active + 1, visible.length),
    [goTo, active, visible.length],
  );

  const onFilter = useCallback(
    (id: string) => {
      setCategory(id);
      setActive(0);
      // The filtered list is a different set of indices, so the mount window
      // is rebuilt for it rather than carried across.
      setMounted(new Set([0, 1]));
    },
    [],
  );

  const current = Math.min(active, Math.max(visible.length - 1, 0));

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 nav:flex-row nav:items-end nav:gap-16">
        <div>
          <Eyebrow>{galleryEyebrow}</Eyebrow>
          <SectionHeading className="mt-3">{galleryHeading}</SectionHeading>
          <span aria-hidden className="mt-4 block h-0.5 w-14 bg-brand" />
        </div>

        <GalleryFilters
          options={options}
          active={category}
          onChange={onFilter}
          label={labels.filterLabel}
          className="nav:justify-end"
        />
      </div>

      <div className="mt-6 tab:mt-7">
        {visible.length === 0 ? (
          <p className="m-0 rounded-[20px] border border-line-soft bg-white px-6 py-16 text-center text-[16px] text-body">
            {labels.empty}
          </p>
        ) : (
          <>
            <GalleryStage
              items={visible}
              active={current}
              mounted={mounted}
              onPrevious={previous}
              onNext={next}
              onOpenFullscreen={() => setIsFullscreen(true)}
            />

            <GalleryThumbnails
              items={visible}
              active={current}
              onSelect={select}
            />

            {isFullscreen ? (
              <GalleryLightbox
                items={visible}
                active={current}
                mounted={mounted}
                onPrevious={previous}
                onNext={next}
                onClose={() => setIsFullscreen(false)}
              />
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
