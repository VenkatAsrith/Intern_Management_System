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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePerformance } from "@/hooks/use-performance";
import {
  performanceCreatePayload,
  performanceUpdatePayload,
} from "@/lib/backend";
import type {
  BackendCreatePerformancePayload,
  BackendUpdatePerformancePayload,
  Performance,
} from "@/types";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SCORE_COLORS = {
  task: "#e71514",
  attendance: "#3b82f6",
  communication: "#22c55e",
  initiative: "#f97316",
};

interface FormState {
  month: number;
  year: number;
  taskScore: number;
  attendanceScore: number;
  communicationScore: number;
  initiativeScore: number;
  overallScore: number;
  adminNotes: string;
}

const defaultForm = (): FormState => ({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  taskScore: 3,
  attendanceScore: 3,
  communicationScore: 3,
  initiativeScore: 3,
  overallScore: 3,
  adminNotes: "",
});

function autoOverall(f: FormState): number {
  return +(
    (f.taskScore +
      f.attendanceScore +
      f.communicationScore +
      f.initiativeScore) /
    4
  ).toFixed(2);
}

function ScoreInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-primary"
          data-ocid={`perf_modal.${name}_slider`}
        />
        <span className="text-sm font-semibold text-foreground w-8 text-right">
          {value}
        </span>
      </div>
    </div>
  );
}

