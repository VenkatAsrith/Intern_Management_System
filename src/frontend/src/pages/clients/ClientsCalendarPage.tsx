import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClients } from "@/hooks/use-clients";
import {
  type Client,
  ClientStatus,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/types/clients";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

type EventKind = "followup" | "meeting";
interface CalEvent {
  client: Client;
  kind: EventKind;
  date: Date;
  isOverdue: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TERMINAL_STATUSES: ClientStatus[] = [
  ClientStatus.closedWon,
  ClientStatus.closedLost,
];

// ─── subcomponents ────────────────────────────────────────────────────────────

function EventChip({
  event,
  onClick,
}: {
  event: CalEvent;
  onClick: () => void;
}) {
  const chipCls = event.isOverdue
    ? "bg-red-500/20 text-red-300 border-red-500/30"
    : event.kind === "followup"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-purple-500/20 text-purple-300 border-purple-500/30";
  const sc = STATUS_COLORS[event.client.currentStatus];
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${event.client.companyName} — ${STATUS_LABELS[event.client.currentStatus]}`}
      className={`w-full text-left text-xs px-1.5 py-0.5 rounded border truncate flex items-center gap-1 hover:opacity-80 transition-opacity ${chipCls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
      <span className="truncate">{event.client.companyName}</span>
    </button>
  );
}

function AgendaItem({
  event,
  onClick,
  index,
  ocidPrefix,
}: {
  event: CalEvent;
  onClick: () => void;
  index: number;
  ocidPrefix: string;
}) {
  const sc = STATUS_COLORS[event.client.currentStatus];
  const kindLabel = event.kind === "followup" ? "Follow-up" : "Meeting";
  const kindColor =
    event.kind === "followup" ? "text-blue-400" : "text-purple-400";
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`${ocidPrefix}.item.${index}`}
      className="w-full text-left p-3 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium text-foreground text-sm truncate">
            {event.client.companyName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {event.client.contactPersonName}
          </p>
          <p className={`text-xs font-medium mt-0.5 ${kindColor}`}>
            {kindLabel} · {event.date.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <Badge className={`${sc.bg} ${sc.text} ${sc.border} border text-xs`}>
            {STATUS_LABELS[event.client.currentStatus]}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ₹{event.client.dealValue.toLocaleString()}
          </span>
        </div>
      </div>
      {event.isOverdue && (
        <div className="flex items-center gap-1 mt-1.5 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" />
          Overdue
        </div>
      )}
    </button>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ClientsCalendarPage() {
  const { data: clients, isLoading } = useClients();
  const navigate = useNavigate();

  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [showFollowUps, setShowFollowUps] = useState(true);
  const [showMeetings, setShowMeetings] = useState(true);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");

  // Build all events from clients
  const allEvents = useMemo<CalEvent[]>(() => {
    const list: CalEvent[] = [];
    for (const c of clients ?? []) {
      const isTerminal = TERMINAL_STATUSES.includes(c.currentStatus);
      if (c.followUpDate) {
        const d = startOfDay(c.followUpDate);
        list.push({
          client: c,
          kind: "followup",
          date: d,
          isOverdue: d < today && !isTerminal,
        });
      }
      if (c.nextMeetingDate) {
        const d = startOfDay(c.nextMeetingDate);
        list.push({
          client: c,
          kind: "meeting",
          date: d,
          isOverdue: d < today && !isTerminal,
        });
      }
    }
    return list;
  }, [clients, today]);

  // Filtered events respecting toggles
  const filteredEvents = useMemo(() => {
    return allEvents.filter((e) => {
      if (!showFollowUps && e.kind === "followup") return false;
      if (!showMeetings && e.kind === "meeting") return false;
      if (showOverdueOnly && !e.isOverdue) return false;
      if (statusFilter !== "all" && e.client.currentStatus !== statusFilter)
        return false;
      return true;
    });
  }, [allEvents, showFollowUps, showMeetings, showOverdueOnly, statusFilter]);

  // Map events by day key for O(1) lookup
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalEvent[]>();
    for (const e of filteredEvents) {
      const k = dateKey(e.date);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(e);
    }
    return map;
  }, [filteredEvents]);

  // Build calendar grid cells
  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startPad = firstDay.getDay(); // 0=Sun
    const totalCells = startPad + lastDay.getDate();
    const rows = Math.ceil(totalCells / 7);
    const cells: Array<Date | null> = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++)
      cells.push(new Date(viewYear, viewMonth, d));
    while (cells.length < rows * 7) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  // Agenda sections
  const todayEvents = useMemo(
    () => filteredEvents.filter((e) => isSameDay(e.date, today)),
    [filteredEvents, today],
  );

  const sevenDaysOut = new Date(today);
  sevenDaysOut.setDate(today.getDate() + 7);
  const upcomingEvents = useMemo(
    () =>
      filteredEvents
        .filter((e) => e.date > today && e.date <= sevenDaysOut)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [filteredEvents, today, sevenDaysOut],
  );

  const overdueEvents = useMemo(
    () =>
      filteredEvents
        .filter((e) => e.isOverdue)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [filteredEvents],
  );

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function goToClient(id: string) {
    navigate({ to: "/clients/$id", params: { id } });
  }

  return (
    <div className="p-6 space-y-5" data-ocid="clients.calendar.page">
      {/* ─── Page header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Follow-up Calendar
            </h1>
            <p className="text-sm text-muted-foreground">
              Scheduled follow-ups and upcoming meetings
            </p>
          </div>
        </div>

        {/* View toggle */}
        <div
          className="flex items-center bg-card border border-border rounded-lg p-1 gap-1"
          data-ocid="clients.view.toggle"
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-xs"
            data-ocid="clients.table.tab"
            onClick={() => navigate({ to: "/clients" })}
          >
            <List className="h-3.5 w-3.5 mr-1" />
            Table
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-xs"
            data-ocid="clients.kanban.tab"
            onClick={() => navigate({ to: "/clients/kanban" })}
          >
            <LayoutGrid className="h-3.5 w-3.5 mr-1" />
            Kanban
          </Button>
          <Button
            size="sm"
            className="h-7 px-3 text-xs bg-primary text-primary-foreground"
            data-ocid="clients.calendar.tab"
          >
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            Calendar
          </Button>
        </div>
      </div>

      {/* ─── Filter bar ─── */}
      <div
        className="flex flex-wrap items-center gap-2"
        data-ocid="clients.calendar.filters"
      >
        <button
          type="button"
          onClick={() => setShowFollowUps((v) => !v)}
          data-ocid="clients.calendar.followup.toggle"
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            showFollowUps
              ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
              : "bg-muted/40 text-muted-foreground border-border"
          }`}
        >
          Follow-ups
        </button>
        <button
          type="button"
          onClick={() => setShowMeetings((v) => !v)}
          data-ocid="clients.calendar.meetings.toggle"
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            showMeetings
              ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
              : "bg-muted/40 text-muted-foreground border-border"
          }`}
        >
          Meetings
        </button>
        <button
          type="button"
          onClick={() => setShowOverdueOnly((v) => !v)}
          data-ocid="clients.calendar.overdue.toggle"
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            showOverdueOnly
              ? "bg-red-500/20 text-red-300 border-red-500/40"
              : "bg-muted/40 text-muted-foreground border-border"
          }`}
        >
          Overdue only
        </button>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as ClientStatus | "all")
          }
          data-ocid="clients.calendar.status.select"
          className="ml-auto text-xs bg-card border border-border rounded-lg px-2.5 py-1.5 text-foreground"
        >
          <option value="all">All statuses</option>
          {(Object.values(ClientStatus) as ClientStatus[]).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-5">
          {/* ─── Calendar grid ─── */}
          <div className="flex-1 min-w-0">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                data-ocid="clients.calendar.prev_month"
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <h2 className="text-base font-semibold text-foreground">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <button
                type="button"
                onClick={nextMonth}
                data-ocid="clients.calendar.next_month"
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Day-of-week header */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-medium text-muted-foreground py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarCells.map((cell, idx) => {
                if (!cell) {
                  return (
                    <div
                      key={`pad-${calendarCells.length}-${idx}`}
                      className="min-h-[5rem] rounded-lg bg-muted/10"
                    />
                  );
                }
                const isToday = isSameDay(cell, today);
                const k = dateKey(cell);
                const dayEvents = eventsByDay.get(k) ?? [];
                const isCurrentMonth = cell.getMonth() === viewMonth;
                return (
                  <div
                    key={k}
                    className={`min-h-[5rem] p-1 rounded-lg border transition-colors ${
                      isToday
                        ? "border-primary/70 bg-primary/5"
                        : "border-border/40 bg-card/60 hover:bg-card"
                    } ${!isCurrentMonth ? "opacity-40" : ""}`}
                  >
                    <div
                      className={`text-xs font-medium mb-1 w-5 h-5 flex items-center justify-center rounded-full ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {cell.getDate()}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <EventChip
                          key={`${ev.client.id}-${ev.kind}`}
                          event={ev}
                          onClick={() => goToClient(ev.client.id)}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="text-xs text-muted-foreground pl-1">
                          +{dayEvents.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/30 border border-blue-500/40" />
                Follow-up
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/30 border border-purple-500/40" />
                Meeting
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500/30 border border-red-500/40" />
                Overdue
              </span>
            </div>
          </div>

          {/* ─── Agenda sidebar ─── */}
          <div
            className="xl:w-80 flex-shrink-0 space-y-4"
            data-ocid="clients.calendar.agenda"
          >
            {/* Today */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Today's Agenda
              </h3>
              {todayEvents.length === 0 ? (
                <div
                  className="text-center py-5 rounded-lg border border-dashed border-border/50"
                  data-ocid="clients.calendar.today.empty_state"
                >
                  <p className="text-xs text-muted-foreground">
                    Nothing scheduled today
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {todayEvents.map((ev, i) => (
                    <AgendaItem
                      key={`${ev.client.id}-${ev.kind}`}
                      event={ev}
                      index={i + 1}
                      ocidPrefix="clients.calendar.today"
                      onClick={() => goToClient(ev.client.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming 7 days */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                Upcoming (next 7 days)
              </h3>
              {upcomingEvents.length === 0 ? (
                <div
                  className="text-center py-5 rounded-lg border border-dashed border-border/50"
                  data-ocid="clients.calendar.upcoming.empty_state"
                >
                  <p className="text-xs text-muted-foreground">
                    No upcoming events
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingEvents.map((ev, i) => (
                    <AgendaItem
                      key={`${ev.client.id}-${ev.kind}`}
                      event={ev}
                      index={i + 1}
                      ocidPrefix="clients.calendar.upcoming"
                      onClick={() => goToClient(ev.client.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Overdue */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                Overdue ({overdueEvents.length})
              </h3>
              {overdueEvents.length === 0 ? (
                <div
                  className="text-center py-5 rounded-lg border border-dashed border-border/50"
                  data-ocid="clients.calendar.overdue.empty_state"
                >
                  <p className="text-xs text-muted-foreground">
                    No overdue follow-ups 🎉
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {overdueEvents.map((ev, i) => (
                    <AgendaItem
                      key={`${ev.client.id}-${ev.kind}`}
                      event={ev}
                      index={i + 1}
                      ocidPrefix="clients.calendar.overdue"
                      onClick={() => goToClient(ev.client.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
