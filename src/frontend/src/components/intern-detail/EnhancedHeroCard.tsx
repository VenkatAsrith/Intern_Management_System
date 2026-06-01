import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CompositePerformanceScore } from "@/hooks/use-composite-score";
import type { Intern } from "@/types";
import type { Performance } from "@/types";
import { Award, FileText, Mail, MessageCircle, Pencil } from "lucide-react";

export interface EnhancedHeroProps {
  intern: Intern;
  performances: Performance[];
  compositeScore: CompositePerformanceScore | null;
  onWhatsApp: () => void;
  onEmail: (subject: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  isWhatsAppPending: boolean;
  onGenerateCertificate: () => void;
  onGenerateOfferLetter: () => void;
  onGenerateCompletionLetter: () => void;
  onAssignTask?: () => void;
  onSendMessage?: () => void;
}

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-muted text-muted-foreground border-border",
  OnHold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "On Leave": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Probation: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Terminated: "bg-red-500/20 text-red-400 border-red-500/30",
};

const spaceColors: Record<string, string> = {
  Org: "bg-red-500/20 text-red-400 border-red-500/30",
  Marketing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

function calcCompletionPct(intern: Intern): number {
  if (!intern.startDate || !intern.expectedEndDate) return 0;
  const start = new Date(intern.startDate).getTime();
  const end = new Date(intern.expectedEndDate).getTime();
  const now = Date.now();
  if (end <= start) return 0;
  return Math.min(
    100,
    Math.max(0, Math.round(((now - start) / (end - start)) * 100)),
  );
}

function InternAvatar({ intern }: { intern: Intern }) {
  if (intern.profilePicCid) {
    return (
      <img
        src={`https://assets.caffeine.ai/cdn/${intern.profilePicCid}`}
        alt={intern.name}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-border flex-shrink-0"
      />
    );
  }
  const initials = intern.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const hue = intern.name.charCodeAt(0) % 360;
  return (
    <div
      className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ring-2 ring-border flex-shrink-0"
      style={{ background: `hsl(${hue}, 50%, 30%)` }}
    >
      {initials}
    </div>
  );
}

export function EnhancedHeroCard({
  intern,
  performances,
  compositeScore,
  onWhatsApp,
  onEmail,
  onEdit,
  isWhatsAppPending,
  onGenerateCertificate,
  onGenerateOfferLetter,
  onGenerateCompletionLetter,
  onAssignTask,
}: EnhancedHeroProps) {
  const completionPct = calcCompletionPct(intern);
  const avgPerf =
    compositeScore?.overallScore ??
    (performances.length > 0
      ? Math.round(
          (performances.reduce((s, p) => s + p.overallScore, 0) /
            performances.length) *
            20,
        )
      : 0);
  const scoreColor =
    avgPerf >= 80
      ? "text-emerald-400"
      : avgPerf >= 60
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <InternAvatar intern={intern} />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {intern.name}
            </h1>
            <Badge className={`text-xs border ${spaceColors[intern.space]}`}>
              {intern.space}
            </Badge>
            <Badge
              className={`text-xs border ${statusColors[String(intern.status)]}`}
            >
              {String(intern.status)}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0.5 text-xs text-muted-foreground">
            {intern.department && (
              <span>
                Dept:{" "}
                <span className="text-foreground">{intern.department}</span>
              </span>
            )}
            {intern.internshipType && (
              <span>
                Type:{" "}
                <span className="text-foreground">{intern.internshipType}</span>
              </span>
            )}
            {intern.startDate && (
              <span>
                Start:{" "}
                <span className="text-foreground">{intern.startDate}</span>
              </span>
            )}
            {intern.expectedEndDate && (
              <span>
                End:{" "}
                <span className="text-foreground">
                  {intern.expectedEndDate}
                </span>
              </span>
            )}
            {intern.domain && (
              <span>
                Domain: <span className="text-foreground">{intern.domain}</span>
              </span>
            )}
            {intern.mentorAssigned && (
              <span>
                Mentor:{" "}
                <span className="text-foreground">{intern.mentorAssigned}</span>
              </span>
            )}
          </div>
          {completionPct > 0 && (
            <div className="pt-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
                <span>Internship Progress</span>
                <span>{completionPct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden w-48">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {avgPerf > 0 && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Performance</p>
              <p className={`text-2xl font-bold ${scoreColor}`}>
                {avgPerf}
                <span className="text-xs font-normal text-muted-foreground">
                  /100
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 border-emerald-600/40 text-emerald-400 hover:bg-emerald-500/10"
          onClick={onWhatsApp}
          disabled={isWhatsAppPending}
          data-ocid="intern_detail.whatsapp_button"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => onEmail("Offer Letter")}
          data-ocid="intern_detail.email_button"
        >
          <Mail className="h-3.5 w-3.5" /> Email
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={onEdit}
          data-ocid="intern_detail.edit_button"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </Button>
        {onAssignTask && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onAssignTask}
            data-ocid="intern_detail.assign_task_button"
          >
            Assign Task
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={onGenerateOfferLetter}
          data-ocid="intern_detail.gen_offer_button"
        >
          <FileText className="h-3.5 w-3.5" /> Offer Letter
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={onGenerateCertificate}
          data-ocid="intern_detail.gen_cert_button"
        >
          <Award className="h-3.5 w-3.5" /> Certificate
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={onGenerateCompletionLetter}
          data-ocid="intern_detail.gen_completion_button"
        >
          <FileText className="h-3.5 w-3.5" /> Completion Letter
        </Button>
      </div>
    </div>
  );
}
