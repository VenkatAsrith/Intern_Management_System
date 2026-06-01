import { c as createLucideIcon, Q as useBackend, u as useAuth, R as useQuery, V as useQueryClient, W as useMutation, P as ue, $ as useParams, v as useInterns, r as reactExports, j as jsxRuntimeExports, m as Button, q as Skeleton, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, J as FileText, s as Badge } from "./index-BMeK9e6q.js";
import { C as Card, a as CardContent } from "./card-BNUdlcux.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D791wupo.js";
import { S as Switch } from "./switch-DlRh85vt.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { C as CircleCheckBig } from "./circle-check-big-DJ_ndGkN.js";
import { U as UserPlus } from "./user-plus-BzTEHUlK.js";
import { A as Award } from "./award-BJ9ovl0U.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./index-NDr7xJHf.js";
import "./index-xhjDzk0w.js";
import "./chevron-down-DGBe83Kh.js";
import "./check-Bu_kUyWO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
const ClipboardCheck = createLucideIcon("clipboard-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const Folder = createLucideIcon("folder", __iconNode);
function useTimeline(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["timeline", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId)
        return { milestones: [], completionPct: 0 };
      const raw = await actor.getTimelineForIntern(sessionToken, internId);
      const sorted = [...raw].sort(
        (a, b) => Number(a.createdAt) - Number(b.createdAt)
      );
      const total = sorted.length;
      const completed = sorted.filter((m) => m.completedAt != null).length;
      const completionPct = total === 0 ? 0 : Math.round(completed / total * 100);
      return { milestones: sorted, completionPct };
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId
  });
}
function useAddMilestone() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      const result = await actor.addTimelineMilestone(
        sessionToken,
        vars.internId,
        vars.title,
        vars.description ?? null,
        vars.milestoneType
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["timeline", vars.internId] });
      ue.success("Milestone added");
    },
    onError: (err) => {
      ue.error(err.message ?? "Failed to add milestone");
    }
  });
}
const MILESTONE_TYPES = [
  { value: "Joining", label: "Joining", icon: UserPlus },
  { value: "Project", label: "Project", icon: Folder },
  { value: "Mid-Review", label: "Mid-Review", icon: ClipboardCheck },
  { value: "Document", label: "Document", icon: FileText },
  { value: "Certificate", label: "Certificate", icon: Award },
  { value: "Complete", label: "Complete", icon: CircleCheckBig }
];
function getMilestoneIcon(type) {
  const found = MILESTONE_TYPES.find((t) => t.value === type);
  const Icon = (found == null ? void 0 : found.icon) ?? CircleCheckBig;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" });
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function MilestoneNode({
  milestone,
  index
}) {
  const isCompleted = milestone.completedAt != null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex gap-4",
      "data-ocid": `timeline.milestone.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: [
                "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all",
                isCompleted ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"
              ].join(" "),
              children: getMilestoneIcon(milestone.milestoneType)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: [
                "w-0.5 flex-1 min-h-[24px]",
                isCompleted ? "bg-primary/40" : "bg-border border-dashed"
              ].join(" ")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `mb-4 flex-1 min-w-0 ${isCompleted ? "border-primary/20 bg-primary/5" : "bg-card border-border"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: milestone.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-[10px] ${isCompleted ? "border-primary/30 text-primary bg-primary/5" : ""}`,
                    children: milestone.milestoneType
                  }
                ),
                isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-green-500/10 text-green-400 border-green-500/20", children: "✓ Completed" })
              ] }),
              milestone.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: milestone.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
                "Added ",
                formatDate(milestone.createdAt),
                milestone.completedAt && ` · Completed ${formatDate(milestone.completedAt)}`
              ] })
            ] }) }) })
          }
        )
      ]
    }
  );
}
function TimelinePage() {
  const { internId } = useParams({ strict: false });
  const { isAdmin } = useAuth();
  const { data: interns = [] } = useInterns();
  const { data, isLoading } = useTimeline(internId);
  const addMilestone = useAddMilestone();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    milestoneType: "Project",
    description: "",
    markCompleted: false
  });
  const intern = interns.find((i) => i.id === internId);
  const milestones = (data == null ? void 0 : data.milestones) ?? [];
  const completionPct = (data == null ? void 0 : data.completionPct) ?? 0;
  async function handleAdd() {
    if (!internId || !form.title.trim()) return;
    await addMilestone.mutateAsync({
      internId,
      title: form.title.trim(),
      description: form.description.trim() || void 0,
      milestoneType: form.milestoneType
    });
    setModalOpen(false);
    setForm({
      title: "",
      milestoneType: "Project",
      description: "",
      markCompleted: false
    });
  }
  if (!internId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-muted-foreground", children: "No intern selected." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-3xl mx-auto", "data-ocid": "timeline.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground", children: [
          (intern == null ? void 0 : intern.name) ?? "Intern",
          "'s Timeline"
        ] }),
        (intern == null ? void 0 : intern.joiningDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Joined",
          " ",
          new Date(Number(intern.joiningDate)).toLocaleDateString(
            void 0,
            {
              year: "numeric",
              month: "long",
              day: "numeric"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Internship Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
              completionPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-700",
              style: { width: `${completionPct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            milestones.filter((m) => m.completedAt != null).length,
            " of",
            " ",
            milestones.length,
            " milestones completed"
          ] })
        ] })
      ] }),
      isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "gap-2 flex-shrink-0",
          onClick: () => setModalOpen(true),
          "data-ocid": "timeline.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add Milestone"
          ]
        }
      )
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "flex-1 h-20 rounded-xl" })
    ] }, i)) }) : milestones.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-muted-foreground",
        "data-ocid": "timeline.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-12 w-12 mb-3 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No milestones yet" }),
          isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: 'Click "Add Milestone" to start tracking progress.' })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: milestones.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneNode, { milestone: m, index: idx }, m.id)) }),
    isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-md bg-card border-border",
        "data-ocid": "timeline.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Milestone" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "milestone-title", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "milestone-title",
                  placeholder: "e.g. Completed first project",
                  value: form.title,
                  onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                  "data-ocid": "timeline.title_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.milestoneType,
                  onValueChange: (v) => setForm((f) => ({ ...f, milestoneType: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "timeline.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MILESTONE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "milestone-desc", children: "Description (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "milestone-desc",
                  rows: 2,
                  placeholder: "Brief description…",
                  value: form.description,
                  onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                  "data-ocid": "timeline.description_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  id: "mark-completed",
                  checked: form.markCompleted,
                  onCheckedChange: (v) => setForm((f) => ({ ...f, markCompleted: v })),
                  "data-ocid": "timeline.completed_switch"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mark-completed", className: "cursor-pointer", children: "Mark as completed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setModalOpen(false),
                  "data-ocid": "timeline.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleAdd,
                  disabled: !form.title.trim() || addMilestone.isPending,
                  "data-ocid": "timeline.submit_button",
                  children: addMilestone.isPending ? "Adding…" : "Add Milestone"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  TimelinePage
};
