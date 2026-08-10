# Projects

- Route: `/projects`
- Page title: Project Portfolio | ARC Builders
- Meta description: Browse ARC Builders project portfolio featuring custom homes and quality builds delivered across Brisbane, Logan, Rochedale, and South East Queensland.
- Canonical URL: https://arcbuilders.com.au/projects
- Meta keywords: custom home builder Brisbane,builder Logan,custom home builder Rochedale,custom home builder South East Queensland,home builder South East Queensland,Indian Australian home builder,multi-generational home builder,duplex builder Queensland,transparent pricing builder,residential and commercial builder Brisbane,ARC Builders,builder portfolio Brisbane,custom home projects,completed homes Queensland

## Rendered Content

Portfolio

## Our Projects

Explore our portfolio of residential and commercial builds across Queensland.

All Projects

Custom

#### Aurelia Residence

Pallara, QLD

#### Solstice Residence

Eight Mile Plains, QLD

#### Lumiere Residence

Camp Hill, QLD

#### Evercrest Residence

Spring Mountain, QLD

#### Willowmere Residence

Kingston, QLD

#### Halcyon Residence

Mount Gravatt, QLD

#### Elmsworth Residence

Calamvale, QLD

#### Oakmont Residence

Greenbank, QLD

#### Celeste Residence

Brisbane, QLD

#### Ormskirk Residence

#### Binnalong Residence

Rochedale South, QLD

#### Skye Court Residence

Bahrs Scrub, QLD

Custom Homes Designed for Modern Families - Trusted Builders in Brisbane & South East Queensland.

##### Navigation

- Home
- Projects
- Locations
- Process
- About
- Blog
- Contact
##### Services

- Custom Homes
- Renovations
- Extensions
- Granny Flats
- Shop Fitouts
- Medical Centres
##### Contact

- 8 Clunies Ross Court, Eight Mile Plains QLD 4113
- 0411 878 438
- admin@arcbuilders.com.au
QBCC Licensed Builder

15090326

##### Service Areas

- Brisbane Southside
- Logan
- Rochedale
- Calamvale
- Pallara
- Greenbank
- View All Areas
© 2026 Aesthetic Residential and Commercial Builders . All rights reserved.

QBCC Licence: 15090326

## Labels, Alt Text, Placeholders, and Accessibility Text

- **alt:** ARC Builders
- **aria-label:** Open navigation menu
- **alt:** Aurelia Residence
- **alt:** Solstice Residence
- **alt:** Lumiere Residence
- **alt:** Evercrest Residence
- **alt:** Willowmere Residence
- **alt:** Halcyon Residence
- **alt:** Elmsworth Residence
- **alt:** Oakmont Residence
- **alt:** Celeste Residence
- **alt:** Ormskirk Residence
- **alt:** Binnalong Residence
- **alt:** Skye Court Residence
- **aria-label:** Back to top
- **aria-label:** Chat on WhatsApp

## Conditional and Source-Defined Content

These strings are defined in the traced page/component/data source graph and may appear after interaction, in responsive UI, in generated documents, or in metadata.

### src/app/layout.tsx

