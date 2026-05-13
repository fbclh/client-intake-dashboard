import { z } from "zod";

export const serviceTypeValues = [
  "consulting",
  "implementation",
  "retainer",
  "audit",
  "other",
] as const;

export const budgetValues = [
  "under_5k",
  "5k_25k",
  "25k_100k",
  "100k_plus",
  "unsure",
] as const;

export const urgencyValues = ["low", "medium", "high", "critical"] as const;

export const timelineValues = [
  "asap",
  "one_to_three_months",
  "three_to_six_months",
  "six_plus_months",
  "exploring",
] as const;

export const companySizeValues = [
  "solo",
  "2_10",
  "11_50",
  "51_200",
  "201_plus",
] as const;

export const intakeFormSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  company: z.string().min(1, "Company or organization is required."),
  serviceType: z.enum(serviceTypeValues, {
    message: "Select a service type.",
  }),
  description: z
    .string()
    .min(10, "Add a bit more detail (at least 10 characters)."),
  budget: z.enum(budgetValues, { message: "Select a budget range." }),
  urgency: z.enum(urgencyValues, { message: "Select urgency." }),
  timeline: z.enum(timelineValues, { message: "Select a timeline." }),
  companySize: z.enum(companySizeValues, {
    message: "Select company size.",
  }),
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeStepFieldGroups = [
  ["name", "email", "phone", "company"],
  ["serviceType", "description", "budget"],
  ["urgency", "timeline", "companySize"],
] as const satisfies readonly (readonly (keyof IntakeFormValues)[])[];

export const defaultIntakeValues: IntakeFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  serviceType: "consulting",
  description: "",
  budget: "unsure",
  urgency: "medium",
  timeline: "exploring",
  companySize: "2_10",
};
