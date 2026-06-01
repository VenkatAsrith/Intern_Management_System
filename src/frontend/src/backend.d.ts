import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ClientActivity {
    id: string;
    clientId: string;
    activityType: ActivityType;
    metadata?: string;
    description: string;
    adminName: string;
    timestamp: bigint;
}
export interface Meeting {
    id: string;
    title: string;
    joinLink?: string;
    createdAt: bigint;
    createdBy: string;
    meetingType: string;
    durationMinutes: bigint;
    participantIds: Array<string>;
    reminderSentAt?: bigint;
    scheduledAt: bigint;
}
export interface MonthlyAnalyticsEntry {
    month: string;
    approved: bigint;
    newLeads: bigint;
    rejected: bigint;
}
export interface DocumentVersion {
    id: string;
    generatedAt: bigint;
    generatedBy: string;
    approvalStatus: string;
    version: string;
    notes: string;
    docType: string;
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
export interface UserAccount {
    id: string;
    username: string;
    displayName: string;
    createdAt: bigint;
    role: Role;
    isActive: boolean;
    passwordHash: string;
    spaces: Array<string>;
}
export interface StatusHistoryEntry {
    status: ClientStatus;
    note: string;
    adminName: string;
    timestamp: bigint;
}
export interface ProjectParticipation {
    id: string;
    status: string;
    projectName: string;
    internId: string;
    role: string;
    completionPercent: bigint;
    deliverables: Array<string>;
    startDate: string;
    milestones: Array<ProjectMilestone>;
}
export interface AuditEvent {
    id: string;
    beforeState?: string;
    action: string;
    actorRole: string;
    resourceId: string;
    actorId: string;
    resourceType: string;
    timestamp: bigint;
    afterState?: string;
    ipAddress?: string;
}
export interface ClientAnalytics {
    rejectedLeads: bigint;
    totalClients: bigint;
    monthlyData: Array<MonthlyAnalyticsEntry>;
    activeLeads: bigint;
    approvedDeals: bigint;
    revenuePipeline: number;
}
export interface ApprovalRequest {
    id: string;
    status: ApprovalStatus;
    resourceId: string;
    approverId?: string;
    createdAt: bigint;
    actionType: string;
    requestPayload: string;
    resourceType: string;
    notes?: string;
    requesterRole: string;
    requesterId: string;
    resolvedAt?: bigint;
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
export interface DailyNote {
    id: string;
    workedOn: string;
    adminComments: Array<NoteComment>;
    blockers: string;
    internId: string;
    date: string;
    createdAt: bigint;
    progress: string;
    learningUpdates: string;
}
export interface DashboardSnapshot {
    totalRevenueYTD: number;
    closedDealsThisMonth: bigint;
    slaBreaachRatePerStage: Array<[string, number]>;
    pipelineVelocity: Array<[string, number]>;
    revenueForecast: number;
    activeDealsCount: bigint;
    updatedAt: bigint;
    winRateByRep: Array<[string, number]>;
    followUpComplianceRate: Array<[string, number]>;
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
export interface CreateTaskPayload {
    title: string;
    tags: Array<string>;
    description: string;
    deadline?: bigint;
    assignedInternId: string;
    teamSpace: string;
    priority: string;
}
export interface Channel {
    id: string;
    name: string;
    createdAt: bigint;
    createdBy: string;
    spaceId: string;
    memberIds: Array<string>;
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
export interface NotificationPreference {
    userId: string;
    digestFrequency: Variant_hourly_immediate_daily;
    digestEnabled: boolean;
    eventType: string;
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
export interface Notification {
    id: string;
    title: string;
    userId: string;
    notificationType: NotificationType;
    createdAt: bigint;
    isRead: boolean;
    message: string;
    priority?: NotificationPriority;
    relatedId?: string;
}
export interface ProjectMilestone {
    id: string;
    status: string;
    completedAt?: bigint;
    name: string;
}
export interface InvoiceLineItem {
    rate: number;
    description: string;
    quantity: number;
    amount: number;
}
export interface UpdateTaskPayload {
    status?: string;
    title?: string;
    tags?: Array<string>;
    description?: string;
    deadline?: bigint;
    assignedInternId?: string;
    teamSpace?: string;
    priority?: string;
}
export interface DocumentRecord {
    internId: string;
    fileName: string;
    isArchived: boolean;
    currentVersion: string;
    category: string;
    versions: Array<DocumentVersion>;
    docType: string;
    docId: string;
}
export interface CompositePerformanceScore {
    learningScore: bigint;
    improvementSuggestions: Array<string>;
    overallScore: bigint;
    internId: string;
    productivityScore: bigint;
    computedAt: bigint;
    attendanceScore: bigint;
    communicationScore: bigint;
}
export interface WorkSubmission {
    id: string;
    status: string;
    title: string;
    githubLink?: string;
    internId: string;
    createdAt: bigint;
    description: string;
    fileUrls: Array<string>;
    reviewedAt?: bigint;
    reviewedBy?: string;
    driveLink?: string;
    taskId?: string;
    adminFeedback?: string;
}
export interface Task {
    id: string;
    status: string;
    title: string;
    createdAt: bigint;
    createdBy: string;
    tags: Array<string>;
    description: string;
    deadline?: bigint;
    updatedAt: bigint;
    assignedInternId: string;
    teamSpace: string;
    priority: string;
}
export interface ListInternsFilter {
    status?: Status;
    space?: Space;
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
export interface CreateSubmissionPayload {
    title: string;
    githubLink?: string;
    internId: string;
    description: string;
    fileUrls: Array<string>;
    driveLink?: string;
    taskId?: string;
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
    expiresAt?: bigint;
    createdAt: bigint;
    createdBy: string;
    isActive: boolean;
    targetSpaces?: Array<string>;
}
export interface Client {
    id: string;
    dealProbability: bigint;
    isStale?: boolean;
    contacts: Array<ContactPerson>;
    source: string;
    serviceInterested: string;
    pipelineValue?: number;
    gstNumber?: string;
    stageEnteredAt?: bigint;
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
    slaBreachedAt?: bigint;
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
    slaStatus?: SlaStatus;
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
export interface DirectMessage {
    id: string;
    content: string;
    createdAt: bigint;
    isRead: boolean;
    toUserId: string;
    fromUserId: string;
}
export interface ChannelMessage {
    id: string;
    content: string;
    channelId: string;
    createdAt: bigint;
    senderName: string;
    mentions: Array<string>;
    senderId: string;
}
export interface TimelineMilestone {
    id: string;
    completedAt?: bigint;
    title: string;
    internId: string;
    createdAt: bigint;
    description?: string;
    milestoneType: string;
}
export interface WorkflowExecution {
    id: string;
    ruleName: string;
    status: Variant_success_failed_running;
    errorMessage?: string;
    recordsProcessed: bigint;
    triggeredAt: bigint;
}
export interface CreateMeetingPayload {
    title: string;
    joinLink?: string;
    meetingType: string;
    durationMinutes: bigint;
    participantIds: Array<string>;
    scheduledAt: bigint;
}
export interface RepScorecard {
    totalDealValueClosed: number;
    username: string;
    displayName: string;
    userId: string;
    closedDealsCount: bigint;
    avgDealCycleTime: number;
    winRate: number;
    activityCount: bigint;
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
export interface NoteComment {
    id: string;
    status: string;
    content: string;
    authorId: string;
    createdAt: bigint;
    authorName: string;
}
export interface CreateDailyNotePayload {
    workedOn: string;
    blockers: string;
    internId: string;
    date: string;
    progress: string;
    learningUpdates: string;
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
export interface WorkspaceData {
    tasks: Array<Task>;
    meetings: Array<Meeting>;
    submissions: Array<WorkSubmission>;
    notes: Array<DailyNote>;
    channelMessages: Array<ChannelMessage>;
    directMessages: Array<DirectMessage>;
    milestones: Array<TimelineMilestone>;
}
export interface Activity {
    id: string;
    action: string;
    internId: string;
    performedBy: string;
    timestamp: bigint;
    details: string;
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
export interface InternPipelineStageHistory {
    changedAt: bigint;
    changedBy: string;
    stage: InternPipelineStage;
    notes: string;
}
export interface AnalyticsData {
    weightedForecast: bigint;
    conversionRates: Array<[string, bigint]>;
    totalPipeline: bigint;
    avgDealCycleDays: bigint;
    winRate: bigint;
    wonLostBreakdown: Array<[string, bigint]>;
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
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
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
export enum NotificationPriority {
    low = "low",
    high = "high",
    critical = "critical",
    medium = "medium"
}
export enum NotificationType {
    taskAssigned = "taskAssigned",
    proposalExpiring = "proposalExpiring",
    invoiceDue = "invoiceDue",
    attendanceAnomaly = "attendanceAnomaly",
    announcementPosted = "announcementPosted",
    dealSLABreached = "dealSLABreached",
    internDocumentSent = "internDocumentSent",
    taskOverdue = "taskOverdue",
    announcement = "announcement",
    newClientAssigned = "newClientAssigned",
    invoiceOverdue = "invoiceOverdue",
    leaveApproved = "leaveApproved",
    approvalRequestCreated = "approvalRequestCreated",
    leaveRejected = "leaveRejected",
    healthScoreLow = "healthScoreLow",
    followUpOverdue = "followUpOverdue",
    stageChanged = "stageChanged",
    proposalExpiringUrgent = "proposalExpiringUrgent",
    overdueFollowUp = "overdueFollowUp",
    dealClosedWon = "dealClosedWon",
    staleDeal = "staleDeal"
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
export enum Role {
    hr = "hr",
    manager = "manager",
    admin = "admin",
    finance = "finance",
    marketing = "marketing",
    sales = "sales",
    superAdmin = "superAdmin",
    operations = "operations",
    viewer = "viewer"
}
export enum SlaStatus {
    notBreached = "notBreached",
    breached = "breached"
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
export enum Variant_hourly_immediate_daily {
    hourly = "hourly",
    immediate = "immediate",
    daily = "daily"
}
export enum Variant_success_failed_running {
    success = "success",
    failed = "failed",
    running = "running"
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
    addDocumentVersion(sessionToken: string, docId: string, versionLabel: string, notes: string): Promise<{
        __kind__: "ok";
        ok: DocumentRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addNoteComment(sessionToken: string, noteId: string, content: string, status: string): Promise<{
        __kind__: "ok";
        ok: DailyNote;
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
    addProjectMilestone(sessionToken: string, internId: string, projId: string, milestoneName: string): Promise<{
        __kind__: "ok";
        ok: ProjectParticipation;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addTimelineMilestone(sessionToken: string, internId: string, title: string, description: string | null, milestoneType: string): Promise<{
        __kind__: "ok";
        ok: TimelineMilestone;
    } | {
        __kind__: "err";
        err: string;
    }>;
    approveRequest(sessionToken: string, requestId: string, notes: string | null): Promise<{
        __kind__: "ok";
        ok: ApprovalRequest;
    } | {
        __kind__: "err";
        err: string;
    }>;
    archiveDocument(sessionToken: string, docId: string): Promise<{
        __kind__: "ok";
        ok: boolean;
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
    computeCompositeScore(sessionToken: string, internId: string): Promise<{
        __kind__: "ok";
        ok: CompositePerformanceScore;
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
    createAnnouncementV2(sessionToken: string, title: string, body: string, targetSpaces: Array<string>, expiresAt: bigint | null): Promise<{
        __kind__: "ok";
        ok: Announcement;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createApprovalRequest(sessionToken: string, actionType: string, resourceType: string, resourceId: string, payload: string): Promise<{
        __kind__: "ok";
        ok: ApprovalRequest;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createChannel(sessionToken: string, name: string, spaceId: string, memberIds: Array<string>): Promise<{
        __kind__: "ok";
        ok: Channel;
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
    createDailyNote(sessionToken: string, payload: CreateDailyNotePayload): Promise<{
        __kind__: "ok";
        ok: DailyNote;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createDocumentRecord(sessionToken: string, internId: string, category: string, docType: string, fileName: string, versionLabel: string, notes: string): Promise<{
        __kind__: "ok";
        ok: DocumentRecord;
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
    createInternAudited(sessionToken: string, payload: CreateInternPayload): Promise<{
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
        priority: NotificationPriority;
        relatedId?: string;
    }): Promise<{
        __kind__: "ok";
        ok: Notification;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createProjectParticipation(sessionToken: string, internId: string, projectName: string, role: string, startDate: string, deliverables: Array<string>): Promise<{
        __kind__: "ok";
        ok: ProjectParticipation;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createSubmission(sessionToken: string, payload: CreateSubmissionPayload): Promise<{
        __kind__: "ok";
        ok: WorkSubmission;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createTask(sessionToken: string, payload: CreateTaskPayload): Promise<{
        __kind__: "ok";
        ok: Task;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createUser(sessionToken: string, username: string, password: string, roleText: string, spaces: Array<string>, displayName: string): Promise<{
        __kind__: "ok";
        ok: UserAccount;
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
    deleteAnnouncementById(sessionToken: string, announcementId: string): Promise<{
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
    deleteClientWithAudit(sessionToken: string, id: string): Promise<{
        __kind__: "ok";
        ok: {
            deleted: boolean;
            approvalId?: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteDocument(sessionToken: string, docId: string): Promise<{
        __kind__: "ok";
        ok: boolean;
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
    deleteInternWithAudit(sessionToken: string, id: string): Promise<{
        __kind__: "ok";
        ok: {
            deleted: boolean;
            approvalId?: string;
        };
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
    deleteTask(sessionToken: string, id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteUser(sessionToken: string, userId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getActivities(internId: string | null): Promise<Array<Activity>>;
    getAllTasks(sessionToken: string): Promise<Array<Task>>;
    getAnalyticsDashboard(): Promise<AnalyticsData>;
    getAnnouncementsBySpace(sessionToken: string, space: string | null): Promise<{
        __kind__: "ok";
        ok: Array<Announcement>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAuditLog(sessionToken: string, limit: bigint, offset: bigint): Promise<{
        __kind__: "ok";
        ok: Array<AuditEvent>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCRMFunnelData(): Promise<Array<[string, bigint]>>;
    getChannelMessages(sessionToken: string, channelId: string): Promise<{
        __kind__: "ok";
        ok: Array<ChannelMessage>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getChannelsForUser(sessionToken: string): Promise<Array<Channel>>;
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
    getCompositeScore(internId: string): Promise<CompositePerformanceScore | null>;
    getDailyNotesByIntern(sessionToken: string, internId: string): Promise<Array<DailyNote>>;
    getDashboardSnapshot(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: DashboardSnapshot;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDashboardStats(): Promise<DashboardStats>;
    getDealCycleTime(): Promise<bigint>;
    getDirectMessages(sessionToken: string, peerId: string): Promise<{
        __kind__: "ok";
        ok: Array<DirectMessage>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDocumentById(sessionToken: string, docId: string): Promise<DocumentRecord | null>;
    getDocumentVersionHistory(sessionToken: string, docId: string): Promise<{
        __kind__: "ok";
        ok: Array<DocumentVersion>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDocumentsByIntern(sessionToken: string, internId: string): Promise<Array<DocumentRecord>>;
    getFollowUpComplianceRate(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: Array<[string, number]>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getIntern(id: string): Promise<Intern | null>;
    getLostDealAnalysis(): Promise<Array<[string, bigint, bigint]>>;
    getMeetingsForIntern(sessionToken: string, internId: string): Promise<Array<Meeting>>;
    getMeetingsForUser(sessionToken: string): Promise<Array<Meeting>>;
    getNotificationPreferences(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: Array<NotificationPreference>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getNotificationsByPriority(sessionToken: string, priority: string): Promise<{
        __kind__: "ok";
        ok: Array<Notification>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPipelineVelocity(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: Array<[string, number]>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getProjectsByIntern(sessionToken: string, internId: string): Promise<Array<ProjectParticipation>>;
    getRepScorecards(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: Array<RepScorecard>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getSLABreachRatePerStage(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: Array<[string, number]>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getSLARules(): Promise<Array<[string, bigint]>>;
    getStageHistory(internId: string): Promise<Array<InternPipelineStageHistory>>;
    getSubmissionsByIntern(sessionToken: string, internId: string): Promise<Array<WorkSubmission>>;
    getTasksByIntern(sessionToken: string, internId: string): Promise<Array<Task>>;
    getTasksBySpace(sessionToken: string, spaceId: string): Promise<Array<Task>>;
    getTimelineForIntern(sessionToken: string, internId: string): Promise<Array<TimelineMilestone>>;
    getUserById(sessionToken: string, userId: string): Promise<{
        __kind__: "ok";
        ok: UserAccount;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getWinRateByMember(): Promise<Array<[string, bigint, bigint]>>;
    getWorkspaceData(sessionToken: string, internId: string): Promise<{
        __kind__: "ok";
        ok: WorkspaceData;
    } | {
        __kind__: "err";
        err: string;
    }>;
    initSampleData(): Promise<bigint>;
    listAnnouncements(activeOnly: boolean): Promise<Array<Announcement>>;
    listApprovalRequests(sessionToken: string, statusFilter: string | null): Promise<{
        __kind__: "ok";
        ok: Array<ApprovalRequest>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listClients(): Promise<Array<Client>>;
    listInterns(filter: ListInternsFilter): Promise<Array<Intern>>;
    listNotifications(userId: string): Promise<Array<Notification>>;
    listPerformances(internId: string): Promise<Array<Performance>>;
    listUsers(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: Array<UserAccount>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listWorkflowExecutions(ruleName: string | null, limit: bigint): Promise<Array<WorkflowExecution>>;
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
            permissions: Array<string>;
            displayName: string;
            role: string;
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
    markDirectMessageRead(sessionToken: string, dmId: string): Promise<{
        __kind__: "ok";
        ok: boolean;
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
    rejectRequest(sessionToken: string, requestId: string, notes: string | null): Promise<{
        __kind__: "ok";
        ok: ApprovalRequest;
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
    runAllAutomationJobs(): Promise<void>;
    runAutomationJobs(sessionToken: string): Promise<void>;
    scheduleMeeting(sessionToken: string, payload: CreateMeetingPayload): Promise<{
        __kind__: "ok";
        ok: Meeting;
    } | {
        __kind__: "err";
        err: string;
    }>;
    seedSampleData(): Promise<void>;
    sendChannelMessage(sessionToken: string, channelId: string, content: string, mentions: Array<string>): Promise<{
        __kind__: "ok";
        ok: ChannelMessage;
    } | {
        __kind__: "err";
        err: string;
    }>;
    sendDirectMessage(sessionToken: string, toUserId: string, content: string): Promise<{
        __kind__: "ok";
        ok: DirectMessage;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setNotificationPreference(sessionToken: string, eventType: string, digestEnabled: boolean, digestFrequency: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setSLARule(stageName: string, maxHours: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
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
    updateDocumentApproval(sessionToken: string, docId: string, versionLabel: string, approvalStatus: string): Promise<{
        __kind__: "ok";
        ok: DocumentRecord;
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
    updateInternAudited(sessionToken: string, id: string, payload: UpdateInternPayload): Promise<{
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
    updateMilestone(sessionToken: string, internId: string, projId: string, milestoneId: string, status: string): Promise<{
        __kind__: "ok";
        ok: ProjectParticipation;
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
    updateProjectParticipation(sessionToken: string, internId: string, projId: string, status: string | null, completionPercent: bigint | null, deliverables: Array<string> | null): Promise<{
        __kind__: "ok";
        ok: ProjectParticipation;
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
    updateSubmissionStatus(sessionToken: string, id: string, status: string, feedback: string | null): Promise<{
        __kind__: "ok";
        ok: WorkSubmission;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateTask(sessionToken: string, id: string, payload: UpdateTaskPayload): Promise<{
        __kind__: "ok";
        ok: Task;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateUser(sessionToken: string, userId: string, roleText: string, spaces: Array<string>, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: UserAccount;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateSession(sessionToken: string): Promise<{
        __kind__: "ok";
        ok: {
            permissions: Array<string>;
            username: string;
            displayName: string;
            role: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
}
