import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, q as Skeleton, r as reactExports, D as Dialog, l as DialogTrigger, m as Button, n as DialogContent, o as DialogHeader, p as DialogTitle, s as Badge, P as ue } from "./index-BMeK9e6q.js";
import { C as Checkbox } from "./checkbox-BqYStX9A.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D791wupo.js";
import { u as useAdminUsers, a as useCreateUser, b as useUpdateUser, c as useDeactivateUser } from "./use-admin-Npb-2rn1.js";
import { U as UserCheck } from "./user-check-DAbrVFSj.js";
import "./index-xhjDzk0w.js";
import "./index-NDr7xJHf.js";
import "./check-Bu_kUyWO.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./chevron-down-DGBe83Kh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
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
  "viewer"
];
const ALL_SPACES = ["Org", "Marketing", "Learning"];
const roleColors = {
  superAdmin: "bg-red-500/20 text-red-400 border-red-500/30",
  admin: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  manager: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hr: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  sales: "bg-green-500/20 text-green-400 border-green-500/30",
  marketing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  finance: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  operations: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  viewer: "bg-muted text-muted-foreground border-border"
};
function AddUserDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    username: "",
    displayName: "",
    password: "",
    roleText: "viewer",
    spaces: []
  });
  const createUser = useCreateUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser.mutateAsync(form);
      ue.success(`User "${form.displayName}" created successfully`);
      setOpen(false);
      setForm({
        username: "",
        displayName: "",
        password: "",
        roleText: "viewer",
        spaces: []
      });
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to create user");
    }
  };
  const toggleSpace = (space) => {
    setForm((f) => ({
      ...f,
      spaces: f.spaces.includes(space) ? f.spaces.filter((s) => s !== space) : [...f.spaces, space]
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "users.open_modal_button", className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
      "Add User"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border text-foreground max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New User" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "username",
              "data-ocid": "users.username_input",
              value: form.username,
              onChange: (e) => setForm((f) => ({ ...f, username: e.target.value })),
              required: true,
              className: "bg-background border-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Display Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "displayName",
              "data-ocid": "users.display_name_input",
              value: form.displayName,
              onChange: (e) => setForm((f) => ({ ...f, displayName: e.target.value })),
              required: true,
              className: "bg-background border-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "password",
              type: "password",
              "data-ocid": "users.password_input",
              value: form.password,
              onChange: (e) => setForm((f) => ({ ...f, password: e.target.value })),
              required: true,
              className: "bg-background border-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.roleText,
              onValueChange: (v) => setForm((f) => ({ ...f, roleText: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "users.role_select",
                    className: "bg-background border-input",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Spaces" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: ALL_SPACES.map((space) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `space-${space}`,
                checked: form.spaces.includes(space),
                onCheckedChange: () => toggleSpace(space),
                "data-ocid": `users.space_${space.toLowerCase()}_checkbox`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `space-${space}`, className: "cursor-pointer", children: space })
          ] }, space)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => setOpen(false),
              "data-ocid": "users.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: createUser.isPending,
              "data-ocid": "users.submit_button",
              children: createUser.isPending ? "Creating..." : "Create User"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function UserRow({ user }) {
  const updateUser = useUpdateUser();
  const deactivateUser = useDeactivateUser();
  const isProtected = HARDCODED_ADMINS.includes(user.username.toLowerCase());
  const handleToggleActive = async () => {
    try {
      await deactivateUser.mutateAsync(user.id);
      ue.success(`User ${user.isActive ? "deactivated" : "activated"}`);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to update user");
    }
  };
  const handleRoleChange = async (newRole) => {
    try {
      await updateUser.mutateAsync({
        userId: user.id,
        roleText: newRole,
        spaces: user.spaces,
        isActive: user.isActive
      });
      ue.success("Role updated");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to update role");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-muted/30 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-medium text-foreground", children: user.username }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: user.displayName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isProtected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        className: `border text-xs ${roleColors[user.role] ?? roleColors.viewer}`,
        children: user.role
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: user.role, onValueChange: handleRoleChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-36 text-xs bg-transparent border-none p-0 focus:ring-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: `border text-xs cursor-pointer ${roleColors[user.role] ?? roleColors.viewer}`,
          children: user.role
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: r }, r)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: user.spaces.length > 0 ? user.spaces.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "text-xs border-border text-muted-foreground",
        children: s
      },
      s
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "All" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        className: `text-xs border ${user.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-muted text-muted-foreground border-border"}`,
        children: user.isActive ? "Active" : "Inactive"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isProtected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-xs text-muted-foreground italic",
        title: "Cannot modify hardcoded admin",
        children: "Protected"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        className: "h-7 gap-1.5 text-xs",
        onClick: handleToggleActive,
        disabled: deactivateUser.isPending || updateUser.isPending,
        "data-ocid": `users.toggle_active_button.${user.id}`,
        title: user.isActive ? "Deactivate user" : "Activate user",
        children: user.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3.5 w-3.5 text-destructive" }),
          " Deactivate"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3.5 w-3.5 text-green-400" }),
          " Activate"
        ] })
      }
    ) })
  ] });
}
function UsersPage() {
  const { isAdmin } = useAuth();
  const { data: users, isLoading } = useAdminUsers();
  if (!isAdmin()) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access denied — admin only" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "User Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage platform users and their roles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddUserDialog, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Spaces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (users ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "users.empty_state",
          children: "No users found"
        }
      ) }) : (users ?? []).map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user }, user.id)) })
    ] }) }) })
  ] });
}
export {
  UsersPage as default
};
