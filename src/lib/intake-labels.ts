import type { IntakeFormValues } from "@/lib/intake-schema";
import {
  budgetValues,
  companySizeValues,
  serviceTypeValues,
  timelineValues,
  urgencyValues,
} from "@/lib/intake-schema";

type ServiceType = (typeof serviceTypeValues)[number];
type Budget = (typeof budgetValues)[number];
type Urgency = (typeof urgencyValues)[number];
type Timeline = (typeof timelineValues)[number];
type CompanySize = (typeof companySizeValues)[number];

const serviceTypeLabels: Record<ServiceType, string> = {
  consulting: "Strategy / consulting",
  implementation: "Implementation or build",
  retainer: "Ongoing retainer",
  audit: "Assessment or audit",
  other: "Other",
};

const budgetLabels: Record<Budget, string> = {
  under_5k: "Under $5,000",
  "5k_25k": "$5,000 – $25,000",
  "25k_100k": "$25,000 – $100,000",
  "100k_plus": "$100,000+",
  unsure: "Not sure yet",
};

const urgencyLabels: Record<Urgency, string> = {
  low: "Low — planning ahead",
  medium: "Medium — this quarter",
  high: "High — within weeks",
  critical: "Critical — ASAP",
};

const timelineLabels: Record<Timeline, string> = {
  asap: "ASAP",
  one_to_three_months: "1–3 months",
  three_to_six_months: "3–6 months",
  six_plus_months: "6+ months",
  exploring: "Just exploring",
};

const companySizeLabels: Record<CompanySize, string> = {
  solo: "Solo / freelancer",
  "2_10": "2 – 10",
  "11_50": "11 – 50",
  "51_200": "51 – 200",
  "201_plus": "201+",
};

export function labelServiceType(value: ServiceType): string {
  return serviceTypeLabels[value];
}

export function labelBudget(value: Budget): string {
  return budgetLabels[value];
}

export function labelUrgency(value: Urgency): string {
  return urgencyLabels[value];
}

export function labelTimeline(value: Timeline): string {
  return timelineLabels[value];
}

export function labelCompanySize(value: CompanySize): string {
  return companySizeLabels[value];
}

export function formatIntakeSummary(values: IntakeFormValues): string {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Company: ${values.company}`,
    `Service: ${labelServiceType(values.serviceType)}`,
    `Description: ${values.description}`,
    `Budget: ${labelBudget(values.budget)}`,
    `Urgency: ${labelUrgency(values.urgency)}`,
    `Timeline: ${labelTimeline(values.timeline)}`,
    `Company size: ${labelCompanySize(values.companySize)}`,
  ];
  return lines.join("\n");
}
