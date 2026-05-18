import { computeLeadScore } from "@/lib/lead-score";
import type { StoredLead } from "@/types/lead";

function daysAgo(days: number, hour = 10, minute = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

/** Analytics-focused demo leads for first-load dashboard preview. */
const seedLeadData: Omit<StoredLead, "score">[] = [
  {
    id: "seed-01",
    createdAt: daysAgo(3),
    status: "qualified",
    name: "Sarah Chen",
    email: "sarah.chen@northline.studio",
    phone: "+1 415 555 0142",
    company: "Northline Studio",
    serviceType: "consulting",
    description:
      "Analytics consulting engagement to unify marketing, sales, and product funnels into a single executive dashboard.",
    budget: "25k_100k",
    urgency: "high",
    timeline: "one_to_three_months",
    companySize: "11_50",
  },
  {
    id: "seed-02",
    createdAt: daysAgo(6),
    status: "contacted",
    name: "Marcus Webb",
    email: "marcus@webbpartners.co",
    phone: "+1 312 555 0198",
    company: "Webb & Partners",
    serviceType: "implementation",
    description:
      "AI automation for document intake, classification, and routing across a 120-person professional services firm.",
    budget: "25k_100k",
    urgency: "medium",
    timeline: "three_to_six_months",
    companySize: "51_200",
  },
  {
    id: "seed-03",
    createdAt: daysAgo(9),
    status: "new",
    name: "Elena Rodriguez",
    email: "elena@harborlogistics.com",
    phone: "+1 786 555 0127",
    company: "Harbor Logistics",
    serviceType: "audit",
    description:
      "Data analytics assessment of warehouse throughput, carrier SLAs, and regional delivery performance.",
    budget: "5k_25k",
    urgency: "medium",
    timeline: "one_to_three_months",
    companySize: "11_50",
  },
  {
    id: "seed-04",
    createdAt: daysAgo(12),
    status: "qualified",
    name: "James Okonkwo",
    email: "james@okonkwoadvisory.com",
    phone: "+1 646 555 0163",
    company: "Okonkwo Advisory",
    serviceType: "consulting",
    description:
      "Analytics consulting to model customer churn and expansion revenue for a B2B SaaS portfolio.",
    budget: "25k_100k",
    urgency: "high",
    timeline: "one_to_three_months",
    companySize: "2_10",
  },
  {
    id: "seed-05",
    createdAt: daysAgo(16),
    status: "contacted",
    name: "Priya Nair",
    email: "priya.nair@brightpath.health",
    phone: "+1 617 555 0184",
    company: "Brightpath Health",
    serviceType: "implementation",
    description:
      "AI automation for prior-authorization triage and clinical ops alerts across three clinic regions.",
    budget: "25k_100k",
    urgency: "high",
    timeline: "three_to_six_months",
    companySize: "51_200",
  },
  {
    id: "seed-06",
    createdAt: daysAgo(20),
    status: "lost",
    name: "Tom Bradley",
    email: "tom@bradleyhomeservices.com",
    phone: "+1 503 555 0119",
    company: "Bradley Home Services",
    serviceType: "audit",
    description:
      "Explored a lightweight data analytics pilot for job scheduling; paused until next fiscal year.",
    budget: "5k_25k",
    urgency: "low",
    timeline: "six_plus_months",
    companySize: "solo",
  },
  {
    id: "seed-07",
    createdAt: daysAgo(24),
    status: "new",
    name: "Amanda Foster",
    email: "afoster@fosterlegalgroup.com",
    phone: "+1 214 555 0136",
    company: "Foster Legal Group",
    serviceType: "consulting",
    description:
      "Analytics consulting to benchmark matter profitability and intake conversion by practice area.",
    budget: "25k_100k",
    urgency: "medium",
    timeline: "three_to_six_months",
    companySize: "11_50",
  },
  {
    id: "seed-08",
    createdAt: daysAgo(28),
    status: "contacted",
    name: "David Kim",
    email: "david@kimdigital.io",
    phone: "+1 206 555 0171",
    company: "Kim Digital",
    serviceType: "implementation",
    description:
      "AI automation for paid-media reporting, creative tagging, and weekly performance summaries.",
    budget: "5k_25k",
    urgency: "high",
    timeline: "one_to_three_months",
    companySize: "2_10",
  },
  {
    id: "seed-09",
    createdAt: daysAgo(33),
    status: "qualified",
    name: "Rachel Morrison",
    email: "rachel@meridianretail.com",
    phone: "+1 404 555 0155",
    company: "Meridian Retail",
    serviceType: "audit",
    description:
      "Data analytics review of store-level inventory, markdowns, and same-store sales drivers.",
    budget: "25k_100k",
    urgency: "medium",
    timeline: "three_to_six_months",
    companySize: "201_plus",
  },
  {
    id: "seed-10",
    createdAt: daysAgo(40),
    status: "new",
    name: "Omar Hassan",
    email: "omar@vertexfintech.com",
    phone: "+1 646 555 0188",
    company: "Vertex Fintech",
    serviceType: "implementation",
    description:
      "AI automation for KYC document review and exception routing in an onboarding workflow.",
    budget: "25k_100k",
    urgency: "critical",
    timeline: "one_to_three_months",
    companySize: "51_200",
  },
  {
    id: "seed-11",
    createdAt: daysAgo(48),
    status: "lost",
    name: "Lisa Park",
    email: "lisa@greenfieldcoop.org",
    phone: "+1 612 555 0124",
    company: "Greenfield Cooperative",
    serviceType: "consulting",
    description:
      "Analytics consulting for member engagement was deferred after internal reorganization.",
    budget: "5k_25k",
    urgency: "low",
    timeline: "six_plus_months",
    companySize: "11_50",
  },
  {
    id: "seed-12",
    createdAt: daysAgo(56),
    status: "qualified",
    name: "Daniel Reyes",
    email: "daniel@atlasmanufacturing.com",
    phone: "+1 713 555 0167",
    company: "Atlas Manufacturing",
    serviceType: "audit",
    description:
      "Data analytics baseline for production downtime, scrap rates, and supplier quality scorecards.",
    budget: "25k_100k",
    urgency: "medium",
    timeline: "three_to_six_months",
    companySize: "201_plus",
  },
];

export function getSeedLeads(): StoredLead[] {
  return seedLeadData.map((lead) => ({
    ...lead,
    score: computeLeadScore(lead),
  }));
}
