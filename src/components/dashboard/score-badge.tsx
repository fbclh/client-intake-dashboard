import { Badge } from "@/components/ui/badge";
import { scoreTier } from "@/lib/lead-score";

const tierCopy: Record<ReturnType<typeof scoreTier>, string> = {
  strong: "Strong fit",
  moderate: "Warm",
  early: "Early",
};

export function ScoreBadge({ score }: { score: number }) {
  const tier = scoreTier(score);
  const variant =
    tier === "strong"
      ? "success"
      : tier === "moderate"
        ? "secondary"
        : "outline";

  return (
    <Badge variant={variant} className="tabular-nums">
      {score}
      <span className="mx-1 opacity-60">·</span>
      {tierCopy[tier]}
    </Badge>
  );
}
