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
| `/`                   | `content/homepage.ts`                                |
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
│  ├─ sections/          The homepage bands, top to bottom · cta-band (all pages)
│  ├─ projects/          featured-projects · projects-index (client) ·
│  │                     project-masthead · project-gallery · project-nav
│  ├─ about/             story · values
│  ├─ process/           stage-index · process-timeline
│  ├─ locations/         location-index · location-card
│  ├─ blog/              blog-index (client) · article-feature · article-card ·
│  │                     article-meta · article-toc
│  ├─ contact/           contact-details · contact-map
│  ├─ forms/ · inclusions/           The remaining client components
│  └─ ui/                button · feature-image · icon · json-ld · media-plate · page-hero ·
│                        project-card · project-feature · prose · section ·
│                        service-rows · wordmark
├─ content/              ⭐ All copy and data. No prose lives in a component.
│  ├─ site.ts            Brand, contact details, licence, navigation
│  ├─ homepage.ts        Homepage copy, section by section
│  ├─ pages.ts           Copy + SEO for every internal page
│  ├─ projects.ts · services.ts · testimonials.ts · process.ts
│  ├─ local-areas.ts · inclusions.ts
│  └─ blog/*.md          The original post files, unchanged
└─ lib/                  blog.ts (build-time reader) · markdown.ts · schema.ts ·
                         seo.ts · cn.ts
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

- Every band opens with `SectionHeader` (eyebrow → heading → lead → action),
  which is what keeps the vertical rhythm identical section to section.
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
- Motion is CSS-only, and there are three utilities for it:
  `reveal` (a single element), `reveal-group` (a grid or list, each of the
  first few children finishing later than the last), and `page-enter` (the
  route-change fade, applied once in `app/template.tsx`). All three animate on
  scroll or on mount via `animation-timeline: view()` / a short keyframe,
  wrapped in `@supports` and a `prefers-reduced-motion` guard — browsers
  without support, and visitors who asked for less motion, get the content in
  place. Do not reach for an IntersectionObserver to do this.
- `reveal-group` goes on leaf grids and lists only, never on a wrapper holding
  a sticky rail. See the comment above the keyframes in `globals.css` for the
  two constraints that keep it from breaking sticky positioning and card
  hover states.
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
