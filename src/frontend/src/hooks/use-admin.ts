import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminUsers() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.listUsers(sessionToken);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken,
  });
}

export function useCreateUser() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      password,
      roleText,
      spaces,
      displayName,
    }: {
      username: string;
      password: string;
      roleText: string;
      spaces: string[];
      displayName: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.createUser(
        sessionToken,
        username,
        password,
        roleText,
        spaces,
        displayName,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useUpdateUser() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      roleText,
      spaces,
      isActive,
    }: {
      userId: string;
      roleText: string;
      spaces: string[];
      isActive: boolean;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.updateUser(
        sessionToken,
        userId,
        roleText,
        spaces,
        isActive,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useDeactivateUser() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.deleteUser(sessionToken, userId);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useApprovalRequests(statusFilter?: string) {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "approvals", statusFilter ?? "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.listApprovalRequests(
        sessionToken,
        statusFilter ?? null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken,
  });
}

export function useApproveRequest() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      notes,
    }: { requestId: string; notes?: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.approveRequest(
        sessionToken,
        requestId,
        notes ?? null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "approvals"] }),
  });
}

export function useRejectRequest() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      notes,
    }: { requestId: string; notes?: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.rejectRequest(
        sessionToken,
        requestId,
        notes ?? null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "approvals"] }),
  });
}

export function useAuditLog(limit: number, offset: number) {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "auditLog", limit, offset],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.getAuditLog(
        sessionToken,
        BigInt(limit),
        BigInt(offset),
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken,
  });
}

export function useWorkflowExecutions() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "workflowExecutions"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.listWorkflowExecutions(null, BigInt(20));
    },
    enabled: !!actor && !!sessionToken,
  });
}

export function useSLARules() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "slaRules"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [] as Array<[string, bigint]>;
      return actor.getSLARules();
    },
    enabled: !!actor && !!sessionToken,
  });
}

export function useSetSLARule() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      stageName,
      maxHours,
    }: { stageName: string; maxHours: number }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.setSLARule(stageName, BigInt(maxHours));
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "slaRules"] }),
  });
}

export function useRunAutomationJobs() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      await actor.runAutomationJobs(sessionToken);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "workflowExecutions"] }),
  });
}

export function useCreateAnnouncement() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      body,
      targetSpaces,
      expiresAt,
    }: {
      title: string;
      body: string;
      targetSpaces: string[];
      expiresAt?: number;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.createAnnouncementV2(
        sessionToken,
        title,
        body,
        targetSpaces,
        expiresAt ? BigInt(expiresAt) : null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.deleteAnnouncementById(sessionToken, id);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] }),
  });
}

export function useAnnouncementsBySpace(space?: string) {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "announcements", space ?? "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.getAnnouncementsBySpace(
        sessionToken,
        space ?? null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken,
  });
}
