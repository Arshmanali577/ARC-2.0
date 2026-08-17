"use client";

import Link from "next/link";
import { useState } from "react";

import { NavLink } from "@/components/layout/nav-link";
import { headerCta, isNavGroup, primaryNav } from "@/content/site";
import { cn } from "@/lib/cn";

const row =
  "border-b border-line-soft py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-brand";

/**
 * Below 901px the link row is hidden, so the same routes are served from a
 * disclosure panel. Type, tracking and hairlines are the header's, only
 * stacked.
 *
 * The panel stays mounted and animates on a grid-rows transition, which gives
 * it a real close animation without measuring anything — and `inert` keeps its
 * links out of the tab order while it is shut.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="nav:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex h-11 w-11 items-center justify-center border border-line-strong text-brand transition-colors duration-300 ease-out hover:border-brand"
      >
        <span aria-hidden className="flex flex-col items-center gap-[5px]">
          <span
            className={cn(
              "block h-px w-5 bg-brand transition-transform duration-300 ease-out",
              open && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-brand transition-opacity duration-300 ease-out",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-brand transition-transform duration-300 ease-out",
              open && "-translate-y-[6px] -rotate-45",
            )}
          />
        </span>
      </button>

      <div
        id="mobile-navigation"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full grid overflow-hidden bg-white transition-[grid-template-rows,opacity,border-color] duration-400 ease-out",
          open
            ? "grid-rows-[1fr] border-b border-line-soft opacity-100"
            : "grid-rows-[0fr] border-b border-transparent opacity-0",
        )}
      >
        <nav aria-label="Primary" className="min-h-0">
          <div className="flex flex-col px-6 pb-7 pt-2">
            {primaryNav.map((entry) =>
              /* The panel has room to stack, so a group's routes sit indented
                 under its label rather than behind a second disclosure. */
              isNavGroup(entry) ? (
                <div key={entry.label} className="flex flex-col">
                  <span className={cn(row, "text-muted")}>{entry.label}</span>
                  {entry.children.map((child) => (
                    <span key={child.href} className="flex flex-col pl-5">
                      <NavLink
                        href={child.href}
                        label={child.label}
                        onNavigate={close}
                        variant="stacked"
                      />
                    </span>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={entry.href}
                  href={entry.href}
                  label={entry.label}
                  onNavigate={close}
                  variant="stacked"
                />
              ),
            )}
            <Link
              href={headerCta.href}
              onClick={close}
              className="mt-6 bg-brand px-6 py-[14px] text-center text-[13px] font-medium uppercase tracking-[0.12em] text-white transition duration-300 ease-out hover:bg-ink"
            >
              {headerCta.label}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
