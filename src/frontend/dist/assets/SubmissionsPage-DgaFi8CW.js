import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, m as Button, q as Skeleton, J as FileText, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, s as Badge } from "./index-BMeK9e6q.js";
import { C as Card } from "./card-BNUdlcux.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { u as useSubmissions, G as GitBranch, a as useCreateSubmission, b as useUpdateSubmissionStatus } from "./useSubmissions-Do5cVUgW.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { E as ExternalLink } from "./external-link-D5kebMHG.js";
import { M as MessageSquare } from "./message-square-CxfKCy3s.js";
import { C as CircleX } from "./circle-x-BSPQ7v7Q.js";
import { C as CircleCheckBig } from "./circle-check-big-DJ_ndGkN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode);
const STATUS_MAP = {
  pending: {
    label: "Pending Review",
    cssClass: "submission-status-pending",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" })
  },
  approved: {
    label: "Approved",
    cssClass: "submission-status-approved",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
  },
  rejected: {
    label: "Rejected",
    cssClass: "submission-status-rejected",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
  },
  feedback_given: {
    label: "Feedback Given",
    cssClass: "",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" })
  }
};
function StatusBadge({ status }) {
  const s = STATUS_MAP[status];
  const colorClass = status === "pending" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : status === "approved" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : status === "rejected" ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: `${colorClass} border text-[10px] gap-1 inline-flex items-center`,
      children: [
        s.icon,
        s.label
      ]
    }
  );
}
function NewSubmissionModal({
  open,
  onClose
}) {
  const create = useCreateSubmission();
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    githubLink: "",
    driveLink: "",
    notes: ""
  });
  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    await create.mutateAsync({
      title: form.title.trim(),
      description: form.description.trim(),
      githubLink: form.githubLink.trim() || void 0,
      driveLink: form.driveLink.trim() || void 0,
      fileUrls: [],
      notes: form.notes.trim()
    });
    setForm({
      title: "",
      description: "",
      githubLink: "",
      driveLink: "",
      notes: ""
    });
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-primary" }),
      "New Submission"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          "Title ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.title,
            onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
            placeholder: "What are you submitting?",
            "data-ocid": "submissions.title_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: form.description,
            onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
            placeholder: "Describe what you built or completed…",
            rows: 3,
            "data-ocid": "submissions.description_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "GitHub Link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.githubLink,
              onChange: (e) => setForm((f) => ({ ...f, githubLink: e.target.value })),
              placeholder: "https://github.com/…",
              className: "pl-8",
              "data-ocid": "submissions.github_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Google Drive Link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.driveLink,
              onChange: (e) => setForm((f) => ({ ...f, driveLink: e.target.value })),
              placeholder: "https://drive.google.com/…",
              className: "pl-8",
              "data-ocid": "submissions.drive_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: form.notes,
            onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
            placeholder: "Any additional context or notes…",
            rows: 2,
            "data-ocid": "submissions.notes_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "submissions.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            disabled: !form.title.trim() || create.isPending,
            onClick: () => void handleSubmit(),
            "data-ocid": "submissions.submit_button",
            children: "Submit"
          }
        )
      ] })
    ] })
  ] }) });
}
function ReviewModal({
  submission,
  open,
  onClose
}) {
  const update = useUpdateSubmissionStatus();
  const [feedback, setFeedback] = reactExports.useState("");
  const [action, setAction] = reactExports.useState("approved");
  const handleSubmit = async () => {
    await update.mutateAsync({ id: submission.id, status: action, feedback });
    setFeedback("");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-sm",
      "data-ocid": "submissions.review_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Review Submission" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: submission.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "by ",
            submission.internName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Decision" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["approved", "rejected", "feedback_given"].map(
              (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setAction(s),
                  className: `flex-1 py-1.5 text-xs rounded border transition-smooth ${action === s ? "border-primary bg-primary/20 text-foreground" : "border-border text-muted-foreground"}`,
                  "data-ocid": `submissions.review_${s}_button`,
                  children: STATUS_MAP[s].label
                },
                s
              )
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Feedback (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: feedback,
                onChange: (e) => setFeedback(e.target.value),
                placeholder: "Add feedback for the intern…",
                rows: 3,
                "data-ocid": "submissions.feedback_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "submissions.review_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                disabled: update.isPending,
                onClick: () => void handleSubmit(),
                "data-ocid": "submissions.review_confirm_button",
                children: "Submit Review"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function SubmissionCard({
  submission,
  canReview
}) {
  const [reviewOpen, setReviewOpen] = reactExports.useState(false);
  const statusClass = submission.status === "pending" ? "submission-status-pending" : submission.status === "approved" ? "submission-status-approved" : submission.status === "rejected" ? "submission-status-rejected" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `submission-card ${statusClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: submission.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: submission.status })
        ] }),
        submission.internName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary mt-0.5", children: submission.internName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: new Date(submission.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) })
      ] }),
      canReview && submission.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "text-xs shrink-0",
          onClick: () => setReviewOpen(true),
          "data-ocid": `submissions.review_open_modal_button.${submission.id}`,
          children: "Review"
        }
      )
    ] }),
    submission.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 line-clamp-2", children: submission.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
      submission.githubLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: submission.githubLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-3 h-3" }),
            "GitHub",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-2.5 h-2.5" })
          ]
        }
      ),
      submission.driveLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: submission.driveLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-3 h-3" }),
            "Drive",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-2.5 h-2.5" })
          ]
        }
      )
    ] }),
    submission.adminFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notes-comment mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-0.5", children: "Admin Feedback" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: submission.adminFeedback }),
      submission.reviewedBy && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
        "— ",
        submission.reviewedBy
      ] })
    ] }),
    reviewOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReviewModal,
      {
        submission,
        open: reviewOpen,
        onClose: () => setReviewOpen(false)
      }
    )
  ] });
}
function SubmissionsPage() {
  const { isAdmin, sessionToken } = useAuth();
  const admin = isAdmin();
  const myInternId = !admin && sessionToken ? sessionToken.split(":")[0] : void 0;
  const { data: mySubmissions, isLoading: myLoading } = useSubmissions(
    admin ? null : myInternId
  );
  const { data: allSubmissions, isLoading: allLoading } = useSubmissions();
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [search, setSearch] = reactExports.useState("");
  const submissions = admin ? allSubmissions : mySubmissions;
  const isLoading = admin ? allLoading : myLoading;
  const filtered = (submissions == null ? void 0 : submissions.filter((s) => {
    const statusMatch = statusFilter === "all" || s.status === statusFilter;
    const searchMatch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.internName.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  })) ?? [];
  const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Feedback Given", value: "feedback_given" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Work Submissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: admin ? "Review and approve intern submissions" : "Track your submitted work" })
      ] }),
      !admin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setNewOpen(true),
          "data-ocid": "submissions.new_submission_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "New Submission"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter(f.value),
            className: `px-3 py-1 text-xs rounded-full border transition-smooth ${statusFilter === f.value ? "border-primary bg-primary/20 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`,
            "data-ocid": `submissions.filter.${f.value}`,
            children: f.label
          },
          f.value
        )) })
      ] }),
      admin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by title or intern…",
            className: "h-8 text-sm w-52",
            "data-ocid": "submissions.search_input"
          }
        )
      ] })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submission-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" })
    ] }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-muted-foreground",
        "data-ocid": "submissions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mb-3 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: admin ? "No submissions found" : "No submissions yet" }),
          !admin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "mt-4",
              onClick: () => setNewOpen(true),
              "data-ocid": "submissions.empty_new_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                " Submit Your First Work"
              ]
            }
          )
        ]
      }
    ) : admin ? (
      /* Admin table-like card list */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          filtered.length,
          " submission",
          filtered.length !== 1 ? "s" : ""
        ] }),
        filtered.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `submissions.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionCard, { submission: s, canReview: admin }) }, s.id))
      ] })
    ) : (
      /* Intern card grid */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filtered.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `submissions.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionCard, { submission: s, canReview: false }) }, s.id)) })
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewSubmissionModal, { open: newOpen, onClose: () => setNewOpen(false) })
  ] });
}
export {
  SubmissionsPage
};
