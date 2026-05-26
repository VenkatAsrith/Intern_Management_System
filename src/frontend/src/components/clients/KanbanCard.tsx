import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLogQuickActivity } from "@/hooks/use-clients";
import { usePinnedClients } from "@/hooks/use-clients";
import { type Client, PRIORITY_COLORS, PRIORITY_LABELS } from "@/types/clients";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  Flame,
  GripVertical,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Star,
  Thermometer,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";

interface KanbanCardProps {
  client: Client;
  index: number;
  stageKey: string;
  isDragging?: boolean;
  onDragStart: (clientId: string) => void;
  mode?: "compact" | "expanded";
}

// Lead score badge helper
function LeadScoreBadge({ score }: { score: number }) {
  if (score >= 70) {
    return (
      <Badge className="bg-red-500/15 text-red-400 border-red-500/30 border text-[10px] px-1.5 py-0 flex items-center gap-0.5">
        <Flame className="h-2.5 w-2.5" /> {score} Hot
      </Badge>
    );
  }
  if (score >= 40) {
    return (
      <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 border text-[10px] px-1.5 py-0 flex items-center gap-0.5">
        <Thermometer className="h-2.5 w-2.5" /> {score} Warm
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted text-muted-foreground border-border border text-[10px] px-1.5 py-0">
      {score} Cold
    </Badge>
  );
}

export function KanbanCard({
  client,
  index,
  stageKey,
  isDragging,
  onDragStart,
  mode,
}: KanbanCardProps) {
  const navigate = useNavigate();
  const [activityPopoverOpen, setActivityPopoverOpen] = useState(false);
  const { togglePin, isPinned } = usePinnedClients();
  const logActivity = useLogQuickActivity();
  const pinned = isPinned(client.id);

  const now = new Date();
  const isOverdue = client.followUpDate ? client.followUpDate < now : false;
  const overdueDays =
    isOverdue && client.followUpDate
      ? Math.floor(
          (now.getTime() - client.followUpDate.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;
  const pc = PRIORITY_COLORS[client.priorityLevel];

  const lastActivity = client.lastActivityDate || client.updatedAt;
  const daysInactive = Math.floor(
    (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24),
  );
  const isStale = daysInactive >= 7;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const num = client.whatsappNumber || client.phone;
    const cleaned = num.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Hi ${client.contactPersonName}, this is TechMecha Torque reaching out regarding ${client.serviceInterested}. `,
    );
    window.open(
      `https://wa.me/${cleaned}?text=${msg}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePin(client.id);
  };

  const handleLogActivity = (e: React.MouseEvent, activityType: string) => {
    e.preventDefault();
    e.stopPropagation();
    logActivity.mutate({
      clientId: client.id,
      activityType,
      notes: `Quick ${activityType} logged`,
    });
    setActivityPopoverOpen(false);
  };

  // ── COMPACT mode ─────────────────────────────────────────────────────────────
  if (mode === "compact") {
    return (
      <button
        type="button"
        data-ocid={`clients.kanban.${stageKey}.item.${index + 1}`}
        draggable
        onDragStart={() => onDragStart(client.id)}
        onClick={() =>
          navigate({ to: "/clients/$id", params: { id: client.id } })
        }
        className={[
          "w-full text-left rounded-lg border px-3 py-2 cursor-pointer select-none transition-all duration-150",
          isDragging
            ? "opacity-50 border-primary/60 bg-primary/5"
            : "bg-card border-border hover:border-primary/40 hover:-translate-y-0.5",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-2 min-w-0">
          <p className="font-semibold text-foreground text-xs truncate flex-1">
            {client.companyName}
          </p>
          <span className="text-xs font-bold text-primary flex-shrink-0">
            ₹
            {client.dealValue >= 1000
              ? `${(client.dealValue / 1000).toFixed(0)}K`
              : client.dealValue.toLocaleString()}
          </span>
        </div>
        <div className="mt-1">
          <LeadScoreBadge score={client.leadScore} />
        </div>
      </button>
    );
  }

  // ── EXPANDED mode (default) ───────────────────────────────────────────────────
  return (
    <button
      type="button"
      data-ocid={`clients.kanban.${stageKey}.item.${index + 1}`}
      draggable
      onDragStart={() => onDragStart(client.id)}
      onClick={() =>
        navigate({ to: "/clients/$id", params: { id: client.id } })
      }
      className={[
        "group relative w-full text-left rounded-xl border p-3.5 cursor-pointer select-none transition-all duration-150",
        isDragging
          ? "opacity-50 scale-95 rotate-1 border-primary/60 bg-primary/5 shadow-lg shadow-primary/20"
          : "bg-card border-border hover:border-primary/40 hover:bg-card/80 hover:shadow-md hover:shadow-black/20 hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Top-right actions: pin + drag handle */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {/* Quick activity popover */}
        <Popover
          open={activityPopoverOpen}
          onOpenChange={setActivityPopoverOpen}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Log activity"
              data-ocid={`clients.kanban.${stageKey}.log_activity.${index + 1}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActivityPopoverOpen(true);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-40 p-1"
            align="end"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {(
              [
                { label: "Log Call", type: "call", icon: Phone },
                { label: "Log Email", type: "email", icon: Mail },
                { label: "Log Meeting", type: "meeting", icon: Video },
              ] as const
            ).map(({ label, type, icon: Icon }) => (
              <Button
                key={type}
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-xs h-8"
                onClick={(e) => handleLogActivity(e, type)}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Pin button */}
        <button
          type="button"
          aria-label={pinned ? "Unpin client" : "Pin client"}
          data-ocid={`clients.kanban.${stageKey}.pin.${index + 1}`}
          onClick={handlePin}
          className={[
            "transition-opacity p-0.5 rounded hover:bg-muted",
            pinned
              ? "opacity-100 text-amber-400"
              : "opacity-0 group-hover:opacity-60 text-muted-foreground hover:text-amber-400",
          ].join(" ")}
        >
          <Star className={`h-3.5 w-3.5 ${pinned ? "fill-amber-400" : ""}`} />
        </button>

        <div className="opacity-0 group-hover:opacity-40 transition-opacity">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Company name */}
      <p className="font-semibold text-foreground text-sm leading-tight pr-16 truncate">
        {client.companyName}
      </p>

      {/* Contact + designation */}
      <p className="text-xs text-muted-foreground truncate mt-0.5">
        {client.contactPersonName}
        {client.designation ? ` · ${client.designation}` : ""}
      </p>

      {/* Deal value */}
      <p className="text-base font-bold text-primary mt-2">
        ₹{client.dealValue.toLocaleString()}
      </p>

      {/* Badges row: priority + lead score + industry */}
      <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
        <Badge
          className={`${pc.bg} ${pc.text} ${pc.border} border text-[10px] px-1.5 py-0`}
        >
          {PRIORITY_LABELS[client.priorityLevel]}
        </Badge>

        <LeadScoreBadge score={client.leadScore} />

        {client.industryType && (
          <span className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-md truncate max-w-[80px]">
            {client.industryType}
          </span>
        )}
      </div>

      {/* Aging indicator */}
      {isStale && (
        <Badge className="bg-red-500/15 text-red-400 border-red-500/30 border text-[10px] px-1.5 py-0 mt-1.5">
          {daysInactive}d stale
        </Badge>
      )}

      {/* Overdue indicator */}
      {isOverdue && overdueDays > 0 && (
        <Badge
          className="bg-red-500/20 text-red-400 border-red-500/40 border text-[10px] px-1.5 py-0 mt-1 flex items-center gap-0.5 w-fit"
          data-ocid={`clients.kanban.${stageKey}.overdue.${index + 1}`}
        >
          <AlertCircle className="h-2.5 w-2.5" />
          {overdueDays}d overdue
        </Badge>
      )}

      {/* Follow-up date (non-overdue) */}
      {client.followUpDate && !isOverdue && (
        <div className="flex items-center gap-1 mt-2 text-[11px] text-muted-foreground">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            Follow-up ·{" "}
            {client.followUpDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      )}

      {/* Footer: avatar + whatsapp */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border/50">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <User className="h-2.5 w-2.5 text-primary" />
          </div>
          <span className="text-[11px] text-muted-foreground truncate max-w-[90px]">
            {client.assignedTeamMember || "Unassigned"}
          </span>
        </div>

        <button
          type="button"
          aria-label="Open WhatsApp"
          onClick={handleWhatsApp}
          data-ocid={`clients.kanban.${stageKey}.whatsapp.${index + 1}`}
          className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors px-1.5 py-0.5 rounded-md hover:bg-emerald-500/10"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="hidden group-hover:inline">WhatsApp</span>
        </button>
      </div>
    </button>
  );
}
