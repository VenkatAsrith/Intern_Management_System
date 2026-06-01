import type { CreateMeetingPayload } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMeetingsForIntern, useScheduleMeeting } from "@/hooks/use-meetings";
import type { Meeting } from "@/hooks/use-meetings";
import { Calendar, ExternalLink, Plus, Video } from "lucide-react";
import { useState } from "react";

const meetingTypeColors: Record<string, string> = {
  mentor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  standup: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  review: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  training: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const attendanceColors: Record<string, string> = {
  scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  attended: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  absent: "bg-red-500/20 text-red-400 border-red-500/30",
};

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const scheduledMs = Number(meeting.scheduledAt) / 1_000_000;
  const isPast = scheduledMs < Date.now();
  const dateStr = new Date(scheduledMs).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const durationMins = Number(meeting.durationMinutes);

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-2"
      data-ocid={`meetings.card.${meeting.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-foreground text-sm truncate">
            {meeting.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {dateStr}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Badge
            className={`text-xs border ${meetingTypeColors[meeting.meetingType] ?? "bg-muted text-muted-foreground border-border"}`}
          >
            {meeting.meetingType}
          </Badge>
          <Badge
            className={`text-xs border ${attendanceColors[isPast ? "attended" : "scheduled"]}`}
          >
            {isPast ? "attended" : "scheduled"}
          </Badge>
        </div>
      </div>
      {durationMins > 0 && (
        <p className="text-xs text-muted-foreground">
          Duration: {durationMins} min
        </p>
      )}
      {meeting.joinLink && (
        <a
          href={meeting.joinLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
          data-ocid={`meetings.join_link.${meeting.id}`}
        >
          <ExternalLink className="h-3 w-3" /> Join Meeting
        </a>
      )}
    </div>
  );
}

function ScheduleMeetingModal({
  internId,
  onClose,
}: { internId: string; onClose: () => void }) {
  const schedule = useScheduleMeeting();
  const [form, setForm] = useState({
    title: "",
    scheduledAt: "",
    durationMinutes: BigInt(30),
    meetingType: "mentor",
    joinLink: "",
    participantIds: [internId],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateMeetingPayload = {
      title: form.title,
      scheduledAt:
        BigInt(new Date(form.scheduledAt).getTime()) * BigInt(1_000_000),
      durationMinutes: form.durationMinutes,
      meetingType: form.meetingType,
      joinLink: form.joinLink || undefined,
      participantIds: form.participantIds,
    };
    schedule.mutate(payload, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-4"
        data-ocid="meetings.schedule_modal"
      >
        <h3 className="font-semibold text-foreground">Schedule Meeting</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            placeholder="Meeting Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            data-ocid="meetings.title_input"
          />
          <input
            type="datetime-local"
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            value={form.scheduledAt}
            onChange={(e) =>
              setForm((f) => ({ ...f, scheduledAt: e.target.value }))
            }
            required
            data-ocid="meetings.date_input"
          />
          <select
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            value={form.meetingType}
            onChange={(e) =>
              setForm((f) => ({ ...f, meetingType: e.target.value }))
            }
            data-ocid="meetings.type_select"
          >
            <option value="mentor">Mentor Meeting</option>
            <option value="standup">Standup</option>
            <option value="review">Review</option>
            <option value="training">Training</option>
          </select>
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            placeholder="Join Link (optional)"
            value={form.joinLink}
            onChange={(e) =>
              setForm((f) => ({ ...f, joinLink: e.target.value }))
            }
            data-ocid="meetings.link_input"
          />
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              disabled={schedule.isPending}
              data-ocid="meetings.submit_button"
            >
              Schedule
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onClose}
              data-ocid="meetings.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function MeetingsTab({
  internId,
  isAdmin,
}: { internId: string; isAdmin: boolean }) {
  const { data: meetings = [], isLoading } = useMeetingsForIntern(internId);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const now = Date.now();
  const upcoming = meetings.filter(
    (m) => Number(m.scheduledAt) / 1_000_000 >= now,
  );
  const past = meetings.filter((m) => Number(m.scheduledAt) / 1_000_000 < now);

  if (isLoading)
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );

  return (
    <div className="space-y-5" data-ocid="meetings.tab">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">Meetings & Sessions</h3>
          <Badge className="bg-muted text-muted-foreground border-border text-xs">
            {meetings.length} total
          </Badge>
        </div>
        {isAdmin && (
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={() => setScheduleOpen(true)}
            data-ocid="meetings.schedule_button"
          >
            <Plus className="h-3.5 w-3.5" /> Schedule Meeting
          </Button>
        )}
      </div>

      <section>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Upcoming ({upcoming.length})
        </h4>
        {upcoming.length === 0 ? (
          <div
            className="bg-muted/30 border border-border rounded-xl p-6 text-center text-sm text-muted-foreground"
            data-ocid="meetings.upcoming_empty_state"
          >
            No upcoming meetings scheduled.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((m) => (
              <MeetingCard key={m.id} meeting={m} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Past ({past.length})
        </h4>
        {past.length === 0 ? (
          <div
            className="bg-muted/30 border border-border rounded-xl p-6 text-center text-sm text-muted-foreground"
            data-ocid="meetings.past_empty_state"
          >
            No past meetings on record.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {past.map((m) => (
              <MeetingCard key={m.id} meeting={m} />
            ))}
          </div>
        )}
      </section>

      {scheduleOpen && (
        <ScheduleMeetingModal
          internId={internId}
          onClose={() => setScheduleOpen(false)}
        />
      )}
    </div>
  );
}
