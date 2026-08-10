export type BuildType = "single-storey" | "double-storey" | "custom";

export type InclusionStatus = "included" | "allowance" | "upgrade" | "excluded";
export type SelectionMode = "fixed" | "allowance-upgrade" | "optional-upgrade";

export type InclusionPackage = {
  id: "essential" | "signature" | "luxury";
  name: string;
  description: string;
  basePrice: number;
  highlights: string[];
};

export type InclusionRow = {
  item: string;
  baseStatus: InclusionStatus;
  selectionMode: SelectionMode;
  allowance: string;
  upgradeOption: string;
  notes: string;
  upgradeCost?: number;
};

export type InclusionSection = {
  id: string;
  title: string;
  rows: InclusionRow[];
};

export type RowSelectionValue = "included" | "excluded" | "allowance" | "upgrade" | "not-selected";

export type InclusionSelectionMap = Record<string, RowSelectionValue>;

export type InclusionRowDecision = {
  key: string;
  sectionId: string;
  sectionTitle: string;
  item: string;
  status: InclusionStatus;
  allowance: string;
  upgradeOption: string;
  notes: string;
  selectionMode: SelectionMode;
  selectedLabel: string;
  costImpact: number;
};

export const buildTypeAdjustmentMap: Record<BuildType, { label: string; amount: number }> = {
  "single-storey": {
    label: "Single Storey",
    amount: 0,
  },
  "double-storey": {
    label: "Double Storey",
    amount: 152000,
  },
  custom: {
    label: "Complete Custom",
    amount: 0,
  },
};

export const publicBasePricing = [
  {
    label: "Single Storey Essential Living",
    amount: 284000,
    detail: "Base price - 180 sqm",
  },
  {
    label: "Double Storey Essential Living",
    amount: 436000,
    detail: "Base price - 220 sqm",
  },
];

export function getPackagePricingGuide(
  packageId: InclusionPackage["id"],
  buildType: BuildType
) {
  if (buildType === "custom") {
    return {
      amount: null,
      label: "Custom Build",
      detail: "Complete custom pricing is prepared after your consultant meeting.",
    };
  }

  if (packageId === "essential") {
    if (buildType === "double-storey") {
      return {
        amount: 436000,
        label: "Double Storey Essential Living",
        detail: "Base price - 220 sqm",
      };
    }

    return {
      amount: 284000,
      label: "Single Storey Essential Living",
      detail: "Base price - 180 sqm",
    };
  }

  return {
    amount: null,
    label: packageId === "signature" ? "Signature Family" : "Luxury Statement",
    detail: "Pricing is finalised with your consultant after scope review.",
  };
}

export const consultantPricingNotes = [
  "Signature Family and Luxury Statement pricing is shared after consultant review.",
  "Additional inclusions and upgrade selections are priced during your consultant meeting or call.",
  "Custom homes are fully tailored and priced after design consultation.",
];

export const inclusionStatusMeta: Record<
  InclusionStatus,
  { label: string; className: string }
> = {
  included: {
    label: "Included",
    className: "bg-[#ecf4ee] text-[#215732] border border-[#cde2d2]",
  },
  allowance: {
    label: "Allowance",
    className: "bg-[#f6efe3] text-[#6b5330] border border-[#d9c1a1]",
  },
  upgrade: {
    label: "Upgrade",
    className: "bg-[#f2ecff] text-[#4d2d80] border border-[#dbcefb]",
  },
  excluded: {
    label: "Excluded",
    className: "bg-[#ffe9e9] text-[#8b2020] border border-[#f8cfcf]",
  },
};

export const inclusionPackages: InclusionPackage[] = [
  {
    id: "essential",
    name: "Essential Living",
    description: "Practical and efficient inclusions for value-focused builds.",
    basePrice: 284000,
    highlights: [
      "Engineer-certified slab and structural framing",
      "Builder range finishes with compliant specification",
      "Core kitchen, wet area and electrical fit-off",
      "NCC and energy compliance baseline",
    ],
  },
  {
    id: "signature",
    name: "Signature Family",
    description: "Balanced package with higher-spec finishes and consultant-led pricing.",
    basePrice: 385000,
    highlights: [
      "Upgraded cabinetry and kitchen specification",
      "Enhanced electrical and comfort selections",
      "Improved facade and finish options",
      "Most popular package for family builds",
    ],
  },
  {
    id: "luxury",
    name: "Luxury Statement",
    description: "Design-led premium package with pricing finalised after scope review.",
    basePrice: 450000,
    highlights: [
      "High-spec kitchen and bathroom inclusions",
      "Premium facade and internal finish pathways",
      "Advanced comfort and smart-home readiness",
      "Expanded designer selection options",
    ],
  },
];

