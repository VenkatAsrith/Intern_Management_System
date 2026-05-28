import { Skeleton } from "@/components/ui/skeleton";
import { type RepScorecard, useRepScorecards } from "@/hooks/use-clients";
import {
  Award,
  BarChart2,
  Clock,
  DollarSign,
  TrendingUp,
  User,
} from "lucide-react";

function formatCurrency(value: number): string {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value.toLocaleString()}`;
}

function winRateColor(rate: number): string {
  if (rate >= 60) return "text-emerald-400";
  if (rate >= 40) return "text-amber-400";
  return "text-red-400";
}

function RepCard({ scorecard }: { scorecard: RepScorecard }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-border flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {scorecard.displayName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            @{scorecard.username}
          </p>
        </div>
      </div>

      {/* Win Rate — hero metric */}
      <div className="flex items-center justify-between bg-zinc-900/60 rounded-lg px-3 py-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          Win Rate
        </span>
        <span
          className={`text-lg font-bold ${winRateColor(scorecard.winRate)}`}
        >
          {scorecard.winRate.toFixed(1)}%
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <BarChart2 className="h-3 w-3" />
            Activities YTD
          </span>
          <span className="text-sm font-semibold text-foreground">
            {scorecard.activityCount.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Avg Cycle
          </span>
          <span className="text-sm font-semibold text-foreground">
            {scorecard.avgDealCycleTime.toFixed(0)} days
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3" />
            Revenue
          </span>
          <span className="text-sm font-semibold text-foreground">
            {formatCurrency(scorecard.totalDealValueClosed)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="h-3 w-3" />
            Closed Deals
          </span>
          <span className="text-sm font-semibold text-foreground">
            {scorecard.closedDealsCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RepScorecardGrid() {
  const { data, isLoading } = useRepScorecards();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {(["sk-a", "sk-b", "sk-c"] as const).map((k) => (
          <Skeleton key={k} className="h-52 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-14 text-center"
        data-ocid="clients.analytics.rep_scorecards.empty_state"
      >
        <User className="h-10 w-10 text-muted-foreground/30 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          No rep data yet
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Rep scorecards populate once deals are closed.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      data-ocid="clients.analytics.rep_scorecards.list"
    >
      {data.map((scorecard, idx) => (
        <div
          key={scorecard.userId}
          data-ocid={`clients.analytics.rep_scorecards.item.${idx + 1}`}
        >
          <RepCard scorecard={scorecard} />
        </div>
      ))}
    </div>
  );
}
