import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type Task, useTasks } from "@/hooks/use-tasks";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Kanban,
  LayoutList,
} from "lucide-react";
import { useState } from "react";

const STATUSES = [
  "Pending",
  "InProgress",
  "UnderReview",
  "Completed",
  "Rejected",
  "ReworkNeeded",
] as const;
type TaskStatus = (typeof STATUSES)[number];
const KANBAN_COLS: TaskStatus[] = [
  "Pending",
  "InProgress",
  "UnderReview",
  "Completed",
];

const statusColors: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground border-border",
  InProgress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  UnderReview: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  ReworkNeeded: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const statusLabels: Record<string, string> = {
  Pending: "Pending",
  InProgress: "In Progress",
  UnderReview: "Under Review",
  Completed: "Completed",
  Rejected: "Rejected",
  ReworkNeeded: "Rework Needed",
};

const priorityColors: Record<string, string> = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

function isOverdue(deadline?: bigint) {
  if (!deadline) return false;
  return Number(deadline) / 1_000_000 < Date.now();
}

function TaskCard({ task }: { task: Task }) {
  const overdue = isOverdue(task.deadline);
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-2"
      data-ocid={`tasks.card.${task.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {task.title}
        </p>
        <Badge
          className={`text-xs border flex-shrink-0 ${priorityColors[task.priority] ?? "bg-muted text-muted-foreground border-border"}`}
        >
          {task.priority}
        </Badge>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          className={`text-xs border ${statusColors[task.status] ?? "bg-muted text-muted-foreground border-border"}`}
        >
          {statusLabels[task.status] ?? task.status}
        </Badge>
        {task.deadline && (
          <span
            className={`text-xs flex items-center gap-1 ${overdue ? "text-red-400" : "text-muted-foreground"}`}
          >
            {overdue ? (
              <AlertCircle className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
            {new Date(Number(task.deadline) / 1_000_000).toLocaleDateString()}
          </span>
        )}
      </div>
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}
    </div>
  );
}

function KanbanView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto">
      {KANBAN_COLS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col);
        return (
          <div
            key={col}
            className="bg-muted/30 border border-border rounded-xl p-3 min-w-[160px]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-foreground">
                {statusLabels[col]}
              </span>
              <Badge className="bg-muted text-muted-foreground border-border text-xs">
                {colTasks.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {colTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-card border border-border rounded-lg p-2.5 text-xs"
                  data-ocid={`tasks.kanban.${t.id}`}
                >
                  <p className="font-medium text-foreground line-clamp-2">
                    {t.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge
                      className={`text-xs border ${priorityColors[t.priority] ?? ""}`}
                    >
                      {t.priority}
                    </Badge>
                    {isOverdue(t.deadline) && (
                      <AlertCircle className="h-3 w-3 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
              {colTasks.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TaskCenterTab({
  internId,
  isAdmin: _isAdmin,
}: { internId: string; isAdmin: boolean }) {
  const { data: tasks = [], isLoading } = useTasks(internId);
  const [view, setView] = useState<"list" | "kanban">("list");

  const active = tasks.filter(
    (t) => t.status !== "Completed" && t.status !== "Rejected",
  );
  const overdue = tasks.filter(
    (t) => isOverdue(t.deadline) && t.status !== "Completed",
  );
  const completed = tasks.filter((t) => t.status === "Completed");

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="tasks.tab">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">Task Center</h3>
          <Badge className="bg-muted text-muted-foreground border-border text-xs">
            {tasks.length} total
          </Badge>
          {overdue.length > 0 && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
              {overdue.length} overdue
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView("list")}
            className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="List view"
            data-ocid="tasks.list_view_toggle"
          >
            <LayoutList className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("kanban")}
            className={`p-1.5 rounded-md transition-colors ${view === "kanban" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="Kanban view"
            data-ocid="tasks.kanban_view_toggle"
          >
            <Kanban className="h-4 w-4" />
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div
          className="bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-3 text-center"
          data-ocid="tasks.empty_state"
        >
          <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
          <p className="font-semibold text-foreground">No tasks yet</p>
          <p className="text-sm text-muted-foreground">
            Tasks assigned to this intern will appear here.
          </p>
        </div>
      ) : view === "kanban" ? (
        <KanbanView tasks={tasks} />
      ) : (
        <div className="space-y-4">
          {active.length > 0 && (
            <section>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Active ({active.length})
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {active.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            </section>
          )}
          {overdue.length > 0 && (
            <section>
              <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                Overdue ({overdue.length})
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {overdue.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            </section>
          )}
          {completed.length > 0 && (
            <section>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Completed ({completed.length})
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {completed.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
