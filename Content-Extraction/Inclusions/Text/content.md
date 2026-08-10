# Inclusions

- Route: `/inclusions`
- Page title: Client Project Selections | ARC Builders
- Meta description: Private ARC Builders project selections shared after enquiry review.
- Canonical URL: https://arcbuilders.com.au/inclusions
- Meta keywords: custom home builder Brisbane,builder Logan,custom home builder Rochedale,custom home builder South East Queensland,home builder South East Queensland,Indian Australian home builder,multi-generational home builder,duplex builder Queensland,transparent pricing builder,residential and commercial builder Brisbane,ARC Builders,private project selections,client build selections,arc builders client link

## Rendered Content

## Client Project Selections

This private page is shared after enquiry review so clients can confirm project selections clearly before consultant follow-up.

Business Safe

Compliance-critical items are always locked and cannot be removed.

Selection Clarity

Allowance and optional inclusion pathways stay visible so the consultant review is faster and cleaner.

Consultant-Led Pricing

Base pricing is shown where approved. Final upgrade and tailored pricing is confirmed in meeting or on call.

### Project Setup

These project details personalize your inclusion schedule and support consultant review, lead tracking, and proposal handover.

How To Use

Complete project details, choose build type and package, then set each allowance row to Standard or Include. Locked rows are mandatory and cannot be removed, and final pricing is reviewed with your consultant.

Customer Name

Email

Phone

Build Suburb

Build Type

Single Storey

Double Storey

Custom

Essential Living base pricing is available for approved single and double storey builds. Signature, Luxury, and fully custom pricing is confirmed after consultant review.

Package

Essential Living Practical and efficient inclusions for value-focused builds. $284,000 · Base price - 180 sqm

Signature Family Balanced package with higher-spec finishes and consultant-led pricing. Pricing shared with consultant after scope review

Luxury Statement Design-led premium package with pricing finalised after scope review. Pricing shared with consultant after scope review

### Plans, Compliance and Warranty

Standard

Upgrade

### Site Works and Preparation

Include

### Slab, Framing and External Envelope

### Interior Finishes, Kitchen and Wet Areas

### Electrical, Plumbing and Comfort

### Explicit Exclusions

The following remain outside the standard contract sum unless separately quoted and approved.

- Landscaping, fencing, letterbox, clothesline and loose furniture.
- Pool works and associated engineering unless quoted separately.
- Council/authority escalations and latent site conditions.
- Rock excavation and abnormal ground treatments.
- Custom fixtures or branded products outside approved ranges.
#### Pricing and Selection Snapshot

Base pricing is shown only where approved. Final selections and pricing are confirmed with your consultant.

Selected pricing guide

Single Storey Essential Living

Base price - 180 sqm

$284,000

Official base pricing

- Single Storey Essential Living Base price - 180 sqm $284,000
- Double Storey Essential Living Base price - 220 sqm $436,000
- - Signature Family and Luxury Statement pricing is shared after consultant review.
- - Additional inclusions and upgrade selections are priced during your consultant meeting or call.
- - Custom homes are fully tailored and priced after design consultation.
Selections for consultant review

No additional selections marked yet.

I understand this is a preliminary inclusion schedule.

I understand final pricing and selections are confirmed with my consultant and written tender.

Download Inclusion Summary

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
- **placeholder:** Full name
- **placeholder:** name@example.com
- **placeholder:** Phone number
- **placeholder:** Suburb
- **aria-label:** Back to top
- **aria-label:** Chat on WhatsApp

## Conditional and Source-Defined Content

These strings are defined in the traced page/component/data source graph and may appear after interaction, in responsive UI, in generated documents, or in metadata.

### src/app/api/inclusions/pdf/route.ts

- next/server
- @react-pdf/renderer
- @/lib/pdf/InclusionPdfDocument
- Invalid request payload
- Content-Type
- application/pdf
- Content-Disposition
- attachment; filename=arc-inclusion-sheet.pdf
- Cache-Control
- PDF generation error
- Failed to generate PDF
### src/app/inclusions/layout.tsx

- @/lib/seo
- Client Project Selections
- Private ARC Builders project selections shared after enquiry review.
- /inclusions
- private project selections
- client build selections
- arc builders client link
- /hero.webp
### src/app/inclusions/page.tsx