function AddEditModal({
  open,
  onOpenChange,
  internId,
  initial,
  editId,
  onAdd,
  onUpdate,
  isPending,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  internId: string;
  initial?: Partial<FormState>;
  editId?: string;
  onAdd: (p: BackendCreatePerformancePayload) => void;
  onUpdate: (id: string, p: BackendUpdatePerformancePayload) => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<FormState>(() => ({
    ...defaultForm(),
    ...initial,
  }));
  const set = (k: keyof FormState, v: number | string) => {
    setForm((prev) => {
      const next = { ...prev, [k]: v };
      if (k !== "overallScore") next.overallScore = autoOverall(next);
      return next;
    });
  };

  const handleSubmit = () => {
    if (editId) {
      onUpdate(editId, performanceUpdatePayload(form));
    } else {
      onAdd(performanceCreatePayload({ ...form, internId }));
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border max-w-md"
        data-ocid="perf_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle>
            {editId ? "Edit Performance" : "Add Performance Record"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Month
              </Label>
              <Select
                value={String(form.month)}
                onValueChange={(v) => set("month", Number(v))}
              >
                <SelectTrigger
                  className="bg-muted border-border"
                  data-ocid="perf_modal.month_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-60 overflow-y-auto">
                  {MONTHS.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Year
              </Label>
              <Input
                type="number"
                value={form.year}
                onChange={(e) => set("year", Number(e.target.value))}
                className="bg-muted border-border"
                data-ocid="perf_modal.year_input"
              />
            </div>
          </div>

          <ScoreInput
            label="Task Score"
            name="task"
            value={form.taskScore}
            onChange={(v) => set("taskScore", v)}
          />
          <ScoreInput
            label="Attendance Score"
            name="attendance"
            value={form.attendanceScore}
            onChange={(v) => set("attendanceScore", v)}
          />
          <ScoreInput
            label="Communication Score"
            name="communication"
            value={form.communicationScore}
            onChange={(v) => set("communicationScore", v)}
          />
          <ScoreInput
            label="Initiative Score"
            name="initiative"
            value={form.initiativeScore}
            onChange={(v) => set("initiativeScore", v)}
          />

          <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-2.5">
            <span className="text-sm text-muted-foreground">
              Overall Score (auto)
            </span>
            <span className="text-lg font-bold text-primary">
              {form.overallScore}
            </span>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Admin Notes
            </Label>
            <Textarea
              value={form.adminNotes}
              onChange={(e) => set("adminNotes", e.target.value)}
              rows={3}
              className="bg-muted border-border resize-none text-sm"
              placeholder="Optional notes…"
              data-ocid="perf_modal.notes_textarea"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            data-ocid="perf_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-primary hover:bg-primary/90"
            data-ocid="perf_modal.submit_button"
          >
            {editId ? "Update" : "Add Record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface PerformanceTabProps {
  internId: string;
  performances: Performance[];
  onAdd: (p: BackendCreatePerformancePayload) => void;
  onUpdate: (id: string, p: BackendUpdatePerformancePayload) => void;
  onDelete: (id: string) => void;
  isAddPending: boolean;
}

export function PerformanceTab({
  internId,
  performances,
  onAdd,
  onUpdate,
  onDelete,
  isAddPending,
}: PerformanceTabProps) {
  const updatePerformance = useUpdatePerformance();
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<Performance | null>(null);

  const sorted = [...performances].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month,
  );

  const last6 = sorted.slice(-6);
  const chartData = last6.map((p) => ({
    name: `${MONTHS[p.month - 1].slice(0, 3)} ${p.year}`,
    task: p.taskScore,
    attendance: p.attendanceScore,
    communication: p.communicationScore,
    initiative: p.initiativeScore,
  }));

  const openAdd = () => {
    setEditRecord(null);
    setModalOpen(true);
  };
  const openEdit = (p: Performance) => {
    setEditRecord(p);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4" data-ocid="intern_detail.performance_panel">
      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">
            Score Trends (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 8, bottom: 4, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.07)"
              />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: "#a1a1aa" }} />
              <Tooltip
                contentStyle={{
                  background: "#111111",
                  border: "1px solid #1f1f1f",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Line
                type="monotone"
                dataKey="task"
                stroke={SCORE_COLORS.task}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Task"
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke={SCORE_COLORS.attendance}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Attendance"
              />
              <Line
                type="monotone"
                dataKey="communication"
                stroke={SCORE_COLORS.communication}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Communication"
              />
              <Line
                type="monotone"
                dataKey="initiative"
                stroke={SCORE_COLORS.initiative}
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Initiative"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">
              Performance Records
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {performances.length} record{performances.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            className="gap-1.5 bg-primary hover:bg-primary/90"
            onClick={openAdd}
            data-ocid="intern_detail.add_performance_button"
          >
            <Plus className="h-3.5 w-3.5" /> Add Record
          </Button>
        </div>

        {sorted.length === 0 ? (
          <div
            className="text-center py-10"
            data-ocid="intern_detail.performance_empty_state"
          >
            <p className="text-sm text-muted-foreground">
              No performance records yet. Add the first one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {[
                    "Period",
                    "Task",
                    "Attend.",
                    "Comm.",
                    "Init.",
                    "Overall",
                    "Notes",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="pb-2 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wide last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                    data-ocid={`intern_detail.performance_row.${i + 1}`}
                  >
                    <td className="py-2.5 pr-4 font-medium">
                      {MONTHS[p.month - 1].slice(0, 3)} {p.year}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {p.taskScore}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {p.attendanceScore}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {p.communicationScore}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {p.initiativeScore}
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className="font-bold text-primary">
                        {p.overallScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 max-w-[120px] truncate text-muted-foreground text-xs">
                      {p.adminNotes || "—"}
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:text-primary"
                          onClick={() => openEdit(p)}
                          data-ocid={`intern_detail.edit_performance_button.${i + 1}`}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:text-destructive"
                              data-ocid={`intern_detail.delete_performance_button.${i + 1}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="intern_detail.delete_perf_dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Delete performance record for{" "}
                                {MONTHS[p.month - 1]} {p.year}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="intern_detail.delete_perf_cancel">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(p.id)}
                                className="bg-destructive hover:bg-destructive/90"
                                data-ocid="intern_detail.delete_perf_confirm"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddEditModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        internId={internId}
        editId={editRecord?.id}
        initial={
          editRecord
            ? {
                month: editRecord.month,
                year: editRecord.year,
                taskScore: editRecord.taskScore,
                attendanceScore: editRecord.attendanceScore,
                communicationScore: editRecord.communicationScore,
                initiativeScore: editRecord.initiativeScore,
                overallScore: editRecord.overallScore,
                adminNotes: editRecord.adminNotes,
              }
            : undefined
        }
        onAdd={onAdd}
        onUpdate={onUpdate}
        isPending={isAddPending || updatePerformance.isPending}
      />
    </div>
  );
}
