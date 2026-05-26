import type { InvoicePaymentStatus } from "@/backend";
import { useBackend } from "@/lib/backend";
import {
  type AdvancedClientFilters,
  type AnalyticsData,
  type Client,
  type ClientActivity,
  type ClientAnalytics,
  type ClientComment,
  type ClientStatus,
  type ContactPerson,
  type CreateClientRequest,
  type Invoice,
  type PaymentStatus,
  type SavedFilter,
  type UpdateClientRequest,
  toFrontendClient,
  toFrontendClientActivity,
  toFrontendClientAnalytics,
  toFrontendClientComment,
  toFrontendInvoice,
} from "@/types/clients";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ─── Queries ─────────────────────────────────────────────────────────────────

export function useClients() {
  const { actor, isFetching } = useBackend();
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listClients();
      return results.map(toFrontendClient);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClient(id: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Client | null>({
    queryKey: ["client", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const result = await actor.getClient(id);
      if (result.__kind__ === "err") return null;
      return toFrontendClient(result.ok);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useClientActivities(clientId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<ClientActivity[]>({
    queryKey: ["clientActivities", clientId],
    queryFn: async () => {
      if (!actor || !clientId) return [];
      const results = await actor.getClientActivities(clientId);
      return results.map(toFrontendClientActivity);
    },
    enabled: !!actor && !isFetching && !!clientId,
  });
}

export function useClientComments(clientId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<ClientComment[]>({
    queryKey: ["clientComments", clientId],
    queryFn: async () => {
      if (!actor || !clientId) return [];
      const results = await actor.getClientComments(clientId);
      return results.map(toFrontendClientComment);
    },
    enabled: !!actor && !isFetching && !!clientId,
  });
}

export function useClientInvoices(clientId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Invoice[]>({
    queryKey: ["clientInvoices", clientId],
    queryFn: async () => {
      if (!actor || !clientId) return [];
      const results = await actor.getClientInvoices(clientId);
      return results.map(toFrontendInvoice);
    },
    enabled: !!actor && !isFetching && !!clientId,
  });
}

export function useClientAnalytics() {
  const { actor, isFetching } = useBackend();
  return useQuery<ClientAnalytics>({
    queryKey: ["clientAnalytics"],
    queryFn: async () => {
      if (!actor)
        return {
          totalClients: 0,
          activeLeads: 0,
          approvedDeals: 0,
          rejectedLeads: 0,
          revenuePipeline: 0,
          monthlyData: [],
        };
      const result = await actor.getClientAnalytics();
      return toFrontendClientAnalytics(result);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateClient() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateClientRequest) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createClient(req);
      if (result.__kind__ === "err") throw new Error(result.err);
      return toFrontendClient(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["clientAnalytics"] });
      toast.success("Client created successfully");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to create client"),
  });
}

export function useUpdateClient() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      req,
    }: { id: string; req: UpdateClientRequest }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateClient(id, req);
      if (result.__kind__ === "err") throw new Error(result.err);
      return toFrontendClient(result.ok);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["client", id] });
      toast.success("Client updated successfully");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to update client"),
  });
}

export function useDeleteClient() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteClient(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["clientAnalytics"] });
      toast.success("Client deleted");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to delete client"),
  });
}

export function useUpdateClientStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      note,
    }: { id: string; status: ClientStatus; note: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateClientStatus(id, status, note);
      if (result.__kind__ === "err") throw new Error(result.err);
      return toFrontendClient(result.ok);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["client", id] });
      qc.invalidateQueries({ queryKey: ["clientActivities", id] });
      qc.invalidateQueries({ queryKey: ["clientAnalytics"] });
      toast.success("Status updated");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to update status"),
  });
}

