import type { backendInterface } from "../backend";
import {
  ActivityType,
  ApprovalStatus,
  ClientStatus,
  ExperienceLevel,
  InternPipelineStage,
  InvoicePaymentStatus,
  NotificationPriority,
  NotificationType,
  PaymentStatus,
  PriorityLevel,
  Role,
  SlaStatus,
  Space,
  Status,
  Variant_hourly_immediate_daily,
  Variant_success_failed_running,
} from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleIntern = {
  id: "intern-001",
  name: "Riya Sharma",
  email: "riya@techmecha.com",
  phone: "+91 9876543210",
  space: Space.Marketing,
  status: Status.Active,
  experienceLevel: ExperienceLevel.Junior,
  department: "Marketing",
  pipelineStage: InternPipelineStage.active,
  joiningDate: now - BigInt(30) * BigInt(86400_000_000_000),
  createdAt: now - BigInt(30) * BigInt(86400_000_000_000),
  updatedAt: now,
  isActive: true,
  offerLetterSent: true,
  completionLetterSent: false,
  certificateSent: false,
  offerLetterOpened: true,
  completionLetterOpened: false,
  certificateOpened: false,
  ppoCandidate: false,
  adminNotes: "Good progress on CRM dashboard UI",
};

const sampleClient = {
  id: "client-001",
  companyName: "Acme Corp",
  contactPersonName: "John Doe",
  email: "john@acme.com",
  phone: "+91 9123456789",
  whatsappNumber: "+91 9123456789",
  website: "https://acme.com",
  location: "Bangalore",
  industryType: "Technology",
  companySize: "50-200",
  designation: "CTO",
  dealValue: 250000,
  leadSource: "Referral",
  priorityLevel: PriorityLevel.high,
  source: "Inbound",
  serviceInterested: "CRM Development",
  currentStatus: ClientStatus.proposalSent,
  leadScore: BigInt(72),
  healthScore: BigInt(68),
  engagementScore: BigInt(80),
  dealProbability: BigInt(60),
  pipelineValue: 250000,
  proposalVersion: BigInt(1),
  activityCount: BigInt(5),
  tags: ["enterprise", "high-value"],
  contacts: [],
  statusHistory: [],
  customFields: [],
  createdAt: now - BigInt(15) * BigInt(86400_000_000_000),
  createdBy: "admin",
  updatedAt: now,
  slaStatus: SlaStatus.notBreached,
  assignedTeamMember: "venkat",
  isStale: false,
};

const sampleTask: {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  teamSpace: string;
  tags: string[];
  assignedInternId: string;
  createdBy: string;
  createdAt: bigint;
  updatedAt: bigint;
} = {
  id: "task-001",
  title: "Build CRM Dashboard UI",
  description: "Create the main CRM analytics dashboard with Recharts",
  priority: "high",
  status: "in_progress",
  teamSpace: "Marketing",
  tags: ["frontend", "react", "crm"],
  assignedInternId: "intern-001",
  createdBy: "admin",
  createdAt: now - BigInt(2) * BigInt(86400_000_000_000),
  updatedAt: now,
};

const sampleTask2 = {
  ...sampleTask,
  id: "task-002",
  title: "Write unit tests for API layer",
  status: "pending",
  priority: "medium",
  tags: ["testing", "backend"],
};

const sampleTask3 = {
  ...sampleTask,
  id: "task-003",
  title: "Design onboarding flow",
  status: "under_review",
  priority: "high",
  tags: ["design", "ux"],
};

const sampleTask4 = {
  ...sampleTask,
  id: "task-004",
  title: "Fix sidebar routing bug",
  status: "completed",
  priority: "low",
  tags: ["bugfix"],
};

const sampleTask5 = {
  ...sampleTask,
  id: "task-005",
  title: "Implement notification bell",
  status: "rejected",
  priority: "medium",
  tags: ["ui", "notifications"],
};

const sampleTask6 = {
  ...sampleTask,
  id: "task-006",
  title: "Update API documentation",
  status: "rework_needed",
  priority: "low",
  tags: ["docs"],
};

const sampleChannel = {
  id: "channel-001",
  name: "marketing-general",
  spaceId: "Marketing",
  memberIds: ["user-001", "user-002"],
  createdBy: "admin",
  createdAt: now - BigInt(10) * BigInt(86400_000_000_000),
};

