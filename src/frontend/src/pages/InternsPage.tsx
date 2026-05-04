import { ExperienceLevel, Space, Status } from "@/backend";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteIntern, useInterns } from "@/hooks/use-interns";
import type { Intern } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Download,
  Eye,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey = keyof Pick<
  Intern,
  "name" | "email" | "status" | "space" | "joiningDate" | "experienceLevel"
>;
type SortDir = "asc" | "desc";

interface ColVisibility {
  email: boolean;
  phone: boolean;
  space: boolean;
  status: boolean;
  experienceLevel: boolean;
  joiningDate: boolean;
  lastWhatsAppedAt: boolean;
  documents: boolean;
}

interface DeleteTarget {
  id: string;
  name: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  OnHold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};
const SPACE_COLORS: Record<string, string> = {
  Org: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Marketing: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Learning: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};
const EXP_COLORS: Record<string, string> = {
  Junior: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Mid: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Senior: "bg-green-500/20 text-green-400 border-green-500/30",
};

function fmt(date: Date | undefined): string {
  if (!date) return "Never";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function exportToCsv(interns: Intern[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Space",
    "Status",
    "Experience",
    "Department",
    "Joining Date",
    "Last WhatsApp",
    "Offer Letter",
    "Certificate",
    "Completion Letter",
  ];
  const rows = interns.map((i) => [
    i.name,
    i.email,
    i.phone,
    i.space,
    i.status,
    i.experienceLevel,
    i.department,
    fmt(i.joiningDate),
    fmt(i.lastWhatsAppedAt),
    i.offerLetterSent ? "Sent" : "Not Sent",
    i.certificateSent ? "Sent" : "Not Sent",
    i.completionLetterSent ? "Sent" : "Not Sent",
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `interns-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function DocDot({ sent, label }: { sent: boolean; label: string }) {
  return (
    <span
      title={`${label}: ${sent ? "Sent" : "Not sent"}`}
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
        sent ? "text-emerald-400" : "text-muted-foreground/25"
      }`}
    >
      {sent ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Circle className="w-3 h-3" />
      )}
    </span>
  );
}

