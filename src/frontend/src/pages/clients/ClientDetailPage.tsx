import { InvoicePaymentStatus, PaymentStatus } from "@/backend";
import { ActivityTimeline } from "@/components/clients/ActivityTimeline";
import { ClientForm } from "@/components/clients/ClientForm";
import { CommentThread } from "@/components/clients/CommentThread";
import { PriorityBadge } from "@/components/clients/PriorityBadge";
import { StatusBadge } from "@/components/clients/StatusBadge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddContact,
  useClient,
  useClientInvoices,
  useDeleteClient,
  useLogQuickActivity,
  useRecentlyViewedClients,
  useUpdateClientStatus,
  useUpdateInvoiceStatus,
  useUpdateProposalStatus,
} from "@/hooks/use-clients";
import {
  ClientStatus,
  type ContactPerson,
  PRIORITY_LABELS,
  STATUS_COLORS,
  STATUS_LABELS,
  type StatusHistoryEntry,
} from "@/types/clients";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Flame,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Receipt,
  Thermometer,
  Trash2,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

// ── Pipeline stage order & icons ───────────────────────────────────────────
const STATUS_ORDER: ClientStatus[] = [
  ClientStatus.leadCaptured,
  ClientStatus.contacted,
  ClientStatus.discoveryCallDone,
  ClientStatus.proposalSent,
  ClientStatus.negotiation,
  ClientStatus.closedWon,
  ClientStatus.closedLost,
  ClientStatus.onHold,
];

const STATUS_STEP_ICONS: Record<
  ClientStatus,
  React.ComponentType<{ className?: string }>
> = {
  [ClientStatus.leadCaptured]: Phone,
  [ClientStatus.contacted]: MessageCircle,
  [ClientStatus.discoveryCallDone]: ArrowLeftRight,
  [ClientStatus.proposalSent]: FileText,
  [ClientStatus.negotiation]: ArrowLeftRight,
  [ClientStatus.closedWon]: CheckCircle2,
  [ClientStatus.closedLost]: XCircle,
  [ClientStatus.onHold]: AlertTriangle,
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function InfoField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">
        {value || (
          <span className="text-muted-foreground/50 italic">Not set</span>
        )}
      </p>
    </div>
  );
}

function LeadScoreBadge({ score }: { score: number }) {
  if (score >= 70)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
        <Flame className="h-3 w-3" /> Hot · {score}
      </span>
    );
  if (score >= 40)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
        <Thermometer className="h-3 w-3" /> Warm · {score}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted/20 text-muted-foreground border border-muted/30">
      <Thermometer className="h-3 w-3" /> Cold · {score}
    </span>
  );
}

function DealProbabilityBar({ value }: { value: number }) {
  const color =
    value >= 70
      ? "bg-emerald-500"
      : value >= 40
        ? "bg-amber-500"
        : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground tabular-nums">
        {value}%
      </span>
    </div>
  );
}

function HealthGauge({ score }: { score: number }) {
  const color =
    score >= 70
      ? "text-emerald-400"
      : score >= 40
        ? "text-amber-400"
        : "text-red-400";
  const _barColor =
    score >= 70
      ? "bg-emerald-500"
      : score >= 40
        ? "bg-amber-500"
        : "bg-red-500";
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <Progress value={score} className="h-1.5 flex-1 bg-muted" />
      <span className={`text-xs font-bold tabular-nums ${color}`}>{score}</span>
    </div>
  );
}

const INVOICE_STATUS_CONFIG: Record<
  string,
  { label: string; classes: string }
