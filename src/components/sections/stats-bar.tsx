import { site } from "@/content/site";
import { stats } from "@/content/homepage";

export function StatsBar() {
  const lastIndex = stats.length; // the licence cell sits after the stats

  return (
    <section className="grid grid-cols-1 bg-brand text-white nav:grid-cols-2 wide:grid-cols-4">
      {stats.map((stat, index) => (
        <Cell key={stat.label} index={index} lastIndex={lastIndex}>
          <div className="font-display text-[46px] leading-none">
            {stat.value}
          </div>
          <div className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-mist-deep">
            {stat.label}
          </div>
        </Cell>
      ))}

      <Cell
        index={lastIndex}
        lastIndex={lastIndex}
        className="flex flex-col justify-center"
      >
        <div className="text-[14px] font-semibold">{site.licence.label}</div>
        <div className="mt-2 text-[11px] font-medium tracking-[0.16em] text-mist-deep">
          LIC. {site.licence.number}
        </div>
      </Cell>
    </section>
  );
}

/** First and last cells take the wider page gutter, matching the design. */
function Cell({
  index,
  lastIndex,
  className,
  children,
}: {
  index: number;
  lastIndex: number;
  className?: string;
  children: React.ReactNode;
}) {
  const isEdge = index === 0 || index === lastIndex;
  const isLast = index === lastIndex;

  return (
    <div
      className={[
        "px-6 py-[38px]",
        isEdge ? "nav:px-14" : "nav:px-10",
        isLast ? "" : "border-b border-line-invert wide:border-b-0 wide:border-r",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
