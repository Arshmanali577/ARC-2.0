"use client";

import { useState } from "react";

import { ArticleCard } from "@/components/blog/article-card";
import { ArticleFeature } from "@/components/blog/article-feature";
import { blogPage } from "@/content/pages";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";

/**
 * The article index and its category filter, as on the live site. The first
 * article in the current selection takes the feature row and the rest follow
 * as tiles, so the page always opens on a single article whichever category
 * is active.
 *
 * Two of the six categories carry no articles yet, so an empty state is part
 * of the control rather than an afterthought.
 */
export function BlogIndex({
  posts,
  categories,
  allLabel,
  formattedDates,
}: {
  posts: BlogPost[];
  categories: string[];
  allLabel: string;
  /** Dates are formatted on the server so both renders agree. */
  formattedDates: Record<string, string>;
}) {
  const [active, setActive] = useState<string>(allLabel);

  const visible =
    active === allLabel
      ? posts
      : posts.filter((post) => post.category === active);

  const [feature, ...rest] = visible;

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-7 nav:flex-row nav:items-center nav:gap-12">
        <div
          role="group"
          aria-label="Filter articles by category"
          className="flex flex-wrap gap-2.5"
        >
          {[allLabel, ...categories].map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(category)}
                className={cn(
                  "border px-5 py-3.5 text-[14px] uppercase tracking-[0.12em] transition duration-300 ease-out",
                  isActive
                    ? "border-brand bg-brand text-white"
                    : "border-line-strong text-brand hover:border-brand hover:bg-brand hover:text-white",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="m-0 shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted"
        >
          {visible.length} {visible.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {feature ? (
        <>
          <div className="mt-16">
            <ArticleFeature
              post={feature}
              formattedDate={formattedDates[feature.slug]}
            />
          </div>

          {rest.length > 0 ? (
            <div className="reveal-group mt-24 grid grid-cols-1 gap-x-11 gap-y-16 tab:grid-cols-2">
              {rest.map((post) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  formattedDate={formattedDates[post.slug]}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <p className="m-0 mt-16 border-l-2 border-brand py-2 pl-6 text-[18px] leading-[1.7] text-body">
          {blogPage.emptyLabel}
        </p>
      )}
    </>
  );
}