- next/link
- @/components/Navbar
- @/components/Footer
- @/lib/inclusions
- en-AU
- , email:
- , phone:
- , suburb:
- , buildType:
- , packageId:
- ); return; } setIsGenerating(true); setStatusMessage(null); const response = await fetch(
- , { method:
- , headers: {
- }, body: JSON.stringify({ ...form, selectedPackage: summary.selectedPackage, decisions: summary.decisions, selectedUpgrades: summary.selectedUpgrades, buildTypeAdjustment: summary.buildTypeAdjustment, upgradesTotal: summary.upgradesTotal, estimatedTotal: summary.estimatedTotal, generatedAt: new Date().toISOString(), }), }); if (!response.ok) { throw new Error(
- ); } const blob = await response.blob(); const blobUrl = URL.createObjectURL(blob); const anchor = document.createElement(
- ); const safeName = (form.customerName ||
- ) .toLowerCase() .replace(/[^a-z0-9]+/g,
- ) .replace(/(^-|-$)/g,
- }.pdf`; document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(blobUrl); setStatusMessage(
- ); } catch (error) { console.error(error); setStatusMessage(
- ); } finally { setIsGenerating(false); } } return ( <main> <Navbar /> <section className=
- > <div className=
- > <div className=
- > <span className=
- > Official Document </span> <span className=
- >Version 2.1</span> </div> <h1 className=
- > Client Project <span className=
- >Selections</span> </h1> <p className=
- > This private page is shared after enquiry review so clients can confirm project selections clearly before consultant follow-up. </p> <div className=
- > <div> <p className=
- >Business Safe</p> <p className=
- >Compliance-critical items are always locked and cannot be removed.</p> </div> <div> <p className=
- >Selection Clarity</p> <p className=
- >Allowance and optional inclusion pathways stay visible so the consultant review is faster and cleaner.</p> </div> <div> <p className=
- >Consultant-Led Pricing</p> <p className=
- >Base pricing is shown where approved. Final upgrade and tailored pricing is confirmed in meeting or on call.</p> </div> </div> </div> </section> <section className=
- > <section className=
- > <h2 className=
- >Project Setup</h2> <p className=
- > These project details personalize your inclusion schedule and support consultant review, lead tracking, and proposal handover. </p> <div className=
- > <p className=
- >How To Use</p> <p className=
- > Complete project details, choose build type and package, then set each allowance row to Standard or Include. Locked rows are mandatory and cannot be removed, and final pricing is reviewed with your consultant. </p> </div> <div className=
- > <label className=
- > <span className=
- className=
- /> </label> <label className=
- >Email</span> <input type=
- >Phone</span> <input type=
- /> </label> </div> <div className=
- > <div> <p className=
- >Build Type</p> <div className=
- > {([ { label:
- , value:
- }, { label:
- }`} > {item.label} </button> ))} </div> <p className=
- > Essential Living base pricing is available for approved single and double storey builds. Signature, Luxury, and fully custom pricing is confirmed after consultant review. </p> </div> <div> <p className=
- >Package</p> <div className=
- }`} > <p className=
- >{pkg.name}</p> <p className=
- >{pkg.description}</p> {pkg.id === form.packageId ? ( <p className=
- ? ( <p className=
- >Base pricing available for single and double storey builds</p> ) : ( <p className=
- > <h2 className=
- >{section.title}</h2> <div className=
- > <table className=
- > <thead> <tr className=
- > <th className=
- >Item</th> <th className=
- >Status</th> <th className=
- >Allowance</th> <th className=
- >Upgrade Option</th> <th className=
- >Notes</th> <th className=
- > <td className=
- >{row.item}</td> <td className=
- >{row.allowance}</td> <td className=
- >{row.upgradeOption}</td> <td className=
- >{row.notes}</td> <td className=
- > {row.selectionMode ===
- ? ( <span className=
- >Locked</span> ) : row.selectionMode ===
- ? ( <div className=
- > <button type=
- }`} > Standard </button> <button type=
- }`} > Upgrade </button> </div> ) : ( <button type=
- }`} > {currentDecision.status ===
- } </button> )} </td> </tr> ); })} </tbody> </table> </div> </section> ))} <section className=
- >Explicit Exclusions</h2> <p className=
- > The following remain outside the standard contract sum unless separately quoted and approved. </p> <ul className=
- > <span className=
- /> <span>{item}</span> </li> ))} </ul> </section> </div> <aside className=
- > <div className=
- > <h3 className=
- >Pricing and Selection Snapshot</h3> <p className=
- >Base pricing is shown only where approved. Final selections and pricing are confirmed with your consultant.</p> <div className=
- > <div className=
- >Package</span> <span className=
- >{summary.selectedPackage.name}</span> </div> <div className=
- >Build type</span> <span className=
- >{form.buildType ===
- : form.buildType ===
- }</span> </div> </div> <div className=
- >Selected pricing guide</p> <p className=
- >{pricingGuide.label}</p> <p className=
- >{pricingGuide.detail}</p> {pricingGuide.amount ? ( <p className=
- >{currency.format(pricingGuide.amount)}</p> ) : ( <p className=
- >Discuss pricing with consultant</p> )} </div> <div className=
- >Official base pricing</p> <ul className=
- > <div> <span className=
- >{item.label}</span> <span className=
- >{item.detail}</span> </div> <span className=
- >{currency.format(item.amount)}</span> </li> ))} </ul> <ul className=
- > - {note} </li> ))} </ul> </div> <div className=
- >Selections for consultant review</p> {summary.selectedUpgrades.length ? ( <ul className=
- > <span className=
- >{item.item}</span> <span className=
- >{item.sectionTitle}</span> </li> ))} </ul> ) : ( <p className=
- >No additional selections marked yet.</p> )} </div> <div className=
- type=
- /> I understand this is a preliminary inclusion schedule. </label> <label className=
- /> I understand final pricing and selections are confirmed with my consultant and written tender. </label> </div> {statusMessage && ( <p className=
- > {statusMessage} </p> )} <div className=
- > <button type=
- disabled={isGenerating || !isFormReady()} onClick={generatePdf} className=
- > {isGenerating ?
- } </button> <Link href=
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
### src/components/WhatsAppButton.tsx

