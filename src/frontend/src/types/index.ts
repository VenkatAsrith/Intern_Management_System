import type {
  Activity as BackendActivity,
  CreateInternPayload as BackendCreateInternPayload,
  CreatePerformancePayload as BackendCreatePerformancePayload,
  DashboardStats as BackendDashboardStats,
  Intern as BackendIntern,
  ListInternsFilter as BackendListInternsFilter,
  Performance as BackendPerformance,
  UpdateInternPayload as BackendUpdateInternPayload,
  UpdatePerformancePayload as BackendUpdatePerformancePayload,
} from "@/backend";
import type { ExperienceLevel, Space, Status } from "@/backend";

export type { Space, Status, ExperienceLevel };

export enum DocumentField {
  offerLetterSent = "offerLetterSent",
  offerLetterOpened = "offerLetterOpened",
  certificateSent = "certificateSent",
  certificateOpened = "certificateOpened",
  completionLetterSent = "completionLetterSent",
  completionLetterOpened = "completionLetterOpened",
}
export type {
  BackendIntern,
  BackendPerformance,
  BackendActivity,
  BackendDashboardStats,
};
export type { BackendCreateInternPayload, BackendUpdateInternPayload };
export type {
  BackendCreatePerformancePayload,
  BackendUpdatePerformancePayload,
};
export type { BackendListInternsFilter };

export interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  space: Space;
  status: Status;
  experienceLevel: ExperienceLevel;
  profilePicCid?: string;
  joiningDate: Date;
  createdAt: Date;
  updatedAt: Date;
  adminNotes: string;
  // Document states
  offerLetterSent: boolean;
  offerLetterSentAt?: Date;
  offerLetterOpened: boolean;
  offerLetterOpenedAt?: Date;
  certificateSent: boolean;
  certificateSentAt?: Date;
  certificateOpened: boolean;
  certificateOpenedAt?: Date;
  completionLetterSent: boolean;
  completionLetterSentAt?: Date;
  completionLetterOpened: boolean;
  completionLetterOpenedAt?: Date;
  // Communication
  lastWhatsAppedAt?: Date;
  lastContactedAt?: Date;
}

export interface Performance {
  id: string;
  internId: string;
  month: number;
  year: number;
  taskScore: number;
  attendanceScore: number;
  communicationScore: number;
  initiativeScore: number;
  overallScore: number;
  adminNotes: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  internId: string;
  action: string;
  details: string;
  performedBy: string;
  timestamp: Date;
}

export interface DashboardStats {
  totalInterns: number;
  activeInterns: number;
  orgCount: number;
  marketingCount: number;
  learningCount: number;
  documentsSentThisMonth: number;
  avgPerformance: number;
}

export interface InternFilter {
  space?: Space;
  status?: Status;
  search?: string;
}

export type SpaceLabel = "Org" | "Marketing" | "Learning";
export type StatusLabel = "Active" | "Completed" | "OnHold";
export type ExperienceLevelLabel = "Junior" | "Mid" | "Senior";
