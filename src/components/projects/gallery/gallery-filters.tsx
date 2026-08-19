"use client";

import { cn } from "@/lib/cn";

export type FilterOption = { id: string; label: string };

/**
 * The room filter. Rendered as a plain `<button>` group rather than tabs: the
 * rail re-filters a carousel in place, it does not swap panels, so the tab
 * roles would promise a keyboard contract this widget does not implement.
 *
 * Only categories the project actually photographed are passed in, so a build
 * without a bedroom shot never shows a chip that filters to nothing.
 */
export function GalleryFilters({
  options,
  active,
  onChange,
  label,
  className,
}: {
  options: FilterOption[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2 tab:gap-2.5", className)}
    >
      {options.map((option) => {
        const isActive = option.id === active;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-full border px-5 py-[11px] text-[12px] font-semibold uppercase tracking-[0.14em] transition duration-300 ease-out tab:px-[22px] tab:py-[13px]",
              isActive
                ? "border-brand bg-brand text-white shadow-plate"
                : "border-line bg-white text-brand hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
