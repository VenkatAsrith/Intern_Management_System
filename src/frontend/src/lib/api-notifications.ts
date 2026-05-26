import {
  type NotificationType as BackendNotificationType,
  createActor,
} from "@/backend";
import type {
  Announcement,
  Notification,
  NotificationType,
} from "@/types/notifications";
import { useActor } from "@caffeineai/core-infrastructure";

export function useNotificationsApi() {
  const { actor } = useActor(createActor);

  return {
    createNotification: async (payload: {
      userId: string;
      notificationType: NotificationType;
      title: string;
      message: string;
      relatedId?: string;
    }): Promise<Notification> => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createNotification({
        ...payload,
        notificationType: payload.notificationType as BackendNotificationType,
      });
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok as Notification;
    },

    listNotifications: async (userId: string): Promise<Notification[]> => {
      if (!actor) throw new Error("Actor not available");
      return (await actor.listNotifications(userId)) as Notification[];
    },

    markAsRead: async (id: string): Promise<void> => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.markAsRead(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },

    markAllAsRead: async (userId: string): Promise<number> => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.markAllAsRead(userId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return Number(result.ok);
    },

    createAnnouncement: async (payload: {
      title: string;
      content: string;
      createdBy: string;
    }): Promise<Announcement> => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createAnnouncement(payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok as Announcement;
    },

    listAnnouncements: async (activeOnly: boolean): Promise<Announcement[]> => {
      if (!actor) throw new Error("Actor not available");
      return (await actor.listAnnouncements(activeOnly)) as Announcement[];
    },

    deleteAnnouncement: async (id: string): Promise<void> => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteAnnouncement(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
  };
}
