import { useAuth } from "@/hooks/use-auth";
import {
  useAnnouncements,
  useDeleteAnnouncement,
} from "@/hooks/use-notifications";
import { Megaphone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function bigintToDate(ts: bigint): Date {
  return new Date(Number(ts) / 1_000_000);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AnnouncementBanner() {
  const { data: announcements } = useAnnouncements(true);
  const { displayName } = useAuth();
  const deleteAnnouncement = useDeleteAnnouncement();
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("tmtims_dismissed_announcements");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const isAdmin =
    displayName === "Venkat Asrith" || displayName === "Jay Chandra";

  const active = (announcements ?? []).filter(
    (a) => !dismissedIds.includes(a.id),
  );

  const handleDismiss = (id: string) => {
    const next = [...dismissedIds, id];
    setDismissedIds(next);
    try {
      localStorage.setItem(
        "tmtims_dismissed_announcements",
        JSON.stringify(next),
      );
    } catch {
      /* ignore */
    }
  };

  if (active.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {active.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20"
            data-ocid={`announcement.banner.${a.id}`}
          >
            <Megaphone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {a.content}
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                Posted by {a.createdBy} ·{" "}
                {formatDate(bigintToDate(a.createdAt))}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => deleteAnnouncement.mutate(a.id)}
                  className="p-1 rounded hover:bg-primary/20 text-muted-foreground hover:text-destructive transition-smooth"
                  data-ocid={`announcement.delete_button.${a.id}`}
                  aria-label="Delete announcement"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDismiss(a.id)}
                className="p-1 rounded hover:bg-primary/20 text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid={`announcement.dismiss_button.${a.id}`}
                aria-label="Dismiss announcement"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
