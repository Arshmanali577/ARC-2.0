import Link from "next/link";

import { ArrowDown } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { processSteps } from "@/content/process";

/**
 * A jump strip under the masthead. Built entirely from the stage numbers and
 * titles the page already carries, it turns a long read into something the
 * visitor can navigate — and shows the whole journey at a glance before they
 * commit to scrolling it.
 */
export function StageIndex() {
  return (
    <Section
      as="nav"
      aria-label="Jump to a stage"
      size="tight"
      className="bg-surface"
    >
      <ol className="m-0 grid list-none grid-cols-1 gap-px bg-line-soft p-0 tab:grid-cols-2 wide:grid-cols-4">
        {processSteps.map((step) => (
          <li key={step.id}>
            <Link
              href={`#stage-${step.id}`}
              className="group flex h-full items-center justify-between gap-6 bg-surface px-6 py-6 transition-colors duration-300 ease-out hover:bg-white nav:px-7"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-display text-[20px] leading-none text-faint transition-colors duration-300 ease-out group-hover:text-brand">
                  {String(step.id).padStart(2, "0")}
                </span>
                <span className="font-display text-[19px] leading-[1.2] text-brand nav:text-[20px]">
                  {step.title}
                </span>
              </span>
              <ArrowDown
                size={16}
                className="shrink-0 text-faint transition-[color,transform] duration-300 ease-out group-hover:translate-y-0.5 group-hover:text-brand"
              />
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
