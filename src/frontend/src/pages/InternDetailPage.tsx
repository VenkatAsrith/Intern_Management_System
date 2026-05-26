import { ActivityLog } from "@/components/intern-detail/ActivityLog";
import { DocumentsTab } from "@/components/intern-detail/DocumentsTab";
import {
  EmailComposeModal,
  type EmailLogEntry,
} from "@/components/intern-detail/EmailComposeModal";
import { OverviewTab } from "@/components/intern-detail/OverviewTab";
import { PerformanceTab } from "@/components/intern-detail/PerformanceTab";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActivities } from "@/hooks/use-dashboard";
import {
  useDeleteIntern,
  useIntern,
  useLogWhatsApp,
  useUpdateDocumentState,
} from "@/hooks/use-interns";
import {
  useAddPerformance,
  useDeletePerformance,
  usePerformances,
  useUpdatePerformance,
} from "@/hooks/use-performance";
import { DocumentField } from "@/types";
import type { Intern } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Mail,
  MessageCircle,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function EmailHistoryPanel({
  entries,
  onCompose,
}: {
  entries: EmailLogEntry[];
  onCompose: () => void;
}) {
  if (entries.length === 0) {
    return (
      <div
        className="bg-card border border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-center"
        data-ocid="intern_detail.email_history_panel"
      >
        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
          <Mail className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-base font-semibold text-foreground">
          No emails sent yet
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Emails you compose and log for this intern will appear here. Real
          delivery requires the email service to be enabled.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 mt-1"
          onClick={onCompose}
          data-ocid="intern_detail.email_history.compose_button"
        >
          <Plus className="h-3.5 w-3.5" /> Compose Email
        </Button>
      </div>
    );
  }
  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid="intern_detail.email_history_panel"
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground text-sm">
            Email History
          </h3>
          <p className="text-xs text-muted-foreground">
            {entries.length} email{entries.length !== 1 ? "s" : ""} logged this
            session
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={onCompose}
          data-ocid="intern_detail.email_history.compose_button"
        >
          <Plus className="h-3.5 w-3.5" /> New Email
        </Button>
      </div>
      <ul className="divide-y divide-border">
        {entries.map((entry, idx) => (
          <li
            key={entry.id}
            className="px-5 py-3.5 hover:bg-muted/30 transition-colors"
            data-ocid={`intern_detail.email_history.item.${idx + 1}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {entry.subject}
                  </span>
                  {entry.templateType && (
                    <span className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">
                      {entry.templateType}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  To: {entry.to}
                  {entry.cc ? ` · CC: ${entry.cc}` : ""}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 whitespace-pre-wrap">
                  {entry.body}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="h-3 w-3" />
                {entry.timestamp.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const spaceColors: Record<string, string> = {
  Org: "bg-red-500/20 text-red-400 border-red-500/30",
  Marketing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-muted text-muted-foreground border-border",
  OnHold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

function HeroSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <div className="flex items-start gap-5">
        <Skeleton className="h-20 w-20 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-72" />
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function InternAvatar({ intern }: { intern: Intern }) {
  if (intern.profilePicCid) {
    return (
      <img
        src={`https://assets.caffeine.ai/cdn/${intern.profilePicCid}`}
        alt={intern.name}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-border"
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

export function InternDetailPage() {
  const { id } = useParams({ from: "/protected/layout/interns/$id" });
  const navigate = useNavigate();
  const { data: intern, isLoading } = useIntern(id);
  const { data: performances = [] } = usePerformances(id);
  const { data: activities = [] } = useActivities(id);
  const logWhatsApp = useLogWhatsApp();
  const updateDoc = useUpdateDocumentState();
  const deleteIntern = useDeleteIntern();
  const addPerformance = useAddPerformance();
  const updatePerformance = useUpdatePerformance();
  const deletePerf = useDeletePerformance();

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState<string>("Offer Letter");
  const [emailLog, setEmailLog] = useState<EmailLogEntry[]>([]);

  const handleDelete = () => {
    deleteIntern.mutate(id, {
      onSuccess: () => navigate({ to: "/interns" }),
    });
  };

  const handleWhatsApp = () => {
    if (!intern) return;
    logWhatsApp.mutate(intern.id, {
      onSuccess: () => {
        window.open(`https://wa.me/91${intern.phone}`, "_blank", "noopener");
      },
    });
  };

  const openEmailModal = (subject: string) => {
    setEmailSubject(subject);
    setEmailModalOpen(true);
  };

  const handleEmailLogged = (entry: EmailLogEntry) => {
    setEmailLog((prev) => [entry, ...prev]);
    const docMap: Partial<Record<string, DocumentField>> = {
      "Offer Letter": DocumentField.offerLetterSent,
      Certificate: DocumentField.certificateSent,
      "Completion Letter": DocumentField.completionLetterSent,
    };
    if (entry.templateType) {
      const field = docMap[entry.templateType];
      if (field) updateDoc.mutate({ internId: id, field, value: true });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-5" data-ocid="intern_detail.loading_state">
        <HeroSkeleton />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!intern) {
    return (
      <div
        className="p-6 flex flex-col items-center justify-center min-h-[400px] gap-3"
        data-ocid="intern_detail.error_state"
      >
        <p className="text-xl font-semibold text-foreground">
          Intern not found
        </p>
        <p className="text-muted-foreground text-sm">
          This intern may have been deleted.
        </p>
        <Link to="/interns">
          <Button type="button" variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Interns
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-6 space-y-5 max-w-6xl mx-auto"
      data-ocid="intern_detail.page"
    >
      {/* Hero Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <InternAvatar intern={intern} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {intern.name}
              </h1>
              <Badge className={`text-xs border ${spaceColors[intern.space]}`}>
                {intern.space}
              </Badge>
              <Badge
                className={`text-xs border ${statusColors[intern.status]}`}
              >
                {intern.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1.5 truncate">
              {intern.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {intern.phone} &middot; {intern.department}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 border-emerald-600/40 text-emerald-400 hover:bg-emerald-500/10"
              onClick={handleWhatsApp}
              disabled={logWhatsApp.isPending}
              data-ocid="intern_detail.whatsapp_button"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => openEmailModal("Offer Letter")}
              data-ocid="intern_detail.email_button"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </Button>
            <Link to="/interns/$id/edit" params={{ id }}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                data-ocid="intern_detail.edit_button"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="gap-1.5"
                  data-ocid="intern_detail.delete_button"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="intern_detail.dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Intern</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete{" "}
                    <strong>{intern.name}</strong>? This action cannot be undone
                    and will remove all performance records and activity logs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="intern_detail.cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                    data-ocid="intern_detail.confirm_button"
                  >
                    Delete Intern
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" data-ocid="intern_detail.tabs">
        <TabsList className="w-full sm:w-auto bg-card border border-border">
          <TabsTrigger value="overview" data-ocid="intern_detail.overview_tab">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            data-ocid="intern_detail.documents_tab"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            data-ocid="intern_detail.performance_tab"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger value="email" data-ocid="intern_detail.email_tab">
            Email History
          </TabsTrigger>
          <TabsTrigger value="activity" data-ocid="intern_detail.activity_tab">
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <OverviewTab intern={intern} />
          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="intern_detail.extended_profile_card"
          >
            <h3 className="font-semibold text-foreground text-sm mb-3">
              Extended Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {intern.dob && (
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-foreground">{intern.dob}</p>
                </div>
              )}
              {intern.college && (
                <div>
                  <p className="text-xs text-muted-foreground">College</p>
                  <p className="text-foreground">{intern.college}</p>
                </div>
              )}
              {intern.department && (
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-foreground">{intern.department}</p>
                </div>
              )}
              {intern.domain && (
                <div>
                  <p className="text-xs text-muted-foreground">Domain</p>
                  <p className="text-foreground">{intern.domain}</p>
                </div>
              )}
              {intern.mentorAssigned && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Mentor Assigned
                  </p>
                  <p className="text-foreground">{intern.mentorAssigned}</p>
                </div>
              )}
              {intern.internshipType && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Internship Type
                  </p>
                  <p className="text-foreground">{intern.internshipType}</p>
                </div>
              )}
              {intern.stipendAmount !== undefined && (
                <div>
                  <p className="text-xs text-muted-foreground">Stipend</p>
                  <p className="text-foreground">
                    ₹{intern.stipendAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">PPO Candidate</p>
                <p className="text-foreground">
                  {intern.ppoCandidate ? "Yes" : "No"}
                </p>
              </div>
              {intern.performanceTier && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Performance Tier
                  </p>
                  <p className="text-foreground">{intern.performanceTier}</p>
                </div>
              )}
              {intern.startDate && (
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-foreground">{intern.startDate}</p>
                </div>
              )}
              {intern.expectedEndDate && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Expected End Date
                  </p>
                  <p className="text-foreground">{intern.expectedEndDate}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <DocumentsTab
            intern={intern}
            onComposeEmail={openEmailModal}
            onToggleDoc={(field, current) =>
              updateDoc.mutate({ internId: id, field, value: !current })
            }
          />
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <PerformanceTab
            internId={id}
            performances={performances}
            onAdd={(p) => addPerformance.mutate(p)}
            onUpdate={(pid, p) =>
              updatePerformance.mutate({ id: pid, payload: p })
            }
            onDelete={(pid) => deletePerf.mutate({ id: pid, internId: id })}
            isAddPending={addPerformance.isPending}
          />
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <EmailHistoryPanel
            entries={emailLog}
            onCompose={() => openEmailModal("Custom")}
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <ActivityLog activities={activities} />
        </TabsContent>
      </Tabs>

      <EmailComposeModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        internEmail={intern.email}
        internName={intern.name}
        defaultSubject={emailSubject}
        onEmailLogged={handleEmailLogged}
      />
    </div>
  );
}
