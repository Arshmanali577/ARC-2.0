import { Section } from "@/components/ui/section";
import { stats as homeStats, type Stat } from "@/content/homepage";
import { site } from "@/content/site";

/**
 * Figures under a drawn rule, aligned to the page gutter. Each cell opens with
 * a hairline so the row reads as a measured scale rather than four boxes — the
 * same marker the process stages use further down the page.
 */
export function StatsBar({ stats = homeStats }: { stats?: Stat[] }) {
  const cells = [
    ...stats.map((stat) => ({
      key: stat.label,
      value: stat.value,
      label: stat.label,
      accent: false,
    })),
    {
      key: "licence",
      value: site.licence.label,
      label: `LIC. ${site.licence.number}`,
      accent: true,
    },
  ];

  return (
    <Section as="section" size="tight" className="bg-brand text-white">
      <div className="reveal-group grid grid-cols-1 gap-x-14 gap-y-12 tab:grid-cols-2 wide:grid-cols-4">
        {cells.map((cell, index) => (
          <div
            key={cell.key}
            className={`border-t pt-6 ${
              index === 0 ? "border-line-invert-hero" : "border-line-invert"
            }`}
          >
            <div
              className={`font-display leading-none ${
                cell.accent
                  ? "text-[22px] leading-[1.25]"
                  : "text-[clamp(34px,11vw,46px)] wide:text-[52px]"
              }`}
            >
              {cell.value}
            </div>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-mist-deep">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
