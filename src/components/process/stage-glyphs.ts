import type { ComponentType } from "react";

import {
  ChatIcon,
  DraftIcon,
  HandoverIcon,
  HardHatIcon,
  HeadsetIcon,
} from "@/components/ui/icon";

export type Glyph = ComponentType<{ className?: string; size?: number }>;

/**
 * One glyph per stage, keyed by the stage's own id in `process.ts`. Shared
 * rather than restated in each band, for the same reason the copy is: the
 * /process timeline, the about page's approach band and anything added later
 * cannot then drift into showing a different mark for the same stage.
 */
export const stageGlyphs: Record<number, Glyph> = {
  1: ChatIcon,
  2: DraftIcon,
  3: HardHatIcon,
  4: HandoverIcon,
  5: HeadsetIcon,
};

/** Falls back to the first stage's mark if an id ever arrives unmapped. */
export const glyphFor = (id: number): Glyph => stageGlyphs[id] ?? ChatIcon;
