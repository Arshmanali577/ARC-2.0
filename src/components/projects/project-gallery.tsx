import { GalleryInfoBar } from "@/components/projects/gallery/gallery-info-bar";
import { GalleryShowcase } from "@/components/projects/gallery/gallery-showcase";
import { Section } from "@/components/ui/section";
import { getGalleryItems } from "@/content/project-gallery";
import type { Project } from "@/content/projects";

/**
 * The gallery band: one large frame at a time rather than a wall of tiles.
 *
 * Galleries here run from six to thirty images, and a masonry grid asked the
 * visitor to scan all of them at once. The showcase inverts that — a single
 * landscape stage, a filter rail for the room they came to see, and a
 * thumbnail strip that keeps the whole set within reach.
 *
 * This file stays a Server Component: the item list, its categories and its
 * captions are all resolved here, so the client bundle receives plain data and
 * the band's own frame — section, padding, information bar — never ships.
 */
export function ProjectGallery({ project }: { project: Project }) {
  const items = getGalleryItems(project);

  return (
    /* Asymmetric padding rather than a `size` token: this band shares
       `bg-surface` with the About section directly above it, so the two read
       as one continuous ground and the usual top inset is dead space. Buying
       it back is what lets the stage grow without pushing the thumbnail strip
       off the bottom of the screen. */
    <Section
      size="none"
      className="bg-surface pt-[44px] pb-[56px] tab:pt-[56px] tab:pb-[72px] nav:pt-[72px] nav:pb-[96px]"
    >
      <GalleryShowcase items={items} />
      <GalleryInfoBar project={project} />
    </Section>
  );
}
