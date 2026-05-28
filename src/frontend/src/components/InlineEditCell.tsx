import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface InlineEditCellProps {
  value: string | number | null;
  type: "text" | "number" | "date" | "select";
  options?: SelectOption[];
  onSave: (newValue: string) => Promise<void>;
  className?: string;
}

export function InlineEditCell({
  value,
  type,
  options,
  onSave,
  className = "",
}: InlineEditCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  function startEdit() {
    setDraft(String(value ?? ""));
    setError(null);
    setEditing(true);
    setTimeout(() => (inputRef.current as HTMLInputElement | null)?.focus(), 0);
  }

  function cancel() {
    setEditing(false);
    setError(null);
  }

  async function save() {
    if (draft === String(value ?? "")) {
      cancel();
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(draft);
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className={`flex flex-col gap-0.5 ${className}`}>
        <div className="flex items-center gap-1">
          {type === "select" && options ? (
            <select
              ref={inputRef as React.RefObject<HTMLSelectElement>}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") void save();
                if (e.key === "Escape") cancel();
              }}
              className="h-7 px-2 text-xs rounded border border-zinc-600 bg-zinc-800 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") void save();
                if (e.key === "Escape") cancel();
              }}
              className="h-7 px-2 text-xs rounded border border-zinc-600 bg-zinc-800 text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full min-w-0"
            />
          )}
          {saving && (
            <Loader2 className="h-3.5 w-3.5 text-muted-foreground animate-spin flex-shrink-0" />
          )}
        </div>
        {error && <p className="text-xs text-red-400 truncate">{error}</p>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEdit}
      title="Click to edit"
      className={`text-left hover:bg-zinc-800/50 hover:underline decoration-dashed underline-offset-2 cursor-text rounded px-1 -mx-1 transition-colors ${className}`}
    >
      {value !== null && value !== undefined && value !== "" ? (
        String(value)
      ) : (
        <span className="text-muted-foreground/40 text-xs">—</span>
      )}
    </button>
  );
}
