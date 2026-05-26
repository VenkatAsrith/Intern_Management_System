import { c as createLucideIcon, j as jsxRuntimeExports, Z as X, a6 as cn, aG as useCreateClient, ag as useUpdateClient, a8 as useUpdateClientStatus, r as reactExports, n as ClientStatus, aa as PriorityLevel, aD as Separator, a9 as PRIORITY_LABELS, k as Button, m as Badge, ae as PRIORITY_COLORS, aH as ArrowRight, S as STATUS_LABELS, i as STATUS_COLORS, C as Clock, F as FileText } from "./index-Cx0SFoKr.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, f as DialogDescription, e as DialogFooter } from "./dialog-CLk8W9-n.js";
import { I as Input } from "./input-DGvN6Bpn.js";
import { L as Label } from "./label-Mcr_69bu.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B8J2Sdiv.js";
import { R as Root, C as Content, a as Close, T as Title, D as Description, b as Portal, O as Overlay } from "./index-AnWvD9gK.js";
import { T as Textarea } from "./textarea-h8IksRvN.js";
import { P as Plus } from "./plus-QwDbQIee.js";
import { Z as Zap } from "./zap-CtjPSRtY.js";
import { A as ArrowUp, a as ArrowDown, C as Circle } from "./circle-BfbLHcck.js";
import { a as CircleX, C as CircleCheck } from "./circle-x-DvuSR1A-.js";
import { P as Phone } from "./phone-Om3UKbVn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
      key: "9pr0kb"
    }
  ],
  ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
  ["path", { d: "M3 4h8", key: "1ep09j" }]
];
const Handshake = createLucideIcon("handshake", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
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
  "Other"
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
  "Other"
];
const EMPTY = {
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
  tagInput: ""
};
const EMPTY_CONTACT = {
  name: "",
  email: "",
  phone: "",
  role: "",
  isPrimary: false
};
function toDateInput(d) {
  if (!d) return "";
  return d.toISOString().split("T")[0];
}
function dateToNs(str) {
  if (!str) return null;
  return BigInt(new Date(str).getTime()) * BigInt(1e6);
}
function ClientForm({ open, onOpenChange, client }) {
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const updateStatus = useUpdateClientStatus();
  const isEdit = !!client;
  const [form, setForm] = reactExports.useState(EMPTY);
  const [contacts, setContacts] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState(
    {}
  );
  const [wonLostOpen, setWonLostOpen] = reactExports.useState(false);
  const [pendingStatus, setPendingStatus] = reactExports.useState(null);
  const [wonLostReason, setWonLostReason] = reactExports.useState("");
  reactExports.useEffect(() => {
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
        tagInput: ""
      });
      setContacts([]);
    } else {
      setForm(EMPTY);
      setContacts([]);
    }
    setErrors({});
    setWonLostReason("");
  }, [client]);
  function set(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: void 0 }));
  }
  function handleStatusChange(v) {
    const newStatus = v;
    if (newStatus === ClientStatus.closedWon || newStatus === ClientStatus.closedLost) {
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
  function removeTag(t) {
    set(
      "tags",
      form.tags.filter((x) => x !== t)
    );
  }
  function addContact() {
    setContacts((prev) => [...prev, { ...EMPTY_CONTACT }]);
  }
  function removeContact(idx) {
    setContacts((prev) => prev.filter((_, i) => i !== idx));
  }
  function updateContact(idx, field, value) {
    setContacts(
      (prev) => prev.map((c, i) => {
        if (i !== idx) return c;
        if (field === "isPrimary" && value === true) {
          return { ...c, isPrimary: true };
        }
        return { ...c, [field]: value };
      })
    );
    if (field === "isPrimary" && value === true) {
      setContacts(
        (prev) => prev.map((c, i) => ({ ...c, isPrimary: i === idx }))
      );
    }
  }
  function validate() {
    const errs = {};
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
    const payload = {
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
      gstNumber: form.gstNumber.trim() || void 0,
      serviceInterested: form.serviceInterested.trim(),
      dealValue: Number(form.dealValue),
      leadSource: form.leadSource,
      priorityLevel: form.priorityLevel,
      assignedTeamMember: form.assignedTeamMember.trim(),
      followUpDate: followUpDate ?? void 0,
      nextMeetingDate: nextMeetingDate ?? void 0,
      closedReason: form.closedReason.trim() || void 0,
      source: form.leadSource,
      tags: form.tags
    };
    if (isEdit && client) {
      await updateClient.mutateAsync({ id: client.id, req: payload });
      if (form.currentStatus !== client.currentStatus) {
        await updateStatus.mutateAsync({
          id: client.id,
          status: form.currentStatus,
          note: form.closedReason.trim() || "Updated via client form"
        });
      }
    } else {
      const newClient = await createClient.mutateAsync(payload);
      if (form.currentStatus !== ClientStatus.leadCaptured) {
        await updateStatus.mutateAsync({
          id: newClient.id,
          status: form.currentStatus,
          note: "Initial status set at creation"
        });
      }
    }
    onOpenChange(false);
  }
  const isPending = createClient.isPending || updateClient.isPending || updateStatus.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "right",
        className: "w-full sm:max-w-2xl overflow-y-auto bg-card border-border p-0",
        "data-ocid": "clients.sheet",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "px-6 pt-6 pb-4 border-b border-border bg-card/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-foreground text-lg font-bold", children: isEdit ? "Edit Client" : "Add New Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "text-muted-foreground text-sm", children: isEdit ? "Update client details and business information" : "Fill in the details to create a new client record" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Basic Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Name *", error: errors.companyName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.companyName,
                    onChange: (e) => set("companyName", e.target.value),
                    placeholder: "TechMecha Solutions",
                    "data-ocid": "clients.form.company_name_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    label: "Contact Person *",
                    error: errors.contactPersonName,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: form.contactPersonName,
                        onChange: (e) => set("contactPersonName", e.target.value),
                        placeholder: "John Doe",
                        "data-ocid": "clients.form.contact_name_input"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Designation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.designation,
                    onChange: (e) => set("designation", e.target.value),
                    placeholder: "CTO"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email *", error: errors.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    value: form.email,
                    onChange: (e) => set("email", e.target.value),
                    placeholder: "john@company.com",
                    "data-ocid": "clients.form.email_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone *", error: errors.phone, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.phone,
                    onChange: (e) => set("phone", e.target.value),
                    placeholder: "+91 98765 43210",
                    "data-ocid": "clients.form.phone_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.whatsappNumber,
                    onChange: (e) => set("whatsappNumber", e.target.value),
                    placeholder: "+91 98765 43210"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Website", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.website,
                    onChange: (e) => set("website", e.target.value),
                    placeholder: "https://company.com"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.location,
                    onChange: (e) => set("location", e.target.value),
                    placeholder: "Hyderabad, Telangana"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Industry *", error: errors.industryType, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.industryType,
                    onValueChange: (v) => set("industryType", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "clients.form.industry_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select industry" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDUSTRIES.map((ind) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ind, children: ind }, ind)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Size", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.companySize,
                    onValueChange: (v) => set("companySize", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select size" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COMPANY_SIZES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "GST Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.gstNumber,
                    onChange: (e) => set("gstNumber", e.target.value),
                    placeholder: "22AAAAA0000A1Z5"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Business Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    label: "Service Interested In *",
                    error: errors.serviceInterested,
                    className: "sm:col-span-2",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: form.serviceInterested,
                        onChange: (e) => set("serviceInterested", e.target.value),
                        placeholder: "Digital Marketing, SEO, CRM Setup...",
                        "data-ocid": "clients.form.service_input"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Deal Value (₹) *", error: errors.dealValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    value: form.dealValue,
                    onChange: (e) => set("dealValue", e.target.value),
                    placeholder: "500000",
                    "data-ocid": "clients.form.deal_value_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lead Source", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.leadSource,
                    onValueChange: (v) => set("leadSource", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "clients.form.source_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select source" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LEAD_SOURCES.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: src, children: src }, src)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Priority", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.priorityLevel,
                    onValueChange: (v) => set("priorityLevel", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "clients.form.priority_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(PriorityLevel).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: PRIORITY_LABELS[p] }, p)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Assigned To *", error: errors.assignedTeamMember, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.assignedTeamMember,
                    onChange: (e) => set("assignedTeamMember", e.target.value),
                    placeholder: "Venkat Asrith",
                    "data-ocid": "clients.form.assigned_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Follow-up Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: form.followUpDate,
                    onChange: (e) => set("followUpDate", e.target.value),
                    "data-ocid": "clients.form.followup_date_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Next Meeting Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: form.nextMeetingDate,
                    onChange: (e) => set("nextMeetingDate", e.target.value)
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pipeline Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.currentStatus,
                    onValueChange: handleStatusChange,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "clients.form.status_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.leadCaptured, children: "Lead Captured" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.contacted, children: "Contacted" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.discoveryCallDone, children: "Discovery Call Done" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.proposalSent, children: "Proposal Sent" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.negotiation, children: "Negotiation" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.closedWon, children: "Closed Won" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.closedLost, children: "Closed Lost" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ClientStatus.onHold, children: "On Hold" })
                      ] })
                    ]
                  }
                ) }),
                isEdit && (form.currentStatus === ClientStatus.closedWon || form.currentStatus === ClientStatus.closedLost) && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Closed Reason", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: form.closedReason,
                    onChange: (e) => set("closedReason", e.target.value),
                    placeholder: "Reason for closing this deal...",
                    rows: 2,
                    className: "bg-background border-border resize-none text-sm",
                    "data-ocid": "clients.form.closed_reason_input"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Tags" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.tagInput,
                      onChange: (e) => set("tagInput", e.target.value),
                      placeholder: "Type a tag and press Enter...",
                      className: "flex-1 h-8 text-sm",
                      onKeyDown: (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      },
                      "data-ocid": "clients.form.tag_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "h-8 text-xs",
                      onClick: addTag,
                      children: "Add"
                    }
                  )
                ] }),
                form.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: form.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: "bg-primary/10 text-primary border border-primary/30 text-xs gap-1 pr-1",
                    children: [
                      tag,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeTag(tag),
                          className: "hover:text-primary/60 transition-colors",
                          "aria-label": `Remove tag ${tag}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  },
                  tag
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider", children: "Additional Contacts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "h-7 text-xs gap-1",
                    onClick: addContact,
                    "data-ocid": "clients.form.add_contact_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                      " Add Contact"
                    ]
                  }
                )
              ] }),
              contacts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No additional contacts yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: contacts.map((contact, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-3 rounded-lg border border-border bg-background/50 space-y-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
                        "Contact ",
                        idx + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "radio",
                              name: "primaryContact",
                              checked: contact.isPrimary,
                              onChange: () => updateContact(idx, "isPrimary", true),
                              className: "accent-primary"
                            }
                          ),
                          "Primary"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeContact(idx),
                            className: "text-muted-foreground hover:text-red-400 transition-colors",
                            "aria-label": "Remove contact",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: contact.name,
                          onChange: (e) => updateContact(idx, "name", e.target.value),
                          placeholder: "Name",
                          className: "h-8 text-sm"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: contact.role,
                          onChange: (e) => updateContact(idx, "role", e.target.value),
                          placeholder: "Role / Designation",
                          className: "h-8 text-sm"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: contact.email,
                          onChange: (e) => updateContact(idx, "email", e.target.value),
                          placeholder: "Email",
                          className: "h-8 text-sm",
                          type: "email"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: contact.phone,
                          onChange: (e) => updateContact(idx, "phone", e.target.value),
                          placeholder: "Phone",
                          className: "h-8 text-sm"
                        }
                      )
                    ] })
                  ]
                },
                contact.email || idx.toString()
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-border bg-card/80 sticky bottom-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => onOpenChange(false),
                disabled: isPending,
                "data-ocid": "clients.form.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSubmit,
                disabled: isPending,
                className: "bg-primary hover:bg-primary/90",
                "data-ocid": "clients.form.save_button",
                children: isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Client"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: wonLostOpen, onOpenChange: setWonLostOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "clients.wonlost.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: pendingStatus === ClientStatus.closedWon ? "🎉 Mark as Closed Won" : "Closed Lost" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: pendingStatus === ClientStatus.closedWon ? "Congratulations! Please provide a brief reason for winning this deal." : "Please provide the reason why this deal was lost to help improve future pipelines." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: wonLostReason,
          onChange: (e) => setWonLostReason(e.target.value),
          placeholder: pendingStatus === ClientStatus.closedWon ? "e.g., Best price, strong relationship, fast delivery..." : "e.g., Budget constraints, competitor pricing, timeline issues...",
          rows: 3,
          className: "bg-background border-border resize-none text-sm",
          "data-ocid": "clients.wonlost.reason_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => {
              setWonLostOpen(false);
              setPendingStatus(null);
            },
            "data-ocid": "clients.wonlost.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: confirmWonLost,
            className: pendingStatus === ClientStatus.closedWon ? "bg-emerald-600 hover:bg-emerald-700" : "bg-destructive hover:bg-destructive/90",
            "data-ocid": "clients.wonlost.confirm_button",
            children: "Confirm"
          }
        )
      ] })
    ] }) })
  ] });
}
function Field({ label, error, children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-1.5 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-red-400",
        "data-ocid": "clients.form.field_error",
        children: error
      }
    )
  ] });
}
const PRIORITY_ICONS = {
  [PriorityLevel.low]: ArrowDown,
  [PriorityLevel.medium]: ArrowRight,
  [PriorityLevel.high]: ArrowUp,
  [PriorityLevel.urgent]: Zap
};
function PriorityBadge({ priority, size = "md" }) {
  const colors = PRIORITY_COLORS[priority];
  const Icon = PRIORITY_ICONS[priority];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: `${colors.bg} ${colors.text} ${colors.border} border font-medium ${size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 mr-1" }),
        PRIORITY_LABELS[priority]
      ]
    }
  );
}
const STATUS_ICONS = {
  leadCaptured: Circle,
  contacted: Phone,
  discoveryCallDone: Handshake,
  proposalSent: FileText,
  negotiation: Clock,
  closedWon: CircleCheck,
  closedLost: CircleX,
  onHold: Pause
};
function StatusBadge({
  status,
  size = "md",
  showIcon = false
}) {
  const colors = STATUS_COLORS[status];
  const Icon = STATUS_ICONS[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: `${colors.bg} ${colors.text} ${colors.border} border font-medium whitespace-nowrap ${size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"}`,
      children: [
        showIcon && Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 mr-1 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-1.5 h-1.5 rounded-full ${colors.dot} mr-1.5 inline-block shrink-0`
          }
        ),
        STATUS_LABELS[status]
      ]
    }
  );
}
export {
  ClientForm as C,
  PriorityBadge as P,
  StatusBadge as S
};
