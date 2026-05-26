import { GlobalSearch } from "@/components/GlobalSearch";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Outlet, useLocation } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/interns": "Interns",
  "/interns/new": "Add Intern",
  "/settings": "Settings",
};

function getPageTitle(path: string): string {
  if (pageTitles[path]) return pageTitles[path];
  if (path.includes("/interns/") && path.includes("/edit"))
    return "Edit Intern";
  if (path.includes("/interns/")) return "Intern Profile";
  return "TechMecha Torque";
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, displayName } = useAuth();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              data-ocid="header.menu_button"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-foreground leading-tight">
                {pageTitle}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                TechMecha Torque — Intern Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GlobalSearch />
            <NotificationCenter />
            {displayName && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {displayName}
                </span>
              </div>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void logout()}
              className="text-muted-foreground hover:text-destructive gap-1.5 h-8"
              data-ocid="header.logout_button"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Sign out</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