const sampleNote = {
  id: "note-001",
  internId: "intern-001",
  date: "2026-05-28",
  workedOn: "Completed the CRM dashboard UI and integrated sidebar routing. Fixed responsiveness issues on mobile.",
  blockers: "Waiting for backend API to expose the analytics endpoint.",
  progress: "80% complete on the frontend components.",
  learningUpdates: "Learned advanced Recharts patterns and custom tooltips.",
  createdAt: now - BigInt(86400_000_000_000),
  adminComments: [
    {
      id: "comment-001",
      authorId: "admin",
      authorName: "Venkat Asrith",
      content: "Great work! Keep the progress going.",
      status: "approved",
      createdAt: now - BigInt(3600_000_000_000),
    },
  ],
};

const sampleMilestone = {
  id: "milestone-001",
  internId: "intern-001",
  title: "Onboarding Completed",
  description: "Completed initial onboarding and orientation",
  milestoneType: "onboarding",
  completedAt: now - BigInt(25) * BigInt(86400_000_000_000),
  createdAt: now - BigInt(25) * BigInt(86400_000_000_000),
};

const sampleMilestone2 = {
  id: "milestone-002",
  internId: "intern-001",
  title: "First Task Completed",
  description: "Delivered first assignment successfully",
  milestoneType: "achievement",
  completedAt: now - BigInt(10) * BigInt(86400_000_000_000),
  createdAt: now - BigInt(10) * BigInt(86400_000_000_000),
};

const sampleMilestone3 = {
  id: "milestone-003",
  internId: "intern-001",
  title: "Mid-Internship Review",
  description: "Performance evaluation scheduled",
  milestoneType: "review",
  createdAt: now,
};

const sampleSubmission = {
  id: "submission-001",
  internId: "intern-001",
  title: "CRM Dashboard Implementation",
  description: "Complete frontend implementation with all components",
  githubLink: "https://github.com/example/crm-dashboard",
  driveLink: undefined,
  fileUrls: [],
  status: "pending_review",
  taskId: "task-001",
  createdAt: now - BigInt(86400_000_000_000),
};

const sampleSubmission2 = {
  ...sampleSubmission,
  id: "submission-002",
  title: "Unit Test Suite",
  status: "approved",
  githubLink: "https://github.com/example/unit-tests",
  taskId: "task-002",
};

const sampleMeeting = {
  id: "meeting-001",
  title: "Weekly Standup",
  meetingType: "standup",
  participantIds: ["intern-001", "admin"],
  scheduledAt: now + BigInt(2) * BigInt(86400_000_000_000),
  durationMinutes: BigInt(30),
  joinLink: "https://meet.google.com/abc-defg-hij",
  createdBy: "admin",
  createdAt: now - BigInt(86400_000_000_000),
};

const sampleMeeting2 = {
  ...sampleMeeting,
  id: "meeting-002",
  title: "Mentor Review Session",
  meetingType: "review",
  scheduledAt: now + BigInt(5) * BigInt(86400_000_000_000),
  durationMinutes: BigInt(60),
};

const sampleChannelMessage = {
  id: "msg-001",
  channelId: "channel-001",
  senderId: "user-001",
  senderName: "Venkat Asrith",
  content: "Hey team, the CRM build is looking great! 🎉",
  mentions: [],
  createdAt: now - BigInt(3600_000_000_000),
};

const sampleChannelMessage2 = {
  id: "msg-002",
  channelId: "channel-001",
  senderId: "intern-001",
  senderName: "Riya Sharma",
  content: "Thanks @venkat! Working on the analytics charts now.",
  mentions: ["venkat"],
  createdAt: now - BigInt(1800_000_000_000),
};

const sampleDirectMessage = {
  id: "dm-001",
  fromUserId: "admin",
  toUserId: "intern-001",
  content: "Great progress on the dashboard. See you in tomorrow's standup.",
  isRead: true,
  createdAt: now - BigInt(7200_000_000_000),
};

