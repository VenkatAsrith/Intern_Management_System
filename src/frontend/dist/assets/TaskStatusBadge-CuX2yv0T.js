import { c as createLucideIcon, u as useAuth, v as useInterns, r as reactExports, j as jsxRuntimeExports, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, m as Button, a5 as X, P as ue, C as Clock, af as cn } from "./index-BMeK9e6q.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D791wupo.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { e as useCreateTask, c as useUpdateTask } from "./useWorkspace-Be9BQRA9.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { C as CircleX } from "./circle-x-BSPQ7v7Q.js";
import { C as CircleCheck } from "./circle-check-Cx8QEsVk.js";
import { C as CirclePlay } from "./circle-play-YIqeiF7u.js";
import { C as Circle } from "./circle-BCf6w77C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];
const SPACES = [
  { value: "Org", label: "Org" },
  { value: "Marketing", label: "Marketing" },
  { value: "Learning", label: "Learning" }
];
function TaskModal({
  open,
  onClose,
  task,
  prefillInternId
}) {
  var _a;
  const { isAdmin, sessionToken } = useAuth();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: interns = [] } = useInterns();
  const currentUserInternId = prefillInternId ?? "";
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [priority, setPriority] = reactExports.useState("medium");
  const [deadline, setDeadline] = reactExports.useState("");
  const [assignedInternId, setAssignedInternId] = reactExports.useState("");
  const [teamSpace, setTeamSpace] = reactExports.useState("Org");
  const [tagInput, setTagInput] = reactExports.useState("");
  const [tags, setTags] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState({});
  const adminMode = isAdmin();
  reactExports.useEffect(() => {
    if (!open) return;
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDeadline(
        task.deadline ? new Date(Number(task.deadline) / 1e6).toISOString().slice(0, 10) : ""
      );
      setAssignedInternId(task.assignedInternId);
      setTeamSpace(task.teamSpace);
      setTags(task.tags);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDeadline("");
      setAssignedInternId(adminMode ? "" : currentUserInternId);
      setTeamSpace("Org");
      setTags([]);
    }
    setErrors({});
  }, [open, task, adminMode, currentUserInternId]);
  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
    }
    setTagInput("");
  }
  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }
  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!assignedInternId) errs.assignedInternId = "Assignee is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!sessionToken) {
      ue.error("Not authenticated");
      return;
    }
    if (!validate()) return;
    const deadlineNs = deadline ? BigInt(new Date(deadline).getTime()) * 1000000n : void 0;
    if (task) {
      await updateTask.mutateAsync({
        id: task.id,
        payload: {
          title,
          description,
          priority,
          deadline: deadlineNs,
          assignedInternId,
          teamSpace,
          tags
        }
      });
    } else {
      await createTask.mutateAsync({
        title,
        description,
        priority,
        deadline: deadlineNs,
        assignedInternId,
        teamSpace,
        tags
      });
    }
    onClose();
  }
  const isPending = createTask.isPending || updateTask.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        if (!v) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "max-w-lg bg-card border-border",
          "data-ocid": "task_modal.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground", children: task ? "Edit Task" : "Create Task" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  void handleSubmit(e);
                },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "task-title", className: "text-sm text-foreground", children: [
                      "Title ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "task-title",
                        value: title,
                        onChange: (e) => setTitle(e.target.value),
                        placeholder: "e.g. Design landing page mockup",
                        className: "bg-background border-border",
                        "data-ocid": "task_modal.title_input"
                      }
                    ),
                    errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "task_modal.title_field_error",
                        children: errors.title
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "task-desc", className: "text-sm text-foreground", children: "Description" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "task-desc",
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                        placeholder: "Task details, expected output...",
                        rows: 3,
                        className: "bg-background border-border resize-none",
                        "data-ocid": "task_modal.description_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", children: "Priority" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priority, onValueChange: setPriority, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "bg-background border-border",
                            "data-ocid": "task_modal.priority_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: PRIORITIES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value)) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "task-deadline",
                          className: "text-sm text-foreground",
                          children: "Deadline"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "task-deadline",
                          type: "date",
                          value: deadline,
                          onChange: (e) => setDeadline(e.target.value),
                          className: "bg-background border-border",
                          "data-ocid": "task_modal.deadline_input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm text-foreground", children: [
                      "Assign To ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                    ] }),
                    adminMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: assignedInternId,
                        onValueChange: setAssignedInternId,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              className: "bg-background border-border",
                              "data-ocid": "task_modal.assignee_select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select intern..." })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: interns.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.id, children: i.name }, i.id)) })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: ((_a = interns.find((i) => i.id === assignedInternId)) == null ? void 0 : _a.name) ?? "You",
                        readOnly: true,
                        disabled: true,
                        className: "bg-muted border-border cursor-not-allowed",
                        "data-ocid": "task_modal.assignee_readonly"
                      }
                    ),
                    errors.assignedInternId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "task_modal.assignee_field_error",
                        children: errors.assignedInternId
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", children: "Team Space" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: teamSpace, onValueChange: setTeamSpace, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "bg-background border-border",
                          "data-ocid": "task_modal.space_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: SPACES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", children: "Tags" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: tagInput,
                          onChange: (e) => setTagInput(e.target.value),
                          onKeyDown: (e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          },
                          placeholder: "Add tag and press Enter",
                          className: "bg-background border-border flex-1",
                          "data-ocid": "task_modal.tag_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "icon",
                          onClick: addTag,
                          className: "border-border",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
                        }
                      )
                    ] }),
                    tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20",
                        children: [
                          tag,
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => removeTag(tag),
                              className: "hover:text-primary/60",
                              "aria-label": `Remove tag ${tag}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                            }
                          )
                        ]
                      },
                      tag
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        onClick: onClose,
                        disabled: isPending,
                        "data-ocid": "task_modal.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        disabled: isPending,
                        className: "bg-primary text-primary-foreground",
                        "data-ocid": "task_modal.submit_button",
                        children: isPending ? "Saving..." : task ? "Save Changes" : "Create Task"
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Circle,
    className: "bg-[oklch(var(--task-pending)/0.15)] text-[oklch(var(--task-pending))] border-[oklch(var(--task-pending)/0.3)]"
  },
  inProgress: {
    label: "In Progress",
    icon: CirclePlay,
    className: "bg-[oklch(var(--task-in-progress)/0.15)] text-[oklch(var(--task-in-progress))] border-[oklch(var(--task-in-progress)/0.3)]"
  },
  underReview: {
    label: "Under Review",
    icon: Clock,
    className: "bg-[oklch(var(--task-under-review)/0.15)] text-[oklch(var(--task-under-review))] border-[oklch(var(--task-under-review)/0.3)]"
  },
  completed: {
    label: "Completed",
    icon: CircleCheck,
    className: "bg-[oklch(var(--task-completed)/0.15)] text-[oklch(var(--task-completed))] border-[oklch(var(--task-completed)/0.3)]"
  },
  rejected: {
    label: "Rejected",
    icon: CircleX,
    className: "bg-[oklch(var(--task-rejected)/0.15)] text-[oklch(var(--task-rejected))] border-[oklch(var(--task-rejected)/0.3)]"
  },
  reworkNeeded: {
    label: "Rework Needed",
    icon: RotateCcw,
    className: "bg-[oklch(var(--task-rework-needed)/0.15)] text-[oklch(var(--task-rework-needed))] border-[oklch(var(--task-rework-needed)/0.3)]"
  }
};
const FALLBACK = {
  label: "Unknown",
  icon: Circle,
  className: "bg-muted text-muted-foreground border-border"
};
function normalizeStatus(raw) {
  const map = {
    pending: "pending",
    inprogress: "inProgress",
    in_progress: "inProgress",
    inProgress: "inProgress",
    underreview: "underReview",
    under_review: "underReview",
    underReview: "underReview",
    completed: "completed",
    rejected: "rejected",
    reworkneeded: "reworkNeeded",
    rework_needed: "reworkNeeded",
    reworkNeeded: "reworkNeeded"
  };
  return map[raw] ?? map[raw.toLowerCase()] ?? "pending";
}
function TaskStatusBadge({
  status,
  className,
  size = "md"
}) {
  const key = normalizeStatus(status);
  const config = STATUS_CONFIG[key] ?? FALLBACK;
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3" }),
        config.label
      ]
    }
  );
}
export {
  TaskModal as T,
  TaskStatusBadge as a,
  normalizeStatus as n
};
