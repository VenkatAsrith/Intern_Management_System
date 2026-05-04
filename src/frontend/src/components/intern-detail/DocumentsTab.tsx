import { downloadDocument } from "@/components/intern-detail/CertificateGenerator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentField } from "@/types";
import type { Intern } from "@/types";
import { Download, Eye, Mail, Send } from "lucide-react";

function fmt(date?: Date): string {
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type DocDownloadType = "offer" | "certificate" | "completion";

interface DocRowProps {
  label: string;
  subject: string;
  downloadType: DocDownloadType;
  sent: boolean;
  sentAt?: Date;
  opened: boolean;
  openedAt?: Date;
  sentField: DocumentField;
  openedField: DocumentField;
  onToggle: (field: DocumentField, current: boolean) => void;
  onCompose: (subject: string) => void;
  onDownload: (type: DocDownloadType) => void;
}

function DocRow({
  label,
  subject,
  downloadType,
  sent,
  sentAt,
  opened,
  openedAt,
  sentField,
  openedField,
  onToggle,
  onCompose,
  onDownload,
}: DocRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-border last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {sent ? (
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs gap-1">
              <Send className="h-3 w-3" /> Sent {sentAt ? fmt(sentAt) : ""}
            </Badge>
          ) : (
            <Badge className="bg-muted text-muted-foreground border border-border text-xs">
              Not Sent
            </Badge>
          )}
          {opened ? (
            <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs gap-1">
              <Eye className="h-3 w-3" /> Opened {openedAt ? fmt(openedAt) : ""}
            </Badge>
          ) : (
            <Badge className="bg-muted text-muted-foreground border border-border text-xs gap-1">
              <Eye className="h-3 w-3" /> Not Opened
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          type="button"
          variant="default"
          size="sm"
          className="gap-1.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => onDownload(downloadType)}
          data-ocid={`intern_detail.download_${sentField}`}
        >
          <Download className="h-3.5 w-3.5" /> Download
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={() => onCompose(subject)}
          data-ocid={`intern_detail.send_email_${sentField}`}
        >
          <Mail className="h-3.5 w-3.5" /> Send Email
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground"
          onClick={() => onToggle(sentField, sent)}
          data-ocid={`intern_detail.toggle_sent_${sentField}`}
        >
          {sent ? "Mark Unsent" : "Mark Sent"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground"
          onClick={() => onToggle(openedField, opened)}
          data-ocid={`intern_detail.toggle_opened_${openedField}`}
        >
          <Eye className="h-3 w-3" /> {opened ? "Mark Unopened" : "Mark Opened"}
        </Button>
      </div>
    </div>
  );
}

interface DocumentsTabProps {
  intern: Intern;
  onComposeEmail: (subject: string) => void;
  onToggleDoc: (field: DocumentField, current: boolean) => void;
}

export function DocumentsTab({
  intern,
  onComposeEmail,
  onToggleDoc,
}: DocumentsTabProps) {
  const docs: Omit<DocRowProps, "onToggle" | "onCompose" | "onDownload">[] = [
    {
      label: "Offer Letter",
      subject: "Offer Letter",
      downloadType: "offer",
      sent: intern.offerLetterSent,
      sentAt: intern.offerLetterSentAt,
      opened: intern.offerLetterOpened,
      openedAt: intern.offerLetterOpenedAt,
      sentField: DocumentField.offerLetterSent,
      openedField: DocumentField.offerLetterOpened,
    },
    {
      label: "Certificate",
      subject: "Certificate",
      downloadType: "certificate",
      sent: intern.certificateSent,
      sentAt: intern.certificateSentAt,
      opened: intern.certificateOpened,
      openedAt: intern.certificateOpenedAt,
      sentField: DocumentField.certificateSent,
      openedField: DocumentField.certificateOpened,
    },
    {
      label: "Completion Letter",
      subject: "Completion Letter",
      downloadType: "completion",
      sent: intern.completionLetterSent,
      sentAt: intern.completionLetterSentAt,
      opened: intern.completionLetterOpened,
      openedAt: intern.completionLetterOpenedAt,
      sentField: DocumentField.completionLetterSent,
      openedField: DocumentField.completionLetterOpened,
    },
  ];

  return (
    <div
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="intern_detail.documents_panel"
    >
      <h3 className="font-semibold text-foreground mb-1">Document Tracking</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Download, track sent and opened status for each document.
      </p>
      {docs.map((doc) => (
        <DocRow
          key={doc.label}
          {...doc}
          onToggle={onToggleDoc}
          onCompose={onComposeEmail}
          onDownload={(type) => downloadDocument(intern, type)}
        />
      ))}
    </div>
  );
}
