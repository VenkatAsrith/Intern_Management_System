import { FollowUpComplianceChart } from "@/components/analytics/FollowUpComplianceChart";
import { PipelineVelocityChart } from "@/components/analytics/PipelineVelocityChart";
import { RepScorecardGrid } from "@/components/analytics/RepScorecardGrid";
import { SLABreachChart } from "@/components/analytics/SLABreachChart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAnalyticsDashboard,
  useCRMFunnelData,
  useClientAnalytics,
  useClients,
  useDealCycleTime,
  useFollowUpComplianceRate,
  useLostDealAnalysis,
  usePipelineVelocity,
  useRepScorecards,
  useSLABreachRate,
  useWinRateByMember,
} from "@/hooks/use-clients";
import { ClientStatus, STATUS_COLORS, STATUS_LABELS } from "@/types/clients";
import type { Client } from "@/types/clients";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  Building2,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Phone,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Chart colour palette matched to STATUS_COLORS
const FUNNEL_STAGE_COLORS: Record<string, string> = {
  "Lead Captured": "#94a3b8",
  Contacted: "#3b82f6",
  "Discovery Call Done": "#a855f7",
  "Proposal Sent": "#f59e0b",
  Negotiation: "#f97316",
  "Closed Won": "#10b981",
  "Closed Lost": "#ef4444",
  "On Hold": "#eab308",
};

const LOST_REASON_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#a855f7",
  "#3b82f6",
  "#6b7280",
];

const STATUS_HEX: Record<ClientStatus, string> = {
  [ClientStatus.leadCaptured]: "#94a3b8",
  [ClientStatus.contacted]: "#3b82f6",
  [ClientStatus.discoveryCallDone]: "#a855f7",
  [ClientStatus.proposalSent]: "#f59e0b",
  [ClientStatus.negotiation]: "#f97316",
  [ClientStatus.closedWon]: "#10b981",
  [ClientStatus.closedLost]: "#ef4444",
  [ClientStatus.onHold]: "#eab308",
};

const TOOLTIP_STYLE = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: 12,
};

const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 };

