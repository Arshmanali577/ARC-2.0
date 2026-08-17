import { MediaPlate } from "@/components/ui/media-plate";
import { gutter } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * A full-bleed photograph used as a pause between bands of copy. The caption
 * sits back on the page gutter under a hairline, the way a plate is credited
 * on a drawing sheet — so the image reads as a specific building, not as
 * decoration.
 */
export function FeatureImage({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3] nav:aspect-[2/1] wide:aspect-[21/9]",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className={cn("group relative w-full overflow-hidden bg-surface", aspect)}>
        <MediaPlate
          label={caption ?? alt}
          tone="plate-2"
          src={src}
          alt={alt}
          sizes="100vw"
          className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      {caption ? (
        <div className={cn("mt-5 flex items-center gap-5", gutter)}>
          <span aria-hidden className="h-px w-10 bg-line-strong" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {caption}
          </span>
        </div>
      ) : null}
    </section>
  );
}
