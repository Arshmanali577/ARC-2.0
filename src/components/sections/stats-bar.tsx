import type { ReactNode } from "react";

import { site } from "@/content/site";
import { stats } from "@/content/homepage";

/**
 * Four cells that reflow 1 → 2 → 4 across the breakpoints. Padding and dividers
 * are declared per cell because "which edge am I on" changes with the column
 * count: at two columns cell 3 starts a row, at four columns it sits mid-row.
 * Keeping the table explicit is what stops the row edges from drifting.
 */
const cellStyles = [
  // 1 col: row start+end · 2 col: row start · 4 col: row start
  "nav:pl-14 nav:pr-10 border-b border-line-invert nav:border-r wide:border-b-0",
  // 2 col: row end · 4 col: middle
  "nav:pl-10 nav:pr-14 border-b border-line-invert wide:border-b-0 wide:border-r wide:pr-10",
  // 2 col: row start · 4 col: middle
  "nav:pl-14 nav:pr-10 border-b border-line-invert nav:border-b-0 nav:border-r wide:pl-10",
  // last cell: never draws a divider
  "nav:pl-10 nav:pr-14",
];

export function StatsBar() {
  return (
    <section className="grid grid-cols-1 bg-brand text-white nav:grid-cols-2 wide:grid-cols-4">
      {stats.map((stat, index) => (
        <Cell key={stat.label} index={index}>
          <div className="font-display text-[46px] leading-none">
            {stat.value}
          </div>
          <div className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-mist-deep">
            {stat.label}
          </div>
        </Cell>
      ))}

      <Cell index={stats.length} className="flex flex-col justify-center">
        <div className="text-[14px] font-semibold">{site.licence.label}</div>
        <div className="mt-2 text-[11px] font-medium tracking-[0.16em] text-mist-deep">
          LIC. {site.licence.number}
        </div>
      </Cell>
    </section>
  );
}

function Cell({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={["px-6 py-[38px]", cellStyles[index], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
