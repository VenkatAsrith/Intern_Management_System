import { c as createLucideIcon, r as reactExports, u as useAuth, j as jsxRuntimeExports, U as Users, B as Briefcase, M as Megaphone, a as Badge, S as Skeleton, L as Link, b as Button } from "./index-BIeIRmcz.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-CnYrvark.js";
import { u as useDashboardStats, a as useActivities } from "./use-dashboard-BgAVUAdU.js";
import { A as Activity, T as TrendingUp } from "./trending-up-B9tTcmkl.js";
import { C as ChevronRight } from "./chevron-right-DLdArfgj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
const FileCheck = createLucideIcon("file-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
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
