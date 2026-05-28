import { 
  ActivityType,
  ClientStatus,
  ExperienceLevel,
  InternPipelineStage,
  InvoicePaymentStatus,
  PaymentStatus,
  PriorityLevel,
  Space,
  Status,
 } from "../backend";
import type { 
  Activity,
  Client,
  ClientActivity,
  ClientAnalytics,
  ClientComment,
  DashboardStats,
  Intern,
  Invoice,
  Performance,
  backendInterface,
 } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayMs = BigInt(86400000) * BigInt(1_000_000);

const sampleInterns: Intern[] = [];

const samplePerformances: Performance[] = [];

const sampleActivities: Activity[] = [];

const sampleClients: Client[] = [
  {
    id: "client-001",
    companyName: "Apex Motors Pvt Ltd",
    contactPersonName: "Rahul Sharma",
    designation: "CEO",
    email: "rahul@apexmotors.in",
    phone: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210",
    website: "https://apexmotors.in",
    industryType: "Automotive",
    companySize: "51-200",
    location: "Hyderabad, Telangana",
    gstNumber: "36AABCA1234C1Z5",
    serviceInterested: "Digital Marketing",
    dealValue: 150000,
    leadSource: "Referral",
    priorityLevel: PriorityLevel.high,
    assignedTeamMember: "Venkat Asrith",
    currentStatus: ClientStatus.negotiation,
    statusHistory: [
      { status: ClientStatus.leadCaptured, note: "Initial contact made", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(5) },
      { status: ClientStatus.contacted, note: "Had a great intro call", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(3) },
      { status: ClientStatus.negotiation, note: "Proposal sent, awaiting feedback", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(1) },
    ],
    followUpDate: now + dayMs * BigInt(2),
    nextMeetingDate: now + dayMs * BigInt(4),
    createdAt: now - dayMs * BigInt(7),
    updatedAt: now - dayMs * BigInt(1),
    createdBy: "Venkat Asrith",
    dealProbability: BigInt(0), contacts: [], source: "Referral", tags: [], leadScore: BigInt(0), proposalVersion: BigInt(0), healthScore: BigInt(50), engagementScore: BigInt(50), customFields: [], activityCount: BigInt(0), proposalStatus: undefined, proposalExpiry: undefined, wonLostReason: undefined, closedAt: undefined, lastActivity: undefined,
  },
  {
    id: "client-002",
    companyName: "ByteForge Technologies",
    contactPersonName: "Priya Nair",
    designation: "CTO",
    email: "priya@byteforge.io",
    phone: "+91 87654 32109",
    whatsappNumber: "+91 87654 32109",
    website: "https://byteforge.io",
    industryType: "Technology",
    companySize: "11-50",
    location: "Bangalore, Karnataka",
    serviceInterested: "Website Redesign & SEO",
    dealValue: 425000,
    leadSource: "LinkedIn",
    priorityLevel: PriorityLevel.urgent,
    assignedTeamMember: "Jay Chandra",
    currentStatus: ClientStatus.closedWon,
    statusHistory: [
      { status: ClientStatus.leadCaptured, note: "Lead from LinkedIn outreach", adminName: "Jay Chandra", timestamp: now - dayMs * BigInt(14) },
      { status: ClientStatus.contacted, note: "Discovery call completed", adminName: "Jay Chandra", timestamp: now - dayMs * BigInt(10) },
      { status: ClientStatus.negotiation, note: "Proposal submitted", adminName: "Jay Chandra", timestamp: now - dayMs * BigInt(7) },
      { status: ClientStatus.closedWon, note: "Contract signed! Project starts next month", adminName: "Jay Chandra", timestamp: now - dayMs * BigInt(2) },
    ],
    followUpDate: now + dayMs * BigInt(7),
    createdAt: now - dayMs * BigInt(14),
    updatedAt: now - dayMs * BigInt(2),
    createdBy: "Jay Chandra",
    dealProbability: BigInt(0), contacts: [], source: "LinkedIn", tags: [], leadScore: BigInt(0), proposalVersion: BigInt(0), healthScore: BigInt(50), engagementScore: BigInt(50), customFields: [], activityCount: BigInt(0), proposalStatus: undefined, proposalExpiry: undefined, wonLostReason: undefined, closedAt: undefined, lastActivity: undefined,
  },
  {
    id: "client-003",
    companyName: "Quantum Corp Solutions",
    contactPersonName: "Aditya Reddy",
    designation: "Head of Marketing",
    email: "aditya@quantumcorp.com",
    phone: "+91 76543 21098",
    whatsappNumber: "+91 76543 21098",
    website: "https://quantumcorp.com",
    industryType: "Manufacturing",
    companySize: "201-500",
    location: "Pune, Maharashtra",
    serviceInterested: "Brand Strategy & Content Marketing",
    dealValue: 280000,
    leadSource: "Cold Outreach",
    priorityLevel: PriorityLevel.medium,
    assignedTeamMember: "Venkat Asrith",
    currentStatus: ClientStatus.contacted,
    statusHistory: [
      { status: ClientStatus.leadCaptured, note: "Cold email responded positively", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(4) },
      { status: ClientStatus.contacted, note: "30-min intro call. Very interested.", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(1) },
    ],
    followUpDate: now + dayMs * BigInt(3),
    nextMeetingDate: now + dayMs * BigInt(5),
    createdAt: now - dayMs * BigInt(4),
    updatedAt: now - dayMs * BigInt(1),
    createdBy: "Venkat Asrith",
    dealProbability: BigInt(0), contacts: [], source: "Cold Outreach", tags: [], leadScore: BigInt(0), proposalVersion: BigInt(0), healthScore: BigInt(50), engagementScore: BigInt(50), customFields: [], activityCount: BigInt(0), proposalStatus: undefined, proposalExpiry: undefined, wonLostReason: undefined, closedAt: undefined, lastActivity: undefined,
  },
  {
    id: "client-004",
    companyName: "RoabieMode Fashion",
    contactPersonName: "Sneha Kapoor",
    designation: "Founder",
    email: "sneha@roabiemode.com",
    phone: "+91 65432 10987",
    whatsappNumber: "+91 65432 10987",
    website: "https://roabiemode.com",
    industryType: "Fashion & Retail",
    companySize: "1-10",
    location: "Mumbai, Maharashtra",
    serviceInterested: "Social Media Marketing",
    dealValue: 75000,
    leadSource: "Instagram",
    priorityLevel: PriorityLevel.low,
    assignedTeamMember: "Jay Chandra",
    currentStatus: ClientStatus.leadCaptured,
    statusHistory: [
      { status: ClientStatus.leadCaptured, note: "DM on Instagram, wants to discuss packages", adminName: "Jay Chandra", timestamp: now - dayMs * BigInt(2) },
    ],
    followUpDate: now + dayMs * BigInt(1),
    createdAt: now - dayMs * BigInt(2),
    updatedAt: now - dayMs * BigInt(2),
    createdBy: "Jay Chandra",
    dealProbability: BigInt(0), contacts: [], source: "Instagram", tags: [], leadScore: BigInt(0), proposalVersion: BigInt(0), healthScore: BigInt(50), engagementScore: BigInt(50), customFields: [], activityCount: BigInt(0), proposalStatus: undefined, proposalExpiry: undefined, wonLostReason: undefined, closedAt: undefined, lastActivity: undefined,
  },
  {
    id: "client-005",
    companyName: "SteelPath Industries",
    contactPersonName: "Vikram Patel",
    designation: "Director",
    email: "vikram@steelpath.in",
    phone: "+91 54321 09876",
    whatsappNumber: "+91 54321 09876",
    website: "https://steelpath.in",
    industryType: "Industrial",
    companySize: "501-1000",
    location: "Ahmedabad, Gujarat",
    serviceInterested: "Corporate Video Production",
    dealValue: 320000,
    leadSource: "Trade Show",
    priorityLevel: PriorityLevel.medium,
    assignedTeamMember: "Venkat Asrith",
    currentStatus: ClientStatus.closedLost,
    statusHistory: [
      { status: ClientStatus.leadCaptured, note: "Met at trade show", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(20) },
      { status: ClientStatus.contacted, note: "Initial call done", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(15) },
      { status: ClientStatus.negotiation, note: "Proposal under review", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(10) },
      { status: ClientStatus.closedLost, note: "Budget constraints, revisit Q3", adminName: "Venkat Asrith", timestamp: now - dayMs * BigInt(3) },
    ],
    createdAt: now - dayMs * BigInt(20),
    updatedAt: now - dayMs * BigInt(3),
    createdBy: "Venkat Asrith",
    dealProbability: BigInt(0), contacts: [], source: "Trade Show", tags: [], leadScore: BigInt(0), proposalVersion: BigInt(0), healthScore: BigInt(50), engagementScore: BigInt(50), customFields: [], activityCount: BigInt(0), proposalStatus: undefined, proposalExpiry: undefined, wonLostReason: undefined, closedAt: undefined, lastActivity: undefined,
  },
];

