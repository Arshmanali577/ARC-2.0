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
      <div className="reveal-soft flex flex-col items-start justify-between gap-6 border-b border-line pb-7 nav:flex-row nav:items-center nav:gap-12">
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
                  "border px-5 py-3.5 text-[14px] uppercase tracking-[0.12em] transition duration-300 ease-out active:scale-[0.97]",
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
          <div className="reveal mt-11 tab:mt-16">
            <ArticleFeature
              post={feature}
              formattedDate={formattedDates[feature.slug]}
            />
          </div>

          {rest.length > 0 ? (
            <div className="reveal-group mt-16 grid grid-cols-1 gap-x-11 gap-y-12 tab:mt-24 tab:grid-cols-2 tab:gap-y-16">
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
        <p className="m-0 mt-11 border-l-2 border-brand py-2 pl-5 text-[17px] leading-[1.7] text-body tab:mt-16 tab:pl-6 tab:text-[18px]">
          {blogPage.emptyLabel}
        </p>
      )}
    </>
  );
}
