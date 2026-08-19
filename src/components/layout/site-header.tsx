import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { gutter } from "@/components/ui/section";
import { Wordmark } from "@/components/ui/wordmark";
import { headerCta, isNavGroup, primaryNav } from "@/content/site";

export function SiteHeader() {
  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between gap-5 border-b border-line-soft bg-white/94 py-[22px] backdrop-blur-[10px] ${gutter}`}
    >
      <Link href="/" aria-label="ARC Builders — home">
        <Wordmark />
      </Link>

      {/* The link row is desktop-only, as the design specifies. The CTA joins
          it at 1201px. The gaps are a touch tighter than the design's 22/30px
          because the row now carries eight entries rather than seven. */}
      <nav className="hidden items-center gap-[18px] text-[13px] font-medium uppercase tracking-[0.08em] text-brand nav:flex wide:gap-[26px] wide:text-[14px]">
        {primaryNav.map((entry) =>
          isNavGroup(entry) ? (
            <NavDropdown key={entry.label} group={entry} />
          ) : (
            <NavLink key={entry.href} href={entry.href} label={entry.label} />
          ),
        )}
        <Button
          href={headerCta.href}
          variant="headerSolid"
          className="hidden wide:inline-flex"
        >
          {headerCta.label}
        </Button>
      </nav>

      <MobileNav />
    </header>
  );
}
