/**
 * The build journey. Stages 1–4 are migrated verbatim from the live site's
 * `processSteps` array; stage 5 (aftercare) is the closing beat the /process
 * page design adds, so the story ends on the relationship rather than on the
 * keys changing hands.
 *
 * One export, read by every band that shows the journey — the /process
 * timeline, the homepage journey, the contact rail and the about page — so a
 * stage added here appears in all four or in none.
 *
 * `media` is a supporting photograph for each stage, and `outcome` is the one
 * line the design overlays on it: what the client walks away with when that
 * stage closes.
 */

export type ProcessStep = {
  id: number;
  title: string;
  /** One line, for the compact numbered rail on the contact page. */
  summary: string;
  description: string;
  details: string[];
  /** What the client has in hand once the stage is done. */
  outcome: string;
  media: { src: string; alt: string; caption: string };
};

export const processStages: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation",
    summary:
      "We listen to your ideas and understand your vision and goals.",
    description:
      "We meet to understand your vision, requirements, and budget. We listen first, advise second, and always put your goals at the centre.",
    details: [
      "Free initial consultation",
      "Site assessment & feasibility",
      "Understanding your vision & requirements",
      "Budget discussion & guidance",
    ],
    outcome: "A clear understanding of your goals and project scope.",
    media: {
      src: "/process/stage-01-consultation.webp",
      alt: "A two-storey rendered home at dusk, of the kind a first consultation is held over",
      caption: "CONSULTATION",
    },
  },
  {
    id: 2,
    title: "Planning & Design",
    summary:
      "We create a tailored plan and design to bring your vision to life.",
    description:
      "Our team develops detailed plans, provides upfront pricing, completes documentation, manages council approvals, and prepares for construction.",
    details: [
      "Detailed architectural plans",
      "Transparent upfront pricing — no hidden costs",
      "Council approval management",
      "Material selection & specifications",
    ],
    outcome: "A tailored plan, approved and ready to build.",
    media: {
      src: "/process/stage-02-planning.webp",
      alt: "A kitchen with a stone island and timber joinery, the sort of finish selected at design stage",
      caption: "PLANNING & DESIGN",
    },
  },
  {
    id: 3,
    title: "Construction",
    summary:
      "Our skilled team builds with quality, care and attention to detail.",
    description:
      "Experienced trades bring your project to life with meticulous craftsmanship, regular updates, and on-time delivery.",
    details: [
      "Experienced trades & project management",
      "Regular progress updates & site meetings",
      "Quality assurance at every stage",
      "On-time delivery commitment",
    ],
    outcome: "Your project is built with care, quality and precision.",
    media: {
      src: "/process/stage-03-framing.webp",
      alt: "A two-storey home at frame stage, brickwork rising and the roof trusses set",
      caption: "CONSTRUCTION",
    },
  },
  {
    id: 4,
    title: "Completion & Handover",
    summary:
      "We deliver your project on time, on budget and beyond expectations.",
    description:
      "A thorough quality inspection, walkthrough, and handover. We stand behind our work with comprehensive warranties.",
    details: [
      "Comprehensive quality inspection",
      "Complete documentation and warranties",
      "Full walkthrough and handover",
      "Ongoing support & aftercare",
    ],
    outcome: "A finished space you'll love, backed by our guarantee.",
    media: {
      src: "/process/stage-04-handover.webp",
      alt: "A finished open-plan living room opening onto the garden through full-height glazing",
      caption: "COMPLETION & HANDOVER",
    },
  },
  {
    id: 5,
    title: "Aftercare & Support",
    summary:
      "We stay available long after the keys have changed hands.",
    description:
      "Our relationship doesn't end at handover. We're here whenever you need us — for a question, an adjustment, or advice years down the track.",
    details: [
      "Dedicated aftercare support",
      "Prompt response to any issues",
      "Maintenance advice & guidance",
      "Long-term peace of mind",
    ],
    outcome: "Continued support for complete peace of mind.",
    media: {
      src: "/process/stage-05-aftercare.webp",
      alt: "A completed home lit from within at night, years into being lived in",
      caption: "AFTERCARE & SUPPORT",
    },
  },
];

/**
 * The copy for the numbered process rail. Its own heading rather than the
 * homepage's: that band leads into the full /process page, this one reassures
 * a visitor who is halfway through writing an enquiry.
 */
export const processBand = {
  eyebrow: "Our Simple Process",
  heading: "From Concept to Completion",
  lead: "A seamless building experience from start to finish.",
  link: { label: "The full process", href: "/process" },
  media: {
    src: "/projects/25-langford-st/hero.webp",
    alt: "Solstice Residence, Eight Mile Plains",
    label: "SOLSTICE RESIDENCE — EIGHT MILE PLAINS",
  },
};
