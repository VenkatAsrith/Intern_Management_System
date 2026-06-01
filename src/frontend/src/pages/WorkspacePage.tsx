import type { DailyNote, Meeting, Task, WorkSubmission } from "@/backend";
import { TaskModal } from "@/components/tasks/TaskModal";
import { TaskStatusBadge } from "@/components/tasks/TaskStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useIntern } from "@/hooks/use-interns";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useWorkspaceData } from "@/hooks/useWorkspace";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  Star,
  Target,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";

function formatDeadline(deadline: bigint | undefined | null): string | null {
  if (!deadline) return null;
  return new Date(Number(deadline) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function formatMeetingTime(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isOverdue(deadline: bigint | undefined | null): boolean {
  if (!deadline) return false;
  return Number(deadline) / 1_000_000 < Date.now();
}

function PerformanceScoreCard({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "inProgress").length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          Performance Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-4xl font-bold text-foreground">{score}</span>
          <span className="text-muted-foreground text-sm mb-1">/100</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>
            <span className="font-medium text-[oklch(var(--task-completed))]">
              {completed}
            </span>{" "}
            done
          </span>
          <span>
            <span className="font-medium text-[oklch(var(--task-in-progress))]">
              {inProgress}
            </span>{" "}
            active
          </span>
          <span>
            <span className="font-medium text-muted-foreground">{total}</span>{" "}
            total
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskSummaryWidget({
  tasks,
  onAddTask,
}: {
  tasks: Task[];
  onAddTask: () => void;
}) {
  const counts: Record<string, number> = {};
  for (const t of tasks) {
    counts[t.status] = (counts[t.status] ?? 0) + 1;
  }
  const recent = tasks.slice(0, 5);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Tasks
          </CardTitle>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onAddTask}
            className="h-7 px-2 text-xs text-primary hover:bg-primary/10"
            data-ocid="workspace.add_task_button"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Status counts */}
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(counts).map(([status, _count]) => (
            <TaskStatusBadge key={status} status={status} size="sm" />
          ))}
        </div>
        {/* Recent tasks */}
        {recent.length === 0 ? (
          <p
            className="text-xs text-muted-foreground"
            data-ocid="workspace.tasks_empty_state"
          >
            No tasks yet. Add one to get started.
          </p>
        ) : (
          <ul className="space-y-2">
            {recent.map((task, idx) => (
              <li
                key={task.id}
                className="flex items-start justify-between gap-2"
                data-ocid={`workspace.task.${idx + 1}`}
              >
                <div className="min-w-0">
                  <p
                    className={`text-xs font-medium truncate ${
                      isOverdue(task.deadline)
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.deadline && (
                    <p className="text-[10px] text-muted-foreground">
                      Due {formatDeadline(task.deadline)}
                    </p>
                  )}
                </div>
                <TaskStatusBadge status={task.status} size="sm" />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function UpcomingDeadlinesWidget({ tasks }: { tasks: Task[] }) {
  const upcoming = tasks
    .filter((t) => t.deadline && t.status !== "completed")
    .sort((a, b) => Number(a.deadline ?? 0n) - Number(b.deadline ?? 0n))
    .slice(0, 3);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p
            className="text-xs text-muted-foreground"
            data-ocid="workspace.deadlines_empty_state"
          >
            No upcoming deadlines.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {upcoming.map((task, idx) => {
              const overdue = isOverdue(task.deadline);
              return (
                <li
                  key={task.id}
                  className="flex items-center justify-between gap-2"
                  data-ocid={`workspace.deadline.${idx + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    <p
                      className={`text-[10px] font-medium ${
                        overdue ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {overdue ? "Overdue" : formatDeadline(task.deadline)}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      task.priority === "critical" || task.priority === "high"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {task.priority}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function DailyNotesWidget({ notes }: { notes: DailyNote[] }) {
  const recent = [...notes]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Daily Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p
            className="text-xs text-muted-foreground"
            data-ocid="workspace.notes_empty_state"
          >
            No notes yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {recent.map((note, idx) => (
              <li
                key={note.id}
                className="space-y-1"
                data-ocid={`workspace.note.${idx + 1}`}
              >
                <p className="text-[10px] font-medium text-muted-foreground">
                  {note.date}
                </p>
                <p className="text-xs text-foreground line-clamp-2">
                  {note.workedOn}
                </p>
                {note.blockers && (
                  <p className="text-[10px] text-primary line-clamp-1">
                    ⚠ {note.blockers}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function SubmissionsWidget({ submissions }: { submissions: WorkSubmission[] }) {
  const pending = submissions.filter((s) => s.status === "pending").length;
  const approved = submissions.filter((s) => s.status === "approved").length;
  const total = submissions.length;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" />
          Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <p
            className="text-xs text-muted-foreground"
            data-ocid="workspace.submissions_empty_state"
          >
            No submissions yet.
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-xs">
                <span>
                  <span className="font-semibold text-[oklch(var(--submission-pending))]">
                    {pending}
                  </span>{" "}
                  <span className="text-muted-foreground">pending</span>
                </span>
                <span>
                  <span className="font-semibold text-[oklch(var(--submission-approved))]">
                    {approved}
                  </span>{" "}
                  <span className="text-muted-foreground">approved</span>
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {total} total
              </span>
            </div>
            <ul className="space-y-1.5">
              {submissions.slice(0, 3).map((s, idx) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-2"
                  data-ocid={`workspace.submission.${idx + 1}`}
                >
                  <p className="text-xs text-foreground truncate">{s.title}</p>
                  <Badge
                    variant="outline"
                    className="text-[10px] capitalize border-border"
                  >
                    {s.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MeetingsWidget({ meetings }: { meetings: Meeting[] }) {
  const upcoming = [...meetings]
    .filter((m) => Number(m.scheduledAt) / 1_000_000 > Date.now())
    .sort((a, b) => Number(a.scheduledAt) - Number(b.scheduledAt))
    .slice(0, 2);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Meeting Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p
            className="text-xs text-muted-foreground"
            data-ocid="workspace.meetings_empty_state"
          >
            No upcoming meetings.
          </p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((m, idx) => (
              <li
                key={m.id}
                className="space-y-1"
                data-ocid={`workspace.meeting.${idx + 1}`}
              >
                <p className="text-xs font-medium text-foreground">{m.title}</p>
                <p className="text-[10px] text-muted-foreground">
                  {formatMeetingTime(m.scheduledAt)} ·{" "}
                  {Number(m.durationMinutes)}min
                </p>
                {m.joinLink && (
                  <a
                    href={m.joinLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-primary underline-offset-2 hover:underline"
                    data-ocid={`workspace.meeting_join.${idx + 1}`}
                  >
                    Join link →
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function MessagesWidget({ count }: { count: number }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        {count === 0 ? (
          <p
            className="text-xs text-muted-foreground"
            data-ocid="workspace.messages_empty_state"
          >
            No new messages.
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground">{count}</span>
            <span className="text-xs text-muted-foreground">
              unread messages
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function WorkspacePage() {
  const { internId } = useParams({ strict: false }) as { internId: string };
  const navigate = useNavigate();
  const { sessionToken } = useAuth();
  const { data: intern, isLoading: internLoading } = useIntern(internId);
  const { data: workspace, isLoading: wsLoading } = useWorkspaceData(internId);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const shortcuts = useMemo(
    () => [
      {
        key: "t",
        ctrl: false,
        handler: () => setTaskModalOpen(true),
        description: "New task (T)",
      },
    ],
    [],
  );
  useKeyboardShortcuts(shortcuts);

  const isLoading = internLoading || wsLoading;

  const unreadCount =
    (workspace?.directMessages.filter((dm) => !dm.isRead).length ?? 0) +
    (workspace?.channelMessages.length ?? 0);

  if (!sessionToken) {
    return (
      <div
        className="p-6 text-center text-muted-foreground"
        data-ocid="workspace.error_state"
      >
        Please log in to view the workspace.
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => void navigate({ to: "/interns" })}
            className="h-8 w-8 text-muted-foreground"
            data-ocid="workspace.back_button"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <>
                <h1 className="text-lg font-bold text-foreground">
                  {intern?.name ?? "Workspace"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {intern?.department} · {intern?.space} Space
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="workspace.loading_state"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static length array, stable order
              <Skeleton key={`skeleton-${i}`} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                {
                  label: "Total Tasks",
                  value: workspace?.tasks.length ?? 0,
                  icon: Target,
                  color: "text-primary",
                },
                {
                  label: "Completed",
                  value:
                    workspace?.tasks.filter((t) => t.status === "completed")
                      .length ?? 0,
                  icon: CheckCircle2,
                  color: "text-[oklch(var(--task-completed))]",
                },
                {
                  label: "Submissions",
                  value: workspace?.submissions.length ?? 0,
                  icon: Upload,
                  color: "text-[oklch(var(--task-in-progress))]",
                },
                {
                  label: "Meetings",
                  value: workspace?.meetings.length ?? 0,
                  icon: Calendar,
                  color: "text-[oklch(var(--task-under-review))]",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${color}`} />
                  <div>
                    <p className="text-xl font-bold text-foreground leading-none">
                      {value}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Widget grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="workspace.panel"
            >
              <TaskSummaryWidget
                tasks={workspace?.tasks ?? []}
                onAddTask={() => setTaskModalOpen(true)}
              />
              <PerformanceScoreCard tasks={workspace?.tasks ?? []} />
              <UpcomingDeadlinesWidget tasks={workspace?.tasks ?? []} />
              <DailyNotesWidget notes={workspace?.notes ?? []} />
              <MessagesWidget count={unreadCount} />
              <SubmissionsWidget submissions={workspace?.submissions ?? []} />
              <MeetingsWidget meetings={workspace?.meetings ?? []} />
            </div>
          </>
        )}
      </div>

      <TaskModal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        prefillInternId={internId}
      />
    </div>
  );
}

export default WorkspacePage;
