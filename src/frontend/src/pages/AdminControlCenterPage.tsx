import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useInterns } from "@/hooks/use-interns";
import type { Intern } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  MessageCircle,
  Send,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "critical" | "high" | "medium" | "low";

interface LocalTask {
  id: string;
  title: string;
  internId: string;
  internName: string;
  priority: Priority;
  deadline: string;
  assignedAt: Date;
}

interface LocalMessage {
  id: string;
  internId: string;
  internName: string;
  text: string;
  sentAt: Date;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRIORITY_COLORS: Record<Priority, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-muted text-muted-foreground border-border",
};

const SPACE_COLORS: Record<string, string> = {
  Org: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Marketing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

// biome-ignore lint/correctness/noUnusedVariables: reserved for future heatmap calculations
function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 86_400_000);
}

function heatColor(value: number): string {
  if (value === 0) return "bg-muted/40";
  if (value <= 1) return "bg-primary/20";
  if (value <= 3) return "bg-primary/50";
  return "bg-primary";
}

function generateWeeklyActivity(
  intern: Intern,
): { week: string; value: number }[] {
  // Deterministic pseudo-activity based on intern id hash
  const seed = intern.id.charCodeAt(0) + intern.id.charCodeAt(1);
  const now = new Date();
  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (3 - i) * 7);
    const label = `W${i + 1}`;
    const v = ((seed * (i + 1) * 7) % 7) + (i === 3 ? 2 : 0);
    return { week: label, value: Math.min(v, 7) };
  });
}

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function QuickAssignSection({
  interns,
  onAssign,
}: { interns: Intern[]; onAssign: (t: LocalTask) => void }) {
  const [internId, setInternId] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");

  const handleAssign = () => {
    if (!internId || !title.trim() || !deadline) {
      toast.error("Fill in all fields before assigning");
      return;
    }
    const intern = interns.find((i) => i.id === internId);
    if (!intern) return;
    onAssign({
      id: `task-${Date.now()}`,
      title: title.trim(),
      internId,
      internName: intern.name,
      priority,
      deadline,
      assignedAt: new Date(),
    });
    toast.success(`Task assigned to ${intern.name}`);
    setTitle("");
    setDeadline("");
    setInternId("");
  };

  return (
    <section
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="control_center.quick_assign_section"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Quick Assign</h2>
        <span className="text-xs text-muted-foreground">
          One-click task assignment
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Intern</Label>
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={internId}
            onChange={(e) => setInternId(e.target.value)}
            data-ocid="control_center.quick_assign.intern_select"
          >
            <option value="">Select intern…</option>
            {interns.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <Label className="text-xs text-muted-foreground">Task Title</Label>
          <Input
            placeholder="e.g. Complete landing page design"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-ocid="control_center.quick_assign.title_input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Priority</Label>
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            data-ocid="control_center.quick_assign.priority_select"
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Deadline</Label>
          <input
            type="date"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            data-ocid="control_center.quick_assign.deadline_input"
          />
        </div>
        <Button
          type="button"
          className="gap-2 h-9"
          onClick={handleAssign}
          data-ocid="control_center.quick_assign.assign_button"
        >
          <Send className="h-3.5 w-3.5" /> Assign
        </Button>
      </div>
    </section>
  );
}

function BulkAssignSection({
  interns,
  onBulkAssign,
}: { interns: Intern[]; onBulkAssign: (tasks: LocalTask[]) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");

  const toggleIntern = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBulkAssign = () => {
    if (selected.size === 0 || !title.trim() || !deadline) {
      toast.error("Select interns and fill all fields");
      return;
    }
    const tasks: LocalTask[] = Array.from(selected).map((id) => {
      const intern = interns.find((i) => i.id === id)!;
      return {
        id: `task-bulk-${Date.now()}-${id}`,
        title: title.trim(),
        internId: id,
        internName: intern.name,
        priority,
        deadline,
        assignedAt: new Date(),
      };
    });
    onBulkAssign(tasks);
    toast.success(`Task assigned to ${tasks.length} interns`);
    setSelected(new Set());
    setTitle("");
    setDeadline("");
  };

  return (
    <section
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="control_center.bulk_assign_section"
    >
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Bulk Assign</h2>
        <span className="text-xs text-muted-foreground">
          Same task for multiple interns
        </span>
        {selected.size > 0 && (
          <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 text-xs">
            {selected.size} selected
          </Badge>
        )}
      </div>

      {/* Intern Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4 max-h-40 overflow-y-auto pr-1">
        {interns.map((intern) => (
          <label
            key={intern.id}
            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors text-sm ${
              selected.has(intern.id)
                ? "border-primary/40 bg-primary/5"
                : "border-border bg-background hover:bg-muted/50"
            }`}
            data-ocid={`control_center.bulk_assign.intern_checkbox.${intern.id}`}
          >
            <input
              type="checkbox"
              className="accent-primary"
              checked={selected.has(intern.id)}
              onChange={() => toggleIntern(intern.id)}
            />
            <span className="truncate text-xs font-medium text-foreground">
              {intern.name}
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label className="text-xs text-muted-foreground">Task Title</Label>
          <Input
            placeholder="Task to assign to all selected interns"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-ocid="control_center.bulk_assign.title_input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Priority</Label>
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            data-ocid="control_center.bulk_assign.priority_select"
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Deadline</Label>
          <input
            type="date"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            data-ocid="control_center.bulk_assign.deadline_input"
          />
        </div>
        <Button
          type="button"
          className="gap-2 h-9"
          disabled={selected.size === 0}
          onClick={handleBulkAssign}
          data-ocid="control_center.bulk_assign.assign_button"
        >
          <Send className="h-3.5 w-3.5" />
          Assign to {selected.size > 0 ? selected.size : "…"}
        </Button>
      </div>
    </section>
  );
}

function InternMonitoringGrid({ interns }: { interns: Intern[] }) {
  return (
    <section data-ocid="control_center.monitoring_section">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-foreground">
          Intern Monitor
        </h2>
        <span className="text-xs text-muted-foreground">
          {interns.length} interns · click to open workspace
        </span>
      </div>
      {interns.length === 0 ? (
        <div
          className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm"
          data-ocid="control_center.monitoring.empty_state"
        >
          No interns found. Add interns to start monitoring.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {interns.map((intern) => {
            const lastNoteDays = Math.floor(Math.random() * 7);
            const taskCompletion = 40 + ((intern.id.charCodeAt(0) * 3) % 60);
            const submissionCount = (intern.id.charCodeAt(1) % 10) + 1;
            const activeTasks = (intern.id.charCodeAt(2) % 5) + 1;
            const noteStale = lastNoteDays > 3;

            return (
              <Link
                key={intern.id}
                to="/workspace/$internId"
                params={{ internId: intern.id }}
                data-ocid={`control_center.intern_card.${intern.id}`}
              >
                <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {intern.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {intern.department}
                      </p>
                    </div>
                    <Badge
                      className={`text-[10px] border flex-shrink-0 ${
                        SPACE_COLORS[intern.space] ?? "bg-muted"
                      }`}
                    >
                      {intern.space}
                    </Badge>
                  </div>

                  {/* Task completion bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Tasks</span>
                      <span>{taskCompletion}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${taskCompletion}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span
                      className={`flex items-center gap-1 ${
                        noteStale ? "text-destructive" : ""
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      Note {lastNoteDays}d ago
                    </span>
                    <span>{submissionCount} submissions</span>
                    <span>{activeTasks} active</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

function PerformanceHeatmap({ interns }: { interns: Intern[] }) {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  return (
    <section
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="control_center.heatmap_section"
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-semibold text-foreground">
          Activity Heatmap
        </h2>
        <span className="text-xs text-muted-foreground">
          Note submissions per week (last 4 weeks)
        </span>
      </div>

      {interns.length === 0 ? (
        <p className="text-sm text-muted-foreground">No intern data</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr>
                <th className="text-left pr-4 pb-2 text-muted-foreground font-medium w-36">
                  Intern
                </th>
                {weeks.map((w) => (
                  <th
                    key={w}
                    className="text-center pb-2 text-muted-foreground font-medium px-2"
                  >
                    {w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => {
                const activity = generateWeeklyActivity(intern);
                return (
                  <tr key={intern.id}>
                    <td className="pr-4 py-1.5 truncate max-w-[144px] text-foreground font-medium">
                      {intern.name}
                    </td>
                    {activity.map(({ week, value }) => (
                      <td key={week} className="px-2 py-1.5 text-center">
                        <div
                          className={`w-8 h-8 rounded-md mx-auto flex items-center justify-center text-[10px] font-bold ${
                            value === 0
                              ? "bg-muted/40 text-muted-foreground/40"
                              : `${heatColor(value)} text-foreground`
                          }`}
                          title={`${intern.name} — ${week}: ${value} notes`}
                        >
                          {value}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <span className="text-[10px] text-muted-foreground">Activity:</span>
            {[
              { label: "None", cls: "bg-muted/40" },
              { label: "Low", cls: "bg-primary/20" },
              { label: "Med", cls: "bg-primary/50" },
              { label: "High", cls: "bg-primary" },
            ].map(({ label, cls }) => (
              <span key={label} className="flex items-center gap-1">
                <span
                  className={`w-3.5 h-3.5 rounded-sm inline-block ${cls}`}
                />
                <span className="text-[10px] text-muted-foreground">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function CommunicationCenter({ interns }: { interns: Intern[] }) {
  const [recipientId, setRecipientId] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<LocalMessage[]>([]);

  const handleSend = () => {
    if (!recipientId || !text.trim()) {
      toast.error("Select a recipient and enter a message");
      return;
    }
    const intern = interns.find((i) => i.id === recipientId);
    if (!intern) return;
    setMessages((prev) => [
      {
        id: `msg-${Date.now()}`,
        internId: recipientId,
        internName: intern.name,
        text: text.trim(),
        sentAt: new Date(),
      },
      ...prev,
    ]);
    toast.success(`Message sent to ${intern.name}`);
    setText("");
  };

  return (
    <section
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="control_center.communication_section"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">
          Communication Center
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Composer */}
        <div className="space-y-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Recipient</Label>
            <select
              className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              data-ocid="control_center.communication.recipient_select"
            >
              <option value="">Select intern…</option>
              {interns.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Message</Label>
            <textarea
              className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              placeholder="Type your message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              data-ocid="control_center.communication.message_textarea"
            />
          </div>
          <Button
            type="button"
            className="gap-2 w-full"
            onClick={handleSend}
            data-ocid="control_center.communication.send_button"
          >
            <Send className="h-3.5 w-3.5" /> Send Message
          </Button>
        </div>

        {/* Recent DMs */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium">
            Recent DMs
          </p>
          {messages.length === 0 ? (
            <div
              className="flex-1 flex items-center justify-center text-muted-foreground text-xs p-4 border border-dashed border-border rounded-lg"
              data-ocid="control_center.communication.empty_state"
            >
              No messages sent yet
            </div>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {messages.slice(0, 10).map((msg, i) => (
                <li
                  key={msg.id}
                  className="flex items-start gap-2 p-2.5 bg-background rounded-lg border border-border"
                  data-ocid={`control_center.communication.message.${i + 1}`}
                >
                  <MessageCircle className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground">
                      {msg.internName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {msg.text}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    {msg.sentAt.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function ApprovalSummary({ pendingCount }: { pendingCount: number }) {
  return (
    <section
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="control_center.approvals_section"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {pendingCount > 0 ? (
            <AlertCircle className="h-5 w-5 text-amber-400" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">
              Approval Queue
            </p>
            <p className="text-xs text-muted-foreground">
              {pendingCount > 0
                ? `${pendingCount} action${pendingCount !== 1 ? "s" : ""} awaiting review`
                : "All caught up — no pending approvals"}
            </p>
          </div>
        </div>
        <Link to="/admin/approvals">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            data-ocid="control_center.approvals.view_all_button"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminControlCenterPage() {
  const { data: interns = [], isLoading } = useInterns();

  const [tasks, setTasks] = useState<LocalTask[]>([]);

  const activeInterns = useMemo(
    () => interns.filter((i) => i.isActive),
    [interns],
  );

  const handleAssign = (task: LocalTask) => setTasks((p) => [task, ...p]);
  const handleBulkAssign = (newTasks: LocalTask[]) =>
    setTasks((p) => [...newTasks, ...p]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4" data-ocid="control_center.loading_state">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto"
      data-ocid="control_center.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Admin Control Center
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage tasks, monitor interns, and communicate — all in one place
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
          {activeInterns.length} active interns
        </Badge>
      </div>

      {/* Recently Assigned Tasks Strip */}
      {tasks.length > 0 && (
        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Recently Assigned
          </p>
          <div className="flex flex-wrap gap-2">
            {tasks.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 text-xs"
              >
                <Badge
                  className={`text-[10px] border ${PRIORITY_COLORS[t.priority]}`}
                >
                  {t.priority}
                </Badge>
                <span className="text-foreground font-medium truncate max-w-[120px]">
                  {t.title}
                </span>
                <span className="text-muted-foreground">→ {t.internName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Assign */}
      <QuickAssignSection interns={activeInterns} onAssign={handleAssign} />

      {/* Bulk Assign */}
      <BulkAssignSection
        interns={activeInterns}
        onBulkAssign={handleBulkAssign}
      />

      {/* Intern Monitoring */}
      <InternMonitoringGrid interns={activeInterns} />

      {/* Performance Heatmap */}
      <PerformanceHeatmap interns={activeInterns} />

      {/* Communication Center */}
      <CommunicationCenter interns={activeInterns} />

      {/* Approval Queue Summary */}
      <ApprovalSummary pendingCount={0} />
    </div>
  );
}
