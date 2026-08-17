/**
 * The four build stages, migrated verbatim from the live site's `processSteps`
 * array. The `details` lists are the per-stage bullets from the /process page.
 *
 * `media` is a supporting photograph for each stage, chosen from the project
 * galleries already in `public/projects/` so it reinforces one of that stage's
 * bullets — the site elevation for the consultation, the finish selections for
 * design, the joinery for construction, a completed room for handover. Each is
 * captioned with the build it comes from, so it credits a real project rather
 * than implying the moment was photographed.
 */

export type ProcessStep = {
  id: number;
  title: string;
  description: string;
  details: string[];
  media: { src: string; alt: string; caption: string };
};

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We meet to understand your vision, requirements, and budget. We listen first, advise second, and always put your goals at the centre.",
    details: [
      "Free initial consultation",
      "Understanding your vision & requirements",
      "Site assessment & feasibility",
      "Budget discussion & guidance",
    ],
    media: {
      src: "/projects/17-ormskirk-st-calamvale/gallery-01.webp",
      alt: "Ormskirk Residence, Calamvale",
      caption: "ORMSKIRK RESIDENCE — CALAMVALE",
    },
  },
  {
    id: 2,
    title: "Planning & Design",
    description:
      "Our team develops detailed plans, provides upfront pricing, completes documentation, manages council approvals, and prepares for construction.",
    details: [
      "Detailed architectural plans",
      "Transparent upfront pricing — no hidden costs",
      "Council approval management",
      "Material selection & specifications",
    ],
    media: {
      src: "/projects/25-langford-st/gallery-03.webp",
      alt: "Solstice Residence, Eight Mile Plains",
      caption: "SOLSTICE RESIDENCE — EIGHT MILE PLAINS",
    },
  },
  {
    id: 3,
    title: "Construction",
    description:
      "Experienced trades bring your project to life with meticulous craftsmanship, regular updates, and on-time delivery.",
    details: [
      "Experienced trades & project management",
      "Regular progress updates & site meetings",
      "Quality assurance at every stage",
      "On-time delivery commitment",
    ],
    media: {
      src: "/projects/49-herbert-st/gallery-08.webp",
      alt: "Lumiere Residence, Camp Hill",
      caption: "LUMIERE RESIDENCE — CAMP HILL",
    },
  },
  {
    id: 4,
    title: "Completion & Handover",
    description:
      "A thorough quality inspection, walkthrough, and handover. We stand behind our work with comprehensive warranties.",
    details: [
      "Comprehensive quality inspection",
      "Complete documentation and warranties",
      "Full walkthrough and handover",
      "Ongoing support & aftercare",
    ],
    media: {
      src: "/projects/25-binnalong-st-rochedale-south/gallery-18.webp",
      alt: "Binnalong Residence, Rochedale South",
      caption: "BINNALONG RESIDENCE — ROCHEDALE SOUTH",
    },
  },
];
