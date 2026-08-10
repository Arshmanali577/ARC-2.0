<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ARC Builders — working notes

Marketing site built to match the *ARC Builders Homepage v2* Claude Design file
exactly. Read `README.md` first for structure and the design-token table.

## Rules that keep this codebase consistent

1. **Copy lives in `src/content/`, never in a component.** If you are adding a
   sentence, a project, a service or a suburb, edit `homepage.ts` or `site.ts`.
2. **Colour and type live in `src/app/globals.css` under `@theme`.** Use the
   semantic tokens (`bg-brand`, `text-muted`, `border-line`). Do not introduce a
   raw hex in a component — add a token instead.
3. **Breakpoints are `nav:` (≥901px) and `wide:` (≥1201px)**, matching the
   design's media queries. Tailwind's `sm/md/lg/xl` are not used here; mixing
   them in will drift the layout away from the design.
4. **Exact px values are intentional.** The design specifies sizes like `19px`,
   `0.28em` and `1.65` line-height. Arbitrary-value utilities (`text-[19px]`)
   are the correct tool — do not "round to the nearest Tailwind step".
5. **Images go through `MediaPlate`.** It renders the design's hatched
   placeholder and swaps to `next/image` the moment a `src` is supplied. Do not
   drop a bare `<img>` into a section.
6. **Buttons go through `Button`.** Five variants cover every treatment in the
   design; add a variant rather than one-off classes.
7. **Server Components by default.** Nothing on this page needs client JS. Only
   add `"use client"` if you introduce genuine interactivity.

## Before you call it done

```bash
npm run lint && npm run typecheck && npm run build
```

All routes should still report `○ (Static)`.
