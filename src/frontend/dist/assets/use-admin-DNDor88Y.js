import { O as useBackend, u as useAuth, P as useQuery, R as useQueryClient, T as useMutation } from "./index-Fes9v1FI.js";
function useAdminUsers() {
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
    enabled: !!actor && !!sessionToken
  });
}
function useCreateUser() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      password,
      roleText,
      spaces,
      displayName
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.createUser(
        sessionToken,
        username,
        password,
        roleText,
        spaces,
        displayName
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] })
  });
}
function useUpdateUser() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      roleText,
      spaces,
      isActive
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.updateUser(
        sessionToken,
        userId,
        roleText,
        spaces,
        isActive
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] })
  });
}
function useDeactivateUser() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.deleteUser(sessionToken, userId);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] })
  });
}
function useApprovalRequests(statusFilter) {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "approvals", statusFilter ?? "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.listApprovalRequests(
        sessionToken,
        statusFilter ?? null
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken
  });
}
function useApproveRequest() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      notes
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.approveRequest(
        sessionToken,
        requestId,
        notes ?? null
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "approvals"] })
  });
}
function useRejectRequest() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      notes
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.rejectRequest(
        sessionToken,
        requestId,
        notes ?? null
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "approvals"] })
  });
}
function useAuditLog(limit, offset) {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "auditLog", limit, offset],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.getAuditLog(
        sessionToken,
        BigInt(limit),
        BigInt(offset)
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken
  });
}
function useWorkflowExecutions() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "workflowExecutions"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.listWorkflowExecutions(null, BigInt(20));
    },
    enabled: !!actor && !!sessionToken
  });
}
function useSLARules() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "slaRules"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getSLARules();
    },
    enabled: !!actor && !!sessionToken
  });
}
function useSetSLARule() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      stageName,
      maxHours
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.setSLARule(stageName, BigInt(maxHours));
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "slaRules"] })
  });
}
function useRunAutomationJobs() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      await actor.runAutomationJobs(sessionToken);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "workflowExecutions"] })
  });
}
function useCreateAnnouncement() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      body,
      targetSpaces,
      expiresAt
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.createAnnouncementV2(
        sessionToken,
        title,
        body,
        targetSpaces,
        expiresAt ? BigInt(expiresAt) : null
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "announcements"] })
  });
}
function useDeleteAnnouncement() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const res = await actor.deleteAnnouncementById(sessionToken, id);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "announcements"] })
  });
}
function useAnnouncementsBySpace(space) {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["admin", "announcements", "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      const res = await actor.getAnnouncementsBySpace(
        sessionToken,
        null
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    enabled: !!actor && !!sessionToken
  });
}
export {
  useCreateUser as a,
  useUpdateUser as b,
  useDeactivateUser as c,
  useApprovalRequests as d,
  useApproveRequest as e,
  useRejectRequest as f,
  useAuditLog as g,
  useWorkflowExecutions as h,
  useSLARules as i,
  useRunAutomationJobs as j,
  useSetSLARule as k,
  useAnnouncementsBySpace as l,
  useCreateAnnouncement as m,
  useDeleteAnnouncement as n,
  useAdminUsers as u
};
