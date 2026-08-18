/**
 * The twelve completed projects, migrated verbatim from the live site's
 * `projects` array. Titles, locations, scope, descriptions and narratives are
 * unchanged; gallery paths resolve to the images now in `public/projects/`.
 */

export type ProjectType = "custom-home";

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: ProjectType;
  year: string;
  architect: string;
  scope: string;
  /**
   * The contract shape, shown on the detail card alongside the scope line.
   * `scope` says what was built; this says how it was delivered.
   */
  buildType: string;
  /** On site, foundations to handover. */
  buildDuration: string;
  /**
   * Read off the project's own gallery rather than a plan set, so these are
   * the rooms the photography actually shows. Optional throughout: a project
   * without a figure simply drops that cell from the statistics panel.
   */
  bedrooms?: number;
  bathrooms?: number;
  livingAreas?: number;
  description: string;
  projectNarrative: string;
  heroImage: string;
  /**
   * Optional looping film for the masthead. `heroImage` stays as the poster
   * frame, so a project without a video is unchanged. Add one per project as
   * the footage lands: `/videos/<slug>.mp4`.
   */
  heroVideo?: string;
  images: string[];
  featured: boolean;
};

/**
 * Every build in the portfolio is handed over, so the status is a constant
 * rather than twelve repetitions of the same string. Add a `status` field to
 * `Project` the day a project is genuinely in progress.
 */
export const projectStatus = "Completed";

/** Long-form type name for the detail card; the filter chips use the short one. */
export const projectTypeNames: Record<ProjectType, string> = {
  "custom-home": "Custom Home",
};

const buildProjectGallery = (slug: string, galleryCount: number) =>
  Array.from(
    { length: galleryCount },
    (_, index) =>
      `/projects/${slug}/gallery-${String(index + 1).padStart(2, "0")}.webp`,
  );

