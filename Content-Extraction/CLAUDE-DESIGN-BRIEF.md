# Claude Design Brief: ARC Builders Website

## Objective

Design a completely new website for ARC Builders using the brand logo as the only source of visual direction.

Use the extracted content library for factual copy, project information, contact details, and original media. Do not use the existing website as a design reference.

## Primary Brand Reference

Use this logo:

`Content-Extraction/Global/Logos/arc-logo.svg`

The logo contains:

- A strong architectural `ARC` wordmark.
- An `A` shaped like a roof or structural frame.
- A four-pane window detail.
- Deep navy: `#001D44`.
- Clear blue: `#00388E`.
- Precise geometry, broad letterforms, and substantial visual weight.

The identity should feel:

- Architecturally precise.
- Established and dependable.
- Contemporary without appearing fashionable or temporary.
- Premium but approachable.
- Calm, capable, and transparent.

## Independence Requirement

Create an original design system from the logo itself.

Do not:

- Reproduce or reinterpret the existing website layout.
- Inspect existing site screenshots for design inspiration.
- Copy its typography, spacing, section order, cards, buttons, navigation, effects, or color application.
- Treat current CSS or component styling as a design reference.
- Assume that an existing design choice must be retained.

Files under `Content-Extraction/` may be used for content and original media only. Their folder structure does not prescribe the new information architecture or layout.

## Audience

The primary audience includes:

- Families planning a custom home.
- Homeowners considering renovations or extensions.
- Multi-generational households.
- Property owners evaluating duplex or residential opportunities.
- Businesses planning commercial construction or fitouts.
- Clients across Brisbane, Logan, and South East Queensland.

Users need to quickly understand capability, quality, process, service area, project relevance, and how to start a conversation.

## Creative Direction

Build the visual language around structural clarity.

Use:

- A disciplined grid with strong alignment.
- Generous but controlled whitespace.
- Confident horizontal and vertical rules inspired by construction drawings.
- Occasional roofline, frame, or window-grid proportions derived from the logo.
- Deep navy for authority and navigation.
- Clear blue for focused interaction, selection, and important details.
- White and restrained cool neutrals for open space.
- A limited supporting accent only when it improves hierarchy or status communication.
- Real project photography as the dominant visual material.

Do not overuse the roof or window motif. It should influence proportion and composition, not become repeated decoration.

Avoid:

- Generic luxury-builder styling.
- Gold, black, and marble as shorthand for premium quality.
- Beige-dominated palettes.
- Blue gradients.
- Decorative blobs, floating orbs, or abstract background noise.
- Excessive rounded cards.
- A card for every section.
- Stock photography when real project images are available.
- Oversized marketing copy that pushes useful content below the first viewport.

## Typography

Choose a new typography system based on the logo's geometric strength.

- Use a highly legible contemporary sans-serif for navigation, UI, and body copy.
- Choose a display face only if it complements the logo without competing with it.
- Do not reuse the current website fonts merely because they already exist.
- Maintain clear hierarchy without extreme font sizes.
- Use normal letter spacing for body content and restrained tracking for short labels.

Document the selected typefaces, weights, fallbacks, and usage rules.

## Image Direction

Use original project media from:

`Content-Extraction/Assets/Images/`

Photography should:

- Show completed architecture clearly.
- Preserve natural color and material detail.
- Avoid heavy color overlays.
- Avoid dark crops that conceal the project.
- Use wide establishing views alongside close construction or finish details.
- Maintain consistent aspect ratios within repeatable lists.

The home page should immediately establish ARC Builders through both the logo and a strong real-project image. Do not use a split-screen hero or place the main message inside a card.

## Information Architecture

Design the complete working website, not a promotional landing page.

Recommended public navigation:

1. Home
2. Projects
3. Residential
4. Commercial
5. Process
6. Locations
7. About
8. Blog
9. Contact

Treat the inclusion selector as a separate private client tool rather than a primary public navigation item.

## Page Expectations

### Home

- Immediate brand and project-quality signal.
- Concise positioning statement.
- Selected projects.
- Residential and commercial capability.
- Clear process overview.
- Service-area context.
- Credibility and client proof.
- Direct consultation action.

### Projects

