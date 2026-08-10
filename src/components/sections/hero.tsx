import { Button } from "@/components/ui/button";
import { MediaPlate } from "@/components/ui/media-plate";
import { gutter } from "@/components/ui/section";
import { hero } from "@/content/homepage";

export function Hero() {
  return (
    <section className="relative flex min-h-[720px] flex-col justify-end overflow-hidden">
      {/* Media layer */}
      <MediaPlate
        {...hero.media}
        priority
        align="end"
        labelPadding={20}
        className="absolute inset-0 h-full w-full"
      />

      {/* Tint so the copy always clears AA contrast over the film */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,26,56,0.9) 0%, rgba(0,43,92,0.62) 55%, rgba(0,43,92,0.28) 100%)",
        }}
      />

      <div className={`relative z-10 pb-[76px] pt-[120px] text-white ${gutter}`}>
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mist">
          {hero.eyebrow}
        </span>

        <h1 className="m-0 mt-6 max-w-[900px] font-display text-[46px] font-normal leading-[1.02] tracking-[-0.03em] [text-wrap:pretty] nav:text-[62px] wide:text-[86px]">
          {hero.heading}
        </h1>

        <p className="m-0 mt-[26px] max-w-[560px] text-[19px] font-light leading-[1.7] text-white/82">
          {hero.body}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3.5 nav:flex-row nav:items-center">
          <Button href={hero.primaryCta.href} variant="heroSolid">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="heroOutline">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
