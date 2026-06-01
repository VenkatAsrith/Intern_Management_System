// Re-export task hooks from useWorkspace for convenience
export {
  useTasksByIntern as useTasks,
  useAllTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "@/hooks/useWorkspace";
export type { Task } from "@/hooks/useWorkspace";
