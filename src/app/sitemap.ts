import type { MetadataRoute } from "next";

import { localAreas } from "@/content/local-areas";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { blogPosts } from "@/lib/blog";

/** Every indexable route. `/inclusions` and `/maintenance` are noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (pathname: string) => `${site.url}${pathname}`;

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: url("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/residential"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/commercial"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/process"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/locations"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.9 },
    ...projects.map((project) => ({
      url: url(`/projects/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...localAreas.map((area) => ({
      url: url(`/locations/${area.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
