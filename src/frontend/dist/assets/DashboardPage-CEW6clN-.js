import { c as createLucideIcon, r as reactExports, u as useAuth, a as useAnnouncements, b as useCreateAnnouncement, d as useAnalyticsDashboard, e as useClients, f as useCRMFunnelData, g as useRecentlyViewedClients, j as jsxRuntimeExports, U as Users, T as Target, L as Link, B as Briefcase, C as Clock, h as Calendar, E as Eye, S as STATUS_LABELS, i as STATUS_COLORS, M as Megaphone, k as BookOpen, D as Dialog, l as DialogTrigger, m as Button, n as DialogContent, o as DialogHeader, p as DialogTitle, q as Skeleton, s as Badge, t as ClientStatus } from "./index-BMeK9e6q.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BNUdlcux.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { u as useDashboardStats, a as useActivities } from "./use-dashboard-CKbYYWER.js";
import { U as UserCheck } from "./user-check-DAbrVFSj.js";
import { S as Star } from "./star-DrtMCmTX.js";
import { C as ChevronRight } from "./chevron-right-BUvIyUor.js";
import { D as DollarSign } from "./dollar-sign-IWKJJ13E.js";
import { T as TrendingUp } from "./trending-up-DC4rcLjM.js";
import { Z as Zap } from "./zap-CrHUd2VU.js";
import { C as CircleAlert } from "./circle-alert-OEcBqI8h.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { A as Activity } from "./activity-D5emh_j8.js";
import { U as UserPlus } from "./user-plus-BzTEHUlK.js";
import { M as MessageSquare } from "./message-square-CxfKCy3s.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
const FileCheck = createLucideIcon("file-check", __iconNode);
const CLOSED_STATUSES = /* @__PURE__ */ new Set([
  ClientStatus.closedWon,
  ClientStatus.closedLost,
  ClientStatus.onHold
]);
function formatCurrency(value) {
  if (value >= 1e6) return `₹${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`;
  return `₹${value.toLocaleString("en-IN")}`;
}
const QUICK_FILTERS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" }
];
function relativeTime(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
function activityIcon(action) {
  const a = action.toLowerCase();
  if (a.includes("create") || a.includes("add"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 text-primary" });
  if (a.includes("update") || a.includes("edit"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" });
  if (a.includes("document") || a.includes("letter"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-4 w-4 text-primary" });
  if (a.includes("whatsapp") || a.includes("message"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary" });
  if (a.includes("performance"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-muted-foreground" });
}
function filterActivities(activities, filter) {
  if (filter === "all") return activities;
  const map = {
    all: "",
    active: "active",
    completed: "complet",
    on_hold: "hold"
  };
  const keyword = map[filter];
  return activities.filter(
    (a) => a.action.toLowerCase().includes(keyword) || a.details.toLowerCase().includes(keyword)
  );
}
function StatCard({
  icon,
  title,
  value,
  label,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide truncate", children: title }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-20 ml-auto mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground mt-0.5 tabular-nums", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: label })
    ] })
  ] }) }) });
}
function SpaceCard({
  icon,
  space,
  spaceKey,
  total,
  active,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/40 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: space }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enterprise Space" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: total }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: active }),
        " ",
        "active intern",
        active !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/interns",
        "data-ocid": `space_card.${spaceKey.toLowerCase()}.link`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "w-full gap-1.5 border-border hover:border-primary/50 hover:text-primary text-xs",
            children: [
              "View Interns ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
            ]
          }
        )
      }
    )
  ] }) });
}
function ActivityRow({ activity }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-full bg-muted flex-shrink-0 mt-0.5", children: activityIcon(activity.action) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: activity.action }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: activity.details })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 mt-0.5", children: relativeTime(activity.timestamp) })
  ] });
}
function ActivitySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 flex-shrink-0" })
  ] });
}
function DashboardPage() {
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { displayName } = useAuth();
  const { data: announcements = [], isLoading: announcementsLoading } = useAnnouncements(true);
  const createAnnouncement = useCreateAnnouncement();
  const [announcementModalOpen, setAnnouncementModalOpen] = reactExports.useState(false);
  const [newTitle, setNewTitle] = reactExports.useState("");
  const [newContent, setNewContent] = reactExports.useState("");
  const isAdmin = displayName === "Venkat Asrith" || displayName === "Jay Chandra";
  const handlePostAnnouncement = () => {
    if (!newTitle.trim() || !newContent.trim() || !displayName) return;
    createAnnouncement.mutate(
      {
        title: newTitle.trim(),
        content: newContent.trim(),
        createdBy: displayName
      },
      {
        onSuccess: () => {
          setNewTitle("");
          setNewContent("");
          setAnnouncementModalOpen(false);
        }
      }
    );
  };
  const { data: analyticsData } = useAnalyticsDashboard();
  const { data: allClients } = useClients();
  const { data: _funnelData } = useCRMFunnelData();
  const { recent: recentClientIds } = useRecentlyViewedClients();
  const activeDeals = reactExports.useMemo(
    () => (allClients ?? []).filter((c) => !CLOSED_STATUSES.has(c.currentStatus)).length,
    [allClients]
  );
  const overdueFollowUps = reactExports.useMemo(
    () => (allClients ?? []).filter(
      (c) => c.followUpDate && c.followUpDate < /* @__PURE__ */ new Date()
    ),
    [allClients]
  );
  const todayFollowUps = reactExports.useMemo(() => {
    const todayStart = /* @__PURE__ */ new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = /* @__PURE__ */ new Date();
    todayEnd.setHours(23, 59, 59, 999);
    return (allClients ?? []).filter(
      (c) => c.followUpDate && c.followUpDate >= todayStart && c.followUpDate <= todayEnd
    );
  }, [allClients]);
  const recentClients = reactExports.useMemo(
    () => recentClientIds.slice(0, 5).map((id) => (allClients ?? []).find((c) => c.id === id)).filter((c) => !!c),
    [recentClientIds, allClients]
  );
  const filteredActivities = reactExports.useMemo(
    () => filterActivities(activities ?? [], activeFilter),
    [activities, activeFilter]
  );
  const displayedActivities = filteredActivities.slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 space-y-6 max-w-7xl mx-auto",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: displayName ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Hello ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: displayName })
          ] }) : "Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Welcome to TechMecha Torque IMS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Statistics", "data-ocid": "dashboard.stats_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
              title: "Total Interns",
              value: (stats == null ? void 0 : stats.totalInterns) ?? 0,
              label: "Across all spaces",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-5 w-5 text-primary" }),
              title: "Active Interns",
              value: (stats == null ? void 0 : stats.activeInterns) ?? 0,
              label: "Currently onboarded",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-5 w-5 text-primary" }),
              title: "Docs Sent This Month",
              value: (stats == null ? void 0 : stats.documentsSentThisMonth) ?? 0,
              label: "Offer / cert / completion",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-primary" }),
              title: "Avg Performance",
              value: stats ? stats.avgPerformance > 0 ? stats.avgPerformance.toFixed(1) : "—" : "—",
              label: "Monthly score average",
              loading: statsLoading
            }
          )
        ] }) }),
        analyticsData && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "CRM pipeline", "data-ocid": "dashboard.crm_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-primary" }),
              "CRM Pipeline"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/clients",
                className: "text-xs text-primary hover:underline flex items-center gap-1",
                "data-ocid": "dashboard.crm_view_all_link",
                children: [
                  "View clients ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border",
                "data-ocid": "dashboard.crm.total_pipeline_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Total Pipeline" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums", children: formatCurrency(analyticsData.totalPipeline) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "All active deals" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border",
                "data-ocid": "dashboard.crm.weighted_forecast_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Weighted Forecast" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums", children: formatCurrency(analyticsData.weightedForecast) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Probability-adjusted" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border",
                "data-ocid": "dashboard.crm.win_rate_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Win Rate" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground tabular-nums", children: [
                    analyticsData.winRate.toFixed(1),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Closed Won vs Total" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border",
                "data-ocid": "dashboard.crm.active_deals_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Active Deals" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums", children: activeDeals }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "In-progress clients" })
                ] })
              }
            )
          ] })
        ] }),
        (overdueFollowUps.length > 0 || todayFollowUps.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "aria-label": "Today's digest",
            "data-ocid": "dashboard.digest_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border border-l-4 border-l-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Today's Digest" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/clients",
                    "data-ocid": "dashboard.digest.view_clients_link",
                    className: "text-xs text-primary hover:underline flex items-center gap-1",
                    children: [
                      "Open Clients ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: [
                overdueFollowUps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400",
                    "data-ocid": "dashboard.digest.overdue_count",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: overdueFollowUps.length }),
                        " overdue follow-up",
                        overdueFollowUps.length !== 1 ? "s" : ""
                      ] })
                    ]
                  }
                ),
                todayFollowUps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400",
                    "data-ocid": "dashboard.digest.today_count",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: todayFollowUps.length }),
                        " follow-up",
                        todayFollowUps.length !== 1 ? "s" : "",
                        " due today"
                      ] })
                    ]
                  }
                )
              ] })
            ] }) })
          }
        ),
        recentClients.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "aria-label": "Recently viewed clients",
            "data-ocid": "dashboard.recently_viewed_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 text-primary" }),
                "Recently Viewed"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: recentClients.map((client, i) => {
                var _a, _b, _c;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/clients/$id",
                    params: { id: client.id },
                    "data-ocid": `dashboard.recently_viewed.item.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors cursor-pointer min-w-0 max-w-[200px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: client.companyName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-[10px] px-1.5 py-0 rounded-full border ${((_a = STATUS_COLORS[client.currentStatus]) == null ? void 0 : _a.bg) ?? "bg-muted"} ${((_b = STATUS_COLORS[client.currentStatus]) == null ? void 0 : _b.text) ?? "text-muted-foreground"} ${((_c = STATUS_COLORS[client.currentStatus]) == null ? void 0 : _c.border) ?? "border-border"}`,
                              children: STATUS_LABELS[client.currentStatus]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: formatCurrency(client.dealValue) })
                        ] })
                      ] })
                    ] })
                  },
                  client.id
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Space overview", "data-ocid": "dashboard.spaces_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Enterprise Spaces" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SpaceCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5 text-primary" }),
                space: "Org",
                spaceKey: "Org",
                total: (stats == null ? void 0 : stats.orgCount) ?? 0,
                active: stats ? Math.round(
                  stats.orgCount * stats.activeInterns / Math.max(stats.totalInterns, 1)
                ) : 0,
                loading: statsLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SpaceCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5 text-primary" }),
                space: "Marketing",
                spaceKey: "Marketing",
                total: (stats == null ? void 0 : stats.marketingCount) ?? 0,
                active: stats ? Math.round(
                  stats.marketingCount * stats.activeInterns / Math.max(stats.totalInterns, 1)
                ) : 0,
                loading: statsLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SpaceCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }),
                space: "Learning",
                spaceKey: "Learning",
                total: (stats == null ? void 0 : stats.learningCount) ?? 0,
                active: stats ? Math.round(
                  stats.learningCount * stats.activeInterns / Math.max(stats.totalInterns, 1)
                ) : 0,
                loading: statsLoading
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "aria-label": "Announcements",
            "data-ocid": "dashboard.announcements_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4 text-primary" }),
                  "Announcements"
                ] }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Dialog,
                  {
                    open: announcementModalOpen,
                    onOpenChange: setAnnouncementModalOpen,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          className: "gap-1.5 text-xs",
                          "data-ocid": "dashboard.new_announcement_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                            " New Announcement"
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "dashboard.announcement_dialog", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-semibold", children: "Post Announcement" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-title", className: "text-xs", children: "Title" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "ann-title",
                                value: newTitle,
                                onChange: (e) => setNewTitle(e.target.value),
                                placeholder: "Announcement title",
                                className: "mt-1",
                                "data-ocid": "dashboard.announcement_title_input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-content", className: "text-xs", children: "Content" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Textarea,
                              {
                                id: "ann-content",
                                value: newContent,
                                onChange: (e) => setNewContent(e.target.value),
                                placeholder: "Write the announcement...",
                                rows: 4,
                                className: "mt-1",
                                "data-ocid": "dashboard.announcement_content_input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              type: "button",
                              className: "w-full",
                              disabled: !newTitle.trim() || !newContent.trim() || createAnnouncement.isPending,
                              onClick: handlePostAnnouncement,
                              "data-ocid": "dashboard.announcement_submit_button",
                              children: createAnnouncement.isPending ? "Posting..." : "Post Announcement"
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "bg-card border-border",
                  "data-ocid": "dashboard.announcements_card",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: announcementsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)) }) : announcements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-12 text-center",
                      "data-ocid": "dashboard.announcements.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-10 w-10 text-muted-foreground/40 mx-auto mb-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No announcements yet" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: isAdmin ? "Post an announcement to share updates with the team" : "Check back later for updates" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: announcements.map((ann, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-5 py-4 hover:bg-muted/30 transition-colors",
                      "data-ocid": `dashboard.announcement.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: ann.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 whitespace-pre-wrap", children: ann.content }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs text-muted-foreground/70", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            "By ",
                            ann.createdBy
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(
                            Number(ann.createdAt) / 1e6
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          }) })
                        ] })
                      ]
                    },
                    ann.id
                  )) }) })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "aria-label": "Recent activity",
            "data-ocid": "dashboard.activity_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Recent Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex items-center gap-1.5 flex-wrap",
                    "aria-label": "Activity filters",
                    children: QUICK_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setActiveFilter(f.value),
                        "data-ocid": `dashboard.filter.${f.value}`,
                        className: `px-3 py-1 rounded-full text-xs font-medium transition-smooth border ${activeFilter === f.value ? "bg-primary border-primary text-primary-foreground shadow-sm" : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`,
                        children: [
                          f.label,
                          f.value !== "all" && !activitiesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "ml-1.5 px-1 py-0 text-[10px] h-4 min-w-4 inline-flex items-center justify-center",
                              children: filterActivities(activities ?? [], f.value).length
                            }
                          )
                        ]
                      },
                      f.value
                    ))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "bg-card border-border",
                  "data-ocid": "dashboard.activity_feed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-5 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-primary" }),
                      "Activity Log"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 px-5", children: activitiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: ["as0", "as1", "as2", "as3", "as4"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActivitySkeleton, {}, sk)) }) : displayedActivities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "py-12 text-center",
                        "data-ocid": "dashboard.activity.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-10 w-10 text-muted-foreground/40 mx-auto mb-3" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No activity found" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: activeFilter !== "all" ? "Try switching to a different filter" : "Activity will appear here as you manage interns" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.activity_list", children: displayedActivities.map((activity, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `dashboard.activity.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityRow, { activity })
                      },
                      activity.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  DashboardPage
};
