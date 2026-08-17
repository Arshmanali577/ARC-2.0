import Link from "next/link";

import { ArticleMeta } from "@/components/blog/article-meta";
import { ArrowUpRight } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { blogPage } from "@/content/pages";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";

type ArticleCardProps = {
  post: BlogPost;
  formattedDate: string;
  /** `compact` drops the excerpt for the three-up related row. */
  variant?: "default" | "compact";
  sizes?: string;
  className?: string;
};

/**
 * The standard article tile. Same hover language as the project and location
 * cards — lift, navy-cast shadow, image zoom, frame — so a card behaves the
 * same wherever it appears on the site.
 */
export function ArticleCard({
  post,
  formattedDate,
  variant = "default",
  sizes = "(max-width: 900px) 100vw, 50vw",
  className,
}: ArticleCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block transition-transform duration-500 ease-out hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-surface transition-shadow duration-500 ease-out group-hover:shadow-plate">
        <MediaPlate
          label={post.title}
          src={post.heroImage}
          alt={post.title}
          sizes={sizes}
          className={cn(
            "w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]",
            isCompact ? "aspect-[3/2]" : "aspect-[16/10]",
          )}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 ease-out group-hover:border-white/35"
        />
      </div>

      <div className="mt-6 border-t border-line pt-5 transition-colors duration-300 ease-out group-hover:border-brand">
        <ArticleMeta
          category={post.category}
          date={formattedDate}
          readTime={post.readTime}
        />

        <h3
          className={cn(
            "m-0 mt-4 font-display font-normal leading-[1.2] [text-wrap:balance]",
            isCompact ? "text-[21px]" : "text-[24px] nav:text-[28px]",
          )}
        >
          {post.title}
        </h3>

        {!isCompact ? (
          <>
            <p className="m-0 mt-4 max-w-[54ch] text-[16px] leading-[1.7] text-body">
              {post.excerpt}
            </p>
            <span className="mt-7 inline-flex items-center gap-2.5 border-b border-brand pb-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand transition-opacity duration-300 ease-out group-hover:opacity-60">
              {blogPage.readLabel}
              <ArrowUpRight size={16} />
            </span>
          </>
        ) : null}
      </div>
    </Link>
  );
}
