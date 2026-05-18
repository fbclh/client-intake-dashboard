import { Clock, LayoutDashboard, ListChecks } from "lucide-react";

const items = [
  {
    icon: ListChecks,
    title: "What this is for",
    text: "Capture contact details, project scope, budget, and timing so your team can qualify the opportunity.",
  },
  {
    icon: Clock,
    title: "About 2 minutes",
    text: "Three short steps plus a quick review. You can go back and edit before submitting.",
  },
  {
    icon: LayoutDashboard,
    title: "After you submit",
    text: "The lead is scored and added to your dashboard with status, filters, and a full detail view.",
  },
] as const;

export function IntakePageIntro() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex gap-2.5 rounded-lg border border-border/60 bg-surface/50 px-3.5 py-3"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
            <item.icon className="h-3.5 w-3.5 text-brand" aria-hidden />
          </span>
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-medium leading-tight text-foreground">
              {item.title}
            </p>
            <p className="text-xs leading-snug text-muted-foreground">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