export function useAddClientActivity() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      activityType,
      description,
      metadata,
    }: {
      clientId: string;
      activityType: string;
      description: string;
      metadata?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await actor.addClientActivity(
        clientId,
        activityType as any,
        description,
        metadata ?? null,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return toFrontendClientActivity(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["clientActivities", data.clientId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to add activity"),
  });
}

export function useAddClientComment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      content,
      parentId,
    }: {
      clientId: string;
      content: string;
      parentId?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addClientComment(
        clientId,
        content,
        parentId ?? null,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return toFrontendClientComment(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["clientComments", data.clientId] });
      qc.invalidateQueries({ queryKey: ["clientActivities", data.clientId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to add comment"),
  });
}

export function useUpdateClientComment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      content,
      clientId,
    }: {
      commentId: string;
      content: string;
      clientId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateClientComment(commentId, content);
      if (result.__kind__ === "err") throw new Error(result.err);
      return { comment: toFrontendClientComment(result.ok), clientId };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["clientComments", clientId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to update comment"),
  });
}

export function useDeleteClientComment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      clientId,
    }: { commentId: string; clientId: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteClientComment(commentId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return { commentId, clientId };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["clientComments", clientId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to delete comment"),
  });
}

export function usePinClientComment() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      isPinned,
      clientId,
    }: {
      commentId: string;
      isPinned: boolean;
      clientId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.pinClientComment(commentId, isPinned);
      if (result.__kind__ === "err") throw new Error(result.err);
      return { comment: toFrontendClientComment(result.ok), clientId };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["clientComments", clientId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to pin comment"),
  });
}

export function useCreateInvoice() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      lineItems,
      tax,
      notes,
    }: {
      clientId: string;
      lineItems: Array<{
        description: string;
        quantity: number;
        rate: number;
        amount: number;
      }>;
      tax: number;
      notes?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createInvoice(
        clientId,
        lineItems,
        tax,
        notes ?? null,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return toFrontendInvoice(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["clientInvoices", data.clientId] });
      qc.invalidateQueries({ queryKey: ["clientActivities", data.clientId] });
      toast.success(`Invoice ${data.invoiceNumber} created`);
    },
    onError: (e: Error) => toast.error(e.message || "Failed to create invoice"),
  });
}

export function useUpdateInvoiceStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      invoiceId,
      status,
      clientId,
    }: {
      invoiceId: string;
      status: InvoicePaymentStatus;
      clientId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateInvoiceStatus(
        clientId,
        invoiceId,
        status,
        null,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return { invoice: toFrontendInvoice(result.ok), clientId };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["clientInvoices", clientId] });
      toast.success("Invoice status updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update invoice status"),
  });
}

// ─── Contact management ───────────────────────────────────────────────────────

export function useAddContact() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      contact,
    }: { clientId: string; contact: ContactPerson }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).addContact(clientId, contact);
      if (result.__kind__ === "err") throw new Error(result.err);
      return {
        client: toFrontendClient(
          result.ok as Parameters<typeof toFrontendClient>[0],
        ),
        clientId,
      };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      qc.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Contact added");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to add contact"),
  });
}

export function useUpdateContact() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      contactId,
      contact,
    }: { clientId: string; contactId: string; contact: ContactPerson }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).updateContact(clientId, contactId, contact);
      if (result.__kind__ === "err") throw new Error(result.err);
      return {
        client: toFrontendClient(
          result.ok as Parameters<typeof toFrontendClient>[0],
        ),
        clientId,
      };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      qc.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Contact updated");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to update contact"),
  });
}

export function useRemoveContact() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      contactId,
    }: { clientId: string; contactId: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).removeContact(clientId, contactId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return clientId;
    },
    onSuccess: (clientId) => {
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      qc.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Contact removed");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to remove contact"),
  });
}

// ─── Quick activity logging ───────────────────────────────────────────────────

export function useLogQuickActivity() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      activityType,
      notes,
    }: { clientId: string; activityType: string; notes: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).logQuickActivity(clientId, activityType, notes);
      if (result.__kind__ === "err") throw new Error(result.err);
      return clientId;
    },
    onSuccess: (clientId) => {
      qc.invalidateQueries({ queryKey: ["clientActivities", clientId] });
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      toast.success("Activity logged");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to log activity"),
  });
}

// ─── Proposal management ──────────────────────────────────────────────────────

export function useUpdateProposalStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      status,
      version,
    }: { clientId: string; status: string; version: bigint }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).updateProposalStatus(clientId, status, version);
      if (result.__kind__ === "err") throw new Error(result.err);
      return {
        client: toFrontendClient(
          result.ok as Parameters<typeof toFrontendClient>[0],
        ),
        clientId,
      };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      qc.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Proposal status updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update proposal status"),
  });
}

