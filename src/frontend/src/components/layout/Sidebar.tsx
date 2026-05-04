import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, useLocation, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  Users,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/interns", label: "Interns", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

const spaceItems = [
  {
    label: "Org",
    icon: Briefcase,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    label: "Marketing",
    icon: Megaphone,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    label: "Learning",
    icon: GraduationCap,
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
          aria-hidden="true"
          role="presentation"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card border-r border-border",
          "transition-transform duration-300 ease-in-out",
          "lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">
                T
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm leading-tight">
                TechMecha
              </span>
              <span className="text-primary text-xs font-semibold leading-tight">
                Torque
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden h-7 w-7"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main
          </p>
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive =
              location.pathname === to ||
              (to !== "/dashboard" && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                data-ocid={`sidebar.${label.toLowerCase()}_link`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}

          <Separator className="my-4" />

          <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Spaces
          </p>
          <div className="px-2 flex flex-col gap-2">
            {spaceItems.map(({ label, icon: Icon, color }) => (
              <Link
                key={label}
                to="/interns"
                data-ocid={`sidebar.space_${label.toLowerCase()}_link`}
                className="flex items-center gap-2 w-full"
              >
                <Badge
                  className={cn(
                    "w-full justify-start gap-2 py-1.5 px-2.5 border cursor-pointer hover:opacity-80 transition-smooth",
                    color,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Badge>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} TechMecha Torque
          </p>
        </div>
      </aside>
    </>
  );
}
