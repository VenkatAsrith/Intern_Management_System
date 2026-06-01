import { c as createLucideIcon, r as reactExports, v as useInterns, w as useDeleteIntern, x as useNavigate, j as jsxRuntimeExports, m as Button, L as Link, y as Search, z as Space, A as Status, F as ExperienceLevel, E as Eye, q as Skeleton, U as Users, s as Badge } from "./index-BMeK9e6q.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Dz5BxwWS.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuSeparator, e as DropdownMenuCheckboxItem, f as DropdownMenuItem } from "./dropdown-menu-C4Th6WK3.js";
import { I as Input } from "./input-nhKD80eO.js";
import { D as Download } from "./download-DS5zENBd.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { M as MessageCircle } from "./message-circle-BYDu4QJj.js";
import { P as Pencil } from "./pencil-BSgzfHm1.js";
import { T as Trash2 } from "./trash-2-C-AHX60a.js";
import { C as ChevronLeft } from "./chevron-left-DoOHq2mA.js";
import { C as ChevronRight } from "./chevron-right-BUvIyUor.js";
import { A as ArrowUp, a as ArrowDown } from "./arrow-up-Bu5Mi1sE.js";
import { C as Check } from "./check-Bu_kUyWO.js";
import { C as Circle } from "./circle-BCf6w77C.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./index-NDr7xJHf.js";
import "./index-w2GhN1KG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const STATUS_COLORS = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  OnHold: "bg-amber-500/20 text-amber-400 border-amber-500/30"
};
const SPACE_COLORS = {
  Org: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Marketing: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Learning: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
};
const EXP_COLORS = {
  Junior: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Mid: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Senior: "bg-green-500/20 text-green-400 border-green-500/30"
};
function fmt(date) {
  if (!date) return "Never";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function exportToCsv(interns) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Space",
    "Status",
    "Experience",
    "Department",
    "Joining Date",
    "Last WhatsApp",
    "Offer Letter",
    "Certificate",
    "Completion Letter"
  ];
  const rows = interns.map((i) => [
    i.name,
    i.email,
    i.phone,
    i.space,
    i.status,
    i.experienceLevel,
    i.department,
    fmt(i.joiningDate),
    fmt(i.lastWhatsAppedAt),
    i.offerLetterSent ? "Sent" : "Not Sent",
    i.certificateSent ? "Sent" : "Not Sent",
    i.completionLetterSent ? "Sent" : "Not Sent"
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `interns-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function DocDot({ sent, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      title: `${label}: ${sent ? "Sent" : "Not sent"}`,
      className: `inline-flex items-center justify-center w-5 h-5 rounded-full ${sent ? "text-emerald-400" : "text-muted-foreground/25"}`,
      children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3 h-3" })
    }
  );
}
function SortIcon({
  col,
  sortKey,
  sortDir
}) {
  if (sortKey !== col) return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3 opacity-40" });
  return sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" });
}
function InternCard({
  intern,
  idx,
  onDelete
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "bg-card border border-border rounded-xl p-4 space-y-3 cursor-pointer hover:border-primary/30 transition-smooth w-full text-left",
      onClick: () => navigate({ to: "/interns/$id", params: { id: intern.id } }),
      "data-ocid": `interns.item.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: intern.name.charAt(0) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate text-sm", children: intern.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: intern.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://wa.me/91${intern.phone}`,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                className: "inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-emerald-400 hover:bg-muted transition-smooth",
                "aria-label": "WhatsApp",
                "data-ocid": `interns.whatsapp_button.${idx}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                onClick: (e) => {
                  e.stopPropagation();
                  onDelete({ id: intern.id, name: intern.name });
                },
                "data-ocid": `interns.delete_button.${idx}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs border ${SPACE_COLORS[intern.space]}`, children: intern.space }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs border ${STATUS_COLORS[intern.status]}`, children: intern.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs border ${EXP_COLORS[intern.experienceLevel]}`,
              children: intern.experienceLevel
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: intern.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Joined ",
            fmt(intern.joiningDate)
          ] })
        ] })
      ]
    }
  );
}
function Th({
  label,
  colId,
  sortKey,
  sortDir,
  onSort
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onSort(colId),
      className: "flex items-center gap-1 hover:text-foreground transition-colors",
      children: [
        label,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { col: colId, sortKey, sortDir })
      ]
    }
  ) });
}
function InternsPage() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [spaceFilter, setSpaceFilter] = reactExports.useState(void 0);
  const [statusFilter, setStatusFilter] = reactExports.useState(
    void 0
  );
  const [expFilter, setExpFilter] = reactExports.useState(
    void 0
  );
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [pageSize, setPageSize] = reactExports.useState(25);
  const [pageIdx, setPageIdx] = reactExports.useState(0);
  const [colVis, setColVis] = reactExports.useState({
    email: true,
    phone: true,
    space: true,
    status: true,
    experienceLevel: true,
    joiningDate: true,
    lastWhatsAppedAt: false,
    documents: true
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: rawInterns = [], isLoading } = useInterns({
    space: spaceFilter,
    status: statusFilter,
    search: searchQuery
  });
  const deleteIntern = useDeleteIntern();
  const navigate = useNavigate();
  const interns = reactExports.useMemo(() => {
    let filtered = rawInterns;
    if (expFilter)
      filtered = filtered.filter((i) => i.experienceLevel === expFilter);
    if (dateFrom) {
      const d = new Date(dateFrom);
      filtered = filtered.filter((i) => i.joiningDate >= d);
    }
    if (dateTo) {
      const d = new Date(dateTo);
      d.setHours(23, 59, 59, 999);
      filtered = filtered.filter((i) => i.joiningDate <= d);
    }
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = av instanceof Date && bv instanceof Date ? av.getTime() - bv.getTime() : String(av ?? "").localeCompare(String(bv ?? ""));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return filtered;
  }, [rawInterns, expFilter, dateFrom, dateTo, sortKey, sortDir]);
  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPageIdx(0);
  }
  const totalPages = Math.max(1, Math.ceil(interns.length / pageSize));
  const paged = interns.slice(pageIdx * pageSize, (pageIdx + 1) * pageSize);
  const activeFilterCount = [
    !!spaceFilter,
    !!statusFilter,
    !!expFilter,
    !!dateFrom,
    !!dateTo
  ].filter(Boolean).length;
  function clearFilters() {
    setSpaceFilter(void 0);
    setStatusFilter(void 0);
    setExpFilter(void 0);
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
    setPageIdx(0);
  }
  function toggleCol(key) {
    setColVis((v) => ({ ...v, [key]: !v[key] }));
  }
  const colCount = 1 + (colVis.email ? 1 : 0) + (colVis.phone ? 1 : 0) + (colVis.space ? 1 : 0) + (colVis.status ? 1 : 0) + (colVis.experienceLevel ? 1 : 0) + (colVis.joiningDate ? 1 : 0) + (colVis.lastWhatsAppedAt ? 1 : 0) + (colVis.documents ? 1 : 0) + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5", "data-ocid": "interns.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Interns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          interns.length,
          " intern",
          interns.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => exportToCsv(interns),
            className: "gap-1.5 text-xs",
            "data-ocid": "interns.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              " Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "bg-primary hover:bg-primary/90 gap-2 text-primary-foreground",
            "data-ocid": "interns.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Add Intern"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Name, email, or phone…",
            className: "pl-8 h-8 text-sm",
            value: searchQuery,
            onChange: (e) => {
              setSearchQuery(e.target.value);
              setPageIdx(0);
            },
            "data-ocid": "interns.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: spaceFilter ? "default" : "outline",
            size: "sm",
            className: `h-8 text-xs gap-1.5 ${spaceFilter ? "bg-primary text-primary-foreground" : ""}`,
            "data-ocid": "interns.space_filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3" }),
              spaceFilter ?? "Space"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Filter by Space" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          [void 0, Space.Org, Space.Marketing, Space.Learning].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DropdownMenuCheckboxItem,
            {
              checked: spaceFilter === s,
              onCheckedChange: () => {
                setSpaceFilter(s);
                setPageIdx(0);
              },
              "data-ocid": `interns.space_${(s ?? "all").toLowerCase()}_tab`,
              children: s ?? "All Spaces"
            },
            s ?? "all"
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: statusFilter ? "default" : "outline",
            size: "sm",
            className: `h-8 text-xs gap-1.5 ${statusFilter ? "bg-primary text-primary-foreground" : ""}`,
            "data-ocid": "interns.status_filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3" }),
              statusFilter ?? "Status"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Filter by Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          [
            void 0,
            Status.Active,
            Status.Completed,
            Status.OnHold
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DropdownMenuCheckboxItem,
            {
              checked: statusFilter === s,
              onCheckedChange: () => {
                setStatusFilter(s);
                setPageIdx(0);
              },
              "data-ocid": `interns.status_${(s ?? "all").toLowerCase()}_tab`,
              children: s ?? "All Status"
            },
            s ?? "all"
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: expFilter ? "default" : "outline",
            size: "sm",
            className: `h-8 text-xs gap-1.5 ${expFilter ? "bg-primary text-primary-foreground" : ""}`,
            "data-ocid": "interns.exp_filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3" }),
              expFilter ?? "Experience"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Filter by Experience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          [
            void 0,
            ExperienceLevel.Junior,
            ExperienceLevel.Mid,
            ExperienceLevel.Senior
          ].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DropdownMenuCheckboxItem,
            {
              checked: expFilter === e,
              onCheckedChange: () => {
                setExpFilter(e);
                setPageIdx(0);
              },
              "data-ocid": `interns.exp_${(e ?? "all").toLowerCase()}_tab`,
              children: e ?? "All Levels"
            },
            e ?? "all"
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            className: "h-8 text-xs w-[130px]",
            value: dateFrom,
            onChange: (e) => {
              setDateFrom(e.target.value);
              setPageIdx(0);
            },
            "data-ocid": "interns.date_from_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            className: "h-8 text-xs w-[130px]",
            value: dateTo,
            onChange: (e) => {
              setDateTo(e.target.value);
              setPageIdx(0);
            },
            "data-ocid": "interns.date_to_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs gap-1.5 hidden md:flex",
            "data-ocid": "interns.column_visibility_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
              " Columns"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-44", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Toggle Columns" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          [
            ["email", "Email"],
            ["phone", "Phone"],
            ["space", "Space"],
            ["status", "Status"],
            ["experienceLevel", "Experience"],
            ["joiningDate", "Joining Date"],
            ["lastWhatsAppedAt", "Last WhatsApp"],
            ["documents", "Documents"]
          ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DropdownMenuCheckboxItem,
            {
              checked: colVis[key],
              onCheckedChange: () => toggleCol(key),
              children: label
            },
            key
          ))
        ] })
      ] }),
      activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "h-8 text-xs text-muted-foreground",
          onClick: clearFilters,
          "data-ocid": "interns.clear_filters_button",
          children: [
            "Clear (",
            activeFilterCount,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleSort("name"),
              className: "flex items-center gap-1 hover:text-foreground transition-colors",
              children: [
                "Name",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortIcon,
                  {
                    col: "name",
                    sortKey,
                    sortDir
                  }
                )
              ]
            }
          ) }),
          colVis.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Th,
            {
              label: "Email",
              colId: "email",
              sortKey,
              sortDir,
              onSort: toggleSort
            }
          ),
          colVis.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Phone" }),
          colVis.space && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Th,
            {
              label: "Space",
              colId: "space",
              sortKey,
              sortDir,
              onSort: toggleSort
            }
          ),
          colVis.status && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Th,
            {
              label: "Status",
              colId: "status",
              sortKey,
              sortDir,
              onSort: toggleSort
            }
          ),
          colVis.experienceLevel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Th,
            {
              label: "Exp.",
              colId: "experienceLevel",
              sortKey,
              sortDir,
              onSort: toggleSort
            }
          ),
          colVis.joiningDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Th,
            {
              label: "Joined",
              colId: "joiningDate",
              sortKey,
              sortDir,
              onSort: toggleSort
            }
          ),
          colVis.lastWhatsAppedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Last WA" }),
          colVis.documents && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Docs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: isLoading ? [
          "r0",
          "r1",
          "r2",
          "r3",
          "r4",
          "r5",
          "r6",
          "r7",
          "r8",
          "r9"
        ].map((rk, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: i % 2 === 1 ? "bg-muted/5" : "", children: [
          "c0",
          "c1",
          "c2",
          "c3",
          "c4",
          "c5",
          "c6",
          "c7",
          "c8",
          "c9"
        ].slice(0, colCount).map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 rounded" }) }, ck)) }, rk)) : paged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: colCount,
            className: "px-4 py-16 text-center",
            "data-ocid": "interns.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-muted-foreground/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No interns match your filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your search or filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "bg-primary hover:bg-primary/90 gap-2 mt-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                    " Add Intern"
                  ]
                }
              ) })
            ] })
          }
        ) }) : paged.map((intern, rowIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            tabIndex: 0,
            className: `hover:bg-muted/20 transition-colors cursor-pointer ${rowIdx % 2 === 1 ? "bg-muted/5" : ""}`,
            onClick: () => navigate({
              to: "/interns/$id",
              params: { id: intern.id }
            }),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                navigate({
                  to: "/interns/$id",
                  params: { id: intern.id }
                });
            },
            "data-ocid": `interns.item.${pageIdx * pageSize + rowIdx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: intern.name.charAt(0) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/interns/$id",
                    params: { id: intern.id },
                    className: "font-medium text-foreground hover:text-primary truncate block",
                    onClick: (e) => e.stopPropagation(),
                    children: intern.name
                  }
                ) })
              ] }) }),
              colVis.email && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate block max-w-[180px]", children: intern.email }) }),
              colVis.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/91${intern.phone}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (e) => e.stopPropagation(),
                  className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors group",
                  "aria-label": `WhatsApp ${intern.name}`,
                  "data-ocid": `interns.whatsapp_button.${pageIdx * pageSize + rowIdx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3 w-3" }),
                    intern.phone
                  ]
                }
              ) }),
              colVis.space && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs border ${SPACE_COLORS[intern.space] ?? ""}`,
                  children: intern.space
                }
              ) }),
              colVis.status && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs border ${STATUS_COLORS[intern.status] ?? ""}`,
                  children: intern.status
                }
              ) }),
              colVis.experienceLevel && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs border ${EXP_COLORS[intern.experienceLevel] ?? ""}`,
                  children: intern.experienceLevel
                }
              ) }),
              colVis.joiningDate && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: fmt(intern.joiningDate) }) }),
              colVis.lastWhatsAppedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: fmt(intern.lastWhatsAppedAt) }) }),
              colVis.documents && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DocDot,
                  {
                    sent: intern.offerLetterSent,
                    label: "Offer Letter"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DocDot,
                  {
                    sent: intern.certificateSent,
                    label: "Certificate"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DocDot,
                  {
                    sent: intern.completionLetterSent,
                    label: "Completion Letter"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex justify-end",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-muted-foreground",
                        "data-ocid": `interns.actions_menu.${pageIdx * pageSize + rowIdx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open menu" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        DropdownMenuItem,
                        {
                          onClick: () => navigate({
                            to: "/interns/$id",
                            params: { id: intern.id }
                          }),
                          "data-ocid": `interns.view_button.${pageIdx * pageSize + rowIdx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
                            " View"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        DropdownMenuItem,
                        {
                          onClick: () => navigate({
                            to: "/interns/$id/edit",
                            params: { id: intern.id }
                          }),
                          "data-ocid": `interns.edit_button.${pageIdx * pageSize + rowIdx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-2 h-4 w-4" }),
                            " Edit"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        DropdownMenuItem,
                        {
                          className: "text-destructive focus:text-destructive",
                          onClick: () => setDeleteTarget({
                            id: intern.id,
                            name: intern.name
                          }),
                          "data-ocid": `interns.delete_button.${pageIdx * pageSize + rowIdx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                            " Delete"
                          ]
                        }
                      )
                    ] })
                  ] })
                }
              ) })
            ]
          },
          intern.id
        )) })
      ] }) }),
      !isLoading && interns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rows:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "bg-muted/30 border border-border rounded px-1.5 py-0.5 text-xs text-foreground",
              value: pageSize,
              onChange: (e) => {
                setPageSize(Number(e.target.value));
                setPageIdx(0);
              },
              "data-ocid": "interns.rows_per_page_select",
              children: [10, 25, 50].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: n, children: n }, n))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            pageIdx * pageSize + 1,
            "–",
            Math.min((pageIdx + 1) * pageSize, interns.length),
            " of",
            " ",
            interns.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
              onClick: () => setPageIdx((p) => Math.max(0, p - 1)),
              disabled: pageIdx === 0,
              "data-ocid": "interns.pagination_prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2", children: [
            "Page ",
            pageIdx + 1,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
              onClick: () => setPageIdx((p) => Math.min(totalPages - 1, p + 1)),
              disabled: pageIdx >= totalPages - 1,
              "data-ocid": "interns.pagination_next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden space-y-3", children: [
      isLoading ? ["ms0", "ms1", "ms2", "ms3", "ms4", "ms5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, sk)) : interns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "interns.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-muted-foreground/30 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No interns found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your filters or add a new intern" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns/new", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "bg-primary hover:bg-primary/90 gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                  " Add Intern"
                ]
              }
            ) })
          ]
        }
      ) : paged.map((intern, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        InternCard,
        {
          intern,
          idx: pageIdx * pageSize + idx + 1,
          onDelete: setDeleteTarget
        },
        intern.id
      )),
      !isLoading && interns.length > pageSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setPageIdx((p) => Math.max(0, p - 1)),
            disabled: pageIdx === 0,
            "data-ocid": "interns.pagination_prev",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
              " Prev"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          pageIdx + 1,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setPageIdx((p) => Math.min(totalPages - 1, p + 1)),
            disabled: pageIdx >= totalPages - 1,
            "data-ocid": "interns.pagination_next",
            children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "interns.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Intern" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                onClick: () => setDeleteTarget(null),
                "data-ocid": "interns.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: () => {
                  if (deleteTarget) deleteIntern.mutate(deleteTarget.id);
                  setDeleteTarget(null);
                },
                className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                "data-ocid": "interns.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  InternsPage
};
