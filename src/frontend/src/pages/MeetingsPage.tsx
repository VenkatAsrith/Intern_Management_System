import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useInterns } from "@/hooks/use-interns";
import { useMeetingsForUser, useScheduleMeeting } from "@/hooks/use-meetings";
import type { Meeting } from "@/hooks/use-meetings";
import { CalendarDays, Clock, ExternalLink, Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";

const MEETING_TYPES = [
  { value: "Mentor Meeting", label: "Mentor Meeting" },
  { value: "Standup", label: "Standup" },
  { value: "Review", label: "Review" },
  { value: "Training Session", label: "Training Session" },
];

const TYPE_COLORS: Record<string, string> = {
  "Mentor Meeting": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Standup: "bg-green-500/10 text-green-400 border-green-500/20",
  Review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Training Session": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function getMeetingDate(m: Meeting): Date {
  return new Date(Number(m.scheduledAt) / 1_000_000);
}

function isToday(d: Date): boolean {
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

function MiniCalendar({
  meetings,
  selectedDay,
  onSelect,
}: {
  meetings: Meeting[];
  selectedDay: number | null;
  onSelect: (day: number | null) => void;
}) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();

  const meetingDays = new Set(
    meetings
      .map((m) => getMeetingDate(m))
      .filter((d) => d.getFullYear() === year && d.getMonth() === month)
      .map((d) => d.getDate()),
  );

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold">
          {today.toLocaleString("default", { month: "long", year: "numeric" })}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-4">
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div
              key={d}
              className="text-[10px] text-muted-foreground font-medium py-1"
            >
              {d}
            </div>
          ))}
          {cells.map((day, idx) => {
            // biome-ignore lint/suspicious/noArrayIndexKey: calendar grid cells, positionally stable
            if (!day) return <div key={`cal-empty-${idx}`} className="h-7" />;
            const hasMeeting = meetingDays.has(day);
            const isCurrentDay = day === today.getDate();
            const isSelected = day === selectedDay;
            return (
              <button
                key={day}
                type="button"
                onClick={() => onSelect(isSelected ? null : day)}
                className={[
                  "h-7 w-7 mx-auto rounded-full text-xs font-medium transition-all relative flex items-center justify-center",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isCurrentDay
                      ? "border border-primary text-primary"
                      : "hover:bg-muted text-foreground",
                ].join(" ")}
                data-ocid={`meetings.calendar_day_${day}`}
              >
                {day}
                {hasMeeting && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
        {selectedDay && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear filter
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const date = getMeetingDate(meeting);
  const typeColor =
    TYPE_COLORS[meeting.meetingType] ??
    "bg-muted text-muted-foreground border-border";
  const today = isToday(date);

  return (
    <Card className="bg-card border-border hover:border-primary/20 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-sm truncate">
                {meeting.title}
              </p>
              {today && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] py-0">
                  Today
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                · {Number(meeting.durationMinutes)}min
              </span>
            </div>
            {meeting.participantIds.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {meeting.participantIds.length} participant
                  {meeting.participantIds.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <Badge variant="outline" className={`text-[10px] ${typeColor}`}>
              {meeting.meetingType}
            </Badge>
            {meeting.joinLink && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                onClick={() =>
                  window.open(meeting.joinLink, "_blank", "noopener")
                }
              >
                <ExternalLink className="h-3 w-3" /> Join
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ScheduleFormState {
  title: string;
  meetingType: string;
  scheduledAt: string;
  durationMinutes: string;
  joinLink: string;
  participantIds: string[];
}

const EMPTY_FORM: ScheduleFormState = {
  title: "",
  meetingType: "Mentor Meeting",
  scheduledAt: "",
  durationMinutes: "60",
  joinLink: "",
  participantIds: [],
};

export function MeetingsPage() {
  const { isAdmin } = useAuth();
  const { data: meetings = [], isLoading } = useMeetingsForUser();
  const { data: interns = [] } = useInterns();
  const scheduleMeeting = useScheduleMeeting();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ScheduleFormState>(EMPTY_FORM);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // For intern (non-admin) view: filter to own userId via sessionToken
  // The API already returns only meetings for this user, so no extra filter needed
  const displayedMeetings = useMemo(() => {
    let list = [...meetings].sort(
      (a, b) => Number(a.scheduledAt) - Number(b.scheduledAt),
    );
    if (selectedDay !== null) {
      list = list.filter((m) => getMeetingDate(m).getDate() === selectedDay);
    }
    return list;
  }, [meetings, selectedDay]);

  function toggleParticipant(id: string) {
    setForm((f) => ({
      ...f,
      participantIds: f.participantIds.includes(id)
        ? f.participantIds.filter((p) => p !== id)
        : [...f.participantIds, id],
    }));
  }

  async function handleSchedule() {
    if (!form.title.trim() || !form.scheduledAt) return;
    await scheduleMeeting.mutateAsync({
      title: form.title.trim(),
      meetingType: form.meetingType,
      scheduledAt: BigInt(new Date(form.scheduledAt).getTime()) * 1_000_000n,
      durationMinutes: BigInt(Number(form.durationMinutes) || 60),
      joinLink: form.joinLink.trim() || undefined,
      participantIds: form.participantIds,
    });
    setModalOpen(false);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" data-ocid="meetings.page">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meetings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isAdmin()
              ? "Schedule and manage all meetings"
              : "Your upcoming sessions"}
          </p>
        </div>
        {isAdmin() && (
          <Button
            type="button"
            className="gap-2"
            onClick={() => setModalOpen(true)}
            data-ocid="meetings.open_modal_button"
          >
            <Plus className="h-4 w-4" /> Schedule Meeting
          </Button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Mini calendar */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <MiniCalendar
            meetings={meetings}
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
          />
        </div>

        {/* Meeting list */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : displayedMeetings.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-muted-foreground"
              data-ocid="meetings.empty_state"
            >
              <CalendarDays className="h-12 w-12 mb-3 opacity-20" />
              <p className="font-medium">
                No meetings{selectedDay ? ` on the ${selectedDay}th` : ""}
              </p>
              <p className="text-sm mt-1">
                {isAdmin()
                  ? 'Click "Schedule Meeting" to add one.'
                  : "No sessions scheduled yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedMeetings.map((m, idx) => (
                <div key={m.id} data-ocid={`meetings.item.${idx + 1}`}>
                  <MeetingCard meeting={m} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schedule Meeting Modal */}
      {isAdmin() && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent
            className="max-w-lg bg-card border-border"
            data-ocid="meetings.dialog"
          >
            <DialogHeader>
              <DialogTitle>Schedule Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="meeting-title">Title</Label>
                <Input
                  id="meeting-title"
                  placeholder="e.g. Sprint Review"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  data-ocid="meetings.title_input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Type</Label>
                  <Select
                    value={form.meetingType}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, meetingType: v }))
                    }
                  >
                    <SelectTrigger data-ocid="meetings.type_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MEETING_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="5"
                    step="5"
                    value={form.durationMinutes}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        durationMinutes: e.target.value,
                      }))
                    }
                    data-ocid="meetings.duration_input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="scheduled-at">Date & Time</Label>
                <Input
                  id="scheduled-at"
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, scheduledAt: e.target.value }))
                  }
                  data-ocid="meetings.datetime_input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="join-link">Join Link (optional)</Label>
                <Input
                  id="join-link"
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={form.joinLink}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, joinLink: e.target.value }))
                  }
                  data-ocid="meetings.join_link_input"
                />
              </div>

              <div className="space-y-2">
                <Label>Participants</Label>
                <div className="max-h-40 overflow-y-auto space-y-1.5 rounded-lg border border-border p-2">
                  {interns.length === 0 ? (
                    <p className="text-xs text-muted-foreground p-2">
                      No interns found
                    </p>
                  ) : (
                    interns.map((intern) => (
                      <div
                        key={intern.id}
                        className="flex items-center gap-2 px-1 py-0.5"
                      >
                        <Checkbox
                          id={`participant-${intern.id}`}
                          checked={form.participantIds.includes(intern.id)}
                          onCheckedChange={() => toggleParticipant(intern.id)}
                          data-ocid={`meetings.participant_checkbox_${intern.id}`}
                        />
                        <label
                          htmlFor={`participant-${intern.id}`}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {intern.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setModalOpen(false);
                    setForm(EMPTY_FORM);
                  }}
                  data-ocid="meetings.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSchedule}
                  disabled={
                    !form.title.trim() ||
                    !form.scheduledAt ||
                    scheduleMeeting.isPending
                  }
                  data-ocid="meetings.submit_button"
                >
                  {scheduleMeeting.isPending ? "Scheduling…" : "Schedule"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
