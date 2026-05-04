import { useAuth } from "@/hooks/use-auth";
import { convertPerformance, useBackend } from "@/lib/backend";
import type {
  BackendCreatePerformancePayload,
  BackendUpdatePerformancePayload,
  Performance,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePerformances(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Performance[]>({
    queryKey: ["performances", internId],
    queryFn: async () => {
      if (!actor || !internId) return [];
      const results = await actor.listPerformances(internId);
      return results.map(convertPerformance);
    },
    enabled: !!actor && !isFetching && !!internId,
  });
}

export function useAddPerformance() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BackendCreatePerformancePayload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.addPerformance(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertPerformance(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["performances", data.internId] });
      toast.success("Performance record added");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to add performance record"),
  });
}

export function useUpdatePerformance() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: BackendUpdatePerformancePayload;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updatePerformance(sessionToken, id, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertPerformance(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["performances", data.internId] });
      toast.success("Performance record updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update performance record"),
  });
}

export function useDeletePerformance() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, internId }: { id: string; internId: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.deletePerformance(sessionToken, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return { id, internId };
    },
    onSuccess: ({ internId }) => {
      qc.invalidateQueries({ queryKey: ["performances", internId] });
      toast.success("Performance record deleted");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to delete performance record"),
  });
}
