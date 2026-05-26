import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddClientComment,
  useClientComments,
  useDeleteClientComment,
  usePinClientComment,
  useUpdateClientComment,
} from "@/hooks/use-clients";
import type { ClientComment } from "@/types/clients";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Pencil, Pin, PinOff, Send, Trash2 } from "lucide-react";
import { useState } from "react";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

interface CommentItemProps {
  comment: ClientComment;
  clientId: string;
  depth?: number;
  replies?: ClientComment[];
  allComments?: ClientComment[];
}

function CommentItem({
  comment,
  clientId,
  depth = 0,
  replies = [],
}: CommentItemProps) {
  const updateComment = useUpdateClientComment();
  const deleteComment = useDeleteClientComment();
  const pinComment = usePinClientComment();
  const addComment = useAddClientComment();

  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  async function handleSaveEdit() {
    if (!editText.trim() || editText === comment.content) {
      setEditing(false);
      return;
    }
    await updateComment.mutateAsync({
      commentId: comment.id,
      content: editText.trim(),
      clientId,
    });
    setEditing(false);
  }

  async function handleDelete() {
    await deleteComment.mutateAsync({ commentId: comment.id, clientId });
  }

  async function handlePin() {
    await pinComment.mutateAsync({
      commentId: comment.id,
      isPinned: !comment.isPinned,
      clientId,
    });
  }

  async function handleReply() {
    if (!replyText.trim()) return;
    await addComment.mutateAsync({
      clientId,
      content: replyText.trim(),
      parentId: comment.id,
    });
    setReplyText("");
    setReplying(false);
  }

  return (
    <div className={depth > 0 ? "ml-8 border-l border-border pl-4" : ""}>
      <div
        className={`rounded-xl border p-3.5 ${
          comment.isPinned
            ? "bg-primary/5 border-primary/25"
            : "bg-card border-border"
        }`}
        data-ocid="client_detail.comment_item"
      >
        {comment.isPinned && (
          <div className="flex items-center gap-1 text-xs text-primary mb-2">
            <Pin className="h-3 w-3" />
            <span>Pinned</span>
          </div>
        )}
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
              {getInitials(comment.authorName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-foreground">
                {comment.authorName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
              </span>
            </div>
            {editing ? (
              <div className="space-y-2">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={2}
                  className="bg-background border-border resize-none text-sm"
                  data-ocid="client_detail.comment_edit_textarea"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSaveEdit}
                    disabled={updateComment.isPending}
                    data-ocid="client_detail.comment_save_button"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditing(false);
                      setEditText(comment.content);
                    }}
                    data-ocid="client_detail.comment_cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground/90 leading-relaxed break-words">
                {comment.content}
              </p>
            )}

            {/* Actions */}
            {!editing && (
              <div className="flex items-center gap-1 mt-2">
                {depth === 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setReplying((v) => !v)}
                    data-ocid="client_detail.comment_reply_button"
                  >
                    Reply
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setEditing(true);
                    setEditText(comment.content);
                  }}
                  data-ocid="client_detail.comment_edit_button"
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={handlePin}
                  disabled={pinComment.isPending}
                  data-ocid="client_detail.comment_pin_button"
                >
                  {comment.isPinned ? (
                    <PinOff className="h-3 w-3 mr-1" />
                  ) : (
                    <Pin className="h-3 w-3 mr-1" />
                  )}
                  {comment.isPinned ? "Unpin" : "Pin"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-red-400"
                  onClick={handleDelete}
                  disabled={deleteComment.isPending}
                  data-ocid="client_detail.comment_delete_button"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply input */}
      {replying && (
        <div className="mt-2 ml-8 space-y-2">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={2}
            className="bg-background border-border resize-none text-sm"
            data-ocid="client_detail.reply_textarea"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={handleReply}
              disabled={addComment.isPending || !replyText.trim()}
              data-ocid="client_detail.reply_submit_button"
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Reply
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setReplying(false);
                setReplyText("");
              }}
              data-ocid="client_detail.reply_cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              clientId={clientId}
              depth={depth + 1}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentThreadProps {
  clientId: string;
}

export function CommentThread({ clientId }: CommentThreadProps) {
  const { data: allComments = [], isLoading } = useClientComments(clientId);
  const addComment = useAddClientComment();
  const [newComment, setNewComment] = useState("");

  // Split pinned vs normal top-level
  const topLevel = allComments.filter((c) => !c.parentId);
  const replies = allComments.filter((c) => !!c.parentId);

  const pinnedFirst = [
    ...topLevel.filter((c) => c.isPinned),
    ...topLevel.filter((c) => !c.isPinned),
  ];

  function getReplies(parentId: string) {
    return replies.filter((r) => r.parentId === parentId);
  }

  async function handleSubmit() {
    if (!newComment.trim()) return;
    await addComment.mutateAsync({ clientId, content: newComment.trim() });
    setNewComment("");
  }

  return (
    <div className="space-y-4" data-ocid="client_detail.comments_tab">
      <h3 className="text-sm font-semibold text-foreground">Discussion</h3>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : pinnedFirst.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 text-center"
          data-ocid="client_detail.comments_empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Be the first to leave a note
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Comments and notes help your team stay aligned.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pinnedFirst.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              clientId={clientId}
              depth={0}
              replies={getReplies(comment.id)}
              allComments={allComments}
            />
          ))}
        </div>
      )}

      {/* New comment input */}
      <div className="border-t border-border pt-4 space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment or note for your team..."
          rows={3}
          className="bg-background border-border resize-none"
          data-ocid="client_detail.comment_input"
        />
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={addComment.isPending || !newComment.trim()}
            size="sm"
            data-ocid="client_detail.comment_submit_button"
          >
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
