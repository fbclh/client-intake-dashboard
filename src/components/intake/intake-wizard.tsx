"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetValues,
  companySizeValues,
  defaultIntakeValues,
  intakeFormSchema,
  intakeStepFieldGroups,
  serviceTypeValues,
  timelineValues,
  urgencyValues,
  type IntakeFormValues,
} from "@/lib/intake-schema";
import {
  labelBudget,
  labelCompanySize,
  labelServiceType,
  labelTimeline,
  labelUrgency,
} from "@/lib/intake-labels";
import { appendLead } from "@/lib/leads-storage";
import { computeLeadScore } from "@/lib/lead-score";
import { cn } from "@/lib/utils";

const TOTAL_DATA_STEPS = intakeStepFieldGroups.length;

const STEP_META = [
  { title: "Contact", hint: "Who you are" },
  { title: "Project", hint: "What you need" },
  { title: "Qualification", hint: "Timing & fit" },
] as const;

export function IntakeWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: defaultIntakeValues,
    mode: "onTouched",
  });

  const progressLabel =
    step < TOTAL_DATA_STEPS
      ? `Step ${step + 1} of ${TOTAL_DATA_STEPS}`
      : step === TOTAL_DATA_STEPS
        ? "Review"
        : "Done";

  async function goNext() {
    const fields = intakeStepFieldGroups[step];
    const valid = await form.trigger([...fields], { shouldFocus: true });
    if (!valid) return;
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function onSubmit(values: IntakeFormValues) {
    const lead = {
      ...values,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new" as const,
      score: computeLeadScore(values),
    };
    appendLead(lead);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-lg border-brand/20 shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-brand/20 bg-brand-muted">
            <CheckCircle2 className="h-7 w-7 text-brand" aria-hidden />
          </div>
          <CardTitle>Thank you — we received your intake</CardTitle>
          <CardDescription>
            Your details are saved locally in this browser. You can review the
            lead on the dashboard.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/dashboard">View dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-xl overflow-hidden shadow-card">
      <CardHeader className="space-y-3.5 border-b border-border/60 bg-surface/40">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>
              {step < TOTAL_DATA_STEPS
                ? STEP_META[step].title
                : "Review & submit"}
            </CardTitle>
            <CardDescription>
              {step < TOTAL_DATA_STEPS
                ? STEP_META[step].hint
                : "Confirm your answers before sending."}
            </CardDescription>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            {progressLabel}
          </span>
        </div>

        <ol className="flex gap-2" aria-label="Form steps">
          {STEP_META.map((meta, i) => {
            const done = step > i;
            const current = step === i;
            return (
              <li key={meta.title} className="flex flex-1 flex-col gap-1">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-colors",
                    done || current ? "bg-brand" : "bg-border",
                    current && "ring-2 ring-brand/25 ring-offset-1",
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "text-[11px] font-medium leading-tight sm:text-xs",
                    current
                      ? "text-foreground"
                      : done
                        ? "text-muted-foreground"
                        : "text-muted-foreground/70",
                  )}
                >
                  {meta.title}
                </span>
              </li>
            );
          })}
        </ol>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL_DATA_STEPS + 1}
          aria-valuenow={Math.min(step + 1, TOTAL_DATA_STEPS + 1)}
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300"
            style={{
              width: `${((Math.min(step, TOTAL_DATA_STEPS) + 1) / (TOTAL_DATA_STEPS + 1)) * 100}%`,
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {step === 0 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work email</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" autoComplete="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input autoComplete="organization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you need?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypeValues.map((v) => (
                            <SelectItem key={v} value={v}>
                              {labelServiceType(v)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Goals, constraints, and anything else we should know."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated budget</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetValues.map((v) => (
                            <SelectItem key={v} value={v}>
                              {labelBudget(v)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How urgent is this?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {urgencyValues.map((v) => (
                            <SelectItem key={v} value={v}>
                              {labelUrgency(v)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred timeline</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timelineValues.map((v) => (
                            <SelectItem key={v} value={v}>
                              {labelTimeline(v)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizeValues.map((v) => (
                            <SelectItem key={v} value={v}>
                              {labelCompanySize(v)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === TOTAL_DATA_STEPS && (
              <ReviewStep values={form.getValues()} onEdit={setStep} />
            )}

            <div className="flex flex-wrap justify-between gap-2.5 border-t border-border/60 pt-4">
              {step > 0 && step <= TOTAL_DATA_STEPS && (
                <Button type="button" variant="outline" onClick={goBack}>
                  Back
                </Button>
              )}
              {step < TOTAL_DATA_STEPS && (
                <Button
                  type="button"
                  className={step === 0 ? "ml-auto" : undefined}
                  onClick={goNext}
                >
                  Continue
                </Button>
              )}
              {step === TOTAL_DATA_STEPS && (
                <Button type="submit" className="ml-auto">
                  Submit intake
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ReviewStep({
  values,
  onEdit,
}: {
  values: IntakeFormValues;
  onEdit: (step: number) => void;
}) {
  const rows: { label: string; value: string; editStep: number }[] = [
    { label: "Name", value: values.name, editStep: 0 },
    { label: "Email", value: values.email, editStep: 0 },
    { label: "Phone", value: values.phone, editStep: 0 },
    { label: "Company", value: values.company, editStep: 0 },
    {
      label: "Service",
      value: labelServiceType(values.serviceType),
      editStep: 1,
    },
    { label: "Description", value: values.description, editStep: 1 },
    { label: "Budget", value: labelBudget(values.budget), editStep: 1 },
    { label: "Urgency", value: labelUrgency(values.urgency), editStep: 2 },
    { label: "Timeline", value: labelTimeline(values.timeline), editStep: 2 },
    {
      label: "Company size",
      value: labelCompanySize(values.companySize),
      editStep: 2,
    },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm leading-snug text-muted-foreground">
        Review your answers. You can jump back to any section to make changes.
      </p>
      <dl className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/80 bg-surface/30">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 px-3.5 py-2.5 sm:flex-row sm:items-start sm:justify-between"
          >
            <dt className="text-sm font-medium text-muted-foreground">
              {row.label}
            </dt>
            <dd className="flex max-w-md flex-col items-start gap-2 text-sm sm:items-end">
              <span className="whitespace-pre-wrap text-right">{row.value}</span>
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 text-xs"
                onClick={() => onEdit(row.editStep)}
              >
                Edit
              </Button>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
