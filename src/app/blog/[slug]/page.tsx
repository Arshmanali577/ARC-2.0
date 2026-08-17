import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/blog/article-card";
import { ArticleMeta } from "@/components/blog/article-meta";
import { ArticleToc } from "@/components/blog/article-toc";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { UnderlineLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { blogPage } from "@/content/pages";
import { Prose } from "@/components/ui/prose";
import {
  blogPosts,
  formatBlogDate,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const { detail } = blogPage;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: [post.targetKeyword, ...post.tags, ...post.suburbIntent],
    images: [post.heroImage],
    type: "article",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(post.excerpt)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          image: post.heroImage,
          author: post.author,
          date: post.date,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: blogPage.heading, path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <PageHero
        eyebrow={post.category}
        heading={post.title}
        lead={post.excerpt}
        image={post.heroImage}
        imageAlt={post.title}
        mediaLabel={post.category.toUpperCase()}
        size="tall"
      >
        <div className="mt-10 flex items-center gap-5 border-t border-white/20 pt-6">
          <ArticleMeta
            category={post.author}
            date={formatBlogDate(post.date)}
            readTime={post.readTime}
            tone="light"
          />
        </div>
      </PageHero>

      <Section size="default">
        <div className="grid grid-cols-1 items-start gap-16 nav:grid-cols-[minmax(0,1fr)_300px] nav:gap-20 wide:gap-24">
          <article>
            <Prose blocks={post.blocks} />
          </article>

          {/* Contents, then sharing, then the article's tags. Sticky so the
              outline stays reachable through a long read. */}
          <aside className="nav:sticky nav:top-[120px] nav:order-last">
            <ArticleToc blocks={post.blocks} />

            <div className="mt-12">
              <h2 className="m-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
                {detail.shareHeading}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {shareLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-line-strong px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand transition duration-300 ease-out hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="m-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
                {detail.tagsHeading}
              </h2>
              <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-line px-3.5 py-2 text-[12px] leading-[1.4] text-body"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <UnderlineLink href="/blog" className="mt-12">
              {detail.backLink}
            </UnderlineLink>
          </aside>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section size="default" className="bg-surface">
          <SectionHeader
            eyebrow={blogPage.eyebrow}
            heading={detail.relatedHeading}
          />
          <div className="reveal-group mt-14 grid grid-cols-1 gap-x-9 gap-y-14 tab:grid-cols-2 nav:grid-cols-3">
            {related.map((item) => (
              <ArticleCard
                key={item.slug}
                post={item}
                formattedDate={formatBlogDate(item.date)}
                variant="compact"
                sizes="(max-width: 639px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
