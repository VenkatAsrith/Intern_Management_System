import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useActivities, useDashboardStats } from "@/hooks/use-dashboard";
import type { Activity } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Activity as ActivityIcon,
  BookOpen,
  Briefcase,
  ChevronRight,
  FileCheck,
  Megaphone,
  MessageSquare,
  Star,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type QuickFilter = "all" | "active" | "completed" | "on_hold";

const QUICK_FILTERS: { label: string; value: QuickFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
];

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function activityIcon(action: string) {
  const a = action.toLowerCase();
  if (a.includes("create") || a.includes("add"))
    return <UserPlus className="h-4 w-4 text-primary" />;
  if (a.includes("update") || a.includes("edit"))
    return <TrendingUp className="h-4 w-4 text-primary" />;
  if (a.includes("document") || a.includes("letter"))
    return <FileCheck className="h-4 w-4 text-primary" />;
  if (a.includes("whatsapp") || a.includes("message"))
    return <MessageSquare className="h-4 w-4 text-primary" />;
  if (a.includes("performance"))
    return <Star className="h-4 w-4 text-primary" />;
  return <ActivityIcon className="h-4 w-4 text-muted-foreground" />;
}

function filterActivities(
  activities: Activity[],
  filter: QuickFilter,
): Activity[] {
  if (filter === "all") return activities;
  const map: Record<QuickFilter, string> = {
    all: "",
    active: "active",
    completed: "complet",
    on_hold: "hold",
  };
  const keyword = map[filter];
  return activities.filter(
    (a) =>
      a.action.toLowerCase().includes(keyword) ||
      a.details.toLowerCase().includes(keyword),
  );
}

