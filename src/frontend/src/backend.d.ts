import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InvoiceLineItem {
    rate: number;
    description: string;
    quantity: number;
    amount: number;
}
export interface InternPipelineStageHistory {
    changedAt: bigint;
    changedBy: string;
    stage: InternPipelineStage;
    notes: string;
}
export interface ClientActivity {
    id: string;
    clientId: string;
    activityType: ActivityType;
    metadata?: string;
    description: string;
    adminName: string;
    timestamp: bigint;
}
export interface AnalyticsData {
    weightedForecast: bigint;
    conversionRates: Array<[string, bigint]>;
    totalPipeline: bigint;
    avgDealCycleDays: bigint;
    winRate: bigint;
    wonLostBreakdown: Array<[string, bigint]>;
}
export interface MonthlyAnalyticsEntry {
    month: string;
    approved: bigint;
    newLeads: bigint;
    rejected: bigint;
}
export interface CreatePerformancePayload {
    month: bigint;
    overallScore: number;
    internId: string;
    year: bigint;
    initiativeScore: number;
    attendanceScore: number;
    taskScore: number;
    communicationScore: number;
    adminNotes: string;
}
export interface ListInternsFilter {
    status?: Status;
    space?: Space;
}
export interface StatusHistoryEntry {
    status: ClientStatus;
    note: string;
    adminName: string;
    timestamp: bigint;
}
export interface CreateClientRequest {
    source: string;
    serviceInterested: string;
    gstNumber?: string;
    designation: string;
    tags: Array<string>;
    email: string;
    website: string;
    whatsappNumber: string;
    nextMeetingDate?: bigint;
    companyName: string;
    leadSource: string;
    priorityLevel: PriorityLevel;
    dealValue: number;
    companySize: string;
    phone: string;
    industryType: string;
    contactPersonName: string;
    assignedTeamMember: string;
    location: string;
    followUpDate?: bigint;
}
export interface ClientAnalytics {
    rejectedLeads: bigint;
    totalClients: bigint;
    monthlyData: Array<MonthlyAnalyticsEntry>;
    activeLeads: bigint;
    approvedDeals: bigint;
    revenuePipeline: number;
}
export interface UpdateClientRequest {
    source?: string;
    serviceInterested?: string;
    gstNumber?: string;
    designation?: string;
    tags?: Array<string>;
    email?: string;
    website?: string;
    whatsappNumber?: string;
    nextMeetingDate?: bigint;
    companyName?: string;
    leadSource?: string;
    priorityLevel?: PriorityLevel;
    dealValue?: number;
    companySize?: string;
    phone?: string;
    industryType?: string;
    contactPersonName?: string;
    assignedTeamMember?: string;
    location?: string;
    followUpDate?: bigint;
}
export interface UpdateInternPayload {
    status: Status;
    experienceLevel: ExperienceLevel;
    profilePicCid?: string;
    name: string;
    joiningDate: bigint;
    email: string;
    space: Space;
    phone: string;
    department: string;
    adminNotes: string;
}
export interface ContactPerson {
    id: string;
    name: string;
    role: string;
    email: string;
    isPrimary: boolean;
    addedAt: bigint;
    phone: string;
}
export interface Announcement {
    id: string;
    title: string;
    content: string;
    createdAt: bigint;
    createdBy: string;
    isActive: boolean;
}
export interface Client {
    id: string;
    dealProbability: bigint;
    contacts: Array<ContactPerson>;
    source: string;
    serviceInterested: string;
    pipelineValue?: number;
    gstNumber?: string;
    lastActivity?: bigint;
    designation: string;
    createdAt: bigint;
    createdBy: string;
    tags: Array<string>;
    leadScore: bigint;
    lastActivityDate?: bigint;
    statusHistory: Array<StatusHistoryEntry>;
    email: string;
    website: string;
    proposalExpiry?: bigint;
    proposalVersion: bigint;
    whatsappNumber: string;
    customFields: Array<[string, string]>;
    updatedAt: bigint;
    closedAt?: bigint;
    wonLostReason?: string;
    nextMeetingDate?: bigint;
    companyName: string;
    leadSource: string;
    priorityLevel: PriorityLevel;
    dealValue: number;
    companySize: string;
    proposalStatus?: string;
    healthScore: bigint;
    phone: string;
    engagementScore: bigint;
    industryType: string;
    contactPersonName: string;
    assignedTeamMember: string;
    location: string;
    activityCount: bigint;
    currentStatus: ClientStatus;
    closedReason?: string;
    followUpDate?: bigint;
}
export interface Intern {
    id: string;
    dob?: string;
    status: Status;
    experienceLevel: ExperienceLevel;
    profilePicCid?: string;
    performanceTier?: string;
    actualEndDate?: string;
    offerLetterSentAt?: bigint;
    domain?: string;
    stipendAmount?: number;
    mentorAssigned?: string;
    name: string;
    createdAt: bigint;
    emergencyContact?: string;
    joiningDate: bigint;
    certificateOpened: boolean;
    completionLetterOpened: boolean;
    isActive: boolean;
    email: string;
    lastWhatsAppedAt?: bigint;
    certificateOpenedAt?: bigint;
    space: Space;
    updatedAt: bigint;
    pipelineStage: InternPipelineStage;
    offerLetterSent: boolean;
    gender?: string;
    degreeYear?: string;
    certificateSentAt?: bigint;
    completionLetterSentAt?: bigint;
    completionLetterSent: boolean;
    offerLetterOpenedAt?: bigint;
    completionLetterOpenedAt?: bigint;
    phone: string;
    department: string;
    lastContactedAt?: bigint;
    adminNotes: string;
    offerLetterOpened: boolean;
    certificateSent: boolean;
    college?: string;
    expectedEndDate?: string;
    ppoCandidate: boolean;
    startDate?: string;
    internshipType?: string;
}
export interface CreateInternPayload {
    status: Status;
    experienceLevel: ExperienceLevel;
    profilePicCid?: string;
    name: string;
    joiningDate: bigint;
    email: string;
    space: Space;
    phone: string;
    department: string;
    adminNotes: string;
}
export interface Performance {
    id: string;
    month: bigint;
    overallScore: number;
    internId: string;
    createdAt: bigint;
    year: bigint;
    initiativeScore: number;
    attendanceScore: number;
    taskScore: number;
    communicationScore: number;
    adminNotes: string;
}
export interface Invoice {
    id: string;
    tax: number;
    status: InvoicePaymentStatus;
    lineItems: Array<InvoiceLineItem>;
    total: number;
    clientId: string;
    paymentStatus: PaymentStatus;
    createdAt: bigint;
    createdBy: string;
    dueDate?: bigint;
    amountPaid: bigint;
    invoiceNumber: string;
    notes?: string;
    subtotal: number;
}
export interface DashboardStats {
    marketingCount: bigint;
    documentsSentThisMonth: bigint;
    orgCount: bigint;
    totalInterns: bigint;
    activeInterns: bigint;
    learningCount: bigint;
    avgPerformance: number;
}
export interface ClientComment {
    id: string;
    clientId: string;
    content: string;
    authorName: string;
    timestamp: bigint;
    parentId?: string;
    isPinned: boolean;
}
export interface Activity {
    id: string;
    action: string;
    internId: string;
    performedBy: string;
    timestamp: bigint;
    details: string;
}
export interface Notification {
    id: string;
    title: string;
    userId: string;
    notificationType: NotificationType;
    createdAt: bigint;
    isRead: boolean;
    message: string;
    relatedId?: string;
}
export interface UpdatePerformancePayload {
    month: bigint;
    overallScore: number;
    year: bigint;
    initiativeScore: number;
    attendanceScore: number;
    taskScore: number;
    communicationScore: number;
    adminNotes: string;
}
export enum ActivityType {
    whatsappMessage = "whatsappMessage",
    callScheduled = "callScheduled",
    statusChange = "statusChange",
    proposalUploaded = "proposalUploaded",
    noteAdded = "noteAdded",
    documentShared = "documentShared",
    commentAdded = "commentAdded",
    invoiceGenerated = "invoiceGenerated",
    quickMeeting = "quickMeeting",
    quickEmail = "quickEmail",
    quickCall = "quickCall"
}
export enum ClientStatus {
    discoveryCallDone = "discoveryCallDone",
    closedWon = "closedWon",
    leadCaptured = "leadCaptured",
    proposalSent = "proposalSent",
    contacted = "contacted",
    negotiation = "negotiation",
    onHold = "onHold",
    closedLost = "closedLost"
}
export enum ExperienceLevel {
    Mid = "Mid",
    Junior = "Junior",
    Senior = "Senior"
}
export enum InternPipelineStage {
    offerSent = "offerSent",
    active = "active",
    offerRejected = "offerRejected",
    offerAccepted = "offerAccepted",
    alumni = "alumni",
    applied = "applied",
    completed = "completed",
    performanceReview = "performanceReview",
    interviewDone = "interviewDone",
    interviewScheduled = "interviewScheduled",
    onboarding = "onboarding",
    decisionPending = "decisionPending",
    screened = "screened"
}
export enum InvoicePaymentStatus {
    paid = "paid",
    sent = "sent",
    overdue = "overdue",
    draft = "draft",
    viewed = "viewed",
    partial = "partial"
}
export enum NotificationType {
    taskAssigned = "taskAssigned",
    invoiceDue = "invoiceDue",
    attendanceAnomaly = "attendanceAnomaly",
    taskOverdue = "taskOverdue",
    announcement = "announcement",
    leaveApproved = "leaveApproved",
    leaveRejected = "leaveRejected",
    stageChanged = "stageChanged",
    overdueFollowUp = "overdueFollowUp"
}
export enum PaymentStatus {
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    overdue = "overdue"
}
export enum PriorityLevel {
    low = "low",
    high = "high",
    urgent = "urgent",
    medium = "medium"
}
export enum Space {
    Org = "Org",
    Learning = "Learning",
    Marketing = "Marketing"
}
export enum Status {
    OnHold = "OnHold",
    Active = "Active",
    Completed = "Completed"
}
export interface backendInterface {
    addClientActivity(clientId: string, activityType: ActivityType, description: string, metadata: string | null): Promise<{
        __kind__: "ok";
        ok: ClientActivity;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addClientComment(clientId: string, content: string, parentId: string | null): Promise<{
        __kind__: "ok";
        ok: ClientComment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addContact(clientId: string, contact: ContactPerson): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addPerformance(sessionToken: string, payload: CreatePerformancePayload): Promise<{
        __kind__: "ok";
        ok: Performance;
    } | {
        __kind__: "err";
        err: string;
    }>;
    captureWonLostReason(clientId: string, reason: string): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createAnnouncement(payload: {
        title: string;
        content: string;
        createdBy: string;
    }): Promise<{
        __kind__: "ok";
        ok: Announcement;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createClient(req: CreateClientRequest): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createIntern(sessionToken: string, payload: CreateInternPayload): Promise<{
        __kind__: "ok";
        ok: Intern;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createInvoice(clientId: string, lineItems: Array<InvoiceLineItem>, tax: number, notes: string | null): Promise<{
        __kind__: "ok";
        ok: Invoice;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createNotification(payload: {
        title: string;
        userId: string;
        notificationType: NotificationType;
        message: string;
        relatedId?: string;
    }): Promise<{
        __kind__: "ok";
        ok: Notification;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteAnnouncement(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteClient(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteClientComment(commentId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteIntern(sessionToken: string, id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deletePerformance(sessionToken: string, id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getActivities(internId: string | null): Promise<Array<Activity>>;
    getAnalyticsDashboard(): Promise<AnalyticsData>;
    getCRMFunnelData(): Promise<Array<[string, bigint]>>;
    getClient(id: string): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getClientActivities(clientId: string): Promise<Array<ClientActivity>>;
    getClientAnalytics(): Promise<ClientAnalytics>;
    getClientComments(clientId: string): Promise<Array<ClientComment>>;
    getClientInvoices(clientId: string): Promise<Array<Invoice>>;
    getDashboardStats(): Promise<DashboardStats>;
    getDealCycleTime(): Promise<bigint>;
    getIntern(id: string): Promise<Intern | null>;
    getLostDealAnalysis(): Promise<Array<[string, bigint, bigint]>>;
    getStageHistory(internId: string): Promise<Array<InternPipelineStageHistory>>;
    getWinRateByMember(): Promise<Array<[string, bigint, bigint]>>;
    initSampleData(): Promise<bigint>;
    listAnnouncements(activeOnly: boolean): Promise<Array<Announcement>>;
    listClients(): Promise<Array<Client>>;
    listInterns(filter: ListInternsFilter): Promise<Array<Intern>>;
    listNotifications(userId: string): Promise<Array<Notification>>;
    listPerformances(internId: string): Promise<Array<Performance>>;
    logQuickActivity(clientId: string, activityType: string, notes: string): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    logWhatsApp(sessionToken: string, internId: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    login(username: string, password: string): Promise<{
        __kind__: "ok";
        ok: {
            displayName: string;
            sessionToken: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    logout(sessionToken: string): Promise<void>;
    markAllAsRead(userId: string): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markAsRead(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    pinClientComment(commentId: string, isPinned: boolean): Promise<{
        __kind__: "ok";
        ok: ClientComment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    removeContact(clientId: string, contactId: string): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    seedSampleData(): Promise<void>;
    updateClient(id: string, req: UpdateClientRequest): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateClientComment(commentId: string, content: string): Promise<{
        __kind__: "ok";
        ok: ClientComment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateClientStatus(id: string, status: ClientStatus, note: string): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateContact(clientId: string, contactId: string, contact: ContactPerson): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateDocumentState(sessionToken: string, internId: string, docType: string, action: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateIntern(sessionToken: string, id: string, payload: UpdateInternPayload): Promise<{
        __kind__: "ok";
        ok: Intern;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateInternExtendedProfile(sessionToken: string, internId: string, dob: string | null, gender: string | null, emergencyContact: string | null, college: string | null, department: string | null, degreeYear: string | null, domain: string | null, mentorAssigned: string | null, startDate: string | null, expectedEndDate: string | null, internshipType: string | null, stipendAmount: number | null, ppoCandidate: boolean, performanceTier: string | null, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: Intern;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateInternPipelineStage(sessionToken: string, internId: string, newStage: InternPipelineStage, notes: string): Promise<{
        __kind__: "ok";
        ok: Intern;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateInvoicePaymentStatus(invoiceId: string, status: PaymentStatus): Promise<{
        __kind__: "ok";
        ok: Invoice;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateInvoiceStatus(clientId: string, invoiceId: string, status: InvoicePaymentStatus, amountPaid: bigint | null): Promise<{
        __kind__: "ok";
        ok: Invoice;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePerformance(sessionToken: string, id: string, payload: UpdatePerformancePayload): Promise<{
        __kind__: "ok";
        ok: Performance;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProposalStatus(clientId: string, status: string, version: bigint): Promise<{
        __kind__: "ok";
        ok: Client;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateSession(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: {
            username: string;
            displayName: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
}
