import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ProjectParticipation,
  useCreateProjectParticipation,
  useProjectParticipations,
  useUpdateMilestone,
} from "@/hooks/use-project-participations";
import { CheckCircle2, Circle, FolderKanban, Plus } from "lucide-react";
import { useState } from "react";

const PROJECT_TIMELINE = [
  "Project Assigned",
  "Training Completed",
  "First Submission",
  "Mid Review",
  "Final Review",
  "Internship Completion",
];

const statusColors: Record<ProjectParticipation["status"], string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  completed: "bg-muted text-muted-foreground border-border",
  on_hold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

function AddProjectModal({
  internId,
  onClose,
}: {
  internId: string;
  onClose: () => void;
}) {
  const create = useCreateProjectParticipation();
  const [form, setForm] = useState({
    projectName: "",
    role: "",
    startDate: "",
    milestones: [{ id: 1, value: "" }],
    deliverables: [""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      {
        internId,
        projectName: form.projectName,
        role: form.role,
        startDate: form.startDate,
        milestones: form.milestones.map((m) => m.value).filter(Boolean),
        deliverables: form.deliverables.filter(Boolean),
      },
      { onSuccess: onClose },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg space-y-4"
        data-ocid="projects.add_modal"
      >
        <h3 className="font-semibold text-foreground">
          Add Project Participation
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            placeholder="Project Name"
            value={form.projectName}
            onChange={(e) =>
              setForm((f) => ({ ...f, projectName: e.target.value }))
            }
            required
            data-ocid="projects.project_name_input"
          />
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            required
            data-ocid="projects.role_input"
          />
          <input
            type="date"
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            value={form.startDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, startDate: e.target.value }))
            }
            required
            data-ocid="projects.start_date_input"
          />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Milestones</p>
            {form.milestones.map((m) => (
              <input
                key={m.id}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground mb-1"
                placeholder={`Milestone ${m.id}`}
                value={m.value}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    milestones: f.milestones.map((ms) =>
                      ms.id === m.id ? { ...ms, value: e.target.value } : ms,
                    ),
                  }))
                }
                data-ocid={`projects.milestone_input.${m.id}`}
              />
            ))}
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  milestones: [
                    ...f.milestones,
                    { id: f.milestones.length + 1, value: "" },
                  ],
                }))
              }
            >
              + Add Milestone
            </button>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              disabled={create.isPending}
              data-ocid="projects.submit_button"
            >
              Add Project
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onClose}
              data-ocid="projects.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  internId,
}: { project: ProjectParticipation; internId: string }) {
  const updateMilestone = useUpdateMilestone();
  const completedCount = project.milestones.filter(
    (m) => m.status === "completed",
  ).length;
  const timelineStep = Math.min(
    Math.floor((project.completionPercent / 100) * PROJECT_TIMELINE.length),
    PROJECT_TIMELINE.length - 1,
  );

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-4"
      data-ocid={`projects.card.${project.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-foreground">
            {project.projectName}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">{project.role}</p>
        </div>
        <Badge className={`text-xs border ${statusColors[project.status]}`}>
          {project.status.replace("_", " ")}
        </Badge>
      </div>
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Completion</span>
          <span>{project.completionPercent}%</span>
        </div>
        <Progress value={project.completionPercent} className="h-1.5" />
      </div>
      {project.milestones.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Milestones ({completedCount}/{project.milestones.length})
          </p>
          <div className="space-y-1.5">
            {project.milestones.map((m) => (
              <button
                key={m.id}
                type="button"
                className="flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity"
                onClick={() =>
                  updateMilestone.mutate({
                    projectId: project.id,
                    milestoneId: m.id,
                    status: m.status === "completed" ? "pending" : "completed",
                    internId,
                  })
                }
                data-ocid={`projects.milestone.${m.id}`}
              >
                {m.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${m.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {m.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Project Timeline
        </p>
        <div className="relative">
          {PROJECT_TIMELINE.map((step, i) => (
            <div key={step} className="flex items-center gap-3 pb-3 last:pb-0">
              <div
                className={`h-3 w-3 rounded-full flex-shrink-0 ${i <= timelineStep ? "bg-primary" : "bg-muted border-2 border-border"}`}
              />
              {i < PROJECT_TIMELINE.length - 1 && (
                <div
                  className="absolute left-1 ml-px w-px bg-border"
                  style={{ top: `${i * 28 + 12}px`, height: "28px" }}
                />
              )}
              <span
                className={`text-xs ${i <= timelineStep ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsTab({
  internId,
  isAdmin,
}: { internId: string; isAdmin: boolean }) {
  const { data: projects = [], isLoading } = useProjectParticipations(internId);
  const [addOpen, setAddOpen] = useState(false);

  if (isLoading)
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    );

  return (
    <div className="space-y-4" data-ocid="projects.tab">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">
            Project Participation
          </h3>
          <Badge className="bg-muted text-muted-foreground border-border text-xs">
            {projects.length} projects
          </Badge>
        </div>
        {isAdmin && (
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={() => setAddOpen(true)}
            data-ocid="projects.add_button"
          >
            <Plus className="h-3.5 w-3.5" /> Add Project
          </Button>
        )}
      </div>
      {projects.length === 0 ? (
        <div
          className="bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-3 text-center"
          data-ocid="projects.empty_state"
        >
          <FolderKanban className="h-10 w-10 text-muted-foreground" />
          <p className="font-semibold text-foreground">No projects yet</p>
          <p className="text-sm text-muted-foreground">
            Assign this intern to a project to track milestones and
            deliverables.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} internId={internId} />
          ))}
        </div>
      )}
      {addOpen && (
        <AddProjectModal
          internId={internId}
          onClose={() => setAddOpen(false)}
        />
      )}
    </div>
  );
}