function formatCurrency(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toLocaleString()}`;
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2">
        {title}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function _relativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const _ACTIVITY_ICONS: Record<string, React.ElementType> = {
  statusChange: TrendingUp,
  noteAdded: FileText,
  whatsAppSent: MessageSquare,
  callScheduled: Phone,
  proposalUploaded: FileText,
  invoiceGenerated: DollarSign,
  documentShared: FileText,
  commentAdded: MessageSquare,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  trend,
  trendUp,
  ocid,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  trend?: string;
  trendUp?: boolean;
  ocid: string;
}) {
  return (
    <Card className="bg-card border-border" data-ocid={ocid}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div
            className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          {trend !== undefined && (
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                trendUp ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {trendUp ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {trend}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-foreground mt-3">{value}</p>
        <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ClientsAnalyticsPage() {
  const { data: analytics, isLoading: analyticsLoading } = useClientAnalytics();
  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: dashboardData, isLoading: dashboardLoading } =
    useAnalyticsDashboard();
  const { data: funnelData = [], isLoading: funnelLoading } =
    useCRMFunnelData();
  const { data: winRateData = [] } = useWinRateByMember();
  const { data: dealCycleTime = 0 } = useDealCycleTime();
  const { data: lostDealData = [] } = useLostDealAnalysis();

  const isLoading =
    analyticsLoading || clientsLoading || dashboardLoading || funnelLoading;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-56 rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // ── Derived metrics
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthClients = clients.filter((c) => c.createdAt >= thisMonthStart);
  const thisMonthApproved = thisMonthClients.filter(
    (c) => c.currentStatus === ClientStatus.closedWon,
  ).length;
  const conversionRate =
    thisMonthClients.length > 0
      ? Math.round((thisMonthApproved / thisMonthClients.length) * 100)
      : 0;

  // Status distribution for pie chart
  const allStatuses = [
    ClientStatus.leadCaptured,
    ClientStatus.contacted,
    ClientStatus.discoveryCallDone,
    ClientStatus.proposalSent,
    ClientStatus.negotiation,
    ClientStatus.closedWon,
    ClientStatus.closedLost,
    ClientStatus.onHold,
  ];
  const statusCounts = allStatuses.map((s) => ({
    name: STATUS_LABELS[s],
    value: clients.filter((c) => c.currentStatus === s).length,
    fill: STATUS_HEX[s],
  }));

  // Follow-up tracking
  const clientsWithFollowUp = clients.filter((c) => c.followUpDate);
  const upcomingFollowUps = clientsWithFollowUp.filter(
    (c) => c.followUpDate! >= now,
  ).length;
  const overdueFollowUps = clientsWithFollowUp.filter(
    (c) => c.followUpDate! < now,
  ).length;
  const followUpData = [
    { label: "Upcoming", count: upcomingFollowUps, fill: "#10b981" },
    { label: "Overdue", count: overdueFollowUps, fill: "#ef4444" },
    {
      label: "No Follow-up",
      count: clients.length - clientsWithFollowUp.length,
      fill: "#6b7280",
    },
  ];

  // Revenue Forecast: monthly weighted pipeline from client follow-up dates
  const revenueForecastData = (() => {
    const monthly: Record<string, { label: string; weighted: number }> = {};
    for (const c of clients) {
      if (!c.followUpDate) return;
      const d = c.followUpDate;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      if (!monthly[key]) monthly[key] = { label, weighted: 0 };
      const prob = (c as Client & { probability?: number }).probability ?? 50;
      monthly[key].weighted += (c.dealValue * prob) / 100;
    }
    return Object.entries(monthly)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8)
      .map(([, v]) => ({ month: v.label, weighted: Math.round(v.weighted) }));
  })();

  // Win rate table sorted descending
  const winRateSorted = [...winRateData].sort(
    (
      [, wa, ta]: [string, number, number],
      [, wb, tb]: [string, number, number],
    ) => {
      const rateA = ta > 0 ? (wa / ta) * 100 : 0;
      const rateB = tb > 0 ? (wb / tb) * 100 : 0;
      return rateB - rateA;
    },
  );

  // Funnel chart data with stage-to-stage conversion %
  const funnelChartData = (funnelData as [string, number][]).map(
    ([stage, count], idx) => ({
      stage,
      count,
      fill: FUNNEL_STAGE_COLORS[stage] ?? "#94a3b8",
      convPct:
        idx > 0 && (funnelData as [string, number][])[idx - 1][1] > 0
          ? Math.round(
              (count / (funnelData as [string, number][])[idx - 1][1]) * 100,
            )
          : null,
    }),
  );

  // Lost deal pie data
  const lostPieData = (lostDealData as [string, number, number][]).map(
    ([reason, count, value], idx) => ({
      name: reason,
      count,
      value,
      fill: LOST_REASON_COLORS[idx % LOST_REASON_COLORS.length],
    }),
  );

  // Deal cycle time colour coding
  const cycleColor =
    dealCycleTime < 30
      ? "text-emerald-400"
      : dealCycleTime <= 60
        ? "text-amber-400"
        : "text-red-400";
  const cycleBg =
    dealCycleTime < 30
      ? "bg-emerald-500/10"
      : dealCycleTime <= 60
        ? "bg-amber-500/10"
        : "bg-red-500/10";

  // Recent activities — synthesised from status history across clients
  type ActivityItem = {
    key: string;
    companyName: string;
    description: string;
    timestamp: Date;
    Icon: React.ElementType;
  };
  const _recentActivities: ActivityItem[] = clients
    .flatMap((c) =>
      c.statusHistory.map((h) => ({
        key: `${c.id}-${h.timestamp.getTime()}`,
        companyName: c.companyName,
        description: `Status changed to ${STATUS_LABELS[h.status]}${
          h.note ? ` — ${h.note}` : ""
        }`,
        timestamp: h.timestamp,
        Icon: TrendingUp,
      })),
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  // Top 5 clients by deal value
  const topClients: Client[] = [...clients]
    .sort((a, b) => b.dealValue - a.dealValue)
    .slice(0, 5);

  // ── Enterprise summary cards
  const summaryCards = [
    {
      label: "Total Pipeline Value",
      value: formatCurrency(dashboardData?.totalPipeline ?? 0),
      subtitle: "Non-closed deal values",
      icon: DollarSign,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      ocid: "clients.analytics.pipeline_value_card",
    },
    {
      label: "Weighted Forecast",
      value: formatCurrency(dashboardData?.weightedForecast ?? 0),
      subtitle: "Deal value × probability",
      icon: Target,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      ocid: "clients.analytics.weighted_forecast_card",
    },
    {
      label: "Win Rate",
      value: `${(dashboardData?.winRate ?? 0).toFixed(1)}%`,
      subtitle: "Won / (Won + Lost)",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: (dashboardData?.winRate ?? 0) >= 50 ? "On target" : "Below 50%",
      trendUp: (dashboardData?.winRate ?? 0) >= 50,
      ocid: "clients.analytics.win_rate_card",
    },
    {
      label: "Avg Deal Cycle",
      value:
        dashboardData?.avgDealCycleDays != null
          ? `${dashboardData.avgDealCycleDays}d`
          : `${dealCycleTime}d`,
      subtitle: "Created → Closed Won",
      icon: Clock,
      iconBg: cycleBg,
      iconColor: cycleColor,
      ocid: "clients.analytics.deal_cycle_card",
    },
  ];

  // ── Stats cards data
  const statCards = [
    {
      label: "Total Clients",
      value: analytics?.totalClients ?? 0,
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      ocid: "clients.analytics.total_clients_card",
    },
    {
      label: "Active Leads",
      value: analytics?.activeLeads ?? 0,
      subtitle: "Contacted → Negotiation",
      icon: TrendingUp,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      ocid: "clients.analytics.active_leads_card",
    },
    {
      label: "Closed Won",
      value: analytics?.approvedDeals ?? 0,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: `${thisMonthApproved} this month`,
      trendUp: thisMonthApproved > 0,
      ocid: "clients.analytics.approved_deals_card",
    },
    {
      label: "Closed Lost",
      value: analytics?.rejectedLeads ?? 0,
      icon: XCircle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      ocid: "clients.analytics.rejected_leads_card",
    },
    {
      label: "Revenue Pipeline",
      value: formatCurrency(analytics?.revenuePipeline ?? 0),
      subtitle: "Estimated open value",
      icon: DollarSign,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      ocid: "clients.analytics.revenue_pipeline_card",
    },
    {
      label: "Monthly Conversion",
      value: `${conversionRate}%`,
      subtitle: `${thisMonthApproved}/${thisMonthClients.length} this month`,
      icon: CalendarCheck,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      ocid: "clients.analytics.monthly_conversion_card",
    },
  ];

  return (
    <div className="p-6 space-y-8" data-ocid="clients.analytics.page">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BarChart2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Client Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Pipeline performance, conversion metrics, and activity overview
          </p>
        </div>
      </div>

      {/* ── Enterprise Summary Cards (4) ─────────────────────────────────── */}
      <SectionDivider title="Enterprise Overview" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── 6-Column Pipeline Status Stats ───────────────────────────────── */}
      <SectionDivider title="Pipeline Status" />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Row: Sales Funnel (60%) + Deal Cycle Time (40%) ──────────────── */}
      <SectionDivider title="Funnel & Cycle Analysis" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sales Funnel — horizontal bar */}
        <Card
          className="bg-card border-border lg:col-span-3"
          data-ocid="clients.analytics.funnel.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Sales Funnel
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Clients at each pipeline stage
            </p>
          </CardHeader>
          <CardContent>
            {funnelChartData.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-[240px]"
                data-ocid="clients.analytics.funnel.empty_state"
              >
                <Target className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No funnel data yet
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  layout="vertical"
                  data={funnelChartData}
                  margin={{ left: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis type="number" tick={AXIS_TICK} />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    tick={AXIS_TICK}
                    width={130}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(
                      v: number,
                      _name: string,
                      props: { payload?: { convPct?: number | null } },
                    ) => {
                      const pct = props.payload?.convPct;
                      return [
                        v,
                        pct != null ? `Count (${pct}% from prev)` : "Count",
                      ];
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {funnelChartData.map((entry) => (
                      <Cell key={entry.stage} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Deal Cycle Time */}
        <Card
          className="bg-card border-border lg:col-span-2"
          data-ocid="clients.analytics.deal_cycle.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Deal Cycle Time
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Average Created → Closed Won
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] gap-4">
              <div
                className={`w-28 h-28 rounded-full ${cycleBg} flex flex-col items-center justify-center`}
                style={{ border: "4px solid currentColor" }}
              >
                <span className={`text-3xl font-black ${cycleColor}`}>
                  {dealCycleTime}
                </span>
                <span className={`text-xs font-semibold ${cycleColor}`}>
                  days
                </span>
              </div>
              <div className="text-center">
                <p className={`text-sm font-semibold ${cycleColor}`}>
                  {dealCycleTime < 30
                    ? "Excellent"
                    : dealCycleTime <= 60
                      ? "Average"
                      : "Needs Attention"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {dealCycleTime < 30
                    ? "Deals close in under a month"
                    : dealCycleTime <= 60
                      ? "Within industry average"
                      : "Consider shortening the sales process"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Row: Win Rate Table (60%) + Lost Deal Pie (40%) ──────────────── */}
      <SectionDivider title="Win / Loss Analysis" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Win Rate by Member table */}
        <Card
          className="bg-card border-border lg:col-span-3"
          data-ocid="clients.analytics.win_rate.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Win Rate by Team Member
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Sorted by win rate, high to low
            </p>
          </CardHeader>
          <CardContent>
            {winRateSorted.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10"
                data-ocid="clients.analytics.win_rate.empty_state"
              >
                <Users className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No closed deals yet
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">
                        Member
                      </th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">
                        Won
                      </th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">
                        Total Closed
                      </th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">
                        Win Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {winRateSorted.map(
                      ([member, won, total]: [string, number, number], idx) => {
                        const rate =
                          total > 0 ? Math.round((won / total) * 100) : 0;
                        return (
                          <tr
                            key={member}
                            className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                            data-ocid={`clients.analytics.win_rate.item.${idx + 1}`}
                          >
                            <td className="py-2.5 px-3 text-xs font-medium text-foreground">
                              {member}
                            </td>
                            <td className="py-2.5 px-3 text-xs text-right text-emerald-400 font-semibold">
                              {won}
                            </td>
                            <td className="py-2.5 px-3 text-xs text-right text-muted-foreground">
                              {total}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-emerald-500"
                                    style={{ width: `${rate}%` }}
                                  />
                                </div>
                                <span
                                  className={`text-xs font-bold ${
                                    rate >= 60
                                      ? "text-emerald-400"
                                      : rate >= 40
                                        ? "text-amber-400"
                                        : "text-red-400"
                                  }`}
                                >
                                  {rate}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lost Deal Analysis pie */}
        <Card
          className="bg-card border-border lg:col-span-2"
          data-ocid="clients.analytics.lost_deals.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-400" />
              Lost Deal Analysis
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Loss reasons breakdown
            </p>
          </CardHeader>
          <CardContent>
            {lostPieData.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10"
                data-ocid="clients.analytics.lost_deals.empty_state"
              >
                <XCircle className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No lost deals logged
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={lostPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {lostPieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(
                        v: number,
                        _n: string,
                        props: { payload?: { name: string; value: number } },
                      ) => [
                        `${v} deals · ${formatCurrency(props.payload?.value ?? 0)}`,
                        props.payload?.name ?? "",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5">
                  {lostPieData.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: entry.fill }}
                        />
                        <span className="text-xs text-muted-foreground truncate max-w-[110px]">
                          {entry.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {entry.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Full-Width Revenue Pipeline Forecast (weighted BarChart) ─────── */}
      <SectionDivider title="Revenue Forecast" />
      <Card
        className="bg-card border-border"
        data-ocid="clients.analytics.revenue_forecast.card"
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Revenue Pipeline Forecast
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Weighted deal value by month (deal value × win probability)
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueForecastData} margin={{ top: 8 }}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e71514" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#e71514" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="month" tick={AXIS_TICK} />
              <YAxis
                tick={AXIS_TICK}
                tickFormatter={(v: number) => formatCurrency(v)}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(v: number) => [
                  formatCurrency(v),
                  "Weighted Forecast",
                ]}
              />
              <Bar
                dataKey="weighted"
                name="Weighted Forecast"
                fill="url(#forecastGrad)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ── Row: Lead Conversion Trend + Status Distribution Pie ─────────── */}
      <SectionDivider title="Conversion & Distribution" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Conversion AreaChart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Lead Conversion Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              New leads vs closed won over last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={analytics?.monthlyData ?? []}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="approvedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" tick={AXIS_TICK} />
                <YAxis tick={AXIS_TICK} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="newLeads"
                  name="New Leads"
                  stroke="#3b82f6"
                  fill="url(#leadGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="approved"
                  name="Closed Won"
                  stroke="#10b981"
                  fill="url(#approvedGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution PieChart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Pipeline Distribution
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Current clients across all stages
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="55%" height={220}>
                <PieChart>
                  <Pie
                    data={statusCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusCounts.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 flex-1">
                {statusCounts.map((s) => {
                  const statusKey = allStatuses.find(
                    (k) => STATUS_LABELS[k] === s.name,
                  );
                  const colors = statusKey ? STATUS_COLORS[statusKey] : null;
                  return (
                    <div
                      key={s.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: s.fill }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {s.name}
                        </span>
                      </div>
                      <Badge
                        className={`text-xs h-5 px-1.5 ${
                          colors
                            ? `${colors.bg} ${colors.text} ${colors.border} border`
                            : ""
                        }`}
                      >
                        {s.value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom 3-Column Row: Monthly Activity + Follow-ups + Top Clients */}
      <SectionDivider title="Monthly Activity & Top Clients" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Approvals BarChart */}
        <Card
          className="bg-card border-border"
          data-ocid="clients.analytics.monthly_approvals.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary" />
              Monthly Pipeline Activity
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              New leads, approvals, rejections
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics?.monthlyData ?? []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" tick={AXIS_TICK} />
                <YAxis tick={AXIS_TICK} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend />
                <Bar dataKey="newLeads" name="New" stackId="a" fill="#3b82f6" />
                <Bar dataKey="approved" name="Won" stackId="a" fill="#10b981" />
                <Bar
                  dataKey="rejected"
                  name="Lost"
                  stackId="a"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Follow-up Completion */}
        <Card
          className="bg-card border-border"
          data-ocid="clients.analytics.followup.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              Follow-up Completion
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Upcoming vs overdue follow-ups
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={followUpData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis type="number" tick={AXIS_TICK} />
                <YAxis
                  dataKey="label"
                  type="category"
                  tick={AXIS_TICK}
                  width={80}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {followUpData.map((entry) => (
                    <Cell key={entry.label} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {followUpData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.fill }}
                    />
                    {item.label}
                  </span>
                  <span className="font-bold text-foreground">
                    {item.count}
                  </span>
                </div>
              ))}
              {overdueFollowUps > 0 && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 rounded-lg p-2 mt-1">
                  <Bell className="h-3 w-3 flex-shrink-0" />
                  <span>
                    {overdueFollowUps} overdue follow-up
                    {overdueFollowUps > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card
          className="bg-card border-border"
          data-ocid="clients.analytics.top_clients.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Top Clients by Deal Value
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Highest estimated deal value
            </p>
          </CardHeader>
          <CardContent>
            {topClients.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center"
                data-ocid="clients.analytics.top_clients.empty_state"
              >
                <Users className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">No clients yet</p>
              </div>
            ) : (
              <div
                className="space-y-1"
                data-ocid="clients.analytics.top_clients.list"
              >
                {topClients.map((client, idx) => {
                  const colors = STATUS_COLORS[client.currentStatus];
                  return (
                    <div
                      key={client.id}
                      className="grid grid-cols-[auto_1fr_auto] gap-3 items-center py-2 px-2 rounded-lg hover:bg-muted/40 transition-colors"
                      data-ocid={`clients.analytics.top_clients.item.${idx + 1}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {client.companyName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {client.contactPersonName} ·{" "}
                          {client.assignedTeamMember}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-bold text-foreground">
                          {formatCurrency(client.dealValue)}
                        </span>
                        <Badge
                          className={`text-xs h-4 px-1 ${colors.bg} ${colors.text} ${colors.border} border`}
                        >
                          {STATUS_LABELS[client.currentStatus]}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Velocity */}
      <AnalyticsChartsSection />
    </div>
  );
}

function AnalyticsChartsSection() {
  return (
    <div className="space-y-6">
      <PipelineVelocityChart />
      <FollowUpComplianceChart />
      <SLABreachChart />
      <RepScorecardGrid />
    </div>
  );
}
