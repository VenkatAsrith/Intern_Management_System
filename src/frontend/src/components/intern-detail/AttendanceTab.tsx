import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck, Clock, MapPin, UserCheck } from "lucide-react";
import { useState } from "react";

export function AttendanceTab({ internId: _internId }: { internId: string }) {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div
        className="space-y-3"
        data-ocid="intern_detail.attendance_tab.loading_state"
      >
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="intern_detail.attendance_tab">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Present Days
              </p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Late Entries
              </p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CalendarCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Attendance %
              </p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card
        className="bg-card border-border"
        data-ocid="intern_detail.attendance_tab.empty_state"
      >
        <CardHeader className="px-5 py-4 border-b border-border">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Attendance Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10 flex flex-col items-center justify-center gap-3 text-center">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
            <CalendarCheck className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold text-foreground">
            Attendance tracking coming soon
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            QR check-in, leave requests, and monthly attendance reports will be
            available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
