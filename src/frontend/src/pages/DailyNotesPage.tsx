import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  useAddNoteComment,
  useAllDailyNotes,
  useCreateDailyNote,
  useDailyNotes,
} from "@/hooks/useNotes";
import type { DailyNote, NoteComment } from "@/hooks/useNotes";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Plus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CommentBadge({ status }: { status: NoteComment["status"] }) {
  if (status === "approved")
    return (
      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border text-[10px] gap-1">
        <CheckCircle className="w-2.5 h-2.5" /> Approved
      </Badge>
    );
  if (status === "needs_clarification")
    return (
      <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 border text-[10px] gap-1">
        <HelpCircle className="w-2.5 h-2.5" /> Needs Clarification
      </Badge>
    );
  return null;
}

function NewNoteModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const create = useCreateDailyNote();
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    date: today,
    workedOn: "",
    blockers: "",
    progress: "",
    learningUpdates: "",
  });

  const handleSubmit = async () => {
    if (!form.workedOn.trim()) return;
    await create.mutateAsync(form);
    setForm({
      date: today,
      workedOn: "",
      blockers: "",
      progress: "",
      learningUpdates: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Daily Work Note
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              data-ocid="notes.date_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>
              What did you work on today?{" "}
              <span className="text-primary">*</span>
            </Label>
            <Textarea
              value={form.workedOn}
              onChange={(e) =>
                setForm((f) => ({ ...f, workedOn: e.target.value }))
              }
              placeholder="e.g. Completed the CRM dashboard UI and integrated sidebar routing…"
              rows={3}
              data-ocid="notes.worked_on_textarea"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Blockers</Label>
            <Textarea
              value={form.blockers}
              onChange={(e) =>
                setForm((f) => ({ ...f, blockers: e.target.value }))
              }
              placeholder="Any blockers or issues?"
              rows={2}
              data-ocid="notes.blockers_textarea"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Progress</Label>
            <Textarea
              value={form.progress}
              onChange={(e) =>
                setForm((f) => ({ ...f, progress: e.target.value }))
              }
              placeholder="How is overall progress going?"
              rows={2}
              data-ocid="notes.progress_textarea"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Learning Updates</Label>
            <Textarea
              value={form.learningUpdates}
              onChange={(e) =>
                setForm((f) => ({ ...f, learningUpdates: e.target.value }))
              }
              placeholder="What did you learn today?"
              rows={2}
              data-ocid="notes.learning_textarea"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="notes.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!form.workedOn.trim() || create.isPending}
              onClick={() => void handleSubmit()}
              data-ocid="notes.submit_button"
            >
              Save Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddCommentModal({
  noteId,
  open,
  onClose,
}: {
  noteId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"approved" | "needs_clarification" | "">(
    "approved",
  );
  const add = useAddNoteComment();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await add.mutateAsync({ noteId, content, status });
    setContent("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground"
              data-ocid="notes.comment_status_select"
            >
              <option value="approved">Approved</option>
              <option value="needs_clarification">Needs Clarification</option>
              <option value="">No Status</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Comment</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add your feedback…"
              rows={3}
              data-ocid="notes.comment_textarea"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="notes.comment_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!content.trim() || add.isPending}
              onClick={() => void handleSubmit()}
              data-ocid="notes.comment_submit_button"
            >
              Submit Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NoteCard({
  note,
  canComment,
}: { note: DailyNote; canComment: boolean }) {
  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <div className="notes-card space-y-3" data-ocid={`notes.card.${note.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          {note.internName && (
            <p className="text-xs text-primary font-semibold mb-0.5">
              {note.internName}
            </p>
          )}
          <p className="notes-timestamp">{note.date}</p>
        </div>
        {note.blockers && (
          <Badge className="bg-destructive/15 text-destructive border-destructive/30 border text-[10px] gap-1">
            <AlertCircle className="w-2.5 h-2.5" /> Blocker
          </Badge>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-1">
          Worked On
        </p>
        <p className="text-sm leading-relaxed">{note.workedOn}</p>
      </div>

      {note.blockers && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">
            Blockers
          </p>
          <p className="text-sm leading-relaxed text-destructive/90">
            {note.blockers}
          </p>
        </div>
      )}

      {note.progress && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">
            Progress
          </p>
          <p className="text-sm leading-relaxed">{note.progress}</p>
        </div>
      )}

      {note.learningUpdates && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">
            Learning Updates
          </p>
          <p className="text-sm leading-relaxed">{note.learningUpdates}</p>
        </div>
      )}

      {/* Admin comments */}
      {note.adminComments.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-border">
          {note.adminComments.map((c) => (
            <div key={c.id} className="notes-comment">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">{c.authorName}</span>
                <CommentBadge status={c.status} />
                <span className="notes-timestamp ml-auto">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-sm">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {canComment && (
        <div className="pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setCommentOpen(true)}
            data-ocid={`notes.add_comment_button.${note.id}`}
          >
            Add Comment
          </Button>
        </div>
      )}

      {commentOpen && (
        <AddCommentModal
          noteId={note.id}
          open={commentOpen}
          onClose={() => setCommentOpen(false)}
        />
      )}
    </div>
  );
}

export function DailyNotesPage() {
  const { isAdmin, sessionToken } = useAuth();
  const admin = isAdmin();

  // For intern: get their notes; derive internId from sessionToken
  const myInternId = !admin && sessionToken ? sessionToken.split(":")[0] : null;
  const { data: myNotes, isLoading: myLoading } = useDailyNotes(
    admin ? null : myInternId,
  );
  const { data: allNotes, isLoading: allLoading } = useAllDailyNotes();

  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [filterIntern, setFilterIntern] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Keyboard shortcut N → open new note modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "n" &&
        !admin &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setNewNoteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [admin]);

  const filteredAdminNotes = useMemo(() => {
    if (!allNotes) return [];
    return allNotes.filter((n) => {
      const nameMatch =
        !filterIntern ||
        n.internName.toLowerCase().includes(filterIntern.toLowerCase());
      const dateMatch = !filterDate || n.date === filterDate;
      return nameMatch && dateMatch;
    });
  }, [allNotes, filterIntern, filterDate]);

  const isLoading = admin ? allLoading : myLoading;
  const notes = admin ? filteredAdminNotes : (myNotes ?? []);

  // Group by intern for admin view
  const groupedByIntern = useMemo(() => {
    if (!admin) return null;
    const map = new Map<string, DailyNote[]>();
    for (const note of filteredAdminNotes) {
      const key = note.internName || note.internId;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(note);
    }
    return map;
  }, [admin, filteredAdminNotes]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Daily Notes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {admin
              ? "Review intern developer journals"
              : "Your daily work journal"}
          </p>
        </div>
        {!admin && (
          <Button
            type="button"
            onClick={() => setNewNoteOpen(true)}
            data-ocid="notes.new_note_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
            <kbd className="ml-2 text-[9px] px-1.5 py-0.5 bg-primary/20 rounded font-mono">
              N
            </kbd>
          </Button>
        )}
      </div>

      {/* Admin filters */}
      {admin && (
        <Card className="bg-card border-border p-4">
          <div className="flex flex-wrap gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Filter by intern</Label>
              <Input
                value={filterIntern}
                onChange={(e) => setFilterIntern(e.target.value)}
                placeholder="Search intern name…"
                className="h-8 text-sm w-52"
                data-ocid="notes.filter_intern_input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Filter by date</Label>
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="h-8 text-sm"
                data-ocid="notes.filter_date_input"
              />
            </div>
            {(filterIntern || filterDate) && (
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFilterIntern("");
                    setFilterDate("");
                  }}
                  data-ocid="notes.clear_filters_button"
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Notes list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="notes-card space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          data-ocid="notes.empty_state"
        >
          <BookOpen className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-sm font-medium">
            No notes yet — start your first daily entry
          </p>
          {!admin && (
            <Button
              type="button"
              className="mt-4"
              onClick={() => setNewNoteOpen(true)}
              data-ocid="notes.empty_new_button"
            >
              <Plus className="w-4 h-4 mr-2" /> Write Today's Note
            </Button>
          )}
        </div>
      ) : admin && groupedByIntern ? (
        <div className="space-y-8">
          {Array.from(groupedByIntern.entries()).map(
            ([internName, internNotes]) => (
              <div key={internName}>
                <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {internName}
                  <Badge variant="outline" className="text-xs">
                    {internNotes.length} note
                    {internNotes.length !== 1 ? "s" : ""}
                  </Badge>
                </p>
                <div className="space-y-3 pl-3 border-l border-border">
                  {internNotes.map((note) => (
                    <NoteCard key={note.id} note={note} canComment={admin} />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} canComment={admin} />
          ))}
        </div>
      )}

      <NewNoteModal open={newNoteOpen} onClose={() => setNewNoteOpen(false)} />
    </div>
  );
}
