import { ClientStatus, PriorityLevel } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateClient,
  useUpdateClient,
  useUpdateClientStatus,
} from "@/hooks/use-clients";
import {
  type Client,
  type CreateClientRequest,
  PRIORITY_LABELS,
} from "@/types/clients";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
}

const INDUSTRIES = [
  "Technology",
  "Manufacturing",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Real Estate",
  "Logistics",
  "Marketing",
  "Consulting",
  "Media",
  "Hospitality",
  "Automotive",
  "Energy",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const LEAD_SOURCES = [
  "Direct",
  "Referral",
  "Website",
  "Event",
  "Cold Outreach",
  "Partner",
  "LinkedIn",
  "Social Media",
  "Other",
];

interface ContactEntry {
  name: string;
  email: string;
  phone: string;
  role: string;
  isPrimary: boolean;
}

type FormData = {
  companyName: string;
  contactPersonName: string;
  designation: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  website: string;
  industryType: string;
  companySize: string;
  location: string;
  gstNumber: string;
  serviceInterested: string;
  dealValue: string;
  leadSource: string;
  priorityLevel: PriorityLevel;
  assignedTeamMember: string;
  followUpDate: string;
  nextMeetingDate: string;
  currentStatus: ClientStatus;
  closedReason: string;
  tags: string[];
  tagInput: string;
};

const EMPTY: FormData = {
  companyName: "",
  contactPersonName: "",
  designation: "",
  email: "",
  phone: "",
  whatsappNumber: "",
  website: "",
  industryType: "",
  companySize: "",
  location: "",
  gstNumber: "",
  serviceInterested: "",
  dealValue: "",
  leadSource: "",
  priorityLevel: PriorityLevel.medium,
  assignedTeamMember: "",
  followUpDate: "",
  nextMeetingDate: "",
  currentStatus: ClientStatus.leadCaptured,
  closedReason: "",
  tags: [],
  tagInput: "",
};

const EMPTY_CONTACT: ContactEntry = {
  name: "",
  email: "",
  phone: "",
  role: "",
  isPrimary: false,
};

function toDateInput(d?: Date) {
  if (!d) return "";
  return d.toISOString().split("T")[0];
}

function dateToNs(str: string): bigint | null {
  if (!str) return null;
  return BigInt(new Date(str).getTime()) * BigInt(1_000_000);
}

export function ClientForm({ open, onOpenChange, client }: ClientFormProps) {
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const updateStatus = useUpdateClientStatus();
  const isEdit = !!client;

  const [form, setForm] = useState<FormData>(EMPTY);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [wonLostOpen, setWonLostOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ClientStatus | null>(null);
  const [wonLostReason, setWonLostReason] = useState("");

  useEffect(() => {
    if (client) {
      setForm({
        companyName: client.companyName,
        contactPersonName: client.contactPersonName,
        designation: client.designation,
        email: client.email,
        phone: client.phone,
        whatsappNumber: client.whatsappNumber,
        website: client.website,
        industryType: client.industryType,
        companySize: client.companySize,
        location: client.location,
        gstNumber: client.gstNumber ?? "",
        serviceInterested: client.serviceInterested,
        dealValue: String(client.dealValue),
        leadSource: client.leadSource,
        priorityLevel: client.priorityLevel,
        assignedTeamMember: client.assignedTeamMember,
        followUpDate: toDateInput(client.followUpDate),
        nextMeetingDate: toDateInput(client.nextMeetingDate),
        currentStatus: client.currentStatus,
        closedReason: client.closedReason ?? "",
        tags: [],
        tagInput: "",
      });
      setContacts([]);
    } else {
      setForm(EMPTY);
      setContacts([]);
    }
    setErrors({});
    setWonLostReason("");
  }, [client]);

  function set(
    k: keyof FormData,
    v: string | PriorityLevel | ClientStatus | string[],
  ) {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  function handleStatusChange(v: string) {
    const newStatus = v as ClientStatus;
    if (
      newStatus === ClientStatus.closedWon ||
      newStatus === ClientStatus.closedLost
    ) {
      setPendingStatus(newStatus);
      setWonLostOpen(true);
    } else {
      set("currentStatus", newStatus);
    }
  }

  function confirmWonLost() {
    if (pendingStatus) {
      set("currentStatus", pendingStatus);
      set("closedReason", wonLostReason);
    }
    setWonLostOpen(false);
    setPendingStatus(null);
    setWonLostReason("");
  }

  function addTag() {
    const tag = form.tagInput.trim();
    if (!tag || form.tags.includes(tag)) {
      set("tagInput", "");
      return;
    }
    set("tags", [...form.tags, tag]);
    set("tagInput", "");
  }

  function removeTag(t: string) {
    set(
      "tags",
      form.tags.filter((x) => x !== t),
    );
  }

  function addContact() {
    setContacts((prev) => [...prev, { ...EMPTY_CONTACT }]);
  }

  function removeContact(idx: number) {
    setContacts((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateContact(
    idx: number,
    field: keyof ContactEntry,
    value: string | boolean,
  ) {
    setContacts((prev) =>
      prev.map((c, i) => {
        if (i !== idx) return c;
        if (field === "isPrimary" && value === true) {
          // Only one primary
          return { ...c, isPrimary: true };
        }
        return { ...c, [field]: value };
      }),
    );
    if (field === "isPrimary" && value === true) {
      setContacts((prev) =>
        prev.map((c, i) => ({ ...c, isPrimary: i === idx })),
      );
    }
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.companyName.trim()) errs.companyName = "Required";
    if (!form.contactPersonName.trim()) errs.contactPersonName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.industryType) errs.industryType = "Required";
    if (!form.serviceInterested.trim()) errs.serviceInterested = "Required";
    if (!form.dealValue || Number(form.dealValue) < 0)
      errs.dealValue = "Enter a valid deal value";
    if (!form.assignedTeamMember.trim()) errs.assignedTeamMember = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    const followUpDate = dateToNs(form.followUpDate);
    const nextMeetingDate = dateToNs(form.nextMeetingDate);
    const payload: CreateClientRequest = {
      companyName: form.companyName.trim(),
      contactPersonName: form.contactPersonName.trim(),
      designation: form.designation.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      whatsappNumber: form.whatsappNumber.trim(),
      website: form.website.trim(),
      industryType: form.industryType,
      companySize: form.companySize,
      location: form.location.trim(),
      gstNumber: form.gstNumber.trim() || undefined,
      serviceInterested: form.serviceInterested.trim(),
      dealValue: Number(form.dealValue),
      leadSource: form.leadSource,
      priorityLevel: form.priorityLevel,
      assignedTeamMember: form.assignedTeamMember.trim(),
      followUpDate: followUpDate ?? undefined,
      nextMeetingDate: nextMeetingDate ?? undefined,
      closedReason: form.closedReason.trim() || undefined,
      source: form.leadSource,
      tags: form.tags,
    };

    if (isEdit && client) {
      await updateClient.mutateAsync({ id: client.id, req: payload });
      if (form.currentStatus !== client.currentStatus) {
        await updateStatus.mutateAsync({
          id: client.id,
          status: form.currentStatus,
          note: form.closedReason.trim() || "Updated via client form",
        });
      }
    } else {
      const newClient = await createClient.mutateAsync(payload);
      if (form.currentStatus !== ClientStatus.leadCaptured) {
        await updateStatus.mutateAsync({
          id: newClient.id,
          status: form.currentStatus,
          note: "Initial status set at creation",
        });
      }
    }
    onOpenChange(false);
  }

  const isPending =
    createClient.isPending || updateClient.isPending || updateStatus.isPending;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto bg-card border-border p-0"
          data-ocid="clients.sheet"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border bg-card/80">
            <SheetTitle className="text-foreground text-lg font-bold">
              {isEdit ? "Edit Client" : "Add New Client"}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-sm">
              {isEdit
                ? "Update client details and business information"
                : "Fill in the details to create a new client record"}
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 py-5 space-y-6">
            {/* Basic Info */}
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Basic Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name *" error={errors.companyName}>
                  <Input
                    value={form.companyName}
                    onChange={(e) => set("companyName", e.target.value)}
                    placeholder="TechMecha Solutions"
                    data-ocid="clients.form.company_name_input"
                  />
                </Field>
                <Field
                  label="Contact Person *"
                  error={errors.contactPersonName}
                >
                  <Input
                    value={form.contactPersonName}
                    onChange={(e) => set("contactPersonName", e.target.value)}
                    placeholder="John Doe"
                    data-ocid="clients.form.contact_name_input"
                  />
                </Field>
                <Field label="Designation">
                  <Input
                    value={form.designation}
                    onChange={(e) => set("designation", e.target.value)}
                    placeholder="CTO"
                  />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="john@company.com"
                    data-ocid="clients.form.email_input"
                  />
                </Field>
                <Field label="Phone *" error={errors.phone}>
                  <Input
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    data-ocid="clients.form.phone_input"
                  />
                </Field>
                <Field label="WhatsApp Number">
                  <Input
                    value={form.whatsappNumber}
                    onChange={(e) => set("whatsappNumber", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </Field>
                <Field label="Company Website">
                  <Input
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="https://company.com"
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="Hyderabad, Telangana"
                  />
                </Field>
                <Field label="Industry *" error={errors.industryType}>
                  <Select
                    value={form.industryType}
                    onValueChange={(v) => set("industryType", v)}
                  >
                    <SelectTrigger data-ocid="clients.form.industry_select">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Company Size">
                  <Select
                    value={form.companySize}
                    onValueChange={(v) => set("companySize", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="GST Number">
                  <Input
                    value={form.gstNumber}
                    onChange={(e) => set("gstNumber", e.target.value)}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </Field>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Business Info */}
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Business Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Service Interested In *"
                  error={errors.serviceInterested}
                  className="sm:col-span-2"
                >
                  <Input
                    value={form.serviceInterested}
                    onChange={(e) => set("serviceInterested", e.target.value)}
                    placeholder="Digital Marketing, SEO, CRM Setup..."
                    data-ocid="clients.form.service_input"
                  />
                </Field>
                <Field label="Deal Value (₹) *" error={errors.dealValue}>
                  <Input
                    type="number"
                    value={form.dealValue}
                    onChange={(e) => set("dealValue", e.target.value)}
                    placeholder="500000"
                    data-ocid="clients.form.deal_value_input"
                  />
                </Field>
                <Field label="Lead Source">
                  <Select
                    value={form.leadSource}
                    onValueChange={(v) => set("leadSource", v)}
                  >
                    <SelectTrigger data-ocid="clients.form.source_select">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEAD_SOURCES.map((src) => (
                        <SelectItem key={src} value={src}>
                          {src}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Priority">
                  <Select
                    value={form.priorityLevel}
                    onValueChange={(v) =>
                      set("priorityLevel", v as PriorityLevel)
                    }
                  >
                    <SelectTrigger data-ocid="clients.form.priority_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PriorityLevel).map((p) => (
                        <SelectItem key={p} value={p}>
                          {PRIORITY_LABELS[p]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Assigned To *" error={errors.assignedTeamMember}>
                  <Input
                    value={form.assignedTeamMember}
                    onChange={(e) => set("assignedTeamMember", e.target.value)}
                    placeholder="Venkat Asrith"
                    data-ocid="clients.form.assigned_input"
                  />
                </Field>
                <Field label="Follow-up Date">
                  <Input
                    type="date"
                    value={form.followUpDate}
                    onChange={(e) => set("followUpDate", e.target.value)}
                    data-ocid="clients.form.followup_date_input"
                  />
                </Field>
                <Field label="Next Meeting Date">
                  <Input
                    type="date"
                    value={form.nextMeetingDate}
                    onChange={(e) => set("nextMeetingDate", e.target.value)}
                  />
                </Field>
                <Field label="Pipeline Status">
                  <Select
                    value={form.currentStatus}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger data-ocid="clients.form.status_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ClientStatus.leadCaptured}>
                        Lead Captured
                      </SelectItem>
                      <SelectItem value={ClientStatus.contacted}>
                        Contacted
                      </SelectItem>
                      <SelectItem value={ClientStatus.discoveryCallDone}>
                        Discovery Call Done
                      </SelectItem>
                      <SelectItem value={ClientStatus.proposalSent}>
                        Proposal Sent
                      </SelectItem>
                      <SelectItem value={ClientStatus.negotiation}>
                        Negotiation
                      </SelectItem>
                      <SelectItem value={ClientStatus.closedWon}>
                        Closed Won
                      </SelectItem>
                      <SelectItem value={ClientStatus.closedLost}>
                        Closed Lost
                      </SelectItem>
                      <SelectItem value={ClientStatus.onHold}>
                        On Hold
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                {isEdit &&
                  (form.currentStatus === ClientStatus.closedWon ||
                    form.currentStatus === ClientStatus.closedLost) && (
                    <Field label="Closed Reason" className="sm:col-span-2">
                      <Textarea
                        value={form.closedReason}
                        onChange={(e) => set("closedReason", e.target.value)}
                        placeholder="Reason for closing this deal..."
                        rows={2}
                        className="bg-background border-border resize-none text-sm"
                        data-ocid="clients.form.closed_reason_input"
                      />
                    </Field>
                  )}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Tags */}
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Tags
              </p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={form.tagInput}
                    onChange={(e) => set("tagInput", e.target.value)}
                    placeholder="Type a tag and press Enter..."
                    className="flex-1 h-8 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    data-ocid="clients.form.tag_input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={addTag}
                  >
                    Add
                  </Button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-primary/10 text-primary border border-primary/30 text-xs gap-1 pr-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-primary/60 transition-colors"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Additional Contacts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Additional Contacts
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={addContact}
                  data-ocid="clients.form.add_contact_button"
                >
                  <Plus className="w-3 h-3" /> Add Contact
                </Button>
              </div>
              {contacts.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  No additional contacts yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact, idx) => (
                    <div
                      key={contact.email || idx.toString()}
                      className="p-3 rounded-lg border border-border bg-background/50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Contact {idx + 1}
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                            <input
                              type="radio"
                              name="primaryContact"
                              checked={contact.isPrimary}
                              onChange={() =>
                                updateContact(idx, "isPrimary", true)
                              }
                              className="accent-primary"
                            />
                            Primary
                          </label>
                          <button
                            type="button"
                            onClick={() => removeContact(idx)}
                            className="text-muted-foreground hover:text-red-400 transition-colors"
                            aria-label="Remove contact"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={contact.name}
                          onChange={(e) =>
                            updateContact(idx, "name", e.target.value)
                          }
                          placeholder="Name"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={contact.role}
                          onChange={(e) =>
                            updateContact(idx, "role", e.target.value)
                          }
                          placeholder="Role / Designation"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={contact.email}
                          onChange={(e) =>
                            updateContact(idx, "email", e.target.value)
                          }
                          placeholder="Email"
                          className="h-8 text-sm"
                          type="email"
                        />
                        <Input
                          value={contact.phone}
                          onChange={(e) =>
                            updateContact(idx, "phone", e.target.value)
                          }
                          placeholder="Phone"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-card/80 sticky bottom-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-ocid="clients.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90"
              data-ocid="clients.form.save_button"
            >
              {isPending
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Client"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Won/Lost Reason Modal */}
      <Dialog open={wonLostOpen} onOpenChange={setWonLostOpen}>
        <DialogContent data-ocid="clients.wonlost.dialog">
          <DialogHeader>
            <DialogTitle>
              {pendingStatus === ClientStatus.closedWon
                ? "🎉 Mark as Closed Won"
                : "Closed Lost"}
            </DialogTitle>
            <DialogDescription>
              {pendingStatus === ClientStatus.closedWon
                ? "Congratulations! Please provide a brief reason for winning this deal."
                : "Please provide the reason why this deal was lost to help improve future pipelines."}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={wonLostReason}
            onChange={(e) => setWonLostReason(e.target.value)}
            placeholder={
              pendingStatus === ClientStatus.closedWon
                ? "e.g., Best price, strong relationship, fast delivery..."
                : "e.g., Budget constraints, competitor pricing, timeline issues..."
            }
            rows={3}
            className="bg-background border-border resize-none text-sm"
            data-ocid="clients.wonlost.reason_input"
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setWonLostOpen(false);
                setPendingStatus(null);
              }}
              data-ocid="clients.wonlost.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmWonLost}
              className={
                pendingStatus === ClientStatus.closedWon
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-destructive hover:bg-destructive/90"
              }
              data-ocid="clients.wonlost.confirm_button"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, error, children, className }: FieldProps) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {children}
      {error && (
        <p
          className="text-xs text-red-400"
          data-ocid="clients.form.field_error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
