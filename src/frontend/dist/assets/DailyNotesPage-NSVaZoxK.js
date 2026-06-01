import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, m as Button, q as Skeleton, k as BookOpen, s as Badge, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle } from "./index-BMeK9e6q.js";
import { C as Card } from "./card-BNUdlcux.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { a as useDailyNotes, u as useAllDailyNotes, c as useCreateDailyNote, b as useAddNoteComment } from "./useNotes-QdJJUnAk.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { C as CircleAlert } from "./circle-alert-OEcBqI8h.js";
import { C as CircleCheckBig } from "./circle-check-big-DJ_ndGkN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode);
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function CommentBadge({ status }) {
  if (status === "approved")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border text-[10px] gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-2.5 h-2.5" }),
      " Approved"
    ] });
  if (status === "needs_clarification")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/15 text-amber-400 border-amber-500/30 border text-[10px] gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-2.5 h-2.5" }),
      " Needs Clarification"
    ] });
  return null;
}
function NewNoteModal({
  open,
  onClose
}) {
  const create = useCreateDailyNote();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [form, setForm] = reactExports.useState({
    date: today,
    workedOn: "",
    blockers: "",
    progress: "",
    learningUpdates: ""
  });
  const handleSubmit = async () => {
    if (!form.workedOn.trim()) return;
    await create.mutateAsync(form);
    setForm({
      date: today,
      workedOn: "",
      blockers: "",
      progress: "",
      learningUpdates: ""
    });
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
      "Daily Work Note"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: form.date,
            onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
            "data-ocid": "notes.date_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          "What did you work on today?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: form.workedOn,
            onChange: (e) => setForm((f) => ({ ...f, workedOn: e.target.value })),
            placeholder: "e.g. Completed the CRM dashboard UI and integrated sidebar routing…",
            rows: 3,
            "data-ocid": "notes.worked_on_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Blockers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: form.blockers,
            onChange: (e) => setForm((f) => ({ ...f, blockers: e.target.value })),
            placeholder: "Any blockers or issues?",
            rows: 2,
            "data-ocid": "notes.blockers_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: form.progress,
            onChange: (e) => setForm((f) => ({ ...f, progress: e.target.value })),
            placeholder: "How is overall progress going?",
            rows: 2,
            "data-ocid": "notes.progress_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Learning Updates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: form.learningUpdates,
            onChange: (e) => setForm((f) => ({ ...f, learningUpdates: e.target.value })),
            placeholder: "What did you learn today?",
            rows: 2,
            "data-ocid": "notes.learning_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "notes.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            disabled: !form.workedOn.trim() || create.isPending,
            onClick: () => void handleSubmit(),
            "data-ocid": "notes.submit_button",
            children: "Save Note"
          }
        )
      ] })
    ] })
  ] }) });
}
function AddCommentModal({
  noteId,
  open,
  onClose
}) {
  const [content, setContent] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState(
    "approved"
  );
  const add = useAddNoteComment();
  const handleSubmit = async () => {
    if (!content.trim()) return;
    await add.mutateAsync({ noteId, content, status });
    setContent("");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Comment" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground",
            "data-ocid": "notes.comment_status_select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "needs_clarification", children: "Needs Clarification" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No Status" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Comment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: content,
            onChange: (e) => setContent(e.target.value),
            placeholder: "Add your feedback…",
            rows: 3,
            "data-ocid": "notes.comment_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "notes.comment_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            disabled: !content.trim() || add.isPending,
            onClick: () => void handleSubmit(),
            "data-ocid": "notes.comment_submit_button",
            children: "Submit Comment"
          }
        )
      ] })
    ] })
  ] }) });
}
function NoteCard({
  note,
  canComment
}) {
  const [commentOpen, setCommentOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notes-card space-y-3", "data-ocid": `notes.card.${note.id}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        note.internName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-semibold mb-0.5", children: note.internName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "notes-timestamp", children: note.date })
      ] }),
      note.blockers && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/15 text-destructive border-destructive/30 border text-[10px] gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-2.5 h-2.5" }),
        " Blocker"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Worked On" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: note.workedOn })
    ] }),
    note.blockers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Blockers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-destructive/90", children: note.blockers })
    ] }),
    note.progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: note.progress })
    ] }),
    note.learningUpdates && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Learning Updates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: note.learningUpdates })
    ] }),
    note.adminComments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 pt-2 border-t border-border", children: note.adminComments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notes-comment", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: c.authorName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommentBadge, { status: c.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "notes-timestamp ml-auto", children: formatDate(c.createdAt) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: c.content })
    ] }, c.id)) }),
    canComment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "text-xs",
        onClick: () => setCommentOpen(true),
        "data-ocid": `notes.add_comment_button.${note.id}`,
        children: "Add Comment"
      }
    ) }),
    commentOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddCommentModal,
      {
        noteId: note.id,
        open: commentOpen,
        onClose: () => setCommentOpen(false)
      }
    )
  ] });
}
function DailyNotesPage() {
  const { isAdmin, sessionToken } = useAuth();
  const admin = isAdmin();
  const myInternId = !admin && sessionToken ? sessionToken.split(":")[0] : null;
  const { data: myNotes, isLoading: myLoading } = useDailyNotes(
    admin ? null : myInternId
  );
  const { data: allNotes, isLoading: allLoading } = useAllDailyNotes();
  const [newNoteOpen, setNewNoteOpen] = reactExports.useState(false);
  const [filterIntern, setFilterIntern] = reactExports.useState("");
  const [filterDate, setFilterDate] = reactExports.useState("");
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "n" && !admin && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setNewNoteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [admin]);
  const filteredAdminNotes = reactExports.useMemo(() => {
    if (!allNotes) return [];
    return allNotes.filter((n) => {
      const nameMatch = !filterIntern || n.internName.toLowerCase().includes(filterIntern.toLowerCase());
      const dateMatch = !filterDate || n.date === filterDate;
      return nameMatch && dateMatch;
    });
  }, [allNotes, filterIntern, filterDate]);
  const isLoading = admin ? allLoading : myLoading;
  const notes = admin ? filteredAdminNotes : myNotes ?? [];
  const groupedByIntern = reactExports.useMemo(() => {
    if (!admin) return null;
    const map = /* @__PURE__ */ new Map();
    for (const note of filteredAdminNotes) {
      const key = note.internName || note.internId;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(note);
    }
    return map;
  }, [admin, filteredAdminNotes]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-4xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Daily Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: admin ? "Review intern developer journals" : "Your daily work journal" })
      ] }),
      !admin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setNewNoteOpen(true),
          "data-ocid": "notes.new_note_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "New Note",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-2 text-[9px] px-1.5 py-0.5 bg-primary/20 rounded font-mono", children: "N" })
          ]
        }
      )
    ] }),
    admin && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Filter by intern" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: filterIntern,
            onChange: (e) => setFilterIntern(e.target.value),
            placeholder: "Search intern name…",
            className: "h-8 text-sm w-52",
            "data-ocid": "notes.filter_intern_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Filter by date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: filterDate,
            onChange: (e) => setFilterDate(e.target.value),
            className: "h-8 text-sm",
            "data-ocid": "notes.filter_date_input"
          }
        )
      ] }),
      (filterIntern || filterDate) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => {
            setFilterIntern("");
            setFilterDate("");
          },
          "data-ocid": "notes.clear_filters_button",
          children: "Clear"
        }
      ) })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notes-card space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
    ] }, i)) }) : notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-muted-foreground",
        "data-ocid": "notes.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 mb-3 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No notes yet — start your first daily entry" }),
          !admin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "mt-4",
              onClick: () => setNewNoteOpen(true),
              "data-ocid": "notes.empty_new_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                " Write Today's Note"
              ]
            }
          )
        ]
      }
    ) : admin && groupedByIntern ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: Array.from(groupedByIntern.entries()).map(
      ([internName, internNotes]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-primary mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary inline-block" }),
          internName,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
            internNotes.length,
            " note",
            internNotes.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pl-3 border-l border-border", children: internNotes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCard, { note, canComment: admin }, note.id)) })
      ] }, internName)
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCard, { note, canComment: admin }, note.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewNoteModal, { open: newNoteOpen, onClose: () => setNewNoteOpen(false) })
  ] });
}
export {
  DailyNotesPage
};
