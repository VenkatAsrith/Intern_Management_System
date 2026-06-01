import { AppLayout } from "@/components/layout/AppLayout";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import React from "react";

function PageSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-muted rounded-xl animate-pulse" />
    </div>
  );
}

function LazyPage(importFn: () => Promise<{ default: React.ComponentType }>) {
  const Comp = React.lazy(importFn);
  return (
    <React.Suspense fallback={<PageSkeleton />}>
      <Comp />
    </React.Suspense>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <Outlet />
      <Toaster position="bottom-right" theme="dark" richColors />
    </ErrorBoundary>
  ),
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/dashboard" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

const layoutRoute = createRoute({
  getParentRoute: () => protectedRoute,
  id: "layout",
  component: AppLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: () =>
    LazyPage(() =>
      import("@/pages/DashboardPage").then((m) => ({
        default: m.DashboardPage,
      })),
    ),
});

const internsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/interns",
  component: () =>
    LazyPage(() =>
      import("@/pages/InternsPage").then((m) => ({ default: m.InternsPage })),
    ),
});

const newInternRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/interns/new",
  component: () =>
    LazyPage(() =>
      import("@/pages/NewInternPage").then((m) => ({
        default: m.NewInternPage,
      })),
    ),
});

const internDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/interns/$id",
  component: () =>
    LazyPage(() =>
      import("@/pages/InternDetailPage").then((m) => ({
        default: m.InternDetailPage,
      })),
    ),
});

const internEditRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/interns/$id/edit",
  component: () =>
    LazyPage(() =>
      import("@/pages/EditInternPage").then((m) => ({
        default: m.EditInternPage,
      })),
    ),
});

const channelsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/channels",
  component: () =>
    LazyPage(() =>
      import("@/pages/ChannelsPage").then((m) => ({ default: m.ChannelsPage })),
    ),
});

const dailyNotesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/notes",
  component: () =>
    LazyPage(() =>
      import("@/pages/DailyNotesPage").then((m) => ({
        default: m.DailyNotesPage,
      })),
    ),
});

const submissionsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/submissions",
  component: () =>
    LazyPage(() =>
      import("@/pages/SubmissionsPage").then((m) => ({
        default: m.SubmissionsPage,
      })),
    ),
});

const meetingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/meetings",
  component: () =>
    LazyPage(() =>
      import("@/pages/MeetingsPage").then((m) => ({ default: m.MeetingsPage })),
    ),
});

const timelineRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/timeline/$internId",
  component: () =>
    LazyPage(() =>
      import("@/pages/TimelinePage").then((m) => ({ default: m.TimelinePage })),
    ),
});

const workspaceRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/workspace/$internId",
  component: () =>
    LazyPage(() =>
      import("@/pages/WorkspacePage").then((m) => ({
        default: m.WorkspacePage,
      })),
    ),
});

const settingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/settings",
  component: () =>
    LazyPage(() =>
      import("@/pages/SettingsPage").then((m) => ({ default: m.SettingsPage })),
    ),
});

const tasksRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/tasks",
  component: () =>
    LazyPage(() =>
      import("@/pages/TasksPage").then((m) => ({ default: m.TasksPage })),
    ),
});

// ─── CRMS Routes ─────────────────────────────────────────────────────────────

const clientsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients",
  component: () => LazyPage(() => import("@/pages/clients/ClientsPage")),
});

const clientsKanbanRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients/kanban",
  component: () => LazyPage(() => import("@/pages/clients/ClientsKanbanPage")),
});

const clientsCalendarRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients/calendar",
  component: () =>
    LazyPage(() => import("@/pages/clients/ClientsCalendarPage")),
});

const clientsAnalyticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients/analytics",
  component: () =>
    LazyPage(() => import("@/pages/clients/ClientsAnalyticsPage")),
});

const clientDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients/$id",
  component: () => LazyPage(() => import("@/pages/clients/ClientDetailPage")),
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────

const adminProtectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "adminProtected",
  component: () => {
    const AdminProtected = React.lazy(() =>
      import("@/components/layout/ProtectedRoute").then((m) => ({
        default: () => <m.ProtectedRoute adminOnly />,
      })),
    );
    return (
      <React.Suspense fallback={null}>
        <AdminProtected />
      </React.Suspense>
    );
  },
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  id: "adminLayout",
  component: AppLayout,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/users",
  component: () => LazyPage(() => import("@/pages/admin/UsersPage")),
});

const adminApprovalsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/approvals",
  component: () => LazyPage(() => import("@/pages/admin/ApprovalsPage")),
});

const adminAuditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/audit",
  component: () => LazyPage(() => import("@/pages/admin/AuditLogPage")),
});

const adminAutomationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/automations",
  component: () => LazyPage(() => import("@/pages/admin/AutomationsPage")),
});

const adminAnnouncementsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/announcements",
  component: () => LazyPage(() => import("@/pages/admin/AnnouncementsPage")),
});

const adminControlCenterRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/control-center",
  component: () =>
    LazyPage(() => import("@/pages/admin/AdminControlCenterPage")),
});

// ─────────────────────────────────────────────────────────────────────────────

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  notFoundRoute,
  protectedRoute.addChildren([
    layoutRoute.addChildren([
      dashboardRoute,
      internsRoute,
      newInternRoute,
      internDetailRoute,
      internEditRoute,
      settingsRoute,
      channelsRoute,
      dailyNotesRoute,
      submissionsRoute,
      meetingsRoute,
      timelineRoute,
      workspaceRoute,
      clientsRoute,
      clientsKanbanRoute,
      clientsCalendarRoute,
      clientsAnalyticsRoute,
      clientDetailRoute,
      tasksRoute,
    ]),
  ]),
  adminProtectedRoute.addChildren([
    adminLayoutRoute.addChildren([
      adminUsersRoute,
      adminApprovalsRoute,
      adminAuditRoute,
      adminAutomationsRoute,
      adminAnnouncementsRoute,
      adminControlCenterRoute,
    ]),
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
