import {
  ActivityType,
  ClientStatus,
  PaymentStatus,
  PriorityLevel,
} from "@/backend";
import type {
  Client as BackendClient,
  ClientActivity as BackendClientActivity,
  ClientAnalytics as BackendClientAnalytics,
  ClientComment as BackendClientComment,
  CreateClientRequest as BackendCreateClientRequest,
  Invoice as BackendInvoice,
  InvoiceLineItem as BackendInvoiceLineItem,
  StatusHistoryEntry as BackendStatusHistoryEntry,
  UpdateClientRequest as BackendUpdateClientRequest,
  MonthlyAnalyticsEntry,
} from "@/backend";

// Re-export backend enums for convenience
export { ActivityType, ClientStatus, PaymentStatus, PriorityLevel };
export type { MonthlyAnalyticsEntry };

// ─── New CRM-upgrade enums ────────────────────────────────────────────────────
export type InvoicePaymentStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "paid"
  | "overdue"
  | "partial";

export type ProposalStatus = "sent" | "viewed" | "accepted" | "rejected";

// Extended ActivityType values (used for quick-log actions)
export type ExtendedActivityType =
  | ActivityType
  | "quickCall"
  | "quickMeeting"
  | "quickEmail";

// ─── Contact person (multiple per company) ───────────────────────────────────
export interface ContactPerson {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isPrimary: boolean;
  addedAt: number;
}

// Frontend-friendly Client type (bigint timestamps converted to Date)
export interface Client {
  id: string;
  companyName: string;
  contactPersonName: string;
  designation: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  website: string;
  industryType: string;
  companySize: string;
  location: string;
  gstNumber?: string;
  serviceInterested: string;
  dealValue: number;
  leadSource: string;
  priorityLevel: PriorityLevel;
  assignedTeamMember: string;
  followUpDate?: Date;
  nextMeetingDate?: Date;
  currentStatus: ClientStatus;
  statusHistory: StatusHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastActivityDate?: Date;
  closedReason?: string;
  // CRM upgrade fields
  contacts: ContactPerson[];
  leadScore: number;
  dealProbability: number;
  healthScore: number;
  engagementScore: number;
  tags: string[];
  source: string;
  customFields: Record<string, string>;
  lastActivity: number | null;
  activityCount: number;
  proposalStatus: string | null;
  proposalExpiry: number | null;
  proposalVersion: number;
  wonLostReason: string | null;
  closedAt: number | null;
}

export interface StatusHistoryEntry {
  status: ClientStatus;
  note: string;
  adminName: string;
  timestamp: Date;
}

export interface ClientActivity {
  id: string;
  clientId: string;
  activityType: ActivityType;
  description: string;
  metadata?: string;
  adminName: string;
  timestamp: Date;
}

export interface ClientComment {
  id: string;
  clientId: string;
  content: string;
  authorName: string;
  timestamp: Date;
  parentId?: string;
  isPinned: boolean;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: PaymentStatus;
  // CRM upgrade
  status: InvoicePaymentStatus;
  dueDate: number | null;
  amountPaid: number;
  notes?: string;
  createdAt: Date;
  createdBy: string;
}

export interface ClientAnalytics {
  totalClients: number;
  activeLeads: number;
  approvedDeals: number;
  rejectedLeads: number;
  revenuePipeline: number;
  monthlyData: MonthlyAnalytics[];
}

export interface MonthlyAnalytics {
  month: string;
  newLeads: number;
  approved: number;
  rejected: number;
}

// Request types mirror backend directly (bigint timestamps for optional dates)
export type CreateClientRequest = BackendCreateClientRequest & {
  closedReason?: string;
  pipelineValue?: number;
};
export type UpdateClientRequest = BackendUpdateClientRequest & {
  closedReason?: string;
  pipelineValue?: number;
};

// Legacy flat filters (used by existing table)
export interface ClientFilters {
  search: string;
  status: ClientStatus | "all";
  priority: PriorityLevel | "all";
  industry: string;
  assignedTo: string;
  dealValueMin: string;
  dealValueMax: string;
  dateRange: "all" | "7d" | "30d" | "90d";
}

