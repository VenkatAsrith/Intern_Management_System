import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ProjectMilestone {
  id: string;
  name: string;
  status: "pending" | "in_progress" | "completed";
  completedAt?: number;
}

export interface ProjectParticipation {
  id: string;
  internId: string;
  projectName: string;
  role: string;
  startDate: string;
  status: "active" | "completed" | "on_hold";
  completionPercent: number;
  milestones: ProjectMilestone[];
  deliverables: string[];
}

function convertMilestone(raw: {
  id: string;
  name: string;
  status: string;
  completedAt?: bigint | null | undefined[];
}): ProjectMilestone {
  const toOpt = (v: unknown): number | undefined => {
    if (!v) return undefined;
    if (Array.isArray(v))
      return v.length > 0 ? Number(v[0]) / 1_000_000 : undefined;
    if (typeof v === "bigint") return Number(v) / 1_000_000;
    return undefined;
  };
  return {
    id: raw.id,
    name: raw.name,
    status: raw.status as ProjectMilestone["status"],
    completedAt: toOpt(raw.completedAt),
  };
}

function convertProject(raw: {
  id: string;
  internId: string;
  projectName: string;
  role: string;
  startDate: string;
  status: string;
  completionPercent: number;
  milestones: Parameters<typeof convertMilestone>[0][];
  deliverables: string[];
}): ProjectParticipation {
  return {
    id: raw.id,
    internId: raw.internId,
    projectName: raw.projectName,
    role: raw.role,
    startDate: raw.startDate,
    status: raw.status as ProjectParticipation["status"],
    completionPercent: raw.completionPercent,
    milestones: raw.milestones.map(convertMilestone),
    deliverables: raw.deliverables,
  };
}

type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

export function useProjectParticipations(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<ProjectParticipation[]>({
    queryKey: ["projects", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return [];
      try {
        const results = (await (
          actor as unknown as AnyActor
        ).getProjectsByIntern(sessionToken, internId)) as Parameters<
          typeof convertProject
        >[0][];
        return results.map(convertProject);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId,
  });
}

export function useCreateProjectParticipation() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      internId: string;
      projectName: string;
      role: string;
      startDate: string;
      milestones?: string[];
      deliverables?: string[];
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = (await (
        actor as unknown as AnyActor
      ).createProjectParticipation(
        sessionToken,
        payload.internId,
        payload.projectName,
        payload.role,
        payload.startDate,
      )) as { __kind__: string; err?: string; ok?: unknown };
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["projects", internId] });
      toast.success("Project participation added");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to add project"),
  });
}

export function useUpdateMilestone() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      milestoneId,
      status,
      internId,
    }: {
      projectId: string;
      milestoneId: string;
      status: string;
      internId: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = (await (actor as unknown as AnyActor).updateMilestone(
        sessionToken,
        projectId,
        milestoneId,
        status,
      )) as { __kind__: string; err?: string };
      if (result.__kind__ === "err") throw new Error(result.err);
      return { internId };
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["projects", internId] });
      toast.success("Milestone updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update milestone"),
  });
}