const sampleClientActivities: ClientActivity[] = [
  {
    id: "act-001",
    clientId: "client-001",
    activityType: ActivityType.statusChange,
    description: "Status changed to In Progress",
    adminName: "Venkat Asrith",
    timestamp: now - dayMs * BigInt(1),
    metadata: "needToTalk -> inProgress",
  },
  {
    id: "act-002",
    clientId: "client-001",
    activityType: ActivityType.proposalUploaded,
    description: "Digital Marketing Proposal Q1 uploaded",
    adminName: "Venkat Asrith",
    timestamp: now - dayMs * BigInt(2),
  },
  {
    id: "act-003",
    clientId: "client-002",
    activityType: ActivityType.invoiceGenerated,
    description: "Invoice INV-0001 generated for ₹4,25,000",
    adminName: "Jay Chandra",
    timestamp: now - dayMs * BigInt(1),
  },
  {
    id: "act-004",
    clientId: "client-002",
    activityType: ActivityType.whatsappMessage,
    description: "WhatsApp message sent — deal confirmation",
    adminName: "Jay Chandra",
    timestamp: now - dayMs * BigInt(2),
  },
];

const sampleClientComments: ClientComment[] = [
  {
    id: "cmt-001",
    clientId: "client-001",
    content: "Great potential client! Their current agency is underperforming on ROI. We have a strong pitch here.",
    authorName: "Venkat Asrith",
    timestamp: now - dayMs * BigInt(3),
    isPinned: true,
  },
  {
    id: "cmt-002",
    clientId: "client-001",
    content: "Follow up with revised pricing before Friday. They mentioned budget is flexible if we can show case studies.",
    authorName: "Jay Chandra",
    timestamp: now - dayMs * BigInt(1),
    isPinned: false,
    parentId: "cmt-001",
  },
  {
    id: "cmt-003",
    clientId: "client-002",
    content: "Contract signed and received. Onboarding scheduled for next Monday.",
    authorName: "Jay Chandra",
    timestamp: now - dayMs * BigInt(2),
    isPinned: true,
  },
];

