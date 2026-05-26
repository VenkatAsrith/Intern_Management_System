export type TaskStatus =
  | "draft"
  | "submitted"
  | "underReview"
  | "approved"
  | "revisionRequested";

export type TaskPriority = "critical" | "high" | "medium" | "low";

export interface Sprint {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  weekDuration: number;
  createdAt: bigint;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  sprintId: string | null;
  attachments: string[];
  createdAt: bigint;
  updatedAt: bigint;
  reviewNotes: string;
}