const sampleAnnouncement = {
  id: "ann-001",
  title: "Bootcamp Schedule Updated",
  content: "The React bootcamp has been rescheduled to this Friday at 3 PM. Please update your calendars.",
  createdBy: "Venkat Asrith",
  isActive: true,
  targetSpaces: ["Marketing", "Learning"],
  createdAt: now - BigInt(86400_000_000_000),
};

const sampleNotification = {
  id: "notif-001",
  userId: "intern-001",
  title: "Task Assigned",
  message: "You have been assigned: Build CRM Dashboard UI",
  notificationType: NotificationType.taskAssigned,
  priority: NotificationPriority.high,
  isRead: false,
  createdAt: now - BigInt(3600_000_000_000),
};

const sampleUser = {
  id: "user-001",
  username: "venkat",
  displayName: "Venkat Asrith",
  role: Role.superAdmin,
  spaces: ["Org", "Marketing", "Learning"],
  isActive: true,
  passwordHash: "",
  createdAt: now - BigInt(60) * BigInt(86400_000_000_000),
};

const sampleUser2 = {
  ...sampleUser,
  id: "user-002",
  username: "jaychandra",
  displayName: "Jay Chandra",
  role: Role.admin,
};

const sampleApproval = {
  id: "approval-001",
  requesterId: "user-002",
  requesterRole: "admin",
  actionType: "DELETE_INTERN",
  resourceType: "intern",
  resourceId: "intern-002",
  requestPayload: "{}",
  status: ApprovalStatus.pending,
  createdAt: now - BigInt(86400_000_000_000),
};

const sampleAuditEvent = {
  id: "audit-001",
  actorId: "user-001",
  actorRole: "superAdmin",
  action: "CREATE",
  resourceType: "intern",
  resourceId: "intern-001",
  timestamp: now - BigInt(30) * BigInt(86400_000_000_000),
  afterState: '{"name":"Riya Sharma"}',
};

const sampleWorkflowExecution = {
  id: "wf-001",
  ruleName: "overdue_followup_escalation",
  status: Variant_success_failed_running.success,
  recordsProcessed: BigInt(3),
  triggeredAt: now - BigInt(3600_000_000_000),
};

const samplePerformance = {
  id: "perf-001",
  internId: "intern-001",
  month: BigInt(5),
  year: BigInt(2026),
  overallScore: 82,
  taskScore: 85,
  communicationScore: 78,
  attendanceScore: 90,
  initiativeScore: 75,
  adminNotes: "Consistently delivering quality work",
  createdAt: now - BigInt(5) * BigInt(86400_000_000_000),
};

const sampleInvoice = {
  id: "invoice-001",
  clientId: "client-001",
  invoiceNumber: "INV-2026-001",
  status: InvoicePaymentStatus.sent,
  paymentStatus: PaymentStatus.pending,
  lineItems: [
    { description: "CRM Development - Month 1", quantity: 1, rate: 150000, amount: 150000 },
    { description: "UI/UX Design", quantity: 1, rate: 50000, amount: 50000 },
  ],
  subtotal: 200000,
  tax: 18,
  total: 236000,
  amountPaid: BigInt(0),
  createdBy: "admin",
  createdAt: now - BigInt(7) * BigInt(86400_000_000_000),
};

const sampleRepScorecard = {
  userId: "user-001",
  username: "venkat",
  displayName: "Venkat Asrith",
  closedDealsCount: BigInt(5),
  winRate: 71.4,
  totalDealValueClosed: 1250000,
  avgDealCycleTime: 28.5,
  activityCount: BigInt(42),
};

const workspaceData = {
  tasks: [sampleTask, sampleTask2, sampleTask3, sampleTask4, sampleTask5, sampleTask6],
  meetings: [sampleMeeting, sampleMeeting2],
  submissions: [sampleSubmission, sampleSubmission2],
  notes: [sampleNote],
  channelMessages: [sampleChannelMessage, sampleChannelMessage2],
  directMessages: [sampleDirectMessage],
  milestones: [sampleMilestone, sampleMilestone2, sampleMilestone3],
};

