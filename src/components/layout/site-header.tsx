import Link from "next/link";

import { Button } from "@/components/ui/button";
import { gutter } from "@/components/ui/section";
import { Wordmark } from "@/components/ui/wordmark";
import { headerCta, primaryNav } from "@/content/site";

export function SiteHeader() {
  return (
    <header
      className={`sticky top-0 z-20 flex flex-col items-start gap-5 border-b border-line-soft bg-white/94 py-[22px] backdrop-blur-[10px] nav:flex-row nav:items-center nav:justify-between nav:gap-0 ${gutter}`}
    >
      <Link href="/" aria-label="ARC Builders — home">
        <Wordmark showLogoSlot />
      </Link>

      {/* Matches the source design: the link row is desktop-only. */}
      <nav className="hidden items-center gap-[30px] text-[13px] font-medium uppercase tracking-[0.08em] text-brand nav:flex">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-b border-transparent pb-[3px] transition-[border-color] duration-250 ease-out hover:border-brand"
          >
            {item.label}
          </Link>
        ))}
        <Button href={headerCta.href} variant="headerSolid">
          {headerCta.label}
        </Button>
      </nav>
    </header>
  );
}