// Advanced filters for saved filter sets
export interface AdvancedClientFilters {
  status?: ClientStatus[];
  priority?: PriorityLevel[];
  assignedTo?: string;
  source?: string;
  tags?: string[];
  dealValueMin?: number;
  dealValueMax?: number;
  dateRange?: { start: number; end: number };
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: AdvancedClientFilters;
  createdAt: number;
}

// ─── Analytics types ──────────────────────────────────────────────────────────
export interface AnalyticsData {
  totalPipeline: number;
  weightedForecast: number;
  winRate: number;
  avgDealCycleDays: number;
  conversionRates: [string, number][];
  wonLostBreakdown: [string, number][];
}

// Status color map — bg, text, border Tailwind classes + hex
export const STATUS_COLORS: Record<
  ClientStatus,
  { bg: string; text: string; border: string; dot: string }
> = {
  [ClientStatus.leadCaptured]: {
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    border: "border-slate-500/30",
    dot: "bg-slate-400",
  },
  [ClientStatus.contacted]: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
  },
  [ClientStatus.discoveryCallDone]: {
    bg: "bg-purple-500/15",
    text: "text-purple-400",
    border: "border-purple-500/30",
    dot: "bg-purple-400",
  },
  [ClientStatus.proposalSent]: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  [ClientStatus.negotiation]: {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/30",
    dot: "bg-orange-400",
  },
  [ClientStatus.closedWon]: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  [ClientStatus.closedLost]: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
  },
  [ClientStatus.onHold]: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    dot: "bg-yellow-400",
  },
};

export const PRIORITY_COLORS: Record<
  PriorityLevel,
  { bg: string; text: string; border: string }
> = {
  [PriorityLevel.low]: {
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    border: "border-slate-500/30",
  },
  [PriorityLevel.medium]: {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    border: "border-sky-500/30",
  },
  [PriorityLevel.high]: {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
  [PriorityLevel.urgent]: {
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/30",
  },
};

export const STATUS_LABELS: Record<ClientStatus, string> = {
  [ClientStatus.leadCaptured]: "Lead Captured",
  [ClientStatus.contacted]: "Contacted",
  [ClientStatus.discoveryCallDone]: "Discovery Call Done",
  [ClientStatus.proposalSent]: "Proposal Sent",
  [ClientStatus.negotiation]: "Negotiation",
  [ClientStatus.closedWon]: "Closed Won",
  [ClientStatus.closedLost]: "Closed Lost",
  [ClientStatus.onHold]: "On Hold",
};

export const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  [PriorityLevel.low]: "Low",
  [PriorityLevel.medium]: "Medium",
  [PriorityLevel.high]: "High",
  [PriorityLevel.urgent]: "Urgent",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.pending]: "Pending",
  [PaymentStatus.paid]: "Paid",
  [PaymentStatus.overdue]: "Overdue",
  [PaymentStatus.cancelled]: "Cancelled",
};

