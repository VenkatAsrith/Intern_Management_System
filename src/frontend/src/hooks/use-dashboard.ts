import {
  convertActivity,
  convertDashboardStats,
  useBackend,
} from "@/lib/backend";
import type { Activity, DashboardStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  const { actor, isFetching } = useBackend();
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      if (!actor) {
        return {
          totalInterns: 0,
          activeInterns: 0,
          orgCount: 0,
          marketingCount: 0,
          learningCount: 0,
          documentsSentThisMonth: 0,
          avgPerformance: 0,
        };
      }
      return convertDashboardStats(await actor.getDashboardStats());
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useActivities(internId?: string | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Activity[]>({
    queryKey: ["activities", internId ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getActivities(internId ?? null);
      return results.map(convertActivity);
    },
    enabled: !!actor && !isFetching,
  });
}
