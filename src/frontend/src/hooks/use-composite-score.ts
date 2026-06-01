import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CompositeScoreBreakdown {
  productivity: number;
  communication: number;
  learning: number;
  attendance: number;
}

export interface CompositePerformanceScore {
  internId: string;
  overallScore: number;
  breakdown: CompositeScoreBreakdown;
  improvementSuggestions: string[];
  computedAt: number;
}

function convertScore(raw: {
  internId: string;
  overallScore: number;
  breakdown: {
    productivity: number;
    communication: number;
    learning: number;
    attendance: number;
  };
  improvementSuggestions: string[];
  computedAt: bigint;
}): CompositePerformanceScore {
  return {
    internId: raw.internId,
    overallScore: raw.overallScore,
    breakdown: raw.breakdown,
    improvementSuggestions: raw.improvementSuggestions,
    computedAt: Number(raw.computedAt) / 1_000_000,
  };
}

type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

export function useCompositeScore(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<CompositePerformanceScore | null>({
    queryKey: ["compositeScore", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return null;
      try {
        const raw = await (actor as unknown as AnyActor).getCompositeScore(
          sessionToken,
          internId,
        );
        // IC optional returns [] for null, or [value] for some
        if (!raw) return null;
        if (Array.isArray(raw)) {
          if (raw.length === 0) return null;
          return convertScore(raw[0] as Parameters<typeof convertScore>[0]);
        }
        return convertScore(raw as Parameters<typeof convertScore>[0]);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId,
  });
}

export function useComputeCompositeScore() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (internId: string) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = (await (
        actor as unknown as AnyActor
      ).computeCompositeScore(sessionToken, internId)) as Parameters<
        typeof convertScore
      >[0];
      return convertScore(result);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["compositeScore", data.internId] });
      toast.success("Performance score recomputed");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to compute score"),
  });
}
