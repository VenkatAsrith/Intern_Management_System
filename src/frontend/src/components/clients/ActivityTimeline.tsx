import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAddClientActivity, useClientActivities } from "@/hooks/use-clients";
import { ActivityType } from "@/types/clients";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeftRight,
  Calendar,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Receipt,
  Share2,
  StickyNote,
} from "lucide-react";
import { useState } from "react";

const ACTIVITY_ICONS: Record<
  ActivityType,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  [ActivityType.statusChange]: {
    icon: ArrowLeftRight,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  [ActivityType.noteAdded]: {
    icon: StickyNote,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
  [ActivityType.whatsappMessage]: {
    icon: Phone,
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  [ActivityType.callScheduled]: {
    icon: Phone,
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
  [ActivityType.proposalUploaded]: {
    icon: FileText,
    color: "text-sky-400",
    bg: "bg-sky-500/15",
  },
  [ActivityType.invoiceGenerated]: {
    icon: Receipt,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  [ActivityType.documentShared]: {
    icon: Share2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
  },
  [ActivityType.commentAdded]: {
    icon: MessageCircle,
    color: "text-teal-400",
    bg: "bg-teal-500/15",
  },
  // Extended quick-log activity types (client-side only)
  quickCall: {
    icon: Phone,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  quickMeeting: {
    icon: Calendar,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
  },
  quickEmail: {
    icon: Mail,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
  },
} as Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
>;

interface ActivityTimelineProps {
  clientId: string;
}

export function ActivityTimeline({ clientId }: ActivityTimelineProps) {
  const { data: activities = [], isLoading } = useClientActivities(clientId);
  const addActivity = useAddClientActivity();
  const [noteText, setNoteText] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  async function handleAddNote() {
    if (!noteText.trim()) return;
    await addActivity.mutateAsync({
      clientId,
      activityType: ActivityType.noteAdded,
      description: noteText.trim(),
    });
    setNoteText("");
    setShowAdd(false);
  }

  const sorted = [...activities].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );

  return (
    <div className="space-y-4" data-ocid="client_detail.activity_tab">
      {/* Add Note */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Activity Timeline
        </h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setShowAdd((v) => !v)}
          data-ocid="client_detail.add_note_button"
        >
          <StickyNote className="h-3.5 w-3.5 mr-1.5" />
          Add Note
        </Button>
      </div>

      {showAdd && (
        <div className="rounded-xl bg-card border border-border p-4 space-y-3">
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note about this client interaction..."
            rows={3}
            className="bg-background border-border resize-none"
            data-ocid="client_detail.note_textarea"
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowAdd(false);
                setNoteText("");
              }}
              data-ocid="client_detail.note_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAddNote}
              disabled={addActivity.isPending || !noteText.trim()}
              data-ocid="client_detail.note_submit_button"
            >
              Save Note
            </Button>
          </div>
        </div>
      )}

      {/* Timeline */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 text-center"
          data-ocid="client_detail.activity_empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No activity yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Activity will appear here as you interact with this client.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {sorted.map((activity, idx) => {
              const style =
                ACTIVITY_ICONS[activity.activityType] ??
                ACTIVITY_ICONS[ActivityType.noteAdded];
              const Icon = style.icon;
              const isQuick = [
                "quickCall",
                "quickMeeting",
                "quickEmail",
              ].includes(activity.activityType);
              return (
                <div
                  key={activity.id}
                  className="relative flex gap-4 pl-2"
                  data-ocid={`client_detail.activity_item.${idx + 1}`}
                >
                  <div
                    className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isQuick
                        ? `${style.bg} ring-2 ring-offset-1 ring-offset-background ring-${style.color.replace("text-", "")}/30`
                        : style.bg
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${style.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {isQuick && (
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${style.color} block mb-0.5`}
                          >
                            {activity.activityType === "quickCall"
                              ? "Call Logged"
                              : activity.activityType === "quickMeeting"
                                ? "Meeting Logged"
                                : "Email Logged"}
                          </span>
                        )}
                        <p
                          className={`text-sm leading-snug ${
                            isQuick
                              ? "text-foreground font-medium"
                              : "text-foreground"
                          }`}
                        >
                          {activity.description}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                        {formatDistanceToNow(activity.timestamp, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      by {activity.adminName}
                    </p>
                    {activity.metadata && (
                      <p className="text-xs text-muted-foreground/70 mt-1 italic">
                        {activity.metadata}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
