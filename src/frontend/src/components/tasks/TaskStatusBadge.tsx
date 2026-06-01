import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";

export type TaskStatusValue =
  | "pending"
  | "inProgress"
  | "underReview"
  | "completed"
  | "rejected"
  | "reworkNeeded";

const STATUS_CONFIG: Record<
  TaskStatusValue,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: Circle,
    className:
      "bg-[oklch(var(--task-pending)/0.15)] text-[oklch(var(--task-pending))] border-[oklch(var(--task-pending)/0.3)]",
  },
  inProgress: {
    label: "In Progress",
    icon: PlayCircle,
    className:
      "bg-[oklch(var(--task-in-progress)/0.15)] text-[oklch(var(--task-in-progress))] border-[oklch(var(--task-in-progress)/0.3)]",
  },
  underReview: {
    label: "Under Review",
    icon: Clock,
    className:
      "bg-[oklch(var(--task-under-review)/0.15)] text-[oklch(var(--task-under-review))] border-[oklch(var(--task-under-review)/0.3)]",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-[oklch(var(--task-completed)/0.15)] text-[oklch(var(--task-completed))] border-[oklch(var(--task-completed)/0.3)]",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-[oklch(var(--task-rejected)/0.15)] text-[oklch(var(--task-rejected))] border-[oklch(var(--task-rejected)/0.3)]",
  },
  reworkNeeded: {
    label: "Rework Needed",
    icon: RotateCcw,
    className:
      "bg-[oklch(var(--task-rework-needed)/0.15)] text-[oklch(var(--task-rework-needed))] border-[oklch(var(--task-rework-needed)/0.3)]",
  },
};

const FALLBACK: (typeof STATUS_CONFIG)[TaskStatusValue] = {
  label: "Unknown",
  icon: Circle,
  className: "bg-muted text-muted-foreground border-border",
};

export function normalizeStatus(raw: string): TaskStatusValue {
  const map: Record<string, TaskStatusValue> = {
    pending: "pending",
    inprogress: "inProgress",
    in_progress: "inProgress",
    inProgress: "inProgress",
    underreview: "underReview",
    under_review: "underReview",
    underReview: "underReview",
    completed: "completed",
    rejected: "rejected",
    reworkneeded: "reworkNeeded",
    rework_needed: "reworkNeeded",
    reworkNeeded: "reworkNeeded",
  };
  return map[raw] ?? map[raw.toLowerCase()] ?? "pending";
}

interface TaskStatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "md";
}

export function TaskStatusBadge({
  status,
  className,
  size = "md",
}: TaskStatusBadgeProps) {
  const key = normalizeStatus(status);
  const config = STATUS_CONFIG[key] ?? FALLBACK;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className,
      )}
    >
      <Icon className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      {config.label}
    </span>
  );
}
