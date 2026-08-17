/**
 * A deliberately small Markdown reader for the five migrated blog posts.
 *
 * The posts use one subset only — `##`/`###` headings, paragraphs, `-` and
 * `1.` lists, `**bold**` and `[text](href)` — so a parser for exactly that
 * subset keeps the original `.md` files as the single source of truth without
 * pulling a Markdown library into the bundle. Anything outside the subset is
 * rendered as literal text rather than silently dropped.
 */

export type InlineNode =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string }
  | { kind: "link"; value: string; href: string };

export type HeadingBlock = {
  kind: "heading";
  level: 2 | 3;
  id: string;
  text: string;
  content: InlineNode[];
};

export type Block =
  | HeadingBlock
  | { kind: "paragraph"; content: InlineNode[] }
  | { kind: "list"; ordered: boolean; items: InlineNode[][] };

/** Narrowing helper — `Array.filter` alone will not refine a union. */
export function isHeading(block: Block, level?: 2 | 3): block is HeadingBlock {
  return block.kind === "heading" && (level === undefined || block.level === level);
}

/** Anchor id for a heading, kept unique within a document. */
function slugify(text: string, taken: Set<string>) {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";

  let slug = base;
  let suffix = 2;
  while (taken.has(slug)) slug = `${base}-${suffix++}`;
  taken.add(slug);
  return slug;
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];

  for (const part of text.split(INLINE_PATTERN)) {
    if (!part) continue;

    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push({ kind: "strong", value: part.slice(2, -2) });
      continue;
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      nodes.push({ kind: "link", value: link[1], href: link[2] });
      continue;
    }

    nodes.push({ kind: "text", value: part });
  }

  return nodes;
}

export function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = [];
  const headingIds = new Set<string>();
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({
      kind: "paragraph",
      content: parseInline(paragraph.join(" ").trim()),
    });
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    blocks.push({
      kind: "list",
      ordered: list.ordered,
      items: list.items.map((item) => parseInline(item)),
    });
    list = null;
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line === "") {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const text = heading[2].replace(/\*\*/g, "").trim();
      blocks.push({
        kind: "heading",
        level: heading[1].length === 2 ? 2 : 3,
        id: slugify(text, headingIds),
        text,
        content: parseInline(heading[2]),
      });
      continue;
    }

    const unordered = /^[-*]\s+(.*)$/.exec(line);
    if (unordered) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(unordered[1]);
      continue;
    }

    const ordered = /^\d+\.\s+(.*)$/.exec(line);
    if (ordered) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ordered[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushAll();
  return blocks;
}

/** Front matter: `key: value`, plus `key:` followed by indented `- item` rows. */
export function parseFrontMatter(source: string) {
  const normalised = source.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalised);

  if (!match) {
    return { data: {} as Record<string, string | string[]>, body: normalised };
  }

  const data: Record<string, string | string[]> = {};
  let currentListKey: string | null = null;

  for (const line of match[1].split("\n")) {
    if (line.trim() === "") continue;

    const listItem = /^\s+-\s+(.*)$/.exec(line);
    if (listItem && currentListKey) {
      (data[currentListKey] as string[]).push(unquote(listItem[1]));
      continue;
    }

    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!pair) continue;

    const [, key, value] = pair;
    if (value === "") {
      currentListKey = key;
      data[key] = [];
    } else {
      currentListKey = null;
      data[key] = unquote(value);
    }
  }

  return { data, body: normalised.slice(match[0].length) };
}

function unquote(value: string) {
  const trimmed = value.trim();
  return trimmed.replace(/^["'](.*)["']$/, "$1");
}
