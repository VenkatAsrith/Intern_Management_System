import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface ShortcutRow {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  section: string;
  rows: ShortcutRow[];
}

const ALL_SHORTCUTS: ShortcutGroup[] = [
  {
    section: "Global",
    rows: [
      { keys: ["Ctrl", "K"], description: "Open global search" },
      { keys: ["?"], description: "Toggle this shortcuts panel" },
      { keys: ["Ctrl", "N"], description: "New client" },
      { keys: ["Ctrl", "E"], description: "Export current view (CSV)" },
      { keys: ["Ctrl", "F"], description: "Focus search / filter input" },
    ],
  },
  {
    section: "IMS / Tasks",
    rows: [
      { keys: ["T"], description: "Open new task modal" },
      { keys: ["N"], description: "Open new daily note modal" },
      { keys: ["M"], description: "Focus message input in channels" },
      { keys: ["A"], description: "Open announcement modal" },
    ],
  },
  {
    section: "CRM Table",
    rows: [
      { keys: ["Space"], description: "Preview selected client (split pane)" },
      { keys: ["L"], description: "Log activity for hovered client" },
      { keys: ["F"], description: "Focus mode — collapse chrome" },
    ],
  },
];

function KbdKey({ children }: { children: string }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded border border-zinc-600 bg-zinc-800 text-zinc-300 font-mono text-xs font-medium shadow-sm">
      {children}
    </kbd>
  );
}

interface KeyboardShortcutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
}

export function KeyboardShortcutPanel({
  isOpen,
  onClose,
  currentPage,
}: KeyboardShortcutPanelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="bg-zinc-900 border-zinc-700 w-[500px] max-w-[95vw]"
        data-ocid="keyboard_shortcuts.dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Keyboard className="h-4 w-4 text-primary" />
            Keyboard Shortcuts
            {currentPage && (
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                — {currentPage}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-1">
          {ALL_SHORTCUTS.map((group) => (
            <div key={group.section}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {group.section}
              </h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-zinc-800">
                  {group.rows.map((row) => (
                    <tr key={row.description}>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-1">
                          {row.keys.map((k, i) => (
                            <span key={k} className="flex items-center gap-1">
                              {i > 0 && (
                                <span className="text-muted-foreground/50 text-xs">
                                  +
                                </span>
                              )}
                              <KbdKey>{k}</KbdKey>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground/60 pt-2 border-t border-zinc-800 mt-2">
          Press <KbdKey>?</KbdKey> anywhere to toggle this panel.
        </p>
      </DialogContent>
    </Dialog>
  );
}
