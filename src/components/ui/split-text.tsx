import { Children, cloneElement, isValidElement, type ReactNode } from "react";

/**
 * Word-by-word text reveal.
 *
 * A heading that fades in as one block reads as a box arriving. A heading whose
 * words arrive in the order you read them reads as the sentence being written —
 * which is the difference between "this page animates" and "this page was
 * designed". It is the one piece of motion on the site that is about the type
 * itself rather than about the layout.
 *
 * Two things make this cheap enough to put on every heading:
 *
 *  1. **No JavaScript.** Each word is a `<span>` carrying its own
 *     `animation-range` (scrolling) or `animation-delay` (a masthead, which is
 *     already on screen when the page paints). The stagger is therefore a
 *     static inline style rendered on the server — there is no splitter running
 *     in the browser, and no layout measurement.
 *  2. **Headings only.** Splitting a paragraph into two hundred animated spans
 *     is how a site gets slow and how a reveal turns into a gimmick. Body copy
 *     keeps the block-level `reveal`; the word treatment is reserved for the
 *     line the section is actually about.
 *
 * The words stay real words in the DOM with real spaces between them, so the
 * text still reads, still selects, and still copies as one sentence.
 *
 * `transform` and `opacity` only, and nothing at all under
 * `prefers-reduced-motion: reduce` — the spans are then just spans.
 */

/** The class the *heading itself* carries; the utility targets its words. */
export const wordsClass = {
  scroll: "reveal-words",
  enter: "enter-words",
} as const;

export type SplitMode = keyof typeof wordsClass;

/**
 * How far apart the words are.
 *
 * Scrolling, the stagger is a spread of `animation-range` — each word finishes
 * a little further into the element's pass across the viewport. Capped, so a
 * long heading does not end up with its last word waiting until the section is
 * halfway gone.
 *
 * On the clock it is a plain delay, and the cap keeps a masthead's whole line
 * inside the entrance rather than trailing after it.
 */
const SCROLL_START = 16;
const SCROLL_STEP = 2.4;
const SCROLL_CAP = 46;

const ENTER_STEP = 38;
const ENTER_CAP = 380;

/**
 * How many words in the stagger still grows. Past this they all share the last
 * delay — a fifteen-word heading whose final word waits six hundred milliseconds
 * has stopped reading as a sentence being written and started reading as a
 * queue. Ten steps of `--reveal-word-step` is 380ms, the same window the
 * masthead entrance uses.
 */
const WORD_CAP = 10;

function wordStyle(index: number, mode: SplitMode, base: number) {
  if (mode === "enter") {
    return { animationDelay: `${base + Math.min(index * ENTER_STEP, ENTER_CAP)}ms` };
  }

  // Both, because a scrolled heading has two ways of running and this is the
  // one place the stagger is written. `animation-range` drives the scroll-linked
  // path; `animation-delay` drives the one-shot path the reveal script switches
  // the site into. Neither interferes with the other: a progress-based timeline
  // ignores `animation-delay` outright, and the one-shot rules reset the
  // timeline to `auto`, which is where `animation-range` stops applying.
  //
  // The delay is a `calc` on the token rather than a number so it still shrinks
  // with the rest of the stagger on a phone, where the token is redefined.
  const end = Math.min(SCROLL_START + index * SCROLL_STEP, SCROLL_CAP);
  return {
    animationRange: `entry 2% cover ${end}%`,
    animationDelay: `calc(var(--reveal-word-step) * ${Math.min(index, WORD_CAP)})`,
  };
}

/**
 * Splits every string in a node tree into animated words, leaving the elements
 * around them alone — so a heading that sets one word in the accent colour, or
 * breaks a line with `<br />`, still works, and the count carries on across the
 * whole heading rather than restarting inside each element.
 */
export function splitWords(
  node: ReactNode,
  mode: SplitMode = "scroll",
  baseDelay = 0,
): ReactNode {
  let index = 0;

  const walk = (value: ReactNode, keyPrefix: string): ReactNode => {
    if (typeof value === "string") {
      // Keep the spaces as real text nodes between the spans: `inline-block`
      // words with no separator would run together when copied.
      return value.split(/(\s+)/).map((piece, pieceIndex) => {
        if (!piece) return null;
        if (/^\s+$/.test(piece)) return piece;

        const style = wordStyle(index, mode, baseDelay);
        index += 1;

        return (
          <span
            key={`${keyPrefix}-${pieceIndex}`}
            data-word
            /* No `will-change`: a heading is a dozen words and a page is a
               dozen headings, and hinting a hundred-odd spans into their own
               layers costs more memory than the animation ever saves. The
               compositor promotes them for the length of the run anyway. */
            className="inline-block"
            style={style}
          >
            {piece}
          </span>
        );
      });
    }

    if (Array.isArray(value)) {
      return Children.map(value, (child, childIndex) =>
        walk(child, `${keyPrefix}-${childIndex}`),
      );
    }

    if (isValidElement<{ children?: ReactNode }>(value)) {
      const { children } = value.props;
      if (children === undefined) return value;
      return cloneElement(value, undefined, walk(children, `${keyPrefix}-c`));
    }

    return value;
  };

  return walk(node, "w");
}

/**
 * Whether a node has any text worth splitting. A heading built entirely out of
 * elements with no string inside gets the ordinary block reveal instead.
 */
export function hasWords(node: ReactNode): boolean {
  if (typeof node === "string") return node.trim().length > 0;
  if (Array.isArray(node)) return node.some(hasWords);
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return hasWords(node.props.children);
  }
  return false;
}
