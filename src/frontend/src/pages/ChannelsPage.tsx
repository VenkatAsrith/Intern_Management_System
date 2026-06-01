import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useInterns } from "@/hooks/use-interns";
import {
  useChannelMessages,
  useChannels,
  useCreateChannel,
  useDirectMessages,
  useSendDirectMessage,
  useSendMessage,
} from "@/hooks/useCommunication";
import { cn } from "@/lib/utils";
import { Hash, MessageCircle, Plus, Send, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SPACE_COLORS: Record<string, string> = {
  org: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  marketing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

function parseMentions(text: string): string[] {
  return Array.from(new Set([...text.matchAll(/@(\w+)/g)].map((m) => m[1])));
}

function highlightMentions(text: string) {
  return text.split(/(@\w+)/g).map((part, i) =>
    part.startsWith("@") ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: static text split, stable order
      <span key={`mention-${part}-${i}`} className="text-primary font-semibold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AvatarInitial({
  name,
  size = "sm",
}: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0",
        size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm",
      )}
    >
      {initials}
    </div>
  );
}

interface CreateChannelModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateChannelModal({ open, onClose }: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [spaceId, setSpaceId] = useState("org");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { data: interns } = useInterns();
  const create = useCreateChannel();

  const toggle = (id: string) =>
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await create.mutateAsync({
      name: name.trim(),
      spaceId,
      memberIds: selectedMembers,
    });
    setName("");
    setSelectedMembers([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Channel Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="#general-questions"
              data-ocid="channel.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Space</Label>
            <select
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground"
              data-ocid="channel.space_select"
            >
              <option value="org">Org</option>
              <option value="marketing">Marketing</option>
              <option value="learning">Learning</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Members</Label>
            <ScrollArea className="h-36 border border-border rounded-md p-2">
              {interns?.map((intern) => (
                <label
                  key={intern.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(intern.id)}
                    onChange={() => toggle(intern.id)}
                    className="accent-primary"
                  />
                  <span className="text-sm">{intern.name}</span>
                </label>
              ))}
            </ScrollArea>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="channel.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!name.trim() || create.isPending}
              onClick={handleSubmit}
              data-ocid="channel.submit_button"
            >
              Create Channel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ActiveView =
  | { type: "channel"; id: string }
  | { type: "dm"; peerId: string; peerName: string };

function ChannelThread({ channelId }: { channelId: string }) {
  const { data: messages, isLoading } = useChannelMessages(channelId, true);
  const send = useSendMessage();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — scroll whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "m" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await send.mutateAsync({
      channelId,
      content: text,
      mentions: parseMentions(text),
    });
  }, [input, channelId, send]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-7 h-7 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ScrollArea className="flex-1 px-4 py-4">
        {messages && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <MessageCircle className="w-10 h-10 mb-2 opacity-30" />
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        )}
        <div className="space-y-3">
          {messages?.map((msg) => (
            <div key={msg.id} className="flex gap-2.5 group">
              <AvatarInitial name={msg.senderName} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {msg.senderName}
                  </span>
                  <span className="notes-timestamp">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mt-0.5">
                  {highlightMentions(msg.content)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>
      <div className="px-4 py-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message… (M to focus, @mention)"
            className="bg-secondary border-border"
            data-ocid="channel.message_input"
          />
          <Button
            type="button"
            size="icon"
            disabled={!input.trim() || send.isPending}
            onClick={() => void handleSend()}
            data-ocid="channel.send_button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DMThread({ peerId, peerName }: { peerId: string; peerName: string }) {
  const { data: messages } = useDirectMessages(peerId);
  const send = useSendDirectMessage();
  const { sessionToken } = useAuth();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Derive current userId from sessionToken for "sent" side detection
  const myId = sessionToken ? sessionToken.split(":")[0] : "";

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — scroll whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await send.mutateAsync({ toUserId: peerId, content: text });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ScrollArea className="flex-1 px-4 py-4">
        {messages && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <MessageCircle className="w-10 h-10 mb-2 opacity-30" />
            <p className="text-sm">Start a conversation with {peerName}</p>
          </div>
        )}
        <div className="space-y-3">
          {messages?.map((msg) => {
            const isMine = msg.fromUserId === myId;
            return (
              <div
                key={msg.id}
                className={cn("flex gap-2.5", isMine && "flex-row-reverse")}
              >
                <AvatarInitial name={isMine ? "Me" : peerName} />
                <div
                  className={cn(
                    "min-w-0 max-w-xs",
                    isMine && "items-end flex flex-col",
                  )}
                >
                  <div
                    className={cn(
                      "px-3 py-2 rounded-xl text-sm",
                      isMine
                        ? "bg-primary/20 text-foreground rounded-tr-sm"
                        : "bg-secondary rounded-tl-sm",
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="notes-timestamp mt-0.5">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>
      <div className="px-4 py-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            placeholder={`Message ${peerName}…`}
            className="bg-secondary border-border"
            data-ocid="channel.dm_input"
          />
          <Button
            type="button"
            size="icon"
            disabled={!input.trim() || send.isPending}
            onClick={() => void handleSend()}
            data-ocid="channel.dm_send_button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChannelsPage() {
  const { data: channels, isLoading } = useChannels();
  const { data: interns } = useInterns();
  const { isAdmin, displayName } = useAuth();
  const admin = isAdmin();
  const [active, setActive] = useState<ActiveView | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const activeChannel =
    active?.type === "channel"
      ? channels?.find((c) => c.id === active.id)
      : null;

  const dmPeers = admin
    ? (interns?.map((i) => ({ id: i.id, name: i.name })) ?? [])
    : [];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left sidebar */}
      <aside className="channel-sidebar w-60 shrink-0 flex flex-col">
        <div className="px-3 pt-4 pb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Channels
          </span>
          {admin && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setCreateOpen(true)}
              data-ocid="channel.create_open_modal_button"
            >
              <Plus className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="px-3 space-y-1">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 rounded" />
            ))}
          </div>
        ) : channels && channels.length === 0 ? (
          <div
            className="px-4 py-6 text-center text-muted-foreground text-xs"
            data-ocid="channel.empty_state"
          >
            You haven't been added to any channels yet
          </div>
        ) : (
          <div className="px-2 space-y-0.5">
            {channels?.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActive({ type: "channel", id: ch.id })}
                className={cn(
                  "channel-item w-full text-left flex items-center gap-2",
                  active?.type === "channel" &&
                    active.id === ch.id &&
                    "bg-card text-foreground",
                )}
                data-ocid={`channel.item.${idx + 1}`}
              >
                <Hash className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="truncate flex-1">{ch.name}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[9px] px-1 py-0 border",
                    SPACE_COLORS[ch.spaceId.toLowerCase()] ??
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {ch.spaceId}
                </Badge>
              </button>
            ))}
          </div>
        )}

        {/* DMs section (admin only — they can DM any intern) */}
        {admin && dmPeers.length > 0 && (
          <>
            <div className="px-3 pt-4 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Direct Messages
              </span>
            </div>
            <div className="px-2 space-y-0.5">
              {dmPeers.map((peer, idx) => (
                <button
                  key={peer.id}
                  type="button"
                  onClick={() =>
                    setActive({
                      type: "dm",
                      peerId: peer.id,
                      peerName: peer.name,
                    })
                  }
                  className={cn(
                    "channel-item w-full text-left flex items-center gap-2",
                    active?.type === "dm" &&
                      active.peerId === peer.id &&
                      "bg-card text-foreground",
                  )}
                  data-ocid={`channel.dm.item.${idx + 1}`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{peer.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Interns only see DMs with admins */}
        {!admin && displayName && (
          <>
            <div className="px-3 pt-4 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Direct Messages
              </span>
            </div>
            <div className="px-2 space-y-0.5">
              {["Venkat Asrith", "Jay Chandra"].map((adminName, idx) => (
                <button
                  key={adminName}
                  type="button"
                  onClick={() =>
                    setActive({
                      type: "dm",
                      peerId: adminName.replace(" ", "_").toLowerCase(),
                      peerName: adminName,
                    })
                  }
                  className={cn(
                    "channel-item w-full text-left flex items-center gap-2",
                    active?.type === "dm" &&
                      active.peerName === adminName &&
                      "bg-card text-foreground",
                  )}
                  data-ocid={`channel.dm.admin.${idx + 1}`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{adminName}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* Right content */}
      <div className="flex flex-col flex-1 min-w-0 bg-background">
        {active === null ? (
          <div
            className="flex flex-col items-center justify-center h-full text-muted-foreground"
            data-ocid="channel.no_selection_state"
          >
            <Users className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">Select a channel or conversation</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card shrink-0">
              {active.type === "channel" ? (
                <>
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">
                    {activeChannel?.name ?? "Channel"}
                  </span>
                  {activeChannel && (
                    <Badge variant="outline" className="text-xs">
                      {activeChannel.memberIds.length} members
                    </Badge>
                  )}
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">
                    {(active as { peerName: string }).peerName}
                  </span>
                </>
              )}
            </div>
            {active.type === "channel" ? (
              <ChannelThread channelId={active.id} />
            ) : (
              <DMThread
                peerId={(active as { peerId: string }).peerId}
                peerName={(active as { peerName: string }).peerName}
              />
            )}
          </>
        )}
      </div>

      <CreateChannelModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
}
