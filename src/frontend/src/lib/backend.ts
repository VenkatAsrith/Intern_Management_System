import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { Space, Status, ExperienceLevel } from "@/backend";
import { DocumentField } from "@/types";
import type {
  BackendIntern,
  BackendPerformance,
  BackendActivity,
  BackendDashboardStats,
  BackendCreateInternPayload,
  BackendUpdateInternPayload,
  BackendCreatePerformancePayload,
  BackendUpdatePerformancePayload,
} from "@/types";
import type { Intern, Performance, Activity, DashboardStats } from "@/types";

export { createActor, Space, Status, ExperienceLevel };
export { DocumentField };

export function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isFetching };
}

// Candid variant converters
export function spaceToVariant(space: Space): { Org: null } | { Marketing: null } | { Learning: null } {
  if (space === Space.Org) return { Org: null };
  if (space === Space.Marketing) return { Marketing: null };
  return { Learning: null };
}

export function statusToVariant(status: Status): { Active: null } | { Completed: null } | { OnHold: null } {
  if (status === Status.Active) return { Active: null };
  if (status === Status.Completed) return { Completed: null };
  return { OnHold: null };
}

export function experienceLevelToVariant(
  level: ExperienceLevel
): { Junior: null } | { Mid: null } | { Senior: null } {
  if (level === ExperienceLevel.Junior) return { Junior: null };
  if (level === ExperienceLevel.Mid) return { Mid: null };
  return { Senior: null };
}

function bigintToDate(ts: bigint): Date {
  return new Date(Number(ts) / 1_000_000);
}

function optBigintToDate(ts: bigint | undefined): Date | undefined {
  if (ts === undefined || ts === null) return undefined;
  return bigintToDate(ts);
}

export function convertIntern(raw: BackendIntern): Intern {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    department: raw.department,
    space: raw.space,
    status: raw.status,
    experienceLevel: raw.experienceLevel,
    profilePicCid: raw.profilePicCid,
    joiningDate: bigintToDate(raw.joiningDate),
    createdAt: bigintToDate(raw.createdAt),
    updatedAt: bigintToDate(raw.updatedAt),
    adminNotes: raw.adminNotes,
    offerLetterSent: raw.offerLetterSent,
    offerLetterSentAt: optBigintToDate(raw.offerLetterSentAt),
    offerLetterOpened: raw.offerLetterOpened,
    offerLetterOpenedAt: optBigintToDate(raw.offerLetterOpenedAt),
    certificateSent: raw.certificateSent,
    certificateSentAt: optBigintToDate(raw.certificateSentAt),
    certificateOpened: raw.certificateOpened,
    certificateOpenedAt: optBigintToDate(raw.certificateOpenedAt),
    completionLetterSent: raw.completionLetterSent,
    completionLetterSentAt: optBigintToDate(raw.completionLetterSentAt),
    completionLetterOpened: raw.completionLetterOpened,
    completionLetterOpenedAt: optBigintToDate(raw.completionLetterOpenedAt),
    lastWhatsAppedAt: optBigintToDate(raw.lastWhatsAppedAt),
    lastContactedAt: optBigintToDate(raw.lastContactedAt),
  };
}

export function convertPerformance(raw: BackendPerformance): Performance {
  return {
    id: raw.id,
    internId: raw.internId,
    month: Number(raw.month),
    year: Number(raw.year),
    taskScore: raw.taskScore,
    attendanceScore: raw.attendanceScore,
    communicationScore: raw.communicationScore,
    initiativeScore: raw.initiativeScore,
    overallScore: raw.overallScore,
    adminNotes: raw.adminNotes,
    createdAt: bigintToDate(raw.createdAt),
  };
}

export function convertActivity(raw: BackendActivity): Activity {
  return {
    id: raw.id,
    internId: raw.internId,
    action: raw.action,
    details: raw.details,
    performedBy: raw.performedBy,
    timestamp: bigintToDate(raw.timestamp),
  };
}

export function convertDashboardStats(raw: BackendDashboardStats): DashboardStats {
  return {
    totalInterns: Number(raw.totalInterns),
    activeInterns: Number(raw.activeInterns),
    orgCount: Number(raw.orgCount),
    marketingCount: Number(raw.marketingCount),
    learningCount: Number(raw.learningCount),
    documentsSentThisMonth: Number(raw.documentsSentThisMonth),
    avgPerformance: raw.avgPerformance,
  };
}

export function internCreatePayload(
  data: Omit<BackendCreateInternPayload, "joiningDate"> & { joiningDate: Date }
): BackendCreateInternPayload {
  return {
    ...data,
    joiningDate: BigInt(data.joiningDate.getTime()) * 1_000_000n,
  };
}

export function internUpdatePayload(
  data: Omit<BackendUpdateInternPayload, "joiningDate"> & { joiningDate: Date }
): BackendUpdateInternPayload {
  return {
    ...data,
    joiningDate: BigInt(data.joiningDate.getTime()) * 1_000_000n,
  };
}

export function performanceCreatePayload(
  data: Omit<BackendCreatePerformancePayload, "month" | "year"> & { month: number; year: number }
): BackendCreatePerformancePayload {
  return {
    ...data,
    month: BigInt(data.month),
    year: BigInt(data.year),
  };
}

export function performanceUpdatePayload(
  data: Omit<BackendUpdatePerformancePayload, "month" | "year"> & { month: number; year: number }
): BackendUpdatePerformancePayload {
  return {
    ...data,
    month: BigInt(data.month),
    year: BigInt(data.year),
  };
}