export const mockBackend: backendInterface = {
  addClientActivity: async () => ({ __kind__: "ok", ok: { id: "act-1", clientId: "client-001", activityType: ActivityType.noteAdded, description: "Activity logged", adminName: "Admin", timestamp: now } }),
  addClientComment: async () => ({ __kind__: "ok", ok: { id: "comment-1", clientId: "client-001", content: "Comment", authorName: "Admin", timestamp: now, isPinned: false } }),
  addContact: async () => ({ __kind__: "ok", ok: sampleClient }),
  addNoteComment: async () => ({ __kind__: "ok", ok: sampleNote }),
  addPerformance: async () => ({ __kind__: "ok", ok: samplePerformance }),
  addTimelineMilestone: async () => ({ __kind__: "ok", ok: sampleMilestone }),
  approveRequest: async () => ({ __kind__: "ok", ok: { ...sampleApproval, status: ApprovalStatus.approved } }),
  captureWonLostReason: async () => ({ __kind__: "ok", ok: sampleClient }),
  createAnnouncement: async () => ({ __kind__: "ok", ok: sampleAnnouncement }),
  createAnnouncementV2: async () => ({ __kind__: "ok", ok: sampleAnnouncement }),
  createApprovalRequest: async () => ({ __kind__: "ok", ok: sampleApproval }),
  createChannel: async () => ({ __kind__: "ok", ok: sampleChannel }),
  createClient: async () => ({ __kind__: "ok", ok: sampleClient }),
  createDailyNote: async () => ({ __kind__: "ok", ok: sampleNote }),
  createIntern: async () => ({ __kind__: "ok", ok: sampleIntern }),
  createInternAudited: async () => ({ __kind__: "ok", ok: sampleIntern }),
  createInvoice: async () => ({ __kind__: "ok", ok: sampleInvoice }),
  createNotification: async () => ({ __kind__: "ok", ok: sampleNotification }),
  createSubmission: async () => ({ __kind__: "ok", ok: sampleSubmission }),
  createTask: async () => ({ __kind__: "ok", ok: sampleTask }),
  createUser: async () => ({ __kind__: "ok", ok: sampleUser }),
  deleteAnnouncement: async () => ({ __kind__: "ok", ok: null }),
  deleteAnnouncementById: async () => ({ __kind__: "ok", ok: null }),
  deleteClient: async () => ({ __kind__: "ok", ok: null }),
  deleteClientComment: async () => ({ __kind__: "ok", ok: null }),
  deleteClientWithAudit: async () => ({ __kind__: "ok", ok: { deleted: true } }),
  deleteIntern: async () => ({ __kind__: "ok", ok: true }),
  deleteInternWithAudit: async () => ({ __kind__: "ok", ok: { deleted: true } }),
  deletePerformance: async () => ({ __kind__: "ok", ok: true }),
  deleteTask: async () => ({ __kind__: "ok", ok: true }),
  deleteUser: async () => ({ __kind__: "ok", ok: null }),
  getActivities: async () => [{ id: "activity-001", internId: "intern-001", action: "Intern profile created", performedBy: "Admin", timestamp: now, details: "Created from onboarding form" }],
  getAllTasks: async () => [sampleTask, sampleTask2, sampleTask3, sampleTask4, sampleTask5, sampleTask6],
  getAnalyticsDashboard: async () => ({ weightedForecast: BigInt(850000), conversionRates: [["Lead Captured", BigInt(30)], ["Proposal Sent", BigInt(60)], ["Closed Won", BigInt(72)]], totalPipeline: BigInt(2500000), avgDealCycleDays: BigInt(28), winRate: BigInt(71), wonLostBreakdown: [["won", BigInt(5)], ["lost", BigInt(2)]] }),
  getAnnouncementsBySpace: async () => ({ __kind__: "ok", ok: [sampleAnnouncement] }),
  getAuditLog: async () => ({ __kind__: "ok", ok: [sampleAuditEvent] }),
  getCRMFunnelData: async () => [["Lead Captured", BigInt(10)], ["Contacted", BigInt(7)], ["Discovery Call Done", BigInt(5)], ["Proposal Sent", BigInt(4)], ["Negotiation", BigInt(2)], ["Closed Won", BigInt(1)]],
  getChannelMessages: async () => ({ __kind__: "ok", ok: [sampleChannelMessage, sampleChannelMessage2] }),
  getChannelsForUser: async () => [sampleChannel, { ...sampleChannel, id: "channel-002", name: "marketing-campaigns", spaceId: "Marketing" }, { ...sampleChannel, id: "channel-003", name: "org-general", spaceId: "Org" }],
  getClient: async () => ({ __kind__: "ok", ok: sampleClient }),
  getClientActivities: async () => [{ id: "ca-001", clientId: "client-001", activityType: ActivityType.quickCall, description: "Initial discovery call completed", adminName: "Venkat Asrith", timestamp: now - BigInt(86400_000_000_000) }],
  getClientAnalytics: async () => ({ rejectedLeads: BigInt(2), totalClients: BigInt(15), monthlyData: [{ month: "May 2026", approved: BigInt(3), newLeads: BigInt(5), rejected: BigInt(1) }], activeLeads: BigInt(8), approvedDeals: BigInt(5), revenuePipeline: 2500000 }),
  getClientComments: async () => [{ id: "cc-001", clientId: "client-001", content: "Had a great call, very interested in proposal", authorName: "Venkat Asrith", timestamp: now - BigInt(86400_000_000_000), isPinned: false }],
  getClientInvoices: async () => [sampleInvoice],
  getDailyNotesByIntern: async () => [sampleNote],
  getDashboardSnapshot: async () => ({ __kind__: "ok", ok: { totalRevenueYTD: 1250000, closedDealsThisMonth: BigInt(2), slaBreaachRatePerStage: [["Proposal Sent", 0.15], ["Negotiation", 0.05]], pipelineVelocity: [["Lead Captured", 3.5], ["Contacted", 5.2], ["Discovery Call Done", 8.1], ["Proposal Sent", 12.3]], revenueForecast: 850000, activeDealsCount: BigInt(8), updatedAt: now, winRateByRep: [["Venkat", 0.714], ["Jay", 0.667]], followUpComplianceRate: [["Venkat", 0.88], ["Jay", 0.75]] } }),
  getDashboardStats: async () => ({ marketingCount: BigInt(3), documentsSentThisMonth: BigInt(5), orgCount: BigInt(2), totalInterns: BigInt(7), activeInterns: BigInt(5), learningCount: BigInt(2), avgPerformance: 78.5 }),
  getDealCycleTime: async () => BigInt(28),
  getDirectMessages: async () => ({ __kind__: "ok", ok: [sampleDirectMessage] }),
  getFollowUpComplianceRate: async () => ({ __kind__: "ok", ok: [["Venkat", 0.88], ["Jay", 0.75]] }),
  getIntern: async () => sampleIntern,
  getLostDealAnalysis: async () => [["Price too high", BigInt(2), BigInt(300000)], ["Went with competitor", BigInt(1), BigInt(150000)]],
  getMeetingsForIntern: async () => [sampleMeeting, sampleMeeting2],
  getMeetingsForUser: async () => [sampleMeeting, sampleMeeting2],
  getNotificationPreferences: async () => ({ __kind__: "ok", ok: [{ userId: "user-001", eventType: "taskAssigned", digestEnabled: false, digestFrequency: Variant_hourly_immediate_daily.immediate }] }),
  getNotificationsByPriority: async () => ({ __kind__: "ok", ok: [sampleNotification] }),
  getPipelineVelocity: async () => ({ __kind__: "ok", ok: [["Lead Captured", 3.5], ["Contacted", 5.2], ["Proposal Sent", 12.3]] }),
  getRepScorecards: async () => ({ __kind__: "ok", ok: [sampleRepScorecard] }),
  getSLABreachRatePerStage: async () => ({ __kind__: "ok", ok: [["Proposal Sent", 0.15], ["Negotiation", 0.05]] }),
  getSLARules: async () => [["leadCaptured", BigInt(48)], ["contacted", BigInt(72)], ["proposalSent", BigInt(168)]],
  getStageHistory: async () => [],
  getSubmissionsByIntern: async () => [sampleSubmission, sampleSubmission2],
  getTasksByIntern: async () => [sampleTask, sampleTask2, sampleTask3],
  getTasksBySpace: async () => [sampleTask, sampleTask2, sampleTask3, sampleTask4, sampleTask5, sampleTask6],
  getTimelineForIntern: async () => [sampleMilestone, sampleMilestone2, sampleMilestone3],
  getUserById: async () => ({ __kind__: "ok", ok: sampleUser }),
  getWinRateByMember: async () => [["Venkat", BigInt(5), BigInt(7)], ["Jay", BigInt(4), BigInt(6)]],
  getWorkspaceData: async () => ({ __kind__: "ok", ok: workspaceData }),
  initSampleData: async () => BigInt(0),
  listAnnouncements: async () => [sampleAnnouncement],
  listApprovalRequests: async () => ({ __kind__: "ok", ok: [sampleApproval] }),
  listClients: async () => [sampleClient, { ...sampleClient, id: "client-002", companyName: "Beta Solutions", contactPersonName: "Jane Smith", currentStatus: ClientStatus.contacted, dealValue: 120000, leadScore: BigInt(45), healthScore: BigInt(55) }, { ...sampleClient, id: "client-003", companyName: "Gamma Tech", contactPersonName: "Robert Lee", currentStatus: ClientStatus.negotiation, dealValue: 450000, leadScore: BigInt(88), healthScore: BigInt(82) }],
  listInterns: async () => [sampleIntern, { ...sampleIntern, id: "intern-002", name: "Arjun Kumar", space: Space.Org, department: "Operations", status: Status.Active }, { ...sampleIntern, id: "intern-003", name: "Priya Nair", space: Space.Learning, department: "Research", status: Status.Active }],
  listNotifications: async () => [sampleNotification, { ...sampleNotification, id: "notif-002", title: "Announcement", message: "Bootcamp schedule has been updated", notificationType: NotificationType.announcementPosted, priority: NotificationPriority.medium, isRead: true }],
  listPerformances: async () => [samplePerformance],
  listUsers: async () => ({ __kind__: "ok", ok: [sampleUser, sampleUser2] }),
  listWorkflowExecutions: async () => [sampleWorkflowExecution, { ...sampleWorkflowExecution, id: "wf-002", ruleName: "stale_deal_detection", status: Variant_success_failed_running.success, recordsProcessed: BigInt(1) }],
  logQuickActivity: async () => ({ __kind__: "ok", ok: sampleClient }),
  logWhatsApp: async () => ({ __kind__: "ok", ok: true }),
  login: async (username) => ({
    __kind__: "ok",
    ok: {
      sessionToken: "mock-session-token-12345",
      role: "superAdmin",
      displayName: username === "venkat" ? "Venkat Asrith" : "Jay Chandra",
      permissions: ["intern:read", "intern:write", "client:read", "client:write", "admin:all"],
    },
  }),
  logout: async () => undefined,
  markAllAsRead: async () => ({ __kind__: "ok", ok: BigInt(2) }),
  markAsRead: async () => ({ __kind__: "ok", ok: null }),
  markDirectMessageRead: async () => ({ __kind__: "ok", ok: true }),
  pinClientComment: async () => ({ __kind__: "ok", ok: { id: "cc-001", clientId: "client-001", content: "Pinned comment", authorName: "Admin", timestamp: now, isPinned: true } }),
  rejectRequest: async () => ({ __kind__: "ok", ok: { ...sampleApproval, status: ApprovalStatus.rejected } }),
  removeContact: async () => ({ __kind__: "ok", ok: sampleClient }),
  runAllAutomationJobs: async () => undefined,
  runAutomationJobs: async () => undefined,
  scheduleMeeting: async () => ({ __kind__: "ok", ok: sampleMeeting }),
  seedSampleData: async () => undefined,
  sendChannelMessage: async () => ({ __kind__: "ok", ok: sampleChannelMessage }),
  sendDirectMessage: async () => ({ __kind__: "ok", ok: sampleDirectMessage }),
  setNotificationPreference: async () => ({ __kind__: "ok", ok: null }),
  setSLARule: async () => ({ __kind__: "ok", ok: null }),
  updateClient: async () => ({ __kind__: "ok", ok: sampleClient }),
  updateClientComment: async () => ({ __kind__: "ok", ok: { id: "cc-001", clientId: "client-001", content: "Updated comment", authorName: "Admin", timestamp: now, isPinned: false } }),
  updateClientStatus: async () => ({ __kind__: "ok", ok: sampleClient }),
  updateContact: async () => ({ __kind__: "ok", ok: sampleClient }),
  updateDocumentState: async () => ({ __kind__: "ok", ok: true }),
  updateIntern: async () => ({ __kind__: "ok", ok: sampleIntern }),
  updateInternAudited: async () => ({ __kind__: "ok", ok: sampleIntern }),
  updateInternExtendedProfile: async () => ({ __kind__: "ok", ok: sampleIntern }),
  updateInternPipelineStage: async () => ({ __kind__: "ok", ok: sampleIntern }),
  updateInvoicePaymentStatus: async () => ({ __kind__: "ok", ok: sampleInvoice }),
  updateInvoiceStatus: async () => ({ __kind__: "ok", ok: sampleInvoice }),
  updatePerformance: async () => ({ __kind__: "ok", ok: samplePerformance }),
  updateProposalStatus: async () => ({ __kind__: "ok", ok: sampleClient }),
  updateSubmissionStatus: async () => ({ __kind__: "ok", ok: sampleSubmission }),
  updateTask: async () => ({ __kind__: "ok", ok: sampleTask }),
  updateUser: async () => ({ __kind__: "ok", ok: sampleUser }),
  validateSession: async () => ({
    __kind__: "ok",
    ok: {
      sessionToken: "mock-session-token-12345",
      role: "superAdmin",
      username: "venkat",
      displayName: "Venkat Asrith",
      permissions: ["intern:read", "intern:write", "client:read", "client:write", "admin:all"],
    },
  }),
  // V3.5 document management stubs
  getDocumentsByIntern: async () => [],
  addDocumentVersion: async () => ({ __kind__: "ok" as const, ok: { docId: "doc-001", internId: "intern-001", docType: "offer_letter", currentVersion: "1.0", fileName: "offer_letter_v1.pdf", category: "employment", isArchived: false, versions: [] } }),
  updateDocumentApproval: async () => ({ __kind__: "ok" as const, ok: { docId: "doc-001", internId: "intern-001", docType: "offer_letter", currentVersion: "1.0", fileName: "offer_letter_v1.pdf", category: "employment", isArchived: false, versions: [] } }),
  archiveDocument: async () => ({ __kind__: "ok" as const, ok: true }),
  deleteDocument: async () => ({ __kind__: "ok" as const, ok: true }),
  getDocumentVersionHistory: async () => ({ __kind__: "ok" as const, ok: [] }),
  getProjectsByIntern: async () => [],
  createProjectParticipation: async () => ({ __kind__: "ok" as const, ok: { id: "proj-001", internId: "intern-001", projectName: "CRM Dashboard", role: "Frontend Developer", startDate: "2026-05-01", status: "active", completionPercent: BigInt(60), milestones: [], deliverables: [] } }),
  addProjectMilestone: async () => ({ __kind__: "ok" as const, ok: { id: "proj-001", internId: "intern-001", projectName: "CRM Dashboard", role: "Frontend Developer", startDate: "2026-05-01", status: "active", completionPercent: BigInt(60), milestones: [], deliverables: [] } }),
  updateMilestone: async () => ({ __kind__: "ok" as const, ok: { id: "proj-001", internId: "intern-001", projectName: "CRM Dashboard", role: "Frontend Developer", startDate: "2026-05-01", status: "active", completionPercent: BigInt(60), milestones: [], deliverables: [] } }),
  computeCompositeScore: async () => ({ __kind__: "ok" as const, ok: { internId: "intern-001", overallScore: BigInt(82), productivityScore: BigInt(85), communicationScore: BigInt(78), learningScore: BigInt(80), attendanceScore: BigInt(90), improvementSuggestions: ["Increase task completion rate", "Participate more in standups"], computedAt: now } }),
  getCompositeScore: async () => null,
  createDocumentRecord: async () => ({ __kind__: "ok" as const, ok: { docId: "doc-001", internId: "intern-001", docType: "offer_letter", currentVersion: "1.0", fileName: "offer_letter_v1.pdf", category: "employment", isArchived: false, versions: [] } }),
  updateProjectParticipation: async () => ({ __kind__: "ok" as const, ok: { id: "proj-001", internId: "intern-001", projectName: "CRM Dashboard", role: "Frontend Developer", startDate: "2026-05-01", status: "active", completionPercent: BigInt(60), milestones: [], deliverables: [] } }),
  getDocumentById: async () => null,
};
