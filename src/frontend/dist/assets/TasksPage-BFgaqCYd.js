import { j as jsxRuntimeExports, af as cn, u as useAuth, v as useInterns, r as reactExports, ah as useKeyboardShortcuts, m as Button, y as Search, q as Skeleton, am as TriangleAlert, s as Badge } from "./index-BMeK9e6q.js";
import { n as normalizeStatus, T as TaskModal, a as TaskStatusBadge } from "./TaskStatusBadge-CuX2yv0T.js";
import { I as Input } from "./input-nhKD80eO.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D791wupo.js";
import { b as useAllTasks, c as useUpdateTask, d as useDeleteTask } from "./useWorkspace-Be9BQRA9.js";
import { D as Download } from "./download-DS5zENBd.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { F as Funnel } from "./funnel-B9aSgJOR.js";
import { P as Pencil } from "./pencil-BSgzfHm1.js";
import { T as Trash2 } from "./trash-2-C-AHX60a.js";
import { C as ChevronDown } from "./chevron-down-DGBe83Kh.js";
import "./label-D89oqzVf.js";
import "./textarea-DLaPF2KD.js";
import "./circle-x-BSPQ7v7Q.js";
import "./circle-check-Cx8QEsVk.js";
import "./circle-play-YIqeiF7u.js";
import "./circle-BCf6w77C.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./index-NDr7xJHf.js";
import "./index-xhjDzk0w.js";
import "./check-Bu_kUyWO.js";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const ALL_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "inProgress", label: "In Progress" },
  { value: "underReview", label: "Under Review" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
  { value: "reworkNeeded", label: "Rework Needed" }
];
const ALL_PRIORITIES = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];
const ALL_SPACES = [
  { value: "all", label: "All Spaces" },
  { value: "Org", label: "Org" },
  { value: "Marketing", label: "Marketing" },
  { value: "Learning", label: "Learning" }
];
const PRIORITY_ORDER = ["critical", "high", "medium", "low"];
function formatDeadline(deadline) {
  if (!deadline) return "—";
  return new Date(Number(deadline) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function isOverdue(deadline) {
  if (!deadline) return false;
  return Number(deadline) / 1e6 < Date.now();
}
function csvExport(tasks, internNames) {
  const rows = [
    ["Title", "Status", "Priority", "Deadline", "Assigned To", "Space", "Tags"],
    ...tasks.map((t) => [
      t.title,
      t.status,
      t.priority,
      formatDeadline(t.deadline),
      internNames[t.assignedInternId] ?? t.assignedInternId,
      t.teamSpace,
      t.tags.join("; ")
    ])
  ];
  const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function InlineStatusSelect({
  task,
  onUpdate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Select,
    {
      value: normalizeStatus(task.status),
      onValueChange: (v) => onUpdate(task.id, v),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SelectTrigger,
          {
            className: "h-7 w-36 border-0 bg-transparent p-0 text-xs",
            "data-ocid": `task.status_select.${task.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TaskStatusBadge, { status: task.status, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 ml-auto text-muted-foreground" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: ALL_STATUSES.filter((s) => s.value !== "all").map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
      ]
    }
  );
}
function TasksPage() {
  const { isAdmin, sessionToken } = useAuth();
  const currentUserId = sessionToken ? sessionToken.split(":")[0] : "";
  const { data: tasks = [], isLoading } = useAllTasks();
  const { data: interns = [] } = useInterns();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [priorityFilter, setPriorityFilter] = reactExports.useState("all");
  const [spaceFilter, setSpaceFilter] = reactExports.useState("all");
  const [assigneeFilter, setAssigneeFilter] = reactExports.useState("all");
  const [taskModalOpen, setTaskModalOpen] = reactExports.useState(false);
  const [editTask, setEditTask] = reactExports.useState(null);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const internNames = reactExports.useMemo(() => {
    const map = {};
    for (const i of interns) map[i.id] = i.name;
    return map;
  }, [interns]);
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
  const filtered = reactExports.useMemo(() => {
    return tasks.filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q))
          return false;
      }
      if (statusFilter !== "all" && normalizeStatus(t.status) !== statusFilter)
        return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter)
        return false;
      if (spaceFilter !== "all" && t.teamSpace !== spaceFilter) return false;
      if (assigneeFilter !== "all" && t.assignedInternId !== assigneeFilter)
        return false;
      return true;
    }).sort(
      (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)
    );
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    spaceFilter,
    assigneeFilter
  ]);
  const completedCount = tasks.filter(
    (t) => normalizeStatus(t.status) === "completed"
  ).length;
  const completionPct = tasks.length === 0 ? 0 : Math.round(completedCount / tasks.length * 100);
  function handleStatusChange(id, status) {
    void updateTask.mutateAsync({ id, payload: { status } });
  }
  function handleDelete(id) {
    void deleteTask.mutateAsync(id).then(() => setDeleteConfirm(null));
  }
  if (!sessionToken) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 text-center text-muted-foreground",
        "data-ocid": "tasks.error_state",
        children: "Please log in to view tasks."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "Tasks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            tasks.length,
            " tasks · ",
            completionPct,
            "% complete"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => csvExport(filtered, internNames),
              className: "border-border text-muted-foreground h-8",
              "data-ocid": "tasks.export_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Export"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: () => {
                setEditTask(null);
                setTaskModalOpen(true);
              },
              className: "bg-primary text-primary-foreground h-8",
              "data-ocid": "tasks.new_task_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1.5" }),
                "New Task",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-2 text-[10px] opacity-60 border border-primary-foreground/20 rounded px-1", children: "T" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overall Completion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            completionPct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-1.5 rounded-full bg-primary transition-all duration-500",
            style: { width: `${completionPct}%` }
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/50 border-b border-border px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search tasks...",
            className: "pl-8 h-8 bg-background border-border text-sm",
            "data-ocid": "tasks.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5 text-muted-foreground hidden sm:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-8 w-36 text-xs bg-background border-border",
            "data-ocid": "tasks.status_filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, className: "text-xs", children: s.label }, s.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priorityFilter, onValueChange: setPriorityFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-8 w-36 text-xs bg-background border-border",
            "data-ocid": "tasks.priority_filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: ALL_PRIORITIES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, className: "text-xs", children: p.label }, p.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: spaceFilter, onValueChange: setSpaceFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-8 w-32 text-xs bg-background border-border",
            "data-ocid": "tasks.space_filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: ALL_SPACES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, className: "text-xs", children: s.label }, s.value)) })
      ] }),
      isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: assigneeFilter, onValueChange: setAssigneeFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-8 w-36 text-xs bg-background border-border",
            "data-ocid": "tasks.assignee_filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Assignees" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", className: "text-xs", children: "All Assignees" }),
          interns.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.id, className: "text-xs", children: i.name }, i.id))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "tasks.loading_state", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-12 rounded-lg"
      },
      `task-skeleton-${i}`
    )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "tasks.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-10 w-10 text-muted-foreground mb-3 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No tasks found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: search || statusFilter !== "all" || priorityFilter !== "all" ? "Try adjusting your filters" : "Create the first task to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: () => {
                setEditTask(null);
                setTaskModalOpen(true);
              },
              className: "bg-primary text-primary-foreground",
              "data-ocid": "tasks.empty_state_cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Create Task"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-card border-border hover:bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground w-[280px]", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Priority" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Deadline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Assigned To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Space" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground", children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-muted-foreground w-20", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((task, idx) => {
        const overdue = isOverdue(task.deadline);
        const isConfirmingDelete = deleteConfirm === task.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "border-border hover:bg-muted/30 group",
            "data-ocid": `tasks.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate max-w-[260px]", children: task.title }),
                task.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground line-clamp-1", children: task.description })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InlineStatusSelect,
                {
                  task,
                  onUpdate: handleStatusChange
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold capitalize ${task.priority === "critical" ? "text-primary" : task.priority === "high" ? "text-[oklch(var(--task-rejected))]" : task.priority === "medium" ? "text-[oklch(var(--task-under-review))]" : "text-muted-foreground"}`,
                  children: task.priority
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs ${overdue && task.status !== "completed" ? "text-primary font-semibold" : "text-muted-foreground"}`,
                  children: [
                    overdue && task.status !== "completed" ? "⚠ " : "",
                    formatDeadline(task.deadline)
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground", children: internNames[task.assignedInternId] ?? task.assignedInternId }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] border-border",
                  children: task.teamSpace
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                task.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20",
                    children: tag
                  },
                  tag
                )),
                task.tags.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                  "+",
                  task.tags.length - 2
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: isConfirmingDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "destructive",
                    className: "h-6 w-6",
                    onClick: () => handleDelete(task.id),
                    "data-ocid": `tasks.confirm_button.${idx + 1}`,
                    children: "\\u2713"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6",
                    onClick: () => setDeleteConfirm(null),
                    "data-ocid": `tasks.cancel_button.${idx + 1}`,
                    children: "\\u2717"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-muted-foreground hover:text-foreground",
                    onClick: () => {
                      setEditTask(task);
                      setTaskModalOpen(true);
                    },
                    "data-ocid": `tasks.edit_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-muted-foreground hover:text-destructive",
                    onClick: () => setDeleteConfirm(task.id),
                    "data-ocid": `tasks.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" })
                  }
                )
              ] }) })
            ]
          },
          task.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskModal,
      {
        open: taskModalOpen,
        onClose: () => {
          setTaskModalOpen(false);
          setEditTask(null);
        },
        task: editTask,
        prefillInternId: !isAdmin() ? currentUserId : void 0
      }
    )
  ] });
}
export {
  TasksPage,
  TasksPage as default
};
