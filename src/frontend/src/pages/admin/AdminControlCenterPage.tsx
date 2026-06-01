import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useInterns } from "@/hooks/use-interns";
import { useMeetingsForUser } from "@/hooks/use-meetings";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Calendar,
  CheckSquare,
  FileText,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const quickActions = [
  {
    label: "Add Intern",
    href: "/interns/new",
    icon: Users,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "View Tasks",
    href: "/tasks",
    icon: CheckSquare,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    label: "Meetings",
    href: "/meetings",
    icon: Calendar,
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    label: "Submissions",
    href: "/submissions",
    icon: FileText,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    label: "Automations",
    href: "/admin/automations",
    icon: Zap,
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    label: "Analytics",
    href: "/clients/analytics",
    icon: TrendingUp,
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
];

export default function AdminControlCenterPage() {
  const { displayName } = useAuth();
  const { data: interns = [] } = useInterns();
  const { data: meetings = [] } = useMeetingsForUser();

  const now = Date.now();
  const today = new Date();
  const todayStr = today.toDateString();
  const todayMeetings = meetings.filter((m) => {
    const d = new Date(Number(m.scheduledAt) / 1_000_000);
    return d.toDateString() === todayStr;
  });
  const activeInterns = interns.filter((i) => i.isActive).length;
  const upcomingMeetings = meetings.filter(
    (m) => Number(m.scheduledAt) / 1_000_000 > now,
  ).length;

  return (
    <div
      className="p-6 max-w-6xl mx-auto space-y-8"
      data-ocid="control_center.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Control Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back,{" "}
            <span className="text-foreground font-medium">{displayName}</span>.
            Here's your operational overview.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-primary/30 text-primary bg-primary/5 px-3 py-1"
        >
          <Activity className="h-3 w-3 mr-1" /> Live
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Interns",
            value: activeInterns,
            icon: Users,
            color: "text-primary",
          },
          {
            label: "Today's Meetings",
            value: todayMeetings.length,
            icon: Calendar,
            color: "text-blue-400",
          },
          {
            label: "Upcoming Meetings",
            value: upcomingMeetings,
            icon: Calendar,
            color: "text-purple-400",
          },
          {
            label: "Total Interns",
            value: interns.length,
            icon: Users,
            color: "text-amber-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map(({ label, href, icon: Icon, color }) => (
              <Link
                key={href}
                to={href}
                data-ocid={`control_center.quick_${label.toLowerCase().replace(/ /g, "_")}_button`}
              >
                <div
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer hover:opacity-80 transition-all ${color}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Meetings */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">
            Today's Meetings
          </CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/meetings">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {todayMeetings.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-ocid="control_center.meetings_empty_state"
            >
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No meetings scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todayMeetings.map((m, idx) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/50"
                  data-ocid={`control_center.meeting.${idx + 1}`}
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {m.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        Number(m.scheduledAt) / 1_000_000,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" · "}
                      {Number(m.durationMinutes)}min
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {m.meetingType}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
