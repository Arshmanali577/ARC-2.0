import { blogPage } from "@/content/pages";
import { isHeading, type Block } from "@/lib/markdown";

/**
 * The article's own section headings, turned into an in-page contents list.
 * Nothing here is authored — it is the document outline, so a long guide can
 * be navigated instead of only scrolled.
 */
export function ArticleToc({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter((block) => isHeading(block, 2));

  if (headings.length < 3) return null;

  return (
    <nav aria-label={blogPage.detail.contentsHeading}>
      <h2 className="m-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
        {blogPage.detail.contentsHeading}
      </h2>
      <ol className="m-0 mt-6 list-none border-t border-line p-0">
        {headings.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="group grid grid-cols-[28px_1fr] gap-3 border-b border-line py-3.5 text-[14px] leading-[1.5] text-body transition-colors duration-250 ease-out hover:text-brand"
            >
              <span className="text-[11px] font-semibold tracking-[0.16em] text-faint transition-colors duration-250 ease-out group-hover:text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
