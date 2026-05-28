import type { WorkflowExecution } from "@/backend";
import { Variant_success_failed_running } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useRunAutomationJobs,
  useSLARules,
  useSetSLARule,
  useWorkflowExecutions,
} from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import { Check, Pencil, PlayCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AUTOMATION_JOBS = [
  { name: "Overdue Follow-Up", frequency: "Every 6h", key: "overdue_followup" },
  { name: "Proposal Expiry", frequency: "Daily 08:00", key: "proposal_expiry" },
  {
    name: "Inactive Lead Detection",
    frequency: "Daily 09:00",
    key: "inactive_lead",
  },
  { name: "Invoice Overdue", frequency: "Daily 07:00", key: "invoice_overdue" },
  { name: "SLA Breach", frequency: "Every 4h", key: "sla_breach" },
];

const CRM_STAGES = [
  "leadCaptured",
  "contacted",
  "discoveryCallDone",
  "proposalSent",
  "negotiation",
  "closedWon",
  "closedLost",
  "onHold",
];

function statusBadge(status: Variant_success_failed_running) {
  if (status === Variant_success_failed_running.success)
    return (
      <Badge className="border text-xs bg-green-500/20 text-green-400 border-green-500/30">
        Success
      </Badge>
    );
  if (status === Variant_success_failed_running.failed)
    return (
      <Badge className="border text-xs bg-red-500/20 text-red-400 border-red-500/30">
        Failed
      </Badge>
    );
  return (
    <Badge className="border text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
      Running
    </Badge>
  );
}

function formatTs(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

function getLastRun(executions: WorkflowExecution[], key: string) {
  const matches = executions.filter((e) =>
    e.ruleName.toLowerCase().includes(key.replace("_", " ").split(" ")[0]),
  );
  if (!matches.length) return null;
  matches.sort((a, b) => Number(b.triggeredAt - a.triggeredAt));
  return matches[0];
}

function SLARuleRow({
  stage,
  hours,
}: {
  stage: string;
  hours: bigint;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(Number(hours));
  const setSLA = useSetSLARule();

  const handleSave = async () => {
    try {
      await setSLA.mutateAsync({ stageName: stage, maxHours: value });
      toast.success(`SLA updated for ${stage}`);
      setEditing(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update SLA");
    }
  };

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-foreground">{stage}</td>
      <td className="px-4 py-3">
        {editing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-24 h-7 bg-background border-input text-sm"
              data-ocid={`automations.sla_hours_input.${stage}`}
            />
            <Button
              type="button"
              size="icon"
              className="h-7 w-7 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30"
              onClick={handleSave}
              disabled={setSLA.isPending}
              data-ocid={`automations.sla_save_button.${stage}`}
            >
              <Check className="h-3.5 w-3.5 text-green-400" />
            </Button>
            <Button
              type="button"
              size="icon"
              className="h-7 w-7 bg-muted hover:bg-muted/70"
              onClick={() => {
                setEditing(false);
                setValue(Number(hours));
              }}
              data-ocid={`automations.sla_cancel_button.${stage}`}
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
        ) : (
          <span className="text-sm text-foreground">{Number(hours)}h</span>
        )}
      </td>
      <td className="px-4 py-3">
        {!editing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => setEditing(true)}
            data-ocid={`automations.sla_edit_button.${stage}`}
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        )}
      </td>
    </tr>
  );
}

export default function AutomationsPage() {
  const { isAdmin } = useAuth();
  const { data: executions, isLoading: execLoading } = useWorkflowExecutions();
  const { data: slaRules, isLoading: slaLoading } = useSLARules();
  const runJobs = useRunAutomationJobs();

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Access denied — admin only</p>
      </div>
    );
  }

  // Merge backend SLA rules with default CRM stages
  const slaMap = new Map(
    (slaRules ?? []).map(([stage, hours]) => [stage, hours]),
  );
  const slaRows = CRM_STAGES.map((stage) => ({
    stage,
    hours: slaMap.get(stage) ?? BigInt(48),
  }));

  return (
    <div className="p-6 space-y-8" data-ocid="automations.page">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Automations & SLA Rules
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage background jobs and pipeline SLA thresholds
        </p>
      </div>

      {/* Automation Jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Automation Jobs
          </h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="gap-2"
                disabled={runJobs.isPending}
                data-ocid="automations.run_all_button"
              >
                <PlayCircle className="h-4 w-4" />
                {runJobs.isPending ? "Running..." : "Run All Now"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              className="bg-card border-border text-foreground"
              data-ocid="automations.confirm_dialog"
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Run All Automation Jobs?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  This will immediately execute all 5 automation jobs: overdue
                  follow-ups, proposal expiry, inactive leads, invoice overdue,
                  and SLA breach checks.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="border-border"
                  data-ocid="automations.cancel_button"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await runJobs.mutateAsync();
                      toast.success("All automation jobs executed");
                    } catch (err) {
                      toast.error(
                        err instanceof Error
                          ? err.message
                          : "Failed to run jobs",
                      );
                    }
                  }}
                  data-ocid="automations.confirm_button"
                >
                  Run Now
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {execLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {["Job Name", "Frequency", "Last Run", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {AUTOMATION_JOBS.map((job) => {
                    const lastRun = getLastRun(executions ?? [], job.key);
                    return (
                      <tr
                        key={job.key}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {job.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {job.frequency}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {lastRun ? formatTs(lastRun.triggeredAt) : "Never"}
                        </td>
                        <td className="px-4 py-3">
                          {lastRun ? (
                            statusBadge(lastRun.status)
                          ) : (
                            <Badge className="border text-xs bg-muted border-border text-muted-foreground">
                              Idle
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* SLA Rules */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          SLA Rules
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {slaLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {["Stage Name", "Max Hours", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slaRows.map(({ stage, hours }) => (
                    <SLARuleRow key={stage} stage={stage} hours={hours} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
