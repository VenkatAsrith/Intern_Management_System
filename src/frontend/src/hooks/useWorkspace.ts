import type {
  CreateTaskPayload,
  Task,
  UpdateTaskPayload,
  WorkspaceData,
} from "@/backend";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type { Task, WorkspaceData };

export function useWorkspaceData(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<WorkspaceData | null>({
    queryKey: ["workspace", internId],
    queryFn: async () => {
      if (!actor || !internId || !sessionToken) return null;
      const result = await actor.getWorkspaceData(sessionToken, internId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching && !!internId && !!sessionToken,
  });
}

export function useAllTasks() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<Task[]>({
    queryKey: ["tasks", "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getAllTasks(sessionToken);
    },
    enabled: !!actor && !isFetching && !!sessionToken,
  });
}

export function useTasksByIntern(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<Task[]>({
    queryKey: ["tasks", "intern", internId],
    queryFn: async () => {
      if (!actor || !internId || !sessionToken) return [];
      return actor.getTasksByIntern(sessionToken, internId);
    },
    enabled: !!actor && !isFetching && !!internId && !!sessionToken,
  });
}

export function useCreateTask() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateTaskPayload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.createTask(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["workspace", task.assignedInternId] });
      toast.success("Task created successfully");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to create task"),
  });
}

export function useUpdateTask() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: { id: string; payload: UpdateTaskPayload }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updateTask(sessionToken, id, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["workspace", task.assignedInternId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to update task"),
  });
}

export function useDeleteTask() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.deleteTask(sessionToken, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to delete task"),
  });
}
