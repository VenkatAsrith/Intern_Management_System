import { u as useAuth, r as reactExports, j as jsxRuntimeExports, q as Skeleton, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, O as DialogFooter, m as Button, P as ue, s as Badge } from "./index-BMeK9e6q.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DTZQuM4G.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { d as useApprovalRequests, e as useApproveRequest, f as useRejectRequest } from "./use-admin-Npb-2rn1.js";
import { C as CircleCheck } from "./circle-check-Cx8QEsVk.js";
import { C as CircleX } from "./circle-x-BSPQ7v7Q.js";
import "./index-w2GhN1KG.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
function formatTs(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString();
}
function ApprovalRow({
  req,
  onAction,
  showResolution
}) {
  const statusColor = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    approved: "bg-green-500/20 text-green-400 border-green-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-muted/30 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
      req.id.slice(0, 8),
      "…"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground", children: req.requesterId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border text-xs bg-muted border-border text-muted-foreground", children: req.requesterRole }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: req.actionType }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: req.resourceType }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
      req.resourceId.slice(0, 8),
      "…"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: formatTs(req.createdAt) }),
    showResolution && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: `border text-xs ${statusColor[req.status] ?? ""}`,
          children: req.status
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: req.approverId ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: req.resolvedAt ? formatTs(req.resolvedAt) : "—" })
    ] }),
    !showResolution && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "h-7 gap-1 text-xs bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30",
          onClick: () => onAction("approve", req),
          "data-ocid": "approvals.approve_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            " Approve"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "h-7 gap-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30",
          onClick: () => onAction("reject", req),
          "data-ocid": "approvals.reject_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
            " Reject"
          ]
        }
      )
    ] }) })
  ] });
}
const TABLE_HEADERS_BASE = [
  "Request ID",
  "Requester",
  "Role",
  "Action Type",
  "Resource Type",
  "Resource",
  "Requested At"
];
function ApprovalsPage() {
  const { isAdmin } = useAuth();
  const { data: pending, isLoading: pendingLoading } = useApprovalRequests("pending");
  const { data: history, isLoading: historyLoading } = useApprovalRequests();
  const approveReq = useApproveRequest();
  const rejectReq = useRejectRequest();
  const [modal, setModal] = reactExports.useState(null);
  const [notes, setNotes] = reactExports.useState("");
  if (!isAdmin()) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access denied — admin only" }) });
  }
  const handleAction = async () => {
    if (!modal) return;
    try {
      if (modal.type === "approve") {
        await approveReq.mutateAsync({ requestId: modal.request.id, notes });
        ue.success("Request approved");
      } else {
        await rejectReq.mutateAsync({ requestId: modal.request.id, notes });
        ue.success("Request rejected");
      }
      setModal(null);
      setNotes("");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Action failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "approvals.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Approval Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Review and act on pending requests" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pending", "data-ocid": "approvals.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pending", "data-ocid": "approvals.pending_tab", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "history", "data-ocid": "approvals.history_tab", children: "History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: pendingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [...TABLE_HEADERS_BASE, "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (pending ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 8,
            className: "px-4 py-12 text-center text-muted-foreground",
            "data-ocid": "approvals.pending_empty_state",
            children: "No pending requests"
          }
        ) }) : (pending ?? []).map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ApprovalRow,
          {
            req,
            showResolution: false,
            onAction: (t, r) => {
              setModal({ type: t, request: r });
              setNotes("");
            }
          },
          req.id
        )) })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: historyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
          ...TABLE_HEADERS_BASE,
          "Status",
          "Approver",
          "Resolved At"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (history ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 10,
            className: "px-4 py-12 text-center text-muted-foreground",
            "data-ocid": "approvals.history_empty_state",
            children: "No approval history"
          }
        ) }) : (history ?? []).map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ApprovalRow,
          {
            req,
            showResolution: true
          },
          req.id
        )) })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!modal, onOpenChange: (open) => !open && setModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border text-foreground max-w-md",
        "data-ocid": "approvals.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: (modal == null ? void 0 : modal.type) === "approve" ? "Approve Request" : "Reject Request" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (modal == null ? void 0 : modal.type) === "approve" ? "This action will approve the request and execute the underlying operation." : "This action will reject and close the request." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Notes (optional)",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                className: "bg-background border-input min-h-[80px]",
                "data-ocid": "approvals.notes_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: () => setModal(null),
                "data-ocid": "approvals.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleAction,
                disabled: approveReq.isPending || rejectReq.isPending,
                className: (modal == null ? void 0 : modal.type) === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-destructive hover:bg-destructive/90",
                "data-ocid": "approvals.confirm_button",
                children: (modal == null ? void 0 : modal.type) === "approve" ? "Confirm Approve" : "Confirm Reject"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ApprovalsPage as default
};
