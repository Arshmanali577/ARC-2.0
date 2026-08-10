# ARC Builders

Marketing site for ARC Builders (Aesthetic Residential and Commercial Builders),
Brisbane. Built from the *ARC Builders Homepage v2* Claude Design file — colours,
type, spacing and hover behaviour are reproduced 1:1.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run typecheck
```

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        Fonts, metadata, header + footer shell
│  ├─ page.tsx          Homepage — composes the sections in order
│  ├─ globals.css       ⭐ Design tokens (colour, type, breakpoints) + base CSS
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ layout/           site-header · site-footer
│  ├─ sections/         One file per band of the homepage, top to bottom
│  └─ ui/               button · media-plate · section · wordmark
├─ content/             ⭐ All copy and data. No prose lives in components.
│  ├─ site.ts           Brand, contact details, licence, navigation
│  └─ homepage.ts       Section-by-section copy, projects, stages, services
└─ lib/cn.ts            Class-name joiner
```

The two starred files are where almost every routine change belongs.

### Where to change what

| I want to…                        | Edit                                                |
| --------------------------------- | --------------------------------------------------- |
| Change a phone number or address  | `src/content/site.ts`                                |
| Reword a section, add a project   | `src/content/homepage.ts`                            |
| Change a brand colour             | `src/app/globals.css` → `@theme`                     |
| Add real photography              | `public/images/` + `media.src` in `homepage.ts`      |
| Drop in the real logo             | `src/components/ui/wordmark.tsx` → `logoSrc`         |
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

**Breakpoints** mirror the source design's media queries rather than Tailwind's
defaults:

- base — ≤900px (single column, page gutter 24px, nav hidden)
- `nav:` — ≥901px (two columns, gutter 56px)
- `wide:` — ≥1201px (four columns, full 86px hero)

## Deploying to Vercel

Zero configuration — Vercel detects Next.js and builds with `npm run build`.

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

Or import the repo at [vercel.com/new](https://vercel.com/new). No environment
variables are required; the site is fully static (`○ (Static)` for every route).

Before going live, set `site.url` in `src/content/site.ts` to the production
domain — it drives canonical URLs, Open Graph tags, `robots.txt` and the sitemap.

## Known gaps

- **Mobile navigation.** The source design hides the nav links below 901px with
  no replacement, and that behaviour is reproduced as-is. Adding a drawer is a
  self-contained change in `site-header.tsx`.
- **Placeholder media.** Every image slot renders the hatched placeholder from
  the design until real photography is added (see `public/images/README.md`).
- **Links.** In-page anchors match the design. `Projects`, `Services` etc. point
  at homepage sections; wire them to real routes when those pages exist.
