import Link from "next/link";

import { ArticleMeta } from "@/components/blog/article-meta";
import { ArrowUpRight } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { blogPage } from "@/content/pages";
import type { BlogPost } from "@/lib/blog";

/**
 * The lead article, given a full editorial row: a wide plate beside the
 * write-up, set two steps up the type scale from the tiles below it so the
 * page opens on one article rather than a wall of equal cards.
 */
export function ArticleFeature({
  post,
  formattedDate,
}: {
  post: BlogPost;
  formattedDate: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 items-center gap-10 transition-transform duration-500 ease-out hover:-translate-y-1 nav:grid-cols-[1.35fr_1fr] nav:gap-16"
    >
      <div className="relative overflow-hidden bg-surface transition-shadow duration-500 ease-out group-hover:shadow-plate-strong">
        <MediaPlate
          label={post.title}
          tone="plate-1"
          src={post.heroImage}
          alt={post.title}
          sizes="(max-width: 900px) 100vw, 58vw"
          className="aspect-[16/10] w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
        />
      </div>

      <div>
        <ArticleMeta
          category={post.category}
          date={formattedDate}
          readTime={post.readTime}
        />

        <h2 className="m-0 mt-6 font-display text-[clamp(26px,7.6vw,32px)] font-normal leading-[1.12] tracking-[-0.01em] [text-wrap:balance] nav:text-[42px]">
          {post.title}
        </h2>

        <p className="m-0 mt-6 max-w-[52ch] text-[18px] leading-[1.75] text-body">
          {post.excerpt}
        </p>

        <span className="mt-9 inline-flex items-center gap-3 text-[14px] font-semibold uppercase tracking-[0.12em] text-brand">
          {blogPage.readLabel}
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
