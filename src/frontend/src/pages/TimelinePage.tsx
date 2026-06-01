import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useInterns } from "@/hooks/use-interns";
import { useAddMilestone, useTimeline } from "@/hooks/use-timeline";
import type { TimelineMilestone } from "@/hooks/use-timeline";
import { useParams } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  ClipboardCheck,
  FileText,
  Folder,
  Plus,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

const MILESTONE_TYPES = [
  { value: "Joining", label: "Joining", icon: UserPlus },
  { value: "Project", label: "Project", icon: Folder },
  { value: "Mid-Review", label: "Mid-Review", icon: ClipboardCheck },
  { value: "Document", label: "Document", icon: FileText },
  { value: "Certificate", label: "Certificate", icon: Award },
  { value: "Complete", label: "Complete", icon: CheckCircle },
];

function getMilestoneIcon(type: string) {
  const found = MILESTONE_TYPES.find((t) => t.value === type);
  const Icon = found?.icon ?? CheckCircle;
  return <Icon className="h-4 w-4" />;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function MilestoneNode({
  milestone,
  index,
}: { milestone: TimelineMilestone; index: number }) {
  const isCompleted = milestone.completedAt != null;
  return (
    <div
      className="relative flex gap-4"
      data-ocid={`timeline.milestone.${index + 1}`}
    >
      {/* Line */}
      <div className="flex flex-col items-center">
        <div
          className={[
            "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all",
            isCompleted
              ? "bg-primary border-primary text-primary-foreground"
              : "bg-card border-border text-muted-foreground",
          ].join(" ")}
        >
          {getMilestoneIcon(milestone.milestoneType)}
        </div>
        <div
          className={[
            "w-0.5 flex-1 min-h-[24px]",
            isCompleted ? "bg-primary/40" : "bg-border border-dashed",
          ].join(" ")}
        />
      </div>
      {/* Content */}
      <Card
        className={`mb-4 flex-1 min-w-0 ${isCompleted ? "border-primary/20 bg-primary/5" : "bg-card border-border"}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm text-foreground">
                  {milestone.title}
                </p>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${isCompleted ? "border-primary/30 text-primary bg-primary/5" : ""}`}
                >
                  {milestone.milestoneType}
                </Badge>
                {isCompleted && (
                  <Badge className="text-[10px] bg-green-500/10 text-green-400 border-green-500/20">
                    ✓ Completed
                  </Badge>
                )}
              </div>
              {milestone.description && (
                <p className="text-xs text-muted-foreground mt-1.5">
                  {milestone.description}
                </p>
              )}
              <p className="text-[11px] text-muted-foreground mt-1">
                Added {formatDate(milestone.createdAt)}
                {milestone.completedAt &&
                  ` · Completed ${formatDate(milestone.completedAt)}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TimelinePage() {
  const { internId } = useParams({ strict: false }) as { internId?: string };
  const { isAdmin } = useAuth();
  const { data: interns = [] } = useInterns();
  const { data, isLoading } = useTimeline(internId);
  const addMilestone = useAddMilestone();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    milestoneType: "Project",
    description: "",
    markCompleted: false,
  });

  const intern = interns.find((i) => i.id === internId);
  const milestones = data?.milestones ?? [];
  const completionPct = data?.completionPct ?? 0;

  async function handleAdd() {
    if (!internId || !form.title.trim()) return;
    await addMilestone.mutateAsync({
      internId,
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      milestoneType: form.milestoneType,
    });
    setModalOpen(false);
    setForm({
      title: "",
      milestoneType: "Project",
      description: "",
      markCompleted: false,
    });
  }

  if (!internId) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No intern selected.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto" data-ocid="timeline.page">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground">
              {intern?.name ?? "Intern"}&apos;s Timeline
            </h1>
            {intern?.joiningDate && (
              <p className="text-sm text-muted-foreground mt-1">
                Joined{" "}
                {new Date(Number(intern.joiningDate)).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </p>
            )}
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">
                  Internship Progress
                </span>
                <span className="text-xs font-semibold text-primary">
                  {completionPct}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {milestones.filter((m) => m.completedAt != null).length} of{" "}
                {milestones.length} milestones completed
              </p>
            </div>
          </div>
          {isAdmin() && (
            <Button
              type="button"
              className="gap-2 flex-shrink-0"
              onClick={() => setModalOpen(true)}
              data-ocid="timeline.open_modal_button"
            >
              <Plus className="h-4 w-4" /> Add Milestone
            </Button>
          )}
        </div>
      </div>

      {/* Timeline */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
              <Skeleton className="flex-1 h-20 rounded-xl" />
            </div>
          ))}
        </div>
      ) : milestones.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          data-ocid="timeline.empty_state"
        >
          <CheckCircle className="h-12 w-12 mb-3 opacity-20" />
          <p className="font-medium">No milestones yet</p>
          {isAdmin() && (
            <p className="text-sm mt-1">
              Click "Add Milestone" to start tracking progress.
            </p>
          )}
        </div>
      ) : (
        <div>
          {milestones.map((m, idx) => (
            <MilestoneNode key={m.id} milestone={m} index={idx} />
          ))}
        </div>
      )}

      {/* Add Milestone Modal */}
      {isAdmin() && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent
            className="max-w-md bg-card border-border"
            data-ocid="timeline.dialog"
          >
            <DialogHeader>
              <DialogTitle>Add Milestone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="milestone-title">Title</Label>
                <Input
                  id="milestone-title"
                  placeholder="e.g. Completed first project"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  data-ocid="timeline.title_input"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select
                  value={form.milestoneType}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, milestoneType: v }))
                  }
                >
                  <SelectTrigger data-ocid="timeline.type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MILESTONE_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="milestone-desc">Description (optional)</Label>
                <Textarea
                  id="milestone-desc"
                  rows={2}
                  placeholder="Brief description…"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  data-ocid="timeline.description_textarea"
                />
              </div>

              <div className="flex items-center gap-3 py-1">
                <Switch
                  id="mark-completed"
                  checked={form.markCompleted}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, markCompleted: v }))
                  }
                  data-ocid="timeline.completed_switch"
                />
                <Label htmlFor="mark-completed" className="cursor-pointer">
                  Mark as completed
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  data-ocid="timeline.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleAdd}
                  disabled={!form.title.trim() || addMilestone.isPending}
                  data-ocid="timeline.submit_button"
                >
                  {addMilestone.isPending ? "Adding…" : "Add Milestone"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