- Scannable project index with meaningful filters.
- Large, inspectable images.
- Project location and type.
- Detail pages with overview, specifications, gallery, and relevant next action.
- Gallery interaction that works well with keyboard, touch, and large screens.

### Residential and Commercial

- Separate, task-focused service experiences.
- Clear service categories and scope.
- Relevant projects integrated into the page.
- Specific next steps rather than generic promotional claims.

### Process

- Explain the construction journey in a clear sequence.
- Make responsibilities, decisions, and milestones easy to scan.
- Use structural diagrams or timelines only when they improve comprehension.

### Locations

- Useful local-area index and detail pages.
- Connect area-specific content with relevant projects and services.
- Avoid thin doorway pages or repetitive layouts with only the suburb name changed.

### About

- Focus on experience, operating principles, quality standards, and client relationship.
- Avoid generic corporate-history presentation.

### Blog

- Editorial index optimized for scanning by topic.
- Comfortable long-form reading width.
- Strong heading, table, list, callout, and related-content styles.

### Contact

- Make phone, email, location, WhatsApp, and enquiry submission immediately accessible.
- Use a concise form with clear labels and useful validation.
- Provide a visible success, error, submitting, and retry state.

## Core Components

Create a coherent system for:

- Header and responsive navigation.
- Footer.
- Primary, secondary, and text actions.
- Project tiles and galleries.
- Service summaries.
- Process steps.
- Testimonials.
- FAQ disclosure groups.
- Location links.
- Blog cards and article typography.
- Forms and validation.
- Breadcrumbs.
- Search or filtering where valuable.
- Empty, loading, error, and success states.

Use familiar icons for tools and interface actions. Browser icon files are consolidated under:

`Content-Extraction/Icon/`

## Content Rules

Use extracted text as source material:

`Content-Extraction/*/Text/content.md`

Use each page's `metadata.json` for route provenance, assets, external sources, and component relationships.

Preserve:

- Business name and factual claims.
- Contact details.
- Licence information.
- Service descriptions.
- Project titles, locations, types, and descriptions.
- Blog content and metadata.
- Alt-text meaning.
- Required legal or pricing qualifications.

Copy may be edited for clarity and consistency, but do not invent awards, certifications, project numbers, prices, reviews, or guarantees.

## Interaction and Motion

Motion should express construction-like precision:

- Short, controlled transitions.
- Clear state changes.
- Subtle image reveals or grid assembly where appropriate.
- No continuous decorative motion.
- No scroll hijacking.
- Respect `prefers-reduced-motion`.

## Responsive Requirements

- Design mobile, tablet, laptop, and wide-desktop states deliberately.
- Keep navigation and contact actions usable on small screens.
- Prevent text, controls, and media from overlapping.
- Maintain predictable image crops and gallery dimensions.
- Keep tap targets at least 44 by 44 CSS pixels.
- Ensure the first viewport signals the brand and actual building work.
- Leave a visual indication that more content follows the hero.

## Accessibility and Quality

Target WCAG 2.2 AA.

- Use semantic landmarks and heading order.
- Provide keyboard-visible focus states.
- Meet color-contrast requirements.
- Preserve meaningful alt text.
- Label every form control.
- Announce validation and submission results.
- Support keyboard operation for menus, filters, disclosures, and galleries.
- Avoid conveying meaning through color alone.

Prioritize fast image delivery, responsive sources, stable layout dimensions, minimal client JavaScript, and strong Core Web Vitals.

## Deliverables

Produce:

1. A concise design rationale tied directly to the logo.
2. A sitemap and primary user journeys.
3. Color, typography, spacing, grid, border, and elevation tokens.
4. Responsive designs for all public page types.
5. Reusable component specifications and interaction states.
6. Accessibility behavior.
7. Image selection and cropping guidance.
8. A complete implementation using the extracted content and assets.

## Acceptance Criteria

The result is successful when:

- The logo clearly feels native to the interface.
- The visual system can be explained from the logo's form and colors.
- The site does not resemble or depend on the existing website design.
- Real projects are easy to inspect.
- Services, process, locations, and contact paths are easy to understand.
- Every route has a complete responsive experience.
- Components include expected interactive states.
- The design is accessible, performant, and implementation-ready.
