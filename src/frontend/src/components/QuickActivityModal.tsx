import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLogQuickActivity } from "@/hooks/use-clients";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ACTIVITY_TYPES = [
  { value: "call", label: "📞 Call" },
  { value: "email", label: "✉️ Email" },
  { value: "meeting", label: "🤝 Meeting" },
  { value: "whatsapp", label: "💬 WhatsApp" },
  { value: "note", label: "📝 Note" },
];

interface QuickActivityModalProps {
  clientId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickActivityModal({
  clientId,
  isOpen,
  onClose,
}: QuickActivityModalProps) {
  const [selectedType, setSelectedType] = useState("call");
  const [notes, setNotes] = useState("");
  const logActivity = useLogQuickActivity();

  async function handleSave() {
    if (!clientId) return;
    await logActivity.mutateAsync({
      clientId,
      activityType: selectedType,
      notes: notes.trim() || `${selectedType} logged`,
    });
    toast.success("Activity logged successfully");
    setNotes("");
    setSelectedType("call");
    onClose();
  }

  function handleClose() {
    setNotes("");
    setSelectedType("call");
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="bg-zinc-900 border-zinc-700 max-w-md"
        data-ocid="quick_activity.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">Log Activity</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-1">
          {/* Activity type selector */}
          <div className="space-y-1.5">
            <fieldset className="border-0 p-0 m-0">
              <legend className="text-xs font-medium text-muted-foreground">
                Activity Type
              </legend>
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setSelectedType(t.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      selectedType === t.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-zinc-800 hover:bg-zinc-700 text-muted-foreground hover:text-foreground border border-zinc-700"
                    }`}
                    data-ocid={`quick_activity.type_${t.value}_button`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note..."
              rows={4}
              className="w-full px-3 py-2 rounded-md text-sm bg-zinc-800 border border-zinc-700 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              data-ocid="quick_activity.notes_textarea"
            />
          </div>

          {/* Save */}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClose}
              data-ocid="quick_activity.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={() => void handleSave()}
              disabled={logActivity.isPending || !clientId}
              data-ocid="quick_activity.save_button"
            >
              {logActivity.isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />{" "}
                  Saving...
                </>
              ) : (
                "Save Activity"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
