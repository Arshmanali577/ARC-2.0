/**
 * Copy for every internal page, migrated from the live site.
 *
 * Headings, leads, body copy, list items, form labels and options are
 * reproduced word for word from `Content-Extraction/<Page>/Text/content.md`.
 * `seo` mirrors each page's original title and meta description.
 */

import { localAreas } from "@/content/local-areas";
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
    /** The share card shows the page's own masthead. */
    images: ["/about/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "About ARC Builders",
  /**
   * The masthead H1, set in two lines with the closing word picked out in the
   * accent so the page opens on one deliberate point of colour. Kept as parts
   * rather than one string because the page has to mark that word up.
   */
  heading: {
    line1: "Built on Experience.",
    line2: "Driven by ",
    accent: "Integrity.",
  },
  lead: "We are a Brisbane-based building company passionate about creating exceptional residential and commercial spaces that stand the test of time.",
  /**
   * The masthead photograph. Not one of the portfolio builds, so it is
   * described rather than credited to a project — the captioned plates
   * elsewhere on the site name the home they show, and this one cannot.
   */
  heroImage: "/about/hero.webp",
  heroImageAlt:
    "A contemporary two-storey home lit from within at dusk, seen across the pool from the alfresco",
  heroMediaLabel: "ARC BUILDERS",
  heroCta: { label: "Our Projects", href: "/projects" },
  story: {
    heading: "Builders Who Care About the Details",
    paragraphs: [
      "At ARC Builders, we have been in the construction industry for over 18 years, with an experienced team driven to deliver excellence in customer service.",
      "Transforming your plans into quality residential or commercial buildings. Unlike others that only provide set design and build, we customise our plans to reflect your unique vision.",
      "We are driven by a passion to deliver superior customer service, delivering on time, with a team that builds to the highest quality and finest details.",
    ],
    /** Signs the statement off the way a letter from the office would. */
    signature: {
      name: "The ARC Builders Team",
      note: `${site.licence.label} — LIC. ${site.licence.number}`,
    },
    media: {
      src: "/projects/3-dart-ave-kingston/hero.webp",
      alt: "Willowmere Residence, Kingston",
      label: "WILLOWMERE RESIDENCE — KINGSTON",
    },
    /**
     * The navy panel stepped over the foot of the photograph. Every figure is
     * counted from this repository or read from `site.ts` rather than
     * asserted. `icon` names a glyph; the drawing stays in the component.
     */
    stats: [
      { icon: "experience", value: site.experience, label: "Years Experience" },
      {
        icon: "projects",
        value: site.projectsDelivered,
        label: "Projects Delivered",
      },
      {
        icon: "areas",
        value: `${localAreas.length}`,
        label: "Service Areas",
      },
      {
        icon: "licence",
        value: site.licence.authority,
        label: "Licensed Builder",
      },
    ],
  },
  values: {
    eyebrow: "Our Values",
    heading: "The Principles That Guide Everything We Do",
    lead: "Four commitments that hold on every project, whatever its size or budget.",
    items: [
      {
        index: "01",
        icon: "transparency",
        title: "Transparency",
        body: "Upfront pricing with no hidden costs. You know exactly what you're investing from day one.",
      },
      {
        index: "02",
        icon: "detail",
        title: "Attention to Detail",
        body: "The finest details matter. Our team builds to the highest quality standards on every project.",
      },
      {
        index: "03",
        icon: "client",
        title: "Client First",
        body: "We listen first, advise second. Your vision and goals are always at the centre of what we do.",
      },
      {
        index: "04",
        icon: "excellence",
        title: "Excellence",
        body: "Driven to deliver superior customer service and quality craftsmanship, every single time.",
      },
    ],
  },
  /** The navy band. The stages themselves are read from `process.ts`. */
  approach: {
    eyebrow: "Our Approach",
    heading: "A Seamless Building Experience From Start to Finish",
    lead: "Our proven process keeps your project managed with precision, professionalism, and care at every step.",
    link: { label: "Our Process", href: "/process" },
  },
  build: {
    eyebrow: "What We Build",
    heading: "Quality Homes. Exceptional Spaces.",
    lead: "We build a wide range of residential and commercial projects, each tailored to our clients' needs and built to the highest standards.",
    link: { label: "View our services", href: "/residential" },
    items: [
      {
        title: "Custom Homes",
        href: "/residential#custom-homes",
        src: "/projects/14-verona-st-pallara/hero.webp",
        alt: "Aurelia Residence, Pallara",
      },
      {
        title: "Duplexes & Granny Flats",
        href: "/residential#granny-flats",
        src: "/projects/18-skye-court-bahrs-scrub/hero.webp",
        alt: "Skye Court Residence, Bahrs Scrub",
      },
      {
        title: "Renovations",
        href: "/residential#renovations",
        src: "/projects/25-langford-st/gallery-03.webp",
        alt: "Solstice Residence, Eight Mile Plains",
      },
      {
        title: "Commercial",
        href: "/commercial",
        src: "/projects/3-stanley-st-mount-gravatt/hero.webp",
        alt: "Halcyon Residence, Mount Gravatt",
      },
    ],
  },
  whyArc: {
    eyebrow: "Why Clients Choose ARC",
    heading: "More Than Builders. Your Project Partners.",
    body: "We don't just construct buildings; we build trust and long-term relationships. Clients choose us for our commitment to quality, communication, and results that exceed expectations.",
    items: [
      {
        icon: "tailored",
        title: "Tailored Solutions",
        body: "Every plan is customised to suit your site, your lifestyle and your budget — never a set design.",
      },
      {
        icon: "communication",
        title: "Clear Communication",
        body: "Regular updates and site meetings keep you informed and involved through the whole build.",
      },
      {
        icon: "onTime",
        title: "On-Time Delivery",
        body: "A programme you can plan around, managed by trades who have worked together for years.",
      },
      {
        icon: "local",
        title: "Local Expertise",
        body: "Brisbane locals — we know the suburbs, the soil, and what each council will ask for.",
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
  eyebrow: "Our Portfolio",
  heading: "Spaces Built for Life.",
  lead: "Explore our portfolio of residential and commercial projects across Queensland. Each one crafted with precision, passion, and purpose.",
  heroImage: "/projects/14-verona-st-pallara/hero.webp",
  allFilterLabel: "All Projects",
  /** The showcase carousel. Every one of these is either read on the page or
   *  announced to a screen reader, so all of it is copy, not decoration. */
  featured: {
    eyebrow: "Featured Project",
    viewAll: "View all projects",
    previous: "Previous project",
    next: "Next project",
    /** Prefixes a project title on the peek cards and the progress dashes. */
    show: "Show",
  },
  index: {
    heading: "All Projects",
    sort: {
      label: "Sort by:",
      latest: "Latest",
      oldest: "Oldest",
      title: "A–Z",
    },
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
    images: ["/process/hero.webp"],
  } satisfies PageSeo,
  eyebrow: "Our Building Process",
  heading: "A Seamless Journey From Start to Finish",
  lead: "We take pride in delivering a smooth, transparent, and stress-free building experience. Here's how we bring your vision to life.",
  heroImage: "/process/hero.webp",
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
  /** Split so the hero can set the closing word in the accent blue. */
  heading: { lead: "Let’s Build Something", accent: "Extraordinary" },
  /** The plain string the H1 reads as, for anything that needs one. */
  headingPlain: "Let’s Build Something Extraordinary",
  lead: "Whether you’re planning your dream home or a commercial development, we’re here to bring your vision to life.",
  heroImage: "/projects/49-herbert-st/hero.webp",
  /** The three quick channels carried on the hero plate. */
  heroChannels: {
    phone: "Call Us",
    email: "Email Us",
    hours: "Business Hours",
  },
  infoEyebrow: "Contact Information",
  infoHeading: "We’d Love to Hear From You",
  labels: {
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Business Hours",
  },
  /** The chat row under the schedule. Its number and link live in `site.ts`. */
  whatsapp: "Message us on WhatsApp",
  /** The lit panel that closes the details rail. */
  consultation: {
    heading: "Book a Free Consultation",
    body: "Let’s discuss your project and explore the possibilities.",
    /** An anchor, not a link: the enquiry form is already on this page. */
    action: { label: "Book a consultation", href: "#enquiry" },
  },
  form: {
    eyebrow: "Send Us a Message",
    heading: "Project Enquiry",
    lead: "Have a question or ready to start your project? Fill out the form and we’ll get back to you shortly.",
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
  /**
   * The reassurance band under the form. Each `icon` names a drawing in
   * `components/ui/icon.tsx`, so this file stays free of JSX.
   */
  why: {
    eyebrow: "Why Choose ARC Builders?",
    heading: "Built on Experience. Driven by Integrity.",
    items: [
      {
        icon: "shield",
        title: "Experienced & Trusted",
        body: `${site.experience} years of industry experience delivering high-quality construction with integrity.`,
      },
      {
        icon: "draft",
        title: "Custom Solutions",
        body: "Tailored designs and solutions that are unique to your vision and needs.",
      },
      {
        icon: "craft",
        title: "Quality Craftsmanship",
        body: "We take pride in our attention to detail and premium finishes.",
      },
      {
        icon: "schedule",
        title: "On-Time & On-Budget",
        body: "Committed to delivering your project on time and within budget.",
      },
      {
        icon: "client",
        title: "Client Focused",
        body: "Clear communication, transparency, and your satisfaction every step of the way.",
      },
    ],
  },
  location: {
    eyebrow: "Our Location",
    heading: "Visit Our Office",
    lead: "We’re based in Eight Mile Plains and proudly service Brisbane and surrounding areas.",
    action: "Get Directions",
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
