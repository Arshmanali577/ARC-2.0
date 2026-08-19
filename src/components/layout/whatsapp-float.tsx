import { WhatsappIcon } from "@/components/ui/icon";
import { site } from "@/content/site";

/**
 * The chat button in the corner of every page.
 *
 * A visitor deciding on a builder does not want a form — they want to ask one
 * question. This is the shortest route to that, and it follows them down the
 * page rather than waiting at the bottom of it.
 *
 * It stays a disc until the pointer reaches it, then writes out what it does.
 * A permanently expanded pill sitting over the photography would be the
 * loudest object on a page built out of hairlines; a disc that answers the
 * cursor says the same thing and only when it is being looked at.
 *
 * No client JavaScript: the expansion is a `group-hover` / `group-focus-within`
 * transition, so it costs nothing and works with the keyboard. Its accessible
 * name is the full label either way, so a screen reader and a touch device —
 * neither of which ever sees the panel open — are told exactly what it is.
 */
export function WhatsappFloat() {
  return (
    <a
      href={site.contact.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={site.contact.whatsappLabel}
      /* Above the page and its sticky header, below the skip link and the
         project lightbox — the two things that must cover everything. */
      className="group/wa fixed bottom-5 right-5 z-30 flex items-center rounded-full bg-ink/85 p-1.5 text-white shadow-plate backdrop-blur-[6px] transition duration-300 ease-out hover:shadow-plate-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white nav:bottom-8 nav:right-8"
    >
      {/* Collapsed to nothing rather than hidden, so the panel grows out of the
          disc instead of appearing beside it. `max-width` is the one property
          that animates cleanly from a real width to zero here — the label is a
          different length on every locale, so a fixed translate would either
          clip it or leave a gap. */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,padding] duration-400 ease-out group-hover/wa:max-w-[280px] group-hover/wa:pl-5 group-hover/wa:pr-3.5 group-hover/wa:opacity-100 group-focus-within/wa:max-w-[280px] group-focus-within/wa:pl-5 group-focus-within/wa:pr-3.5 group-focus-within/wa:opacity-100 motion-reduce:transition-none">
        <span className="text-[13px] font-semibold uppercase tracking-[0.12em]">
          {site.contact.whatsappLabel}
        </span>
      </span>

      <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full">
        {/* The ring the disc breathes behind. Sits under the mark rather than
            around the button, so the pulse never changes the hit area. */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full social-whatsapp opacity-40 whatsapp-pulse motion-reduce:hidden"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full social-whatsapp"
        />
        <WhatsappIcon
          size={28}
          className="relative transition-transform duration-300 ease-out group-hover/wa:scale-110"
        />
      </span>
    </a>
  );
}
