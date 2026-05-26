export type DayType = "working" | "holiday" | "leave" | "halfDay";
export type CheckInMethod = "qrCode" | "manual";
export type LeaveType = "casual" | "sick" | "compensatory" | "lop";
export type LeaveStatus = "pending" | "approved" | "rejected";

export interface AttendanceRecord {
  id: string;
  internId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  method: CheckInMethod;
  sessionDuration: number | null;
  isLate: boolean;
  dayType: DayType;
  notes: string;
  createdAt: bigint;
}

export interface LeaveRequest {
  id: string;
  internId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  reviewedBy: string | null;
  reviewedAt: bigint | null;
  createdAt: bigint;
}

export interface QRToken {
  token: string;
  expiresAt: bigint;
  createdAt: bigint;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  lateDays: number;
  attendanceRate: number;
}
