# ARC Builders

Marketing site for ARC Builders (Aesthetic Residential and Commercial Builders),
Brisbane. The design system comes from the *ARC Builders Homepage v2* Claude
Design file — colours, type, spacing and hover behaviour are reproduced 1:1. The
content is the live arcbuilders.com.au site, migrated from `Content-Extraction/`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
deployed on Vercel. Every route builds static.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run typecheck
```

## Routes

| Route                 | Source of content                                   |
| --------------------- | --------------------------------------------------- |
| `/`                   | `content/homepage.ts` — approach, featured, why, services, process, locations, reviews |
| `/projects`           | `content/projects.ts` (12 projects)                  |
| `/projects/[slug]`    | ” — overview, specifications, full gallery           |
| `/residential`        | `content/services.ts` + `content/pages.ts`           |
| `/commercial`         | `content/services.ts` + `content/pages.ts`           |
| `/process`            | `content/process.ts`                                 |
| `/locations`          | `content/local-areas.ts` (10 areas)                  |
| `/locations/[slug]`   | ” — intro, strengths, local projects, FAQs           |
| `/about`              | `content/pages.ts`                                   |
| `/blog`               | `content/blog/*.md` (5 posts)                        |
| `/blog/[slug]`        | ” — article, share links, tags, related              |
| `/contact`            | `content/pages.ts` — details, map, enquiry form       |
| `/inclusions`         | `content/inclusions.ts` — private, `noindex`         |
| `/maintenance`        | `content/pages.ts` — `noindex`                       |

## Project structure

```
src/
├─ app/                  One folder per route; page-level SEO lives with the page
│  ├─ layout.tsx         Fonts, metadata, icons, org schema, header + footer shell
│  ├─ globals.css        ⭐ Design tokens (colour, type, breakpoints) + base CSS
│  ├─ sitemap.ts · robots.ts
├─ components/
│  ├─ layout/            site-header · site-footer · mobile-nav · nav-dropdown
│  ├─ sections/          The homepage bands, top to bottom: hero · approach ·
│  │                     why-arc · services · process-steps · locations ·
│  │                     reviews · cta-band (closes every page) ·
│  │                     process-band (/contact)
│  ├─ projects/          featured-projects · projects-index (client) ·
│  │                     project-masthead · project-gallery · project-nav
│  ├─ about/             story · values
│  ├─ process/           stage-index · process-timeline
│  ├─ locations/         location-index · location-card
│  ├─ blog/              blog-index (client) · article-feature · article-card ·
│  │                     article-meta · article-toc
│  ├─ contact/           contact-details · contact-map
│  ├─ forms/ · inclusions/           The remaining client components
│  └─ ui/                button · counter · feature-image · icon · json-ld ·
│                        magnetic · media-plate · page-hero · pointer-glow ·
│                        pointer-label · project-card · project-feature ·
│                        prose · section · service-rows · split-text · wordmark
├─ content/              ⭐ All copy and data. No prose lives in a component.
│  ├─ site.ts            Brand, contact details, licence, navigation
│  ├─ homepage.ts        Homepage copy, section by section
│  ├─ pages.ts           Copy + SEO for every internal page
│  ├─ projects.ts · services.ts · testimonials.ts · process.ts
│  ├─ local-areas.ts · inclusions.ts
│  └─ blog/*.md          The original post files, unchanged
└─ lib/                  blog.ts (build-time reader) · markdown.ts · schema.ts ·
                         seo.ts · cn.ts · reveal-script.ts (the inline
                         head script that makes the scroll reveals one-shot)
```

The two starred files are where almost every routine change belongs.

### Where to change what

| I want to…                        | Edit                                                |
| --------------------------------- | --------------------------------------------------- |
| Change a phone number or address  | `src/content/site.ts`                                |
| Reword a homepage section         | `src/content/homepage.ts`                            |
| Reword an internal page           | `src/content/pages.ts`                               |
| Add or edit a project             | `src/content/projects.ts` + `public/projects/<slug>/`|
| Add a suburb                      | `src/content/local-areas.ts`                         |
| Add a blog post                   | `src/content/blog/<slug>.md`                         |
| Change a brand colour             | `src/app/globals.css` → `@theme`                     |
| Add a new button treatment        | `src/components/ui/button.tsx` → `variants`          |
| Reorder the homepage              | `src/app/page.tsx`                                   |

## Design system

Tokens are declared once in `globals.css` under Tailwind v4's `@theme` block and
consumed as ordinary utilities (`bg-brand`, `text-muted`, `border-line`).

**Colour**

| Token           | Hex / value            | Used for                          |
| --------------- | ---------------------- | --------------------------------- |
| `ink`           | `#001A38`              | Enquire band, dark hover states    |
| `brand`         | `#002B5C`              | Primary navy — bands, buttons      |
| `brand-deep`    | `#0B2F57`              | Hero media plate                   |
| `brand-mid`     | `#0B3A69`              | Media plate on navy                |
| `muted`         | `#5B7392`              | Eyebrows, meta labels              |
| `body`          | `#4A5C73`              | Secondary body copy                |
| `faint`         | `#9AAABF`              | Index numerals                     |
| `mist`          | `#C9D6E5`              | Light accent on navy, selection    |
| `mist-deep`     | `#A9BFD6`              | Body copy on navy                  |
| `surface`       | `#F4F6F9`              | Tinted sections, row hover         |
| `line*`         | navy/white alphas      | Hairline rules and borders         |
| `plate-1..4`    | `#DCE4EE` → `#CFDAE8`  | Image placeholder tints            |

**Type** — `font-display` is Century Gothic with [Questrial](https://fonts.google.com/specimen/Questrial)
as the web fallback (headings, stat numerals, the wordmark). `font-sans` is
Inter 300–700 for everything else. Both load through `next/font`, so there are
no render-blocking font requests.

**Type scale.** Sizes are arbitrary-value utilities, not named steps — the
ladder they come from is documented in `globals.css` under `@theme`. There are
two of them, because letterspaced caps read a size larger than prose set at the
same value:

| Rung | Label (uppercase / tracked)                        | Body (prose)                                |
| ---- | -------------------------------------------------- | ------------------------------------------- |
| 11   | Index numerals, smallest overlay meta               | —                                           |
| 12   | Eyebrows, meta rows, `dt` labels, tags              | —                                           |
| 13   | Card/panel buttons, filter chips, desktop link row  | —                                           |
| 14   | Hero and form buttons, `UnderlineLink`, mobile nav  | Fine print inside a tile or overlay          |
| 15   | —                                                  | Captions, meta values, footer bottom bar     |
| 16   | —                                                  | **Default** — card copy, footer links, fields |
| 17   | —                                                  | Section copy, list rows, contact values      |
| 18   | —                                                  | Section leads, small page intros             |
| 19   | —                                                  | Article body, page-hero leads                |
| 20   | —                                                  | Hero leads, opening paragraphs               |

Headings sit above the ladder and are unchanged: 20–34px for an `h3` or small
`h2`, `clamp()`ed 27–34px rising to 52–86px for a section `h2` or page `h1`.
Pick the nearest rung rather than inventing a size.

The desktop link row is deliberately held at the 13px rung: eight `nowrap`
entries plus the wordmark already fill the 901px bar, which is why its gaps
were tightened in the first place. The mobile panel — where the nav is actually
read on a phone — takes the 14px.

**Breakpoints.** `nav:` and `wide:` mirror the source design's media queries.
`tab:` is an addition — the design went straight from a 24px-gutter single
column to the 901px layout, which left a 320px phone and an 834px tablet on
the same very narrow page.

- base — ≤639px (single column, gutter 24px, nav collapses to a menu)
- `tab:` — ≥640px (two columns, gutter 40px)
- `nav:` — ≥901px (design's desktop layout, gutter 56px, link row visible)
- `wide:` — ≥1201px (four columns, full 86px hero, header CTA visible)

Tailwind's own `sm/md/lg` are never used. If you see one in the compiled CSS,
something outside `src/` is being scanned — `globals.css` excludes
`Content-Extraction/` for exactly that reason.

**Fluid type.** Display sizes at the base breakpoint are `clamp()`ed so they
reach the design's specified value by ~420px and only scale down below that. A
`nav:`/`wide:` size is never clamped: those are the design's numbers, used
as-is.

### Composition rules

Every page is built from the same small set of idioms. Three of them carry
almost every layout on the site — reach for one before inventing a fourth:

| Idiom            | Built from                                   | Used for                                  |
| ---------------- | -------------------------------------------- | ----------------------------------------- |
| **Rule + marker**| `border-t` above a label, first one accented  | Ordered sets: figures, process stages      |
| **Divider grid** | `gap-px` over `bg-line-soft` / `bg-line-invert-soft` | Unordered sets: capabilities, suburbs, reviews |
| **Row list**     | `border-b` per row, hover draws the rule      | Lists that link away: services             |

Supporting conventions:

- A band with a heading opens with `SectionHeader` (eyebrow → heading → lead →
  action). The homepage's later bands are labelled by an eyebrow alone, on the
  same rule: `Eyebrow tone="gold" as="h2"` on one edge, an `UnderlineLink` on
  the other. Both keep the vertical rhythm identical section to section.
- **Brass is the homepage's marker**, and only a marker: the eyebrow, the index
  numerals, the glyphs and the review band's single button. Anything that is a
  surface — a band, a card, a button doing real work elsewhere — stays navy.
- Vertical rhythm comes from `Section`'s `size` prop, not per-page padding.
- Images are cropped with `aspect-*`, never a fixed height, so a row of media
  keeps its proportions at every breakpoint. A grid of frames uses **one**
  ratio throughout; hierarchy comes from the column count, not from mixed
  shapes.
- No rounded corners, and nothing carries a shadow at rest. Depth is a
  hairline, a tint, or a frame. Cards lift on hover only — `-translate-y-1`
  with `shadow-plate`, which is cast in brand navy rather than neutral grey.
- Projects are shown at three weights: `ProjectFeature` (editorial row) >
  `ProjectCard` with `emphasis` (featured grid) > `ProjectCard` (index grid).
  Both the homepage and /projects draw from the same two components.
- Every masthead is the same treatment — bottom-weighted scrim, inset drawing
  frame, ruled eyebrow — whether it comes from `PageHero`, the homepage `Hero`
  or `ProjectMasthead`.
- `FeatureImage` is the full-bleed pause between bands of copy. Its caption
  names the actual building, so a photograph is never pure decoration.
- `CtaBand` closes every page, but it adapts: `primary={null}` on /contact so
  the leading button never points at the page the visitor is already on, and
  `details={false}` where the page already carries the address and email.
- Form fields are underlines, not boxes — the same hairline vocabulary as the
  rest of the site, which stops a nine-control form reading as a stack of
  containers.
- Any control that can narrow a list ships its empty state with it. Two of the
  six blog categories carry no articles yet, and the filter says so rather
  than rendering nothing.
- A long list of siblings opens with a register — `StageIndex` on /process,
  `LocationIndex` on /locations and every area page. Both are built only from
  names the content already holds, and their cell counts divide cleanly at
  every breakpoint so no row is left with an orphan.
- Motion is CSS-only: every keyframe and every utility lives in `globals.css`,
  and there is no animation library. The reveals run in one of two modes off the
  same keyframes.

  **One-shot (what ships).** `lib/reveal-script.ts` is a few hundred bytes of
  blocking inline script in `<head>`. It sets `data-reveal="on"` on `<html>`
  before first paint — which is what hides an unseen element — and hands every
  reveal to a single `IntersectionObserver` that stamps `data-seen` the first
  time it arrives, then drops it. The rules under `[data-reveal="on"]` at the
  foot of `globals.css` reset the timeline to `auto`, so the same keyframes run
  on the clock for `--reveal-duration` and hold at their first frame until the
  stamp lands. An element therefore arrives **once** and stays arrived.

  **Scroll-linked (the fallback).** With the script absent the utilities run as
  written, on `animation-timeline: view()`, wrapped in `@supports` and a
  `prefers-reduced-motion` guard. Progress tracks the scroll, so a reveal plays
  backwards on the way back up — acceptable as a fallback, which is why the
  script exists.

  It is an inline script rather than a client component on purpose: set before
  paint, nothing is ever painted visible and then snatched back, and because the
  same script both hides and reveals, there is no arrangement in which content
  is stranded at `opacity: 0`. JavaScript off, blocked or broken means the
  attribute is never set and the page renders in place.

  Timing is three tokens on `:root` — `--reveal-duration`, `--reveal-step`
  (one child of a staggered group) and `--reveal-word-step` — all shortened
  under 901px. Change the feel there, not on a utility.

  | Utility | Use it on |
  | --- | --- |
  | `reveal` | one element — a panel, a feature row, a card the grid does not own |
  | `reveal-soft` | copy inside a band that is already moving; 14px rather than 26px |
  | `reveal-fade` | **any wrapper holding a `sticky` child** — opacity only, so it never becomes a containing block |
  | `reveal-plate` | a photograph with no hover zoom of its own; settles out of a slight overscale |
  | `reveal-group` | a leaf grid or list of cards |
  | `reveal-rows` | a column of text or rows; shorter travel, stagger runs further down |
  | `reveal-words` | a heading, revealed word by word as it is scrolled to |
  | `enter-stagger` | a masthead's copy column — walks its own children **on the clock** |
  | `enter-words` | a masthead heading, written word by word on the clock |
  | `enter-plate` | a masthead photograph; scale only, never opacity |
  | `page-enter` | the route-change fade, applied once in `app/template.tsx` |

  Continuous scroll effects are **not** part of this and stay scroll-linked in
  both modes, because tracking the scroll is the point of them: `rail-draw`,
  `plate-settle`, `parallax-plate`, `header-cast`.

- **Scroll or clock, and the choice is not taste.** A `view()` timeline
  resolves straight to its end state for anything already on screen when the
  page paints, so a masthead would simply never animate. That is the whole
  reason the `enter-*` utilities exist, and the only place they are used.
- `reveal-group` and `reveal-rows` go on leaf grids and lists only, never on a
  wrapper holding a sticky rail — use `reveal-fade` there. See the comment
  above the keyframes in `globals.css` for the two constraints that keep these
  from breaking sticky positioning and card hover states.
- **A finished transform is not `transform: none`.** Every keyframe here ends on
  `none`, but a filled animation resolves that through transform interpolation,
  so the computed style is `matrix(1, 0, 0, 1, 0, 0)` — an identity matrix, and
  still a containing block. Harmless on a card; fatal on a wrapper holding
  `position: fixed`. It is why `page-enter` is opacity only (the gallery
  lightbox is rendered inline, not through a portal, and a transform on that
  wrapper drags its `fixed` overlay off screen by exactly the scroll offset) and
  why `reveal-fade` exists. Before putting a travelling reveal on a wrapper,
  check what is `fixed` or `sticky` underneath it.
- The one-shot rules use `:where(:not(…))` where the scroll-linked ones use a
  bare `:not(…)`. That is load-bearing, not tidiness: those rules use the
  `animation` shorthand, which declares `animation-delay` and
  `animation-play-state` too, so the stagger and the `running` flip below them
  have to win on specificity. A bare `:not()` would pin every group child to
  `paused` at zero delay — which is to say, invisible for ever.
- **Headings reveal their words; body copy does not.** `splitWords` in
  `ui/split-text.tsx` renders one span per word with its own inline
  `animation-range` / `animation-delay`, so the stagger is computed on the
  server and nothing splits text in the browser. `SectionHeading` applies it to
  every section h2 on the site; pass `words={false}` to opt a heading out.
  Splitting a paragraph would mean hundreds of animated spans — don't.
- A group never animates a child that reveals its own words: `reveal-group`,
  `reveal-rows` and `enter-stagger` all exclude `.reveal-words` /
  `.enter-words`, or the block and the words would run on top of each other.
- **Motion that answers the pointer is a separate, smaller set**, in `ui/`:
  `counter` · `magnetic` · `pointer-glow` · `pointer-label`. Every one of them
  is a client component, and every one obeys the same three rules — gated on
  `(hover: hover) and (pointer: fine)`, off under `prefers-reduced-motion`, and
  written straight to the node from a pointer handler with no state and no
  re-render, so a pointer move costs one style write rather than a React pass.

  | Component | What it does | Where it is used |
  | --- | --- | --- |
  | `Counter` | counts a figure up the first time it is scrolled to | approach figures, enquire-band proof |
  | `Magnetic` | leans one action towards the cursor | hero primary, review arrows and CTA |
  | `PointerGlow` | a soft light that tracks the cursor across a card | approach figures, why-arc cells, process stages, suburb tiles |
  | `PointerLabel` | a disc riding the cursor, carrying one word | the services frame; available on the featured carousel via `pointerHint` |

  `Counter` is the one exception to "no observer": the number itself has to
  change, so CSS cannot do it. It renders the finished value on the server,
  only ever winds back an element still below the fold, leaves a non-numeric
  value (`Licensed`, `QBCC`) alone, and always lands on the exact target even
  if the frame clock is starved.
- **Restraint is the point.** A page where everything follows the pointer reads
  as a demo rather than as a building company: one glow per band, one magnetic
  action per view, and a label only where the affordance is not already written
  somewhere on screen.
- Padding never goes on an `<svg>` sized by its own `width`/`height`
  attributes. Preflight puts every element in `border-box`, so the padding eats
  the drawing instead of the box around it — put the spacing on a wrapper.
- `MediaPlate`'s `className` sizes the plate and must not carry a position
  utility — it owns `relative` for `next/image fill`. Position the wrapper.

## Media

All photography, the logo, the browser icons and the hero film are the
originals, copied into `public/` from `Content-Extraction/Assets`:

- `public/hero.webp` · `public/arc-logo.svg` · `public/videos/hero-langford.mp4`
- `public/projects/<slug>/hero.webp` + `gallery-NN.webp` — 183 images across 12 projects
- `public/favicon.*` · `public/apple-touch-icon.png` · `public/site.webmanifest`

Every image slot still goes through `MediaPlate`, which renders `next/image`
when a `src` is supplied and the design's hatched placeholder when one is not.

## Reference material

`Content-Extraction/` is the archived copy of the live site — page text, the
original `src/lib` data files, metadata and every asset. It is excluded from
`tsconfig.json` and from eslint, so it never enters the build. Treat it as the
source of truth when checking whether copy on a page is faithful.

## Deploying to Vercel

Zero configuration — Vercel detects Next.js and builds with `npm run build`.

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

`site.url` in `src/content/site.ts` drives canonical URLs, Open Graph tags,
`robots.txt` and the sitemap.

## Known gaps

- **Two stat figures.** The live hero and About counters animate numbers that
  the content extraction did not capture (`Successful Projects`,
  `Happy Handovers`, `Satisfaction`). Rather than invent them, those cells
  report figures this project can actually source. Supply the real numbers and
  edit `stats` in `homepage.ts` / `aboutPage.stats` in `pages.ts`.
- **Inclusion PDF.** `/inclusions` reproduces the full schedule and selection
  behaviour, but not the live site's *Download Inclusion Summary* export, which
  used `@react-pdf/renderer` — a dependency this project does not carry.
- **`/admin`.** The live site's Decap CMS console is not migrated; it is a CMS
  shell backed by GitHub OAuth routes rather than site content.
