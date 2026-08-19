import { cn } from "@/lib/cn";

/**
 * Category · date · reading time, the one meta line every article carries.
 * Shared by the index cards, the featured article and the masthead so the
 * three never drift apart.
 */
export function ArticleMeta({
  category,
  date,
  readTime,
  tone = "dark",
  className,
}: {
  category: string;
  date: string;
  readTime: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-mist" : "text-muted",
        className,
      )}
    >
      <span className={tone === "light" ? "text-white" : "text-brand"}>
        {category}
      </span>
      <span aria-hidden className={tone === "light" ? "text-white/40" : "text-faint"}>
        ·
      </span>
      <span>{date}</span>
      <span aria-hidden className={tone === "light" ? "text-white/40" : "text-faint"}>
        ·
      </span>
      <span>{readTime}</span>
    </div>
  );
}
