import fs from "node:fs";
import path from "node:path";

import { parseFrontMatter, parseMarkdown, type Block } from "@/lib/markdown";

/**
 * The five blog posts are the original Markdown files, copied unchanged into
 * `src/content/blog/`. They are read once at build time, so every blog route
 * still renders as a static page.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  targetKeyword: string;
  suburbIntent: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  tags: string[];
  blocks: Block[];
};

/** Categories exactly as the live blog index lists them, in the same order. */
export const blogCategories = [
  "Home design and inspiration",
  "Building process and tips",
  "Cost budgeting and finance",
  "Projects and case studies",
  "Sustainability and material",
  "Industry updates",
];

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readPosts(): BlogPost[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const posts = files.map((file) => {
    const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, body } = parseFrontMatter(source);

    const text = (key: string) =>
      typeof data[key] === "string" ? (data[key] as string) : "";
    const list = (key: string) =>
      Array.isArray(data[key]) ? (data[key] as string[]) : [];

    return {
      slug: text("slug") || file.replace(/\.md$/, ""),
      title: text("title"),
      excerpt: text("excerpt"),
      metaDescription: text("metaDescription"),
      targetKeyword: text("targetKeyword"),
      suburbIntent: list("suburbIntent"),
      category: text("category"),
      author: text("author"),
      date: text("date"),
      readTime: text("readTime"),
      heroImage: text("heroImage"),
      tags: list("tags"),
      blocks: parseMarkdown(body),
    } satisfies BlogPost;
  });

  return posts.sort((a, b) =>
    a.date === b.date
      ? a.slug.localeCompare(b.slug)
      : b.date.localeCompare(a.date),
  );
}

export const blogPosts: BlogPost[] = readPosts();

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Same-category posts first, then the newest remaining ones. */
export function getRelatedPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return [];

  const others = blogPosts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter(
    (post) => post.category === current.category,
  );
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatBlogDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
