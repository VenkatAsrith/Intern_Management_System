import type { ClientFilters } from "@/types/clients";
/**
 * Persistent CRM hooks: column visibility, pinned clients, saved filters, onboarding checklist
 * All stored in localStorage for zero-latency UI
 */
import { useEffect, useState } from "react";

const LS = {
  COLS: "crm:visibleCols",
  PINNED: "crm:pinnedClients",
  SAVED_FILTERS: "crm:savedFilters",
  ONBOARDING: "crm:onboardingDone",
};

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, val: T) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

// ── Column Visibility ──────────────────────────────────────────────────────────
export const DEFAULT_VISIBLE_COLS = [
  "company",
  "contact",
  "status",
  "priority",
  "dealValue",
  "leadScore",
  "dealProbability",
  "followUp",
  "assigned",
  "source",
  "tags",
  "actions",
];

export const ALL_COLUMNS: { key: string; label: string }[] = [
  { key: "company", label: "Company" },
  { key: "contact", label: "Primary Contact" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "dealValue", label: "Deal Value" },
  { key: "leadScore", label: "Lead Score" },
  { key: "dealProbability", label: "Deal Probability %" },
  { key: "followUp", label: "Follow-up Date" },
  { key: "assigned", label: "Assigned To" },
  { key: "source", label: "Source" },
  { key: "tags", label: "Tags" },
  { key: "daysInactive", label: "Days Inactive" },
  { key: "industry", label: "Industry" },
  { key: "actions", label: "Actions" },
];

export function useColumnVisibility() {
  const [visible, setVisible] = useState<Set<string>>(
    () => new Set(load<string[]>(LS.COLS, DEFAULT_VISIBLE_COLS)),
  );

  function toggle(key: string) {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      save(LS.COLS, Array.from(next));
      return next;
    });
  }

  function resetToDefault() {
    const defaults = new Set(DEFAULT_VISIBLE_COLS);
    setVisible(defaults);
    save(LS.COLS, DEFAULT_VISIBLE_COLS);
  }

  return { visible, toggle, resetToDefault };
}

// ── Pinned Clients ─────────────────────────────────────────────────────────────
export function usePinnedClients() {
  const [pinned, setPinned] = useState<Set<string>>(
    () => new Set(load<string[]>(LS.PINNED, [])),
  );

  function togglePin(id: string) {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      save(LS.PINNED, Array.from(next));
      return next;
    });
  }

  return { pinned, togglePin };
}

// ── Saved Filters ──────────────────────────────────────────────────────────────
export interface SavedFilter {
  id: string;
  name: string;
  filters: ClientFilters;
}

export function useSavedFilters() {
  const [saved, setSaved] = useState<SavedFilter[]>(() =>
    load<SavedFilter[]>(LS.SAVED_FILTERS, []),
  );

  function saveFilter(name: string, filters: ClientFilters) {
    const entry: SavedFilter = {
      id: `f_${Date.now()}`,
      name,
      filters,
    };
    setSaved((prev) => {
      const next = [...prev, entry];
      save(LS.SAVED_FILTERS, next);
      return next;
    });
  }

  function deleteFilter(id: string) {
    setSaved((prev) => {
      const next = prev.filter((f) => f.id !== id);
      save(LS.SAVED_FILTERS, next);
      return next;
    });
  }

  return { saved, saveFilter, deleteFilter };
}

// ── Onboarding Checklist ───────────────────────────────────────────────────────
export interface ChecklistItem {
  key: string;
  label: string;
  description: string;
  done: boolean;
}

export function useOnboardingChecklist(opts: {
  hasClients: boolean;
  hasActivity: boolean;
  hasProposal: boolean;
  hasWon: boolean;
}) {
  const [dismissed, setDismissed] = useState<boolean>(() =>
    load<boolean>(LS.ONBOARDING, false),
  );

  const items: ChecklistItem[] = [
    {
      key: "first_client",
      label: "Add your first client",
      description: "Create a client record to start tracking your pipeline",
      done: opts.hasClients,
    },
    {
      key: "first_activity",
      label: "Log your first activity",
      description: "Record a call, meeting, or note on a client",
      done: opts.hasActivity,
    },
    {
      key: "first_proposal",
      label: "Send a proposal",
      description: "Move a deal to Proposal Sent stage",
      done: opts.hasProposal,
    },
    {
      key: "first_deal",
      label: "Close your first deal",
      description: "Mark a client as Closed Won",
      done: opts.hasWon,
    },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const isAllDone = doneCount === items.length;
  const progress = Math.round((doneCount / items.length) * 100);

  function dismiss() {
    setDismissed(true);
    save(LS.ONBOARDING, true);
  }

  const show = !dismissed && !isAllDone;

  return { items, doneCount, isAllDone, progress, show, dismiss };
}
