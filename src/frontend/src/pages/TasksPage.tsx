import type { Task } from "@/backend";
import { TaskModal } from "@/components/tasks/TaskModal";
import {
  TaskStatusBadge,
  normalizeStatus,
} from "@/components/tasks/TaskStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { useInterns } from "@/hooks/use-interns";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import {
  useAllTasks,
  useDeleteTask,
  useUpdateTask,
} from "@/hooks/useWorkspace";
import {
  AlertTriangle,
  ChevronDown,
  Download,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

const ALL_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "inProgress", label: "In Progress" },
  { value: "underReview", label: "Under Review" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
  { value: "reworkNeeded", label: "Rework Needed" },
];

const ALL_PRIORITIES = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const ALL_SPACES = [
  { value: "all", label: "All Spaces" },
  { value: "Org", label: "Org" },
  { value: "Marketing", label: "Marketing" },
  { value: "Learning", label: "Learning" },
];

const PRIORITY_ORDER = ["critical", "high", "medium", "low"];

function formatDeadline(deadline: bigint | undefined | null): string {
  if (!deadline) return "\u2014";
  return new Date(Number(deadline) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(deadline: bigint | undefined | null): boolean {
  if (!deadline) return false;
  return Number(deadline) / 1_000_000 < Date.now();
}

function csvExport(tasks: Task[], internNames: Record<string, string>) {
  const rows = [
    ["Title", "Status", "Priority", "Deadline", "Assigned To", "Space", "Tags"],
    ...tasks.map((t) => [
      t.title,
      t.status,
      t.priority,
      formatDeadline(t.deadline),
      internNames[t.assignedInternId] ?? t.assignedInternId,
      t.teamSpace,
      t.tags.join("; "),
    ]),
  ];
  const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function InlineStatusSelect({
  task,
  onUpdate,
}: {
  task: Task;
  onUpdate: (id: string, status: string) => void;
}) {
  return (
    <Select
      value={normalizeStatus(task.status)}
      onValueChange={(v) => onUpdate(task.id, v)}
    >
      <SelectTrigger
        className="h-7 w-36 border-0 bg-transparent p-0 text-xs"
        data-ocid={`task.status_select.${task.id}`}
      >
        <TaskStatusBadge status={task.status} size="sm" />
        <ChevronDown className="h-3 w-3 ml-auto text-muted-foreground" />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {ALL_STATUSES.filter((s) => s.value !== "all").map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TasksPage() {
  const { isAdmin, sessionToken } = useAuth();
  const currentUserId = sessionToken ? sessionToken.split(":")[0] : "";
  const { data: tasks = [], isLoading } = useAllTasks();
  const { data: interns = [] } = useInterns();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [spaceFilter, setSpaceFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const internNames = useMemo(() => {
    const map: Record<string, string> = {};
    for (const i of interns) map[i.id] = i.name;
    return map;
  }, [interns]);

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

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => {
        if (search) {
          const q = search.toLowerCase();
          if (
            !t.title.toLowerCase().includes(q) &&
            !t.description.toLowerCase().includes(q)
          )
            return false;
        }
        if (
          statusFilter !== "all" &&
          normalizeStatus(t.status) !== statusFilter
        )
          return false;
        if (priorityFilter !== "all" && t.priority !== priorityFilter)
          return false;
        if (spaceFilter !== "all" && t.teamSpace !== spaceFilter) return false;
        if (assigneeFilter !== "all" && t.assignedInternId !== assigneeFilter)
          return false;
        return true;
      })
      .sort(
        (a, b) =>
          PRIORITY_ORDER.indexOf(a.priority) -
          PRIORITY_ORDER.indexOf(b.priority),
      );
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    spaceFilter,
    assigneeFilter,
  ]);

  const completedCount = tasks.filter(
    (t) => normalizeStatus(t.status) === "completed",
  ).length;
  const completionPct =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  function handleStatusChange(id: string, status: string) {
    void updateTask.mutateAsync({ id, payload: { status } });
  }

  function handleDelete(id: string) {
    void deleteTask.mutateAsync(id).then(() => setDeleteConfirm(null));
  }

  if (!sessionToken) {
    return (
      <div
        className="p-6 text-center text-muted-foreground"
        data-ocid="tasks.error_state"
      >
        Please log in to view tasks.
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-foreground">Tasks</h1>
            <p className="text-xs text-muted-foreground">
              {tasks.length} tasks &middot; {completionPct}% complete
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => csvExport(filtered, internNames)}
              className="border-border text-muted-foreground h-8"
              data-ocid="tasks.export_button"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setEditTask(null);
                setTaskModalOpen(true);
              }}
              className="bg-primary text-primary-foreground h-8"
              data-ocid="tasks.new_task_button"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              New Task
              <kbd className="ml-2 text-[10px] opacity-60 border border-primary-foreground/20 rounded px-1">
                T
              </kbd>
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Overall Completion</span>
            <span>{completionPct}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card/50 border-b border-border px-6 py-3">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="pl-8 h-8 bg-background border-border text-sm"
              data-ocid="tasks.search_input"
            />
          </div>
          <Filter className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="h-8 w-36 text-xs bg-background border-border"
              data-ocid="tasks.status_filter"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value} className="text-xs">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger
              className="h-8 w-36 text-xs bg-background border-border"
              data-ocid="tasks.priority_filter"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {ALL_PRIORITIES.map((p) => (
                <SelectItem key={p.value} value={p.value} className="text-xs">
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={spaceFilter} onValueChange={setSpaceFilter}>
            <SelectTrigger
              className="h-8 w-32 text-xs bg-background border-border"
              data-ocid="tasks.space_filter"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {ALL_SPACES.map((s) => (
                <SelectItem key={s.value} value={s.value} className="text-xs">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isAdmin() && (
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger
                className="h-8 w-36 text-xs bg-background border-border"
                data-ocid="tasks.assignee_filter"
              >
                <SelectValue placeholder="All Assignees" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all" className="text-xs">
                  All Assignees
                </SelectItem>
                {interns.map((i) => (
                  <SelectItem key={i.id} value={i.id} className="text-xs">
                    {i.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="space-y-2" data-ocid="tasks.loading_state">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: static length array, stable order
                key={`task-skeleton-${i}`}
                className="h-12 rounded-lg"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="tasks.empty_state"
          >
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-3 opacity-40" />
            <p className="text-sm font-medium text-foreground mb-1">
              No tasks found
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {search || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your filters"
                : "Create the first task to get started"}
            </p>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setEditTask(null);
                setTaskModalOpen(true);
              }}
              className="bg-primary text-primary-foreground"
              data-ocid="tasks.empty_state_cta"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Create Task
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-card border-border hover:bg-card">
                  <TableHead className="text-xs text-muted-foreground w-[280px]">
                    Title
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Priority
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Deadline
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Assigned To
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Space
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Tags
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground w-20">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((task, idx) => {
                  const overdue = isOverdue(task.deadline);
                  const isConfirmingDelete = deleteConfirm === task.id;
                  return (
                    <TableRow
                      key={task.id}
                      className="border-border hover:bg-muted/30 group"
                      data-ocid={`tasks.item.${idx + 1}`}
                    >
                      {/* Title */}
                      <TableCell className="py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate max-w-[260px]">
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </TableCell>

                      {/* Status inline change */}
                      <TableCell>
                        <InlineStatusSelect
                          task={task}
                          onUpdate={handleStatusChange}
                        />
                      </TableCell>

                      {/* Priority */}
                      <TableCell>
                        <span
                          className={`text-xs font-semibold capitalize ${
                            task.priority === "critical"
                              ? "text-primary"
                              : task.priority === "high"
                                ? "text-[oklch(var(--task-rejected))]"
                                : task.priority === "medium"
                                  ? "text-[oklch(var(--task-under-review))]"
                                  : "text-muted-foreground"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </TableCell>

                      {/* Deadline */}
                      <TableCell>
                        <span
                          className={`text-xs ${
                            overdue && task.status !== "completed"
                              ? "text-primary font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {overdue && task.status !== "completed"
                            ? "\u26a0 "
                            : ""}
                          {formatDeadline(task.deadline)}
                        </span>
                      </TableCell>

                      {/* Assignee */}
                      <TableCell>
                        <span className="text-xs text-foreground">
                          {internNames[task.assignedInternId] ??
                            task.assignedInternId}
                        </span>
                      </TableCell>

                      {/* Space */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-border"
                        >
                          {task.teamSpace}
                        </Badge>
                      </TableCell>

                      {/* Tags */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 2 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{task.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        {isConfirmingDelete ? (
                          <div className="flex gap-1">
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="h-6 w-6"
                              onClick={() => handleDelete(task.id)}
                              data-ocid={`tasks.confirm_button.${idx + 1}`}
                            >
                              \u2713
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => setDeleteConfirm(null)}
                              data-ocid={`tasks.cancel_button.${idx + 1}`}
                            >
                              \u2717
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-muted-foreground hover:text-foreground"
                              onClick={() => {
                                setEditTask(task);
                                setTaskModalOpen(true);
                              }}
                              data-ocid={`tasks.edit_button.${idx + 1}`}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={() => setDeleteConfirm(task.id)}
                              data-ocid={`tasks.delete_button.${idx + 1}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <TaskModal
        open={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditTask(null);
        }}
        task={editTask}
        prefillInternId={!isAdmin() ? currentUserId : undefined}
      />
    </div>
  );
}

export default TasksPage;
