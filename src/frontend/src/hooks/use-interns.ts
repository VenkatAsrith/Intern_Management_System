import { useAuth } from "@/hooks/use-auth";
import { convertIntern, useBackend } from "@/lib/backend";
import type { InternPipelineStage, InternPipelineStageHistory } from "@/types";
import type {
  BackendCreateInternPayload,
  BackendUpdateInternPayload,
  DocumentField,
  Intern,
  InternFilter,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useInterns(filter?: InternFilter) {
  const { actor, isFetching } = useBackend();
  return useQuery<Intern[]>({
    queryKey: ["interns", filter],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listInterns({
        status: filter?.status ?? undefined,
        space: filter?.space ?? undefined,
      });
      const converted = results.map(convertIntern);
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        return converted.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.email.toLowerCase().includes(q) ||
            i.department.toLowerCase().includes(q) ||
            i.phone.includes(q),
        );
      }
      return converted;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIntern(id: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Intern | null>({
    queryKey: ["intern", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const result = await actor.getIntern(id);
      return result ? convertIntern(result) : null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateIntern() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BackendCreateInternPayload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.createIntern(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertIntern(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["interns"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Intern created successfully");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to create intern"),
  });
}

export function useUpdateIntern() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: { id: string; payload: BackendUpdateInternPayload }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updateIntern(sessionToken, id, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertIntern(result.ok);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["interns"] });
      qc.invalidateQueries({ queryKey: ["intern", id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Intern updated successfully");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to update intern"),
  });
}

export function useDeleteIntern() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.deleteIntern(sessionToken, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["interns"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Intern deleted successfully");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to delete intern"),
  });
}

export function useUpdateDocumentState() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      internId,
      field,
      value,
    }: {
      internId: string;
      field: DocumentField;
      value: boolean;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      // docType = field name up to "Sent"/"Opened", action = "sent"/"opened"/"unsent"/"unopened"
      const docType = field.includes("offerLetter")
        ? "offerLetter"
        : field.includes("certificate") && !field.includes("completion")
          ? "certificate"
          : "completionLetter";
      const isSentField = field.endsWith("Sent");
      const action = isSentField
        ? value
          ? "sent"
          : "unsent"
        : value
          ? "opened"
          : "unopened";
      const result = await actor.updateDocumentState(
        sessionToken,
        internId,
        docType,
        action,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      // Re-fetch intern to get updated state
      const updated = await actor.getIntern(internId);
      if (!updated) throw new Error("Intern not found after update");
      return convertIntern(updated);
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["intern", internId] });
      qc.invalidateQueries({ queryKey: ["interns"] });
      toast.success("Document status updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update document status"),
  });
}

export function useSeedSampleData() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedSampleData();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["interns"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateInternPipelineStage() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      internId,
      newStage,
      notes,
    }: {
      internId: string;
      newStage: InternPipelineStage;
      notes: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updateInternPipelineStage(
        sessionToken,
        internId,
        newStage as any,
        notes,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertIntern(result.ok);
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["interns"] });
      qc.invalidateQueries({ queryKey: ["intern", internId] });
      qc.invalidateQueries({ queryKey: ["stageHistory", internId] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Pipeline stage updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update pipeline stage"),
  });
}

export function useStageHistory(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<InternPipelineStageHistory[]>({
    queryKey: ["stageHistory", internId],
    queryFn: async () => {
      if (!actor || !internId) return [];
      const results = await actor.getStageHistory(internId);
      return results.map((r) => ({
        stage: r.stage,
        changedBy: r.changedBy,
        changedAt: new Date(Number(r.changedAt) / 1_000_000),
        notes: r.notes,
      }));
    },
    enabled: !!actor && !isFetching && !!internId,
  });
}

export function useLogWhatsApp() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (internId: string) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.logWhatsApp(sessionToken, internId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, internId) => {
      qc.invalidateQueries({ queryKey: ["intern", internId] });
      qc.invalidateQueries({ queryKey: ["interns"] });
      toast.success("WhatsApp contact logged");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to log WhatsApp contact"),
  });
}
