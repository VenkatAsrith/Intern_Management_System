import { Skeleton } from "@/components/ui/skeleton";
import type { Activity } from "@/types";
import {
  Activity as ActivityIcon,
  FileText,
  MessageCircle,
  Plus,
  Trash2,
  TrendingUp,
  User,
} from "lucide-react";

function formatRelative(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function actionIcon(action: string) {
  if (
    action.toLowerCase().includes("add") ||
    action.toLowerCase().includes("creat")
  )
    return <Plus className="h-3.5 w-3.5" />;
  if (
    action.toLowerCase().includes("delete") ||
    action.toLowerCase().includes("remov")
  )
    return <Trash2 className="h-3.5 w-3.5" />;
  if (action.toLowerCase().includes("perform"))
    return <TrendingUp className="h-3.5 w-3.5" />;
  if (
    action.toLowerCase().includes("document") ||
    action.toLowerCase().includes("letter")
  )
    return <FileText className="h-3.5 w-3.5" />;
  if (action.toLowerCase().includes("whatsapp"))
    return <MessageCircle className="h-3.5 w-3.5" />;
  if (
    action.toLowerCase().includes("update") ||
    action.toLowerCase().includes("edit")
  )
    return <User className="h-3.5 w-3.5" />;
  return <ActivityIcon className="h-3.5 w-3.5" />;
}

function shortPrincipal(principal: string): string {
  if (principal.length <= 12) return principal;
  return `${principal.slice(0, 5)}…${principal.slice(-5)}`;
}

export function ActivityLog({ activities }: { activities: Activity[] }) {
  const sorted = [...activities].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );

  return (
    <div
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="intern_detail.activity_log_panel"
    >
      <h3 className="font-semibold text-foreground mb-1">Activity Log</h3>
      <p className="text-xs text-muted-foreground mb-4">
        All tracked actions for this intern, newest first.
      </p>

      {sorted.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-10 gap-3 text-center"
          data-ocid="intern_detail.activity_empty_state"
        >
          <ActivityIcon className="h-8 w-8 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground">
            No activity recorded yet.
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-0">
            {sorted.map((act, i) => (
              <div
                key={act.id}
                className="relative flex gap-4 pb-5 last:pb-0"
                data-ocid={`intern_detail.activity_item.${i + 1}`}
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground z-10">
                  {actionIcon(act.action)}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground">
                      {act.details || act.action}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatRelative(act.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    by {shortPrincipal(act.performedBy)} &middot;{" "}
                    {act.timestamp.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ActivityLogSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-7 w-7 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
