import type { ReactNode } from "react";

/**
 * Re-mounts on every navigation, which is what lets a route change animate in.
 *
 * The animation is `page-enter` in `globals.css`: a 420ms fade on the site's
 * entrance curve. Opacity only — a transform on this wrapper survives the
 * animation as an identity matrix and permanently makes it a containing block,
 * which unpins the gallery lightbox's `fixed` overlay. The upward motion a route
 * change reads as comes from the content: `enter-stagger` on a masthead, and the
 * scroll reveals, which fire immediately for anything already above the fold.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