export const inclusionSections: InclusionSection[] = [
  {
    id: "plans-compliance",
    title: "Plans, Compliance and Warranty",
    rows: [
      {
        item: "Engineer certified frame and trusses",
        baseStatus: "included",
        selectionMode: "fixed",
        allowance: "-",
        upgradeOption: "-",
        notes: "Mandatory technical scope. Cannot be removed.",
      },
      {
        item: "Council approvals and compliance documentation",
        baseStatus: "included",
        selectionMode: "fixed",
        allowance: "Standard authority process",
        upgradeOption: "Expedited pathway where available",
        notes: "Regulatory requirement and always included.",
      },
      {
        item: "Soil and footing scope",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "M class site allowance",
        upgradeOption: "Piers / upgraded footing solution",
        notes: "Final requirement depends on engineering and site report.",
        upgradeCost: 4500,
      },
    ],
  },
  {
    id: "site-works",
    title: "Site Works and Preparation",
    rows: [
      {
        item: "Site cut and fill",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "Up to 500mm fall",
        upgradeOption: "Additional earthworks allowance",
        notes: "Subject to final levels and geotech outcomes.",
        upgradeCost: 3200,
      },
      {
        item: "Build platform preparation",
        baseStatus: "included",
        selectionMode: "fixed",
        allowance: "-",
        upgradeOption: "-",
        notes: "Standard setup included in base contract.",
      },
      {
        item: "Retaining walls",
        baseStatus: "excluded",
        selectionMode: "optional-upgrade",
        allowance: "-",
        upgradeOption: "Timber / concrete retaining package",
        notes: "Only included when selected and quoted.",
        upgradeCost: 7800,
      },
    ],
  },
  {
    id: "structure-envelope",
    title: "Slab, Framing and External Envelope",
    rows: [
      {
        item: "Engineer-designed slab with termite barrier",
        baseStatus: "included",
        selectionMode: "fixed",
        allowance: "One concrete pump allowance",
        upgradeOption: "-",
        notes: "Mandatory structural scope with code compliance.",
      },
      {
        item: "Roofing specification",
        baseStatus: "included",
        selectionMode: "allowance-upgrade",
        allowance: "Builder roof tile / Colorbond range",
        upgradeOption: "Premium profile and color group",
        notes: "Facade and design dependent.",
        upgradeCost: 2800,
      },
      {
        item: "Window and glazing performance",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "Standard compliant glazing",
        upgradeOption: "Acoustic / high-performance glazing",
        notes: "Subject to orientation and performance assessment.",
        upgradeCost: 5400,
      },
    ],
  },
  {
    id: "interior-kitchen-bath",
    title: "Interior Finishes, Kitchen and Wet Areas",
    rows: [
      {
        item: "Main flooring finish",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "Builder ceramic tile range",
        upgradeOption: "Premium tile or timber-grade finish",
        notes: "Difference charged as variation.",
        upgradeCost: 3600,
      },
      {
        item: "Bedroom carpet allowance",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "$35 per sqm carpet",
        upgradeOption: "Premium wool / solution-dyed nylon",
        notes: "Rate differential applies to selected area.",
        upgradeCost: 4200,
      },
      {
        item: "Kitchen benchtop specification",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "20mm engineered stone",
        upgradeOption: "40mm stone / natural stone",
        notes: "Applies to selected profile and area.",
        upgradeCost: 4800,
      },
      {
        item: "Feature bathroom fixture package",
        baseStatus: "excluded",
        selectionMode: "optional-upgrade",
        allowance: "-",
        upgradeOption: "Freestanding bath and premium tapware",
        notes: "Optional selection only.",
        upgradeCost: 5200,
      },
    ],
  },
  {
    id: "services-comfort",
    title: "Electrical, Plumbing and Comfort",
    rows: [
      {
        item: "Electrical points and safety devices",
        baseStatus: "included",
        selectionMode: "fixed",
        allowance: "As per standard electrical plan",
        upgradeOption: "-",
        notes: "Minimum points and protection are mandatory.",
      },
      {
        item: "Smart home pre-wire package",
        baseStatus: "excluded",
        selectionMode: "optional-upgrade",
        allowance: "-",
        upgradeOption: "Smart pre-wire and control points",
        notes: "Optional and client selected only.",
        upgradeCost: 2900,
      },
      {
        item: "Ducted air-conditioning zoning",
        baseStatus: "allowance",
        selectionMode: "allowance-upgrade",
        allowance: "14kW / 4-zone baseline",
        upgradeOption: "Additional zoning and control upgrade",
        notes: "Final sizing remains design specific.",
        upgradeCost: 2600,
      },
    ],
  },
];

