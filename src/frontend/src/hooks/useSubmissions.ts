import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type SubmissionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "feedback_given";

export interface WorkSubmission {
  id: string;
  internId: string;
  internName: string;
  taskId: string | null;
  title: string;
  description: string;
  githubLink: string | null;
  driveLink: string | null;
  fileUrls: string[];
  notes: string;
  status: SubmissionStatus;
  adminFeedback: string | null;
  reviewedBy: string | null;
  createdAt: number;
  reviewedAt: number | null;
}

function convertSubmission(raw: {
  id: string;
  internId: string;
  internName?: string;
  taskId?: string | null | undefined[];
  title: string;
  description: string;
  githubLink?: string | null | undefined[];
  driveLink?: string | null | undefined[];
  fileUrls: string[];
  notes?: string;
  status: string;
  adminFeedback?: string | null | undefined[];
  reviewedBy?: string | null | undefined[];
  createdAt: bigint;
  reviewedAt?: bigint | null | undefined[];
}): WorkSubmission {
  const toOpt = (v: unknown): string | null => {
    if (v === null || v === undefined) return null;
    if (Array.isArray(v)) return v.length > 0 ? String(v[0]) : null;
    return String(v);
  };
  return {
    id: raw.id,
    internId: raw.internId,
    internName: raw.internName ?? "",
    taskId: toOpt(raw.taskId),
    title: raw.title,
    description: raw.description,
    githubLink: toOpt(raw.githubLink),
    driveLink: toOpt(raw.driveLink),
    fileUrls: raw.fileUrls,
    notes: raw.notes ?? "",
    status: raw.status as SubmissionStatus,
    adminFeedback: toOpt(raw.adminFeedback),
    reviewedBy: toOpt(raw.reviewedBy),
    createdAt: Number(raw.createdAt) / 1_000_000,
    reviewedAt: raw.reviewedAt
      ? (() => {
          const v = raw.reviewedAt;
          if (Array.isArray(v))
            return v.length > 0 ? Number(v[0]) / 1_000_000 : null;
          if (typeof v === "bigint") return Number(v) / 1_000_000;
          return null;
        })()
      : null,
  };
}

export function useSubmissions(internId?: string | null) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<WorkSubmission[]>({
    queryKey: ["submissions", internId ?? "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await (
          actor as unknown as {
            getSubmissionsByIntern: (
              t: string,
              id: string,
            ) => Promise<unknown[]>;
          }
        ).getSubmissionsByIntern(sessionToken, internId ?? "all");
        return (results as Parameters<typeof convertSubmission>[0][]).map(
          convertSubmission,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken,
  });
}

export function useCreateSubmission() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      description: string;
      githubLink?: string;
      driveLink?: string;
      fileUrls: string[];
      notes: string;
      taskId?: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          createSubmission: (
            t: string,
            p: typeof payload,
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).createSubmission(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertSubmission(
        result.ok as Parameters<typeof convertSubmission>[0],
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submission created");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to create submission"),
  });
}

export function useUpdateSubmissionStatus() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      feedback,
    }: {
      id: string;
      status: SubmissionStatus;
      feedback?: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          updateSubmissionStatus: (
            t: string,
            id: string,
            status: string,
            feedback: string,
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).updateSubmissionStatus(sessionToken, id, status, feedback ?? "");
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertSubmission(
        result.ok as Parameters<typeof convertSubmission>[0],
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submission updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update submission"),
  });
}
