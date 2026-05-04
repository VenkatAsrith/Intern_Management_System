import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { Database, Shield } from "lucide-react";

export function SettingsPage() {
  const { displayName } = useAuth();
  const { data: stats } = useDashboardStats();

  return (
    <div className="p-6 max-w-2xl space-y-6" data-ocid="settings.page">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage system configuration
        </p>
      </div>

      <Card data-ocid="settings.admin_card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-primary" />
            Admin Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Principal</p>
            <p className="font-mono text-sm text-foreground break-all mt-0.5">
              {displayName ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Admin Status</p>
            <p className="text-sm font-medium mt-0.5">
              <span className="text-emerald-400">
                ✓ Authorized administrator
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card data-ocid="settings.data_card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-primary" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Total Interns</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {stats?.totalInterns ?? "—"}
              </p>
            </div>
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {stats?.activeInterns ?? "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
