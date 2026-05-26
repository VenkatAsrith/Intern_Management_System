import { useAuth } from "@/hooks/use-auth";
import {
  useMarkAllAsRead,
  useMarkAsRead,
  useNotifications,
  useUnreadNotificationCount,
} from "@/hooks/use-notifications";
import type { Notification, NotificationType } from "@/types/notifications";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckSquare,
  Clock,
  CreditCard,
  Inbox,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NOTIFICATION_ICONS: Record<NotificationType, React.ReactNode> = {
  taskAssigned: <CheckSquare className="h-4 w-4 text-blue-400" />,
  taskOverdue: <CheckSquare className="h-4 w-4 text-red-400" />,
  stageChanged: <ArrowRight className="h-4 w-4 text-purple-400" />,
  invoiceDue: <CreditCard className="h-4 w-4 text-amber-400" />,
  attendanceAnomaly: <Clock className="h-4 w-4 text-orange-400" />,
  overdueFollowUp: <Clock className="h-4 w-4 text-rose-400" />,
  leaveApproved: <Calendar className="h-4 w-4 text-emerald-400" />,
  leaveRejected: <Calendar className="h-4 w-4 text-red-400" />,
  announcement: <Bell className="h-4 w-4 text-primary" />,
};

function relativeTime(ts: bigint): string {
  const diff = Date.now() - Number(ts) / 1_000_000;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function getNotificationPath(n: Notification): string {
  switch (n.notificationType) {
    case "taskAssigned":
    case "taskOverdue":
      return "/tasks";
    case "stageChanged":
      return n.relatedId ? `/clients/${n.relatedId}` : "/clients";
    case "invoiceDue":
      return n.relatedId ? `/clients/${n.relatedId}` : "/clients";
    case "attendanceAnomaly":
      return "/attendance";
    case "overdueFollowUp":
      return n.relatedId ? `/clients/${n.relatedId}` : "/clients";
    case "leaveApproved":
    case "leaveRejected":
      return "/attendance";
    case "announcement":
      return "/dashboard";
    default:
      return "/dashboard";
  }
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { displayName } = useAuth();
  const userId = displayName ?? "admin";
  const { data: notifications, isLoading } = useNotifications(userId);
  const unreadCount = useUnreadNotificationCount(userId);
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleNotificationClick = (n: Notification) => {
    if (!n.isRead) {
      markAsRead.mutate(n.id);
    }
    navigate({ to: getNotificationPath(n) });
    setOpen(false);
  };

  const handleMarkAll = () => {
    markAllAsRead.mutate(userId);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
        data-ocid="notifications.toggle_button"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
            data-ocid="notifications.panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAll}
                  className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
                  data-ocid="notifications.mark_all_read_button"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-6 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 animate-pulse"
                    >
                      <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 w-3/4 bg-muted rounded" />
                        <div className="h-3 w-1/2 bg-muted rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifications && notifications.length > 0 ? (
                notifications.map((n, i) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => handleNotificationClick(n)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-smooth border-b border-border last:border-0 ${
                      !n.isRead ? "bg-primary/5" : ""
                    }`}
                    data-ocid={`notifications.item.${i + 1}`}
                  >
                    <div className="p-1.5 rounded-md bg-primary/10 flex-shrink-0 mt-0.5">
                      {NOTIFICATION_ICONS[n.notificationType] ?? (
                        <Bell className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate">
                          {n.title}
                        </p>
                        {!n.isRead && (
                          <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">
                        {relativeTime(n.createdAt)}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div
                  className="px-4 py-10 text-center"
                  data-ocid="notifications.empty_state"
                >
                  <Inbox className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">
                    You&apos;re all caught up!
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    No new notifications
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
