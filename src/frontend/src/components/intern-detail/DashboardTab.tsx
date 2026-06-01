import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { CompositePerformanceScore } from "@/hooks/use-composite-score";
import { useMeetingsForIntern } from "@/hooks/use-meetings";
import { useTasks } from "@/hooks/use-tasks";
import { useAllDailyNotes } from "@/hooks/useNotes";
import { useSubmissions } from "@/hooks/useSubmissions";
import type { Performance } from "@/types";
import type { Intern } from "@/types";
import {
  BarChart2,
  CheckSquare,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

function KpiCard({ label, value, icon, color = "text-primary" }: KpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div className={`${color} opacity-80`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function weeklyTaskData(
  tasks: { status: string; updatedAt?: number; deadline?: string }[],
) {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);
  return DAY_LABELS.map((day, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const count = tasks.filter((t) => {
      if (t.status !== "Completed") return false;
      const at = t.updatedAt ? new Date(t.updatedAt) : null;
      return at && at.toDateString() === d.toDateString();
    }).length;
    return { day, completed: count };
  });
}

export function DashboardTab({
  intern,
  performances,
  compositeScore,
}: {
  intern: Intern;
  performances: Performance[];
  compositeScore: CompositePerformanceScore | null;
}) {
  const { data: notes = [], isLoading: notesLoading } = useAllDailyNotes();
  const { data: meetings = [] } = useMeetingsForIntern(intern.id);
  const { data: submissions = [] } = useSubmissions(intern.id);
  const { data: allTasks = [] } = useTasks(intern.id);

  const internNotes = notes.filter((n) => n.internId === intern.id);

  const tasksAssigned = allTasks.length;
  const tasksCompleted = allTasks.filter(
    (t) => t.status === "Completed",
  ).length;
  const tasksPending = allTasks.filter(
    (t) => t.status === "Pending" || t.status === "InProgress",
  ).length;
  const journalEntries = internNotes.length;
  const meetingsAttended = meetings.length;
  const docsCount = submissions.length;

  const avgPerf =
    performances.length > 0
      ? Math.round(
          (performances.reduce((s, p) => s + (p.overallScore || 0), 0) /
            performances.length) *
            20,
        )
      : (compositeScore?.overallScore ?? 0);

  const weekData = weeklyTaskData(
    allTasks as unknown as {
      status: string;
      updatedAt?: number;
      deadline?: string;
    }[],
  );

  const isLoading = notesLoading;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5" data-ocid="dashboard.tab">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="Tasks Assigned"
          value={tasksAssigned}
          icon={<CheckSquare className="h-5 w-5" />}
        />
        <KpiCard
          label="Tasks Completed"
          value={tasksCompleted}
          icon={<TrendingUp className="h-5 w-5" />}
          color="text-emerald-400"
        />
        <KpiCard
          label="Pending Tasks"
          value={tasksPending}
          icon={<BarChart2 className="h-5 w-5" />}
          color="text-amber-400"
        />
        <KpiCard
          label="Performance Score"
          value={`${avgPerf}/100`}
          icon={<TrendingUp className="h-5 w-5" />}
          color="text-primary"
        />
        <KpiCard
          label="Journal Entries"
          value={journalEntries}
          icon={<FileText className="h-5 w-5" />}
          color="text-blue-400"
        />
        <KpiCard
          label="Documents"
          value={docsCount}
          icon={<FileText className="h-5 w-5" />}
          color="text-purple-400"
        />
        <KpiCard
          label="Meetings"
          value={meetingsAttended}
          icon={<Users className="h-5 w-5" />}
          color="text-cyan-400"
        />
        <KpiCard
          label="Attendance %"
          value={`${Math.min(100, journalEntries * 5)}%`}
          icon={<Users className="h-5 w-5" />}
          color="text-teal-400"
        />
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm font-semibold text-foreground mb-3">
          Weekly Productivity
        </p>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart
            data={weekData}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e71514" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#e71514" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#e71514"
              fill="url(#completedGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {performances.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm font-semibold text-foreground mb-3">
            Performance Trend
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart
              data={performances.map((p) => ({
                month: `${p.year}-${String(p.month).padStart(2, "0")}`,
                score: Math.round(p.overallScore * 20),
              }))}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
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
              <Area
                type="monotone"
                dataKey="score"
                stroke="#e71514"
                fill="url(#completedGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
