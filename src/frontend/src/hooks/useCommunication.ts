import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export interface Channel {
  id: string;
  name: string;
  spaceId: string;
  memberIds: string[];
  createdAt: number;
  createdBy: string;
}

export interface ChannelMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  content: string;
  mentions: string[];
  createdAt: number;
}

export interface DirectMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  isRead: boolean;
  createdAt: number;
}

function convertChannel(raw: {
  id: string;
  name: string;
  spaceId: string;
  memberIds: string[];
  createdAt: bigint;
  createdBy: string;
}): Channel {
  return { ...raw, createdAt: Number(raw.createdAt) / 1_000_000 };
}

function convertMessage(raw: {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  content: string;
  mentions: string[];
  createdAt: bigint;
}): ChannelMessage {
  return { ...raw, createdAt: Number(raw.createdAt) / 1_000_000 };
}

function convertDM(raw: {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  isRead: boolean;
  createdAt: bigint;
}): DirectMessage {
  return { ...raw, createdAt: Number(raw.createdAt) / 1_000_000 };
}

export function useChannels() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<Channel[]>({
    queryKey: ["channels"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await (
          actor as unknown as {
            getChannelsForUser: (t: string) => Promise<unknown[]>;
          }
        ).getChannelsForUser(sessionToken);
        return (results as Parameters<typeof convertChannel>[0][]).map(
          convertChannel,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken,
    refetchInterval: 10_000,
  });
}

export function useChannelMessages(channelId: string | null, active: boolean) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qc = useQueryClient();

  const query = useQuery<ChannelMessage[]>({
    queryKey: ["channelMessages", channelId],
    queryFn: async () => {
      if (!actor || !sessionToken || !channelId) return [];
      try {
        const result = await (
          actor as unknown as {
            getChannelMessages: (
              t: string,
              id: string,
            ) => Promise<
              | { __kind__: "ok"; ok: unknown[] }
              | { __kind__: "err"; err: string }
            >;
          }
        ).getChannelMessages(sessionToken, channelId);
        if (result.__kind__ === "err") return [];
        return (result.ok as Parameters<typeof convertMessage>[0][]).map(
          convertMessage,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!channelId,
  });

  useEffect(() => {
    if (!active || !channelId) return;
    intervalRef.current = setInterval(() => {
      qc.invalidateQueries({ queryKey: ["channelMessages", channelId] });
    }, 5_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, channelId, qc]);

  return query;
}

export function useSendMessage() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      channelId,
      content,
      mentions,
    }: {
      channelId: string;
      content: string;
      mentions: string[];
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          sendChannelMessage: (
            t: string,
            cid: string,
            content: string,
            mentions: string[],
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).sendChannelMessage(sessionToken, channelId, content, mentions);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertMessage(result.ok as Parameters<typeof convertMessage>[0]);
    },
    onSuccess: (_, { channelId }) => {
      qc.invalidateQueries({ queryKey: ["channelMessages", channelId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to send message"),
  });
}

export function useCreateChannel() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      spaceId: string;
      memberIds: string[];
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          createChannel: (
            t: string,
            name: string,
            spaceId: string,
            memberIds: string[],
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).createChannel(
        sessionToken,
        payload.name,
        payload.spaceId,
        payload.memberIds,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertChannel(result.ok as Parameters<typeof convertChannel>[0]);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["channels"] });
      toast.success("Channel created");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to create channel"),
  });
}

export function useDirectMessages(peerId: string | null) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<DirectMessage[]>({
    queryKey: ["directMessages", peerId],
    queryFn: async () => {
      if (!actor || !sessionToken || !peerId) return [];
      try {
        const result = await (
          actor as unknown as {
            getDirectMessages: (
              t: string,
              pid: string,
            ) => Promise<
              | { __kind__: "ok"; ok: unknown[] }
              | { __kind__: "err"; err: string }
            >;
          }
        ).getDirectMessages(sessionToken, peerId);
        if (result.__kind__ === "err") return [];
        return (result.ok as Parameters<typeof convertDM>[0][]).map(convertDM);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!peerId,
    refetchInterval: 5_000,
  });
}

export function useSendDirectMessage() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      toUserId,
      content,
    }: { toUserId: string; content: string }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          sendDirectMessage: (
            t: string,
            toId: string,
            content: string,
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).sendDirectMessage(sessionToken, toUserId, content);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertDM(result.ok as Parameters<typeof convertDM>[0]);
    },
    onSuccess: (_, { toUserId }) => {
      qc.invalidateQueries({ queryKey: ["directMessages", toUserId] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to send message"),
  });
}
