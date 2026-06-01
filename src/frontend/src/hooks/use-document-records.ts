import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface DocumentVersion {
  version: string;
  generatedBy: string;
  generatedAt: number;
  notes: string;
}

export interface DocumentRecord {
  id: string;
  internId: string;
  docType: string;
  category: "employment" | "progress" | "certificate" | "project";
  fileName: string;
  approvalStatus: "pending" | "approved" | "rejected" | "not_generated";
  currentVersion: string;
  generatedDate: string;
  isArchived: boolean;
  versions: DocumentVersion[];
}

function convertDocRecord(raw: {
  id: string;
  internId: string;
  docType: string;
  category: string;
  fileName: string;
  approvalStatus: string;
  currentVersion: string;
  generatedDate: string;
  isArchived: boolean;
  versions: Array<{
    version: string;
    generatedBy: string;
    generatedAt: bigint;
    notes: string;
  }>;
}): DocumentRecord {
  return {
    id: raw.id,
    internId: raw.internId,
    docType: raw.docType,
    category: raw.category as DocumentRecord["category"],
    fileName: raw.fileName,
    approvalStatus: raw.approvalStatus as DocumentRecord["approvalStatus"],
    currentVersion: raw.currentVersion,
    generatedDate: raw.generatedDate,
    isArchived: raw.isArchived,
    versions: raw.versions.map((v) => ({
      version: v.version,
      generatedBy: v.generatedBy,
      generatedAt: Number(v.generatedAt) / 1_000_000,
      notes: v.notes,
    })),
  };
}

type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

export function useDocumentRecords(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<DocumentRecord[]>({
    queryKey: ["documentRecords", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return [];
      try {
        const results = (await (
          actor as unknown as AnyActor
        ).getDocumentsByIntern(sessionToken, internId)) as Parameters<
          typeof convertDocRecord
        >[0][];
        return results.map(convertDocRecord);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId,
  });
}

export function useArchiveDocument() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      docId,
      internId,
    }: { docId: string; internId: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = (await (actor as unknown as AnyActor).archiveDocument(
        sessionToken,
        docId,
      )) as { __kind__: string; err?: string };
      if (result.__kind__ === "err") throw new Error(result.err);
      return { docId, internId };
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["documentRecords", internId] });
      toast.success("Document archived");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to archive"),
  });
}

export function useDeleteDocumentRecord() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      docId,
      internId,
    }: { docId: string; internId: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = (await (actor as unknown as AnyActor).deleteDocument(
        sessionToken,
        docId,
      )) as { __kind__: string; err?: string };
      if (result.__kind__ === "err") throw new Error(result.err);
      return { docId, internId };
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["documentRecords", internId] });
      toast.success("Document deleted");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to delete"),
  });
}

export function useUpdateDocumentApproval() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      docId,
      status,
      internId,
    }: { docId: string; status: string; internId: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = (await (
        actor as unknown as AnyActor
      ).updateDocumentApproval(sessionToken, docId, status)) as {
        __kind__: string;
        err?: string;
      };
      if (result.__kind__ === "err") throw new Error(result.err);
      return { docId, internId };
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["documentRecords", internId] });
      toast.success("Approval status updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update approval"),
  });
}
