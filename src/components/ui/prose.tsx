import Link from "next/link";
import type { ReactNode } from "react";

import type { Block, InlineNode } from "@/lib/markdown";

/**
 * Article typography for the migrated blog posts. Sizes come from the same
 * scale the section components use, set at a comfortable reading measure.
 * Headings carry the anchor id the table of contents links to.
 */

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, index) => (
        <BlockNode key={index} block={block} first={index === 0} />
      ))}
    </div>
  );
}

function BlockNode({ block, first }: { block: Block; first: boolean }) {
  if (block.kind === "heading") {
    if (block.level === 2) {
      return (
        <h2
          id={block.id}
          className={`m-0 scroll-mt-28 font-display text-[28px] font-normal leading-[1.2] tracking-[-0.01em] nav:text-[34px] ${
            first ? "" : "mt-[68px]"
          }`}
        >
          <Inline nodes={block.content} />
        </h2>
      );
    }

    return (
      <h3
        id={block.id}
        className={`m-0 scroll-mt-28 font-display text-[22px] font-normal leading-[1.25] nav:text-[26px] ${
          first ? "" : "mt-12"
        }`}
      >
        <Inline nodes={block.content} />
      </h3>
    );
  }

  if (block.kind === "list") {
    const items = block.items.map((item, index) => (
      <li key={index} className="grid grid-cols-[20px_1fr] gap-4">
        {block.ordered ? (
          <span className="pt-[9px] text-[15px] font-semibold text-brand">
            {index + 1}
          </span>
        ) : (
          <span
            aria-hidden
            className="mt-[14px] h-1.5 w-1.5 shrink-0 bg-brand"
          />
        )}
        <span>
          <Inline nodes={item} />
        </span>
      </li>
    ));

    return (
      <ul className="m-0 mt-7 flex list-none flex-col gap-3 p-0 text-[19px] leading-[1.75] text-body">
        {items}
      </ul>
    );
  }

  return (
    <p
      className={`m-0 text-[19px] leading-[1.85] text-body ${
        first ? "" : "mt-6"
      }`}
    >
      <Inline nodes={block.content} />
    </p>
  );
}

function Inline({ nodes }: { nodes: InlineNode[] }): ReactNode {
  return nodes.map((node, index) => {
    if (node.kind === "strong") {
      return (
        <strong key={index} className="font-semibold text-ink">
          {node.value}
        </strong>
      );
    }

    if (node.kind === "link") {
      return (
        <Link
          key={index}
          href={node.href}
          className="border-b border-brand text-brand transition-opacity duration-300 ease-out hover:opacity-60"
        >
          {node.value}
        </Link>
      );
    }

    return <span key={index}>{node.value}</span>;
  });
}
