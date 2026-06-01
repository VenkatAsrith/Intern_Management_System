import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, m as Button, q as Skeleton, M as Megaphone, P as ue, s as Badge } from "./index-BMeK9e6q.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Dz5BxwWS.js";
import { C as Checkbox } from "./checkbox-BqYStX9A.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { l as useAnnouncementsBySpace, m as useCreateAnnouncement, n as useDeleteAnnouncement } from "./use-admin-Npb-2rn1.js";
import { T as Trash2 } from "./trash-2-C-AHX60a.js";
import "./index-xhjDzk0w.js";
import "./index-NDr7xJHf.js";
import "./check-Bu_kUyWO.js";
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
      d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
      key: "117uat"
    }
  ],
  ["path", { d: "M6 12h16", key: "s4cdu5" }]
];
const SendHorizontal = createLucideIcon("send-horizontal", __iconNode);
const ALL_SPACES = ["Org", "Marketing", "Learning"];
function AnnouncementCard({ ann }) {
  const deleteAnn = useDeleteAnnouncement();
  const handleDelete = async () => {
    try {
      await deleteAnn.mutateAsync(ann.id);
      ue.success("Announcement deleted");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };
  const expiry = ann.expiresAt ? new Date(Number(ann.expiresAt) / 1e6).toLocaleDateString() : null;
  const isExpired = ann.expiresAt && Number(ann.expiresAt) / 1e6 < Date.now();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-4 space-y-3 ${isExpired ? "border-border/50 opacity-60" : "border-border"} bg-card`,
      "data-ocid": "announcements.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4 text-primary flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: ann.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: ann.content })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 flex-shrink-0 hover:bg-destructive/10",
                "data-ocid": "announcements.delete_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 text-destructive" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-card border-border text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Announcement" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-muted-foreground", children: [
                  'Are you sure you want to delete "',
                  ann.title,
                  '"? This cannot be undone.'
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "border-border",
                    "data-ocid": "announcements.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleDelete,
                    className: "bg-destructive hover:bg-destructive/90",
                    "data-ocid": "announcements.confirm_button",
                    children: "Delete"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
          (ann.targetSpaces ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs border-border text-muted-foreground",
              children: s
            },
            s
          )),
          expiry && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-xs ${isExpired ? "text-destructive" : "text-muted-foreground"}`,
              children: [
                isExpired ? "Expired" : "Expires",
                " ",
                expiry
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AnnouncementsPage() {
  const { isAdmin } = useAuth();
  const { data: announcements, isLoading } = useAnnouncementsBySpace();
  const createAnn = useCreateAnnouncement();
  const [form, setForm] = reactExports.useState({
    title: "",
    body: "",
    targetSpaces: [],
    expiryDate: ""
  });
  if (!isAdmin()) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access denied — admin only" }) });
  }
  const toggleSpace = (space) => {
    setForm((f) => ({
      ...f,
      targetSpaces: f.targetSpaces.includes(space) ? f.targetSpaces.filter((s) => s !== space) : [...f.targetSpaces, space]
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expiresAt = form.expiryDate ? new Date(form.expiryDate).getTime() * 1e6 : void 0;
      await createAnn.mutateAsync({
        title: form.title,
        body: form.body,
        targetSpaces: form.targetSpaces,
        expiresAt
      });
      ue.success("Announcement posted");
      setForm({ title: "", body: "", targetSpaces: [], expiryDate: "" });
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to post announcement"
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "announcements.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Announcements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Broadcast messages to specific spaces or all users" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Create Announcement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-title", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ann-title",
                value: form.title,
                onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                required: true,
                placeholder: "Announcement title...",
                className: "bg-background border-input",
                "data-ocid": "announcements.title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-body", children: "Body" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "ann-body",
                value: form.body,
                onChange: (e) => setForm((f) => ({ ...f, body: e.target.value })),
                required: true,
                placeholder: "Announcement body...",
                className: "bg-background border-input min-h-[100px]",
                "data-ocid": "announcements.body_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Target Spaces" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: ALL_SPACES.map((space) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `ann-space-${space}`,
                  checked: form.targetSpaces.includes(space),
                  onCheckedChange: () => toggleSpace(space),
                  "data-ocid": `announcements.space_${space.toLowerCase()}_checkbox`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: `ann-space-${space}`,
                  className: "cursor-pointer text-sm",
                  children: space
                }
              )
            ] }, space)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-expiry", children: "Expiry Date (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ann-expiry",
                type: "date",
                value: form.expiryDate,
                onChange: (e) => setForm((f) => ({ ...f, expiryDate: e.target.value })),
                className: "bg-background border-input w-48",
                "data-ocid": "announcements.expiry_date_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: createAnn.isPending,
              className: "gap-2 w-full",
              "data-ocid": "announcements.submit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SendHorizontal, { className: "h-4 w-4" }),
                createAnn.isPending ? "Posting..." : "Post Announcement"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Active Announcements" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }) : (announcements ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-8 text-center",
            "data-ocid": "announcements.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-8 w-8 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No announcements yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (announcements ?? []).map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementCard, { ann }, ann.id)) })
      ] })
    ] })
  ] });
}
export {
  AnnouncementsPage as default
};
