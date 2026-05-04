import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface Activity {
    id: string;
    action: string;
    internId: string;
    performedBy: string;
    timestamp: bigint;
    details: string;
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
export interface Intern {
    id: string;
    status: Status;
    experienceLevel: ExperienceLevel;
    profilePicCid?: string;
    offerLetterSentAt?: bigint;
    name: string;
    createdAt: bigint;
    joiningDate: bigint;
    certificateOpened: boolean;
    completionLetterOpened: boolean;
    email: string;
    lastWhatsAppedAt?: bigint;
    certificateOpenedAt?: bigint;
    space: Space;
    updatedAt: bigint;
    offerLetterSent: boolean;
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
}
export interface ListInternsFilter {
    status?: Status;
    space?: Space;
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
export enum ExperienceLevel {
    Mid = "Mid",
    Junior = "Junior",
    Senior = "Senior"
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
    addPerformance(sessionToken: string, payload: CreatePerformancePayload): Promise<{
        __kind__: "ok";
        ok: Performance;
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
    getDashboardStats(): Promise<DashboardStats>;
    getIntern(id: string): Promise<Intern | null>;
    initSampleData(): Promise<bigint>;
    listInterns(filter: ListInternsFilter): Promise<Array<Intern>>;
    listPerformances(internId: string): Promise<Array<Performance>>;
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
    seedSampleData(): Promise<void>;
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
    updatePerformance(sessionToken: string, id: string, payload: UpdatePerformancePayload): Promise<{
        __kind__: "ok";
        ok: Performance;
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
