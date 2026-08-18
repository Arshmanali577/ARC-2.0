import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/icon";
import type { SocialLink as SocialLinkData, SocialNetwork } from "@/content/site";

/**
 * A circular social button.
 *
 * Each network keeps its own gradient — defined in `globals.css`, so no colour
 * is hardcoded here — under a glass rim and a thin inner highlight. The mark
 * itself is white at every state; the interaction is a 2px lift and an accent
 * glow, which is enough to feel responsive without turning a row of four
 * buttons into a light show.
 */

const marks: Record<SocialNetwork, typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

const surfaces: Record<SocialNetwork, string> = {
  facebook: "social-facebook",
  instagram: "social-instagram",
  linkedin: "social-linkedin",
  youtube: "social-youtube",
};

export function SocialLink({ label, href, network }: SocialLinkData) {
  const Mark = marks[network];

  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group relative grid size-11 place-items-center rounded-full text-white ring-1 ring-white/18 transition-[transform,box-shadow,filter] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow-lift hover:brightness-110 ${surfaces[network]}`}
    >
      {/* Rim light: a hairline of white across the top of the sphere. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/28 to-white/0"
      />
      <Mark
        size={20}
        className="relative transition-transform duration-300 ease-out group-hover:scale-110"
      />
      <span className="sr-only">{label}</span>
    </a>
  );
}
