import { useBackend } from "@/lib/backend";
import type { Announcement, Notification } from "@/types/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function convertNotification(raw: {
  id: string;
  userId: string;
  notificationType: string;
  title: string;
  message: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: bigint;
}): Notification {
  return {
    id: raw.id,
    userId: raw.userId,
    notificationType: raw.notificationType as Notification["notificationType"],
    title: raw.title,
    message: raw.message,
    isRead: raw.isRead,
    relatedId: raw.relatedId ?? null,
    createdAt: raw.createdAt,
  };
}

function convertAnnouncement(raw: {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: bigint;
  isActive: boolean;
}): Announcement {
  return {
    id: raw.id,
    title: raw.title,
    content: raw.content,
    createdBy: raw.createdBy,
    createdAt: raw.createdAt,
    isActive: raw.isActive,
  };
}

export function useNotifications(userId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const results = await actor.listNotifications(userId);
      return results.map(convertNotification);
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 30_000,
  });
}

export function useUnreadNotificationCount(userId: string | null | undefined) {
  const { data } = useNotifications(userId);
  return data?.filter((n) => !n.isRead).length ?? 0;
}

export function useMarkAsRead() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markAsRead(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to mark as read"),
  });
}

export function useMarkAllAsRead() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markAllAsRead(userId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return Number(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to mark all as read"),
  });
}

export function useAnnouncements(activeOnly = true) {
  const { actor, isFetching } = useBackend();
  return useQuery<Announcement[]>({
    queryKey: ["announcements", activeOnly],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listAnnouncements(activeOnly);
      return results.map(convertAnnouncement);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60_000,
  });
}

export function useCreateAnnouncement() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      content: string;
      createdBy: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createAnnouncement(payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertAnnouncement(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement posted");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to post announcement"),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteAnnouncement(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement deleted");
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to delete announcement"),
  });
}
