import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DailyNote } from "@/hooks/useNotes";
import { useAddNoteComment, useDailyNotes } from "@/hooks/useNotes";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const FILTER_OPTIONS = ["This Week", "This Month", "All"] as const;
type Filter = (typeof FILTER_OPTIONS)[number];

function isThisWeek(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  return d >= weekStart && d <= now;
}
function isThisMonth(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  );
}

function NoteCard({
  note,
  internId: _internId,
}: { note: DailyNote; internId: string }) {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const addComment = useAddNoteComment();

  const handleComment = (status: string) => {
    if (!commentText.trim()) return;
    addComment.mutate(
      { noteId: note.id, content: commentText.trim(), status },
      {
        onSuccess: () => setCommentText(""),
      },
    );
  };

  return (
    <Card
      className="bg-card border border-border"
      data-ocid={`journal.note.${note.id}`}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {note.date}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        <p className="text-sm text-foreground leading-relaxed">
          {note.workedOn}
        </p>

        {note.blockers && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
            <p className="text-xs font-semibold text-amber-400 mb-0.5">
              Blockers
            </p>
            <p className="text-xs text-amber-300">{note.blockers}</p>
          </div>
        )}

        {expanded && (
          <div className="space-y-2 pt-1">
            {note.progress && (
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Progress
                </p>
                <p className="text-sm text-foreground">{note.progress}</p>
              </div>
            )}
            {note.learningUpdates && (
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Learning Updates
                </p>
                <p className="text-sm text-foreground">
                  {note.learningUpdates}
                </p>
              </div>
            )}
            {note.adminComments.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Admin Comments
                </p>
                {note.adminComments.map((c) => (
                  <div key={c.id} className="bg-muted/40 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-foreground">
                        {c.authorName}
                      </span>
                      {c.status && (
                        <Badge
                          className={`text-xs ${c.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}
                        >
                          {c.status}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{c.content}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-2 border-t border-border space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Add Comment
              </p>
              <textarea
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none h-16 focus:outline-none focus:ring-1 focus:ring-primary"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                data-ocid={`journal.comment_input.${note.id}`}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                  onClick={() => handleComment("approved")}
                  disabled={addComment.isPending}
                  data-ocid={`journal.approve_button.${note.id}`}
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs"
                  onClick={() => handleComment("needs_clarification")}
                  disabled={addComment.isPending}
                  data-ocid={`journal.clarify_button.${note.id}`}
                >
                  Request Clarification
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function JournalTab({ internId }: { internId: string }) {
  const { data: notes = [], isLoading } = useDailyNotes(internId);
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = notes.filter((n) => {
    if (filter === "This Week") return isThisWeek(n.date);
    if (filter === "This Month") return isThisMonth(n.date);
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="journal.tab">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">Daily Work Journal</h3>
          <Badge className="bg-muted text-muted-foreground border-border text-xs">
            {notes.length} entries
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setFilter(opt)}
              data-ocid={`journal.filter.${opt.toLowerCase().replace(/ /g, "_")}`}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filter === opt
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-3 text-center"
          data-ocid="journal.empty_state"
        >
          <Clock className="h-10 w-10 text-muted-foreground" />
          <p className="font-semibold text-foreground">
            No journal entries yet
          </p>
          <p className="text-sm text-muted-foreground">
            Journal entries will appear here once the intern submits daily
            updates.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((note) => (
            <NoteCard key={note.id} note={note} internId={internId} />
          ))}
        </div>
      )}
    </div>
  );
}
