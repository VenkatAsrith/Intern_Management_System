import type { ClientStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { STATUS_COLORS, STATUS_LABELS } from "@/types/clients";
import {
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Handshake,
  Pause,
  Phone,
  XCircle,
} from "lucide-react";

const STATUS_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  leadCaptured: Circle,
  contacted: Phone,
  discoveryCallDone: Handshake,
  proposalSent: FileText,
  negotiation: Clock,
  closedWon: CheckCircle2,
  closedLost: XCircle,
  onHold: Pause,
};

interface StatusBadgeProps {
  status: ClientStatus;
  size?: "sm" | "md";
  showIcon?: boolean;
}

export function StatusBadge({
  status,
  size = "md",
  showIcon = false,
}: StatusBadgeProps) {
  const colors = STATUS_COLORS[status];
  const Icon = STATUS_ICONS[status as string];
  return (
    <Badge
      className={`${
        colors.bg
      } ${colors.text} ${colors.border} border font-medium whitespace-nowrap ${
        size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      {showIcon && Icon ? (
        <Icon className="w-3 h-3 mr-1 shrink-0" />
      ) : (
        <span
          className={`w-1.5 h-1.5 rounded-full ${colors.dot} mr-1.5 inline-block shrink-0`}
        />
      )}
      {STATUS_LABELS[status]}
    </Badge>
  );
}
