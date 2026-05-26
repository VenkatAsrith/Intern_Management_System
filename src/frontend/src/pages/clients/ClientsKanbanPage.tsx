import { KanbanCard } from "@/components/clients/KanbanCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useClients,
  useKanbanViewMode,
  useUpdateClient,
  useUpdateClientStatus,
} from "@/hooks/use-clients";
import {
  ClientStatus,
  PriorityLevel,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/types/clients";
import type { Client, ClientStatus as ClientStatusType } from "@/types/clients";
import { useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronDown,
  Filter,
  KanbanSquare,
  LayoutList,
  Maximize2,
  Minimize2,
  Plus,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

const PIPELINE_STAGES: ClientStatusType[] = [
  ClientStatus.leadCaptured,
  ClientStatus.contacted,
  ClientStatus.discoveryCallDone,
  ClientStatus.proposalSent,
  ClientStatus.negotiation,
  ClientStatus.closedWon,
  ClientStatus.closedLost,
  ClientStatus.onHold,
];

const STAGE_ICONS: Record<ClientStatusType, string> = {
  [ClientStatus.leadCaptured]: "📥",
  [ClientStatus.contacted]: "💬",
  [ClientStatus.discoveryCallDone]: "🤝",
  [ClientStatus.proposalSent]: "📄",
  [ClientStatus.negotiation]: "⚡",
  [ClientStatus.closedWon]: "✅",
  [ClientStatus.closedLost]: "❌",
  [ClientStatus.onHold]: "⏸️",
};

const STAGE_PROBABILITY: Record<ClientStatusType, number> = {
  [ClientStatus.leadCaptured]: 10,
  [ClientStatus.contacted]: 20,
  [ClientStatus.discoveryCallDone]: 35,
  [ClientStatus.proposalSent]: 55,
  [ClientStatus.negotiation]: 75,
  [ClientStatus.closedWon]: 100,
  [ClientStatus.closedLost]: 0,
  [ClientStatus.onHold]: 20,
};

const PRIORITY_OPTIONS: { value: PriorityLevel; label: string }[] = [
  { value: PriorityLevel.urgent, label: "Urgent" },
  { value: PriorityLevel.high, label: "High" },
  { value: PriorityLevel.medium, label: "Medium" },
  { value: PriorityLevel.low, label: "Low" },
];

function formatCurrency(value: number) {
  if (value >= 10_00_000) return `₹${(value / 10_00_000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value.toLocaleString()}`;
}

export default function ClientsKanbanPage() {
  const navigate = useNavigate();
  const { data: clients, isLoading } = useClients();
  const updateStatus = useUpdateClientStatus();
  const { mode, setMode } = useKanbanViewMode();

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<ClientStatusType | null>(
    null,
  );
  const dragCounterRef = useRef<Record<string, number>>({});
  const [closureModal, setClosureModal] = useState<{
    clientId: string;
    targetStage: ClientStatusType;
  } | null>(null);
  const [closureReason, setClosureReason] = useState("");
  const updateClient = useUpdateClient();

  // Filters
  const [filterAssigned, setFilterAssigned] = useState<string>("all");
  const [filterPriorities, setFilterPriorities] = useState<Set<PriorityLevel>>(
    new Set(),
  );
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const assigneeOptions = useMemo(() => {
    const seen = new Set<string>();
    for (const c of clients ?? []) {
      if (c.assignedTeamMember) seen.add(c.assignedTeamMember);
    }
    return Array.from(seen).sort();
  }, [clients]);

  const activeFilterCount =
    (filterAssigned !== "all" ? 1 : 0) + (filterPriorities.size > 0 ? 1 : 0);

  const filteredClients = useMemo(() => {
    return (clients ?? []).filter((c) => {
      if (filterAssigned !== "all" && c.assignedTeamMember !== filterAssigned)
        return false;
      if (filterPriorities.size > 0 && !filterPriorities.has(c.priorityLevel))
        return false;
      return true;
    });
  }, [clients, filterAssigned, filterPriorities]);

  const byStatus = useCallback(
    (status: ClientStatusType): Client[] =>
      filteredClients.filter((c) => c.currentStatus === status),
    [filteredClients],
  );

  const totalDealValue = (clients ?? []).reduce((s, c) => s + c.dealValue, 0);

  const handleDragStart = useCallback((clientId: string) => {
    setDraggingId(clientId);
  }, []);

  const handleDragEnter = useCallback(
    (stage: ClientStatusType, e: React.DragEvent) => {
      e.preventDefault();
      dragCounterRef.current[stage] = (dragCounterRef.current[stage] ?? 0) + 1;
      setDragOverStage(stage);
    },
    [],
  );

  const handleDragLeave = useCallback((stage: ClientStatusType) => {
    dragCounterRef.current[stage] = Math.max(
      (dragCounterRef.current[stage] ?? 1) - 1,
      0,
    );
    if (dragCounterRef.current[stage] === 0) {
      setDragOverStage((prev) => (prev === stage ? null : prev));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (targetStage: ClientStatusType) => {
      dragCounterRef.current[targetStage] = 0;
      setDragOverStage(null);
      if (!draggingId) return;
      const client = (clients ?? []).find((c) => c.id === draggingId);
      if (!client || client.currentStatus === targetStage) {
        setDraggingId(null);
        return;
      }
      if (
        targetStage === ClientStatus.closedWon ||
        targetStage === ClientStatus.closedLost
      ) {
        setClosureModal({ clientId: draggingId, targetStage });
        setDraggingId(null);
        return;
      }
      updateStatus.mutate({
        id: draggingId,
        status: targetStage,
        note: `Moved to ${STATUS_LABELS[targetStage]}`,
      });
      setDraggingId(null);
    },
    [draggingId, clients, updateStatus],
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverStage(null);
    dragCounterRef.current = {};
  }, []);

  async function confirmClosure() {
    if (!closureModal) return;
    const { clientId, targetStage } = closureModal;
    await updateStatus.mutateAsync({
      id: clientId,
      status: targetStage,
      note: closureReason.trim() || `Moved to ${STATUS_LABELS[targetStage]}`,
    });
    if (closureReason.trim()) {
      await updateClient.mutateAsync({
        id: clientId,
        req: { closedReason: closureReason.trim() } as any,
      });
    }
    setClosureModal(null);
    setClosureReason("");
  }

  function togglePriority(p: PriorityLevel) {
    setFilterPriorities((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  }

  return (
    <div
      className="flex flex-col h-full min-h-0"
      data-ocid="clients.kanban.page"
      onDragEnd={handleDragEnd}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <KanbanSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Pipeline Board
              </h1>
              <p className="text-xs text-muted-foreground">
                {(clients ?? []).length} clients{" · "}
                <span className="text-primary font-medium">
                  {formatCurrency(totalDealValue)}
                </span>
                {" total pipeline"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Compact/Expanded toggle */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-border gap-1.5"
              onClick={() =>
                setMode(mode === "compact" ? "expanded" : "compact")
              }
              data-ocid="clients.kanban.view_mode_toggle"
            >
              {mode === "compact" ? (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  Expanded
                </>
              ) : (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  Compact
                </>
              )}
            </Button>

            {/* Filters dropdown */}
            <DropdownMenu
              open={filterPanelOpen}
              onOpenChange={setFilterPanelOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-border gap-1.5 relative"
                  data-ocid="clients.kanban.filter_button"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                  <ChevronDown className="h-3 w-3 ml-0.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-card border-border"
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Assigned To
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={filterAssigned === "all"}
                  onCheckedChange={() => setFilterAssigned("all")}
                  className="text-sm"
                >
                  All members
                </DropdownMenuCheckboxItem>
                {assigneeOptions.map((name) => (
                  <DropdownMenuCheckboxItem
                    key={name}
                    checked={filterAssigned === name}
                    onCheckedChange={() =>
                      setFilterAssigned(filterAssigned === name ? "all" : name)
                    }
                    className="text-sm"
                  >
                    {name}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Priority
                </DropdownMenuLabel>
                {PRIORITY_OPTIONS.map(({ value, label }) => (
                  <DropdownMenuCheckboxItem
                    key={value}
                    checked={filterPriorities.has(value)}
                    onCheckedChange={() => togglePriority(value)}
                    className="text-sm"
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
                {activeFilterCount > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <button
                      type="button"
                      className="w-full text-left text-xs px-2 py-1.5 text-primary hover:bg-primary/10 rounded"
                      onClick={() => {
                        setFilterAssigned("all");
                        setFilterPriorities(new Set());
                      }}
                      data-ocid="clients.kanban.clear_filters_button"
                    >
                      Clear all filters
                    </button>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View toggles */}
            <div className="flex items-center rounded-lg border border-border bg-card p-0.5 gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: "/clients" })}
                data-ocid="clients.kanban.view_table_toggle"
              >
                <LayoutList className="h-3.5 w-3.5 mr-1" />
                Table
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-xs bg-primary/15 text-primary hover:bg-primary/20"
                data-ocid="clients.kanban.view_kanban_toggle"
              >
                <KanbanSquare className="h-3.5 w-3.5 mr-1" />
                Kanban
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: "/clients/calendar" })}
                data-ocid="clients.kanban.view_calendar_toggle"
              >
                <CalendarDays className="h-3.5 w-3.5 mr-1" />
                Calendar
              </Button>
            </div>

            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 gap-1.5 h-8 px-3 text-xs"
              onClick={() => navigate({ to: "/clients" })}
              data-ocid="clients.kanban.add_button"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Active filters summary pills */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Filters:</span>
            {filterAssigned !== "all" && (
              <Badge className="bg-primary/10 text-primary border-primary/20 border text-[10px] px-2 gap-1">
                Assigned: {filterAssigned}
                <button
                  type="button"
                  onClick={() => setFilterAssigned("all")}
                  className="ml-0.5 hover:text-foreground"
                >
                  x
                </button>
              </Badge>
            )}
            {Array.from(filterPriorities).map((p) => (
              <Badge
                key={p}
                className="bg-primary/10 text-primary border-primary/20 border text-[10px] px-2 gap-1"
              >
                {PRIORITY_OPTIONS.find((o) => o.value === p)?.label}
                <button
                  type="button"
                  onClick={() => togglePriority(p)}
                  className="ml-0.5 hover:text-foreground"
                >
                  x
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto px-6 pb-6">
        {isLoading ? (
          <div className="flex gap-4">
            {PIPELINE_STAGES.map((s) => (
              <div key={s} className="flex-shrink-0 w-72">
                <Skeleton className="h-16 w-full mb-3 rounded-xl" />
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full mb-2 rounded-xl" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-3 h-full">
            {PIPELINE_STAGES.map((stage) => {
              const cols = STATUS_COLORS[stage];
              const stageClients = byStatus(stage);
              const stageDealTotal = stageClients.reduce(
                (s, c) => s + c.dealValue,
                0,
              );
              const stageProbability = STAGE_PROBABILITY[stage];
              const stageWeighted = Math.round(
                (stageDealTotal * stageProbability) / 100,
              );
              const isOver = dragOverStage === stage;

              return (
                <div
                  key={stage}
                  data-ocid={`clients.kanban.${stage}_column`}
                  onDragEnter={(e) => handleDragEnter(stage, e)}
                  onDragLeave={() => handleDragLeave(stage)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(stage)}
                  className={[
                    "flex-shrink-0 flex flex-col rounded-2xl border transition-all duration-150",
                    mode === "compact" ? "w-60" : "w-72",
                    isOver
                      ? `${cols.border} bg-card/90 shadow-lg shadow-black/20 ring-1 ring-inset ${cols.border}`
                      : "border-border bg-card/50",
                  ].join(" ")}
                >
                  {/* Column header with colored left accent */}
                  <div
                    className={`flex-shrink-0 p-3 rounded-t-2xl border-b ${cols.border}/30 border-l-[3px] ${cols.border}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm shrink-0">
                          {STAGE_ICONS[stage]}
                        </span>
                        <span
                          className={`text-sm font-semibold ${cols.text} truncate`}
                        >
                          {STATUS_LABELS[stage]}
                        </span>
                      </div>
                      <Badge
                        className={`${cols.bg} ${cols.text} ${cols.border} border text-xs px-1.5 shrink-0 ml-1`}
                      >
                        {stageClients.length}
                      </Badge>
                    </div>
                    <div className="flex items-end justify-between mt-1.5">
                      <div>
                        <p className={`text-sm font-bold ${cols.text}`}>
                          {formatCurrency(stageDealTotal)}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {stageClients.length}{" "}
                          {stageClients.length === 1 ? "client" : "clients"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">
                          Weighted
                        </p>
                        <p className="text-xs font-semibold text-foreground">
                          {formatCurrency(stageWeighted)}
                          <span
                            className={`ml-1 text-[10px] font-normal ${cols.text}`}
                          >
                            {stageProbability}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cards container */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-[120px]">
                    {stageClients.length === 0 ? (
                      <div
                        data-ocid={`clients.kanban.${stage}.empty_state`}
                        className={[
                          "flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed transition-colors",
                          isOver
                            ? `${cols.border} ${cols.bg}`
                            : "border-border/40",
                        ].join(" ")}
                      >
                        <span className="text-2xl mb-1">
                          {STAGE_ICONS[stage]}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {isOver ? "Drop here" : "No clients"}
                        </p>
                      </div>
                    ) : (
                      stageClients.map((client, i) => (
                        <KanbanCard
                          key={client.id}
                          client={client}
                          index={i}
                          stageKey={stage}
                          isDragging={draggingId === client.id}
                          onDragStart={handleDragStart}
                          mode={mode}
                        />
                      ))
                    )}

                    {/* Drop indicator when over non-empty column */}
                    {isOver && stageClients.length > 0 && (
                      <div
                        className={`h-1.5 rounded-full ${cols.bg} border ${cols.border} transition-all`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Closure Reason Modal */}
      <Dialog
        open={!!closureModal}
        onOpenChange={(o) => {
          if (!o) {
            setClosureModal(null);
            setClosureReason("");
          }
        }}
      >
        <DialogContent
          className="bg-card border-border max-w-sm"
          data-ocid="clients.kanban.closure_dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {closureModal?.targetStage === ClientStatus.closedWon
                ? "Mark as Closed Won"
                : "Mark as Closed Lost"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Please provide a reason for closing this deal.
            </p>
            <Textarea
              value={closureReason}
              onChange={(e) => setClosureReason(e.target.value)}
              placeholder="e.g., Client signed contract, Budget constraints..."
              rows={3}
              className="bg-background border-border resize-none text-sm"
              data-ocid="clients.kanban.closure_reason_input"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setClosureModal(null);
                setClosureReason("");
              }}
              data-ocid="clients.kanban.closure_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={confirmClosure}
              disabled={updateStatus.isPending}
              data-ocid="clients.kanban.closure_confirm_button"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