// Converter helpers — Backend bigint → frontend Date
export function toFrontendClient(raw: BackendClient): Client {
  const r = raw as BackendClient & Record<string, unknown>;
  return {
    id: raw.id,
    companyName: raw.companyName,
    contactPersonName: raw.contactPersonName,
    designation: raw.designation,
    email: raw.email,
    phone: raw.phone,
    whatsappNumber: raw.whatsappNumber,
    website: raw.website,
    industryType: raw.industryType,
    companySize: raw.companySize,
    location: raw.location,
    gstNumber: raw.gstNumber,
    serviceInterested: raw.serviceInterested,
    dealValue: raw.dealValue,
    leadSource: raw.leadSource,
    priorityLevel: raw.priorityLevel,
    assignedTeamMember: raw.assignedTeamMember,
    followUpDate:
      raw.followUpDate !== undefined && raw.followUpDate !== null
        ? new Date(Number(raw.followUpDate) / 1_000_000)
        : undefined,
    nextMeetingDate:
      raw.nextMeetingDate !== undefined && raw.nextMeetingDate !== null
        ? new Date(Number(raw.nextMeetingDate) / 1_000_000)
        : undefined,
    currentStatus: raw.currentStatus,
    statusHistory: raw.statusHistory.map((h: BackendStatusHistoryEntry) => ({
      status: h.status,
      note: h.note,
      adminName: h.adminName,
      timestamp: new Date(Number(h.timestamp) / 1_000_000),
    })),
    createdAt: new Date(Number(raw.createdAt) / 1_000_000),
    updatedAt: new Date(Number(raw.updatedAt) / 1_000_000),
    createdBy: raw.createdBy,
    lastActivityDate:
      raw.lastActivityDate !== undefined && raw.lastActivityDate !== null
        ? new Date(Number(raw.lastActivityDate) / 1_000_000)
        : undefined,
    closedReason: raw.closedReason,
    // CRM upgrade fields (safe fallbacks for older records)
    contacts: Array.isArray(r.contacts)
      ? (
          r.contacts as Array<{
            id: string;
            name: string;
            email: string;
            phone: string;
            role: string;
            isPrimary: boolean;
            addedAt: bigint | number;
          }>
        ).map((c) => ({
          ...c,
          addedAt:
            typeof c.addedAt === "bigint"
              ? Number(c.addedAt) / 1_000_000
              : c.addedAt,
        }))
      : [],
    leadScore: typeof r.leadScore === "number" ? r.leadScore : 0,
    dealProbability:
      typeof r.dealProbability === "number" ? r.dealProbability : 0,
    healthScore: typeof r.healthScore === "number" ? r.healthScore : 0,
    engagementScore:
      typeof r.engagementScore === "number" ? r.engagementScore : 0,
    tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
    source: typeof r.source === "string" ? r.source : raw.leadSource,
    customFields:
      r.customFields &&
      typeof r.customFields === "object" &&
      !Array.isArray(r.customFields)
        ? (r.customFields as Record<string, string>)
        : {},
    lastActivity: typeof r.lastActivity === "number" ? r.lastActivity : null,
    activityCount: typeof r.activityCount === "number" ? r.activityCount : 0,
    proposalStatus:
      typeof r.proposalStatus === "string" ? r.proposalStatus : null,
    proposalExpiry:
      typeof r.proposalExpiry === "number" ? r.proposalExpiry : null,
    proposalVersion:
      typeof r.proposalVersion === "number" ? r.proposalVersion : 0,
    wonLostReason: typeof r.wonLostReason === "string" ? r.wonLostReason : null,
    closedAt: typeof r.closedAt === "number" ? r.closedAt : null,
  };
}

export function toFrontendClientActivity(
  raw: BackendClientActivity,
): ClientActivity {
  return {
    id: raw.id,
    clientId: raw.clientId,
    activityType: raw.activityType,
    description: raw.description,
    metadata: raw.metadata,
    adminName: raw.adminName,
    timestamp: new Date(Number(raw.timestamp) / 1_000_000),
  };
}

export function toFrontendClientComment(
  raw: BackendClientComment,
): ClientComment {
  return {
    id: raw.id,
    clientId: raw.clientId,
    content: raw.content,
    authorName: raw.authorName,
    timestamp: new Date(Number(raw.timestamp) / 1_000_000),
    parentId: raw.parentId,
    isPinned: raw.isPinned,
  };
}

export function toFrontendInvoice(raw: BackendInvoice): Invoice {
  return {
    id: raw.id,
    clientId: raw.clientId,
    invoiceNumber: raw.invoiceNumber,
    lineItems: raw.lineItems.map((item: BackendInvoiceLineItem) => ({
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.amount,
    })),
    subtotal: raw.subtotal,
    tax: raw.tax,
    total: raw.total,
    paymentStatus: raw.paymentStatus,
    // CRM upgrade fields with safe fallbacks for older backend records
    status: raw.status ?? "sent",
    dueDate: raw.dueDate != null ? Number(raw.dueDate) : null,
    amountPaid: Number(raw.amountPaid ?? 0),
    notes: raw.notes,
    createdAt: new Date(Number(raw.createdAt) / 1_000_000),
    createdBy: raw.createdBy,
  };
}

export function toFrontendClientAnalytics(
  raw: BackendClientAnalytics,
): ClientAnalytics {
  return {
    totalClients: Number(raw.totalClients),
    activeLeads: Number(raw.activeLeads),
    approvedDeals: Number(raw.approvedDeals),
    rejectedLeads: Number(raw.rejectedLeads),
    revenuePipeline: raw.revenuePipeline,
    monthlyData: raw.monthlyData.map((m: MonthlyAnalyticsEntry) => ({
      month: m.month,
      newLeads: Number(m.newLeads),
      approved: Number(m.approved),
      rejected: Number(m.rejected),
    })),
  };
}
