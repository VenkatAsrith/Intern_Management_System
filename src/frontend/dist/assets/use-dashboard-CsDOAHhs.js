import { G as useBackend, H as useQuery, a1 as convertDashboardStats, a2 as convertActivity } from "./index-Cx0SFoKr.js";
function useDashboardStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
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
          avgPerformance: 0
        };
      }
      return convertDashboardStats(await actor.getDashboardStats());
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useActivities(internId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["activities", internId ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getActivities(internId ?? null);
      return results.map(convertActivity);
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useActivities as a,
  useDashboardStats as u
};
