import { Q as useBackend, u as useAuth, R as useQuery, V as useQueryClient, W as useMutation, P as ue } from "./index-BMeK9e6q.js";
function useWorkspaceData(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["workspace", internId],
    queryFn: async () => {
      if (!actor || !internId || !sessionToken) return null;
      const result = await actor.getWorkspaceData(sessionToken, internId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching && !!internId && !!sessionToken
  });
}
function useAllTasks() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["tasks", "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getAllTasks(sessionToken);
    },
    enabled: !!actor && !isFetching && !!sessionToken
  });
}
function useTasksByIntern(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["tasks", "intern", internId],
    queryFn: async () => {
      if (!actor || !internId || !sessionToken) return [];
      return actor.getTasksByIntern(sessionToken, internId);
    },
    enabled: !!actor && !isFetching && !!internId && !!sessionToken
  });
}
function useCreateTask() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.createTask(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["workspace", task.assignedInternId] });
      ue.success("Task created successfully");
    },
    onError: (e) => ue.error(e.message || "Failed to create task")
  });
}
function useUpdateTask() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updateTask(sessionToken, id, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["workspace", task.assignedInternId] });
    },
    onError: (e) => ue.error(e.message || "Failed to update task")
  });
}
function useDeleteTask() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.deleteTask(sessionToken, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      ue.success("Task deleted");
    },
    onError: (e) => ue.error(e.message || "Failed to delete task")
  });
}
export {
  useWorkspaceData as a,
  useAllTasks as b,
  useUpdateTask as c,
  useDeleteTask as d,
  useCreateTask as e,
  useTasksByIntern as u
};
