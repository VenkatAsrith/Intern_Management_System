import { Q as useBackend, u as useAuth, R as useQuery, V as useQueryClient, W as useMutation, P as ue } from "./index-BMeK9e6q.js";
function useMeetingsForUser() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["meetings", "user"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getMeetingsForUser(sessionToken);
    },
    enabled: !!actor && !isFetching && !!sessionToken,
    refetchInterval: 6e4
  });
}
function useMeetingsForIntern(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["meetings", "intern", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return [];
      return actor.getMeetingsForIntern(sessionToken, internId);
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId
  });
}
function useScheduleMeeting() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      const result = await actor.scheduleMeeting(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["meetings"] });
      ue.success("Meeting scheduled successfully");
    },
    onError: (err) => {
      ue.error(err.message ?? "Failed to schedule meeting");
    }
  });
}
export {
  useScheduleMeeting as a,
  useMeetingsForUser as b,
  useMeetingsForIntern as u
};
