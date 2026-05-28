import { useClientActivities } from "@/hooks/use-clients";
import {
  useLogQuickActivity,
  useUpdateClientStatus,
} from "@/hooks/use-clients";
import type { Client, ClientStatus } from "@/types/clients";
import { STATUS_LABELS } from "@/types/clients";
import { Activity, Clock, DollarSign, X } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "./StatusBadge";

const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  call: "📞 Call",
  email: "✉️ Email",
  meeting: "🤝 Meeting",
  whatsapp: "💬 WhatsApp",
  note: "📝 Note",
  statusChange: "🔄 Status",
  quickCall: "📞 Quick Call",
  quickEmail: "✉️ Quick Email",
  quickMeeting: "🤝 Quick Meeting",
};

interface ClientSplitPaneProps {
  client: Client | null;
  onClose: () => void;
}

export function ClientSplitPane({ client, onClose }: ClientSplitPaneProps) {
  const isOpen = !!client;
  const { data: activities = [] } = useClientActivities(client?.id ?? null);
  const logActivity = useLogQuickActivity();
  const updateStatus = useUpdateClientStatus();
  const [stageOpen, setStageOpen] = useState(false);

  const recent = activities.slice(0, 3);

  async function handleLogActivity(type: string) {
    if (!client) return;
    await logActivity.mutateAsync({
      clientId: client.id,
      activityType: type,
      notes: `Quick ${type} logged from split pane`,
    });
  }

  function handleMoveStage(status: ClientStatus) {
    if (!client) return;
    updateStatus.mutate({
      id: client.id,
      status,
      note: "Stage moved from split pane",
    });
    setStageOpen(false);
  }

  return (
    <div
      className={`fixed right-0 top-0 h-full w-[40%] min-w-[320px] max-w-[540px] z-40 flex flex-col bg-zinc-900 border-l border-zinc-700 shadow-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Client preview pane"
      data-ocid="clients.split_pane"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-zinc-700 flex-shrink-0">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-foreground truncate">
            {client?.companyName ?? ""}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-semibold text-primary">
              ₹{(client?.dealValue ?? 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {client && <StatusBadge status={client.currentStatus} />}
          <button
            type="button"
            aria-label="Close split pane"
            className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
            onClick={onClose}
            data-ocid="clients.split_pane.close_button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content — scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Contact info */}
        {client && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Contact
            </p>
            <p className="text-sm text-foreground">
              {client.contactPersonName}
            </p>
            <p className="text-xs text-muted-foreground">
              {client.designation}
            </p>
            <p className="text-xs text-muted-foreground">{client.email}</p>
          </div>
        )}

        {/* Recent activity */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Activity
            </p>
          </div>
          {recent.length === 0 ? (
            <p className="text-xs text-muted-foreground/50 py-2">
              No activity yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.map((act) => (
                <li key={act.id} className="flex gap-2.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-foreground/80 truncate">
                      {ACTIVITY_TYPE_LABELS[act.activityType as string] ??
                        act.activityType}{" "}
                      — {act.description}
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-0.5">
                      {act.timestamp.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-4 border-t border-zinc-700 flex-shrink-0 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleLogActivity("call")}
            disabled={logActivity.isPending || !client}
            className="flex-1 min-w-[80px] px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-foreground transition-colors disabled:opacity-50"
            data-ocid="clients.split_pane.log_call_button"
          >
            📞 Call
          </button>
          <button
            type="button"
            onClick={() => handleLogActivity("email")}
            disabled={logActivity.isPending || !client}
            className="flex-1 min-w-[80px] px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-foreground transition-colors disabled:opacity-50"
            data-ocid="clients.split_pane.log_email_button"
          >
            ✉️ Email
          </button>
          <button
            type="button"
            onClick={() => handleLogActivity("meeting")}
            disabled={logActivity.isPending || !client}
            className="flex-1 min-w-[80px] px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-foreground transition-colors disabled:opacity-50"
            data-ocid="clients.split_pane.log_meeting_button"
          >
            🤝 Meeting
          </button>
        </div>

        {/* Move Stage */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setStageOpen((v) => !v)}
            disabled={!client}
            className="w-full px-3 py-1.5 rounded-md text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-colors disabled:opacity-50"
            data-ocid="clients.split_pane.move_stage_button"
          >
            Move Stage →
          </button>
          {stageOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl overflow-hidden z-10">
              {Object.keys(STATUS_LABELS).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="w-full text-left px-3 py-2 text-xs text-foreground hover:bg-zinc-800 transition-colors"
                  onClick={() => handleMoveStage(s as ClientStatus)}
                >
                  {STATUS_LABELS[s as ClientStatus]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
