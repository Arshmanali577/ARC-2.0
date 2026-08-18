import type { Project } from "@/content/projects";

/**
 * The gallery's own content layer.
 *
 * `projects.ts` stores nothing about a gallery frame beyond its path, so the
 * filter rail and the caption under each image are resolved here: every image
 * in `public/projects/` was reviewed once and recorded below as a *kind* —
 * `kitchen`, `outdoor/alfresco`, `interiors/stair` and so on. The part before
 * the slash is the filter category; the whole token selects the caption copy.
 *
 * Nothing in this file is per-photo prose. The copy is written once per kind
 * and holds true for every frame filed under it, which is what keeps 183
 * images captioned without asserting a detail a photograph does not show.
 * Name an individual frame in `imageTitles` when a shot deserves its own line.
 */

/* -- Categories ----------------------------------------------------------- */

export type GalleryCategory =
  | "interiors"
  | "kitchen"
  | "living"
  | "bedroom"
  | "bathroom"
  | "outdoor";

/** Filter order. "All" is prepended by the rail itself. */
export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "interiors", label: "Interiors" },
  { id: "kitchen", label: "Kitchen" },
  { id: "living", label: "Living" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bathroom", label: "Bathroom" },
  { id: "outdoor", label: "Outdoor" },
];

export const galleryAllFilterLabel = "All";

const categoryLabels = Object.fromEntries(
  galleryCategories.map((category) => [category.id, category.label]),
) as Record<GalleryCategory, string>;

/* -- Caption copy --------------------------------------------------------- */

type KindCopy = {
  title: string;
  /**
   * Cycled by the frame's ordinal within its kind, so a project carrying six
   * kitchen shots does not print the same sentence six times.
   */
  descriptions: string[];
};

const kindCopy: Record<string, KindCopy> = {
  kitchen: {
    title: "Designer Kitchen",
    descriptions: [
      "Custom cabinetry and a full-length stone island, set so whoever is cooking is never turned away from the room.",
      "Integrated appliances, a splashback carried wall to wall, and task lighting built into the joinery rather than added to it.",
      "The working heart of the plan — stone benchtops, soft-close hardware, and storage detailed to the millimetre.",
    ],
  },
  "kitchen/pantry": {
    title: "Butler's Pantry",
    descriptions: [
      "A second bench behind the main kitchen, where the appliances, the sink and the everyday mess live out of sight.",
      "Full-height storage and a dedicated prep run — the detail that keeps the island clear when the house is full.",
    ],
  },
  living: {
    title: "Open Plan Living",
    descriptions: [
      "A generous living zone held under one ceiling line, with the glazing carrying light deep into the plan.",
      "Planned around the way a family actually gathers — open, bright, and easy to move through.",
      "Living and dining flow together, the same floor running edge to edge without a threshold between them.",
    ],
  },
  "living/media": {
    title: "Media Room",
    descriptions: [
      "A darker, quieter room set off the main living zone, lined and wired for film nights from the outset.",
    ],
  },
  bedroom: {
    title: "Bedroom Retreat",
    descriptions: [
      "A quiet room set away from the living wing, robes built in and the window framing the outlook.",
      "Calm materials and even light — well proportioned, with room to move right around a king bed.",
      "Softly finished and generously sized: the room the house winds down into at the end of the day.",
    ],
  },
  bathroom: {
    title: "Designer Bathroom",
    descriptions: [
      "Full-height tiling, a floating vanity and frameless glass — detailed to the same standard as the rest of the house.",
      "A stone-topped vanity, tapware set into the wall, and a shower run flush with the floor.",
      "A calm, hotel-quiet room in large-format tile, with the lighting built into the mirror line.",
    ],
  },
  "bathroom/powder": {
    title: "Powder Room",
    descriptions: [
      "A guest's first read of the detailing — a small room given a feature wall and its own piece of joinery.",
    ],
  },
  interiors: {
    title: "Interior Detail",
    descriptions: [
      "One of the quiet moments between rooms, finished with the same care as the spaces either side of it.",
    ],
  },
  "interiors/stair": {
    title: "Stair & Void",
    descriptions: [
      "The stair works as the joint between levels — a sculpted run beneath a void that carries light down through the house.",
    ],
  },
  "interiors/landing": {
    title: "Upper Landing",
    descriptions: [
      "The upstairs landing opens rather than closes, holding the balustrade line and borrowing light from the void.",
    ],
  },
  "interiors/robe": {
    title: "Walk-In Robe",
    descriptions: [
      "Full-height joinery — hanging, drawers and shelving all set out on the plan before a single door was hung.",
    ],
  },
  "interiors/study": {
    title: "Study Nook",
    descriptions: [
      "A built-in desk run written into the plan, so working from home never has to take over a bedroom.",
    ],
  },
  "interiors/hall": {
    title: "Entry & Hallway",
    descriptions: [
      "The approach through the house: a long, light-held hall that sets the tone before any single room does.",
    ],
  },
  "interiors/detail": {
    title: "Design Detail",
    descriptions: [
      "The small decisions — a pendant, a lining, a junction — that separate a built home from a finished one.",
    ],
  },
  outdoor: {
    title: "Facade & Approach",
    descriptions: [
      "Where the build meets the street: considered massing, a clear entry, and landscaping finished to match.",
      "The completed elevation, photographed at handover — render, roofline and driveway all in place.",
    ],
  },
  "outdoor/alfresco": {
    title: "Alfresco Living",
    descriptions: [
      "The alfresco reads as another room — under roof, level with the interior floor, and open to the yard beyond.",
    ],
  },
  "outdoor/pool": {
    title: "Pool & Grounds",
    descriptions: [
      "Pool, lawn and rear elevation together: the outdoor half of the brief, delivered alongside the house.",
    ],
  },
  "outdoor/yard": {
    title: "Rear Yard",
    descriptions: [
      "Turf laid, fencing finished and the rear of the home squared away well before handover.",
    ],
  },
};