const sampleInvoices: Invoice[] = [
  {
    id: "inv-001",
    clientId: "client-002",
    invoiceNumber: "INV-0001",
    lineItems: [
      { description: "Website Redesign — 5 pages", quantity: 1, rate: 250000, amount: 250000 },
      { description: "SEO Setup & Optimization", quantity: 1, rate: 125000, amount: 125000 },
      { description: "3 months Social Media Management", quantity: 3, rate: 16667, amount: 50001 },
    ],
    subtotal: 425001,
    tax: 76500,
    total: 501501,
    paymentStatus: PaymentStatus.paid,
    status: InvoicePaymentStatus.paid,
    amountPaid: BigInt(0),
    dueDate: undefined,
    createdAt: now - dayMs * BigInt(1),
    createdBy: "Jay Chandra",
    notes: "50% advance received. Balance due on project completion.",
  },
];

const dashboardStats: DashboardStats = {
  totalInterns: BigInt(0),
  activeInterns: BigInt(0),
  orgCount: BigInt(0),
  marketingCount: BigInt(0),
  learningCount: BigInt(0),
  documentsSentThisMonth: BigInt(0),
  avgPerformance: 0,
};

function ok<T>(val: T): { __kind__: "ok"; ok: T } {
  return { __kind__: "ok", ok: val };
}
function err(msg: string): { __kind__: "err"; err: string } {
  return { __kind__: "err", err: msg };
}