export function useCaptureWonLostReason() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      reason,
    }: { clientId: string; reason: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).captureWonLostReason(clientId, reason);
      if (result.__kind__ === "err") throw new Error(result.err);
      return {
        client: toFrontendClient(
          result.ok as Parameters<typeof toFrontendClient>[0],
        ),
        clientId,
      };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      qc.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Reason captured");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to capture reason"),
  });
}

// ─── Enhanced invoice status (with amountPaid) ────────────────────────────────

export function useUpdateInvoiceStatusV2() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      invoiceId,
      status,
      amountPaid,
    }: {
      clientId: string;
      invoiceId: string;
      status: InvoicePaymentStatus;
      amountPaid?: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as Record<
          string,
          (
            ...args: unknown[]
          ) => Promise<{ __kind__: string; ok?: unknown; err?: string }>
        >
      ).updateInvoiceStatus(invoiceId, status, amountPaid ?? null);
      if (result.__kind__ === "err") throw new Error(result.err);
      return {
        invoice: toFrontendInvoice(
          result.ok as Parameters<typeof toFrontendInvoice>[0],
        ),
        clientId,
      };
    },
    onSuccess: ({ clientId }) => {
      qc.invalidateQueries({ queryKey: ["clientInvoices", clientId] });
      toast.success("Invoice status updated");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to update invoice status"),
  });
}

// ─── Analytics queries ────────────────────────────────────────────────────────

