import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { CompositePerformanceScore } from "@/hooks/use-composite-score";
import { useComputeCompositeScore } from "@/hooks/use-composite-score";
import type { Performance } from "@/types";
import { RefreshCw, Star, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DIMENSION_COLORS = {
  productivity: "#e71514",
  communication: "#3b82f6",
  learning: "#8b5cf6",
  attendance: "#10b981",
};

function ScoreMeter({
  value,
  label,
  color,
}: { value: number; label: string; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function PerformanceCenterTab({
  internId,
  performances,
  compositeScore,
  isLoading,
}: {
  internId: string;
  performances: Performance[];
  compositeScore: CompositePerformanceScore | null;
  isLoading: boolean;
}) {
  const compute = useComputeCompositeScore();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    );
  }

  const overall =
    compositeScore?.overallScore ??
    (performances.length > 0
      ? Math.round(
          (performances.reduce((s, p) => s + p.overallScore, 0) /
            performances.length) *
            20,
        )
      : 0);

  const breakdown = compositeScore?.breakdown ?? {
    productivity: Math.round(
      (performances[performances.length - 1]?.taskScore ?? 3) * 20,
    ),
    communication: Math.round(
      (performances[performances.length - 1]?.communicationScore ?? 3) * 20,
    ),
    learning: 60,
    attendance: Math.round(
      (performances[performances.length - 1]?.attendanceScore ?? 3) * 20,
    ),
  };

  const suggestions = compositeScore?.improvementSuggestions ?? [
    ...(breakdown.productivity < 60
      ? ["Improve task completion rate and meet deadlines consistently"]
      : []),
    ...(breakdown.communication < 60
      ? ["Submit daily notes more regularly and attend standups"]
      : []),
    ...(breakdown.attendance < 60
      ? ["Increase active days; aim for 5 days/week activity"]
      : []),
    ...(overall >= 80
      ? ["Excellent performance — consider for PPO recommendation"]
      : []),
  ];

  const trendData = performances.map((p) => ({
    period: `${p.year}-${String(p.month).padStart(2, "0")}`,
    Tasks: Math.round(p.taskScore * 20),
    Communication: Math.round(p.communicationScore * 20),
    Attendance: Math.round(p.attendanceScore * 20),
    Initiative: Math.round(p.initiativeScore * 20),
  }));

  const overallColor =
    overall >= 80
      ? "text-emerald-400"
      : overall >= 60
        ? "text-yellow-400"
        : "text-red-400";
  const overallBg =
    overall >= 80
      ? "bg-emerald-500/10 border-emerald-500/30"
      : overall >= 60
        ? "bg-yellow-500/10 border-yellow-500/30"
        : "bg-red-500/10 border-red-500/30";

  return (
    <div className="space-y-5" data-ocid="perf_center.tab">
      {/* Overall Score */}
      <div
        className={`border rounded-xl p-5 ${overallBg} flex items-center justify-between gap-4`}
        data-ocid="perf_center.score_card"
      >
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Overall Performance Score
          </p>
          <p className={`text-5xl font-bold mt-1 ${overallColor}`}>
            {overall}
            <span className="text-base font-normal text-muted-foreground">
              /100
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={`${overallBg} border text-xs`}>
            <Star className="h-3 w-3 mr-1" />
            {overall >= 80
              ? "Excellent"
              : overall >= 60
                ? "Good"
                : "Needs Improvement"}
          </Badge>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={() => compute.mutate(internId)}
            disabled={compute.isPending}
            data-ocid="perf_center.recompute_button"
          >
            <RefreshCw
              className={`h-3 w-3 ${compute.isPending ? "animate-spin" : ""}`}
            />
            Recompute
          </Button>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <p className="text-sm font-semibold text-foreground">Score Breakdown</p>
        <ScoreMeter
          value={breakdown.productivity}
          label="Productivity"
          color={DIMENSION_COLORS.productivity}
        />
        <ScoreMeter
          value={breakdown.communication}
          label="Communication"
          color={DIMENSION_COLORS.communication}
        />
        <ScoreMeter
          value={breakdown.learning}
          label="Learning"
          color={DIMENSION_COLORS.learning}
        />
        <ScoreMeter
          value={breakdown.attendance}
          label="Attendance"
          color={DIMENSION_COLORS.attendance}
        />
      </div>

      {/* Monthly Trend Chart */}
      {trendData.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-3">
            Monthly Score Trends
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {Object.entries(DIMENSION_COLORS).map(([key, color]) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key.charAt(0).toUpperCase() + key.slice(1)}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Dimension Breakdown Bar */}
      {trendData.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-3">
            Dimension Performance
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={trendData.slice(-4)}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
              />
              <Bar
                dataKey="Tasks"
                fill={DIMENSION_COLORS.productivity}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="Communication"
                fill={DIMENSION_COLORS.communication}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="Attendance"
                fill={DIMENSION_COLORS.attendance}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Improvement Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Improvement
            Suggestions
          </p>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li
                key={String(i)}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary mt-0.5">→</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
