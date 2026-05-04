import { Button } from "@/components/ui/button";
import type { Intern } from "@/types";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";

function fmt(date?: Date): string {
  if (!date) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground break-words">
        {value || "—"}
      </p>
    </div>
  );
}

export function OverviewTab({ intern }: { intern: Intern }) {
  const fields: Array<[string, string]> = [
    ["Full Name", intern.name],
    ["Email Address", intern.email],
    ["Phone", intern.phone],
    ["Space", intern.space],
    ["Status", intern.status],
    ["Experience Level", intern.experienceLevel],
    ["Department", intern.department],
    ["Joining Date", fmt(intern.joiningDate)],
    ["Last Contacted", fmt(intern.lastContactedAt)],
    ["Last WhatsApp", fmt(intern.lastWhatsAppedAt)],
    ["Created At", fmt(intern.createdAt)],
    ["Last Updated", fmt(intern.updatedAt)],
  ];

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-5"
      data-ocid="intern_detail.overview_panel"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {fields.map(([label, value]) => (
          <FieldRow key={label} label={label} value={value} />
        ))}
      </div>

      {intern.adminNotes && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Admin Notes
          </p>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {intern.adminNotes}
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-border flex gap-3">
        <Link to="/interns/$id/edit" params={{ id: intern.id }}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            data-ocid="intern_detail.overview_edit_button"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit Intern
          </Button>
        </Link>
      </div>
    </div>
  );
}
