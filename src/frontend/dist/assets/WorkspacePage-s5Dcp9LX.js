import { $ as useParams, x as useNavigate, u as useAuth, a0 as useIntern, r as reactExports, ah as useKeyboardShortcuts, j as jsxRuntimeExports, m as Button, H as ArrowLeft, q as Skeleton, T as Target, ai as Upload, h as Calendar, C as Clock, J as FileText, s as Badge } from "./index-BMeK9e6q.js";
import { T as TaskModal, a as TaskStatusBadge } from "./TaskStatusBadge-CuX2yv0T.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BNUdlcux.js";
import { a as useWorkspaceData } from "./useWorkspace-Be9BQRA9.js";
import { C as CircleCheck } from "./circle-check-Cx8QEsVk.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { S as Star } from "./star-DrtMCmTX.js";
import { M as MessageSquare } from "./message-square-CxfKCy3s.js";
import "./input-nhKD80eO.js";
import "./label-D89oqzVf.js";
import "./select-D791wupo.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./index-NDr7xJHf.js";
import "./index-xhjDzk0w.js";
import "./chevron-down-DGBe83Kh.js";
import "./check-Bu_kUyWO.js";
import "./textarea-DLaPF2KD.js";
import "./circle-x-BSPQ7v7Q.js";
import "./circle-play-YIqeiF7u.js";
import "./circle-BCf6w77C.js";
function formatDeadline(deadline) {
  if (!deadline) return null;
  return new Date(Number(deadline) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  });
}
function formatMeetingTime(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function isOverdue(deadline) {
  if (!deadline) return false;
  return Number(deadline) / 1e6 < Date.now();
}
function PerformanceScoreCard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "inProgress").length;
  const score = total === 0 ? 0 : Math.round(completed / total * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary" }),
      "Performance Score"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-foreground", children: score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-1", children: "/100" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-2 rounded-full bg-primary transition-all duration-500",
          style: { width: `${score}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[oklch(var(--task-completed))]", children: completed }),
          " ",
          "done"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[oklch(var(--task-in-progress))]", children: inProgress }),
          " ",
          "active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-muted-foreground", children: total }),
          " ",
          "total"
        ] })
      ] })
    ] })
  ] });
}
function TaskSummaryWidget({
  tasks,
  onAddTask
}) {
  const counts = {};
  for (const t of tasks) {
    counts[t.status] = (counts[t.status] ?? 0) + 1;
  }
  const recent = tasks.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-primary" }),
        "Tasks"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          onClick: onAddTask,
          className: "h-7 px-2 text-xs text-primary hover:bg-primary/10",
          "data-ocid": "workspace.add_task_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
            "Add"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.entries(counts).map(([status, _count]) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskStatusBadge, { status, size: "sm" }, status)) }),
      recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-muted-foreground",
          "data-ocid": "workspace.tasks_empty_state",
          children: "No tasks yet. Add one to get started."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: recent.map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start justify-between gap-2",
          "data-ocid": `workspace.task.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xs font-medium truncate ${isOverdue(task.deadline) ? "text-primary" : "text-foreground"}`,
                  children: task.title
                }
              ),
              task.deadline && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                "Due ",
                formatDeadline(task.deadline)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TaskStatusBadge, { status: task.status, size: "sm" })
          ]
        },
        task.id
      )) })
    ] })
  ] });
}
function UpcomingDeadlinesWidget({ tasks }) {
  const upcoming = tasks.filter((t) => t.deadline && t.status !== "completed").sort((a, b) => Number(a.deadline ?? 0n) - Number(b.deadline ?? 0n)).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
      "Upcoming Deadlines"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground",
        "data-ocid": "workspace.deadlines_empty_state",
        children: "No upcoming deadlines."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: upcoming.map((task, idx) => {
      const overdue = isOverdue(task.deadline);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-center justify-between gap-2",
          "data-ocid": `workspace.deadline.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: task.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-[10px] font-medium ${overdue ? "text-primary" : "text-muted-foreground"}`,
                  children: overdue ? "Overdue" : formatDeadline(task.deadline)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-semibold px-1.5 py-0.5 rounded ${task.priority === "critical" || task.priority === "high" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                children: task.priority
              }
            )
          ]
        },
        task.id
      );
    }) }) })
  ] });
}
function DailyNotesWidget({ notes }) {
  const recent = [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }),
      "Daily Notes"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground",
        "data-ocid": "workspace.notes_empty_state",
        children: "No notes yet."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: recent.map((note, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "space-y-1",
        "data-ocid": `workspace.note.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-muted-foreground", children: note.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground line-clamp-2", children: note.workedOn }),
          note.blockers && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-primary line-clamp-1", children: [
            "⚠ ",
            note.blockers
          ] })
        ]
      },
      note.id
    )) }) })
  ] });
}
function SubmissionsWidget({ submissions }) {
  const pending = submissions.filter((s) => s.status === "pending").length;
  const approved = submissions.filter((s) => s.status === "approved").length;
  const total = submissions.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-primary" }),
      "Submissions"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: total === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground",
        "data-ocid": "workspace.submissions_empty_state",
        children: "No submissions yet."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[oklch(var(--submission-pending))]", children: pending }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "pending" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[oklch(var(--submission-approved))]", children: approved }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "approved" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          total,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: submissions.slice(0, 3).map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-center justify-between gap-2",
          "data-ocid": `workspace.submission.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground truncate", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] capitalize border-border",
                children: s.status
              }
            )
          ]
        },
        s.id
      )) })
    ] }) })
  ] });
}
function MeetingsWidget({ meetings }) {
  const upcoming = [...meetings].filter((m) => Number(m.scheduledAt) / 1e6 > Date.now()).sort((a, b) => Number(a.scheduledAt) - Number(b.scheduledAt)).slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }),
      "Meeting Schedule"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground",
        "data-ocid": "workspace.meetings_empty_state",
        children: "No upcoming meetings."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: upcoming.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "space-y-1",
        "data-ocid": `workspace.meeting.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            formatMeetingTime(m.scheduledAt),
            " ·",
            " ",
            Number(m.durationMinutes),
            "min"
          ] }),
          m.joinLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: m.joinLink,
              target: "_blank",
              rel: "noreferrer",
              className: "text-[10px] text-primary underline-offset-2 hover:underline",
              "data-ocid": `workspace.meeting_join.${idx + 1}`,
              children: "Join link →"
            }
          )
        ]
      },
      m.id
    )) }) })
  ] });
}
function MessagesWidget({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary" }),
      "Messages"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: count === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground",
        "data-ocid": "workspace.messages_empty_state",
        children: "No new messages."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-foreground", children: count }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "unread messages" })
    ] }) })
  ] });
}
function WorkspacePage() {
  const { internId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { sessionToken } = useAuth();
  const { data: intern, isLoading: internLoading } = useIntern(internId);
  const { data: workspace, isLoading: wsLoading } = useWorkspaceData(internId);
  const [taskModalOpen, setTaskModalOpen] = reactExports.useState(false);
  const shortcuts = reactExports.useMemo(
    () => [
      {
        key: "t",
        ctrl: false,
        handler: () => setTaskModalOpen(true),
        description: "New task (T)"
      }
    ],
    []
  );
  useKeyboardShortcuts(shortcuts);
  const isLoading = internLoading || wsLoading;
  const unreadCount = ((workspace == null ? void 0 : workspace.directMessages.filter((dm) => !dm.isRead).length) ?? 0) + ((workspace == null ? void 0 : workspace.channelMessages.length) ?? 0);
  if (!sessionToken) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 text-center text-muted-foreground",
        "data-ocid": "workspace.error_state",
        children: "Please log in to view the workspace."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          onClick: () => void navigate({ to: "/interns" }),
          className: "h-8 w-8 text-muted-foreground",
          "data-ocid": "workspace.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: (intern == null ? void 0 : intern.name) ?? "Workspace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          intern == null ? void 0 : intern.department,
          " · ",
          intern == null ? void 0 : intern.space,
          " Space"
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "workspace.loading_state",
        children: Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static length array, stable order
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, `skeleton-${i}`)
        ))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: [
        {
          label: "Total Tasks",
          value: (workspace == null ? void 0 : workspace.tasks.length) ?? 0,
          icon: Target,
          color: "text-primary"
        },
        {
          label: "Completed",
          value: (workspace == null ? void 0 : workspace.tasks.filter((t) => t.status === "completed").length) ?? 0,
          icon: CircleCheck,
          color: "text-[oklch(var(--task-completed))]"
        },
        {
          label: "Submissions",
          value: (workspace == null ? void 0 : workspace.submissions.length) ?? 0,
          icon: Upload,
          color: "text-[oklch(var(--task-in-progress))]"
        },
        {
          label: "Meetings",
          value: (workspace == null ? void 0 : workspace.meetings.length) ?? 0,
          icon: Calendar,
          color: "text-[oklch(var(--task-under-review))]"
        }
      ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 flex-shrink-0 ${color}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground leading-none", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: label })
            ] })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "workspace.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TaskSummaryWidget,
              {
                tasks: (workspace == null ? void 0 : workspace.tasks) ?? [],
                onAddTask: () => setTaskModalOpen(true)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceScoreCard, { tasks: (workspace == null ? void 0 : workspace.tasks) ?? [] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingDeadlinesWidget, { tasks: (workspace == null ? void 0 : workspace.tasks) ?? [] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DailyNotesWidget, { notes: (workspace == null ? void 0 : workspace.notes) ?? [] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesWidget, { count: unreadCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionsWidget, { submissions: (workspace == null ? void 0 : workspace.submissions) ?? [] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingsWidget, { meetings: (workspace == null ? void 0 : workspace.meetings) ?? [] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskModal,
      {
        open: taskModalOpen,
        onClose: () => setTaskModalOpen(false),
        prefillInternId: internId
      }
    )
  ] });
}
export {
  WorkspacePage,
  WorkspacePage as default
};