export const explicitExclusions = [
  "Landscaping, fencing, letterbox, clothesline and loose furniture.",
  "Pool works and associated engineering unless quoted separately.",
  "Council/authority escalations and latent site conditions.",
  "Rock excavation and abnormal ground treatments.",
  "Custom fixtures or branded products outside approved ranges.",
];

export function getRowKey(sectionId: string, rowIndex: number) {
  return `${sectionId}:${rowIndex}`;
}

export function createDefaultSelections() {
  const selections: InclusionSelectionMap = {};

  inclusionSections.forEach((section) => {
    section.rows.forEach((row, rowIndex) => {
      const key = getRowKey(section.id, rowIndex);
      if (row.selectionMode === "fixed") {
        selections[key] = row.baseStatus === "included" ? "included" : "excluded";
      } else if (row.selectionMode === "allowance-upgrade") {
        selections[key] = "allowance";
      } else {
        selections[key] = "not-selected";
      }
    });
  });

  return selections;
}

export function buildInclusionSummary(
  packageId: InclusionPackage["id"],
  buildType: BuildType,
  selections: InclusionSelectionMap
) {
  const selectedPackage =
    inclusionPackages.find((item) => item.id === packageId) || inclusionPackages[1];
  const buildTypeAdjustment = buildTypeAdjustmentMap[buildType]?.amount || 0;

  const decisions: InclusionRowDecision[] = [];
  let upgradesTotal = 0;

  inclusionSections.forEach((section) => {
    section.rows.forEach((row, rowIndex) => {
      const key = getRowKey(section.id, rowIndex);
      const choice = selections[key];

      let status: InclusionStatus = row.baseStatus;
      let selectedLabel = "Locked";
      let costImpact = 0;

      if (row.selectionMode === "fixed") {
        status = row.baseStatus;
        selectedLabel = "Mandatory";
      } else if (row.selectionMode === "allowance-upgrade") {
        if (choice === "upgrade") {
          status = "upgrade";
          selectedLabel = "Upgrade selected";
          costImpact = row.upgradeCost || 0;
        } else {
          status = "allowance";
          selectedLabel = "Allowance selected";
        }
      } else {
        if (choice === "upgrade") {
          status = "upgrade";
          selectedLabel = "Included as optional upgrade";
          costImpact = row.upgradeCost || 0;
        } else {
          status = "excluded";
          selectedLabel = "Not selected";
        }
      }

      upgradesTotal += costImpact;

      decisions.push({
        key,
        sectionId: section.id,
        sectionTitle: section.title,
        item: row.item,
        status,
        allowance: row.allowance,
        upgradeOption: row.upgradeOption,
        notes: row.notes,
        selectionMode: row.selectionMode,
        selectedLabel,
        costImpact,
      });
    });
  });

  const selectedUpgrades = decisions.filter((item) => item.costImpact > 0);

  return {
    selectedPackage,
    decisions,
    selectedUpgrades,
    buildTypeAdjustment,
    upgradesTotal,
    estimatedTotal: selectedPackage.basePrice + buildTypeAdjustment + upgradesTotal,
  };
}
