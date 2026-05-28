import { u as useAuth, r as reactExports, j as jsxRuntimeExports, l as Button, p as Skeleton, q as Badge } from "./index-Fes9v1FI.js";
import { I as Input } from "./input-c3RLJhH7.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CMxv2F83.js";
import { g as useAuditLog } from "./use-admin-DNDor88Y.js";
import { D as Download } from "./download-BXJoaHpc.js";
import { C as ChevronLeft } from "./chevron-left-C8odWkmi.js";
import { C as ChevronRight } from "./chevron-right-CWXFN7_q.js";
import "./index-Dty2Pq1p.js";
import "./index-BJzhuyB3.js";
import "./index-XezQyXZK.js";
import "./index-vZVdx1MD.js";
import "./chevron-down-CXO-u7hj.js";
import "./check-DNYA6atX.js";
const PAGE_SIZE = 100;
const actionColors = {
  CREATE: "bg-green-500/20 text-green-400 border-green-500/30",
  UPDATE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  LOGIN: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  EXPORT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};
function formatTs(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString();
}
function exportCsv(events) {
  const headers = [
    "Timestamp",
    "Actor",
    "Role",
    "Action",
    "Resource Type",
    "Resource ID"
  ];
  const rows = events.map((e) => [
    formatTs(e.timestamp),
    e.actorId,
    e.actorRole,
    e.action,
    e.resourceType,
    e.resourceId
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-log-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function AuditLogPage() {
  const { isAdmin } = useAuth();
  const [page, setPage] = reactExports.useState(0);
  const [actorFilter, setActorFilter] = reactExports.useState("");
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const [resourceTypeFilter, setResourceTypeFilter] = reactExports.useState("all");
  const { data: events, isLoading } = useAuditLog(PAGE_SIZE, page * PAGE_SIZE);
  const filtered = reactExports.useMemo(() => {
    return (events ?? []).filter((e) => {
      const actorOk = !actorFilter || e.actorId.toLowerCase().includes(actorFilter.toLowerCase());
      const actionOk = actionFilter === "all" || e.action === actionFilter;
      const resOk = resourceTypeFilter === "all" || e.resourceType === resourceTypeFilter;
      return actorOk && actionOk && resOk;
    });
  }, [events, actorFilter, actionFilter, resourceTypeFilter]);
  const uniqueActions = reactExports.useMemo(
    () => [...new Set((events ?? []).map((e) => e.action))],
    [events]
  );
  const uniqueResourceTypes = reactExports.useMemo(
    () => [...new Set((events ?? []).map((e) => e.resourceType))],
    [events]
  );
  if (!isAdmin()) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access denied — admin only" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "audit.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Audit Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Immutable record of all platform actions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "gap-2 border-border",
          onClick: () => exportCsv(filtered),
          "data-ocid": "audit.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            " Export CSV"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Filter by actor...",
          value: actorFilter,
          onChange: (e) => setActorFilter(e.target.value),
          className: "w-52 bg-background border-input h-9",
          "data-ocid": "audit.actor_filter_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: actionFilter, onValueChange: setActionFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-44 h-9 bg-background border-input",
            "data-ocid": "audit.action_filter_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Action type" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All actions" }),
          uniqueActions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a }, a))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: resourceTypeFilter,
          onValueChange: setResourceTypeFilter,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-44 h-9 bg-background border-input",
                "data-ocid": "audit.resource_type_filter_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Resource type" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All resources" }),
              uniqueResourceTypes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
        "Timestamp",
        "Actor",
        "Role",
        "Action",
        "Resource Type",
        "Resource ID"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "audit.empty_state",
          children: "No events found"
        }
      ) }) : filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border hover:bg-muted/30 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: formatTs(e.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-medium text-foreground", children: e.actorId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border text-xs bg-muted border-border text-muted-foreground", children: e.actorRole }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `border text-xs ${actionColors[e.action] ?? "bg-muted border-border text-muted-foreground"}`,
                children: e.action
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: e.resourceType }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
              e.resourceId.slice(0, 12),
              "…"
            ] })
          ]
        },
        e.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Page ",
        page + 1,
        " — showing ",
        filtered.length,
        " of ",
        (events == null ? void 0 : events.length) ?? 0,
        " ",
        "events"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.max(0, p - 1)),
            disabled: page === 0,
            className: "gap-1 border-border",
            "data-ocid": "audit.pagination_prev",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
              " Prev"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => p + 1),
            disabled: ((events == null ? void 0 : events.length) ?? 0) < PAGE_SIZE,
            className: "gap-1 border-border",
            "data-ocid": "audit.pagination_next",
            children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  AuditLogPage as default
};