- https://wa.me/61411878438?text=Hi%20ARC%20Builders%2C%20I%27m%20interested%20in%20discussing%20a%20project.
- noopener noreferrer
- Chat on WhatsApp
- currentColor
### src/lib/inclusions.ts

- Single Storey
- Double Storey
- Complete Custom
- Single Storey Essential Living
- Base price - 180 sqm
- Double Storey Essential Living
- Base price - 220 sqm
- Custom Build
- Complete custom pricing is prepared after your consultant meeting.
- Signature Family
- Luxury Statement
- Pricing is finalised with your consultant after scope review.
- Signature Family and Luxury Statement pricing is shared after consultant review.
- Additional inclusions and upgrade selections are priced during your consultant meeting or call.
- Custom homes are fully tailored and priced after design consultation.
- Included
- Allowance
- Upgrade
- Excluded
- Essential Living
- Practical and efficient inclusions for value-focused builds.
- Engineer-certified slab and structural framing
- Builder range finishes with compliant specification
- Core kitchen, wet area and electrical fit-off
- NCC and energy compliance baseline
- Balanced package with higher-spec finishes and consultant-led pricing.
- Upgraded cabinetry and kitchen specification
- Enhanced electrical and comfort selections
- Improved facade and finish options
- Most popular package for family builds
- Design-led premium package with pricing finalised after scope review.
- High-spec kitchen and bathroom inclusions
- Premium facade and internal finish pathways
- Advanced comfort and smart-home readiness
- Expanded designer selection options
- Plans, Compliance and Warranty
- Engineer certified frame and trusses
- , upgradeOption:
- , notes:
- , }, { item:
- , baseStatus:
- , selectionMode:
- , allowance:
- , upgradeCost: 4500, }, ], }, { id:
- , title:
- , rows: [ { item:
- , upgradeCost: 3200, }, { item:
- , upgradeCost: 7800, }, ], }, { id:
- , upgradeCost: 2800, }, { item:
- , upgradeCost: 5400, }, ], }, { id:
- , upgradeCost: 3600, }, { item:
- , upgradeCost: 4200, }, { item:
- , upgradeCost: 4800, }, { item:
- , upgradeCost: 5200, }, ], }, { id:
- , upgradeCost: 2900, }, { item:
- , upgradeCost: 2600, }, ], }, ]; export const explicitExclusions = [
- ) { selections[key] = row.baseStatus ===
- ; } else if (row.selectionMode ===
- ) { selections[key] =
- ; } else { selections[key] =
- ; } }); }); return selections; } export function buildInclusionSummary( packageId: InclusionPackage[
- ; let costImpact = 0; if (row.selectionMode ===
- ) { status = row.baseStatus; selectedLabel =
- ) { if (choice ===
- ) { status =
- ; selectedLabel =
- ; costImpact = row.upgradeCost || 0; } else { status =
- ; } } else { if (choice ===
### src/lib/pdf/InclusionPdfDocument.tsx

- @react-pdf/renderer
- @/lib/inclusions
- @/lib/data
- Helvetica
- #1a1a1a
- #c6a87d
- #e4e4e4
- #2f2f2f
- #e1e1e1
- #ececec
- #ecf4ee
- #cde2d2
- #f6efe5
- #6b5330
- #f2ecff
- #dbcefb
- #4d2d80
- #ffe9e9
- #f8cfcf
- #8b2020
- en-AU
- Prospective Customer
- N/A
- Custom

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
