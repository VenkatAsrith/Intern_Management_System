import type { backendInterface, Intern, Performance, Activity, DashboardStats } from "../backend";
import { ExperienceLevel, Space, Status } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayMs = BigInt(86400000) * BigInt(1_000_000);

const sampleInterns: Intern[] = [];

const samplePerformances: Performance[] = [];

const sampleActivities: Activity[] = [];

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
    if (username === "Venkat") return ok({ sessionToken: "mock-token-venkat", displayName: "Venkat Asrith" });
    if (username === "Jaychandra") return ok({ sessionToken: "mock-token-jay", displayName: "Jay Chandra" });
    return err("Invalid credentials");
  },
  logout: async () => {},
  validateSession: async (token) => {
    if (token === "mock-token-venkat") return ok({ username: "Venkat", displayName: "Venkat Asrith" });
    if (token === "mock-token-jay") return ok({ username: "Jaychandra", displayName: "Jay Chandra" });
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
};
