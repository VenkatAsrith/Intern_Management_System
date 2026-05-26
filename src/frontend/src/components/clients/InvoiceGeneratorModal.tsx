import { InvoicePaymentStatus } from "@/backend";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddClientActivity,
  useClientInvoices,
  useCreateInvoice,
  useUpdateInvoiceStatus,
} from "@/hooks/use-clients";
import {
  type Client,
  type Invoice,
  type InvoiceLineItem,
  PAYMENT_STATUS_LABELS,
  PaymentStatus,
} from "@/types/clients";
import { jsPDF } from "jspdf";
import { Download, FileText, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const TMT_RED = "#e71514";
const TMT_DARK = "#1a1a1a";
const WHITE = "#ffffff";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.substring(0, 2), 16),
    Number.parseInt(h.substring(2, 4), 16),
    Number.parseInt(h.substring(4, 6), 16),
  ];
}

function setC(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setTextColor(r, g, b);
}
function setF(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setFillColor(r, g, b);
}
function setD(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setDrawColor(r, g, b);
}

// ─── PDF Generator ────────────────────────────────────────────────────────────

function generateInvoicePdf(
  invoice: Omit<Invoice, "id" | "clientId" | "createdAt" | "createdBy">,
  client: Client,
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // Header bar
  setF(doc, TMT_DARK);
  doc.rect(0, 0, W, 28, "F");
  setF(doc, TMT_RED);
  doc.rect(0, 28, W, 1.5, "F");

  // Brand
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  setC(doc, WHITE);
  doc.text("TechMecha", 14, 13);
  setC(doc, TMT_RED);
  doc.text("Torque", 55, 13);
  doc.setFontSize(7.5);
  setC(doc, "#aaaaaa");
  doc.setFont("helvetica", "normal");
  doc.text("PVT. LTD.", 14, 19);
  doc.text("+91-9876543210 | team@techmechatorque.com", 14, 24);

  // INVOICE label top-right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  setC(doc, WHITE);
  doc.text("INVOICE", W - 14, 14, { align: "right" });
  doc.setFontSize(9);
  setC(doc, TMT_RED);
  doc.text(invoice.invoiceNumber, W - 14, 21, { align: "right" });

  // Bill From
  let y = 38;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setC(doc, TMT_RED);
  doc.text("BILL FROM", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setC(doc, TMT_DARK);
  doc.text("TechMecha Torque Pvt. Ltd.", 14, y + 6);
  doc.setFontSize(8);
  setC(doc, "#555555");
  doc.text("Hyderabad, Telangana, India", 14, y + 12);
  doc.text("CIN: U74999AP2024PTC101234", 14, y + 17);

  // Bill To
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setC(doc, TMT_RED);
  doc.text("BILL TO", 110, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setC(doc, TMT_DARK);
  doc.text(client.companyName, 110, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setC(doc, "#555555");
  doc.text(client.contactPersonName, 110, y + 12);
  if (client.location) doc.text(client.location, 110, y + 17);
  if (client.gstNumber) doc.text(`GST: ${client.gstNumber}`, 110, y + 22);

  // Date + Invoice number row
  y = 72;
  setF(doc, "#f4f4f4");
  setD(doc, "#e0e0e0");
  doc.setLineWidth(0.3);
  doc.roundedRect(14, y, 182, 12, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setC(doc, "#444444");
  doc.text("Date:", 18, y + 7.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    34,
    y + 7.5,
  );
  doc.setFont("helvetica", "bold");
  doc.text("Invoice No:", 110, y + 7.5);
  doc.setFont("helvetica", "normal");
  setC(doc, TMT_RED);
  doc.text(invoice.invoiceNumber, 132, y + 7.5);

  // Line items table header
  y = 92;
  setF(doc, TMT_DARK);
  doc.rect(14, y, 182, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setC(doc, WHITE);
  doc.text("DESCRIPTION", 18, y + 6);
  doc.text("QTY", 128, y + 6, { align: "right" });
  doc.text("RATE (₹)", 158, y + 6, { align: "right" });
  doc.text("AMOUNT (₹)", 192, y + 6, { align: "right" });

  // Line items rows
  y += 9;
  const rowH = 9;
  invoice.lineItems.forEach((item, i) => {
    setF(doc, i % 2 === 0 ? "#ffffff" : "#fafafa");
    doc.rect(14, y, 182, rowH, "F");
    setD(doc, "#eeeeee");
    doc.setLineWidth(0.2);
    doc.line(14, y + rowH, 196, y + rowH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setC(doc, TMT_DARK);
    doc.text(item.description, 18, y + 6);
    setC(doc, "#444444");
    doc.text(String(item.quantity), 128, y + 6, { align: "right" });
    doc.text(item.rate.toLocaleString("en-IN"), 158, y + 6, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(item.amount.toLocaleString("en-IN"), 192, y + 6, {
      align: "right",
    });
    y += rowH;
  });

  // Totals block
  y += 6;
  const totalsX = 130;
  const valX = 192;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setC(doc, "#555555");
  doc.text("Subtotal:", totalsX, y);
  setC(doc, TMT_DARK);
  doc.text(`₹${invoice.subtotal.toLocaleString("en-IN")}`, valX, y, {
    align: "right",
  });
  y += 7;
  setC(doc, "#555555");
  doc.text(`Tax (${invoice.tax}%):`, totalsX, y);
  setC(doc, TMT_DARK);
  const taxAmt = invoice.subtotal * (invoice.tax / 100);
  doc.text(`₹${taxAmt.toLocaleString("en-IN")}`, valX, y, { align: "right" });
  y += 4;
  setF(doc, TMT_RED);
  doc.rect(totalsX - 4, y, valX - totalsX + 8, 0.5, "F");
  y += 5;
  setF(doc, TMT_DARK);
  doc.roundedRect(totalsX - 4, y, valX - totalsX + 8, 11, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  setC(doc, WHITE);
  doc.text("TOTAL:", totalsX, y + 7.5);
  setC(doc, TMT_RED);
  doc.text(`₹${invoice.total.toLocaleString("en-IN")}`, valX, y + 7.5, {
    align: "right",
  });

  // Notes
  if (invoice.notes) {
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setC(doc, TMT_RED);
    doc.text("NOTES / TERMS:", 14, y);
    doc.setFont("helvetica", "normal");
    setC(doc, "#555555");
    const noteLines = doc.splitTextToSize(invoice.notes, 182);
    doc.text(noteLines, 14, y + 6);
    y += 6 + noteLines.length * 5;
  }

  // Signature
  const sigY = Math.max(y + 20, H - 55);
  setD(doc, "#333333");
  doc.setLineWidth(0.4);
  doc.line(14, sigY + 12, 75, sigY + 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setC(doc, TMT_DARK);
  doc.text("JAYA CHANDRA REDDY CHILAKAMARRY", 14, sigY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setC(doc, "#666666");
  doc.text("Founder & CEO", 14, sigY + 24);
  doc.text("Authorized Signatory", 14, sigY + 29);

  // Footer bar
  setF(doc, TMT_DARK);
  doc.rect(0, H - 18, W, 18, "F");
  setF(doc, TMT_RED);
  doc.rect(0, H - 19, W, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setC(doc, WHITE);
  doc.text("TECHMECHA TORQUE PVT. LTD.", W / 2, H - 11, { align: "center" });
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  setC(doc, TMT_RED);
  doc.text("team@techmechatorque.com | www.techmechatorque.com", W / 2, H - 5, {
    align: "center",
  });

  doc.save(
    `invoice-${invoice.invoiceNumber}-${client.companyName.toLowerCase().replace(/\s+/g, "-")}.pdf`,
  );
}

// ─── Payment status badge ─────────────────────────────────────────────────────

const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  [PaymentStatus.pending]: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  [PaymentStatus.paid]:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  [PaymentStatus.overdue]: "bg-red-500/15 text-red-400 border-red-500/30",
  [PaymentStatus.cancelled]: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge
      className={`border text-xs px-2 py-0.5 ${PAYMENT_STATUS_STYLES[status]}`}
    >
      {PAYMENT_STATUS_LABELS[status]}
    </Badge>
  );
}

// ─── Empty invoice line ───────────────────────────────────────────────────────

function emptyLine(idx = 0): InvoiceLineItem & { lineId: string } {
  return {
    lineId: `${Date.now()}-${idx}`,
    description: "",
    quantity: 1,
    rate: 0,
    amount: 0,
  };
}

// ─── Create Invoice Tab ───────────────────────────────────────────────────────

interface CreateTabProps {
  client: Client;
  onSaved: (inv: Invoice) => void;
  onClose: () => void;
}

function CreateInvoiceTab({ client, onSaved, onClose }: CreateTabProps) {
  const createInvoice = useCreateInvoice();
  const addActivity = useAddClientActivity();

  const today = new Date().toISOString().slice(0, 10);
  const invoiceNumber = `INV-${String(Date.now()).slice(-4)}`;

  const [lines, setLines] = useState<(InvoiceLineItem & { lineId: string })[]>([
    emptyLine(0),
  ]);
  const [taxPct, setTaxPct] = useState(18);
  const [notes, setNotes] = useState("");

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const taxAmt = subtotal * (taxPct / 100);
  const total = subtotal + taxAmt;

  function updateLine(i: number, key: keyof InvoiceLineItem, val: string) {
    setLines((prev) => {
      const next = [...prev];
      const line = { ...next[i] };
      if (key === "description") {
        line.description = val;
      } else {
        const n = Number(val) || 0;
        if (key === "quantity") line.quantity = n;
        if (key === "rate") line.rate = n;
        line.amount = line.quantity * line.rate;
      }
      next[i] = line;
      return next;
    });
  }

  function addLine() {
    setLines((prev) => [...prev, emptyLine(prev.length)]);
  }

  function removeLine(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    const payload = {
      clientId: client.id,
      lineItems: lines,
      tax: taxPct,
      notes: notes || undefined,
    };
    const inv = await createInvoice.mutateAsync(payload);
    await addActivity.mutateAsync({
      clientId: client.id,
      activityType: "invoiceGenerated",
      description: `Invoice ${inv.invoiceNumber} generated for ₹${inv.total.toLocaleString("en-IN")}`,
      metadata: inv.invoiceNumber,
    });
    onSaved(inv);
  }

  function handleGeneratePdf() {
    generateInvoicePdf(
      {
        invoiceNumber,
        lineItems: lines,
        subtotal,
        tax: taxPct,
        total,
        paymentStatus: PaymentStatus.pending,
        status: "draft" as const,
        dueDate: null,
        amountPaid: 0,
        notes: notes || undefined,
      },
      client,
    );
  }

  return (
    <div className="space-y-5 py-2">
      {/* Header info */}
      <div className="rounded-xl border border-border bg-card/60 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Bill To
            </p>
            <p className="font-bold text-foreground">{client.companyName}</p>
            <p className="text-sm text-muted-foreground">
              {client.contactPersonName}
              {client.designation ? ` · ${client.designation}` : ""}
            </p>
            {client.location && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {client.location}
              </p>
            )}
            {client.gstNumber && (
              <p className="text-xs text-muted-foreground">
                GST: {client.gstNumber}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Invoice No
            </p>
            <p className="text-base font-mono font-bold text-primary">
              {invoiceNumber}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{today}</p>
          </div>
        </div>
      </div>

      {/* Line items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">
            Line Items
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLine}
            data-ocid="invoice.add_item_button"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Item
          </Button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_60px_90px_90px_36px] gap-1.5 mb-1.5 px-2">
          {["Description", "Qty", "Rate (₹)", "Amount (₹)", ""].map((h) => (
            <p
              key={h}
              className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide"
            >
              {h}
            </p>
          ))}
        </div>

        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <div
              key={line.lineId}
              className="grid grid-cols-[1fr_60px_90px_90px_36px] gap-1.5 items-center"
              data-ocid={`invoice.line_item.${i + 1}`}
            >
              <Input
                value={line.description}
                onChange={(e) => updateLine(i, "description", e.target.value)}
                placeholder="Service / product description"
                className="h-8 text-sm bg-background border-border"
                data-ocid={`invoice.line_description.${i + 1}`}
              />
              <Input
                type="number"
                min={0}
                value={line.quantity}
                onChange={(e) => updateLine(i, "quantity", e.target.value)}
                className="h-8 text-sm text-center bg-background border-border"
                data-ocid={`invoice.line_qty.${i + 1}`}
              />
              <Input
                type="number"
                min={0}
                value={line.rate}
                onChange={(e) => updateLine(i, "rate", e.target.value)}
                className="h-8 text-sm text-right bg-background border-border"
                data-ocid={`invoice.line_rate.${i + 1}`}
              />
              <Input
                readOnly
                value={line.amount.toLocaleString("en-IN")}
                className="h-8 text-sm text-right bg-muted/40 border-border font-semibold"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-red-400"
                onClick={() => removeLine(i)}
                disabled={lines.length === 1}
                data-ocid={`invoice.remove_line.${i + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Totals + Tax + Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Tax %
            </Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={taxPct}
              onChange={(e) => setTaxPct(Number(e.target.value) || 0)}
              className="h-9 w-28 bg-background border-border"
              data-ocid="invoice.tax_input"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Notes / Terms
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, bank details, or any notes..."
              rows={3}
              className="bg-background border-border resize-none text-sm"
              data-ocid="invoice.notes_textarea"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2.5 self-end">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax ({taxPct}%)</span>
            <span className="font-medium">
              ₹{taxAmt.toLocaleString("en-IN")}
            </span>
          </div>
          <Separator className="bg-border" />
          <div className="flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-primary text-lg">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="invoice.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleGeneratePdf}
          className="border-primary/40 text-primary hover:bg-primary/10"
          data-ocid="invoice.preview_pdf_button"
        >
          <Download className="h-4 w-4 mr-2" />
          Preview PDF
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          disabled={createInvoice.isPending}
          className="bg-primary hover:bg-primary/90"
          data-ocid="invoice.save_button"
        >
          {createInvoice.isPending ? "Saving..." : "Save Invoice"}
        </Button>
      </div>
    </div>
  );
}

// ─── Invoice History Tab ──────────────────────────────────────────────────────

interface HistoryTabProps {
  clientId: string;
  client: Client;
}

function InvoiceHistoryTab({ clientId, client }: HistoryTabProps) {
  const { data: invoices = [], isLoading } = useClientInvoices(clientId);
  const updateStatus = useUpdateInvoiceStatus();

  if (isLoading) {
    return (
      <div className="space-y-3 py-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 rounded-xl bg-muted/40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="invoice.history.empty_state"
      >
        <FileText className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="font-semibold text-foreground">No invoices yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          No invoices have been generated for this client.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 py-2" data-ocid="invoice.history.list">
      {invoices.map((inv, i) => (
        <div
          key={inv.id}
          className="rounded-xl border border-border bg-card/60 p-4"
          data-ocid={`invoice.history.item.${i + 1}`}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-primary text-sm">
                  {inv.invoiceNumber}
                </span>
                <PaymentBadge status={inv.paymentStatus} />
              </div>
              <p className="text-xs text-muted-foreground">
                {inv.createdAt.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {" · "}
                {inv.lineItems.length} item
                {inv.lineItems.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold text-foreground">
                ₹{inv.total.toLocaleString("en-IN")}
              </span>

              <Select
                value={inv.paymentStatus}
                onValueChange={(v) =>
                  updateStatus.mutateAsync({
                    invoiceId: inv.id,
                    status: v as InvoicePaymentStatus,
                    clientId,
                  })
                }
              >
                <SelectTrigger
                  className="h-8 w-32 text-xs"
                  data-ocid={`invoice.history.status_select.${i + 1}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(InvoicePaymentStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      {PAYMENT_STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => generateInvoicePdf(inv, client)}
                className="h-8 text-xs border-primary/30 text-primary hover:bg-primary/10"
                data-ocid={`invoice.history.download_button.${i + 1}`}
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                Download
              </Button>
            </div>
          </div>

          {inv.notes && (
            <p className="mt-2 text-xs text-muted-foreground border-t border-border/50 pt-2 line-clamp-2">
              {inv.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface InvoiceGeneratorModalProps {
  clientId: string;
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceGeneratorModal({
  clientId,
  client,
  isOpen,
  onClose,
}: InvoiceGeneratorModalProps) {
  const [activeTab, setActiveTab] = useState<"create" | "history">("create");

  // Reset to create tab on open
  useEffect(() => {
    if (isOpen) setActiveTab("create");
  }, [isOpen]);

  function handleSaved(_inv: Invoice) {
    setActiveTab("history");
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl w-full bg-card border-border max-h-[90vh] overflow-hidden flex flex-col"
        data-ocid="invoice.dialog"
      >
        <DialogHeader className="px-1 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="text-foreground font-bold">
                Invoice Generator
              </span>
              <p className="text-xs text-muted-foreground font-normal truncate">
                {client.companyName}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "create" | "history")}
          className="flex-1 flex flex-col min-h-0"
        >
          <TabsList className="grid grid-cols-2 w-64 bg-muted/60 mx-1">
            <TabsTrigger value="create" data-ocid="invoice.create_tab">
              Create Invoice
            </TabsTrigger>
            <TabsTrigger value="history" data-ocid="invoice.history_tab">
              Invoice History
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-1 mt-4">
            <TabsContent value="create" className="mt-0">
              <CreateInvoiceTab
                client={client}
                onSaved={handleSaved}
                onClose={onClose}
              />
            </TabsContent>
            <TabsContent value="history" className="mt-0">
              <InvoiceHistoryTab clientId={clientId} client={client} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