function SortIcon({
  col,
  sortKey,
  sortDir,
}: { col: string; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
  return sortDir === "asc" ? (
    <ArrowUp className="h-3 w-3" />
  ) : (
    <ArrowDown className="h-3 w-3" />
  );
}

// ─── Mobile Card ────────────────────────────────────────────────────────────

function InternCard({
  intern,
  idx,
  onDelete,
}: { intern: Intern; idx: number; onDelete: (t: DeleteTarget) => void }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="bg-card border border-border rounded-xl p-4 space-y-3 cursor-pointer hover:border-primary/30 transition-smooth w-full text-left"
      onClick={() =>
        navigate({ to: "/interns/$id", params: { id: intern.id } })
      }
      data-ocid={`interns.item.${idx}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">
              {intern.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate text-sm">
              {intern.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {intern.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <a
            href={`https://wa.me/91${intern.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-emerald-400 hover:bg-muted transition-smooth"
            aria-label="WhatsApp"
            data-ocid={`interns.whatsapp_button.${idx}`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete({ id: intern.id, name: intern.name });
            }}
            data-ocid={`interns.delete_button.${idx}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge className={`text-xs border ${SPACE_COLORS[intern.space]}`}>
          {intern.space}
        </Badge>
        <Badge className={`text-xs border ${STATUS_COLORS[intern.status]}`}>
          {intern.status}
        </Badge>
        <Badge
          className={`text-xs border ${EXP_COLORS[intern.experienceLevel]}`}
        >
          {intern.experienceLevel}
        </Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{intern.phone}</span>
        <span>Joined {fmt(intern.joiningDate)}</span>
      </div>
    </button>
  );
}

// ─── Column header button ───────────────────────────────────────────────────────

function Th({
  label,
  colId,
  sortKey,
  sortDir,
  onSort,
}: {
  label: string;
  colId: SortKey;
  sortKey: SortKey | null;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
}) {
  return (
    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
      <button
        type="button"
        onClick={() => onSort(colId)}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {label} <SortIcon col={colId} sortKey={sortKey} sortDir={sortDir} />
      </button>
    </th>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function InternsPage() {
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [spaceFilter, setSpaceFilter] = useState<Space | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<Status | undefined>(
    undefined,
  );
  const [expFilter, setExpFilter] = useState<ExperienceLevel | undefined>(
    undefined,
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  // Sorting
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  // Pagination
  const [pageSize, setPageSize] = useState(25);
  const [pageIdx, setPageIdx] = useState(0);
  // Column visibility
  const [colVis, setColVis] = useState<ColVisibility>({
    email: true,
    phone: true,
    space: true,
    status: true,
    experienceLevel: true,
    joiningDate: true,
    lastWhatsAppedAt: false,
    documents: true,
  });
  // Delete
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // Data
  const { data: rawInterns = [], isLoading } = useInterns({
    space: spaceFilter,
    status: statusFilter,
    search: searchQuery,
  });
  const deleteIntern = useDeleteIntern();
  const navigate = useNavigate();

  // Client-side extra filters + sort
  const interns = useMemo(() => {
    let filtered = rawInterns;
    if (expFilter)
      filtered = filtered.filter((i) => i.experienceLevel === expFilter);
    if (dateFrom) {
      const d = new Date(dateFrom);
      filtered = filtered.filter((i) => i.joiningDate >= d);
    }
    if (dateTo) {
      const d = new Date(dateTo);
      d.setHours(23, 59, 59, 999);
      filtered = filtered.filter((i) => i.joiningDate <= d);
    }
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp =
          av instanceof Date && bv instanceof Date
            ? av.getTime() - bv.getTime()
            : String(av ?? "").localeCompare(String(bv ?? ""));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return filtered;
  }, [rawInterns, expFilter, dateFrom, dateTo, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPageIdx(0);
  }

  const totalPages = Math.max(1, Math.ceil(interns.length / pageSize));
  const paged = interns.slice(pageIdx * pageSize, (pageIdx + 1) * pageSize);
  const activeFilterCount = [
    !!spaceFilter,
    !!statusFilter,
    !!expFilter,
    !!dateFrom,
    !!dateTo,
  ].filter(Boolean).length;

  function clearFilters() {
    setSpaceFilter(undefined);
    setStatusFilter(undefined);
    setExpFilter(undefined);
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
    setPageIdx(0);
  }

  function toggleCol(key: keyof ColVisibility) {
    setColVis((v) => ({ ...v, [key]: !v[key] }));
  }

  const colCount =
    1 /* name always visible */ +
    (colVis.email ? 1 : 0) +
    (colVis.phone ? 1 : 0) +
    (colVis.space ? 1 : 0) +
    (colVis.status ? 1 : 0) +
    (colVis.experienceLevel ? 1 : 0) +
    (colVis.joiningDate ? 1 : 0) +
    (colVis.lastWhatsAppedAt ? 1 : 0) +
    (colVis.documents ? 1 : 0) +
    1; /* actions always visible */

  return (
    <div className="p-4 md:p-6 space-y-5" data-ocid="interns.page">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Interns</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {interns.length} intern{interns.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => exportToCsv(interns)}
            className="gap-1.5 text-xs"
            data-ocid="interns.export_button"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
          <Link to="/interns/new">
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 gap-2 text-primary-foreground"
              data-ocid="interns.add_button"
            >
              <Plus className="h-4 w-4" /> Add Intern
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Name, email, or phone…"
            className="pl-8 h-8 text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageIdx(0);
            }}
            data-ocid="interns.search_input"
          />
        </div>

        {/* Space */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant={spaceFilter ? "default" : "outline"}
              size="sm"
              className={`h-8 text-xs gap-1.5 ${spaceFilter ? "bg-primary text-primary-foreground" : ""}`}
              data-ocid="interns.space_filter"
            >
              <SlidersHorizontal className="h-3 w-3" />
              {spaceFilter ?? "Space"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuLabel className="text-xs">
              Filter by Space
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(
              [undefined, Space.Org, Space.Marketing, Space.Learning] as const
            ).map((s) => (
              <DropdownMenuCheckboxItem
                key={s ?? "all"}
                checked={spaceFilter === s}
                onCheckedChange={() => {
                  setSpaceFilter(s);
                  setPageIdx(0);
                }}
                data-ocid={`interns.space_${(s ?? "all").toLowerCase()}_tab`}
              >
                {s ?? "All Spaces"}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant={statusFilter ? "default" : "outline"}
              size="sm"
              className={`h-8 text-xs gap-1.5 ${statusFilter ? "bg-primary text-primary-foreground" : ""}`}
              data-ocid="interns.status_filter"
            >
              <SlidersHorizontal className="h-3 w-3" />
              {statusFilter ?? "Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuLabel className="text-xs">
              Filter by Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(
              [
                undefined,
                Status.Active,
                Status.Completed,
                Status.OnHold,
              ] as const
            ).map((s) => (
              <DropdownMenuCheckboxItem
                key={s ?? "all"}
                checked={statusFilter === s}
                onCheckedChange={() => {
                  setStatusFilter(s);
                  setPageIdx(0);
                }}
                data-ocid={`interns.status_${(s ?? "all").toLowerCase()}_tab`}
              >
                {s ?? "All Status"}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Experience */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant={expFilter ? "default" : "outline"}
              size="sm"
              className={`h-8 text-xs gap-1.5 ${expFilter ? "bg-primary text-primary-foreground" : ""}`}
              data-ocid="interns.exp_filter"
            >
              <SlidersHorizontal className="h-3 w-3" />
              {expFilter ?? "Experience"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuLabel className="text-xs">
              Filter by Experience
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(
              [
                undefined,
                ExperienceLevel.Junior,
                ExperienceLevel.Mid,
                ExperienceLevel.Senior,
              ] as const
            ).map((e) => (
              <DropdownMenuCheckboxItem
                key={e ?? "all"}
                checked={expFilter === e}
                onCheckedChange={() => {
                  setExpFilter(e);
                  setPageIdx(0);
                }}
                data-ocid={`interns.exp_${(e ?? "all").toLowerCase()}_tab`}
              >
                {e ?? "All Levels"}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date range */}
        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            className="h-8 text-xs w-[130px]"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPageIdx(0);
            }}
            data-ocid="interns.date_from_input"
          />
          <span className="text-muted-foreground text-xs">–</span>
          <Input
            type="date"
            className="h-8 text-xs w-[130px]"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPageIdx(0);
            }}
            data-ocid="interns.date_to_input"
          />
        </div>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 hidden md:flex"
              data-ocid="interns.column_visibility_toggle"
            >
              <Eye className="h-3 w-3" /> Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs">
              Toggle Columns
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(
              [
                ["email", "Email"],
                ["phone", "Phone"],
                ["space", "Space"],
                ["status", "Status"],
                ["experienceLevel", "Experience"],
                ["joiningDate", "Joining Date"],
                ["lastWhatsAppedAt", "Last WhatsApp"],
                ["documents", "Documents"],
              ] as [keyof ColVisibility, string][]
            ).map(([key, label]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={colVis[key]}
                onCheckedChange={() => toggleCol(key)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFilterCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground"
            onClick={clearFilters}
            data-ocid="interns.clear_filters_button"
          >
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => toggleSort("name")}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Name{" "}
                      <SortIcon
                        col="name"
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    </button>
                  </th>
                  {colVis.email && (
                    <Th
                      label="Email"
                      colId="email"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={toggleSort}
                    />
                  )}
                  {colVis.phone && (
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                      Phone
                    </th>
                  )}
                  {colVis.space && (
                    <Th
                      label="Space"
                      colId="space"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={toggleSort}
                    />
                  )}
                  {colVis.status && (
                    <Th
                      label="Status"
                      colId="status"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={toggleSort}
                    />
                  )}
                  {colVis.experienceLevel && (
                    <Th
                      label="Exp."
                      colId="experienceLevel"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={toggleSort}
                    />
                  )}
                  {colVis.joiningDate && (
                    <Th
                      label="Joined"
                      colId="joiningDate"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={toggleSort}
                    />
                  )}
                  {colVis.lastWhatsAppedAt && (
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                      Last WA
                    </th>
                  )}
                  {colVis.documents && (
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                      Docs
                    </th>
                  )}
                  <th className="text-right px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  [
                    "r0",
                    "r1",
                    "r2",
                    "r3",
                    "r4",
                    "r5",
                    "r6",
                    "r7",
                    "r8",
                    "r9",
                  ].map((rk, i) => (
                    <tr key={rk} className={i % 2 === 1 ? "bg-muted/5" : ""}>
                      {[
                        "c0",
                        "c1",
                        "c2",
                        "c3",
                        "c4",
                        "c5",
                        "c6",
                        "c7",
                        "c8",
                        "c9",
                      ]
                        .slice(0, colCount)
                        .map((ck) => (
                          <td key={ck} className="px-4 py-3">
                            <Skeleton className="h-4 rounded" />
                          </td>
                        ))}
                    </tr>
                  ))
                ) : paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={colCount}
                      className="px-4 py-16 text-center"
                      data-ocid="interns.empty_state"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Users className="h-10 w-10 text-muted-foreground/30" />
                        <p className="text-muted-foreground font-medium">
                          No interns match your filters
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                        <Link to="/interns/new">
                          <Button
                            type="button"
                            className="bg-primary hover:bg-primary/90 gap-2 mt-1"
                          >
                            <Plus className="h-4 w-4" /> Add Intern
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((intern, rowIdx) => (
                    <tr
                      key={intern.id}
                      tabIndex={0}
                      className={`hover:bg-muted/20 transition-colors cursor-pointer ${rowIdx % 2 === 1 ? "bg-muted/5" : ""}`}
                      onClick={() =>
                        navigate({
                          to: "/interns/$id",
                          params: { id: intern.id },
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          navigate({
                            to: "/interns/$id",
                            params: { id: intern.id },
                          });
                      }}
                      data-ocid={`interns.item.${pageIdx * pageSize + rowIdx + 1}`}
                    >
                      {/* Name */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">
                              {intern.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <Link
                              to="/interns/$id"
                              params={{ id: intern.id }}
                              className="font-medium text-foreground hover:text-primary truncate block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {intern.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      {/* Email */}
                      {colVis.email && (
                        <td className="px-4 py-2.5">
                          <span className="text-xs text-muted-foreground truncate block max-w-[180px]">
                            {intern.email}
                          </span>
                        </td>
                      )}
                      {/* Phone */}
                      {colVis.phone && (
                        <td className="px-4 py-2.5">
                          <a
                            href={`https://wa.me/91${intern.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors group"
                            aria-label={`WhatsApp ${intern.name}`}
                            data-ocid={`interns.whatsapp_button.${pageIdx * pageSize + rowIdx + 1}`}
                          >
                            <MessageCircle className="h-3 w-3" />
                            {intern.phone}
                          </a>
                        </td>
                      )}
                      {/* Space */}
                      {colVis.space && (
                        <td className="px-4 py-2.5">
                          <Badge
                            className={`text-xs border ${SPACE_COLORS[intern.space] ?? ""}`}
                          >
                            {intern.space}
                          </Badge>
                        </td>
                      )}
                      {/* Status */}
                      {colVis.status && (
                        <td className="px-4 py-2.5">
                          <Badge
                            className={`text-xs border ${STATUS_COLORS[intern.status] ?? ""}`}
                          >
                            {intern.status}
                          </Badge>
                        </td>
                      )}
                      {/* Experience */}
                      {colVis.experienceLevel && (
                        <td className="px-4 py-2.5">
                          <Badge
                            className={`text-xs border ${EXP_COLORS[intern.experienceLevel] ?? ""}`}
                          >
                            {intern.experienceLevel}
                          </Badge>
                        </td>
                      )}
                      {/* Joining Date */}
                      {colVis.joiningDate && (
                        <td className="px-4 py-2.5">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {fmt(intern.joiningDate)}
                          </span>
                        </td>
                      )}
                      {/* Last WhatsApp */}
                      {colVis.lastWhatsAppedAt && (
                        <td className="px-4 py-2.5">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {fmt(intern.lastWhatsAppedAt)}
                          </span>
                        </td>
                      )}
                      {/* Documents */}
                      {colVis.documents && (
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1">
                            <DocDot
                              sent={intern.offerLetterSent}
                              label="Offer Letter"
                            />
                            <DocDot
                              sent={intern.certificateSent}
                              label="Certificate"
                            />
                            <DocDot
                              sent={intern.completionLetterSent}
                              label="Completion Letter"
                            />
                          </div>
                        </td>
                      )}
                      {/* Actions */}
                      <td className="px-4 py-2.5">
                        <div
                          className="flex justify-end"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground"
                                data-ocid={`interns.actions_menu.${pageIdx * pageSize + rowIdx + 1}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate({
                                    to: "/interns/$id",
                                    params: { id: intern.id },
                                  })
                                }
                                data-ocid={`interns.view_button.${pageIdx * pageSize + rowIdx + 1}`}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate({
                                    to: "/interns/$id/edit",
                                    params: { id: intern.id },
                                  })
                                }
                                data-ocid={`interns.edit_button.${pageIdx * pageSize + rowIdx + 1}`}
                              >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() =>
                                  setDeleteTarget({
                                    id: intern.id,
                                    name: intern.name,
                                  })
                                }
                                data-ocid={`interns.delete_button.${pageIdx * pageSize + rowIdx + 1}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && interns.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/10">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Rows:</span>
                <select
                  className="bg-muted/30 border border-border rounded px-1.5 py-0.5 text-xs text-foreground"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPageIdx(0);
                  }}
                  data-ocid="interns.rows_per_page_select"
                >
                  {[10, 25, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>
                  {pageIdx * pageSize + 1}–
                  {Math.min((pageIdx + 1) * pageSize, interns.length)} of{" "}
                  {interns.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
                  disabled={pageIdx === 0}
                  data-ocid="interns.pagination_prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground px-2">
                  Page {pageIdx + 1} of {totalPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    setPageIdx((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={pageIdx >= totalPages - 1}
                  data-ocid="interns.pagination_next"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          ["ms0", "ms1", "ms2", "ms3", "ms4", "ms5"].map((sk) => (
            <Skeleton key={sk} className="h-28 rounded-xl" />
          ))
        ) : interns.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="interns.empty_state"
          >
            <Users className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground font-medium">
              No interns found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or add a new intern
            </p>
            <Link to="/interns/new" className="mt-4">
              <Button
                type="button"
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Plus className="h-4 w-4" /> Add Intern
              </Button>
            </Link>
          </div>
        ) : (
          paged.map((intern, idx) => (
            <InternCard
              key={intern.id}
              intern={intern}
              idx={pageIdx * pageSize + idx + 1}
              onDelete={setDeleteTarget}
            />
          ))
        )}
        {!isLoading && interns.length > pageSize && (
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
              disabled={pageIdx === 0}
              data-ocid="interns.pagination_prev"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <span className="text-xs text-muted-foreground">
              {pageIdx + 1} / {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPageIdx((p) => Math.min(totalPages - 1, p + 1))}
              disabled={pageIdx >= totalPages - 1}
              data-ocid="interns.pagination_next"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="interns.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Intern</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteTarget(null)}
              data-ocid="interns.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) deleteIntern.mutate(deleteTarget.id);
                setDeleteTarget(null);
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              data-ocid="interns.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
