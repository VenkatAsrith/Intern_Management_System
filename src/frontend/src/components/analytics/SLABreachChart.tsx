import { Skeleton } from "@/components/ui/skeleton";
import { useSLABreachRate } from "@/hooks/use-clients";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
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

const PLACEHOLDER_DATA = [
  { name: "Lead Captured", breachRate: 5, targetRate: 15 },
  { name: "Contacted", breachRate: 18, targetRate: 15 },
  { name: "Discovery Call", breachRate: 12, targetRate: 15 },
  { name: "Proposal Sent", breachRate: 24, targetRate: 15 },
  { name: "Negotiation", breachRate: 8, targetRate: 15 },
];

export function SLABreachChart() {
  const { data, isLoading } = useSLABreachRate();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    );
  }

  const chartData = data && data.length > 0 ? data : PLACEHOLDER_DATA;

  return (
    <div
      className="bg-zinc-900 rounded-xl p-5 border border-border"
      data-ocid="clients.analytics.sla_breach.card"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#ef4444]" />
        SLA Breach Rate by Stage
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        % of deals that exceeded stage SLA time limit
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 24, left: 0, bottom: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "hsl(var(--muted)/0.3)" }}
            formatter={(value: number) => [
              `${value.toFixed(1)}%`,
              "Breach Rate",
            ]}
          />
          <ReferenceLine
            y={15}
            stroke="#22c55e"
            strokeDasharray="4 3"
            label={{
              value: "Target <15%",
              fill: "#22c55e",
              fontSize: 11,
              position: "insideTopRight",
            }}
          />
          <Bar dataKey="breachRate" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.breachRate > 15 ? "#ef4444" : "#f97316"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
