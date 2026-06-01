import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, GitBranch } from "lucide-react";

const MILESTONES = [
  { key: "joined", label: "Joined Internship", icon: "🎯" },
  { key: "onboarding", label: "Completed Onboarding", icon: "📋" },
  { key: "training", label: "Completed Training", icon: "🎓" },
  { key: "first_project", label: "Assigned First Project", icon: "🗂️" },
  { key: "first_submission", label: "First Submission", icon: "📤" },
  { key: "midterm", label: "Mid-Term Review", icon: "🔍" },
  { key: "final_eval", label: "Final Evaluation", icon: "📊" },
  { key: "certificate", label: "Certificate Generated", icon: "🏆" },
  { key: "completed", label: "Internship Completed", icon: "✅" },
];

export interface TimelineMilestone {
  key: string;
  completedAt?: string;
  status: "completed" | "in_progress" | "pending";
}

function deriveTimeline(
  internStatus: string,
  startDate?: string,
  certSent?: boolean,
  _endDate?: string,
): TimelineMilestone[] {
  const statusOrder = ["Active", "Completed"];
  const statusIdx = statusOrder.indexOf(internStatus);
  return MILESTONES.map((m, i) => {
    const isCompleted =
      (m.key === "joined" && !!startDate) ||
      (m.key === "certificate" && !!certSent) ||
      (m.key === "completed" && internStatus === "Completed") ||
      (i === 0 && !!startDate) ||
      (statusIdx >= 1 && i <= 7);
    const isInProgress =
      !isCompleted &&
      ((m.key === "onboarding" && internStatus === "Active") ||
        (m.key === "first_project" && internStatus === "Active"));
    return {
      key: m.key,
      completedAt: isCompleted && m.key === "joined" ? startDate : undefined,
      status: isCompleted
        ? "completed"
        : isInProgress
          ? "in_progress"
          : "pending",
    };
  });
}

export function TimelineTab({
  intern,
}: {
  intern: {
    status: string;
    startDate?: string;
    expectedEndDate?: string;
    certificateSent?: boolean;
  };
}) {
  const milestones = deriveTimeline(
    intern.status,
    intern.startDate,
    intern.certificateSent,
    intern.expectedEndDate,
  );

  const completed = milestones.filter((m) => m.status === "completed").length;
  const completionPct = Math.round((completed / MILESTONES.length) * 100);

  return (
    <div className="space-y-4" data-ocid="timeline.tab">
      <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">Internship Timeline</h3>
        <Badge className="bg-muted text-muted-foreground border-border text-xs">
          {completionPct}% complete
        </Badge>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Overall Progress</span>
            <span>
              {completed}/{MILESTONES.length} milestones
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        <div className="relative space-y-0">
          {MILESTONES.map((m, i) => {
            const ms = milestones[i];
            return (
              <div
                key={m.key}
                className="flex items-start gap-4 relative"
                data-ocid={`timeline.milestone.${m.key}`}
              >
                {i < MILESTONES.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-7 w-0.5 h-8 ${
                      ms.status === "completed" ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
                <div className="flex-shrink-0 mt-1">
                  {ms.status === "completed" ? (
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  ) : ms.status === "in_progress" ? (
                    <div className="h-7 w-7 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <Circle className="h-7 w-7 text-muted-foreground/40" />
                  )}
                </div>
                <div className="pb-8 min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      ms.status === "completed"
                        ? "text-foreground"
                        : ms.status === "in_progress"
                          ? "text-primary"
                          : "text-muted-foreground"
                    }`}
                  >
                    {m.icon} {m.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ms.completedAt ??
                      (ms.status === "in_progress" ? "In Progress" : "Pending")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
