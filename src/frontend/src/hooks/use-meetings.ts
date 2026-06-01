import type { CreateMeetingPayload, Meeting } from "@/backend";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type { Meeting };

export function useMeetingsForUser() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<Meeting[]>({
    queryKey: ["meetings", "user"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getMeetingsForUser(sessionToken);
    },
    enabled: !!actor && !isFetching && !!sessionToken,
    refetchInterval: 60_000,
  });
}

export function useMeetingsForIntern(internId: string | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<Meeting[]>({
    queryKey: ["meetings", "intern", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return [];
      return actor.getMeetingsForIntern(sessionToken, internId);
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId,
  });
}

export function useScheduleMeeting() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateMeetingPayload) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      const result = await actor.scheduleMeeting(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["meetings"] });
      toast.success("Meeting scheduled successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to schedule meeting");
    },
  });
}
