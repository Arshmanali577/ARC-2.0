"use client";

import { useMemo, useState } from "react";

import { inclusionsPage } from "@/content/pages";
import {
  buildInclusionSummary,
  buildTypeAdjustmentMap,
  consultantPricingNotes,
  createDefaultSelections,
  explicitExclusions,
  getPackagePricingGuide,
  getRowKey,
  inclusionPackages,
  inclusionSections,
  inclusionStatusMeta,
  publicBasePricing,
  type BuildType,
  type InclusionPackage,
  type InclusionSelectionMap,
} from "@/content/inclusions";
import { cn } from "@/lib/cn";

const { setup, selectionLabels, snapshot } = inclusionsPage;

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

const fieldClass =
  "w-full border border-line-strong bg-white px-4 py-3.5 text-[16px] text-brand outline-none transition-colors duration-250 ease-out focus:border-brand";
const labelClass =
  "block text-[12px] font-semibold uppercase tracking-[0.16em] text-muted";

const buildTypes: BuildType[] = ["single-storey", "double-storey", "custom"];

export function InclusionsTool() {
  const [buildType, setBuildType] = useState<BuildType>("single-storey");
  const [packageId, setPackageId] =
    useState<InclusionPackage["id"]>("essential");
  const [selections, setSelections] = useState<InclusionSelectionMap>(() =>
    createDefaultSelections(),
  );
  const [acknowledged, setAcknowledged] = useState<boolean[]>(
    snapshot.acknowledgements.map(() => false),
  );

  const summary = useMemo(
    () => buildInclusionSummary(packageId, buildType, selections),
    [packageId, buildType, selections],
  );

  const pricingGuide = getPackagePricingGuide(packageId, buildType);

  const setRow = (key: string, value: InclusionSelectionMap[string]) =>
    setSelections((current) => ({ ...current, [key]: value }));

  return (
    <>
      {/* -- Assurances ---------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-px bg-line-soft nav:grid-cols-3">
        {inclusionsPage.assurances.map((item) => (
          <div key={item.title} className="bg-white px-7 py-8">
            <h2 className="m-0 text-[18px] font-semibold text-brand">
              {item.title}
            </h2>
            <p className="m-0 mt-2.5 text-[16px] leading-[1.65] text-body">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      {/* -- Project setup ------------------------------------------------- */}
      <section className="mt-[72px]">
        <h2 className="m-0 font-display text-[clamp(27px,8vw,34px)] font-normal leading-[1.1] tracking-[-0.02em]">
          {setup.heading}
        </h2>
        <p className="m-0 mt-5 max-w-[720px] text-[18px] leading-[1.75] text-body">
          {setup.lead}
        </p>

        <div className="mt-8 border border-line bg-surface p-7">
          <h3 className="m-0 text-[12px] font-semibold uppercase tracking-[0.28em] text-muted">
            {setup.howToHeading}
          </h3>
          <p className="m-0 mt-3.5 text-[16px] leading-[1.7] text-body">
            {setup.howTo}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-6 nav:grid-cols-2 wide:grid-cols-4">
          {(
            [
              ["customerName", setup.fields.customerName, "text"],
              ["email", setup.fields.email, "email"],
              ["phone", setup.fields.phone, "tel"],
              ["suburb", setup.fields.suburb, "text"],
            ] as const
          ).map(([name, label, type]) => (
            <div key={name}>
              <label className={labelClass} htmlFor={name}>
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                className={`${fieldClass} mt-2.5`}
              />
            </div>
          ))}
        </div>

        <fieldset className="m-0 mt-10 border-0 p-0">
          <legend className={labelClass}>{setup.fields.buildType}</legend>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {buildTypes.map((type) => (
              <Choice
                key={type}
                active={buildType === type}
                onClick={() => setBuildType(type)}
              >
                {buildTypeAdjustmentMap[type].label}
              </Choice>
            ))}
          </div>
          <p className="m-0 mt-4 max-w-[720px] text-[16px] leading-[1.7] text-body">
            {setup.buildTypeNote}
          </p>
        </fieldset>

        <fieldset className="m-0 mt-10 border-0 p-0">
          <legend className={labelClass}>{setup.fields.package}</legend>
          <div className="mt-4 grid grid-cols-1 gap-6 nav:grid-cols-3">
            {inclusionPackages.map((item) => {
              const guide = getPackagePricingGuide(item.id, buildType);
              const active = packageId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPackageId(item.id)}
                  className={cn(
                    "flex flex-col border p-7 text-left transition duration-250 ease-out",
                    active
                      ? "border-brand bg-surface"
                      : "border-line hover:border-brand",
                  )}
                >
                  <span className="font-display text-[24px] leading-[1.2]">
                    {item.name}
                  </span>
                  <span className="mt-3 text-[16px] leading-[1.65] text-body">
                    {item.description}
                  </span>
                  <span className="mt-5 text-[14px] font-semibold uppercase tracking-[0.12em] text-brand">
                    {guide.amount === null
                      ? "Pricing shared with consultant after scope review"
                      : `${currency.format(guide.amount)} · ${guide.detail}`}
                  </span>
                  <ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0 text-[16px] leading-[1.6] text-body">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="grid grid-cols-[16px_1fr] gap-3">
                        <span aria-hidden className="text-brand">
                          →
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </fieldset>
      </section>

      {/* -- Inclusion schedule -------------------------------------------- */}
      {inclusionSections.map((section) => (
        <section key={section.id} className="mt-[72px]">
          <h2 className="m-0 border-b border-line pb-5 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.15]">
            {section.title}
          </h2>

          <div className="border-b border-line">
            {section.rows.map((row, rowIndex) => {
              const key = getRowKey(section.id, rowIndex);
              const choice = selections[key];
              const status =
                row.selectionMode === "fixed"
                  ? row.baseStatus
                  : choice === "upgrade"
                    ? "upgrade"
                    : row.selectionMode === "allowance-upgrade"
                      ? "allowance"
                      : "excluded";

              return (
                <div
                  key={key}
                  className="grid grid-cols-1 gap-6 border-b border-line py-8 nav:grid-cols-[1.2fr_1fr_1fr_auto] nav:gap-10"
                >
                  <div>
                    <h3 className="m-0 text-[18px] font-semibold text-brand">
                      {row.item}
                    </h3>
                    <span
                      className={cn(
                        "mt-3 inline-block px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]",
                        inclusionStatusMeta[status].className,
                      )}
                    >
                      {inclusionStatusMeta[status].label}
                    </span>
                  </div>

                  <div className="text-[16px] leading-[1.65] text-body">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-faint">
                      Allowance
                    </span>
                    <span className="mt-2 block">{row.allowance}</span>
                  </div>

                  <div className="text-[16px] leading-[1.65] text-body">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-faint">
                      Upgrade option
                    </span>
                    <span className="mt-2 block">{row.upgradeOption}</span>
                    <span className="mt-2 block text-[15px] text-muted">
                      {row.notes}
                    </span>
                    {row.upgradeCost ? (
                      <span className="mt-2 block text-[15px] font-semibold text-brand">
                        {currency.format(row.upgradeCost)}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-start gap-2.5">
                    {row.selectionMode === "fixed" ? (
                      <span className="border border-line px-5 py-3.5 text-[14px] uppercase tracking-[0.12em] text-muted">
                        {selectionLabels.locked}
                      </span>
                    ) : row.selectionMode === "allowance-upgrade" ? (
                      <>
                        <Choice
                          active={choice !== "upgrade"}
                          onClick={() => setRow(key, "allowance")}
                        >
                          {selectionLabels.standard}
                        </Choice>
                        <Choice
                          active={choice === "upgrade"}
                          onClick={() => setRow(key, "upgrade")}
                        >
                          {selectionLabels.upgrade}
                        </Choice>
                      </>
                    ) : (
                      <>
                        <Choice
                          active={choice !== "upgrade"}
                          onClick={() => setRow(key, "not-selected")}
                        >
                          {selectionLabels.exclude}
                        </Choice>
                        <Choice
                          active={choice === "upgrade"}
                          onClick={() => setRow(key, "upgrade")}
                        >
                          {selectionLabels.include}
                        </Choice>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* -- Exclusions ----------------------------------------------------- */}
      <section className="mt-[72px]">
        <h2 className="m-0 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.15]">
          {inclusionsPage.exclusionsHeading}
        </h2>
        <p className="m-0 mt-4 max-w-[720px] text-[18px] leading-[1.75] text-body">
          {inclusionsPage.exclusionsLead}
        </p>
        <ul className="m-0 mt-7 flex list-none flex-col border-t border-line p-0">
          {explicitExclusions.map((item) => (
            <li
              key={item}
              className="border-b border-line py-4 text-[17px] leading-[1.6] text-body"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* -- Snapshot ------------------------------------------------------- */}
      <section className="mt-[72px] bg-surface p-8 nav:p-12">
        <h2 className="m-0 font-display text-[clamp(25px,7vw,30px)] font-normal leading-[1.15]">
          {snapshot.heading}
        </h2>
        <p className="m-0 mt-4 max-w-[720px] text-[18px] leading-[1.75] text-body">
          {snapshot.lead}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-11 nav:grid-cols-2">
          <div>
            <h3 className="m-0 text-[12px] font-semibold uppercase tracking-[0.28em] text-muted">
              {snapshot.guideLabel}
            </h3>
            <p className="m-0 mt-5 text-[18px] font-semibold text-brand">
              {pricingGuide.label}
            </p>
            <p className="m-0 mt-1.5 text-[16px] text-body">
              {pricingGuide.detail}
            </p>
            <p className="m-0 mt-5 font-display text-[clamp(31px,9.5vw,40px)] leading-none text-brand">
              {pricingGuide.amount === null
                ? "—"
                : currency.format(pricingGuide.amount)}
            </p>

            <h3 className="m-0 mt-10 text-[12px] font-semibold uppercase tracking-[0.28em] text-muted">
              {snapshot.officialLabel}
            </h3>
            <ul className="m-0 mt-5 flex list-none flex-col border-t border-line p-0">
              {publicBasePricing.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-3.5 text-[16px] text-body"
                >
                  <span>
                    {item.label}
                    <span className="ml-2 text-[15px] text-muted">
                      {item.detail}
                    </span>
                  </span>
                  <span className="font-semibold text-brand">
                    {currency.format(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0 text-[16px] leading-[1.7] text-muted">
              {consultantPricingNotes.map((note) => (
                <li key={note}>- {note}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="m-0 text-[12px] font-semibold uppercase tracking-[0.28em] text-muted">
              {snapshot.selectionsLabel}
            </h3>

            {summary.selectedUpgrades.length === 0 ? (
              <p className="m-0 mt-5 text-[17px] leading-[1.7] text-body">
                {snapshot.emptySelections}
              </p>
            ) : (
              <ul className="m-0 mt-5 flex list-none flex-col border-t border-line p-0">
                {summary.selectedUpgrades.map((item) => (
                  <li
                    key={item.key}
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-3.5 text-[16px] text-body"
                  >
                    <span>
                      {item.item}
                      <span className="ml-2 text-[15px] text-muted">
                        {item.sectionTitle}
                      </span>
                    </span>
                    <span className="font-semibold text-brand">
                      {currency.format(item.costImpact)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-9 flex flex-col gap-3.5">
              {snapshot.acknowledgements.map((item, index) => (
                <label
                  key={item}
                  className="flex items-start gap-3.5 text-[16px] leading-[1.6] text-body"
                >
                  <input
                    type="checkbox"
                    checked={acknowledged[index]}
                    onChange={(event) =>
                      setAcknowledged((current) =>
                        current.map((value, position) =>
                          position === index ? event.target.checked : value,
                        ),
                      )
                    }
                    className="mt-1 h-4 w-4 accent-brand"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "border px-5 py-3.5 text-[14px] uppercase tracking-[0.12em] transition duration-250 ease-out",
        active
          ? "border-brand bg-brand text-white"
          : "border-line-strong text-brand hover:border-brand",
      )}
    >
      {children}
    </button>
  );
}
