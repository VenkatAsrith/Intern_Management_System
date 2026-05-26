import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  useAnalyticsDashboard,
  useCRMFunnelData,
  useClients,
  useRecentlyViewedClients,
} from "@/hooks/use-clients";
import { useActivities, useDashboardStats } from "@/hooks/use-dashboard";
import {
  useAnnouncements,
  useCreateAnnouncement,
} from "@/hooks/use-notifications";
import type { Activity } from "@/types";
import { ClientStatus, STATUS_COLORS, STATUS_LABELS } from "@/types/clients";
import { Link } from "@tanstack/react-router";
import {
  Activity as ActivityIcon,
  AlertCircle,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  FileCheck,
  Megaphone,
  MessageSquare,
  Phone,
  Plus,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

const CLOSED_STATUSES = new Set([
  ClientStatus.closedWon,
  ClientStatus.closedLost,
  ClientStatus.onHold,
]);

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `₹${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value.toLocaleString("en-IN")}`;
}

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
  const { data: announcements = [], isLoading: announcementsLoading } =
    useAnnouncements(true);
  const createAnnouncement = useCreateAnnouncement();

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const isAdmin =
    displayName === "Venkat Asrith" || displayName === "Jay Chandra";

  const handlePostAnnouncement = () => {
    if (!newTitle.trim() || !newContent.trim() || !displayName) return;
    createAnnouncement.mutate(
      {
        title: newTitle.trim(),
        content: newContent.trim(),
        createdBy: displayName,
      },
      {
        onSuccess: () => {
          setNewTitle("");
          setNewContent("");
          setAnnouncementModalOpen(false);
        },
      },
    );
  };

  const { data: analyticsData } = useAnalyticsDashboard();
  const { data: allClients } = useClients();
  const { data: _funnelData } = useCRMFunnelData();
  const { recent: recentClientIds } = useRecentlyViewedClients();

  const activeDeals = useMemo(
    () =>
      (allClients ?? []).filter((c) => !CLOSED_STATUSES.has(c.currentStatus))
        .length,
    [allClients],
  );

  const overdueFollowUps = useMemo(
    () =>
      (allClients ?? []).filter(
        (c) => c.followUpDate && c.followUpDate < new Date(),
      ),
    [allClients],
  );

  const todayFollowUps = useMemo(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    return (allClients ?? []).filter(
      (c) =>
        c.followUpDate &&
        c.followUpDate >= todayStart &&
        c.followUpDate <= todayEnd,
    );
  }, [allClients]);

  const recentClients = useMemo(
    () =>
      recentClientIds
        .slice(0, 5)
        .map((id) => (allClients ?? []).find((c) => c.id === id))
        .filter((c): c is NonNullable<typeof c> => !!c),
    [recentClientIds, allClients],
  );

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

      {/* CRM Summary Cards */}
      {analyticsData && (
        <section aria-label="CRM pipeline" data-ocid="dashboard.crm_section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              CRM Pipeline
            </h2>
            <Link
              to="/clients"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="dashboard.crm_view_all_link"
            >
              View clients <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card
              className="bg-card border-border"
              data-ocid="dashboard.crm.total_pipeline_card"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Total Pipeline
                  </p>
                </div>
                <p className="text-xl font-bold text-foreground tabular-nums">
                  {formatCurrency(analyticsData.totalPipeline)}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  All active deals
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-card border-border"
              data-ocid="dashboard.crm.weighted_forecast_card"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Weighted Forecast
                  </p>
                </div>
                <p className="text-xl font-bold text-foreground tabular-nums">
                  {formatCurrency(analyticsData.weightedForecast)}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Probability-adjusted
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-card border-border"
              data-ocid="dashboard.crm.win_rate_card"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Win Rate
                  </p>
                </div>
                <p className="text-xl font-bold text-foreground tabular-nums">
                  {analyticsData.winRate.toFixed(1)}%
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Closed Won vs Total
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-card border-border"
              data-ocid="dashboard.crm.active_deals_card"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Active Deals
                  </p>
                </div>
                <p className="text-xl font-bold text-foreground tabular-nums">
                  {activeDeals}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  In-progress clients
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Today's Digest */}
      {(overdueFollowUps.length > 0 || todayFollowUps.length > 0) && (
        <section
          aria-label="Today's digest"
          data-ocid="dashboard.digest_section"
        >
          <Card className="bg-card border-border border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Today's Digest
                  </span>
                </div>
                <Link
                  to="/clients"
                  data-ocid="dashboard.digest.view_clients_link"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Open Clients <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                {overdueFollowUps.length > 0 && (
                  <div
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                    data-ocid="dashboard.digest.overdue_count"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>
                      <strong>{overdueFollowUps.length}</strong> overdue
                      follow-up
                      {overdueFollowUps.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                {todayFollowUps.length > 0 && (
                  <div
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    data-ocid="dashboard.digest.today_count"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      <strong>{todayFollowUps.length}</strong> follow-up
                      {todayFollowUps.length !== 1 ? "s" : ""} due today
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Recently Viewed Clients */}
      {recentClients.length > 0 && (
        <section
          aria-label="Recently viewed clients"
          data-ocid="dashboard.recently_viewed_section"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              Recently Viewed
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {recentClients.map((client, i) => (
              <Link
                key={client.id}
                to="/clients/$id"
                params={{ id: client.id }}
                data-ocid={`dashboard.recently_viewed.item.${i + 1}`}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors cursor-pointer min-w-0 max-w-[200px]">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-3 w-3 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {client.companyName}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-[10px] px-1.5 py-0 rounded-full border ${
                          STATUS_COLORS[client.currentStatus]?.bg ?? "bg-muted"
                        } ${
                          STATUS_COLORS[client.currentStatus]?.text ??
                          "text-muted-foreground"
                        } ${
                          STATUS_COLORS[client.currentStatus]?.border ??
                          "border-border"
                        }`}
                      >
                        {STATUS_LABELS[client.currentStatus]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatCurrency(client.dealValue)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

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

      {/* Announcement Board */}
      <section
        aria-label="Announcements"
        data-ocid="dashboard.announcements_section"
      >
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-primary" />
            Announcements
          </h2>
          {isAdmin && (
            <Dialog
              open={announcementModalOpen}
              onOpenChange={setAnnouncementModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  data-ocid="dashboard.new_announcement_button"
                >
                  <Plus className="h-3.5 w-3.5" /> New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="dashboard.announcement_dialog">
                <DialogHeader>
                  <DialogTitle className="text-sm font-semibold">
                    Post Announcement
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="ann-title" className="text-xs">
                      Title
                    </Label>
                    <Input
                      id="ann-title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Announcement title"
                      className="mt-1"
                      data-ocid="dashboard.announcement_title_input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ann-content" className="text-xs">
                      Content
                    </Label>
                    <Textarea
                      id="ann-content"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Write the announcement..."
                      rows={4}
                      className="mt-1"
                      data-ocid="dashboard.announcement_content_input"
                    />
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={
                      !newTitle.trim() ||
                      !newContent.trim() ||
                      createAnnouncement.isPending
                    }
                    onClick={handlePostAnnouncement}
                    data-ocid="dashboard.announcement_submit_button"
                  >
                    {createAnnouncement.isPending
                      ? "Posting..."
                      : "Post Announcement"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Card
          className="bg-card border-border"
          data-ocid="dashboard.announcements_card"
        >
          <CardContent className="p-0">
            {announcementsLoading ? (
              <div className="p-5 space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : announcements.length === 0 ? (
              <div
                className="py-12 text-center"
                data-ocid="dashboard.announcements.empty_state"
              >
                <Megaphone className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No announcements yet
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {isAdmin
                    ? "Post an announcement to share updates with the team"
                    : "Check back later for updates"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {announcements.map((ann, i) => (
                  <div
                    key={ann.id}
                    className="px-5 py-4 hover:bg-muted/30 transition-colors"
                    data-ocid={`dashboard.announcement.item.${i + 1}`}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {ann.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">
                      {ann.content}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground/70">
                      <span>By {ann.createdBy}</span>
                      <span>&middot;</span>
                      <span>
                        {new Date(
                          Number(ann.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
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
