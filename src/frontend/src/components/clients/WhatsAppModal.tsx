import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddClientActivity } from "@/hooks/use-clients";
import { ActivityType, type Client } from "@/types/clients";
import { CheckCircle2, MessageCircle, Phone, User } from "lucide-react";
import { useState } from "react";

interface Props {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

interface Template {
  label: string;
  key: string;
  build: (client: Client) => string;
}

const TEMPLATES: Template[] = [
  {
    key: "initial_outreach",
    label: "Initial Outreach",
    build: (c) =>
      `Hi ${c.contactPersonName}, I'm reaching out from TechMecha Torque regarding ${c.serviceInterested}. Would you be interested in a quick call to discuss?`,
  },
  {
    key: "follow_up",
    label: "Follow-up",
    build: (c) =>
      `Hi ${c.contactPersonName}, Following up on our previous conversation about ${c.serviceInterested}. Are you available for a call this week?`,
  },
  {
    key: "proposal_sent",
    label: "Proposal Sent",
    build: (c) =>
      `Hi ${c.contactPersonName}, I've sent you a proposal for ${c.serviceInterested}. Please review and let me know if you have any questions.`,
  },
  {
    key: "meeting_reminder",
    label: "Meeting Reminder",
    build: (c) =>
      `Hi ${c.contactPersonName}, Just a reminder about our meeting regarding ${c.serviceInterested}. Looking forward to connecting!`,
  },
];

export function WhatsAppModal({ client, isOpen, onClose }: Props) {
  const addActivity = useAddClientActivity();
  const [selectedKey, setSelectedKey] = useState<string>(TEMPLATES[0].key);
  const [message, setMessage] = useState<string>(TEMPLATES[0].build(client));
  const [sent, setSent] = useState(false);

  const rawNumber = (client.whatsappNumber || client.phone).replace(/\D/g, "");

  function selectTemplate(t: Template) {
    setSelectedKey(t.key);
    setMessage(t.build(client));
    setSent(false);
  }

  function handleOpen() {
    const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);

    const templateLabel =
      TEMPLATES.find((t) => t.key === selectedKey)?.label ?? "Custom message";
    addActivity.mutate({
      clientId: client.id,
      activityType: ActivityType.whatsappMessage,
      description: `WhatsApp message sent via "${templateLabel}" template`,
      metadata: message.slice(0, 200),
    });
  }

  // Find last whatsapp activity timestamp from status history as a proxy
  // (activities are fetched per-client detail page; here we just note the number)

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg bg-card border-border"
        data-ocid="whatsapp.dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
            </div>
            Send WhatsApp Message
          </DialogTitle>
        </DialogHeader>

        {/* Client info */}
        <div className="rounded-xl bg-muted/40 border border-border p-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">
              {client.contactPersonName}
            </span>
            <span className="text-xs text-muted-foreground">
              · {client.designation} · {client.companyName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-sm font-mono text-emerald-400 font-medium">
              {client.whatsappNumber || client.phone}
            </span>
          </div>
        </div>

        {/* Template selector */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Message Template
          </Label>
          <div className="grid grid-cols-2 gap-1.5">
            {TEMPLATES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => selectTemplate(t)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  selectedKey === t.key
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
                data-ocid={`whatsapp.template_${t.key}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message editor */}
        <div className="space-y-2">
          <Label
            htmlFor="wa-message"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Message
          </Label>
          <Textarea
            id="wa-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSent(false);
            }}
            rows={5}
            className="resize-none text-sm bg-background border-border focus:border-emerald-500/50"
            placeholder="Type your message..."
            data-ocid="whatsapp.message_textarea"
          />
          <p className="text-xs text-muted-foreground text-right">
            {message.length} characters
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          {sent ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Opened WhatsApp — activity logged
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              Opens WhatsApp in a new tab
            </span>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="whatsapp.close_button"
            >
              Close
            </Button>
            <Button
              size="sm"
              disabled={!message.trim() || !rawNumber}
              onClick={handleOpen}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
              data-ocid="whatsapp.open_button"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Open WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
