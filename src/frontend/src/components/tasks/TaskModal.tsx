import type { Task } from "@/backend";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useInterns } from "@/hooks/use-interns";
import { useCreateTask, useUpdateTask } from "@/hooks/useWorkspace";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const SPACES = [
  { value: "Org", label: "Org" },
  { value: "Marketing", label: "Marketing" },
  { value: "Learning", label: "Learning" },
];

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  prefillInternId?: string;
}

export function TaskModal({
  open,
  onClose,
  task,
  prefillInternId,
}: TaskModalProps) {
  const { isAdmin, sessionToken } = useAuth();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: interns = [] } = useInterns();

  // Determine the current user's intern ID from session if not admin
  const currentUserInternId = prefillInternId ?? "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [assignedInternId, setAssignedInternId] = useState("");
  const [teamSpace, setTeamSpace] = useState("Org");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const adminMode = isAdmin();

  useEffect(() => {
    if (!open) return;
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDeadline(
        task.deadline
          ? new Date(Number(task.deadline) / 1_000_000)
              .toISOString()
              .slice(0, 10)
          : "",
      );
      setAssignedInternId(task.assignedInternId);
      setTeamSpace(task.teamSpace);
      setTags(task.tags);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDeadline("");
      setAssignedInternId(adminMode ? "" : currentUserInternId);
      setTeamSpace("Org");
      setTags([]);
    }
    setErrors({});
  }, [open, task, adminMode, currentUserInternId]);

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!assignedInternId) errs.assignedInternId = "Assignee is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionToken) {
      toast.error("Not authenticated");
      return;
    }
    if (!validate()) return;

    const deadlineNs = deadline
      ? BigInt(new Date(deadline).getTime()) * 1_000_000n
      : undefined;

    if (task) {
      await updateTask.mutateAsync({
        id: task.id,
        payload: {
          title,
          description,
          priority,
          deadline: deadlineNs,
          assignedInternId,
          teamSpace,
          tags,
        },
      });
    } else {
      await createTask.mutateAsync({
        title,
        description,
        priority,
        deadline: deadlineNs,
        assignedInternId,
        teamSpace,
        tags,
      });
    }
    onClose();
  }

  const isPending = createTask.isPending || updateTask.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="max-w-lg bg-card border-border"
        data-ocid="task_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {task ? "Edit Task" : "Create Task"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="space-y-4"
        >
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="task-title" className="text-sm text-foreground">
              Title <span className="text-primary">*</span>
            </Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design landing page mockup"
              className="bg-background border-border"
              data-ocid="task_modal.title_input"
            />
            {errors.title && (
              <p
                className="text-xs text-destructive"
                data-ocid="task_modal.title_field_error"
              >
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="task-desc" className="text-sm text-foreground">
              Description
            </Label>
            <Textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task details, expected output..."
              rows={3}
              className="bg-background border-border resize-none"
              data-ocid="task_modal.description_textarea"
            />
          </div>

          {/* Priority + Deadline row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger
                  className="bg-background border-border"
                  data-ocid="task_modal.priority_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="task-deadline"
                className="text-sm text-foreground"
              >
                Deadline
              </Label>
              <Input
                id="task-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-background border-border"
                data-ocid="task_modal.deadline_input"
              />
            </div>
          </div>

          {/* Assignee */}
          <div className="space-y-1.5">
            <Label className="text-sm text-foreground">
              Assign To <span className="text-primary">*</span>
            </Label>
            {adminMode ? (
              <Select
                value={assignedInternId}
                onValueChange={setAssignedInternId}
              >
                <SelectTrigger
                  className="bg-background border-border"
                  data-ocid="task_modal.assignee_select"
                >
                  <SelectValue placeholder="Select intern..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {interns.map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      {i.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={
                  interns.find((i) => i.id === assignedInternId)?.name ?? "You"
                }
                readOnly
                disabled
                className="bg-muted border-border cursor-not-allowed"
                data-ocid="task_modal.assignee_readonly"
              />
            )}
            {errors.assignedInternId && (
              <p
                className="text-xs text-destructive"
                data-ocid="task_modal.assignee_field_error"
              >
                {errors.assignedInternId}
              </p>
            )}
          </div>

          {/* Team Space */}
          <div className="space-y-1.5">
            <Label className="text-sm text-foreground">Team Space</Label>
            <Select value={teamSpace} onValueChange={setTeamSpace}>
              <SelectTrigger
                className="bg-background border-border"
                data-ocid="task_modal.space_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {SPACES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label className="text-sm text-foreground">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag and press Enter"
                className="bg-background border-border flex-1"
                data-ocid="task_modal.tag_input"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTag}
                className="border-border"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-primary/60"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isPending}
              data-ocid="task_modal.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground"
              data-ocid="task_modal.submit_button"
            >
              {isPending ? "Saving..." : task ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
