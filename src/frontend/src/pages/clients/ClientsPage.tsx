import { BulkActionBar } from "@/components/BulkActionBar";
import { QuickActivityModal } from "@/components/QuickActivityModal";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientSplitPane } from "@/components/clients/ClientSplitPane";
import { PriorityBadge } from "@/components/clients/PriorityBadge";
import { StatusBadge } from "@/components/clients/StatusBadge";
import { WhatsAppModal } from "@/components/clients/WhatsAppModal";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useClients,
  useDeleteClient,
  useUpdateClientStatus,
} from "@/hooks/use-clients";
import {
  useColumnVisibility,
  useOnboardingChecklist,
  usePinnedClients,
  useSavedFilters,
} from "@/hooks/use-crm-storage";
import {
  type Client,
  type ClientFilters,
  ClientStatus,
  PRIORITY_LABELS,
  PriorityLevel,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/types/clients";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Circle,
  Columns,
  Download,
  Eye,
  Flame,
  HelpCircle,
  Keyboard,
  LayoutGrid,
  MessageCircle,
  Pencil,
  Pin,
  Plus,
  Save,
  Search,
  Star,
  Table as TableIcon,
  Tag,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const INDUSTRIES = [
  "Technology",
  "Manufacturing",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Real Estate",
  "Logistics",
  "Marketing",
  "Consulting",
  "Media",
  "Hospitality",
  "Automotive",
  "Energy",
  "Other",
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

type SortKey = keyof Pick<
  Client,
  | "companyName"
  | "contactPersonName"
  | "currentStatus"
  | "priorityLevel"
  | "dealValue"
  | "assignedTeamMember"
  | "followUpDate"
>;
type SortDir = "asc" | "desc";

const ALL_COLUMNS: { key: string; label: string; defaultVisible: boolean }[] = [
  { key: "company", label: "Company", defaultVisible: true },
  { key: "contact", label: "Contact", defaultVisible: true },
  { key: "status", label: "Status", defaultVisible: true },
  { key: "priority", label: "Priority", defaultVisible: true },
  { key: "dealValue", label: "Deal Value", defaultVisible: true },
  { key: "assigned", label: "Assigned To", defaultVisible: true },
  { key: "followUp", label: "Follow-up", defaultVisible: true },
  { key: "daysInactive", label: "Days Inactive", defaultVisible: false },
  { key: "industry", label: "Industry", defaultVisible: false },
  { key: "actions", label: "Actions", defaultVisible: true },
];

function getDaysInactive(client: Client): number {
  const lastActivity = client.lastActivityDate || client.updatedAt;
  return Math.floor(
    (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24),
  );
}

const DEFAULT_FILTERS: ClientFilters = {
  search: "",
  status: "all",
  priority: "all",
  industry: "",
  assignedTo: "",
  dealValueMin: "",
  dealValueMax: "",
  dateRange: "all",
};

function exportCSV(rows: Client[]) {
  const headers = [
    "Company",
    "Contact",
    "Designation",
    "Email",
    "Phone",
    "Status",
    "Priority",
    "Deal Value",
    "Industry",
    "Location",
    "Assigned To",
    "Lead Source",
    "Follow-up Date",
  ];
  const lines = rows.map((r) =>
    [
      r.companyName,
      r.contactPersonName,
      r.designation,
      r.email,
      r.phone,
      STATUS_LABELS[r.currentStatus],
      PRIORITY_LABELS[r.priorityLevel],
      r.dealValue,
      r.industryType,
      r.location,
      r.assignedTeamMember,
      r.leadSource,
      r.followUpDate ? r.followUpDate.toLocaleDateString() : "",
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  const blob = new Blob([[headers.join(","), ...lines].join("\n")], {
    type: "text/csv",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clients.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportXLSX(rows: Client[]) {
  const headers = [
    "Company",
    "Contact",
    "Email",
    "Phone",
    "Status",
    "Priority",
    "Deal Value",
    "Industry",
    "Assigned To",
    "Follow-up Date",
  ];
  const lines = rows.map((r) =>
    [
      r.companyName,
      r.contactPersonName,
      r.email,
      r.phone,
      STATUS_LABELS[r.currentStatus],
      PRIORITY_LABELS[r.priorityLevel],
      r.dealValue,
      r.industryType,
      r.assignedTeamMember,
      r.followUpDate ? r.followUpDate.toLocaleDateString() : "",
    ].join("\t"),
  );
  const blob = new Blob([[headers.join("\t"), ...lines].join("\n")], {
    type: "application/vnd.ms-excel",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clients.xlsx";
  a.click();
  URL.revokeObjectURL(url);
}

function SortIcon({
  col,
  sortKey,
  sortDir,
}: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== col)
    return <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
  return sortDir === "asc" ? (
    <ChevronUp className="h-3.5 w-3.5 text-primary" />
  ) : (
    <ChevronDown className="h-3.5 w-3.5 text-primary" />
  );
}

export default function ClientsPage() {
  const { data: allClients = [], isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const updateStatus = useUpdateClientStatus();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { pinned, togglePin } = usePinnedClients();
  const { saved: savedFilters, saveFilter } = useSavedFilters();
  const [saveFilterName, setSaveFilterName] = useState("");
  const [saveFilterOpen, setSaveFilterOpen] = useState(false);
  const [_showShortcuts, setShowShortcuts] = useState(false);
  const [splitPaneOpen, setSplitPaneOpen] = useState(false);
  const [hoveredClient, setHoveredClient] = useState<Client | null>(null);
  const [quickActivityClientId, setQuickActivityClientId] = useState<
    string | null
  >(null);

  const [filters, setFilters] = useState<ClientFilters>(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visibleCols, setVisibleCols] = useState<Set<string>>(
    new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key)),
  );
  const [formOpen, setFormOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [whatsappClient, setWhatsappClient] = useState<Client | null>(null);

  // Onboarding checklist data
  const hasClients = allClients.length > 0;
  const hasActivity = false; // activity is tracked on detail pages
  const hasProposal = allClients.some(
    (c) =>
      c.currentStatus === ClientStatus.proposalSent ||
      c.currentStatus === ClientStatus.negotiation,
  );
  const hasWon = allClients.some(
    (c) => c.currentStatus === ClientStatus.closedWon,
  );
  const onboarding = useOnboardingChecklist({
    hasClients,
    hasActivity,
    hasProposal,
    hasWon,
  });

  const setFilter = useCallback(
    (k: keyof ClientFilters, v: string) =>
      setFilters((prev) => ({ ...prev, [k]: v })),
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const isFiltered = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters],
  );

  // ─── Keyboard shortcuts ─────────────────────────────────────────────────
  // (defined after filtered so the closure captures the correct reference)

  // ─── Filtering ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let rows = allClients;
    const q = filters.search.toLowerCase();
    if (q) {
      rows = rows.filter(
        (c) =>
          c.companyName.toLowerCase().includes(q) ||
          c.contactPersonName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q),
      );
    }
    if (filters.status !== "all") {
      rows = rows.filter((c) => c.currentStatus === filters.status);
    }
    if (filters.priority !== "all") {
      rows = rows.filter((c) => c.priorityLevel === filters.priority);
    }
    if (filters.industry) {
      rows = rows.filter((c) =>
        c.industryType.toLowerCase().includes(filters.industry.toLowerCase()),
      );
    }
    if (filters.assignedTo) {
      rows = rows.filter((c) =>
        c.assignedTeamMember
          .toLowerCase()
          .includes(filters.assignedTo.toLowerCase()),
      );
    }
    const minVal = Number(filters.dealValueMin);
    const maxVal = Number(filters.dealValueMax);
    if (filters.dealValueMin && minVal > 0)
      rows = rows.filter((c) => c.dealValue >= minVal);
    if (filters.dealValueMax && maxVal > 0)
      rows = rows.filter((c) => c.dealValue <= maxVal);
    if (filters.dateRange !== "all") {
      const days =
        filters.dateRange === "7d" ? 7 : filters.dateRange === "30d" ? 30 : 90;
      const cutoff = new Date(Date.now() - days * 86400 * 1000);
      rows = rows.filter((c) => c.followUpDate && c.followUpDate >= cutoff);
    }
    return rows;
  }, [allClients, filters]);

  // ─── Keyboard shortcuts (after filtered) ─────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const ctrl = e.ctrlKey || e.metaKey;
      const tag = (e.target as HTMLElement).tagName;
      const isEditable =
        tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (e.key === "?" && !ctrl) {
        setShowShortcuts((v) => !v);
        return;
      }
      if (e.key === " " && !ctrl && !isEditable) {
        e.preventDefault();
        if (hoveredClient) setSplitPaneOpen((v) => !v);
        return;
      }
      if ((e.key === "l" || e.key === "L") && !ctrl && !isEditable) {
        if (hoveredClient) {
          setQuickActivityClientId(hoveredClient.id);
        }
        return;
      }
      if (!ctrl) return;
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setEditClient(null);
        setFormOpen(true);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        exportCSV(filtered);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, hoveredClient]);

  // ─── Sorting ─────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      let av: string | number | Date = a[sortKey] ?? "";
      let bv: string | number | Date = b[sortKey] ?? "";
      if (av instanceof Date) av = av.getTime();
      if (bv instanceof Date) bv = bv.getTime();
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortKey, sortDir]);

  // Pinned clients float to top
  const sortedWithPins = useMemo(() => {
    if (pinned.size === 0) return sorted;
    const pinnedRows = sorted.filter((c) => pinned.has(c.id));
    const unpinnedRows = sorted.filter((c) => !pinned.has(c.id));
    return [...pinnedRows, ...unpinnedRows];
  }, [sorted, pinned]);

  const totalPages = Math.max(1, Math.ceil(sortedWithPins.length / pageSize));
  const pageRows = sortedWithPins.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const allPageSelected =
    pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));

  function toggleAllPage() {
    if (allPageSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of pageRows) next.delete(r.id);
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of pageRows) next.add(r.id);
        return next;
      });
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function openEdit(client: Client) {
    setEditClient(client);
    setFormOpen(true);
  }

  function openWhatsApp(client: Client) {
    setWhatsappClient(client);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    await deleteClient.mutateAsync(deleteId);
    setDeleteId(null);
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(deleteId);
      return n;
    });
  }

  async function confirmBulkDelete() {
    for (const id of selected) await deleteClient.mutateAsync(id);
    setSelected(new Set());
    setBulkDeleteOpen(false);
  }

  function handleBulkStatusChange(status: string) {
    for (const id of selected) {
      updateStatus.mutate({
        id,
        status: status as ClientStatus,
        note: "Bulk status update",
      });
    }
    setSelected(new Set());
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isOverdue(date?: Date) {
    if (!date) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }

  const col = (key: string) => visibleCols.has(key);

  // Active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (filters.search)
    activeChips.push({
      label: `"${filters.search}"`,
      onRemove: () => setFilter("search", ""),
    });
  if (filters.status !== "all")
    activeChips.push({
      label: STATUS_LABELS[filters.status as ClientStatus],
      onRemove: () => setFilter("status", "all"),
    });
  if (filters.priority !== "all")
    activeChips.push({
      label: PRIORITY_LABELS[filters.priority as PriorityLevel],
      onRemove: () => setFilter("priority", "all"),
    });
  if (filters.industry)
    activeChips.push({
      label: filters.industry,
      onRemove: () => setFilter("industry", ""),
    });
  if (filters.assignedTo)
    activeChips.push({
      label: `Assigned: ${filters.assignedTo}`,
      onRemove: () => setFilter("assignedTo", ""),
    });
  if (filters.dealValueMin)
    activeChips.push({
      label: `Min ₹${filters.dealValueMin}`,
      onRemove: () => setFilter("dealValueMin", ""),
    });
  if (filters.dealValueMax)
    activeChips.push({
      label: `Max ₹${filters.dealValueMax}`,
      onRemove: () => setFilter("dealValueMax", ""),
    });
  if (filters.dateRange !== "all")
    activeChips.push({
      label: `Follow-up: last ${filters.dateRange}`,
      onRemove: () => setFilter("dateRange", "all"),
    });

  return (
    <div className="flex flex-col h-full min-h-0" data-ocid="clients.page">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-6 pb-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              All Clients
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your pipeline and client relationships
            </p>
          </div>
          <Badge className="bg-primary/15 text-primary border border-primary/30 font-semibold text-sm px-2.5">
            {allClients.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* View toggles */}
          <div className="flex items-center rounded-lg border border-border bg-background overflow-hidden">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 border-r border-border"
              aria-current="true"
              data-ocid="clients.table_view_button"
            >
              <TableIcon className="h-3.5 w-3.5" /> Table
            </button>
            <Link
              to="/clients/kanban"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border-r border-border transition-colors"
              data-ocid="clients.kanban_view_button"
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Kanban
            </Link>
            <Link
              to="/clients/calendar"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="clients.calendar_view_button"
            >
              <Calendar className="h-3.5 w-3.5" /> Calendar
            </Link>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => exportCSV(filtered)}
            data-ocid="clients.export_csv_button"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => exportXLSX(filtered)}
            data-ocid="clients.export_xlsx_button"
          >
            <Download className="h-3.5 w-3.5" /> Excel
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 gap-1.5 text-xs"
            onClick={() => {
              setEditClient(null);
              setFormOpen(true);
            }}
            data-ocid="clients.add_button"
          >
            <Plus className="h-3.5 w-3.5" /> Add Client
          </Button>
        </div>
      </div>

      {/* ─── Onboarding Checklist ─── */}
      {onboarding.show && (
        <div className="mx-6 mt-4 rounded-lg border border-muted/20 bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Getting Started
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {onboarding.doneCount}/{onboarding.items.length} completed
              </span>
              <button
                type="button"
                onClick={onboarding.dismiss}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${onboarding.progress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {onboarding.items.map((item) => (
              <div key={item.key} className="flex items-start gap-2 text-sm">
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                )}
                <span
                  className={
                    item.done
                      ? "text-muted-foreground line-through"
                      : "text-foreground/80"
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Filter Bar ─── */}
      <div className="px-6 py-3 bg-background border-b border-border space-y-3">
        {/* Saved Filters toolbar */}
        {(savedFilters.length > 0 || saveFilterOpen) && (
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Saved Filters
            </span>
            <select
              className="bg-muted border border-border rounded text-xs text-foreground px-2 py-1 focus:outline-none"
              defaultValue=""
              onChange={(e) => {
                const f = savedFilters.find((sf) => sf.id === e.target.value);
                if (f) {
                  setFilters({ ...DEFAULT_FILTERS, ...f.filters });
                  setPage(1);
                }
              }}
            >
              <option value="">Select a saved filter...</option>
              {savedFilters.map((sf) => (
                <option key={sf.id} value={sf.id}>
                  {sf.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center gap-2 mb-1">
          <button
            type="button"
            onClick={() => setSaveFilterOpen((v) => !v)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-1 transition-colors"
            data-ocid="clients.save_filter_button"
          >
            <Save className="w-3 h-3" /> Save filter
          </button>
          {saveFilterOpen && (
            <div className="flex items-center gap-2">
              <input
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && saveFilterName.trim()) {
                    saveFilter(saveFilterName, filters);
                    setSaveFilterName("");
                    setSaveFilterOpen(false);
                  }
                }}
                placeholder="Filter name..."
                className="bg-muted border border-border rounded text-xs text-foreground px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => {
                  if (saveFilterName.trim()) {
                    saveFilter(saveFilterName, filters);
                    setSaveFilterName("");
                    setSaveFilterOpen(false);
                  }
                }}
                className="text-xs bg-primary text-primary-foreground rounded px-2 py-1 hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setSaveFilterOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              className="pl-8 h-8 text-sm"
              placeholder="Search company, contact, email, phone..."
              value={filters.search}
              onChange={(e) => {
                setFilter("search", e.target.value);
                setPage(1);
              }}
              data-ocid="clients.search_input"
            />
          </div>
          <Select
            value={filters.status}
            onValueChange={(v) => {
              setFilter("status", v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 w-36 text-xs"
              data-ocid="clients.status_filter"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(ClientStatus).map((s) => {
                const c = STATUS_COLORS[s];
                return (
                  <SelectItem key={s} value={s}>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                      {STATUS_LABELS[s]}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            value={filters.priority}
            onValueChange={(v) => {
              setFilter("priority", v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 w-32 text-xs"
              data-ocid="clients.priority_filter"
            >
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {Object.values(PriorityLevel).map((p) => (
                <SelectItem key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.industry || "all"}
            onValueChange={(v) => {
              setFilter("industry", v === "all" ? "" : v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 w-36 text-xs"
              data-ocid="clients.industry_filter"
            >
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {INDUSTRIES.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1">
            <Input
              className="h-8 w-24 text-xs"
              placeholder="Min ₹"
              type="number"
              value={filters.dealValueMin}
              onChange={(e) => {
                setFilter("dealValueMin", e.target.value);
                setPage(1);
              }}
              data-ocid="clients.deal_min_input"
            />
            <span className="text-muted-foreground text-xs">–</span>
            <Input
              className="h-8 w-24 text-xs"
              placeholder="Max ₹"
              type="number"
              value={filters.dealValueMax}
              onChange={(e) => {
                setFilter("dealValueMax", e.target.value);
                setPage(1);
              }}
              data-ocid="clients.deal_max_input"
            />
          </div>
          <Input
            className="h-8 w-36 text-xs"
            placeholder="Assigned to..."
            value={filters.assignedTo}
            onChange={(e) => {
              setFilter("assignedTo", e.target.value);
              setPage(1);
            }}
            data-ocid="clients.assigned_filter_input"
          />
          <Select
            value={filters.dateRange}
            onValueChange={(v) => {
              setFilter("dateRange", v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 w-36 text-xs"
              data-ocid="clients.date_range_filter"
            >
              <SelectValue placeholder="Follow-up date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any follow-up</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                data-ocid="clients.columns_button"
              >
                <Columns className="h-3.5 w-3.5" /> Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_COLUMNS.filter((c) => c.key !== "actions").map((c) => (
                <DropdownMenuCheckboxItem
                  key={c.key}
                  checked={visibleCols.has(c.key)}
                  onCheckedChange={(checked) => {
                    setVisibleCols((prev) => {
                      const next = new Set(prev);
                      if (checked) next.add(c.key);
                      else next.delete(c.key);
                      return next;
                    });
                  }}
                >
                  {c.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={clearFilters}
              data-ocid="clients.clear_filters_button"
            >
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>
        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {activeChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {chip.label}
                <X className="h-2.5 w-2.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── Bulk Action Bar ─── */}
      {selected.size > 0 && (
        <div
          className="flex items-center gap-3 px-6 py-2 bg-primary/5 border-b border-primary/20"
          data-ocid="clients.bulk_bar"
        >
          <span className="text-sm font-medium text-foreground">
            {selected.size} selected
          </span>
          <div className="flex gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  data-ocid="clients.bulk_status_button"
                >
                  Change Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.values(ClientStatus).map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleBulkStatusChange(s)}
                  >
                    {STATUS_LABELS[s]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() =>
                exportCSV(allClients.filter((c) => selected.has(c.id)))
              }
              data-ocid="clients.bulk_export_button"
            >
              <Download className="h-3 w-3" /> Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setBulkDeleteOpen(true)}
              data-ocid="clients.bulk_delete_button"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={() => setSelected(new Set())}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* ─── Table ─── */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="p-6 space-y-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 px-6"
            data-ocid="clients.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {isFiltered ? "No clients match your filters" : "No clients yet"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
              {isFiltered
                ? "Try adjusting your search or clearing the filters."
                : "Add your first client to start tracking your pipeline."}
            </p>
            {!isFiltered && (
              <Button
                className="bg-primary hover:bg-primary/90 gap-2"
                onClick={() => {
                  setEditClient(null);
                  setFormOpen(true);
                }}
                data-ocid="clients.add_first_button"
              >
                <Plus className="h-4 w-4" /> Add First Client
              </Button>
            )}
            {isFiltered && (
              <Button
                variant="outline"
                onClick={clearFilters}
                data-ocid="clients.clear_filters_empty_button"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10 bg-card border-b border-border">
              <tr>
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allPageSelected}
                    onCheckedChange={toggleAllPage}
                    aria-label="Select all"
                    data-ocid="clients.select_all_checkbox"
                  />
                </th>
                {col("company") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("companyName")}
                      data-ocid="clients.sort_company_button"
                    >
                      Company{" "}
                      <SortIcon
                        col="companyName"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("contact") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("contactPersonName")}
                    >
                      Contact{" "}
                      <SortIcon
                        col="contactPersonName"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("status") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("currentStatus")}
                      data-ocid="clients.sort_status_button"
                    >
                      Status{" "}
                      <SortIcon
                        col="currentStatus"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("priority") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("priorityLevel")}
                    >
                      Priority{" "}
                      <SortIcon
                        col="priorityLevel"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("dealValue") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("dealValue")}
                      data-ocid="clients.sort_deal_button"
                    >
                      Deal Value{" "}
                      <SortIcon
                        col="dealValue"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("assigned") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("assignedTeamMember")}
                    >
                      Assigned{" "}
                      <SortIcon
                        col="assignedTeamMember"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("followUp") && (
                  <th className="px-3 py-3 text-left">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                      onClick={() => toggleSort("followUpDate")}
                    >
                      Follow-up{" "}
                      <SortIcon
                        col="followUpDate"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                )}
                {col("daysInactive") && (
                  <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Days Inactive
                  </th>
                )}
                {col("industry") && (
                  <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Industry
                  </th>
                )}
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Lead Score
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Prob %
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Source
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((client, i) => (
                <tr
                  key={client.id}
                  className={`border-b border-border/50 transition-colors hover:bg-card/60 cursor-pointer ${
                    selected.has(client.id) ? "bg-primary/5" : ""
                  }`}
                  data-ocid={`clients.item.${i + 1}`}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    // Don't override checkbox / button clicks
                    if (target.closest("button, input, a")) return;
                    setHoveredClient(client);
                    setSplitPaneOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setHoveredClient(client);
                      setSplitPaneOpen(true);
                    }
                  }}
                  onMouseEnter={() => setHoveredClient(client)}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selected.has(client.id)}
                      onCheckedChange={() => toggleRow(client.id)}
                      aria-label={`Select ${client.companyName}`}
                      data-ocid={`clients.checkbox.${i + 1}`}
                    />
                  </td>
                  {col("company") && (
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-xs">
                            {client.companyName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <button
                            type="button"
                            className="font-semibold text-foreground hover:text-primary truncate transition-colors text-left block max-w-[180px]"
                            onClick={() =>
                              navigate({
                                to: "/clients/$id",
                                params: { id: client.id },
                              })
                            }
                          >
                            {client.companyName}
                          </button>
                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {client.location}
                          </p>
                        </div>
                      </div>
                    </td>
                  )}
                  {col("contact") && (
                    <td className="px-3 py-3">
                      <p className="text-sm text-foreground font-medium truncate max-w-[140px]">
                        {client.contactPersonName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                        {client.designation}
                      </p>
                    </td>
                  )}
                  {col("status") && (
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <StatusBadge status={client.currentStatus} />
                        {client.isStale && (
                          <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-orange-500/15 text-orange-400 border border-orange-500/30">
                            Stale
                          </span>
                        )}
                        {client.slaStatus === "breached" && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/30">
                            <AlertTriangle className="h-2.5 w-2.5" /> SLA
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  {col("priority") && (
                    <td className="px-3 py-3">
                      <PriorityBadge priority={client.priorityLevel} />
                    </td>
                  )}
                  {col("dealValue") && (
                    <td className="px-3 py-3">
                      <span className="font-semibold text-foreground tabular-nums">
                        ₹{client.dealValue.toLocaleString("en-IN")}
                      </span>
                    </td>
                  )}
                  {col("assigned") && (
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0">
                          {client.assignedTeamMember.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-foreground truncate max-w-[100px]">
                          {client.assignedTeamMember}
                        </span>
                      </div>
                    </td>
                  )}
                  {col("followUp") && (
                    <td className="px-3 py-3">
                      {client.followUpDate ? (
                        <div
                          className={`flex items-center gap-1 ${
                            isOverdue(client.followUpDate)
                              ? "text-red-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          {isOverdue(client.followUpDate) && (
                            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                          )}
                          <span className="text-xs tabular-nums">
                            {client.followUpDate.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">
                          —
                        </span>
                      )}
                    </td>
                  )}
                  {col("daysInactive") && (
                    <td className="px-3 py-3">
                      {(() => {
                        const days = getDaysInactive(client);
                        return (
                          <span
                            className={`text-xs tabular-nums ${
                              days >= 7
                                ? "text-red-400 font-semibold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {days}d
                          </span>
                        );
                      })()}
                    </td>
                  )}
                  {col("industry") && (
                    <td className="px-3 py-3">
                      <span className="text-xs text-muted-foreground">
                        {client.industryType}
                      </span>
                    </td>
                  )}
                  <td className="px-3 py-3 whitespace-nowrap">
                    {(() => {
                      const s = client.healthScore ?? client.leadScore ?? 0;
                      const cls =
                        s >= 70
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : s >= 40
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-red-500/15 text-red-400 border border-red-500/30";
                      return (
                        <span
                          className={`inline-flex items-center justify-center w-8 h-6 rounded text-xs font-bold tabular-nums ${cls}`}
                        >
                          {s}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {(() => {
                      const s =
                        (client as Client & { leadScore?: number }).leadScore ??
                        0;
                      const cls =
                        s >= 70
                          ? "bg-primary/20 text-primary"
                          : s >= 40
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-muted text-muted-foreground";
                      const label = s >= 70 ? "Hot" : s >= 40 ? "Warm" : "Cold";
                      return (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}
                        >
                          <Flame className="w-3 h-3" />
                          {s} {label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">
                      {(client as Client & { dealProbability?: number })
                        .dealProbability ?? 0}
                      %
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">
                      {(client as Client & { source?: string }).source ??
                        client.leadSource ??
                        "—"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {((client as Client & { tags?: string[] }).tags ?? [])
                        .slice(0, 2)
                        .map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      {((client as Client & { tags?: string[] }).tags ?? [])
                        .length > 2 && (
                        <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground/60">
                          +
                          {((client as Client & { tags?: string[] }).tags ?? [])
                            .length - 2}
                        </span>
                      )}
                      {((client as Client & { tags?: string[] }).tags ?? [])
                        .length === 0 && (
                        <span className="text-muted-foreground/40 text-xs">
                          —
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        type="button"
                        title={
                          pinned.has(client.id) ? "Unpin client" : "Pin client"
                        }
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${pinned.has(client.id) ? "text-primary hover:bg-primary/10" : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(client.id);
                        }}
                        data-ocid={`clients.pin_button.${i + 1}`}
                      >
                        <Star
                          className={`h-3.5 w-3.5 ${pinned.has(client.id) ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        type="button"
                        title="View"
                        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() =>
                          navigate({
                            to: "/clients/$id",
                            params: { id: client.id },
                          })
                        }
                        data-ocid={`clients.view_button.${i + 1}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() => openEdit(client)}
                        data-ocid={`clients.edit_button.${i + 1}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        title="WhatsApp"
                        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                        onClick={() => openWhatsApp(client)}
                        data-ocid={`clients.whatsapp_button.${i + 1}`}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        onClick={() => setDeleteId(client.id)}
                        data-ocid={`clients.delete_button.${i + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ─── Pagination ─── */}
      {sorted.length > 0 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger
                className="h-7 w-16 text-xs"
                data-ocid="clients.page_size_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">
              {(page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              data-ocid="clients.pagination_prev"
            >
              <ChevronDown className="h-3.5 w-3.5 rotate-90" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                const pg =
                  totalPages <= 5 ? idx + 1 : Math.max(1, page - 2) + idx;
                if (pg > totalPages) return null;
                return (
                  <button
                    key={pg}
                    type="button"
                    className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                      pg === page
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setPage(pg)}
                    data-ocid={`clients.page_button.${pg}`}
                  >
                    {pg}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              data-ocid="clients.pagination_next"
            >
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </Button>
          </div>
        </div>
      )}

      {/* ─── Add/Edit Drawer ─── */}
      <ClientForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditClient(null);
        }}
        client={editClient}
      />

      {/* ─── Delete Confirmation ─── */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="clients.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this client record and all associated
              data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="clients.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmDelete}
              data-ocid="clients.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ─── Bulk Delete Confirmation ─── */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent data-ocid="clients.bulk_delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selected.size} clients?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all selected client records. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="clients.bulk_delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmBulkDelete}
              data-ocid="clients.bulk_delete_confirm_button"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ─── WhatsApp Modal ─── */}
      {whatsappClient && (
        <WhatsAppModal
          client={whatsappClient}
          isOpen={!!whatsappClient}
          onClose={() => setWhatsappClient(null)}
        />
      )}

      {/* ─── Client Split Pane ─── */}
      <ClientSplitPane
        client={splitPaneOpen ? hoveredClient : null}
        onClose={() => setSplitPaneOpen(false)}
      />

      {/* ─── Quick Activity Modal (L key) ─── */}
      <QuickActivityModal
        clientId={quickActivityClientId}
        isOpen={!!quickActivityClientId}
        onClose={() => setQuickActivityClientId(null)}
      />

      {/* ─── Bulk Action Bar ─── */}
      <BulkActionBar
        selectedCount={selected.size}
        entityType="clients"
        selectedIds={Array.from(selected)}
        onClear={() => setSelected(new Set())}
        onBulkExport={() =>
          exportCSV(allClients.filter((c) => selected.has(c.id)))
        }
        onBulkDelete={confirmBulkDelete}
        onBulkMoveStage={handleBulkStatusChange}
      />
    </div>
  );
}