- next/script
- next/font/google
- ./globals.css
- @/components/AnalyticsEvents
- @/components/WhatsAppButton
- @/lib/data
- @/lib/seo
- @/lib/site-state
- ARC Builders | Custom Home Builder in Brisbane & South East Queensland
- %s | ARC Builders
- Construction
- , }, manifest:
- , openGraph: { title:
- , description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, locale: siteConfig.locale, type:
- , images: [absoluteUrl(
- )], }, twitter: { card:
- , title:
- , description: siteConfig.description, images: [absoluteUrl(
- )], }, robots: { index: true, follow: true, googleBot: { index: true, follow: true,
- : -1, }, }, icons: { icon: [ { url:
- , type:
- , sizes:
- }, { url:
- }, ], apple:
- ); const basePhone = companyInfo.phone.replace(/\s+/g,
- , itemOffered: {
- , name: service.title, description: service.description, provider: {
- , name:
- , value: companyInfo.qbccLicence, }, address: {
- , streetAddress: companyInfo.streetAddress, addressLocality: companyInfo.suburb, addressRegion:
- , postalCode: companyInfo.postcode, addressCountry:
- , }, areaServed: siteConfig.serviceAreas, image: absoluteUrl(
- ), logo: absoluteUrl(
- ), contactPoint: {
- , contactType:
- , telephone: formattedPhone, email: companyInfo.email, areaServed:
- , availableLanguage: [
- ], }, knowsAbout: [
- , ], hasOfferCatalog: {
- , itemListElement: serviceOffers, }, ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}), }; const websiteSchema = {
- className=
- strategy=
- width=
- style={{ display:
- , visibility:
- }} /> </noscript> </> )} <div className=
- > {children} </div> {!maintenanceModeEnabled && <AnalyticsEvents />} {!maintenanceModeEnabled && <WhatsAppButton />} {!maintenanceModeEnabled && ( <script type=
### src/app/projects/layout.tsx

- @/lib/seo
- Project Portfolio
- Browse ARC Builders project portfolio featuring custom homes and quality builds delivered across Brisbane, Logan, Rochedale, and South East Queensland.
- /projects
- builder portfolio Brisbane
- custom home projects
- completed homes Queensland
- /projects/14-verona-st-pallara/hero.webp
### src/app/projects/page.tsx

- next/link
- next/image
- @/components/Navbar
- @/components/Footer
- @/components/ScrollReveal
- @/lib/data
- Custom
- Renovations
- Extensions
- Duplex
- Commercial
- All Projects
- ), value: type, })), ]; const [activeFilter, setActiveFilter] = useState(
- ); const filtered = activeFilter ===
- > <div className=
- style={{ backgroundImage:
- , }} /> <div className=
- /> <div className=
- > <p className=
- > Portfolio </p> <h1 className=
- > Our <span className=
- >Projects</span> </h1> <p className=
- > Explore our portfolio of residential and commercial builds across Queensland. </p> </div> </section> {} <section className=
- > <div className=
- > {} <div className=
- }`} > {f.label} </button> ))} </div> {} {filtered.length > 0 ? ( <div className=
- > <div className=
- > <Image src={project.heroImage} alt={project.title} fill className=
- sizes=
- /> <div className=
- > <h3 className=
- > {project.title} </h3> <p className=
- > {project.location} </p> <div className=
- /> </div> </div> </Link> </ScrollReveal> ))} </div> ) : ( <div className=
- > <h3 className=
- >No projects in this category yet</h3> <p className=
- > We are currently curating projects in this segment. Reach out to discuss a similar build and we can share relevant case studies. </p> <Link href=
- className=
### src/components/AnalyticsEvents.tsx

- @/lib/analytics
- [data-gtm-event]
### src/components/Footer.tsx

- next/link
- next/image
- @/lib/data
- @/lib/local-areas
- ); const footerServices: Array<{ label: string; href?: string }> = [ { label:
- , href:
- }, { label:
- ].includes(area.slug) ); return ( <footer className=
- > {} <div className=
- /> <div className=
- > <div className=
- > {} <div className=
- > <Link href=
- className=
- > <Image src=
- alt=
- width={500} height={189} className=
- unoptimized /> </Link> <p className=
- > {companyInfo.tagline} </p> {validSocialLinks.length > 0 && ( <div className=
- rel=
- data-gtm-event=
- data-gtm-source=
- > <Icon size={15} /> </a> ))} </div> )} </div> {} <div> <h4 className=
- > Navigation </h4> <ul className=
- > {link.label} </Link> </li> ))} </ul> </div> {} <div> <h4 className=
- > Services </h4> <ul className=
- > {service.label} </Link> ) : ( <span className=
- >{service.label}</span> )} </li> ))} </ul> </div> {} <div> <h4 className=
- > Contact </h4> <ul className=
- > <li className=
- > <MapPin size={16} className=
- /> <span className=
- >{companyInfo.address}</span> </li> <li className=
- > <Phone size={16} className=
- > {companyInfo.phone} </a> </li> <li className=
- > <Mail size={16} className=
- > {companyInfo.email} </a> </li> </ul> {} <div className=
- > <div className=
- > <ShieldCheck size={24} className=
- /> <div> <p className=
- > QBCC Licensed Builder </p> <p className=
- > {companyInfo.qbccLicence} </p> </div> </div> </div> </div> {} <div> <h4 className=
- > Service Areas </h4> <ul className=
- > {area.name} </Link> </li> ))} <li> <Link href=
- > View All Areas </Link> </li> </ul> </div> </div> {} <div className=
- > <div className=
- > <p className=
- > © {new Date().getFullYear()} {companyInfo.fullName}. All rights reserved. </p> <span className=
- >|</span> <p className=
- > QBCC Licence: <span className=
- })} aria-label=
### src/components/Navbar.tsx

- next/link
- next/image
- @/lib/utils
- @/lib/data
- className=
- > <Image src=
- alt=
- width={500} height={189} className={cn(
- , scrolled ?
- )} priority unoptimized /> </Link> {} <nav className=
- > {link.label} <span className=
- /> </Link> ))} </nav> {} <div className=
- > <Link href=
- data-gtm-event=
- data-gtm-source=
- aria-label={mobileOpen ?
- } aria-expanded={mobileOpen} aria-controls=
- > {mobileOpen ? <X size={24} /> : <Menu size={24} />} </button> </div> </header> {} <AnimatePresence> {mobileOpen && ( <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} id=
- > {link.label} </Link> </motion.div> ))} <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} > <Link href=
### src/components/ScrollReveal.tsx

- fadeUp
- fadeDown
- fadeLeft
- fadeRight
- fadeIn
- scaleIn
- , once = true, }: ScrollRevealProps) { const ref = useRef(null); const isInView = useInView(ref, { once, margin:
- ); } }, [isInView, controls]); return ( <motion.div ref={ref} initial=
### src/components/WhatsAppButton.tsx

- https://wa.me/61411878438?text=Hi%20ARC%20Builders%2C%20I%27m%20interested%20in%20discussing%20a%20project.
- noopener noreferrer
- Chat on WhatsApp
- currentColor

## Code-Defined Icons

- ArrowUp (Lucide React)
- Facebook (Lucide React)
- Instagram (Lucide React)
- Linkedin (Lucide React)
- Mail (Lucide React)
- MapPin (Lucide React)
- Menu (Lucide React)
- Phone (Lucide React)
- ShieldCheck (Lucide React)
- X (Lucide React)
- Youtube (Lucide React)
