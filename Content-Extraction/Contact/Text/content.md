# Contact

- Route: `/contact`
- Page title: Contact ARC Builders | ARC Builders
- Meta description: Contact ARC Builders for custom homes, renovations, and commercial projects in Brisbane, Logan, Rochedale, and South East Queensland.
- Canonical URL: https://arcbuilders.com.au/contact
- Meta keywords: custom home builder Brisbane,builder Logan,custom home builder Rochedale,custom home builder South East Queensland,home builder South East Queensland,Indian Australian home builder,multi-generational home builder,duplex builder Queensland,transparent pricing builder,residential and commercial builder Brisbane,ARC Builders,contact home builder Brisbane,get construction quote,custom home consultation

## Rendered Content

Get In Touch

## Start Your Project

Ready to build? Contact us for an obligation-free consultation and quote.

### Contact Information

Address

8 Clunies Ross Court, Eight Mile Plains QLD 4113

Phone

Email

#### Project Enquiry

Full Name *

Email Address *

Phone Number

Project Type *

Select project type

Custom Home

Vastu-Compliant Home

Multi-Generational Home

Renovation

Extension

Granny Flat / Duplex

Commercial Fitout

Medical Centre

Childcare Centre

Other

Budget Range

Select budget range

Under $200K

$200K – $500K

$500K – $1M

$1M – $2M

$2M+

Not Sure Yet

Tell Us About Your Project *

Send Enquiry

This form opens your default email app so you can review and send your enquiry details directly. Private project selections are shared after enquiry review.

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
- **placeholder:** John Smith
- **placeholder:** john@email.com
- **placeholder:** 0400 000 000
- **value:** Custom Home
- **value:** Vastu-Compliant Home
- **value:** Multi-Generational Home
- **value:** Renovation
- **value:** Extension
- **value:** Granny Flat / Duplex
- **value:** Commercial Fitout
- **value:** Medical Centre
- **value:** Childcare Centre
- **value:** Other
- **value:** Under $200K
- **value:** $200K – $500K
- **value:** $500K – $1M
- **value:** $1M – $2M
- **value:** $2M+
- **value:** Not Sure Yet
- **placeholder:** Describe your project, location, timeline, and any other details...
- **aria-label:** Back to top
- **aria-label:** Chat on WhatsApp

## Conditional and Source-Defined Content

These strings are defined in the traced page/component/data source graph and may appear after interaction, in responsive UI, in generated documents, or in metadata.

### src/app/contact/layout.tsx

- @/lib/seo
- Contact ARC Builders
- Contact ARC Builders for custom homes, renovations, and commercial projects in Brisbane, Logan, Rochedale, and South East Queensland.
- /contact
- contact home builder Brisbane
- get construction quote
- custom home consultation
- /projects/49-herbert-st/hero.webp
### src/app/contact/page.tsx

- @/components/Navbar
- @/components/Footer
- @/components/ScrollReveal
- @/lib/data
- @/lib/analytics
- Custom Home
- Vastu-Compliant Home
- Multi-Generational Home
- Renovation
- Extension
- Granny Flat / Duplex
- Commercial Fitout
- Medical Centre
- Childcare Centre
- Other
- Under $200K
- $200K – $500K
- $500K – $1M
- $1M – $2M
- $2M+
- Not Sure Yet
- ); const [formData, setFormData] = useState({ fullName:
- , email:
- , phone:
- , projectType:
- , budgetRange:
- , message:
- , formData.message, ].join(
- , { project_type: formData.projectType ||
- , budget_range: formData.budgetRange ||
- , }); setSubmitted(true); }; return ( <main> <Navbar /> {} <section className=
- > <div className=
- style={{ backgroundImage:
- , }} /> <div className=
- /> <div className=
- > <p className=
- > Get In Touch </p> <h1 className=
- > Start Your <span className=
- >Project</span> </h1> <p className=
- > Ready to build? Contact us for an obligation-free consultation and quote. </p> </div> </section> {} <section className=
- > <div className=
- > <div className=
- > {} <div className=
- > <ScrollReveal variant=
- > <h2 className=
- > Contact <span className=
- >Information</span> </h2> <div className=
- /> <div className=
- > <div className=
- > <div className=
- > <MapPin size={18} /> </div> <div> <p className=
- > Address </p> <p className=
- > {companyInfo.address} </p> </div> </div> <div className=
- > <Phone size={18} /> </div> <div> <p className=
- data-gtm-source=
- className=
- > {companyInfo.phone} </a> </div> </div> <div className=
- > <Mail size={18} /> </div> <div> <p className=
- > {companyInfo.email} </a> </div> </div> </div> {} <div className=
- > <iframe src=
- width=
- height=
- style={{ border: 0 }} allowFullScreen loading=
- referrerPolicy=
- title=
- /> </div> </ScrollReveal> </div> {} <div className=
- > {submitted ? ( <div className=
- > <CheckCircle size={48} className=
- /> <h3 className=
- > Enquiry Ready To Send </h3> <p className=
- > Your project details are prepared. Click below to open your default email app with a pre-filled enquiry draft. </p> <p className=
- > Once we receive your enquiry, our team can send your private project selections link to this email address. If your email app did not open, send us a message at {companyInfo.email} or call {companyInfo.phone}. </p> <a href={mailtoLink} data-gtm-event=
- ); setFormData({ fullName:
- , email:
- , phone:
- , projectType:
- , budgetRange:
- , message:
- , }); }} className=
- > Submit Another Enquiry </button> </div> ) : ( <form onSubmit={handleSubmit} className=
- > <h3 className=
- > Project <span className=
- >Enquiry</span> </h3> <div className=
- /> <div className=
- > {} <div className=
- > <div> <label className=
- > Full Name * </label> <input type=
- required value={formData.fullName} onChange={updateField(
- )} className=
- placeholder=
- /> </div> <div> <label className=
- > Email Address * </label> <input type=
- required value={formData.email} onChange={updateField(
- /> </div> </div> {} <div> <label className=
- > Phone Number </label> <input type=
- value={formData.phone} onChange={updateField(
- )} className=
- /> </div> {} <div> <label className=
- > Project Type * </label> <select required value={formData.projectType} onChange={updateField(
- > <option value=
- > Budget Range </label> <select value={formData.budgetRange} onChange={updateField(
- > Tell Us About Your Project * </label> <textarea required rows={4} value={formData.message} onChange={updateField(
- /> </div> {} <button type=
- > <span className=
- > Send Enquiry </span> <Send size={14} className=
- /> <div className=
- /> </button> <p className=
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
- CheckCircle (Lucide React)
- Facebook (Lucide React)
- Instagram (Lucide React)
- Linkedin (Lucide React)
- Mail (Lucide React)
- MapPin (Lucide React)
- Menu (Lucide React)
- Phone (Lucide React)
- Send (Lucide React)
- ShieldCheck (Lucide React)
- X (Lucide React)
- Youtube (Lucide React)
