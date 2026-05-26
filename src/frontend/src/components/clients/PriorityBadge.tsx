import { PriorityLevel } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { PRIORITY_COLORS, PRIORITY_LABELS } from "@/types/clients";
import { ArrowDown, ArrowRight, ArrowUp, Zap } from "lucide-react";

const PRIORITY_ICONS: Record<
  PriorityLevel,
  React.ComponentType<{ className?: string }>
> = {
  [PriorityLevel.low]: ArrowDown,
  [PriorityLevel.medium]: ArrowRight,
  [PriorityLevel.high]: ArrowUp,
  [PriorityLevel.urgent]: Zap,
};

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: "sm" | "md";
}

export function PriorityBadge({ priority, size = "md" }: PriorityBadgeProps) {
  const colors = PRIORITY_COLORS[priority];
  const Icon = PRIORITY_ICONS[priority];
  return (
    <Badge
      className={`${colors.bg} ${colors.text} ${colors.border} border font-medium ${
        size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}
