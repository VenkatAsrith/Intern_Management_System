import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Users } from "lucide-react";

const SAMPLE_CHANNELS = [
  { id: "1", name: "General", space: "Org" },
  { id: "2", name: "Marketing Team", space: "Marketing" },
  { id: "3", name: "Learning Hub", space: "Learning" },
];

const spaceColors: Record<string, string> = {
  Org: "bg-red-500/20 text-red-400 border-red-500/30",
  Marketing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export function CommunicationTab({
  internId,
  internName,
}: {
  internId: string;
  internName: string;
}) {
  // Communication tab shows channel memberships and messaging info.
  // Full DM threading is handled in WorkspacePage.
  return (
    <div className="space-y-5" data-ocid="communication.tab">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">Communication Center</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Channel Memberships", value: 2 },
          { label: "Direct Messages", value: "—" },
          { label: "Mentions", value: "—" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Channel Memberships */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            Channel Memberships
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            data-ocid="communication.add_channel_button"
          >
            <Users className="h-3.5 w-3.5" /> Add to Channel
          </Button>
        </div>
        {SAMPLE_CHANNELS.map((ch) => (
          <div
            key={ch.id}
            className="flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg"
            data-ocid={`communication.channel.${ch.id}`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{ch.name}</span>
              <Badge className={`text-xs border ${spaceColors[ch.space]}`}>
                {ch.space}
              </Badge>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-xs text-muted-foreground hover:text-red-400"
              data-ocid={`communication.remove_channel.${ch.id}`}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* DM Link */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-foreground mb-2">
          Direct Messages
        </p>
        <p className="text-sm text-muted-foreground">
          Full messaging history is available in the{" "}
          <a
            href={`/workspace/${internId}`}
            className="text-primary hover:underline"
            data-ocid="communication.workspace_link"
          >
            {internName}'s Workspace
          </a>
          .
        </p>
      </div>
    </div>
  );
}
