import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, l as Button, N as ue, p as Skeleton, q as Badge, bf as Variant_success_failed_running, r as reactExports, a1 as X } from "./index-Fes9v1FI.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BNpE8GDg.js";
import { I as Input } from "./input-c3RLJhH7.js";
import { h as useWorkflowExecutions, i as useSLARules, j as useRunAutomationJobs, k as useSetSLARule } from "./use-admin-DNDor88Y.js";
import { C as Check } from "./check-DNYA6atX.js";
import { P as Pencil } from "./pencil-VZrSpyJP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode);
const AUTOMATION_JOBS = [
  { name: "Overdue Follow-Up", frequency: "Every 6h", key: "overdue_followup" },
  { name: "Proposal Expiry", frequency: "Daily 08:00", key: "proposal_expiry" },
  {
    name: "Inactive Lead Detection",
    frequency: "Daily 09:00",
    key: "inactive_lead"
  },
  { name: "Invoice Overdue", frequency: "Daily 07:00", key: "invoice_overdue" },
  { name: "SLA Breach", frequency: "Every 4h", key: "sla_breach" }
];
const CRM_STAGES = [
  "leadCaptured",
  "contacted",
  "discoveryCallDone",
  "proposalSent",
  "negotiation",
  "closedWon",
  "closedLost",
  "onHold"
];
function statusBadge(status) {
  if (status === Variant_success_failed_running.success)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border text-xs bg-green-500/20 text-green-400 border-green-500/30", children: "Success" });
  if (status === Variant_success_failed_running.failed)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border text-xs bg-red-500/20 text-red-400 border-red-500/30", children: "Failed" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30", children: "Running" });
}
function formatTs(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString();
}
function getLastRun(executions, key) {
  const matches = executions.filter(
    (e) => e.ruleName.toLowerCase().includes(key.replace("_", " ").split(" ")[0])
  );
  if (!matches.length) return null;
  matches.sort((a, b) => Number(b.triggeredAt - a.triggeredAt));
  return matches[0];
}
function SLARuleRow({
  stage,
  hours
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [value, setValue] = reactExports.useState(Number(hours));
  const setSLA = useSetSLARule();
  const handleSave = async () => {
    try {
      await setSLA.mutateAsync({ stageName: stage, maxHours: value });
      ue.success(`SLA updated for ${stage}`);
      setEditing(false);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to update SLA");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-muted/30 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-medium text-foreground", children: stage }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 1,
          value,
          onChange: (e) => setValue(Number(e.target.value)),
          className: "w-24 h-7 bg-background border-input text-sm",
          "data-ocid": `automations.sla_hours_input.${stage}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "icon",
          className: "h-7 w-7 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30",
          onClick: handleSave,
          disabled: setSLA.isPending,
          "data-ocid": `automations.sla_save_button.${stage}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-green-400" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "icon",
          className: "h-7 w-7 bg-muted hover:bg-muted/70",
          onClick: () => {
            setEditing(false);
            setValue(Number(hours));
          },
          "data-ocid": `automations.sla_cancel_button.${stage}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 text-muted-foreground" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
      Number(hours),
      "h"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        className: "h-7 gap-1 text-xs",
        onClick: () => setEditing(true),
        "data-ocid": `automations.sla_edit_button.${stage}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          " Edit"
        ]
      }
    ) })
  ] });
}
function AutomationsPage() {
  const { isAdmin } = useAuth();
  const { data: executions, isLoading: execLoading } = useWorkflowExecutions();
  const { data: slaRules, isLoading: slaLoading } = useSLARules();
  const runJobs = useRunAutomationJobs();
  if (!isAdmin()) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access denied — admin only" }) });
  }
  const slaMap = new Map(
    (slaRules ?? []).map(([stage, hours]) => [stage, hours])
  );
  const slaRows = CRM_STAGES.map((stage) => ({
    stage,
    hours: slaMap.get(stage) ?? BigInt(48)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", "data-ocid": "automations.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Automations & SLA Rules" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage background jobs and pipeline SLA thresholds" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Automation Jobs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "gap-2",
              disabled: runJobs.isPending,
              "data-ocid": "automations.run_all_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4" }),
                runJobs.isPending ? "Running..." : "Run All Now"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AlertDialogContent,
            {
              className: "bg-card border-border text-foreground",
              "data-ocid": "automations.confirm_dialog",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Run All Automation Jobs?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This will immediately execute all 5 automation jobs: overdue follow-ups, proposal expiry, inactive leads, invoice overdue, and SLA breach checks." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogCancel,
                    {
                      className: "border-border",
                      "data-ocid": "automations.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: async () => {
                        try {
                          await runJobs.mutateAsync();
                          ue.success("All automation jobs executed");
                        } catch (err) {
                          ue.error(
                            err instanceof Error ? err.message : "Failed to run jobs"
                          );
                        }
                      },
                      "data-ocid": "automations.confirm_button",
                      children: "Run Now"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: execLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: ["Job Name", "Frequency", "Last Run", "Status"].map(
          (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
              children: h
            },
            h
          )
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: AUTOMATION_JOBS.map((job) => {
          const lastRun = getLastRun(executions ?? [], job.key);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border hover:bg-muted/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-medium text-foreground", children: job.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: job.frequency }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: lastRun ? formatTs(lastRun.triggeredAt) : "Never" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: lastRun ? statusBadge(lastRun.status) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border text-xs bg-muted border-border text-muted-foreground", children: "Idle" }) })
              ]
            },
            job.key
          );
        }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4", children: "SLA Rules" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: slaLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: ["Stage Name", "Max Hours", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: slaRows.map(({ stage, hours }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SLARuleRow, { stage, hours }, stage)) })
      ] }) }) })
    ] })
  ] });
}
export {
  AutomationsPage as default
};
