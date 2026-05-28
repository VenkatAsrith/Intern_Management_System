import type { AuditEvent } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuditLog } from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 100;

const actionColors: Record<string, string> = {
  CREATE: "bg-green-500/20 text-green-400 border-green-500/30",
  UPDATE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  LOGIN: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  EXPORT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

function formatTs(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

function exportCsv(events: AuditEvent[]) {
  const headers = [
    "Timestamp",
    "Actor",
    "Role",
    "Action",
    "Resource Type",
    "Resource ID",
  ];
  const rows = events.map((e) => [
    formatTs(e.timestamp),
    e.actorId,
    e.actorRole,
    e.action,
    e.resourceType,
    e.resourceId,
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => `"${v}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AuditLogPage() {
  const { isAdmin } = useAuth();
  const [page, setPage] = useState(0);
  const [actorFilter, setActorFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [resourceTypeFilter, setResourceTypeFilter] = useState("all");

  const { data: events, isLoading } = useAuditLog(PAGE_SIZE, page * PAGE_SIZE);

  const filtered = useMemo(() => {
    return (events ?? []).filter((e) => {
      const actorOk =
        !actorFilter ||
        e.actorId.toLowerCase().includes(actorFilter.toLowerCase());
      const actionOk = actionFilter === "all" || e.action === actionFilter;
      const resOk =
        resourceTypeFilter === "all" || e.resourceType === resourceTypeFilter;
      return actorOk && actionOk && resOk;
    });
  }, [events, actorFilter, actionFilter, resourceTypeFilter]);

  const uniqueActions = useMemo(
    () => [...new Set((events ?? []).map((e) => e.action))],
    [events],
  );

  const uniqueResourceTypes = useMemo(
    () => [...new Set((events ?? []).map((e) => e.resourceType))],
    [events],
  );

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Access denied — admin only</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" data-ocid="audit.page">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Immutable record of all platform actions
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-border"
          onClick={() => exportCsv(filtered)}
          data-ocid="audit.export_button"
        >
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Filter by actor..."
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          className="w-52 bg-background border-input h-9"
          data-ocid="audit.actor_filter_input"
        />
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger
            className="w-44 h-9 bg-background border-input"
            data-ocid="audit.action_filter_select"
          >
            <SelectValue placeholder="Action type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All actions</SelectItem>
            {uniqueActions.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={resourceTypeFilter}
          onValueChange={setResourceTypeFilter}
        >
          <SelectTrigger
            className="w-44 h-9 bg-background border-input"
            data-ocid="audit.resource_type_filter_select"
          >
            <SelectValue placeholder="Resource type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All resources</SelectItem>
            {uniqueResourceTypes.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {[
                    "Timestamp",
                    "Actor",
                    "Role",
                    "Action",
                    "Resource Type",
                    "Resource ID",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-muted-foreground"
                      data-ocid="audit.empty_state"
                    >
                      No events found
                    </td>
                  </tr>
                ) : (
                  filtered.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {formatTs(e.timestamp)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {e.actorId}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="border text-xs bg-muted border-border text-muted-foreground">
                          {e.actorRole}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`border text-xs ${actionColors[e.action] ?? "bg-muted border-border text-muted-foreground"}`}
                        >
                          {e.action}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {e.resourceType}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {e.resourceId.slice(0, 12)}…
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page + 1} — showing {filtered.length} of {events?.length ?? 0}{" "}
          events
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="gap-1 border-border"
            data-ocid="audit.pagination_prev"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={(events?.length ?? 0) < PAGE_SIZE}
            className="gap-1 border-border"
            data-ocid="audit.pagination_next"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
