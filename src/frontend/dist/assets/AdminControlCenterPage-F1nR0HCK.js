import { u as useAuth, v as useInterns, j as jsxRuntimeExports, T as Target, s as Badge, U as Users, h as Calendar, N as SquareCheckBig, J as FileText, L as Link, m as Button } from "./index-BMeK9e6q.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BNUdlcux.js";
import { b as useMeetingsForUser } from "./use-meetings-DiE79CiM.js";
import { A as Activity } from "./activity-D5emh_j8.js";
import { Z as Zap } from "./zap-CrHUd2VU.js";
import { T as TrendingUp } from "./trending-up-DC4rcLjM.js";
const quickActions = [
  {
    label: "Add Intern",
    href: "/interns/new",
    icon: Users,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "View Tasks",
    href: "/tasks",
    icon: SquareCheckBig,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    label: "Meetings",
    href: "/meetings",
    icon: Calendar,
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    label: "Submissions",
    href: "/submissions",
    icon: FileText,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    label: "Automations",
    href: "/admin/automations",
    icon: Zap,
    color: "bg-green-500/10 text-green-400 border-green-500/20"
  },
  {
    label: "Analytics",
    href: "/clients/analytics",
    icon: TrendingUp,
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20"
  }
];
function AdminControlCenterPage() {
  const { displayName } = useAuth();
  const { data: interns = [] } = useInterns();
  const { data: meetings = [] } = useMeetingsForUser();
  const now = Date.now();
  const today = /* @__PURE__ */ new Date();
  const todayStr = today.toDateString();
  const todayMeetings = meetings.filter((m) => {
    const d = new Date(Number(m.scheduledAt) / 1e6);
    return d.toDateString() === todayStr;
  });
  const activeInterns = interns.filter((i) => i.isActive).length;
  const upcomingMeetings = meetings.filter(
    (m) => Number(m.scheduledAt) / 1e6 > now
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 max-w-6xl mx-auto space-y-8",
      "data-ocid": "control_center.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-6 w-6 text-primary" }),
              "Control Center"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
              "Welcome back,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: displayName }),
              ". Here's your operational overview."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "border-primary/30 text-primary bg-primary/5 px-3 py-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3 mr-1" }),
                " Live"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          {
            label: "Active Interns",
            value: activeInterns,
            icon: Users,
            color: "text-primary"
          },
          {
            label: "Today's Meetings",
            value: todayMeetings.length,
            icon: Calendar,
            color: "text-blue-400"
          },
          {
            label: "Upcoming Meetings",
            value: upcomingMeetings,
            icon: Calendar,
            color: "text-purple-400"
          },
          {
            label: "Total Interns",
            value: interns.length,
            icon: Users,
            color: "text-amber-400"
          }
        ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ] }) }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Quick Actions" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: quickActions.map(({ label, href, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: href,
              "data-ocid": `control_center.quick_${label.toLowerCase().replace(/ /g, "_")}_button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer hover:opacity-80 transition-all ${color}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-center leading-tight", children: label })
                  ]
                }
              )
            },
            href
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Today's Meetings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/meetings", children: "View All" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: todayMeetings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-8 text-muted-foreground",
              "data-ocid": "control_center.meetings_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No meetings scheduled for today" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: todayMeetings.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/50",
              "data-ocid": `control_center.meeting.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: m.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    new Date(
                      Number(m.scheduledAt) / 1e6
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    }),
                    " · ",
                    Number(m.durationMinutes),
                    "min"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: m.meetingType })
              ]
            },
            m.id
          )) }) })
        ] })
      ]
    }
  );
}
export {
  AdminControlCenterPage as default
};
