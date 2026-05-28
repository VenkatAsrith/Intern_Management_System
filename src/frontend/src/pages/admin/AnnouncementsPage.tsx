import type { Announcement } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAnnouncementsBySpace,
  useCreateAnnouncement,
  useDeleteAnnouncement,
} from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import { Megaphone, SendHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ALL_SPACES = ["Org", "Marketing", "Learning"];

function AnnouncementCard({ ann }: { ann: Announcement }) {
  const deleteAnn = useDeleteAnnouncement();

  const handleDelete = async () => {
    try {
      await deleteAnn.mutateAsync(ann.id);
      toast.success("Announcement deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const expiry = ann.expiresAt
    ? new Date(Number(ann.expiresAt) / 1_000_000).toLocaleDateString()
    : null;
  const isExpired =
    ann.expiresAt && Number(ann.expiresAt) / 1_000_000 < Date.now();

  return (
    <div
      className={`rounded-xl border p-4 space-y-3 ${
        isExpired ? "border-border/50 opacity-60" : "border-border"
      } bg-card`}
      data-ocid="announcements.card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Megaphone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {ann.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {ann.content}
            </p>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 flex-shrink-0 hover:bg-destructive/10"
              data-ocid="announcements.delete_button"
            >
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card border-border text-foreground">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to delete "{ann.title}"? This cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="border-border"
                data-ocid="announcements.cancel_button"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90"
                data-ocid="announcements.confirm_button"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {(ann.targetSpaces ?? []).map((s) => (
          <Badge
            key={s}
            variant="outline"
            className="text-xs border-border text-muted-foreground"
          >
            {s}
          </Badge>
        ))}
        {expiry && (
          <span
            className={`text-xs ${isExpired ? "text-destructive" : "text-muted-foreground"}`}
          >
            {isExpired ? "Expired" : "Expires"} {expiry}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AnnouncementsPage() {
  const { isAdmin } = useAuth();
  const { data: announcements, isLoading } = useAnnouncementsBySpace();
  const createAnn = useCreateAnnouncement();

  const [form, setForm] = useState({
    title: "",
    body: "",
    targetSpaces: [] as string[],
    expiryDate: "",
  });

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Access denied — admin only</p>
      </div>
    );
  }

  const toggleSpace = (space: string) => {
    setForm((f) => ({
      ...f,
      targetSpaces: f.targetSpaces.includes(space)
        ? f.targetSpaces.filter((s) => s !== space)
        : [...f.targetSpaces, space],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const expiresAt = form.expiryDate
        ? new Date(form.expiryDate).getTime() * 1_000_000
        : undefined;
      await createAnn.mutateAsync({
        title: form.title,
        body: form.body,
        targetSpaces: form.targetSpaces,
        expiresAt,
      });
      toast.success("Announcement posted");
      setForm({ title: "", body: "", targetSpaces: [], expiryDate: "" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to post announcement",
      );
    }
  };

  return (
    <div className="p-6 space-y-6" data-ocid="announcements.page">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Broadcast messages to specific spaces or all users
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Create form */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">
            Create Announcement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ann-title">Title</Label>
              <Input
                id="ann-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
                placeholder="Announcement title..."
                className="bg-background border-input"
                data-ocid="announcements.title_input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ann-body">Body</Label>
              <Textarea
                id="ann-body"
                value={form.body}
                onChange={(e) =>
                  setForm((f) => ({ ...f, body: e.target.value }))
                }
                required
                placeholder="Announcement body..."
                className="bg-background border-input min-h-[100px]"
                data-ocid="announcements.body_textarea"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Spaces</Label>
              <div className="flex gap-4">
                {ALL_SPACES.map((space) => (
                  <div key={space} className="flex items-center gap-2">
                    <Checkbox
                      id={`ann-space-${space}`}
                      checked={form.targetSpaces.includes(space)}
                      onCheckedChange={() => toggleSpace(space)}
                      data-ocid={`announcements.space_${space.toLowerCase()}_checkbox`}
                    />
                    <Label
                      htmlFor={`ann-space-${space}`}
                      className="cursor-pointer text-sm"
                    >
                      {space}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ann-expiry">Expiry Date (optional)</Label>
              <Input
                id="ann-expiry"
                type="date"
                value={form.expiryDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, expiryDate: e.target.value }))
                }
                className="bg-background border-input w-48"
                data-ocid="announcements.expiry_date_input"
              />
            </div>
            <Button
              type="submit"
              disabled={createAnn.isPending}
              className="gap-2 w-full"
              data-ocid="announcements.submit_button"
            >
              <SendHorizontal className="h-4 w-4" />
              {createAnn.isPending ? "Posting..." : "Post Announcement"}
            </Button>
          </form>
        </div>

        {/* Right: Active announcements */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">
            Active Announcements
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : (announcements ?? []).length === 0 ? (
            <div
              className="rounded-xl border border-border bg-card p-8 text-center"
              data-ocid="announcements.empty_state"
            >
              <Megaphone className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No announcements yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {(announcements ?? []).map((ann) => (
                <AnnouncementCard key={ann.id} ann={ann} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