> = {
  draft: {
    label: "Draft",
    classes: "bg-muted/20 text-muted-foreground border-muted/30",
  },
  sent: {
    label: "Sent",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  viewed: {
    label: "Viewed",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
  paid: {
    label: "Paid",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  overdue: {
    label: "Overdue",
    classes: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  partial: {
    label: "Partial",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  pending: {
    label: "Pending",
    classes: "bg-muted/20 text-muted-foreground border-muted/30",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-muted/20 text-muted-foreground border-muted/30",
  },
};

const PROPOSAL_STATUS_CONFIG: Record<
  string,
  { label: string; classes: string }
> = {
  sent: {
    label: "Sent",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  viewed: {
    label: "Viewed",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
  accepted: {
    label: "Accepted",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-red-500/15 text-red-400 border-red-500/30",
  },
};

function StatusHistoryItem({
  entry,
  idx,
}: { entry: StatusHistoryEntry; idx: number }) {
  const colors = STATUS_COLORS[entry.status];
  return (
    <div
      className="flex gap-3 items-start"
      data-ocid={`client_detail.status_history.${idx + 1}`}
    >
      <div
        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${colors.bg}`}
      >
        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-semibold ${colors.text}`}>
            {STATUS_LABELS[entry.status]}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
          </span>
        </div>
        {entry.note && (
          <p className="text-xs text-muted-foreground mt-0.5 italic">
            &ldquo;{entry.note}&rdquo;
          </p>
        )}
        <p className="text-xs text-muted-foreground/70">by {entry.adminName}</p>
      </div>
    </div>
  );
}

// ── Status change dialog ───────────────────────────────────────────────────
function StatusChangeDialog({
  open,
  onOpenChange,
  currentStatus,
  clientId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  currentStatus: ClientStatus;
  clientId: string;
}) {
  const updateStatus = useUpdateClientStatus();
  const [selected, setSelected] = useState<ClientStatus>(currentStatus);
  const [note, setNote] = useState("");

  async function handleSave() {
    if (selected !== currentStatus) {
      await updateStatus.mutateAsync({ id: clientId, status: selected, note });
    }
    setNote("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border max-w-sm"
        data-ocid="client_detail.status_dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Update Pipeline Status
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {STATUS_ORDER.map((s) => {
            const colors = STATUS_COLORS[s];
            const isSelected = s === selected;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSelected(s)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border`
                    : "border-border hover:bg-muted/40"
                }`}
                data-ocid={`client_detail.status_option.${s}`}
              >
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span
                  className={`text-sm font-medium ${isSelected ? colors.text : "text-foreground"}`}
                >
                  {STATUS_LABELS[s]}
                </span>
                {isSelected && (
                  <CheckCircle2 className={`ml-auto h-4 w-4 ${colors.text}`} />
                )}
              </button>
            );
          })}
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Note (optional)</p>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for status change..."
            rows={2}
            className="bg-background border-border resize-none text-sm"
            data-ocid="client_detail.status_note_input"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            data-ocid="client_detail.status_cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={updateStatus.isPending}
            data-ocid="client_detail.status_save_button"
          >
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── WhatsApp modal ─────────────────────────────────────────────────────────
function WAModal({
  open,
  onOpenChange,
  phone,
  companyName,
  contactName,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  phone: string;
  companyName: string;
  contactName: string;
}) {
  const clean = phone.replace(/\D/g, "");
  const templates = [
    {
      label: "Follow-up",
      text: `Hi ${contactName}, just following up regarding our discussion about services for ${companyName}. Would love to connect soon!`,
    },
    {
      label: "Meeting Request",
      text: `Hi ${contactName}, hope you are well! I would like to schedule a quick meeting to discuss how TechMecha Torque can assist ${companyName}. Are you free this week?`,
    },
    {
      label: "Proposal Sent",
      text: `Hi ${contactName}, I have sent our detailed proposal for ${companyName}. Please review it and share any questions.`,
    },
  ];
  const [message, setMessage] = useState(templates[0].text);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border max-w-lg"
        data-ocid="client_detail.whatsapp_dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-400" /> WhatsApp —{" "}
            {contactName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <Button
                key={t.label}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessage(t.text)}
                className="text-xs"
                data-ocid={`client_detail.whatsapp_template.${t.label}`}
              >
                {t.label}
              </Button>
            ))}
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="bg-background border-border resize-none text-sm"
            data-ocid="client_detail.whatsapp_message_textarea"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            data-ocid="client_detail.whatsapp_cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className="bg-green-700 hover:bg-green-800 text-white border-0"
            onClick={() =>
              window.open(
                `https://wa.me/${clean}?text=${encodeURIComponent(message)}`,
                "_blank",
                "noopener,noreferrer",
              )
            }
            data-ocid="client_detail.whatsapp_send_button"
          >
            <Phone className="h-3.5 w-3.5 mr-1.5" /> Open WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Add Contact Dialog ────────────────────────────────────────────────────
function AddContactDialog({
  open,
  onOpenChange,
  clientId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  clientId: string;
}) {
  const addContact = useAddContact();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    isPrimary: false,
  });

  function reset() {
    setForm({ name: "", email: "", phone: "", role: "", isPrimary: false });
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    const contact: ContactPerson = {
      id: `c-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role.trim(),
      isPrimary: form.isPrimary,
      addedAt: Date.now(),
    };
    await addContact.mutateAsync({ clientId, contact });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent
        className="bg-card border-border max-w-sm"
        data-ocid="client_detail.add_contact_dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-primary" /> Add Contact
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {(
            [
              { key: "name", label: "Full Name *", placeholder: "Jane Smith" },
              { key: "email", label: "Email", placeholder: "jane@company.com" },
              { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
              { key: "role", label: "Role / Title", placeholder: "CTO" },
            ] as const
          ).map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs text-muted-foreground">{label}</Label>
              <Input
                value={form[key]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="bg-background border-border h-8 text-sm"
                data-ocid={`client_detail.add_contact_${key}_input`}
              />
            </div>
          ))}
          <div className="flex items-center gap-3 pt-1">
            <Switch
              checked={form.isPrimary}
              onCheckedChange={(v) => setForm((p) => ({ ...p, isPrimary: v }))}
              data-ocid="client_detail.add_contact_primary_switch"
            />
            <Label className="text-sm text-foreground">
              Set as primary contact
            </Label>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            data-ocid="client_detail.add_contact_cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={addContact.isPending || !form.name.trim()}
            data-ocid="client_detail.add_contact_save_button"
          >
            Add Contact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function ClientDetailPage() {
  const { id } = useParams({ from: "/protected/layout/clients/$id" });
  const navigate = useNavigate();
  const { data: client, isLoading } = useClient(id);
  const { data: invoices = [] } = useClientInvoices(id);
  const deleteClient = useDeleteClient();
  const updateInvoiceStatus = useUpdateInvoiceStatus();
  const updateProposalStatus = useUpdateProposalStatus();
  const logQuickActivity = useLogQuickActivity();
  const { addRecent } = useRecentlyViewedClients();
  const [editOpen, setEditOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [addContactOpen, setAddContactOpen] = useState(false);

  useEffect(() => {
    if (id) addRecent(id);
  }, [id, addRecent]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-5" data-ocid="client_detail.loading_state">
        <Skeleton className="h-6 w-28 rounded-lg" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6" data-ocid="client_detail.error_state">
        <Link
          to="/clients"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Clients
        </Link>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-semibold text-foreground">
            Client not found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            This client may have been deleted.
          </p>
        </div>
      </div>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(client.currentStatus);
  const sortedHistory = [...client.statusHistory].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );

  return (
    <div
      className="p-4 sm:p-6 space-y-5 max-w-5xl mx-auto"
      data-ocid="client_detail.page"
    >
      <Link
        to="/clients"
        data-ocid="client_detail.back_link"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </Link>

      {/* ── Hero ── */}
      <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-4">
        {/* Won/Lost Banner */}
        {(client.currentStatus === ClientStatus.closedWon ||
          client.currentStatus === ClientStatus.closedLost) &&
          client.wonLostReason && (
            <div
              className={`rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 ${
                client.currentStatus === ClientStatus.closedWon
                  ? "bg-emerald-500/10 border border-emerald-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
              data-ocid="client_detail.won_lost_banner"
            >
              {client.currentStatus === ClientStatus.closedWon ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              )}
              <span
                className={`text-sm font-medium ${
                  client.currentStatus === ClientStatus.closedWon
                    ? "text-emerald-300"
                    : "text-red-300"
                }`}
              >
                {client.currentStatus === ClientStatus.closedWon
                  ? "Won"
                  : "Lost"}
                :
              </span>
              <span className="text-sm text-foreground flex-1">
                {client.wonLostReason}
              </span>
              {client.closedAt && (
                <span className="text-xs text-muted-foreground ml-auto">
                  Closed{" "}
                  {formatDistanceToNow(new Date(client.closedAt), {
                    addSuffix: true,
                  })}
                </span>
              )}
            </div>
          )}

        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                {client.companyName}
              </h1>
              <StatusBadge status={client.currentStatus} />
              <PriorityBadge priority={client.priorityLevel} />
              <LeadScoreBadge score={client.leadScore} />
            </div>
            <p className="text-sm text-muted-foreground">
              {client.contactPersonName}
              {client.designation ? ` · ${client.designation}` : ""}
              {client.source ? (
                <span className="ml-2 text-xs text-muted-foreground/70">
                  via {client.source}
                </span>
              ) : null}
            </p>

            {/* Tags */}
            {client.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              <a
                href={`mailto:${client.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {client.email}
              </a>
              <a
                href={`tel:${client.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {client.phone}
              </a>
              {client.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {client.location}
                </span>
              )}
              {client.website && (
                <a
                  href={
                    client.website.startsWith("http")
                      ? client.website
                      : `https://${client.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {client.website}
                </a>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 space-y-2 min-w-[140px]">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                &#8377;{client.dealValue.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Deal Value</p>
              {client.assignedTeamMember && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                  <Users className="h-3 w-3" />
                  {client.assignedTeamMember}
                </p>
              )}
            </div>
            {/* Deal Probability */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Close Probability
                </span>
              </div>
              <DealProbabilityBar value={client.dealProbability} />
            </div>
            {/* Health Score */}
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground">
                Health Score
              </span>
              <HealthGauge score={client.healthScore} />
            </div>
          </div>
        </div>

        {/* Quick Activity Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs h-8 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            onClick={() =>
              logQuickActivity.mutate({
                clientId: client.id,
                activityType: "quickCall",
                notes: "Quick call logged",
              })
            }
            data-ocid="client_detail.log_call_button"
          >
            <Phone className="h-3 w-3 mr-1.5" /> Log Call
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs h-8 border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
            onClick={() =>
              logQuickActivity.mutate({
                clientId: client.id,
                activityType: "quickEmail",
                notes: "Email interaction logged",
              })
            }
            data-ocid="client_detail.log_email_button"
          >
            <Mail className="h-3 w-3 mr-1.5" /> Log Email
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs h-8 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            onClick={() =>
              logQuickActivity.mutate({
                clientId: client.id,
                activityType: "quickMeeting",
                notes: "Meeting logged",
              })
            }
            data-ocid="client_detail.log_meeting_button"
          >
            <Calendar className="h-3 w-3 mr-1.5" /> Log Meeting
          </Button>
        </div>

        {/* Pipeline stages */}
        <div className="flex items-stretch gap-0.5">
          {STATUS_ORDER.map((s, i) => {
            const colors = STATUS_COLORS[s];
            const Icon = STATUS_STEP_ICONS[s];
            const isActive = i === currentIdx;
            const isPast = i < currentIdx;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatusOpen(true)}
                className={`group flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all cursor-pointer hover:bg-muted/50 ${
                  isActive ? colors.bg : isPast ? "opacity-50" : "opacity-25"
                }`}
                data-ocid={`client_detail.pipeline_stage.${i + 1}`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive || isPast ? colors.text : "text-muted-foreground"}`}
                />
                <span
                  className={`text-[10px] font-medium hidden sm:block ${isActive ? colors.text : "text-muted-foreground"}`}
                >
                  {STATUS_LABELS[s]}
                </span>
              </button>
            );
          })}
        </div>

        <Separator className="bg-border" />
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setEditOpen(true)}
            data-ocid="client_detail.edit_button"
          >
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setStatusOpen(true)}
            data-ocid="client_detail.change_status_button"
          >
            <ArrowLeftRight className="h-3.5 w-3.5 mr-1.5" />
            Change Status
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            onClick={() => setWaOpen(true)}
            data-ocid="client_detail.whatsapp_button"
          >
            <Phone className="h-3.5 w-3.5 mr-1.5" />
            WhatsApp
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                data-ocid="client_detail.delete_button"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              className="bg-card border-border"
              data-ocid="client_detail.delete_dialog"
            >
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">
                  Delete {client.companyName}?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  This will permanently remove the client and all associated
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-muted border-border text-foreground"
                  data-ocid="client_detail.delete_cancel_button"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={async () => {
                    await deleteClient.mutateAsync(client.id);
                    navigate({ to: "/clients" });
                  }}
                  data-ocid="client_detail.delete_confirm_button"
                >
                  Delete Client
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="profile" data-ocid="client_detail.tabs">
        <TabsList className="bg-card border border-border w-full justify-start gap-1 p-1 h-auto flex-wrap">
          <TabsTrigger value="profile" data-ocid="client_detail.profile_tab">
            <Building2 className="h-3.5 w-3.5 mr-1.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            data-ocid="client_detail.documents_tab"
          >
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            data-ocid="client_detail.activity_tab_trigger"
          >
            <ArrowLeftRight className="h-3.5 w-3.5 mr-1.5" />
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            data-ocid="client_detail.comments_tab_trigger"
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
            Comments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-6">
            <section>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Company Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoField label="Company Name" value={client.companyName} />
                <InfoField label="Industry" value={client.industryType} />
                <InfoField label="Company Size" value={client.companySize} />
                <InfoField label="Location" value={client.location} />
                <InfoField label="Website" value={client.website} />
                <InfoField label="GST Number" value={client.gstNumber} />
              </div>
            </section>
            <Separator className="bg-border" />

            {/* ── Contacts Section ── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Contacts ({client.contacts.length || 1})
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => setAddContactOpen(true)}
                  data-ocid="client_detail.add_contact_button"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Contact
                </Button>
              </div>

              {client.contacts.length > 0 ? (
                <div className="space-y-3">
                  {client.contacts.map((contact, idx) => (
                    <div
                      key={contact.id}
                      className={`rounded-xl p-4 border flex flex-col sm:flex-row sm:items-center gap-3 ${
                        contact.isPrimary
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/20 border-border"
                      }`}
                      data-ocid={`client_detail.contact_card.${idx + 1}`}
                    >
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {contact.name}
                          </span>
                          {contact.isPrimary && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30">
                              Primary
                            </span>
                          )}
                        </div>
                        {contact.role && (
                          <p className="text-xs text-muted-foreground">
                            {contact.role}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 mt-1">
                          {contact.email && (
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                            >
                              <Mail className="h-3 w-3" /> {contact.email}
                            </a>
                          )}
                          {contact.phone && (
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                            >
                              <Phone className="h-3 w-3" /> {contact.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Primary contact from flat fields as fallback
                <div
                  className="rounded-xl p-4 border bg-primary/5 border-primary/20 flex flex-col sm:flex-row sm:items-center gap-3"
                  data-ocid="client_detail.contact_card.1"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">
                      {client.contactPersonName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {client.contactPersonName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30">
                        Primary
                      </span>
                    </div>
                    {client.designation && (
                      <p className="text-xs text-muted-foreground">
                        {client.designation}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-1">
                      <a
                        href={`mailto:${client.email}`}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <Mail className="h-3 w-3" /> {client.email}
                      </a>
                      <a
                        href={`tel:${client.phone}`}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <Phone className="h-3 w-3" /> {client.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <Separator className="bg-border" />
            <section>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Business Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoField
                  label="Service Interested In"
                  value={client.serviceInterested}
                />
                <InfoField
                  label="Deal Value"
                  value={`INR ${client.dealValue.toLocaleString()}`}
                />
                <InfoField label="Lead Source" value={client.leadSource} />
                <InfoField
                  label="Priority"
                  value={PRIORITY_LABELS[client.priorityLevel]}
                />
                <InfoField
                  label="Assigned Team Member"
                  value={client.assignedTeamMember}
                />
                <InfoField
                  label="Follow-up Date"
                  value={client.followUpDate?.toLocaleDateString()}
                />
                <InfoField
                  label="Next Meeting Date"
                  value={client.nextMeetingDate?.toLocaleDateString()}
                />
                <InfoField
                  label="Client Since"
                  value={client.createdAt.toLocaleDateString()}
                />
                <InfoField
                  label="Last Activity"
                  value={client.lastActivityDate?.toLocaleDateString()}
                />
              </div>
            </section>
            {(client.currentStatus === ClientStatus.closedWon ||
              client.currentStatus === ClientStatus.closedLost) && (
              <>
                <Separator className="bg-border" />
                <section>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                    Closure Information
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <InfoField
                      label="Closed Reason"
                      value={client.closedReason}
                    />
                  </div>
                </section>
              </>
            )}
            <div className="flex justify-end pt-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setEditOpen(true)}
                data-ocid="client_detail.profile_edit_button"
              >
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                Edit Profile
              </Button>
            </div>
            {sortedHistory.length > 0 && (
              <>
                <Separator className="bg-border" />
                <section>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                    Status History
                  </p>
                  <div className="space-y-3">
                    {sortedHistory.map((entry, idx) => (
                      <StatusHistoryItem
                        key={`${entry.status}-${entry.timestamp.getTime()}`}
                        entry={entry}
                        idx={idx}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-6">
            {/* ── Proposal Tracking ── */}
            <section>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Proposal Tracking
              </p>
              {client.proposalStatus ? (
                <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        (
                          PROPOSAL_STATUS_CONFIG[client.proposalStatus] ??
                          PROPOSAL_STATUS_CONFIG.sent
                        ).classes
                      }`}
                    >
                      <FileText className="h-3 w-3" />
                      {
                        (
                          PROPOSAL_STATUS_CONFIG[client.proposalStatus] ??
                          PROPOSAL_STATUS_CONFIG.sent
                        ).label
                      }
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Version{" "}
                      {client.proposalVersion > 0 ? client.proposalVersion : 1}
                    </span>
                    {client.proposalExpiry &&
                      (() => {
                        const daysLeft = differenceInDays(
                          new Date(client.proposalExpiry),
                          new Date(),
                        );
                        return (
                          <span
                            className={`text-xs font-medium ${
                              daysLeft < 0
                                ? "text-red-400"
                                : daysLeft <= 3
                                  ? "text-amber-400"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {daysLeft < 0
                              ? `Expired ${Math.abs(daysLeft)}d ago`
                              : daysLeft === 0
                                ? "Expires today"
                                : daysLeft <= 3
                                  ? `⚠ Expires in ${daysLeft}d`
                                  : `Expires in ${daysLeft}d`}
                          </span>
                        );
                      })()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["sent", "viewed", "accepted", "rejected"] as const).map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            updateProposalStatus.mutate({
                              clientId: client.id,
                              status: s,
                              version: BigInt(client.proposalVersion),
                            })
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                            client.proposalStatus === s
                              ? `${
                                  (
                                    PROPOSAL_STATUS_CONFIG[s] ??
                                    PROPOSAL_STATUS_CONFIG.sent
                                  ).classes
                                } opacity-100`
                              : "border-border text-muted-foreground hover:bg-muted/40"
                          }`}
                          data-ocid={`client_detail.proposal_status.${s}`}
                        >
                          {
                            (
                              PROPOSAL_STATUS_CONFIG[s] ??
                              PROPOSAL_STATUS_CONFIG.sent
                            ).label
                          }
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-xl border border-dashed border-border p-6 text-center"
                  data-ocid="client_detail.proposal_empty_state"
                >
                  <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No proposal sent yet
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-3 text-xs"
                    onClick={() =>
                      updateProposalStatus.mutate({
                        clientId: client.id,
                        status: "sent",
                        version: BigInt(1),
                      })
                    }
                    data-ocid="client_detail.mark_proposal_sent_button"
                  >
                    Mark Proposal as Sent
                  </Button>
                </div>
              )}
            </section>

            <Separator className="bg-border" />

            {/* ── Invoice Status ── */}
            <section>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Invoices
              </p>
              {invoices.length > 0 ? (
                <div className="space-y-3">
                  {invoices.map((inv, idx) => {
                    const statusCfg =
                      INVOICE_STATUS_CONFIG[inv.status] ??
                      INVOICE_STATUS_CONFIG.sent;
                    const isOverdue = inv.status === "overdue";
                    return (
                      <div
                        key={inv.id}
                        className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                          isOverdue
                            ? "border-red-500/30 bg-red-500/5"
                            : "border-border bg-muted/20"
                        }`}
                        data-ocid={`client_detail.invoice_card.${idx + 1}`}
                      >
                        <Receipt
                          className={`h-5 w-5 flex-shrink-0 ${
                            isOverdue ? "text-red-400" : "text-primary"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {inv.invoiceNumber}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${statusCfg.classes}`}
                            >
                              {statusCfg.label}
                            </span>
                            {inv.status === "partial" && (
                              <span className="text-xs text-amber-400">
                                ₹{inv.amountPaid.toLocaleString()} / ₹
                                {inv.total.toLocaleString()} paid
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                            <span>Total: ₹{inv.total.toLocaleString()}</span>
                            {inv.dueDate && (
                              <span
                                className={
                                  isOverdue ? "text-red-400 font-medium" : ""
                                }
                              >
                                Due:{" "}
                                {new Date(inv.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            <span>
                              Created: {inv.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {inv.status !== "paid" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 flex-shrink-0"
                            onClick={() =>
                              updateInvoiceStatus.mutate({
                                clientId: client.id,
                                invoiceId: inv.id,
                                status: InvoicePaymentStatus.paid,
                              })
                            }
                            data-ocid={`client_detail.mark_paid_button.${idx + 1}`}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Mark Paid
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-8 text-center"
                  data-ocid="client_detail.invoices_empty_state"
                >
                  <Receipt className="h-8 w-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No invoices yet
                  </p>
                </div>
              )}
            </section>

            <Separator className="bg-border" />

            {/* ── Document Upload Placeholder ── */}
            <section>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Documents
              </p>
              <div
                className="flex flex-col items-center justify-center py-10 text-center rounded-xl border border-dashed border-border"
                data-ocid="client_detail.documents_empty_state"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Document Center
                </p>
                <p className="text-xs text-muted-foreground max-w-xs mb-3">
                  Upload proposals, agreements, contracts, and presentations.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
                  {[
                    "Proposals",
                    "Quotations",
                    "Agreements",
                    "Contracts",
                    "Presentations",
                  ].map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-xs text-muted-foreground border-border"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground/50 mt-3">
                  Enable the object-storage extension to activate uploads.
                </p>
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
            <ActivityTimeline clientId={client.id} />
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
            <CommentThread clientId={client.id} />
          </div>
        </TabsContent>
      </Tabs>

      <ClientForm open={editOpen} onOpenChange={setEditOpen} client={client} />
      <WAModal
        open={waOpen}
        onOpenChange={setWaOpen}
        phone={client.whatsappNumber || client.phone}
        companyName={client.companyName}
        contactName={client.contactPersonName}
      />
      <StatusChangeDialog
        open={statusOpen}
        onOpenChange={setStatusOpen}
        currentStatus={client.currentStatus}
        clientId={client.id}
      />
      <AddContactDialog
        open={addContactOpen}
        onOpenChange={setAddContactOpen}
        clientId={client.id}
      />

      <p className="py-4 text-center text-xs text-muted-foreground/50">
        Last updated{" "}
        {formatDistanceToNow(client.updatedAt, { addSuffix: true })} &middot;
        Created {client.createdAt.toLocaleDateString()} by {client.createdBy}
      </p>
    </div>
  );
}
