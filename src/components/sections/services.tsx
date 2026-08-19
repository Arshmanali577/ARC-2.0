"use client";

import Link from "next/link";
import { useState } from "react";

import { UnderlineLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icon";
import { MediaPlate } from "@/components/ui/media-plate";
import { Eyebrow, Section } from "@/components/ui/section";
import {
  homeServiceIds,
  homeServiceLabels,
  homeServiceMedia,
  servicesSection,
} from "@/content/homepage";
import { allServices } from "@/content/services";
import { cn } from "@/lib/cn";

const homeServices = homeServiceIds
  .map((id) => allServices.find((service) => service.id === id))
  .filter((service) => service !== undefined);

/**
 * The four service lines as a numbered list, with a single photographic frame
 * beside them.
 *
 * The frame is the interaction: walking the pointer down the rows swaps the
 * photograph to the work that row describes, so the list is a way of looking
 * through the portfolio rather than four links with a picture next to them.
 * It is the one piece of state on the homepage, which is why this band — and
 * only this band — is a client component.
 *
 * Everything the hover does is decoration over a list of plain links: with no
 * JavaScript the rows still read, still number themselves and still navigate,
 * and the frame simply stays on the first service.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const current = homeServices[active] ?? homeServices[0];
  const media = homeServiceMedia[current.id];

  return (
    <Section id="services" size="default">
      <div className="reveal-soft flex flex-col items-start justify-between gap-4 border-b border-line pb-7 tab:flex-row tab:items-center tab:gap-6">
        <Eyebrow tone="gold" withRule as="h2">
          {servicesSection.eyebrow}
        </Eyebrow>
        <UnderlineLink
          href={servicesSection.link.href}
          tone="quiet"
          withArrow
        >
          {servicesSection.link.label}
        </UnderlineLink>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-10 nav:mt-12 nav:grid-cols-[1.35fr_1fr] nav:gap-14 wide:grid-cols-[1.5fr_1fr] wide:gap-20">
        <ul className="reveal-rows m-0 flex list-none flex-col p-0">
          {homeServices.map((service, index) => {
            const isActive = index === active;

            return (
              <li key={service.id} className="flex-1">
                <Link
                  href={service.href}
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cn(
                    "group relative flex h-full items-center gap-4 border-b border-line py-6 transition-colors duration-500 ease-out tab:gap-6 tab:py-7 nav:gap-9 nav:py-8",
                    index === 0 && "border-t",
                  )}
                >
                  {/* The row's own rule, drawn from the left as the pointer
                      arrives — the same treatment the service pages use, so a
                      row reads the same wherever it appears. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left bg-brand transition-transform duration-500 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />

                  <span
                    className={cn(
                      "w-6 shrink-0 text-[12px] font-semibold tracking-[0.16em] transition-colors duration-300 ease-out tab:w-8",
                      isActive ? "text-gold" : "text-faint",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "min-w-0 flex-1 items-baseline gap-9 nav:flex",
                      "transition-transform duration-500 ease-out",
                      isActive && "nav:translate-x-1",
                    )}
                  >
                    <span className="block font-display text-[22px] font-normal leading-[1.15] tab:text-[24px] nav:w-[15ch] nav:shrink-0 nav:text-[26px]">
                      {homeServiceLabels[service.id] ?? service.title}
                    </span>
                    <span className="mt-2 block max-w-[46ch] text-[15px] leading-[1.6] text-body tab:mt-2.5 tab:text-[16px] nav:mt-0">
                      {service.description}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center border transition-colors duration-300 ease-out tab:size-11",
                      isActive
                        ? "border-brand bg-brand text-white"
                        : "border-line text-brand",
                    )}
                  >
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Off on a phone: a photograph that answers a hover is doing nothing
            on a device with no pointer, and the rows above already carry the
            section on their own. */}
        <div className="reveal-plate relative hidden nav:block">
          <Link
            href={current.href}
            className="group/frame relative block h-full min-h-[420px] overflow-hidden bg-brand-deep"
            aria-label={homeServiceLabels[current.id] ?? current.title}
          >
            {/* Every service's photograph is mounted at once and cross-faded,
                so walking the rows never waits on a fetch. `next/image` still
                lazy-loads them, and there are four. */}
            {homeServices.map((service, index) => {
              const frame = homeServiceMedia[service.id];
              if (!frame) return null;

              return (
                <span
                  key={service.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <MediaPlate
                    label={service.title}
                    tone="dark"
                    src={frame.src}
                    alt={frame.alt}
                    sizes="(max-width: 900px) 0px, 40vw"
                    className="h-full w-full [&>img]:transition-transform [&>img]:duration-[1200ms] [&>img]:ease-out group-hover/frame:[&>img]:scale-[1.04]"
                  />
                </span>
              );
            })}

            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,26,56,0.86) 0%, rgba(0,26,56,0.34) 42%, transparent 72%)",
              }}
            />

            <span className="absolute inset-x-0 bottom-0 p-8 text-white">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(homeServices.length).padStart(2, "0")}
              </span>
              <span className="mt-3 block font-display text-[28px] leading-[1.1] tracking-[-0.02em]">
                {homeServiceLabels[current.id] ?? current.title}
              </span>
              <span className="sr-only">{media?.alt}</span>
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