export const projects: Project[] = [
  {
    id: "1",
    title: "Aurelia Residence",
    slug: "14-verona-st-pallara",
    location: "Pallara, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - luxury family home",
    buildType: "Full Design & Build",
    buildDuration: "10 Months",
    bedrooms: 4,
    bathrooms: 2,
    livingAreas: 2,
    description:
      "A beautifully crafted family residence in Pallara featuring modern architectural lines, premium finishes, and spacious open-plan living. Designed to embrace the Queensland lifestyle with seamless indoor-outdoor flow.",
    projectNarrative:
      "Planned as a refined family residence, Aurelia Residence balances calm interiors, warm timber tones, and generous glazing to create a home that feels open, bright, and easy to live in every day.",
    heroImage: "/projects/14-verona-st-pallara/hero.webp",
    heroVideo: "/videos/14-verona-st-pallara.mp4",
    images: buildProjectGallery("14-verona-st-pallara", 11),
    featured: true,
  },
  {
    id: "2",
    title: "Solstice Residence",
    slug: "25-langford-st",
    location: "Eight Mile Plains, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Custom home - contemporary design & build",
    buildType: "Custom Design & Build",
    buildDuration: "14 Months",
    bedrooms: 5,
    bathrooms: 4,
    livingAreas: 3,
    description:
      "A striking contemporary residence showcasing bold architectural design, high-end interiors, and expansive living spaces. Built with meticulous attention to detail and quality craftsmanship throughout.",
    projectNarrative:
      "From the dark joinery and sculpted kitchen detailing to the layered living zones, Solstice Residence was delivered as a contemporary home with strong visual impact and practical spaces for modern family routines.",
    heroImage: "/projects/25-langford-st/hero.webp",
    heroVideo: "/videos/25-langford-st.mp4",
    images: buildProjectGallery("25-langford-st", 13),
    featured: true,
  },
  {
    id: "3",
    title: "Lumiere Residence",
    slug: "49-herbert-st",
    location: "Camp Hill, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - modern family home",
    buildType: "Full Design & Build",
    buildDuration: "15 Months",
    bedrooms: 5,
    bathrooms: 4,
    livingAreas: 3,
    description:
      "A sophisticated modern family home featuring clean architectural lines, premium material selections, and thoughtfully designed living spaces that maximise natural light and ventilation.",
    projectNarrative:
      "Every decision on Lumiere Residence centred on light, proportion, and finish quality, resulting in a home that feels elegant, welcoming, and highly functional for day-to-day family living.",
    heroImage: "/projects/49-herbert-st/hero.webp",
    heroVideo: "/videos/49-herbert-st.mp4",
    images: buildProjectGallery("49-herbert-st", 15),
    featured: true,
  },
  {
    id: "4",
    title: "Evercrest Residence",
    slug: "3-brooklyn-st-spring-mountain",
    location: "Spring Mountain, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Custom home - new build",
    buildType: "Custom Home Build",
    buildDuration: "9 Months",
    bedrooms: 4,
    bathrooms: 2,
    livingAreas: 2,
    description:
      "A stunning custom home in the Spring Mountain estate featuring contemporary architecture, premium finishes, and generous living areas designed for modern family living in one of Brisbane's most sought-after growth corridors.",
    projectNarrative:
      "Set within Spring Mountain, Evercrest Residence was shaped to make the most of its estate setting with modern street appeal, efficient planning, and flexible living areas that support a growing household.",
    heroImage: "/projects/3-brooklyn-st-spring-mountain/hero.webp",
    heroVideo: "/videos/3-brooklyn-st-spring-mountain.mp4",
    images: buildProjectGallery("3-brooklyn-st-spring-mountain", 6),
    featured: false,
  },
  {
    id: "5",
    title: "Willowmere Residence",
    slug: "3-dart-ave-kingston",
    location: "Kingston, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - family home",
    buildType: "Full Design & Build",
    buildDuration: "9 Months",
    bedrooms: 4,
    bathrooms: 2,
    livingAreas: 2,
    description:
      "A well-appointed family home in Kingston combining functional design with stylish contemporary finishes. Every space has been carefully planned to deliver comfort, practicality, and lasting quality.",
    projectNarrative:
      "Willowmere Residence focused on liveability first, with a practical layout, durable finishes, and comfortable shared spaces that make the home as functional as it is visually polished.",
    heroImage: "/projects/3-dart-ave-kingston/hero.webp",
    heroVideo: "/videos/3-dart-ave-kingston.mp4",
    images: buildProjectGallery("3-dart-ave-kingston", 7),
    featured: false,
  },
  {
    id: "6",
    title: "Halcyon Residence",
    slug: "3-stanley-st-mount-gravatt",
    location: "Mount Gravatt, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - luxury home",
    buildType: "Full Design & Build",
    buildDuration: "14 Months",
    bedrooms: 5,
    bathrooms: 4,
    livingAreas: 3,
    description:
      "An impressive custom build in Mount Gravatt showcasing architectural excellence and superior craftsmanship. Featuring high ceilings, premium kitchen design, and beautifully appointed interiors throughout.",
    projectNarrative:
      "Halcyon Residence combines elevated detailing with strong everyday usability, bringing together feature ceilings, bespoke kitchen elements, and carefully resolved interiors in a confidently finished family home.",
    heroImage: "/projects/3-stanley-st-mount-gravatt/hero.webp",
    heroVideo: "/videos/3-stanley-st-mount-gravatt.mp4",
    images: buildProjectGallery("3-stanley-st-mount-gravatt", 13),
    featured: true,
  },
  {
    id: "7",
    title: "Elmsworth Residence",
    slug: "35-ayesha-place-calamvale",
    location: "Calamvale, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Custom home - modern family build",
    buildType: "Custom Home Build",
    buildDuration: "12 Months",
    bedrooms: 5,
    bathrooms: 4,
    livingAreas: 3,
    description:
      "A modern family home in Calamvale designed with thoughtful attention to space, light, and lifestyle. Featuring contemporary interiors, quality finishes, and functional living areas perfect for family life.",
    projectNarrative:
      "Designed for relaxed family living, Elmsworth Residence pairs contemporary styling with thoughtful zoning, quality joinery, and bright internal spaces that feel connected from front to rear.",
    heroImage: "/projects/35-ayesha-place-calamvale/hero.webp",
    heroVideo: "/videos/35-ayesha-place-calamvale.mp4",
    images: buildProjectGallery("35-ayesha-place-calamvale", 10),
    featured: false,
  },
  {
    id: "8",
    title: "Oakmont Residence",
    slug: "8-vineyard-drive-greenbank",
    location: "Greenbank, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - acreage home",
    buildType: "Full Design & Build",
    buildDuration: "12 Months",
    bedrooms: 4,
    bathrooms: 3,
    livingAreas: 2,
    description:
      "A spacious acreage home in Greenbank set against lush surroundings. This build features expansive living areas, a chef-grade kitchen, and outdoor entertaining spaces that make the most of the tranquil semi-rural setting.",
    projectNarrative:
      "With its acreage context in mind, Oakmont Residence was composed around spacious entertaining, expansive sight lines, and a layout that feels generous, grounded, and well suited to semi-rural living.",
    heroImage: "/projects/8-vineyard-drive-greenbank/hero.webp",
    heroVideo: "/videos/8-vineyard-drive-greenbank.mp4",
    images: buildProjectGallery("8-vineyard-drive-greenbank", 7),
    featured: true,
  },
  {
    id: "9",
    title: "Celeste Residence",
    slug: "hi-def-project",
    location: "Brisbane, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - premium residence",
    buildType: "Full Design & Build",
    buildDuration: "12 Months",
    bedrooms: 4,
    bathrooms: 3,
    livingAreas: 2,
    description:
      "A premium custom residence showcasing ARC Builders' commitment to exceptional quality. This project features striking exterior design, luxurious interiors, and the finest material selections throughout.",
    projectNarrative:
      "Celeste Residence was curated as a premium showcase project, pairing bold presentation with luxurious finishes and a strong focus on craftsmanship, flow, and everyday comfort.",
    heroImage: "/projects/hi-def-project/hero.webp",
    heroVideo: "/videos/hi-def-project.mp4",
    images: buildProjectGallery("hi-def-project", 9),
    featured: false,
  },
  {
    id: "10",
    title: "Ormskirk Residence",
    slug: "17-ormskirk-st-calamvale",
    location: "Calamvale, QLD",
    type: "custom-home",
    year: "2026",
    architect: "ARC Design Studio",
    scope: "Custom home - completed family residence",
    buildType: "Custom Home Build",
    buildDuration: "14 Months",
    bedrooms: 5,
    bathrooms: 5,
    livingAreas: 3,
    description:
      "A contemporary Calamvale residence with a strong street presence, considered internal planning, and refined finishes throughout. The home balances family functionality with clean architectural presentation.",
    projectNarrative:
      "Ormskirk Residence was shaped around a polished everyday living experience, bringing together confident exterior form, practical zoning, and carefully finished interiors suited to modern family life.",
    heroImage: "/projects/17-ormskirk-st-calamvale/hero.webp",
    heroVideo: "/videos/17-ormskirk-st-calamvale.mp4",
    images: buildProjectGallery("17-ormskirk-st-calamvale", 29),
    featured: false,
  },
  {
    id: "11",
    title: "Binnalong Residence",
    slug: "25-binnalong-st-rochedale-south",
    location: "Rochedale South, QLD",
    type: "custom-home",
    year: "2026",
    architect: "ARC Design Studio",
    scope: "Custom home - full build",
    buildType: "Custom Home Build",
    buildDuration: "13 Months",
    bedrooms: 5,
    bathrooms: 3,
    livingAreas: 3,
    description:
      "A thoughtfully completed Rochedale South home featuring crisp exterior detailing, warm interior selections, and practical living spaces designed for comfort, durability, and day-to-day ease.",
    projectNarrative:
      "Binnalong Residence brings a composed, functional approach to the family home, with a gallery that follows the project from its exterior presence through to finished internal spaces and key living zones.",
    heroImage: "/projects/25-binnalong-st-rochedale-south/hero.webp",
    heroVideo: "/videos/25-binnalong-st-rochedale-south.mp4",
    images: buildProjectGallery("25-binnalong-st-rochedale-south", 30),
    featured: false,
  },
  {
    id: "12",
    title: "Skye Court Residence",
    slug: "18-skye-court-bahrs-scrub",
    location: "Bahrs Scrub, QLD",
    type: "custom-home",
    year: "2026",
    architect: "ARC Design Studio",
    scope: "Custom home - new residence",
    buildType: "Custom Home Build",
    buildDuration: "12 Months",
    bedrooms: 4,
    bathrooms: 3,
    livingAreas: 3,
    description:
      "A fresh custom residence in Bahrs Scrub with bright internal spaces, contemporary finishes, and a clean, practical layout designed to support relaxed family living.",
    projectNarrative:
      "Skye Court Residence captures ARC Builders' focus on liveable design, resolved detailing, and polished presentation, with a gallery that highlights both the home's finished exterior and internal flow.",
    heroImage: "/projects/18-skye-court-bahrs-scrub/hero.webp",
    heroVideo: "/videos/18-skye-court-bahrs-scrub.mp4",
    images: buildProjectGallery("18-skye-court-bahrs-scrub", 21),
    featured: false,
  },
];

export const projectTypeLabels: Record<ProjectType, string> = {
  "custom-home": "Custom",
};

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjects(slugs: string[]) {
  return slugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}
