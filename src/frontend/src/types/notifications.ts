export type NotificationType =
  | "taskAssigned"
  | "stageChanged"
  | "invoiceDue"
  | "attendanceAnomaly"
  | "overdueFollowUp"
  | "taskOverdue"
  | "leaveApproved"
  | "leaveRejected"
  | "announcement";

export interface Notification {
  id: string;
  userId: string;
  notificationType: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedId: string | null;
  createdAt: bigint;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: bigint;
  isActive: boolean;
}
