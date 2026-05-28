import { Skeleton } from "@/components/ui/skeleton";
import { usePipelineVelocity } from "@/hooks/use-clients";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TOOLTIP_STYLE = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: 12,
};

const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };

function getBarColor(days: number): string {
  if (days <= 5) return "#22c55e";
  if (days <= 10) return "#eab308";
  return "#ef4444";
}

const PLACEHOLDER_DATA = [
  { name: "Lead Captured", value: 3 },
  { name: "Contacted", value: 5 },
  { name: "Discovery Call Done", value: 8 },
  { name: "Proposal Sent", value: 12 },
  { name: "Negotiation", value: 9 },
];

export function PipelineVelocityChart() {
  const { data, isLoading } = usePipelineVelocity();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-[350px] w-full rounded-lg" />
      </div>
    );
  }

  const chartData = data && data.length > 0 ? data : PLACEHOLDER_DATA;

  return (
    <div
      className="bg-zinc-900 rounded-xl p-5 border border-border"
      data-ocid="clients.analytics.pipeline_velocity.card"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-primary" />
        Pipeline Velocity
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Average days spent in each pipeline stage
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 30, left: 0, bottom: 4 }}
        >
          <XAxis
            type="number"
            dataKey="value"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}d`}
            domain={[0, "dataMax + 2"]}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            width={140}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "hsl(var(--muted)/0.3)" }}
            formatter={(value: number) => [`${value} days`, "Avg Days"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          ≤5 days (healthy)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#eab308]" />
          5–10 days (watch)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          &gt;10 days (bottleneck)
        </span>
      </div>
    </div>
  );
}