export const mockBackend: backendInterface = {
  addPerformance: async (_token, payload) =>
    ok({
      id: `perf-new-${Date.now()}`,
      internId: payload.internId,
      month: payload.month,
      year: payload.year,
      taskScore: payload.taskScore,
      attendanceScore: payload.attendanceScore,
      communicationScore: payload.communicationScore,
      initiativeScore: payload.initiativeScore,
      overallScore: payload.overallScore,
      adminNotes: payload.adminNotes,
      createdAt: now,
    }),
  createIntern: async (_token, payload) =>
    ok({
      id: `intern-new-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      department: payload.department,
      space: payload.space,
      status: payload.status,
      experienceLevel: payload.experienceLevel,
      profilePicCid: payload.profilePicCid,
      joiningDate: payload.joiningDate,
      adminNotes: payload.adminNotes,
      createdAt: now,
      updatedAt: now,
      offerLetterSent: false,
      offerLetterOpened: false,
      certificateSent: false,
      certificateOpened: false,
      completionLetterSent: false,
      completionLetterOpened: false,
      pipelineStage: InternPipelineStage.active,
      ppoCandidate: false,
      isActive: true,
      dob: undefined,
      gender: undefined,
      emergencyContact: undefined,
      college: undefined,
      degreeYear: undefined,
      domain: undefined,
      mentorAssigned: undefined,
      startDate: undefined,
      expectedEndDate: undefined,
      internshipType: undefined,
      stipendAmount: undefined,
      performanceTier: undefined,
      actualEndDate: undefined,
      lastWhatsAppedAt: undefined,
      lastContactedAt: undefined,
      offerLetterSentAt: undefined,
      offerLetterOpenedAt: undefined,
      certificateSentAt: undefined,
      certificateOpenedAt: undefined,
      completionLetterSentAt: undefined,
      completionLetterOpenedAt: undefined,
    }),
  deleteIntern: async () => ok(true),
  deletePerformance: async () => ok(true),
  getActivities: async (internId) =>
    internId
      ? sampleActivities.filter((a) => a.internId === internId)
      : sampleActivities,
  getDashboardStats: async () => dashboardStats,
  getIntern: async (id) => sampleInterns.find((i) => i.id === id) ?? null,
  initSampleData: async () => BigInt(sampleInterns.length),
  listInterns: async (filter) => {
    let result = [...sampleInterns];
    if (filter.status) result = result.filter((i) => i.status === filter.status);
    if (filter.space) result = result.filter((i) => i.space === filter.space);
    return result;
  },
  listPerformances: async (internId) =>
    samplePerformances.filter((p) => p.internId === internId),
  logWhatsApp: async () => ok(true),
  login: async (username, _password) => {
    if (username === "Venkat") return ok({ sessionToken: "mock-token-venkat", displayName: "Venkat Asrith", role: "superAdmin", permissions: [] });
    if (username === "Jaychandra") return ok({ sessionToken: "mock-token-jay", displayName: "Jay Chandra", role: "superAdmin", permissions: [] });
    return err("Invalid credentials");
  },
  logout: async () => {},
  validateSession: async (token) => {
    if (token === "mock-token-venkat") return ok({ username: "Venkat", displayName: "Venkat Asrith", role: "superAdmin", permissions: [] });
    if (token === "mock-token-jay") return ok({ username: "Jaychandra", displayName: "Jay Chandra", role: "superAdmin", permissions: [] });
    return err("Invalid session");
  },
  seedSampleData: async () => {},
  updateDocumentState: async (_token, internId, docType, action) => {
    const intern = sampleInterns.find((i) => i.id === internId);
    if (!intern) return err("Intern not found");
    const updates: Partial<Intern> = {};
    if (docType === "offerLetter") {
      if (action === "sent") { updates.offerLetterSent = true; updates.offerLetterSentAt = now; }
      else if (action === "unsent") updates.offerLetterSent = false;
      else if (action === "opened") { updates.offerLetterOpened = true; updates.offerLetterOpenedAt = now; }
      else updates.offerLetterOpened = false;
    } else if (docType === "certificate") {
      if (action === "sent") { updates.certificateSent = true; updates.certificateSentAt = now; }
      else if (action === "unsent") updates.certificateSent = false;
      else if (action === "opened") { updates.certificateOpened = true; updates.certificateOpenedAt = now; }
      else updates.certificateOpened = false;
    } else {
      if (action === "sent") { updates.completionLetterSent = true; updates.completionLetterSentAt = now; }
      else if (action === "unsent") updates.completionLetterSent = false;
      else if (action === "opened") { updates.completionLetterOpened = true; updates.completionLetterOpenedAt = now; }
      else updates.completionLetterOpened = false;
    }
    Object.assign(intern, updates);
    return ok(true);
  },
  updateIntern: async (_token, id, payload) => {
    const intern = sampleInterns.find((i) => i.id === id);
    if (!intern) return err("Intern not found");
    Object.assign(intern, { ...payload, updatedAt: now });
    return ok({ ...intern });
  },
  updatePerformance: async (_token, id, payload) => {
    const perf = samplePerformances.find((p) => p.id === id);
    if (!perf) return err("Performance not found");
    Object.assign(perf, payload);
    return ok({ ...perf });
  },

  // --- Client methods ---
  createClient: async (req) => {
    const client: Client = {
      id: `client-${Date.now()}`,
      ...req,
      currentStatus: ClientStatus.leadCaptured,
      statusHistory: [],
      createdAt: now,
      updatedAt: now,
      createdBy: "Admin",
      dealProbability: BigInt(0),
      contacts: [],
      leadScore: BigInt(0),
      proposalVersion: BigInt(0),
      healthScore: BigInt(50),
      engagementScore: BigInt(50),
      customFields: [] as [string, string][],
      activityCount: BigInt(0),
      proposalStatus: undefined,
      proposalExpiry: undefined,
      wonLostReason: undefined,
      closedAt: undefined,
      lastActivity: undefined,
      source: "",
      tags: [],
    };
    sampleClients.push(client);
    return ok(client);
  },
  getClient: async (id) => {
    const c = sampleClients.find((c) => c.id === id);
    return c ? ok(c) : err("Client not found");
  },
  listClients: async () => [...sampleClients],
  updateClient: async (id, req) => {
    const c = sampleClients.find((c) => c.id === id);
    if (!c) return err("Client not found");
    Object.assign(c, req, { updatedAt: now });
    return ok({ ...c });
  },
  deleteClient: async (id) => {
    const idx = sampleClients.findIndex((c) => c.id === id);
    if (idx === -1) return err("Client not found");
    sampleClients.splice(idx, 1);
    return ok(null);
  },
  updateClientStatus: async (id, status, note) => {
    const c = sampleClients.find((c) => c.id === id);
    if (!c) return err("Client not found");
    c.statusHistory = [...c.statusHistory, { status, note, adminName: "Admin", timestamp: now }];
    c.currentStatus = status;
    c.updatedAt = now;
    return ok({ ...c });
  },
  getClientActivities: async (clientId) =>
    sampleClientActivities.filter((a) => a.clientId === clientId),
  addClientActivity: async (clientId, activityType, description, metadata) => {
    const act: ClientActivity = {
      id: `act-${Date.now()}`,
      clientId,
      activityType,
      description,
      adminName: "Admin",
      timestamp: now,
      metadata: metadata ?? undefined,
    };
    sampleClientActivities.push(act);
    return ok(act);
  },
  getClientComments: async (clientId) =>
    sampleClientComments.filter((c) => c.clientId === clientId),
  addClientComment: async (clientId, content, parentId) => {
    const comment: ClientComment = {
      id: `cmt-${Date.now()}`,
      clientId,
      content,
      authorName: "Admin",
      timestamp: now,
      isPinned: false,
      parentId: parentId ?? undefined,
    };
    sampleClientComments.push(comment);
    return ok(comment);
  },
  updateClientComment: async (commentId, content) => {
    const c = sampleClientComments.find((c) => c.id === commentId);
    if (!c) return err("Comment not found");
    c.content = content;
    return ok({ ...c });
  },
  deleteClientComment: async (commentId) => {
    const idx = sampleClientComments.findIndex((c) => c.id === commentId);
    if (idx === -1) return err("Comment not found");
    sampleClientComments.splice(idx, 1);
    return ok(null);
  },
  pinClientComment: async (commentId, isPinned) => {
    const c = sampleClientComments.find((c) => c.id === commentId);
    if (!c) return err("Comment not found");
    c.isPinned = isPinned;
    return ok({ ...c });
  },
  createInvoice: async (clientId, lineItems, tax, notes) => {
    const subtotal = lineItems.reduce((acc, item) => acc + item.amount, 0);
    const inv: Invoice = {
      id: `inv-${Date.now()}`,
      clientId,
      invoiceNumber: `INV-${String(sampleInvoices.length + 1).padStart(4, "0")}`,
      lineItems,
      subtotal,
      tax,
      total: subtotal + tax,
      paymentStatus: PaymentStatus.pending,
      status: InvoicePaymentStatus.draft,
      amountPaid: BigInt(0),
      dueDate: undefined,
      createdAt: now,
      createdBy: "Admin",
      notes: notes ?? undefined,
    };
    sampleInvoices.push(inv);
    return ok(inv);
  },
  getClientInvoices: async (clientId) =>
    sampleInvoices.filter((inv) => inv.clientId === clientId),
  updateInvoiceStatus: async (_clientId, invoiceId, status, amountPaid) => {
    const inv = sampleInvoices.find((inv) => inv.id === invoiceId);
    if (!inv) return err("Invoice not found");
    inv.status = status;
    if (amountPaid != null) inv.amountPaid = amountPaid;
    return ok({ ...inv });
  },
  updateInvoicePaymentStatus: async (invoiceId, status) => {
    const inv = sampleInvoices.find((inv) => inv.id === invoiceId);
    if (!inv) return err("Invoice not found");
    inv.paymentStatus = status;
    return ok({ ...inv });
  },
  getClientAnalytics: async (): Promise<ClientAnalytics> => ({
    totalClients: BigInt(sampleClients.length),
    activeLeads: BigInt(sampleClients.filter((c) => [ClientStatus.leadCaptured, ClientStatus.contacted, ClientStatus.discoveryCallDone, ClientStatus.proposalSent, ClientStatus.negotiation, ClientStatus.onHold].includes(c.currentStatus)).length),
    approvedDeals: BigInt(sampleClients.filter((c) => c.currentStatus === ClientStatus.closedWon).length),
    rejectedLeads: BigInt(sampleClients.filter((c) => c.currentStatus === ClientStatus.closedLost).length),
    revenuePipeline: sampleClients.filter((c) => c.currentStatus !== ClientStatus.closedLost).reduce((acc, c) => acc + c.dealValue, 0),
    monthlyData: [
      { month: "Jan", newLeads: BigInt(8), approved: BigInt(3), rejected: BigInt(1) },
      { month: "Feb", newLeads: BigInt(12), approved: BigInt(5), rejected: BigInt(2) },
      { month: "Mar", newLeads: BigInt(10), approved: BigInt(4), rejected: BigInt(3) },
      { month: "Apr", newLeads: BigInt(15), approved: BigInt(7), rejected: BigInt(2) },
      { month: "May", newLeads: BigInt(18), approved: BigInt(9), rejected: BigInt(4) },
    ],
  }),

  // --- Pipeline ---
  getStageHistory: async () => [],
  updateInternPipelineStage: async (_token, internId, newStage, notes) => ok({
    id: internId,
    name: "",
    email: "",
    phone: "",
    department: "",
    space: Space.Org,
    status: Status.Active,
    experienceLevel: ExperienceLevel.Junior,
    joiningDate: now,
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
    offerLetterSent: false,
    offerLetterOpened: false,
    certificateSent: false,
    certificateOpened: false,
    completionLetterSent: false,
    completionLetterOpened: false,
    pipelineStage: newStage,
    ppoCandidate: false,
    isActive: true,
  }),
  updateInternExtendedProfile: async (_token, internId, dob, gender, emergencyContact, college, department, degreeYear, domain, mentorAssigned, startDate, expectedEndDate, internshipType, stipendAmount, ppoCandidate, performanceTier, isActive) => ok({
    id: internId,
    name: "",
    email: "",
    phone: "",
    department: department ?? "",
    space: Space.Org,
    status: Status.Active,
    experienceLevel: ExperienceLevel.Junior,
    joiningDate: now,
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
    offerLetterSent: false,
    offerLetterOpened: false,
    certificateSent: false,
    certificateOpened: false,
    completionLetterSent: false,
    completionLetterOpened: false,
    pipelineStage: InternPipelineStage.active,
    ppoCandidate,
    isActive,
    dob: dob ?? undefined,
    gender: gender ?? undefined,
    emergencyContact: emergencyContact ?? undefined,
    college: college ?? undefined,
    degreeYear: degreeYear ?? undefined,
    domain: domain ?? undefined,
    mentorAssigned: mentorAssigned ?? undefined,
    startDate: startDate ?? undefined,
    expectedEndDate: expectedEndDate ?? undefined,
    internshipType: internshipType ?? undefined,
    stipendAmount: stipendAmount ?? undefined,
    performanceTier: performanceTier ?? undefined,
  }),

  // --- Notifications ---
  createNotification: async (payload) => ok({ id: `notif-${Date.now()}`, userId: payload.userId, notificationType: payload.notificationType, title: payload.title, message: payload.message, relatedId: payload.relatedId ?? undefined, isRead: false, createdAt: now }),
  listNotifications: async () => [],
  markAsRead: async () => ok(null),
  markAllAsRead: async () => ok(BigInt(0)),

  // --- Announcements ---
  createAnnouncement: async (payload) => ok({ id: `ann-${Date.now()}`, title: payload.title, content: payload.content, createdBy: payload.createdBy, isActive: true, createdAt: now }),
  listAnnouncements: async () => [],
  deleteAnnouncement: async () => ok(null),

  // --- Extended CRM stubs ---
  addContact: async (_clientId: string, _contact: unknown) => ({ ok: {} as unknown as Client, __kind__: "ok" as const }),
  updateContact: async (_clientId: string, _contactId: string, _contact: unknown) => ({ ok: {} as unknown as Client, __kind__: "ok" as const }),
  removeContact: async (_clientId: string, _contactId: string) => ({ ok: {} as unknown as Client, __kind__: "ok" as const }),
  logQuickActivity: async (_clientId: string, _type: string, _notes: string) => ({ ok: {} as unknown as Client, __kind__: "ok" as const }),
  updateProposalStatus: async (_clientId: string, _status: string, _version: bigint) => ({ ok: {} as unknown as Client, __kind__: "ok" as const }),
  captureWonLostReason: async (_clientId: string, _reason: string) => ({ ok: {} as unknown as Client, __kind__: "ok" as const }),
  getAnalyticsDashboard: async () => ({ totalPipeline: BigInt(0), weightedForecast: BigInt(0), winRate: BigInt(0), avgDealCycleDays: BigInt(0), conversionRates: [] as [string, bigint][], wonLostBreakdown: [] as [string, bigint][] }),
  getCRMFunnelData: async () => [] as [string, bigint][],
  getWinRateByMember: async () => [] as [string, bigint, bigint][],
  getDealCycleTime: async () => BigInt(0),
  getLostDealAnalysis: async () => [] as [string, bigint, bigint][],

  // --- Approval/User management stubs ---
  approveRequest: async (_sessionToken: string, _requestId: string, _notes: string | null) => ok(null as unknown as import('../backend').ApprovalRequest),
  rejectRequest: async (_sessionToken: string, _requestId: string, _notes: string | null) => ok(null as unknown as import('../backend').ApprovalRequest),
  createUser: async () => ok(null as unknown as import('../backend').UserAccount),
  updateUser: async () => ok(null as unknown as import('../backend').UserAccount),
  deleteUser: async () => ok(null as null),
  listUsers: async () => ok([] as import('../backend').UserAccount[]),
  getUserById: async () => ok(null as unknown as import('../backend').UserAccount),
  createApprovalRequest: async () => ok(null as unknown as import('../backend').ApprovalRequest),
  listApprovalRequests: async () => ok([] as import('../backend').ApprovalRequest[]),
  getAuditLog: async () => ok([] as import('../backend').AuditEvent[]),
  listWorkflowExecutions: async () => [] as import('../backend').WorkflowExecution[],
  getSLARules: async () => [] as [string, bigint][],
  setSLARule: async () => ok(null as null),
  runAutomationJobs: async () => undefined,
  runAllAutomationJobs: async () => undefined,
  createAnnouncementV2: async () => ok(null as unknown as import('../backend').Announcement),
  getAnnouncementsBySpace: async () => ok([] as import('../backend').Announcement[]),
  deleteAnnouncementById: async () => ok(null as null),
  getNotificationsByPriority: async () => ok([] as import('../backend').Notification[]),
  setNotificationPreference: async () => ok(null as null),
  getNotificationPreferences: async () => ok([] as import('../backend').NotificationPreference[]),
  getPipelineVelocity: async () => ok([] as [string, number][]),
  getFollowUpComplianceRate: async () => ok([] as [string, number][]),
  getSLABreachRatePerStage: async () => ok([] as [string, number][]),
  getRepScorecards: async () => ok([] as import('../backend').RepScorecard[]),
  getDashboardSnapshot: async () => ok(null as unknown as import('../backend').DashboardSnapshot),
  deleteClientWithAudit: async () => ok({ deleted: false } as { deleted: boolean; approvalId?: string }),
  deleteInternWithAudit: async () => ok({ deleted: false } as { deleted: boolean; approvalId?: string }),
  createInternAudited: async () => ok(null as unknown as import('../backend').Intern),
  updateInternAudited: async () => ok(null as unknown as import('../backend').Intern),
};
