import { Badge } from "@/components/ui/badge";
import { scoreTier } from "@/lib/lead-score";
import { cn } from "@/lib/utils";

const tierCopy: Record<ReturnType<typeof scoreTier>, string> = {
  strong: "Strong fit",
  moderate: "Warm",
  early: "Early",
};

export function ScoreBadge({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  const tier = scoreTier(score);
  const variant =
    tier === "strong"
      ? "success"
      : tier === "moderate"
        ? "secondary"
        : "outline";

  return (
    <Badge variant={variant} className={cn("tabular-nums", className)}>
      {score}
      <span className="mx-0.5 opacity-60">·</span>
      {tierCopy[tier]}
    </Badge>
  );
}
