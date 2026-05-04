import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface EmailLogEntry {
  id: string;
  to: string;
  cc: string;
  subject: string;
  body: string;
  timestamp: Date;
  templateType: EmailTemplate | null;
}

export type EmailTemplate =
  | "Offer Letter"
  | "Certificate"
  | "Completion Letter"
  | "Custom";

const TEMPLATE_BODIES: Record<EmailTemplate, string> = {
  "Offer Letter":
    "Dear {name},\n\nWe are pleased to extend this Offer Letter to you for your internship at TechMecha Torque Pvt. Ltd.\n\nKindly review the attached offer letter and confirm your acceptance at the earliest.\n\nLooking forward to having you on board!\n\nWarm regards,\nHR Team\nTechMecha Torque Pvt. Ltd.",
  Certificate:
    "Dear {name},\n\nCongratulations! Please find your Internship Certificate of Recognition attached.\n\nWe appreciate your hard work, dedication, and contributions during your time with us. It has been a pleasure having you as part of the TechMecha Torque team.\n\nWishing you all the very best in your future endeavors!\n\nWarm regards,\nHR Team\nTechMecha Torque Pvt. Ltd.",
  "Completion Letter":
    "Dear {name},\n\nPlease find your Internship Completion Letter attached.\n\nThis serves as an official confirmation that you have successfully completed your internship program at TechMecha Torque Pvt. Ltd. We are proud of your growth and contributions throughout the program.\n\nWe wish you great success in your career ahead!\n\nWarm regards,\nHR Team\nTechMecha Torque Pvt. Ltd.",
  Custom: "",
};

const TEMPLATE_SUBJECTS: Record<EmailTemplate, string> = {
  "Offer Letter": "Internship Offer Letter – TechMecha Torque Pvt. Ltd.",
  Certificate: "Certificate of Recognition – TechMecha Torque Pvt. Ltd.",
  "Completion Letter":
    "Internship Completion Letter – TechMecha Torque Pvt. Ltd.",
  Custom: "",
};

const TEMPLATES: EmailTemplate[] = [
  "Offer Letter",
  "Certificate",
  "Completion Letter",
  "Custom",
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  internEmail: string;
  internName: string;
  defaultSubject?: string;
  onEmailLogged?: (entry: EmailLogEntry) => void;
}

export function EmailComposeModal({
  open,
  onOpenChange,
  internEmail,
  internName,
  defaultSubject = "Offer Letter",
  onEmailLogged,
}: Props) {
  const initialTemplate = (
    TEMPLATES.includes(defaultSubject as EmailTemplate)
      ? defaultSubject
      : "Custom"
  ) as EmailTemplate;

  const [activeTemplate, setActiveTemplate] =
    useState<EmailTemplate>(initialTemplate);
  const [to, setTo] = useState(`${internName} <${internEmail}>`);
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState(
    TEMPLATE_SUBJECTS[initialTemplate] ||
      (initialTemplate === "Custom" ? defaultSubject : ""),
  );
  const [body, setBody] = useState(
    TEMPLATE_BODIES[initialTemplate].replace(/\{name\}/g, internName),
  );
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (open) {
      const t = (
        TEMPLATES.includes(defaultSubject as EmailTemplate)
          ? defaultSubject
          : "Custom"
      ) as EmailTemplate;
      setActiveTemplate(t);
      setTo(`${internName} <${internEmail}>`);
      setCc("");
      setSubject(
        TEMPLATE_SUBJECTS[t] || (t === "Custom" ? defaultSubject : ""),
      );
      setBody(TEMPLATE_BODIES[t].replace(/\{name\}/g, internName));
    }
  }, [open, defaultSubject, internEmail, internName]);

  const applyTemplate = (t: EmailTemplate) => {
    setActiveTemplate(t);
    setSubject(
      TEMPLATE_SUBJECTS[t] || (t === "Custom" ? "" : TEMPLATE_SUBJECTS[t]),
    );
    setBody(TEMPLATE_BODIES[t].replace(/\{name\}/g, internName));
  };

  const handleSend = () => {
    if (!to.trim()) {
      toast.error("Recipient is required");
      return;
    }
    if (!subject.trim()) {
      toast.error("Subject is required");
      return;
    }
    if (!body.trim()) {
      toast.error("Message body is required");
      return;
    }

    setIsSending(true);
    // Simulate async log
    setTimeout(() => {
      const entry: EmailLogEntry = {
        id: `email-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        to: to.trim(),
        cc: cc.trim(),
        subject: subject.trim(),
        body: body.trim(),
        timestamp: new Date(),
        templateType: activeTemplate === "Custom" ? null : activeTemplate,
      };
      onEmailLogged?.(entry);
      toast.success("Email logged successfully", {
        description: `"${subject}" has been recorded in the email history.`,
      });
      setIsSending(false);
      onOpenChange(false);
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border max-w-xl w-full"
        data-ocid="intern_detail.email_compose_dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" /> Compose Email
          </DialogTitle>
        </DialogHeader>

        {/* Notice banner */}
        <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2.5 text-xs text-amber-400">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>
            Email will be <strong>logged</strong> — real delivery requires the
            email service to be enabled.
          </span>
        </div>

        <div className="space-y-4 py-1">
          {/* Quick template chips */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Quick Template
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    activeTemplate === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                  data-ocid={`intern_detail.email_template_${t.toLowerCase().replace(/ /g, "_")}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* To */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email-to"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              To
            </Label>
            <Input
              id="email-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-muted border-border text-sm"
              placeholder="Recipient email"
              data-ocid="intern_detail.email_to_input"
            />
          </div>

          {/* CC */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email-cc"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              CC{" "}
              <span className="normal-case text-muted-foreground/60 font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="email-cc"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              className="bg-muted border-border text-sm"
              placeholder="cc@example.com"
              data-ocid="intern_detail.email_cc_input"
            />
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email-subject"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              Subject
            </Label>
            <Input
              id="email-subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setActiveTemplate("Custom");
              }}
              className="bg-muted border-border text-sm"
              placeholder="Email subject"
              data-ocid="intern_detail.email_subject_input"
            />
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email-body"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              Message
            </Label>
            <Textarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="bg-muted border-border resize-none text-sm font-mono leading-relaxed"
              placeholder="Write your message…"
              data-ocid="intern_detail.email_body_textarea"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
            data-ocid="intern_detail.email_cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="bg-primary hover:bg-primary/90 gap-1.5"
            data-ocid="intern_detail.email_send_button"
          >
            <Send className="h-3.5 w-3.5" />
            {isSending ? "Logging…" : "Send & Log Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
