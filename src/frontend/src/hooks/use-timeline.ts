import type { TimelineMilestone } from "@/backend";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type { TimelineMilestone };

export interface TimelineResult {
  milestones: TimelineMilestone[];
  completionPct: number;
}

export function useTimeline(internId: string | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<TimelineResult>({
    queryKey: ["timeline", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId)
        return { milestones: [], completionPct: 0 };
      const raw = await actor.getTimelineForIntern(sessionToken, internId);
      const sorted = [...raw].sort(
        (a, b) => Number(a.createdAt) - Number(b.createdAt),
      );
      const total = sorted.length;
      const completed = sorted.filter((m) => m.completedAt != null).length;
      const completionPct =
        total === 0 ? 0 : Math.round((completed / total) * 100);
      return { milestones: sorted, completionPct };
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId,
  });
}

export function useAddMilestone() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: {
      internId: string;
      title: string;
      description?: string;
      milestoneType: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      const result = await actor.addTimelineMilestone(
        sessionToken,
        vars.internId,
        vars.title,
        vars.description ?? null,
        vars.milestoneType,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["timeline", vars.internId] });
      toast.success("Milestone added");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to add milestone");
    },
  });
}
