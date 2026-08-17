import type { ReactNode } from "react";

/**
 * Re-mounts on every navigation, which is what lets a route change fade in.
 * The animation is opacity only: a transform here would make this a containing
 * block for every sticky rail on the site.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
