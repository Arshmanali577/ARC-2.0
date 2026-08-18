import { cn } from "@/lib/cn";

/**
 * The architectural line drawing the footer is built on.
 *
 * A stepped two-volume house, plotted through one consistent axonometric so
 * every line is measured rather than sketched:
 *
 *   screenX = 360 + x − y
 *   screenY = 336 − z − 0.115x − 0.135y
 *
 * `x` runs along the right-hand facade, `y` into the left-hand facade, `z` is
 * height. Roof overhangs, glazing mullions, the entry steps and the dashed
 * construction lines are all solved through that projection — which is what
 * lets the drawing hold together when it is scaled across a 700px column at
 * single-figure opacity. A freehand SVG falls apart at that size.
 *
 * Purely decorative: `aria-hidden`, no text, no interactivity.
 */

type BlueprintHouseProps = { className?: string };

export function BlueprintHouse({ className }: BlueprintHouseProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 44 640 336"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className={cn("h-auto w-full", className)}
    >
      {/* Site line — the ground plane, running out past the building both ways */}
      <path d="M0 287 360 336 640 304" strokeWidth={1.35} />

      {/* -- Lower volume ---------------------------------------------------- */}

      {/* Roof slab: top face, then the 7-unit fascia on the two visible edges */}
      <path d="M360 215 602 187 350 153 108 181Z" strokeWidth={1.35} />
      <path d="M360 222 602 194M360 222 108 188M360 215v7M602 187v7M108 181v7" />

      {/* Shell */}
      <path d="M360 218v118M570 194v118M140 188v118" />
      <path d="M360 336 570 312M360 336 140 306" />
      <path d="M360 218 570 194M360 218 140 188" />

      {/* Right facade: full-height glazing, four mullions, one transom */}
      <path d="M370 325 560 303 560 205 370 227Z" />
      <path d="M408 320.5v-98M446 316.1v-98M484 311.7v-98M522 307.4v-98" />
      <path d="M370 273 560 251" />

      {/* Left facade: glazing to the same head height, with the entry set in */}
      <path d="M350 325 150 298 150 200 350 227Z" />
      <path d="M310 319.3v-98M270 313.9v-98M230 308.5v-98M190 303.1v-98" />
      <path d="M265 323.2 265 245.2 235 241.1 235 319.1" strokeWidth={1.35} />

      {/* -- Upper volume, set back on the roof ------------------------------ */}

      <path d="M390 200v-93M540 183v-93M200 174v-81" />
      <path d="M390 200 540 183M390 200 200 174" />
      <path d="M390 107 540 90M390 107 200 93" />

      {/* Upper roof slab */}
      <path d="M390 105 568 84 350 55 172 75Z" strokeWidth={1.35} />
      <path d="M390 111 568 90M390 111 172 81M390 105v6M568 84v6M172 75v6" />

      {/* Upper glazing, right then left */}
      <path d="M400 189 530 174 530 101 400 116Z" />
      <path d="M435 185v-73M470 181v-73M505 177v-73" />
      <path d="M380 189 210 166 210 93 380 116Z" />
      <path d="M325 181.3v-73M270 173.9v-73" />

      {/* -- Entry steps ----------------------------------------------------- */}

      <path d="M270 315 230 309.5M256 316.5 216 311.1M242 322.6 202 317.2M228 328.7 188 323.3" />
      <path d="M270 315 256 316.5 242 322.6 228 328.7M230 309.5 216 311.1 202 317.2 188 323.3" />

      {/* -- Planting -------------------------------------------------------- */}

      <g strokeWidth={1}>
        <ellipse cx="66" cy="272" rx="28" ry="24" />
        <path d="M66 297v-9" />
        <ellipse cx="118" cy="284" rx="16" ry="18" />
        <path d="M118 303v-5" />
        <ellipse cx="602" cy="292" rx="22" ry="18" />
        <path d="M602 311v-4" />
      </g>

      {/* -- Construction lines ---------------------------------------------- */}

      {/* The marks that make it a drawing rather than a picture */}
      <g strokeWidth={0.9} strokeDasharray="5 8" opacity={0.6}>
        <path d="M602 187v153M350 55v98M108 181v112M568 84v100" />
        <path d="M390 105 640 82M390 111 0 158" />
      </g>

      {/* Dimension line under the right facade */}
      <g strokeWidth={0.9} opacity={0.5}>
        <path d="M360 366 570 342" />
        <path d="M360 358v16M570 334v16" />
      </g>
    </svg>
  );
}
