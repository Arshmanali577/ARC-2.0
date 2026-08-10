import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  consultantPricingNotes,
  explicitExclusions,
  inclusionStatusMeta,
  publicBasePricing,
  type InclusionRowDecision,
} from "@/lib/inclusions";
import { companyInfo } from "@/lib/data";

export type SelectedPackage = {
  id?: string;
  name: string;
  basePrice: number;
  highlights: string[];
};

export type SelectedUpgrade = InclusionRowDecision;

export type InclusionPdfPayload = {
  customerName?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  buildType?: string;
  estimatedTotal: number;
  buildTypeAdjustment?: number;
  upgradesTotal?: number;
  selectedPackage: SelectedPackage;
  decisions: InclusionRowDecision[];
  selectedUpgrades: SelectedUpgrade[];
  generatedAt: string;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    fontSize: 10,
    lineHeight: 1.45,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerMain: {
    flexGrow: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 21,
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 9.4,
    lineHeight: 1.35,
    color: "#444",
    maxWidth: 355,
  },
  brand: {
    textAlign: "right",
  },
  brandName: {
    fontSize: 16,
    fontWeight: 700,
  },
  brandMeta: {
    marginTop: 5,
    fontSize: 9,
    color: "#666",
  },
  rule: {
    height: 1,
    backgroundColor: "#c6a87d",
    marginVertical: 10,
  },
  metaGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  metaCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e4e4e4",
    padding: 8,
  },
  metaLabel: {
    fontSize: 8,
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 10,
    fontWeight: 700,
  },
  twoCol: {
    flexDirection: "row",
    gap: 18,
  },
  col: {
    flex: 1,
  },
  sectionWrap: {
    marginBottom: 6,
  },
  sectionHeading: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  bullet: {
    fontSize: 9.5,
    marginBottom: 2.5,
    color: "#2f2f2f",
  },
  summaryPanel: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 10,
    marginTop: 6,
  },
  summaryTitle: {
    fontSize: 9,
    textTransform: "uppercase",
    color: "#666",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 700,
  },
  legalBlock: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
    paddingTop: 8,
  },
  legalText: {
    fontSize: 7.8,
    color: "#676767",
    lineHeight: 1.35,
  },
  footerLine: {
    marginTop: 7,
    fontSize: 8,
    color: "#666",
  },
  rowLine: {
    fontSize: 8.5,
    lineHeight: 1.24,
    marginBottom: 2,
    color: "#2f2f2f",
  },
  statusInlineBase: {
    fontSize: 7.1,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.2,
    paddingVertical: 1.1,
    paddingHorizontal: 2.6,
    borderWidth: 1,
  },
  statusInlineIncluded: {
    backgroundColor: "#ecf4ee",
    borderColor: "#cde2d2",
    color: "#215732",
  },
  statusInlineAllowance: {
    backgroundColor: "#f6efe5",
    borderColor: "#c6a87d",
    color: "#6b5330",
  },
  statusInlineUpgrade: {
    backgroundColor: "#f2ecff",
    borderColor: "#dbcefb",
    color: "#4d2d80",
  },
  statusInlineExcluded: {
    backgroundColor: "#ffe9e9",
    borderColor: "#f8cfcf",
    color: "#8b2020",
  },
});

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

function decisionText(decision: InclusionRowDecision) {
  if (decision.status === "upgrade") {
    return `${decision.item}: Selected ${decision.upgradeOption}.`;
  }

  if (decision.status === "allowance") {
    return `${decision.item}: Allowance range ${decision.allowance}.`;
  }

  if (decision.status === "excluded") {
    return `${decision.item}: Excluded unless selected and quoted.`;
  }

  return `${decision.item}: Included as standard.`;
}

function statusChipStyle(status: InclusionRowDecision["status"]) {
  if (status === "included") {
    return styles.statusInlineIncluded;
  }
  if (status === "allowance") {
    return styles.statusInlineAllowance;
  }
  if (status === "upgrade") {
    return styles.statusInlineUpgrade;
  }
  return styles.statusInlineExcluded;
}

