import { c as createLucideIcon, e as useClients, q as useNavigate, r as reactExports, n as ClientStatus, j as jsxRuntimeExports, k as Button, S as STATUS_LABELS, l as Skeleton, i as STATUS_COLORS, m as Badge } from "./index-Cx0SFoKr.js";
import { C as CalendarDays } from "./calendar-days-CUp56a1d.js";
import { L as LayoutGrid } from "./layout-grid-DoX8Om2g.js";
import { C as ChevronLeft } from "./chevron-left-Ch1oeA39.js";
import { C as ChevronRight } from "./chevron-right-BzMjyBSE.js";
import { C as CircleAlert } from "./circle-alert-Cw6FqGd7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function dateKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function startOfDay(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TERMINAL_STATUSES = [
  ClientStatus.closedWon,
  ClientStatus.closedLost
];
function EventChip({
  event,
  onClick
}) {
  const chipCls = event.isOverdue ? "bg-red-500/20 text-red-300 border-red-500/30" : event.kind === "followup" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-purple-500/20 text-purple-300 border-purple-500/30";
  const sc = STATUS_COLORS[event.client.currentStatus];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      title: `${event.client.companyName} — ${STATUS_LABELS[event.client.currentStatus]}`,
      className: `w-full text-left text-xs px-1.5 py-0.5 rounded border truncate flex items-center gap-1 hover:opacity-80 transition-opacity ${chipCls}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: event.client.companyName })
      ]
    }
  );
}
function AgendaItem({
  event,
  onClick,
  index,
  ocidPrefix
}) {
  const sc = STATUS_COLORS[event.client.currentStatus];
  const kindLabel = event.kind === "followup" ? "Follow-up" : "Meeting";
  const kindColor = event.kind === "followup" ? "text-blue-400" : "text-purple-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `${ocidPrefix}.item.${index}`,
      className: "w-full text-left p-3 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: event.client.companyName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: event.client.contactPersonName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-xs font-medium mt-0.5 ${kindColor}`, children: [
              kindLabel,
              " · ",
              event.date.toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${sc.bg} ${sc.text} ${sc.border} border text-xs`, children: STATUS_LABELS[event.client.currentStatus] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "₹",
              event.client.dealValue.toLocaleString()
            ] })
          ] })
        ] }),
        event.isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5 text-xs text-red-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
          "Overdue"
        ] })
      ]
    }
  );
}
function ClientsCalendarPage() {
  const { data: clients, isLoading } = useClients();
  const navigate = useNavigate();
  const today = startOfDay(/* @__PURE__ */ new Date());
  const [viewYear, setViewYear] = reactExports.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = reactExports.useState(today.getMonth());
  const [showFollowUps, setShowFollowUps] = reactExports.useState(true);
  const [showMeetings, setShowMeetings] = reactExports.useState(true);
  const [showOverdueOnly, setShowOverdueOnly] = reactExports.useState(false);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const allEvents = reactExports.useMemo(() => {
    const list = [];
    for (const c of clients ?? []) {
      const isTerminal = TERMINAL_STATUSES.includes(c.currentStatus);
      if (c.followUpDate) {
        const d = startOfDay(c.followUpDate);
        list.push({
          client: c,
          kind: "followup",
          date: d,
          isOverdue: d < today && !isTerminal
        });
      }
      if (c.nextMeetingDate) {
        const d = startOfDay(c.nextMeetingDate);
        list.push({
          client: c,
          kind: "meeting",
          date: d,
          isOverdue: d < today && !isTerminal
        });
      }
    }
    return list;
  }, [clients, today]);
  const filteredEvents = reactExports.useMemo(() => {
    return allEvents.filter((e) => {
      if (!showFollowUps && e.kind === "followup") return false;
      if (!showMeetings && e.kind === "meeting") return false;
      if (showOverdueOnly && !e.isOverdue) return false;
      if (statusFilter !== "all" && e.client.currentStatus !== statusFilter)
        return false;
      return true;
    });
  }, [allEvents, showFollowUps, showMeetings, showOverdueOnly, statusFilter]);
  const eventsByDay = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const e of filteredEvents) {
      const k = dateKey(e.date);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(e);
    }
    return map;
  }, [filteredEvents]);
  const calendarCells = reactExports.useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startPad = firstDay.getDay();
    const totalCells = startPad + lastDay.getDate();
    const rows = Math.ceil(totalCells / 7);
    const cells = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++)
      cells.push(new Date(viewYear, viewMonth, d));
    while (cells.length < rows * 7) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);
  const todayEvents = reactExports.useMemo(
    () => filteredEvents.filter((e) => isSameDay(e.date, today)),
    [filteredEvents, today]
  );
  const sevenDaysOut = new Date(today);
  sevenDaysOut.setDate(today.getDate() + 7);
  const upcomingEvents = reactExports.useMemo(
    () => filteredEvents.filter((e) => e.date > today && e.date <= sevenDaysOut).sort((a, b) => a.date.getTime() - b.date.getTime()),
    [filteredEvents, today, sevenDaysOut]
  );
  const overdueEvents = reactExports.useMemo(
    () => filteredEvents.filter((e) => e.isOverdue).sort((a, b) => a.date.getTime() - b.date.getTime()),
    [filteredEvents]
  );
  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }
  function goToClient(id) {
    navigate({ to: "/clients/$id", params: { id } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", "data-ocid": "clients.calendar.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Follow-up Calendar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Scheduled follow-ups and upcoming meetings" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center bg-card border border-border rounded-lg p-1 gap-1",
          "data-ocid": "clients.view.toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-3 text-xs",
                "data-ocid": "clients.table.tab",
                onClick: () => navigate({ to: "/clients" }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-3.5 w-3.5 mr-1" }),
                  "Table"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-3 text-xs",
                "data-ocid": "clients.kanban.tab",
                onClick: () => navigate({ to: "/clients/kanban" }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5 mr-1" }),
                  "Kanban"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "h-7 px-3 text-xs bg-primary text-primary-foreground",
                "data-ocid": "clients.calendar.tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 mr-1" }),
                  "Calendar"
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-2",
        "data-ocid": "clients.calendar.filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowFollowUps((v) => !v),
              "data-ocid": "clients.calendar.followup.toggle",
              className: `text-xs px-3 py-1.5 rounded-full border transition-colors ${showFollowUps ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : "bg-muted/40 text-muted-foreground border-border"}`,
              children: "Follow-ups"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowMeetings((v) => !v),
              "data-ocid": "clients.calendar.meetings.toggle",
              className: `text-xs px-3 py-1.5 rounded-full border transition-colors ${showMeetings ? "bg-purple-500/20 text-purple-300 border-purple-500/40" : "bg-muted/40 text-muted-foreground border-border"}`,
              children: "Meetings"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowOverdueOnly((v) => !v),
              "data-ocid": "clients.calendar.overdue.toggle",
              className: `text-xs px-3 py-1.5 rounded-full border transition-colors ${showOverdueOnly ? "bg-red-500/20 text-red-300 border-red-500/40" : "bg-muted/40 text-muted-foreground border-border"}`,
              children: "Overdue only"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              "data-ocid": "clients.calendar.status.select",
              className: "ml-auto text-xs bg-card border border-border rounded-lg px-2.5 py-1.5 text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All statuses" }),
                Object.values(ClientStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s))
              ]
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: 35 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, i)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xl:flex-row gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              "data-ocid": "clients.calendar.prev_month",
              className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground", children: [
            MONTH_NAMES[viewMonth],
            " ",
            viewYear
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              "data-ocid": "clients.calendar.next_month",
              className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
              "aria-label": "Next month",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-1", children: DAY_NAMES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-xs font-medium text-muted-foreground py-1",
            children: d
          },
          d
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-0.5", children: calendarCells.map((cell, idx) => {
          if (!cell) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "min-h-[5rem] rounded-lg bg-muted/10"
              },
              `pad-${calendarCells.length}-${idx}`
            );
          }
          const isToday = isSameDay(cell, today);
          const k = dateKey(cell);
          const dayEvents = eventsByDay.get(k) ?? [];
          const isCurrentMonth = cell.getMonth() === viewMonth;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `min-h-[5rem] p-1 rounded-lg border transition-colors ${isToday ? "border-primary/70 bg-primary/5" : "border-border/40 bg-card/60 hover:bg-card"} ${!isCurrentMonth ? "opacity-40" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `text-xs font-medium mb-1 w-5 h-5 flex items-center justify-center rounded-full ${isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
                    children: cell.getDate()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                  dayEvents.slice(0, 3).map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    EventChip,
                    {
                      event: ev,
                      onClick: () => goToClient(ev.client.id)
                    },
                    `${ev.client.id}-${ev.kind}`
                  )),
                  dayEvents.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pl-1", children: [
                    "+",
                    dayEvents.length - 3,
                    " more"
                  ] })
                ] })
              ]
            },
            k
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm bg-blue-500/30 border border-blue-500/40" }),
            "Follow-up"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm bg-purple-500/30 border border-purple-500/40" }),
            "Meeting"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm bg-red-500/30 border border-red-500/40" }),
            "Overdue"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "xl:w-80 flex-shrink-0 space-y-4",
          "data-ocid": "clients.calendar.agenda",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                "Today's Agenda"
              ] }),
              todayEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center py-5 rounded-lg border border-dashed border-border/50",
                  "data-ocid": "clients.calendar.today.empty_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Nothing scheduled today" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: todayEvents.map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                AgendaItem,
                {
                  event: ev,
                  index: i + 1,
                  ocidPrefix: "clients.calendar.today",
                  onClick: () => goToClient(ev.client.id)
                },
                `${ev.client.id}-${ev.kind}`
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2", children: "Upcoming (next 7 days)" }),
              upcomingEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center py-5 rounded-lg border border-dashed border-border/50",
                  "data-ocid": "clients.calendar.upcoming.empty_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No upcoming events" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: upcomingEvents.map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                AgendaItem,
                {
                  event: ev,
                  index: i + 1,
                  ocidPrefix: "clients.calendar.upcoming",
                  onClick: () => goToClient(ev.client.id)
                },
                `${ev.client.id}-${ev.kind}`
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
                "Overdue (",
                overdueEvents.length,
                ")"
              ] }),
              overdueEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center py-5 rounded-lg border border-dashed border-border/50",
                  "data-ocid": "clients.calendar.overdue.empty_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No overdue follow-ups 🎉" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: overdueEvents.map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                AgendaItem,
                {
                  event: ev,
                  index: i + 1,
                  ocidPrefix: "clients.calendar.overdue",
                  onClick: () => goToClient(ev.client.id)
                },
                `${ev.client.id}-${ev.kind}`
              )) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  ClientsCalendarPage as default
};
