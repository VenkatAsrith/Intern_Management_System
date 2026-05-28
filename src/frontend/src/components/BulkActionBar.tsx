import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientStatus, STATUS_LABELS } from "@/types/clients";
import { Download, Trash2, X } from "lucide-react";
import { useState } from "react";

const PIPELINE_STAGES = Object.values(ClientStatus);

interface BulkActionBarProps {
  selectedCount: number;
  entityType: "clients" | "interns";
  selectedIds: string[];
  onClear: () => void;
  onBulkExport: () => void;
  onBulkDelete: () => void;
  onBulkMoveStage?: (stage: string) => void;
}

export function BulkActionBar({
  selectedCount,
  entityType,
  selectedIds: _selectedIds,
  onClear,
  onBulkExport,
  onBulkDelete,
  onBulkMoveStage,
}: BulkActionBarProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [stageValue, setStageValue] = useState("");

  function handleStageChange(value: string) {
    setStageValue("");
    if (value && onBulkMoveStage) onBulkMoveStage(value);
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3 bg-zinc-900 border-t border-zinc-700 shadow-2xl transition-transform duration-300 ease-in-out ${
          selectedCount > 0 ? "translate-y-0" : "translate-y-full"
        }`}
        data-ocid="bulk_action_bar"
      >
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {selectedCount} {selectedCount === 1 ? "row" : "rows"} selected
        </span>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {entityType === "clients" && onBulkMoveStage && (
            <Select value={stageValue} onValueChange={handleStageChange}>
              <SelectTrigger
                className="h-8 w-44 text-xs bg-zinc-800 border-zinc-600 text-foreground"
                data-ocid="bulk_action_bar.move_stage_select"
              >
                <SelectValue placeholder="Move to stage..." />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <button
            type="button"
            onClick={onBulkExport}
            className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-foreground transition-colors"
            data-ocid="bulk_action_bar.export_button"
          >
            <Download className="h-3.5 w-3.5" /> Export
          </button>

          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 transition-colors"
            data-ocid="bulk_action_bar.delete_button"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>

          <button
            type="button"
            aria-label="Clear selection"
            onClick={onClear}
            className="flex items-center gap-1 h-8 px-3 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
            data-ocid="bulk_action_bar.clear_button"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent
          className="bg-zinc-900 border-zinc-700"
          data-ocid="bulk_action_bar.delete_dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Delete {selectedCount} {entityType}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedCount} selected{" "}
              {selectedCount === 1 ? entityType.slice(0, -1) : entityType}. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="bulk_action_bar.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                setDeleteOpen(false);
                onBulkDelete();
              }}
              data-ocid="bulk_action_bar.delete_confirm_button"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
