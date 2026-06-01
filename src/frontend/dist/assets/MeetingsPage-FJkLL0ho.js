import { u as useAuth, v as useInterns, r as reactExports, j as jsxRuntimeExports, m as Button, q as Skeleton, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, s as Badge, C as Clock, U as Users } from "./index-BMeK9e6q.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BNUdlcux.js";
import { C as Checkbox } from "./checkbox-BqYStX9A.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D791wupo.js";
import { b as useMeetingsForUser, a as useScheduleMeeting } from "./use-meetings-DiE79CiM.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { C as CalendarDays } from "./calendar-days-DpHmX_Oh.js";
import { E as ExternalLink } from "./external-link-D5kebMHG.js";
import "./index-xhjDzk0w.js";
import "./index-NDr7xJHf.js";
import "./check-Bu_kUyWO.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./chevron-down-DGBe83Kh.js";
const MEETING_TYPES = [
  { value: "Mentor Meeting", label: "Mentor Meeting" },
  { value: "Standup", label: "Standup" },
  { value: "Review", label: "Review" },
  { value: "Training Session", label: "Training Session" }
];
const TYPE_COLORS = {
  "Mentor Meeting": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Standup: "bg-green-500/10 text-green-400 border-green-500/20",
  Review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Training Session": "bg-purple-500/10 text-purple-400 border-purple-500/20"
};
function getMeetingDate(m) {
  return new Date(Number(m.scheduledAt) / 1e6);
}
function isToday(d) {
  const now = /* @__PURE__ */ new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
function MiniCalendar({
  meetings,
  selectedDay,
  onSelect
}) {
  const today = /* @__PURE__ */ new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const meetingDays = new Set(
    meetings.map((m) => getMeetingDate(m)).filter((d) => d.getFullYear() === year && d.getMonth() === month).map((d) => d.getDate())
  );
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: today.toLocaleString("default", { month: "long", year: "numeric" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-3 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-0.5 text-center", children: [
        ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-[10px] text-muted-foreground font-medium py-1",
            children: d
          },
          d
        )),
        cells.map((day, idx) => {
          if (!day) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7" }, `cal-empty-${idx}`);
          const hasMeeting = meetingDays.has(day);
          const isCurrentDay = day === today.getDate();
          const isSelected = day === selectedDay;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onSelect(isSelected ? null : day),
              className: [
                "h-7 w-7 mx-auto rounded-full text-xs font-medium transition-all relative flex items-center justify-center",
                isSelected ? "bg-primary text-primary-foreground" : isCurrentDay ? "border border-primary text-primary" : "hover:bg-muted text-foreground"
              ].join(" "),
              "data-ocid": `meetings.calendar_day_${day}`,
              children: [
                day,
                hasMeeting && !isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" })
              ]
            },
            day
          );
        })
      ] }),
      selectedDay && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onSelect(null),
          className: "mt-2 w-full text-xs text-muted-foreground hover:text-foreground transition-colors",
          children: "Clear filter"
        }
      )
    ] })
  ] });
}
function MeetingCard({ meeting }) {
  const date = getMeetingDate(meeting);
  const typeColor = TYPE_COLORS[meeting.meetingType] ?? "bg-muted text-muted-foreground border-border";
  const today = isToday(date);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: meeting.title }),
        today && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-[10px] py-0", children: "Today" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
          date.toLocaleDateString(void 0, {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          " ",
          "· ",
          Number(meeting.durationMinutes),
          "min"
        ] })
      ] }),
      meeting.participantIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          meeting.participantIds.length,
          " participant",
          meeting.participantIds.length !== 1 ? "s" : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-[10px] ${typeColor}`, children: meeting.meetingType }),
      meeting.joinLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          className: "h-7 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10",
          onClick: () => window.open(meeting.joinLink, "_blank", "noopener"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
            " Join"
          ]
        }
      )
    ] })
  ] }) }) });
}
const EMPTY_FORM = {
  title: "",
  meetingType: "Mentor Meeting",
  scheduledAt: "",
  durationMinutes: "60",
  joinLink: "",
  participantIds: []
};
function MeetingsPage() {
  const { isAdmin } = useAuth();
  const { data: meetings = [], isLoading } = useMeetingsForUser();
  const { data: interns = [] } = useInterns();
  const scheduleMeeting = useScheduleMeeting();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [selectedDay, setSelectedDay] = reactExports.useState(null);
  const displayedMeetings = reactExports.useMemo(() => {
    let list = [...meetings].sort(
      (a, b) => Number(a.scheduledAt) - Number(b.scheduledAt)
    );
    if (selectedDay !== null) {
      list = list.filter((m) => getMeetingDate(m).getDate() === selectedDay);
    }
    return list;
  }, [meetings, selectedDay]);
  function toggleParticipant(id) {
    setForm((f) => ({
      ...f,
      participantIds: f.participantIds.includes(id) ? f.participantIds.filter((p) => p !== id) : [...f.participantIds, id]
    }));
  }
  async function handleSchedule() {
    if (!form.title.trim() || !form.scheduledAt) return;
    await scheduleMeeting.mutateAsync({
      title: form.title.trim(),
      meetingType: form.meetingType,
      scheduledAt: BigInt(new Date(form.scheduledAt).getTime()) * 1000000n,
      durationMinutes: BigInt(Number(form.durationMinutes) || 60),
      joinLink: form.joinLink.trim() || void 0,
      participantIds: form.participantIds
    });
    setModalOpen(false);
    setForm(EMPTY_FORM);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto", "data-ocid": "meetings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Meetings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: isAdmin() ? "Schedule and manage all meetings" : "Your upcoming sessions" })
      ] }),
      isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "gap-2",
          onClick: () => setModalOpen(true),
          "data-ocid": "meetings.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Schedule Meeting"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-52 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MiniCalendar,
        {
          meetings,
          selectedDay,
          onSelect: setSelectedDay
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }) : displayedMeetings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-muted-foreground",
          "data-ocid": "meetings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-12 w-12 mb-3 opacity-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              "No meetings",
              selectedDay ? ` on the ${selectedDay}th` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: isAdmin() ? 'Click "Schedule Meeting" to add one.' : "No sessions scheduled yet." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: displayedMeetings.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `meetings.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingCard, { meeting: m }) }, m.id)) }) })
    ] }),
    isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-lg bg-card border-border",
        "data-ocid": "meetings.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Schedule Meeting" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "meeting-title", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "meeting-title",
                  placeholder: "e.g. Sprint Review",
                  value: form.title,
                  onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                  "data-ocid": "meetings.title_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.meetingType,
                    onValueChange: (v) => setForm((f) => ({ ...f, meetingType: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "meetings.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MEETING_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "duration", children: "Duration (min)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "duration",
                    type: "number",
                    min: "5",
                    step: "5",
                    value: form.durationMinutes,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      durationMinutes: e.target.value
                    })),
                    "data-ocid": "meetings.duration_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "scheduled-at", children: "Date & Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "scheduled-at",
                  type: "datetime-local",
                  value: form.scheduledAt,
                  onChange: (e) => setForm((f) => ({ ...f, scheduledAt: e.target.value })),
                  "data-ocid": "meetings.datetime_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "join-link", children: "Join Link (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "join-link",
                  type: "url",
                  placeholder: "https://meet.google.com/...",
                  value: form.joinLink,
                  onChange: (e) => setForm((f) => ({ ...f, joinLink: e.target.value })),
                  "data-ocid": "meetings.join_link_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Participants" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-40 overflow-y-auto space-y-1.5 rounded-lg border border-border p-2", children: interns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground p-2", children: "No interns found" }) : interns.map((intern) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-1 py-0.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        id: `participant-${intern.id}`,
                        checked: form.participantIds.includes(intern.id),
                        onCheckedChange: () => toggleParticipant(intern.id),
                        "data-ocid": `meetings.participant_checkbox_${intern.id}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: `participant-${intern.id}`,
                        className: "text-sm text-foreground cursor-pointer",
                        children: intern.name
                      }
                    )
                  ]
                },
                intern.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => {
                    setModalOpen(false);
                    setForm(EMPTY_FORM);
                  },
                  "data-ocid": "meetings.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleSchedule,
                  disabled: !form.title.trim() || !form.scheduledAt || scheduleMeeting.isPending,
                  "data-ocid": "meetings.submit_button",
                  children: scheduleMeeting.isPending ? "Scheduling…" : "Schedule"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  MeetingsPage
};
