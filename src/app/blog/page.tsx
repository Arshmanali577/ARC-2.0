import { BlogIndex } from "@/components/blog/blog-index";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { blogPage } from "@/content/pages";
import { blogCategories, blogPosts, formatBlogDate } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(blogPage.seo);

const formattedDates = Object.fromEntries(
  blogPosts.map((post) => [post.slug, formatBlogDate(post.date)]),
);

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow={blogPage.eyebrow}
        heading={blogPage.heading}
        lead={blogPage.lead}
        image={blogPage.heroImage}
        imageAlt="Elmsworth Residence, Calamvale"
        mediaLabel="ELMSWORTH RESIDENCE — CALAMVALE"
      />

      <Section size="default">
        <BlogIndex
          posts={blogPosts}
          categories={blogCategories}
          allLabel={blogPage.allFilterLabel}
          formattedDates={formattedDates}
        />
      </Section>

      <CtaBand />
    </>
  );
}
