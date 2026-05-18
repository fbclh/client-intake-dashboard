import { computeLeadScore } from "@/lib/lead-score";
import type { StoredLead } from "@/types/lead";

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(10, 30, 0, 0);
  return date.toISOString();
}

const demoLeadData: Omit<StoredLead, "score">[] = [
  {
    id: "demo-01",
    createdAt: daysAgo(1),
    status: "qualified",
    name: "Sarah Chen",
    email: "sarah.chen@northline.studio",
    phone: "+1 415 555 0142",
    company: "Northline Studio",
    serviceType: "implementation",
    description:
      "Marketing site rebuild with CMS, case studies, and lead capture for a 40-person creative agency.",
    budget: "25k_100k",
    urgency: "high",
    timeline: "one_to_three_months",
    companySize: "11_50",
  },
  {
    id: "demo-02",
    createdAt: daysAgo(2),
    status: "contacted",
    name: "Marcus Webb",
    email: "marcus@webbpartners.co",
    phone: "+1 312 555 0198",
    company: "Webb & Partners",
    serviceType: "consulting",
    description:
      "Quarterly ops review and workflow automation roadmap for a regional accounting firm.",
    budget: "25k_100k",
    urgency: "medium",
    timeline: "three_to_six_months",
    companySize: "51_200",
  },
  {
    id: "demo-03",
    createdAt: daysAgo(3),
    status: "new",
    name: "Elena Rodriguez",
    email: "elena@harborlogistics.com",
    phone: "+1 786 555 0127",
    company: "Harbor Logistics",
    serviceType: "audit",
    description:
      "Discovery on customer portal performance and onboarding friction across three regions.",
    budget: "5k_25k",
    urgency: "medium",
    timeline: "one_to_three_months",
    companySize: "11_50",
  },
  {
    id: "demo-04",
    createdAt: daysAgo(4),
    status: "qualified",
    name: "James Okonkwo",
    email: "james@okonkwoadvisory.com",
    phone: "+1 646 555 0163",
    company: "Okonkwo Advisory",
    serviceType: "retainer",
    description:
      "Ongoing product strategy and GTM support for enterprise SaaS expansion into financial services.",
    budget: "100k_plus",
    urgency: "critical",
    timeline: "asap",
    companySize: "2_10",
  },
  {
    id: "demo-05",
    createdAt: daysAgo(5),
    status: "contacted",
    name: "Priya Nair",
    email: "priya.nair@brightpath.health",
    phone: "+1 617 555 0184",
    company: "Brightpath Health",
    serviceType: "implementation",
    description:
      "HIPAA-aware intake forms and staff dashboard for a multi-clinic behavioral health group.",
    budget: "25k_100k",
    urgency: "high",
    timeline: "one_to_three_months",
    companySize: "51_200",
  },
  {
    id: "demo-06",
    createdAt: daysAgo(7),
    status: "lost",
    name: "Tom Bradley",
    email: "tom@bradleyhomeservices.com",
    phone: "+1 503 555 0119",
    company: "Bradley Home Services",
    serviceType: "other",
    description:
      "Explored a simple booking page refresh; decided to handle in-house for now.",
    budget: "under_5k",
    urgency: "low",
    timeline: "exploring",
    companySize: "solo",
  },
  {
    id: "demo-07",
    createdAt: daysAgo(8),
    status: "new",
    name: "Amanda Foster",
    email: "afoster@fosterlegalgroup.com",
    phone: "+1 214 555 0136",
    company: "Foster Legal Group",
    serviceType: "consulting",
    description:
      "Client intake modernization and CRM integration for a twelve-attorney practice.",
    budget: "25k_100k",
    urgency: "medium",
    timeline: "three_to_six_months",
    companySize: "11_50",
  },
  {
    id: "demo-08",
    createdAt: daysAgo(10),
    status: "contacted",
    name: "David Kim",
    email: "david@kimdigital.io",
    phone: "+1 206 555 0171",
    company: "Kim Digital",
    serviceType: "implementation",
    description:
      "E-commerce analytics setup and weekly reporting for a DTC skincare brand scaling paid social.",
    budget: "5k_25k",
    urgency: "high",
    timeline: "asap",
    companySize: "2_10",
  },
];

export function getDemoLeads(): StoredLead[] {
  return demoLeadData.map((lead) => ({
    ...lead,
    score: computeLeadScore(lead),
  }));
}