// --- Stat Card ---
function StatCard({
  icon,
  title,
  value,
  label,
  loading,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  label: string;
  loading: boolean;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
              {title}
            </p>
            {loading ? (
              <Skeleton className="h-9 w-20 ml-auto mt-1" />
            ) : (
              <p className="text-3xl font-bold text-foreground mt-0.5 tabular-nums">
                {value}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {label}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Space Card ---
function SpaceCard({
  icon,
  space,
  spaceKey,
  total,
  active,
  loading,
}: {
  icon: React.ReactNode;
  space: string;
  spaceKey: string;
  total: number;
  active: number;
  loading: boolean;
}) {
  return (
    <Card className="bg-card border-border hover:border-primary/40 transition-smooth">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground">{space}</h3>
            <p className="text-xs text-muted-foreground">Enterprise Space</p>
          </div>
        </div>
        {loading ? (
          <div className="space-y-2 mb-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {total}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              <span className="text-primary font-semibold">{active}</span>{" "}
              active intern{active !== 1 ? "s" : ""}
            </p>
          </div>
        )}
        <Link
          to="/interns"
          data-ocid={`space_card.${spaceKey.toLowerCase()}.link`}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full gap-1.5 border-border hover:border-primary/50 hover:text-primary text-xs"
          >
            View Interns <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// --- Activity Row ---
function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="p-2 rounded-full bg-muted flex-shrink-0 mt-0.5">
        {activityIcon(activity.action)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {activity.action}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {activity.details}
        </p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 mt-0.5">
        {relativeTime(activity.timestamp)}
      </span>
    </div>
  );
}

// --- Activity Skeleton ---
function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-3 w-16 flex-shrink-0" />
    </div>
  );
}

// --- Main Page ---
export function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<QuickFilter>("all");
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { displayName } = useAuth();

  const filteredActivities = useMemo(
    () => filterActivities(activities ?? [], activeFilter),
    [activities, activeFilter],
  );

  const displayedActivities = filteredActivities.slice(0, 10);

  return (
    <div
      className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto"
      data-ocid="dashboard.page"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {displayName ? (
            <>
              Hello <span className="text-primary">{displayName}</span>
            </>
          ) : (
            "Dashboard"
          )}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Welcome to TechMecha Torque IMS
        </p>
      </div>

      {/* Stats Row */}
      <section aria-label="Statistics" data-ocid="dashboard.stats_section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="h-5 w-5 text-primary" />}
            title="Total Interns"
            value={stats?.totalInterns ?? 0}
            label="Across all spaces"
            loading={statsLoading}
          />
          <StatCard
            icon={<UserCheck className="h-5 w-5 text-primary" />}
            title="Active Interns"
            value={stats?.activeInterns ?? 0}
            label="Currently onboarded"
            loading={statsLoading}
          />
          <StatCard
            icon={<FileCheck className="h-5 w-5 text-primary" />}
            title="Docs Sent This Month"
            value={stats?.documentsSentThisMonth ?? 0}
            label="Offer / cert / completion"
            loading={statsLoading}
          />
          <StatCard
            icon={<Star className="h-5 w-5 text-primary" />}
            title="Avg Performance"
            value={
              stats
                ? stats.avgPerformance > 0
                  ? stats.avgPerformance.toFixed(1)
                  : "—"
                : "—"
            }
            label="Monthly score average"
            loading={statsLoading}
          />
        </div>
      </section>

      {/* Space Overview */}
      <section aria-label="Space overview" data-ocid="dashboard.spaces_section">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Enterprise Spaces
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SpaceCard
            icon={<Briefcase className="h-5 w-5 text-primary" />}
            space="Org"
            spaceKey="Org"
            total={stats?.orgCount ?? 0}
            active={
              stats
                ? Math.round(
                    (stats.orgCount * stats.activeInterns) /
                      Math.max(stats.totalInterns, 1),
                  )
                : 0
            }
            loading={statsLoading}
          />
          <SpaceCard
            icon={<Megaphone className="h-5 w-5 text-primary" />}
            space="Marketing"
            spaceKey="Marketing"
            total={stats?.marketingCount ?? 0}
            active={
              stats
                ? Math.round(
                    (stats.marketingCount * stats.activeInterns) /
                      Math.max(stats.totalInterns, 1),
                  )
                : 0
            }
            loading={statsLoading}
          />
          <SpaceCard
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            space="Learning"
            spaceKey="Learning"
            total={stats?.learningCount ?? 0}
            active={
              stats
                ? Math.round(
                    (stats.learningCount * stats.activeInterns) /
                      Math.max(stats.totalInterns, 1),
                  )
                : 0
            }
            loading={statsLoading}
          />
        </div>
      </section>

      {/* Activity Feed */}
      <section
        aria-label="Recent activity"
        data-ocid="dashboard.activity_section"
      >
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Recent Activity
          </h2>
          <div
            className="flex items-center gap-1.5 flex-wrap"
            aria-label="Activity filters"
          >
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                data-ocid={`dashboard.filter.${f.value}`}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth border ${
                  activeFilter === f.value
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {f.label}
                {f.value !== "all" && !activitiesLoading && (
                  <Badge
                    variant="secondary"
                    className="ml-1.5 px-1 py-0 text-[10px] h-4 min-w-4 inline-flex items-center justify-center"
                  >
                    {filterActivities(activities ?? [], f.value).length}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        <Card
          className="bg-card border-border"
          data-ocid="dashboard.activity_feed"
        >
          <CardHeader className="px-5 py-4 border-b border-border">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ActivityIcon className="h-4 w-4 text-primary" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 px-5">
            {activitiesLoading ? (
              <div>
                {["as0", "as1", "as2", "as3", "as4"].map((sk) => (
                  <ActivitySkeleton key={sk} />
                ))}
              </div>
            ) : displayedActivities.length === 0 ? (
              <div
                className="py-12 text-center"
                data-ocid="dashboard.activity.empty_state"
              >
                <ActivityIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No activity found
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {activeFilter !== "all"
                    ? "Try switching to a different filter"
                    : "Activity will appear here as you manage interns"}
                </p>
              </div>
            ) : (
              <div data-ocid="dashboard.activity_list">
                {displayedActivities.map((activity, i) => (
                  <div
                    key={activity.id}
                    data-ocid={`dashboard.activity.item.${i + 1}`}
                  >
                    <ActivityRow activity={activity} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
