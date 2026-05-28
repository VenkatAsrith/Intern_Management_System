import type { UserAccount } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminUsers,
  useCreateUser,
  useDeactivateUser,
  useUpdateUser,
} from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import { PlusCircle, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HARDCODED_ADMINS = ["venkat", "jaychandra"];
const ALL_ROLES = [
  "superAdmin",
  "admin",
  "manager",
  "hr",
  "sales",
  "marketing",
  "finance",
  "operations",
  "viewer",
];
const ALL_SPACES = ["Org", "Marketing", "Learning"];

const roleColors: Record<string, string> = {
  superAdmin: "bg-red-500/20 text-red-400 border-red-500/30",
  admin: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  manager: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hr: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  sales: "bg-green-500/20 text-green-400 border-green-500/30",
  marketing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  finance: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  operations: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  viewer: "bg-muted text-muted-foreground border-border",
};

function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    password: "",
    roleText: "viewer",
    spaces: [] as string[],
  });
  const createUser = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser.mutateAsync(form);
      toast.success(`User "${form.displayName}" created successfully`);
      setOpen(false);
      setForm({
        username: "",
        displayName: "",
        password: "",
        roleText: "viewer",
        spaces: [],
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create user");
    }
  };

  const toggleSpace = (space: string) => {
    setForm((f) => ({
      ...f,
      spaces: f.spaces.includes(space)
        ? f.spaces.filter((s) => s !== space)
        : [...f.spaces, space],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-ocid="users.open_modal_button" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-ocid="users.username_input"
              value={form.username}
              onChange={(e) =>
                setForm((f) => ({ ...f, username: e.target.value }))
              }
              required
              className="bg-background border-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              data-ocid="users.display_name_input"
              value={form.displayName}
              onChange={(e) =>
                setForm((f) => ({ ...f, displayName: e.target.value }))
              }
              required
              className="bg-background border-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              data-ocid="users.password_input"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              required
              className="bg-background border-input"
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={form.roleText}
              onValueChange={(v) => setForm((f) => ({ ...f, roleText: v }))}
            >
              <SelectTrigger
                data-ocid="users.role_select"
                className="bg-background border-input"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {ALL_ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Spaces</Label>
            <div className="flex flex-col gap-2">
              {ALL_SPACES.map((space) => (
                <div key={space} className="flex items-center gap-2">
                  <Checkbox
                    id={`space-${space}`}
                    checked={form.spaces.includes(space)}
                    onCheckedChange={() => toggleSpace(space)}
                    data-ocid={`users.space_${space.toLowerCase()}_checkbox`}
                  />
                  <Label htmlFor={`space-${space}`} className="cursor-pointer">
                    {space}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              data-ocid="users.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createUser.isPending}
              data-ocid="users.submit_button"
            >
              {createUser.isPending ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UserRow({ user }: { user: UserAccount }) {
  const updateUser = useUpdateUser();
  const deactivateUser = useDeactivateUser();
  const isProtected = HARDCODED_ADMINS.includes(user.username.toLowerCase());

  const handleToggleActive = async () => {
    try {
      await deactivateUser.mutateAsync(user.id);
      toast.success(`User ${user.isActive ? "deactivated" : "activated"}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  const handleRoleChange = async (newRole: string) => {
    try {
      await updateUser.mutateAsync({
        userId: user.id,
        roleText: newRole,
        spaces: user.spaces,
        isActive: user.isActive,
      });
      toast.success("Role updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    }
  };

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-foreground">
        {user.username}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {user.displayName}
      </td>
      <td className="px-4 py-3">
        {isProtected ? (
          <Badge
            className={`border text-xs ${roleColors[user.role] ?? roleColors.viewer}`}
          >
            {user.role}
          </Badge>
        ) : (
          <Select value={user.role} onValueChange={handleRoleChange}>
            <SelectTrigger className="h-7 w-36 text-xs bg-transparent border-none p-0 focus:ring-0">
              <Badge
                className={`border text-xs cursor-pointer ${roleColors[user.role] ?? roleColors.viewer}`}
              >
                {user.role}
              </Badge>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {ALL_ROLES.map((r) => (
                <SelectItem key={r} value={r} className="text-xs">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {user.spaces.length > 0 ? (
            user.spaces.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="text-xs border-border text-muted-foreground"
              >
                {s}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">All</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge
          className={`text-xs border ${
            user.isActive
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-muted text-muted-foreground border-border"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="px-4 py-3">
        {isProtected ? (
          <span
            className="text-xs text-muted-foreground italic"
            title="Cannot modify hardcoded admin"
          >
            Protected
          </span>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={handleToggleActive}
            disabled={deactivateUser.isPending || updateUser.isPending}
            data-ocid={`users.toggle_active_button.${user.id}`}
            title={user.isActive ? "Deactivate user" : "Activate user"}
          >
            {user.isActive ? (
              <>
                <UserX className="h-3.5 w-3.5 text-destructive" /> Deactivate
              </>
            ) : (
              <>
                <UserCheck className="h-3.5 w-3.5 text-green-400" /> Activate
              </>
            )}
          </Button>
        )}
      </td>
    </tr>
  );
}

export default function UsersPage() {
  const { isAdmin } = useAuth();
  const { data: users, isLoading } = useAdminUsers();

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Access denied — admin only</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" data-ocid="users.page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage platform users and their roles
          </p>
        </div>
        <AddUserDialog />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Display Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Spaces
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {(users ?? []).length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-muted-foreground"
                      data-ocid="users.empty_state"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  (users ?? []).map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
