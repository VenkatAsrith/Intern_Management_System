import { useAuth } from "@/hooks/use-auth";
import { useClients } from "@/hooks/use-clients";
import { useInterns } from "@/hooks/use-interns";
import { useBackend } from "@/lib/backend";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CreditCard,
  FileText,
  LayoutDashboard,
  Search,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface RecentVisit {
  label: string;
  path: string;
  type: "page" | "intern" | "client";
  timestamp: number;
}

const RECENT_KEY = "tmtims_recent_visits";

function readRecents(): RecentVisit[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [];
}

function writeRecents(recents: RecentVisit[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents.slice(0, 5)));
  } catch {
    /* ignore */
  }
}

export function addRecentVisit(visit: Omit<RecentVisit, "timestamp">) {
  const recents = readRecents().filter((r) => r.path !== visit.path);
  recents.unshift({ ...visit, timestamp: Date.now() });
  writeRecents(recents);
}

const COMMANDS = [
  {
    label: "New Client",
    shortcut: "NC",
    icon: <Briefcase className="h-4 w-4" />,
    action: "navigate",
    path: "/clients",
  },
  {
    label: "New Intern",
    shortcut: "NI",
    icon: <User className="h-4 w-4" />,
    action: "navigate",
    path: "/interns/new",
  },
  {
    label: "Go to Dashboard",
    shortcut: "GD",
    icon: <LayoutDashboard className="h-4 w-4" />,
    action: "navigate",
    path: "/dashboard",
  },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { displayName } = useAuth();
  const _userId = displayName ?? "admin";

  const { data: interns } = useInterns();
  const { data: clients } = useClients();
  const { actor } = useBackend();

  const [tasks, setTasks] = useState<
    Array<{ id: string; title: string; assignedTo: string; status: string }>
  >([]);
  const [invoices, setInvoices] = useState<
    Array<{
      id: string;
      invoiceNumber: string;
      clientId: string;
      clientName: string;
      total: number;
    }>
  >([]);

  useEffect(() => {
    setTasks([]);
  }, []);

  useEffect(() => {
    if (!open || !actor || !clients) return;
    Promise.all(
      clients.slice(0, 20).map((c) =>
        actor.getClientInvoices(c.id).then((inv) =>
          inv.map((i) => ({
            id: i.id,
            invoiceNumber: i.invoiceNumber,
            clientId: c.id,
            clientName: c.companyName,
            total: i.total,
          })),
        ),
      ),
    )
      .then((nested) => setInvoices(nested.flat().slice(0, 30)))
      .catch(() => setInvoices([]));
  }, [open, actor, clients]);

  const recents = useMemo(() => readRecents(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q)
      return {
        interns: [],
        clients: [],
        tasks: [],
        invoices: [],
        commands: COMMANDS,
        recents,
      };

    const filteredInterns = (interns ?? [])
      .filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.department.toLowerCase().includes(q),
      )
      .slice(0, 5);

    const filteredClients = (clients ?? [])
      .filter(
        (c) =>
          c.companyName.toLowerCase().includes(q) ||
          c.contactPersonName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      )
      .slice(0, 5);

    const filteredTasks = tasks
      .filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.assignedTo.toLowerCase().includes(q),
      )
      .slice(0, 5);

    const filteredInvoices = invoices
      .filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(q) ||
          i.clientName.toLowerCase().includes(q),
      )
      .slice(0, 5);

    const filteredCommands = COMMANDS.filter((c) =>
      c.label.toLowerCase().includes(q),
    );

    return {
      interns: filteredInterns,
      clients: filteredClients,
      tasks: filteredTasks,
      invoices: filteredInvoices,
      commands: filteredCommands,
      recents: [],
    };
  }, [query, interns, clients, tasks, invoices, recents]);

  const allItems = useMemo(() => {
    const items: Array<{
      type: string;
      data: unknown;
      label: string;
      path?: string;
    }> = [];
    if (results.recents.length > 0) {
      items.push({ type: "header", data: null, label: "Recently Visited" });
      for (const r of results.recents) {
        items.push({ type: "recent", data: r, label: r.label, path: r.path });
      }
    }
    if (results.commands.length > 0) {
      items.push({ type: "header", data: null, label: "Commands" });
      for (const c of results.commands) {
        items.push({ type: "command", data: c, label: c.label, path: c.path });
      }
    }
    if (results.interns.length > 0) {
      items.push({ type: "header", data: null, label: "Interns" });
      for (const i of results.interns) {
        items.push({
          type: "intern",
          data: i,
          label: i.name,
          path: `/interns/${i.id}`,
        });
      }
    }
    if (results.clients.length > 0) {
      items.push({ type: "header", data: null, label: "Clients" });
      for (const c of results.clients) {
        items.push({
          type: "client",
          data: c,
          label: c.companyName,
          path: `/clients/${c.id}`,
        });
      }
    }
    if (results.tasks.length > 0) {
      items.push({ type: "header", data: null, label: "Tasks" });
      for (const t of results.tasks) {
        items.push({ type: "task", data: t, label: t.title, path: "/tasks" });
      }
    }
    if (results.invoices.length > 0) {
      items.push({ type: "header", data: null, label: "Invoices" });
      for (const i of results.invoices) {
        items.push({
          type: "invoice",
          data: i,
          label: i.invoiceNumber,
          path: `/clients/${i.clientId}`,
        });
      }
    }
    return items;
  }, [results]);

  const selectableItems = useMemo(
    () => allItems.filter((i) => i.type !== "header"),
    [allItems],
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, selectableItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = selectableItems[selectedIndex];
        if (item?.path) {
          navigate({ to: item.path });
          addRecentVisit({
            label: item.label,
            path: item.path,
            type: item.type as "page" | "intern" | "client",
          });
          setOpen(false);
        }
      }
    },
    [selectableItems, selectedIndex, navigate],
  );

  const handleSelect = (item: {
    type: string;
    path?: string;
    label: string;
  }) => {
    if (item.path) {
      navigate({ to: item.path });
      addRecentVisit({
        label: item.label,
        path: item.path,
        type: item.type as "page" | "intern" | "client",
      });
      setOpen(false);
    }
  };

  let selectableIdx = -1;

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-muted-foreground text-xs hover:text-foreground hover:border-primary/40 transition-smooth"
        data-ocid="global_search.open_button"
        aria-label="Open search"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <kbd className="ml-1 px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono">
          Ctrl K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            data-ocid="global_search.modal"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search interns, clients, tasks, invoices..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none min-w-0"
                  data-ocid="global_search.input"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
                  data-ocid="global_search.close_button"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto py-2">
                {allItems.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No results found
                    </p>
                  </div>
                ) : (
                  allItems.map((item, idx) => {
                    if (item.type === "header") {
                      return (
                        <div
                          key={`h-${item.label}`}
                          className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                          {item.label}
                        </div>
                      );
                    }
                    selectableIdx++;
                    const isSelected = selectableIdx === selectedIndex;
                    const icon =
                      item.type === "intern" ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : item.type === "client" ? (
                        <Briefcase className="h-4 w-4 text-primary" />
                      ) : item.type === "task" ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : item.type === "invoice" ? (
                        <CreditCard className="h-4 w-4 text-primary" />
                      ) : item.type === "recent" ? (
                        <ArrowRight className="h-4 w-4 text-primary" />
                      ) : (
                        <FileText className="h-4 w-4 text-primary" />
                      );

                    const meta =
                      item.type === "intern"
                        ? `${(item.data as { space: string; domain?: string }).space} · ${(item.data as { domain?: string }).domain ?? "Intern"}`
                        : item.type === "client"
                          ? `${(item.data as { contactPersonName: string }).contactPersonName}`
                          : item.type === "task"
                            ? `${(item.data as { assignedTo: string }).assignedTo} · ${(item.data as { status: string }).status}`
                            : item.type === "invoice"
                              ? `${(item.data as { clientName: string }).clientName} · ₹${(item.data as { total: number }).total.toLocaleString()}`
                              : item.type === "command"
                                ? "Command"
                                : "";

                    return (
                      <button
                        key={`${item.type}-${idx}`}
                        type="button"
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(selectableIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-smooth ${
                          isSelected
                            ? "bg-primary/10 border-l-2 border-primary"
                            : "hover:bg-muted/50 border-l-2 border-transparent"
                        }`}
                        data-ocid={`global_search.item.${selectableIdx + 1}`}
                      >
                        <div className="p-1.5 rounded-md bg-primary/10 flex-shrink-0">
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.label}
                          </p>
                          {meta && (
                            <p className="text-xs text-muted-foreground truncate">
                              {meta}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <ArrowRight className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 rounded bg-background border border-border font-mono">
                    ↑↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 rounded bg-background border border-border font-mono">
                    ↵
                  </kbd>{" "}
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 rounded bg-background border border-border font-mono">
                    Esc
                  </kbd>{" "}
                  Close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