/* -- Per-project kinds ----------------------------------------------------- */

/**
 * One token per frame, in `gallery-01 … gallery-NN` order, five to a line.
 * Read off the photography itself, so the filter rail reflects what is
 * actually in each shot. A project missing from this map — or a frame past the
 * end of its list — falls back to `interiors`, so adding photography never
 * breaks the page; the new frames are simply captioned generically until they
 * are filed.
 */
const projectImageKinds: Record<string, string> = {
  "14-verona-st-pallara": `
    kitchen/pantry kitchen/pantry bathroom living bathroom
    kitchen kitchen living kitchen outdoor/alfresco
    outdoor`,

  "17-ormskirk-st-calamvale": `
    outdoor living living bathroom bathroom
    bedroom bathroom kitchen living kitchen
    kitchen kitchen kitchen kitchen/pantry interiors/stair
    living living bedroom bathroom interiors/landing
    bedroom bathroom living bedroom bathroom
    bathroom interiors/robe bedroom outdoor`,

  "18-skye-court-bahrs-scrub": `
    outdoor living bathroom/powder kitchen kitchen
    kitchen kitchen kitchen kitchen living
    bathroom living bathroom bathroom bathroom
    bathroom bathroom bathroom outdoor outdoor
    kitchen/pantry`,

  "25-binnalong-st-rochedale-south": `
    outdoor kitchen kitchen kitchen kitchen/pantry
    kitchen living bathroom bedroom bedroom
    living living living living living
    living interiors/stair bedroom bedroom bathroom
    bathroom interiors/landing interiors/landing bedroom bedroom
    bedroom bathroom interiors/landing outdoor outdoor`,

  "25-langford-st": `
    living interiors/robe bathroom bathroom bathroom
    bathroom bathroom interiors/landing interiors/study kitchen/pantry
    interiors/stair kitchen outdoor`,

  "3-brooklyn-st-spring-mountain": `
    bathroom kitchen kitchen bathroom living
    outdoor/yard`,

  "3-dart-ave-kingston": `
    kitchen living living bathroom kitchen
    outdoor/alfresco outdoor`,

  "3-stanley-st-mount-gravatt": `
    bathroom bathroom interiors/landing living kitchen
    kitchen interiors/stair kitchen bathroom kitchen
    kitchen/pantry outdoor/alfresco outdoor`,

  "35-ayesha-place-calamvale": `
    bathroom bathroom interiors/landing bathroom bathroom
    interiors/detail kitchen interiors/hall living outdoor`,

  "49-herbert-st": `
    outdoor outdoor/alfresco outdoor/pool kitchen kitchen
    kitchen kitchen/pantry kitchen living interiors/stair
    living/media bathroom interiors/detail living bathroom`,

  "8-vineyard-drive-greenbank": `
    outdoor/yard outdoor outdoor kitchen bathroom
    bathroom bathroom`,

  "hi-def-project": `
    living bedroom bathroom living kitchen
    kitchen bathroom outdoor/yard outdoor`,
};

/**
 * Frames worth naming individually. Keyed by image path, so a title survives
 * any reordering of a project's gallery.
 */
const imageTitles: Record<string, string> = {
  "/projects/49-herbert-st/gallery-09.webp": "Stone Fireplace Living",
  "/projects/35-ayesha-place-calamvale/gallery-09.webp": "Fireplace Lounge",
  "/projects/3-stanley-st-mount-gravatt/gallery-07.webp": "Sculpted Stair",
};

/* -- Resolution ------------------------------------------------------------ */

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  categoryLabel: string;
  title: string;
  description: string;
};

const parseKinds = (slug: string): string[] =>
  (projectImageKinds[slug] ?? "").trim().split(/\s+/).filter(Boolean);

const isCategory = (value: string): value is GalleryCategory =>
  value in categoryLabels;

/**
 * Zips a project's image paths with their kinds and returns everything the
 * showcase needs to render — category, label, title and caption per frame.
 * Runs on the server, so the client component only ever receives plain data.
 */
export function getGalleryItems(project: Project): GalleryItem[] {
  const kinds = parseKinds(project.slug);
  /** Ordinal within a kind, so the cycled descriptions advance per kind. */
  const seen = new Map<string, number>();

  return project.images.map((src, index) => {
    const kind = kinds[index] ?? "interiors";
    const copy = kindCopy[kind] ?? kindCopy.interiors;
    const [root] = kind.split("/");
    const category: GalleryCategory = isCategory(root) ? root : "interiors";

    const ordinal = seen.get(kind) ?? 0;
    seen.set(kind, ordinal + 1);

    const title = imageTitles[src] ?? copy.title;

    return {
      src,
      alt: `${project.title} — ${title}, image ${index + 1} of ${project.images.length}`,
      category,
      categoryLabel: categoryLabels[category],
      title,
      description: copy.descriptions[ordinal % copy.descriptions.length],
    };
  });
}
