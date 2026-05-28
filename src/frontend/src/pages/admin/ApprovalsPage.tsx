import type { ApprovalRequest } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useApprovalRequests,
  useApproveRequest,
  useRejectRequest,
} from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatTs(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

type ActionModal = {
  type: "approve" | "reject";
  request: ApprovalRequest;
} | null;

function ApprovalRow({
  req,
  onAction,
  showResolution,
}: {
  req: ApprovalRequest;
  onAction?: (type: "approve" | "reject", req: ApprovalRequest) => void;
  showResolution: boolean;
}) {
  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    approved: "bg-green-500/20 text-green-400 border-green-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
        {req.id.slice(0, 8)}…
      </td>
      <td className="px-4 py-3 text-sm text-foreground">{req.requesterId}</td>
      <td className="px-4 py-3">
        <Badge className="border text-xs bg-muted border-border text-muted-foreground">
          {req.requesterRole}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {req.actionType}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {req.resourceType}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
        {req.resourceId.slice(0, 8)}…
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {formatTs(req.createdAt)}
      </td>
      {showResolution && (
        <>
          <td className="px-4 py-3">
            <Badge
              className={`border text-xs ${statusColor[req.status] ?? ""}`}
            >
              {req.status}
            </Badge>
          </td>
          <td className="px-4 py-3 text-xs text-muted-foreground">
            {req.approverId ?? "—"}
          </td>
          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
            {req.resolvedAt ? formatTs(req.resolvedAt) : "—"}
          </td>
        </>
      )}
      {!showResolution && onAction && (
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              className="h-7 gap-1 text-xs bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30"
              onClick={() => onAction("approve", req)}
              data-ocid="approvals.approve_button"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Approve
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-7 gap-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30"
              onClick={() => onAction("reject", req)}
              data-ocid="approvals.reject_button"
            >
              <XCircle className="h-3.5 w-3.5" /> Reject
            </Button>
          </div>
        </td>
      )}
    </tr>
  );
}

const TABLE_HEADERS_BASE = [
  "Request ID",
  "Requester",
  "Role",
  "Action Type",
  "Resource Type",
  "Resource",
  "Requested At",
];

export default function ApprovalsPage() {
  const { isAdmin } = useAuth();
  const { data: pending, isLoading: pendingLoading } =
    useApprovalRequests("pending");
  const { data: history, isLoading: historyLoading } = useApprovalRequests();
  const approveReq = useApproveRequest();
  const rejectReq = useRejectRequest();
  const [modal, setModal] = useState<ActionModal>(null);
  const [notes, setNotes] = useState("");

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Access denied — admin only</p>
      </div>
    );
  }

  const handleAction = async () => {
    if (!modal) return;
    try {
      if (modal.type === "approve") {
        await approveReq.mutateAsync({ requestId: modal.request.id, notes });
        toast.success("Request approved");
      } else {
        await rejectReq.mutateAsync({ requestId: modal.request.id, notes });
        toast.success("Request rejected");
      }
      setModal(null);
      setNotes("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action failed");
    }
  };

  return (
    <div className="p-6 space-y-6" data-ocid="approvals.page">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Approval Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review and act on pending requests
        </p>
      </div>

      <Tabs defaultValue="pending" data-ocid="approvals.tab">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="pending" data-ocid="approvals.pending_tab">
            Pending
          </TabsTrigger>
          <TabsTrigger value="history" data-ocid="approvals.history_tab">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {pendingLoading ? (
              <div className="p-6 space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {[...TABLE_HEADERS_BASE, "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(pending ?? []).length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-12 text-center text-muted-foreground"
                          data-ocid="approvals.pending_empty_state"
                        >
                          No pending requests
                        </td>
                      </tr>
                    ) : (
                      (pending ?? []).map((req) => (
                        <ApprovalRow
                          key={req.id}
                          req={req}
                          showResolution={false}
                          onAction={(t, r) => {
                            setModal({ type: t, request: r });
                            setNotes("");
                          }}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {historyLoading ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {[
                        ...TABLE_HEADERS_BASE,
                        "Status",
                        "Approver",
                        "Resolved At",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(history ?? []).length === 0 ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="px-4 py-12 text-center text-muted-foreground"
                          data-ocid="approvals.history_empty_state"
                        >
                          No approval history
                        </td>
                      </tr>
                    ) : (
                      (history ?? []).map((req) => (
                        <ApprovalRow
                          key={req.id}
                          req={req}
                          showResolution={true}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!modal} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent
          className="bg-card border-border text-foreground max-w-md"
          data-ocid="approvals.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {modal?.type === "approve" ? "Approve Request" : "Reject Request"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {modal?.type === "approve"
                ? "This action will approve the request and execute the underlying operation."
                : "This action will reject and close the request."}
            </p>
            <Textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background border-input min-h-[80px]"
              data-ocid="approvals.notes_textarea"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModal(null)}
              data-ocid="approvals.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAction}
              disabled={approveReq.isPending || rejectReq.isPending}
              className={
                modal?.type === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-destructive hover:bg-destructive/90"
              }
              data-ocid="approvals.confirm_button"
            >
              {modal?.type === "approve" ? "Confirm Approve" : "Confirm Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
