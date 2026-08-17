"use client";

import Link from "next/link";
import { useCallback, useId, useState, type FocusEvent } from "react";

import { ChevronDown } from "@/components/ui/icon";
import type { NavGroup } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The desktop nav's grouped entry. It opens on hover for a pointer and on
 * click or focus for a keyboard, closes on Escape or when focus leaves the
 * group, and is `inert` while shut so its links stay out of the tab order.
 *
 * The trigger is a button, not a link: the group has no page of its own.
 */
export function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // React's focus events bubble, so one handler covers the whole group.
  const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex items-center gap-2 whitespace-nowrap border-b pb-[3px] uppercase tracking-[0.08em] transition-[border-color] duration-250 ease-out",
          open ? "border-brand" : "border-transparent hover:border-brand",
        )}
      >
        {group.label}
        <ChevronDown
          size={12}
          className={cn(
            "transition-transform duration-300 ease-out",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "absolute left-0 top-full z-30 min-w-[196px] pt-5 transition duration-300 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ul className="m-0 list-none border border-line-soft bg-white p-0 shadow-plate">
          {group.children.map((child) => (
            <li key={child.href} className="border-b border-line-soft last:border-b-0">
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 uppercase tracking-[0.08em] transition-colors duration-250 ease-out hover:bg-surface"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