export function useAnalyticsDashboard() {
  const { actor, isFetching } = useBackend();
  return useQuery<AnalyticsData>({
    queryKey: ["analyticsDashboard"],
    queryFn: async () => {
      if (!actor)
        return {
          totalPipeline: 0,
          weightedForecast: 0,
          winRate: 0,
          avgDealCycleDays: 0,
          conversionRates: [],
          wonLostBreakdown: [],
        };
      const result = await (
        actor as unknown as Record<string, () => Promise<unknown>>
      ).getAnalyticsDashboard();
      const r = result as Record<string, unknown>;
      return {
        totalPipeline: Number(r.totalPipeline ?? 0),
        weightedForecast: Number(r.weightedForecast ?? 0),
        winRate: Number(r.winRate ?? 0),
        avgDealCycleDays: Number(r.avgDealCycleDays ?? 0),
        conversionRates: Array.isArray(r.conversionRates)
          ? (r.conversionRates as [string, bigint][]).map(
              ([s, n]) => [s, Number(n)] as [string, number],
            )
          : [],
        wonLostBreakdown: Array.isArray(r.wonLostBreakdown)
          ? (r.wonLostBreakdown as [string, bigint][]).map(
              ([s, n]) => [s, Number(n)] as [string, number],
            )
          : [],
      };
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCRMFunnelData() {
  const { actor, isFetching } = useBackend();
  return useQuery<[string, number][]>({
    queryKey: ["crmFunnelData"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await (
        actor as unknown as Record<string, () => Promise<unknown>>
      ).getCRMFunnelData();
      return (result as [string, bigint][]).map(([s, n]) => [s, Number(n)]);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWinRateByMember() {
  const { actor, isFetching } = useBackend();
  return useQuery<[string, number, number][]>({
    queryKey: ["winRateByMember"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await (
        actor as unknown as Record<string, () => Promise<unknown>>
      ).getWinRateByMember();
      return (result as [string, bigint, bigint][]).map(([s, a, b]) => [
        s,
        Number(a),
        Number(b),
      ]);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDealCycleTime() {
  const { actor, isFetching } = useBackend();
  return useQuery<number>({
    queryKey: ["dealCycleTime"],
    queryFn: async () => {
      if (!actor) return 0;
      const result = await (
        actor as unknown as Record<string, () => Promise<unknown>>
      ).getDealCycleTime();
      return Number(result as bigint);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLostDealAnalysis() {
  const { actor, isFetching } = useBackend();
  return useQuery<[string, number, number][]>({
    queryKey: ["lostDealAnalysis"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await (
        actor as unknown as Record<string, () => Promise<unknown>>
      ).getLostDealAnalysis();
      return (result as [string, bigint, bigint][]).map(([s, a, b]) => [
        s,
        Number(a),
        Number(b),
      ]);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── localStorage-backed preference hooks ────────────────────────────────────

export function useSavedFilters() {
  const [filters, setFiltersState] = useState<SavedFilter[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("crm-saved-filters") ?? "[]",
      ) as SavedFilter[];
    } catch {
      return [];
    }
  });

  const saveFilter = useCallback(
    (name: string, filterDef: AdvancedClientFilters) => {
      const entry: SavedFilter = {
        id: `filter-${Date.now()}`,
        name,
        filters: filterDef,
        createdAt: Date.now(),
      };
      setFiltersState((prev) => {
        const next = [...prev, entry];
        localStorage.setItem("crm-saved-filters", JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const deleteFilter = useCallback((id: string) => {
    setFiltersState((prev) => {
      const next = prev.filter((f) => f.id !== id);
      localStorage.setItem("crm-saved-filters", JSON.stringify(next));
      return next;
    });
  }, []);

  return { filters, saveFilter, deleteFilter };
}

export function usePinnedClients() {
  const [pinned, setPinnedState] = useState<string[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("crm-pinned-clients") ?? "[]",
      ) as string[];
    } catch {
      return [];
    }
  });

  const togglePin = useCallback((id: string) => {
    setPinnedState((prev) => {
      const next = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id];
      localStorage.setItem("crm-pinned-clients", JSON.stringify(next));
      return next;
    });
  }, []);

  const isPinned = useCallback((id: string) => pinned.includes(id), [pinned]);

  return { pinned, togglePin, isPinned };
}

export function useRecentlyViewedClients() {
  const [recent, setRecentState] = useState<string[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("crm-recently-viewed") ?? "[]",
      ) as string[];
    } catch {
      return [];
    }
  });

  const addRecent = useCallback((id: string) => {
    setRecentState((prev) => {
      const next = [id, ...prev.filter((r) => r !== id)].slice(0, 5);
      localStorage.setItem("crm-recently-viewed", JSON.stringify(next));
      return next;
    });
  }, []);

  return { recent, addRecent };
}

export function useColumnVisibility() {
  const [columns, setColumnsState] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("crm-column-visibility") ?? "{}",
      ) as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  const setColumnVisibility = useCallback((key: string, visible: boolean) => {
    setColumnsState((prev) => {
      const next = { ...prev, [key]: visible };
      localStorage.setItem("crm-column-visibility", JSON.stringify(next));
      return next;
    });
  }, []);

  const resetColumns = useCallback(() => {
    setColumnsState({});
    localStorage.removeItem("crm-column-visibility");
  }, []);

  return { columns, setColumnVisibility, resetColumns };
}

export interface OnboardingItem {
  id: string;
  label: string;
  done: boolean;
}

const DEFAULT_ONBOARDING_ITEMS: Omit<OnboardingItem, "done">[] = [
  { id: "add_client", label: "Add your first client" },
  { id: "update_status", label: "Move a client through the pipeline" },
  { id: "add_comment", label: "Add a comment or note to a client" },
  { id: "create_invoice", label: "Generate an invoice" },
  { id: "log_activity", label: "Log a call or meeting" },
];

export function useOnboardingChecklist() {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("crm-onboarding") ?? "{}",
      ) as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  const items: OnboardingItem[] = DEFAULT_ONBOARDING_ITEMS.map((item) => ({
    ...item,
    done: state[item.id] ?? false,
  }));

  const completed = items.filter((i) => i.done).length;
  const isAllDone = items.every((i) => i.done);

  const markDone = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, [id]: true };
      localStorage.setItem("crm-onboarding", JSON.stringify(next));
      return next;
    });
  }, []);

  return { completed, items, markDone, isAllDone };
}

export function useKanbanViewMode() {
  const [mode, setModeState] = useState<"compact" | "expanded">(() => {
    return (
      (localStorage.getItem("crm-kanban-view-mode") as
        | "compact"
        | "expanded") ?? "expanded"
    );
  });

  const setMode = useCallback((m: "compact" | "expanded") => {
    setModeState(m);
    localStorage.setItem("crm-kanban-view-mode", m);
  }, []);

  return { mode, setMode };
}
