/**
 * Copy for every internal page, migrated from the live site.
 *
 * Headings, leads, body copy, list items, form labels and options are
 * reproduced word for word from `Content-Extraction/<Page>/Text/content.md`.
 * `seo` mirrors each page's original title and meta description.
 */

import { localAreas } from "@/content/local-areas";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  images?: string[];
};

/* -- About ---------------------------------------------------------------- */

export const aboutPage = {
  seo: {
    title: "About ARC Builders",
    description:
      "Learn about ARC Builders, our 18+ years of experience, transparent building approach, and commitment to quality homes across Brisbane, Logan, Rochedale, and South East Queensland.",
    path: "/about",
    keywords: [
      "about ARC Builders",
      "Brisbane builder team",
      "quality home builder Queensland",
    ],
    images: ["/projects/25-langford-st/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Our Story",
  heading: "About ARC Builders",
  lead: site.legalName,
  heroImage: "/projects/25-langford-st/hero.webp",
  story: {
    heading: "Builders with a Difference",
    paragraphs: [
      "At ARC Builders, we have been in the construction industry for over 18 years, with an experienced team driven to deliver excellence in customer service.",
      "Transforming your plans into quality residential or commercial buildings. Unlike others that only provide set design and build, we customise our plans to reflect your unique vision.",
      "We are driven by a passion to deliver superior customer service, delivering on time, with a team that builds to the highest quality and finest details.",
    ],
    /** Two frames of the same completed home, layered. */
    media: {
      src: "/projects/3-dart-ave-kingston/hero.webp",
      alt: "Willowmere Residence, Kingston",
      label: "WILLOWMERE RESIDENCE — KINGSTON",
    },
    mediaInset: {
      src: "/projects/3-dart-ave-kingston/gallery-04.webp",
      alt: "Willowmere Residence, Kingston",
      label: "WILLOWMERE RESIDENCE — KINGSTON",
    },
  },
  /** The full-bleed plate between the story and the values. */
  feature: {
    src: "/projects/49-herbert-st/hero.webp",
    alt: "Lumiere Residence, Camp Hill",
    caption: "LUMIERE RESIDENCE — CAMP HILL",
  },
  /**
   * The live page animates three counters — "Years Experience", "Projects"
   * and "Satisfaction". Only the years figure is recorded in the extracted
   * content, so the remaining cells count what this project actually holds
   * rather than assert an unverified number.
   */
  stats: [
    { value: site.experience, label: "Years Experience" },
    { value: `${projects.length}`, label: "Projects" },
    { value: `${localAreas.length}`, label: "Service Areas" },
  ],
  values: {
    eyebrow: "What Drives Us",
    heading: "Our Values",
    items: [
      {
        index: "01",
        title: "Transparency",
        body: "Upfront pricing with no hidden costs. You know exactly what you're investing from day one.",
      },
      {
        index: "02",
        title: "Attention to Detail",
        body: "The finest details matter. Our team builds to the highest quality standards on every project.",
      },
      {
        index: "03",
        title: "Client First",
        body: "We listen first, advise second. Your vision and goals are always at the centre of what we do.",
      },
      {
        index: "04",
        title: "Excellence",
        body: "Driven to deliver superior customer service and quality craftsmanship, every single time.",
      },
    ],
  },
};

/* -- Projects ------------------------------------------------------------- */

export const projectsPage = {
  seo: {
    title: "Project Portfolio",
    description:
      "Browse ARC Builders project portfolio featuring custom homes and quality builds delivered across Brisbane, Logan, Rochedale, and South East Queensland.",
    path: "/projects",
    keywords: [
      "builder portfolio Brisbane",
      "custom home projects",
      "completed homes Queensland",
    ],
    images: ["/projects/14-verona-st-pallara/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Portfolio",
  heading: "Our Projects",
  lead: "Explore our portfolio of residential and commercial builds across Queensland.",
  heroImage: "/projects/14-verona-st-pallara/hero.webp",
  allFilterLabel: "All Projects",
  /** Section labels for the portfolio bands. Both headings are wording the
   *  site already uses — "Featured Projects" from the homepage, "All Projects"
   *  from this page's own filter. */
  featured: {
    eyebrow: "Featured",
    heading: "Featured Projects",
  },
  index: {
    eyebrow: "Index",
    heading: "The Full Portfolio",
  },
  detail: {
    detailsHeading: "Project Details",
    aboutHeading: "About This Project",
    /** The showcase band leads with the eyebrow, then the heading. */
    galleryEyebrow: "Project Gallery",
    galleryHeading: "Explore Every Detail",
    /** Controls inside the showcase. Every one of these is announced to a
     *  screen reader, so they are copy, not decoration. */
    gallery: {
      previous: "Previous image",
      next: "Next image",
      fullscreen: "Fullscreen",
      closeFullscreen: "Close fullscreen",
      thumbnails: "Gallery thumbnails",
      scrollThumbsBack: "Scroll thumbnails left",
      scrollThumbsForward: "Scroll thumbnails right",
      filterLabel: "Filter gallery by room",
      empty: "No images in this category yet.",
    },
    labels: {
      /** Names the build itself — used by the gallery's information bar. */
      project: "Project",
      location: "Location",
      scope: "Scope",
      architect: "Architect",
      /** The short form, used where a specification sits in a two-cell row. */
      year: "Year",
      projectType: "Project Type",
      buildType: "Build Type",
      duration: "Build Duration",
      status: "Project Status",
      /** The long form the detail card spells out. */
      yearCompleted: "Year Completed",
    },
    /** The action closing the specification card. Scrolls to the gallery. */
    galleryCta: "View Project Gallery",
    /**
     * How ARC builds, said once. These four hold for every home in the
     * portfolio, so they are written here rather than repeated per project.
     * `icon` selects the glyph in `project-about.tsx`.
     */
    features: [
      {
        icon: "architecture",
        title: "Modern Architecture",
        body: "Clean, timeless design with a focus on how the home is lived in.",
      },
      {
        icon: "openPlan",
        title: "Open Plan Living",
        body: "Spacious interiors that flow effortlessly for family living.",
      },
      {
        icon: "materials",
        title: "Premium Materials",
        body: "Carefully selected finishes chosen to look and last well.",
      },
      {
        icon: "outdoor",
        title: "Indoor–Outdoor Living",
        body: "A seamless connection to the alfresco and the yard beyond.",
      },
    ],
    /** Column headings for the statistics panel under the feature cards. */
    stats: {
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      livingAreas: "Living Areas",
      completed: "Completed",
    },
    viewLabel: "View project",
    backLink: "← All projects",
    previousLabel: "Previous project",
    nextLabel: "Next project",
  },
};

/* -- Process -------------------------------------------------------------- */

export const processPage = {
  seo: {
    title: "Our Building Process",
    description:
      "Understand ARC Builders' step-by-step process from consultation and design to construction and handover for projects in Brisbane, Logan, Rochedale, and South East Queensland.",
    path: "/process",
    keywords: [
      "home building process",
      "custom home timeline",
      "builder process Brisbane",
    ],
    images: ["/projects/hi-def-project/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "How We Work",
  heading: "Our Process",
  lead: "Every ARC project follows a proven process that ensures transparency, quality, and your complete satisfaction.",
  heroImage: "/projects/hi-def-project/hero.webp",
};

/* -- Locations ------------------------------------------------------------ */

export const locationsPage = {
  seo: {
    title: "Service Areas for Custom Homes in Brisbane & South East Queensland",
    description:
      "Explore ARC Builders service areas for custom homes, renovations and premium family residences across Brisbane, Logan, Rochedale, Calamvale, Pallara, Greenbank and South East Queensland.",
    path: "/locations",
    keywords: [
      "custom home builder Brisbane Southside",
      "custom home builder Logan",
      "custom home builder Rochedale",
      "custom home builder Calamvale",
      "custom home builder South East Queensland",
    ],
    images: ["/projects/49-herbert-st/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Service Areas",
  heading: "Custom Homes Across South East Queensland",
  lead: "ARC Builders works with homeowners across Brisbane Southside, Logan and surrounding growth suburbs to plan and deliver clear, quality-first building projects.",
  heroImage: "/projects/49-herbert-st/hero.webp",
  /** Interface labels for the area index and the area pages. */
  viewLabel: "View area",
  indexLabel: "Service areas",
  area: {
    buildingHeading: (name: string) => `Building in ${name}`,
    strengthsHeading: "Local Strengths",
    projectsHeading: "Relevant Projects",
    faqEyebrow: "Questions",
    faqHeading: (name: string) => `${name} Builder FAQs`,
    backLink: "← All service areas",
  },
};

/* -- Residential ---------------------------------------------------------- */

export const residentialPage = {
  seo: {
    title: "Residential Building Services",
    description:
      "Residential building services by ARC Builders including custom homes, renovations, extensions, granny flats, and duplex projects in South East Queensland.",
    path: "/residential",
    keywords: [
      "custom homes Brisbane",
      "home renovations Logan",
      "custom home builder Rochedale",
      "home renovations South East Queensland",
      "extensions Queensland",
      "granny flat builder",
    ],
    images: ["/projects/8-vineyard-drive-greenbank/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Residential",
  heading: "Residential Services",
  lead: "From custom homes to renovations and extensions, we tailor every project to your unique vision and budget.",
  heroImage: "/projects/8-vineyard-drive-greenbank/hero.webp",
  work: {
    eyebrow: "Recent Work",
    heading: "Residential Projects",
    projectSlugs: ["14-verona-st-pallara", "25-langford-st", "49-herbert-st"],
  },
};

/* -- Commercial ----------------------------------------------------------- */

export const commercialPage = {
  seo: {
    title: "Commercial Construction Services",
    description:
      "Commercial construction services including shop fitouts, medical centres, childcare facilities, and mixed-use builds by ARC Builders in South East Queensland.",
    path: "/commercial",
    keywords: [
      "commercial builder Brisbane",
      "shop fitout builder",
      "medical centre construction",
    ],
    images: ["/projects/3-stanley-st-mount-gravatt/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Commercial",
  heading: "Commercial Services",
  lead: "Shop fitouts, medical centres, childcare construction, and commercial buildings delivered to the highest standards.",
  heroImage: "/projects/3-stanley-st-mount-gravatt/hero.webp",
};

/* -- Blog ----------------------------------------------------------------- */

export const blogPage = {
  seo: {
    title: "Building Blog and Insights",
    description:
      "Read ARC Builders insights on custom homes, Vastu design, NRI property planning, and construction guidance for Brisbane and South East Queensland.",
    path: "/blog",
    keywords: [
      "home building blog",
      "Vastu home Australia",
      "NRI property Queensland",
    ],
    images: ["/projects/35-ayesha-place-calamvale/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Insights & Education",
  heading: "Blog & Insights",
  lead: "Expert advice on building, renovating, and making the most of your property investment in Queensland.",
  heroImage: "/projects/35-ayesha-place-calamvale/hero.webp",
  allFilterLabel: "All",
  /** Interface labels for the index and the article pages. */
  readLabel: "Read article",
  emptyLabel: "No articles in this category yet.",
  detail: {
    contentsHeading: "In this article",
    shareHeading: "Share this article",
    tagsHeading: "Tags",
    relatedHeading: "Related Articles",
    backLink: "← All articles",
  },
};

/* -- Contact -------------------------------------------------------------- */

export const contactPage = {
  seo: {
    title: "Contact ARC Builders",
    description:
      "Contact ARC Builders for custom homes, renovations, and commercial projects in Brisbane, Logan, Rochedale, and South East Queensland.",
    path: "/contact",
    keywords: [
      "contact home builder Brisbane",
      "get construction quote",
      "custom home consultation",
    ],
    images: ["/projects/49-herbert-st/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Get In Touch",
  heading: "Start Your Project",
  lead: "Ready to build? Contact us for an obligation-free consultation and quote.",
  heroImage: "/projects/49-herbert-st/hero.webp",
  infoHeading: "Contact Information",
  labels: {
    address: "Address",
    phone: "Phone",
    email: "Email",
  },
  form: {
    heading: "Project Enquiry",
    fields: {
      name: "Full Name *",
      email: "Email Address *",
      phone: "Phone Number",
      projectType: "Project Type *",
      budget: "Budget Range",
      message: "Tell Us About Your Project *",
    },
    projectTypePlaceholder: "Select project type",
    projectTypes: [
      "Custom Home",
      "Vastu-Compliant Home",
      "Multi-Generational Home",
      "Renovation",
      "Extension",
      "Granny Flat / Duplex",
      "Commercial Fitout",
      "Medical Centre",
      "Childcare Centre",
      "Other",
    ],
    budgetPlaceholder: "Select budget range",
    budgets: [
      "Under $200K",
      "$200K – $500K",
      "$500K – $1M",
      "$1M – $2M",
      "$2M+",
      "Not Sure Yet",
    ],
    submitLabel: "Send Enquiry",
    note: "This form opens your default email app so you can review and send your enquiry details directly. Private project selections are shared after enquiry review.",
  },
};

/* -- Inclusions (private client tool) ------------------------------------- */

export const inclusionsPage = {
  seo: {
    title: "Client Project Selections",
    description: "Private ARC Builders project selections shared after enquiry review.",
    path: "/inclusions",
    keywords: [
      "private project selections",
      "client build selections",
      "arc builders client link",
    ],
    images: ["/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Private client link",
  heading: "Client Project Selections",
  lead: "This private page is shared after enquiry review so clients can confirm project selections clearly before consultant follow-up.",
  heroImage: "/hero.webp",
  assurances: [
    {
      title: "Business Safe",
      body: "Compliance-critical items are always locked and cannot be removed.",
    },
    {
      title: "Selection Clarity",
      body: "Allowance and optional inclusion pathways stay visible so the consultant review is faster and cleaner.",
    },
    {
      title: "Consultant-Led Pricing",
      body: "Base pricing is shown where approved. Final upgrade and tailored pricing is confirmed in meeting or on call.",
    },
  ],
  setup: {
    heading: "Project Setup",
    lead: "These project details personalize your inclusion schedule and support consultant review, lead tracking, and proposal handover.",
    howToHeading: "How To Use",
    howTo: "Complete project details, choose build type and package, then set each allowance row to Standard or Include. Locked rows are mandatory and cannot be removed, and final pricing is reviewed with your consultant.",
    fields: {
      customerName: "Customer Name",
      email: "Email",
      phone: "Phone",
      suburb: "Build Suburb",
      buildType: "Build Type",
      package: "Package",
    },
    buildTypeNote:
      "Essential Living base pricing is available for approved single and double storey builds. Signature, Luxury, and fully custom pricing is confirmed after consultant review.",
  },
  selectionLabels: {
    standard: "Standard",
    upgrade: "Upgrade",
    include: "Include",
    exclude: "Exclude",
    locked: "Locked",
  },
  exclusionsHeading: "Explicit Exclusions",
  exclusionsLead:
    "The following remain outside the standard contract sum unless separately quoted and approved.",
  snapshot: {
    heading: "Pricing and Selection Snapshot",
    lead: "Base pricing is shown only where approved. Final selections and pricing are confirmed with your consultant.",
    guideLabel: "Selected pricing guide",
    officialLabel: "Official base pricing",
    selectionsLabel: "Selections for consultant review",
    emptySelections: "No additional selections marked yet.",
    acknowledgements: [
      "I understand this is a preliminary inclusion schedule.",
      "I understand final pricing and selections are confirmed with my consultant and written tender.",
    ],
  },
};

/* -- Maintenance ---------------------------------------------------------- */

export const maintenancePage = {
  seo: {
    title: "Temporarily Offline",
    description: "Temporarily offline. Please check back soon.",
    path: "/maintenance",
    keywords: [],
  } satisfies PageSeo,
  heading: "Temporarily Offline",
  body: "We're making a few final refinements. Please check back soon.",
};