export function InclusionPdfDocument(payload: InclusionPdfPayload) {
  const customerName = payload.customerName?.trim() || "Prospective Customer";
  const generatedDate = payload.generatedAt ? new Date(payload.generatedAt) : null;
  const generatedOn = generatedDate && !Number.isNaN(generatedDate.getTime())
    ? generatedDate.toLocaleDateString("en-AU")
    : "N/A";

  const sectionGroups = payload.decisions.reduce<Record<string, InclusionRowDecision[]>>((acc, item) => {
    if (!acc[item.sectionTitle]) {
      acc[item.sectionTitle] = [];
    }
    acc[item.sectionTitle].push(item);
    return acc;
  }, {});

  const sectionEntries = Object.entries(sectionGroups);
  const midpoint = Math.ceil(sectionEntries.length / 2);
  const leftSections = sectionEntries.slice(0, midpoint);
  const rightSections = sectionEntries.slice(midpoint);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerMain}>
            <Text style={styles.title}>Premium Inclusions</Text>
            <Text style={styles.subtitle}>
              When you build with ARC Builders, you can expect transparent specifications, strong compliance standards,
              and exceptional workmanship from tender to handover.
            </Text>
          </View>
          <View style={styles.brand}>
            <Text style={styles.brandName}>ARC Builders</Text>
            <Text style={styles.brandMeta}>Effective from {generatedOn}</Text>
          </View>
        </View>

        <View style={styles.rule} />

        <View style={styles.metaGrid}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Prepared For</Text>
            <Text style={styles.metaValue}>{customerName}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Build Type</Text>
            <Text style={styles.metaValue}>{payload.buildType || "Custom"}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Selected Package</Text>
            <Text style={styles.metaValue}>{payload.selectedPackage.name}</Text>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            {leftSections.map(([title, rows]) => (
              <View key={title} style={styles.sectionWrap}>
                <Text style={styles.sectionHeading}>{title}</Text>
                {rows.map((row) => (
                  <View key={row.key} wrap={false}>
                    <Text style={styles.rowLine}>
                      <Text style={[styles.statusInlineBase, statusChipStyle(row.status)]}>
                        {inclusionStatusMeta[row.status].label}
                      </Text>
                      <Text> {decisionText(row)}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.col}>
            {rightSections.map(([title, rows]) => (
              <View key={title} style={styles.sectionWrap}>
                <Text style={styles.sectionHeading}>{title}</Text>
                {rows.map((row) => (
                  <View key={row.key} wrap={false}>
                    <Text style={styles.rowLine}>
                      <Text style={[styles.statusInlineBase, statusChipStyle(row.status)]}>
                        {inclusionStatusMeta[row.status].label}
                      </Text>
                      <Text> {decisionText(row)}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerMain}>
            <Text style={styles.title}>Selection Summary and Pricing Notes</Text>
            <Text style={styles.subtitle}>
              The summary below captures your selected inclusions and the approved public pricing guidance.
            </Text>
          </View>
          <View style={styles.brand}>
            <Text style={styles.brandName}>ARC Builders</Text>
            <Text style={styles.brandMeta}>QBCC Licence 15090326</Text>
          </View>
        </View>

        <View style={styles.rule} />

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Package Highlights</Text>
          {payload.selectedPackage.highlights.map((item) => (
            <Text key={item} style={styles.bullet}>- {item}</Text>
          ))}
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Selections for Consultant Review</Text>
          {payload.selectedUpgrades.length ? (
            payload.selectedUpgrades.map((item) => (
              <Text key={item.key} style={styles.bullet}>
                - {item.item} ({item.sectionTitle})
              </Text>
            ))
          ) : (
            <Text style={styles.bullet}>- No additional selections marked.</Text>
          )}
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Explicit Exclusions</Text>
          {explicitExclusions.map((item) => (
            <Text key={item} style={styles.bullet}>- {item}</Text>
          ))}
        </View>

        <View style={styles.summaryPanel}>
          <Text style={styles.summaryTitle}>Selected Package</Text>
          <Text>{payload.selectedPackage.name}</Text>
          <Text style={[styles.summaryTitle, { marginTop: 6 }]}>Build Type</Text>
          <Text>{payload.buildType || "Custom"}</Text>
          <Text style={[styles.summaryTitle, { marginTop: 8 }]}>Official Base Pricing</Text>
          {publicBasePricing.map((item) => (
            <Text key={item.label} style={styles.bullet}>
              - {item.label}: {formatCurrency(item.amount)} ({item.detail})
            </Text>
          ))}
          <Text style={[styles.summaryTitle, { marginTop: 8 }]}>Consultant Pricing Notes</Text>
          {consultantPricingNotes.map((note) => (
            <Text key={note} style={styles.bullet}>- {note}</Text>
          ))}
        </View>

        <View style={styles.legalBlock}>
          <Text style={styles.legalText}>
            Disclaimer: This document is a preliminary inclusion schedule and does not replace the final signed building
            contract, engineering certification, or statutory approvals. Final pricing, tailored inclusions, and any
            requested upgrades are confirmed during consultant review and formal tender documentation.
          </Text>
          <Text style={[styles.legalText, { marginTop: 5 }]}> 
            Product availability and supplier ranges may vary. Equivalent substitutions may be applied where required.
            Final scope is governed by signed tender and contract documentation.
          </Text>
        </View>

        <Text style={styles.footerLine}>
          {`${companyInfo.name} | ${companyInfo.address} | ${companyInfo.phone} | ${companyInfo.email}`}
        </Text>
      </Page>
    </Document>
  );
}
