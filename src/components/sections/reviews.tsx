"use client";

import { useCallback, useState } from "react";

import { useSwipe } from "@/components/projects/gallery/swipe";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, QuoteIcon } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaPlate } from "@/components/ui/media-plate";
import { Eyebrow, Section } from "@/components/ui/section";
import { reviewsSection } from "@/content/homepage";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/cn";

/**
 * Every review ARC has, one at a time, on the deepest navy in the palette.
 *
 * The design gives this band a single quote against a photograph; there are
 * five real reviews, so it is paged rather than cut down to one — the same
 * treatment, five times over. Paging is manual on purpose: a block of running
 * copy that moves on its own is a block of copy nobody finishes.
 *
 * The photograph changes with the review, and both cross-fade rather than
 * cutting, so stepping through reads as one band turning over instead of the
 * section being replaced.
 */
function ReviewArrow({
  direction,
  onClick,
  label,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  label: string;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <Magnetic strength={5}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="inline-flex size-12 items-center justify-center rounded-full border border-line-invert-strong text-white transition duration-300 ease-out hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
      >
        <Icon size={18} />
      </button>
    </Magnetic>
  );
}

export function Reviews() {
  const count = testimonials.length;
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((index) => (index + 1) % count),
    [count],
  );
  const previous = useCallback(
    () => setActive((index) => (index - 1 + count) % count),
    [count],
  );

  const swipe = useSwipe(previous, next);
  const review = testimonials[active];

  return (
    <Section
      id="reviews"
      as="aside"
      aria-label={reviewsSection.eyebrow}
      size="none"
      padded={false}
      className="relative overflow-hidden cta-surface text-white"
    >
      {/* The photograph runs off the right edge of the page from `nav` up, and
          sits above the quote as a plate below it — the same image either way,
          placed where the layout has room for it. */}
      <div className="relative aspect-[16/10] w-full tab:aspect-[21/9] nav:absolute nav:inset-y-0 nav:right-0 nav:aspect-auto nav:h-full nav:w-[38%] wide:w-[34%]">
        {reviewsSection.media.map((frame, index) => (
          <div
            key={frame.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
          >
            <MediaPlate
              label={frame.alt}
              tone="dark"
              src={frame.src}
              alt={frame.alt}
              sizes="(max-width: 900px) 100vw, 38vw"
              className="h-full w-full"
            />
          </div>
        ))}

        {/* Dissolves the photograph into the band rather than butting it
            against the copy: downwards where it sits above the quote, and
            leftwards once it is beside it. */}
        <div
          aria-hidden
          className="absolute inset-0 nav:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,26,56,0.42) 0%, rgba(0,26,56,0.72) 62%, rgba(0,26,56,0.97) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden nav:block"
          style={{
            background:
              "linear-gradient(to right, rgba(0,26,56,0.98) 0%, rgba(0,26,56,0.55) 34%, rgba(0,26,56,0.18) 100%)",
          }}
        />
      </div>

      <div
        {...swipe}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            previous();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            next();
          }
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`Review ${active + 1} of ${count}`}
        className="relative px-6 pb-12 pt-10 tab:px-10 tab:pb-16 tab:pt-14 nav:px-14 nav:py-[104px] nav:pr-[44%] wide:pr-[40%]"
      >
        <Eyebrow tone="gold" withRule>
          {reviewsSection.eyebrow}
        </Eyebrow>

        <div className="mt-7 flex flex-col gap-6 tab:mt-9 tab:gap-9 nav:flex-row nav:gap-12">
          {/* The mark, drawn once and left alone as the reviews turn over —
              it is the band's own furniture, not part of any one quote. */}
          <span
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/70 text-gold tab:size-16 nav:size-[74px]"
          >
            <QuoteIcon size={26} />
          </span>

          {/* A floor under the quote, so stepping from a nine-line review to a
              four-line one turns the band over rather than collapsing it. */}
          <figure className="m-0 min-w-0 flex-1 nav:min-h-[290px]">
            {/* Keyed on the review, so React replaces the block rather than
                editing it in place — which is what lets the incoming quote
                run its own entrance instead of the words simply changing. */}
            <blockquote
              key={review.id}
              className="feature-rise m-0 text-[18px] font-light leading-[1.6] text-white/92 [text-wrap:pretty] tab:text-[22px] nav:text-[25px] nav:leading-[1.55]"
            >
              “{review.quote}”
            </blockquote>

            <figcaption
              key={`${review.id}-by`}
              className="feature-rise mt-8"
              style={{ animationDelay: "80ms" }}
            >
              <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-gold">
                {review.name}
              </span>
              <span className="mt-2 block text-[15px] leading-[1.5] text-white/60">
                {review.role}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-9 flex flex-col gap-6 border-t border-line-invert pt-7 tab:mt-11 tab:flex-row tab:items-center tab:justify-between tab:gap-8 tab:pt-8">
          <div className="flex items-center gap-5">
            <ReviewArrow
              direction="previous"
              onClick={previous}
              label={reviewsSection.previous}
            />
            <ReviewArrow
              direction="next"
              onClick={next}
              label={reviewsSection.next}
            />

            <span className="ml-3 text-[12px] font-semibold tracking-[0.16em] text-white/45">
              <span className="text-white">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="px-1.5">/</span>
              {String(count).padStart(2, "0")}
            </span>
          </div>

          <Magnetic className="self-start tab:self-auto">
            <Button href={reviewsSection.action.href} variant="brassSolid" withArrow>
              {reviewsSection.action.label}
            </Button>
          </Magnetic>
        </div>
      </div>
    </Section>
  );
}
