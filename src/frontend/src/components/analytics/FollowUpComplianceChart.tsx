import { Skeleton } from "@/components/ui/skeleton";
import { useFollowUpComplianceRate } from "@/hooks/use-clients";
import {
  CartesianGrid,
  Line,
  LineChart,
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
  { name: "Week 1", value: 72 },
  { name: "Week 2", value: 85 },
  { name: "Week 3", value: 78 },
  { name: "Week 4", value: 91 },
  { name: "Week 5", value: 68 },
  { name: "Week 6", value: 88 },
];

export function FollowUpComplianceChart() {
  const { data, isLoading } = useFollowUpComplianceRate();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    );
  }

  const chartData = data && data.length > 0 ? data : PLACEHOLDER_DATA;

  return (
    <div
      className="bg-zinc-900 rounded-xl p-5 border border-border"
      data-ocid="clients.analytics.follow_up_compliance.card"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#e71514]" />
        Follow-Up Compliance Rate
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        % of scheduled follow-ups completed on time
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
            formatter={(value: number) => [`${value}%`, "Compliance Rate"]}
          />
          <ReferenceLine
            y={80}
            stroke="#22c55e"
            strokeDasharray="4 3"
            label={{
              value: "Target 80%",
              fill: "#22c55e",
              fontSize: 11,
              position: "insideTopRight",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Compliance Rate"
            stroke="#e71514"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#e71514", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#e71514" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
