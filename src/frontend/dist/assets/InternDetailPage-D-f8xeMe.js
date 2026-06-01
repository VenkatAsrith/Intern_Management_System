import { c as createLucideIcon, j as jsxRuntimeExports, J as FileText, K as User, m as Button, U as Users, s as Badge, q as Skeleton, N as SquareCheckBig, E as Eye, r as reactExports, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, O as DialogFooter, P as ue, C as Clock, h as Calendar, L as Link, Q as useBackend, u as useAuth, R as useQuery, V as useQueryClient, W as useMutation, X as RefreshCw, Y as convertPerformance, Z as performanceUpdatePayload, _ as performanceCreatePayload, $ as useParams, x as useNavigate, a0 as useIntern, a1 as useLogWhatsApp, a2 as useUpdateDocumentState, w as useDeleteIntern, H as ArrowLeft } from "./index-BMeK9e6q.js";
import { A as Activity } from "./activity-D5emh_j8.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { T as Trash2 } from "./trash-2-C-AHX60a.js";
import { T as TrendingUp } from "./trending-up-DC4rcLjM.js";
import { M as MessageCircle } from "./message-circle-BYDu4QJj.js";
import { M as MessageSquare } from "./message-square-CxfKCy3s.js";
import { u as useMeetingsForIntern, a as useScheduleMeeting } from "./use-meetings-DiE79CiM.js";
import { u as useTasksByIntern } from "./useWorkspace-Be9BQRA9.js";
import { u as useAllDailyNotes, a as useDailyNotes, b as useAddNoteComment } from "./useNotes-QdJJUnAk.js";
import { u as useSubmissions, G as GitBranch } from "./useSubmissions-Do5cVUgW.js";
import { C as ChartNoAxesColumn, R as ResponsiveContainer, A as AreaChart, a as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Area, L as LineChart, c as Legend, d as Line, B as BarChart, e as Bar } from "./AreaChart-D1et0pel.js";
import { S as Send } from "./send-DC3ZqQox.js";
import { D as Download } from "./download-DS5zENBd.js";
import { M as Mail } from "./mail-DSPkbPx0.js";
import { I as Input } from "./input-nhKD80eO.js";
import { L as Label } from "./label-D89oqzVf.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { C as CircleAlert } from "./circle-alert-OEcBqI8h.js";
import { P as Pencil } from "./pencil-BSgzfHm1.js";
import { A as Award } from "./award-BJ9ovl0U.js";
import { C as Card, a as CardContent } from "./card-BNUdlcux.js";
import { C as ChevronUp, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D791wupo.js";
import { C as ChevronDown } from "./chevron-down-DGBe83Kh.js";
import { V as Video, L as LayoutList } from "./video-m-e-Xlp4.js";
import { E as ExternalLink } from "./external-link-D5kebMHG.js";
import { S as Star } from "./star-DrtMCmTX.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Dz5BxwWS.js";
import { P as Progress } from "./progress-Btml2EVB.js";
import { C as CircleCheck } from "./circle-check-Cx8QEsVk.js";
import { C as Circle } from "./circle-BCf6w77C.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DTZQuM4G.js";
import { a as useActivities } from "./use-dashboard-CKbYYWER.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./index-NDr7xJHf.js";
import "./index-xhjDzk0w.js";
import "./check-Bu_kUyWO.js";
import "./index-w2GhN1KG.js";
var DocumentField = /* @__PURE__ */ ((DocumentField2) => {
  DocumentField2["offerLetterSent"] = "offerLetterSent";
  DocumentField2["offerLetterOpened"] = "offerLetterOpened";
  DocumentField2["certificateSent"] = "certificateSent";
  DocumentField2["certificateOpened"] = "certificateOpened";
  DocumentField2["completionLetterSent"] = "completionLetterSent";
  DocumentField2["completionLetterOpened"] = "completionLetterOpened";
  return DocumentField2;
})(DocumentField || {});
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
];
const FolderKanban = createLucideIcon("folder-kanban", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 5v11", key: "mdvv1e" }],
  ["path", { d: "M12 5v6", key: "14ar3b" }],
  ["path", { d: "M18 5v14", key: "7ji314" }]
];
const Kanban = createLucideIcon("kanban", __iconNode);
function formatRelative(date) {
  const now = /* @__PURE__ */ new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function actionIcon(action) {
  if (action.toLowerCase().includes("add") || action.toLowerCase().includes("creat"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" });
  if (action.toLowerCase().includes("delete") || action.toLowerCase().includes("remov"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" });
  if (action.toLowerCase().includes("perform"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" });
  if (action.toLowerCase().includes("document") || action.toLowerCase().includes("letter"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" });
  if (action.toLowerCase().includes("whatsapp"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" });
  if (action.toLowerCase().includes("update") || action.toLowerCase().includes("edit"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" });
}
function shortPrincipal(principal) {
  if (principal.length <= 12) return principal;
  return `${principal.slice(0, 5)}…${principal.slice(-5)}`;
}
function ActivityLog({ activities }) {
  const sorted = [...activities].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5",
      "data-ocid": "intern_detail.activity_log_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Activity Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "All tracked actions for this intern, newest first." }),
        sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 gap-3 text-center",
            "data-ocid": "intern_detail.activity_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-8 w-8 text-muted-foreground opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No activity recorded yet." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3.5 top-0 bottom-0 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: sorted.map((act, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex gap-4 pb-5 last:pb-0",
              "data-ocid": `intern_detail.activity_item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground z-10", children: actionIcon(act.action) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: act.details || act.action }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: formatRelative(act.timestamp) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "by ",
                    shortPrincipal(act.performedBy),
                    " ·",
                    " ",
                    act.timestamp.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  ] })
                ] })
              ]
            },
            act.id
          )) })
        ] })
      ]
    }
  );
}
function formatDate(date) {
  const d = date ? new Date(date) : /* @__PURE__ */ new Date();
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function buildOfferLetterHtml(intern) {
  const joiningDate = formatDate(intern.joiningDate);
  const today = formatDate(/* @__PURE__ */ new Date());
  const refId = `TM/OL/${(/* @__PURE__ */ new Date()).getFullYear()}/${intern.id.slice(-6).toUpperCase()}`;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Offer Letter - ${intern.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #f4f4f4; }
    .page { width: 794px; min-height: 1123px; margin: 0 auto; background: #fff; display: flex; flex-direction: column; }
    .header-bar { background: #1a1a1a; padding: 0 48px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
    .logo-section { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 38px; height: 38px; background: #e71514; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: #fff; }
    .logo-text-main { font-size: 16px; font-weight: 800; color: #fff; }
    .logo-text-sub { font-size: 9px; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
    .header-meta { font-size: 10px; color: #888; text-align: right; line-height: 1.7; }
    .red-stripe { height: 4px; background: #e71514; }
    .content { padding: 44px 56px; flex: 1; }
    .contact-row { display: flex; gap: 24px; margin-bottom: 36px; font-size: 11px; color: #666; align-items: center; }
    .contact-sep { color: #ddd; }
    .address-block { margin-bottom: 32px; }
    .address-block .company { font-size: 13px; font-weight: 700; color: #111; margin-bottom: 2px; }
    .address-block .city { font-size: 12px; color: #666; }
    .subject-line { font-size: 16px; font-weight: 700; color: #111; border-left: 4px solid #e71514; padding-left: 12px; margin-bottom: 8px; }
    .subject-underline { height: 1px; background: #e5e7eb; margin-bottom: 28px; }
    .salutation { font-size: 14px; color: #333; margin-bottom: 20px; font-weight: 500; }
    .body-text { font-size: 13.5px; line-height: 1.9; color: #444; }
    .body-text p { margin-bottom: 16px; }
    .details-box { background: #fafafa; border: 1px solid #e8e8e8; border-radius: 8px; margin: 24px 0; overflow: hidden; }
    .details-box-title { background: #1a1a1a; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 20px; }
    .details-table { width: 100%; border-collapse: collapse; }
    .details-table tr:nth-child(even) td { background: #f5f5f5; }
    .details-table td { padding: 10px 20px; font-size: 13px; border-bottom: 1px solid #efefef; color: #444; }
    .details-table td:first-child { font-weight: 600; color: #111; width: 40%; }
    .signature-section { margin-top: 44px; }
    .sig-line { width: 200px; height: 1px; background: #222; margin-bottom: 8px; margin-top: 36px; }
    .sig-name { font-size: 13px; font-weight: 700; color: #111; }
    .sig-title { font-size: 11px; color: #666; margin-top: 2px; }
    .footer-bar { background: #1a1a1a; height: 44px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; margin-top: auto; }
    .footer-brand { font-size: 11px; font-weight: 700; color: #fff; letter-spacing: 0.08em; text-transform: uppercase; }
    .footer-email { font-size: 10px; color: #e71514; }
    @media print { body { background: #fff; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
  </style>
</head>
<body>
<div class="page">
  <div class="header-bar">
    <div class="logo-section">
      <div class="logo-icon">T</div>
      <div>
        <div class="logo-text-main">TechMecha Torque</div>
        <div class="logo-text-sub">Pvt. Ltd.</div>
      </div>
    </div>
    <div class="header-meta"><div>Ref: ${refId}</div><div>Date: ${today}</div></div>
  </div>
  <div class="red-stripe"></div>
  <div class="content">
    <div class="contact-row">
      <span>+91-9876543210</span><span class="contact-sep">|</span>
      <span>team@techmechatorque.com</span><span class="contact-sep">|</span>
      <span>CIN: U74999AP2024PTC101234</span>
    </div>
    <div class="address-block">
      <div class="company">TechMecha Torque Pvt. Ltd.</div>
      <div class="city">Hyderabad, Telangana &mdash; 500001</div>
    </div>
    <div class="subject-line">Subject: Offer of Internship</div>
    <div class="subject-underline"></div>
    <div class="salutation">Dear ${intern.name},</div>
    <div class="body-text">
      <p>We are delighted to offer you an internship position as <strong>${intern.department}</strong> at <strong>TechMecha Torque Pvt. Ltd.</strong>, commencing from <strong>${joiningDate}</strong>. This internship will provide you valuable hands-on experience and contribute to your professional development.</p>
      <div class="details-box">
        <div class="details-box-title">Details of Internship</div>
        <table class="details-table">
          <tr><td>Intern Name</td><td>${intern.name}</td></tr>
          <tr><td>Role / Department</td><td>${intern.department}</td></tr>
          <tr><td>Space / Team</td><td>${intern.space}</td></tr>
          <tr><td>Start Date</td><td>${joiningDate}</td></tr>
          <tr><td>Duration</td><td>As per internship program</td></tr>
          <tr><td>Location</td><td>TechMecha Torque Pvt. Ltd., Hyderabad</td></tr>
        </table>
      </div>
      <p>We look forward to welcoming you to our team. Please confirm your acceptance by signing and returning this letter.</p>
      <p>Yours sincerely,</p>
    </div>
    <div class="signature-section">
      <div class="sig-line"></div>
      <div class="sig-name">JAYA CHANDRA REDDY CHILAKAMARRY</div>
      <div class="sig-title">Founder &amp; CEO &mdash; TechMecha Torque Pvt. Ltd.</div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="footer-brand">TECHMECHA TORQUE PVT. LTD.</span>
    <span class="footer-email">team@techmechatorque.com</span>
  </div>
</div>
</body></html>`;
}
function buildCertificateHtml(intern) {
  const today = formatDate(/* @__PURE__ */ new Date());
  const joiningDate = formatDate(intern.joiningDate);
  const endDate = intern.completionLetterSentAt ? formatDate(intern.completionLetterSentAt) : "Present";
  const certId = `TMT-${intern.name.split(" ").map((n) => n[0]).join("").toUpperCase()}-${intern.joiningDate.getFullYear()}`;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Certificate - ${intern.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #e8eef3; }
    .page { width: 794px; min-height: 1123px; margin: 0 auto; background: #fff; position: relative; overflow: hidden; display: flex; flex-direction: column; }
    .sidebar-left { position: absolute; left: 0; top: 0; width: 14px; height: 100%; background: #1a1a1a; }
    .sidebar-right { position: absolute; right: 0; top: 0; width: 14px; height: 100%; background: #1a1a1a; }
    .accent-left { position: absolute; left: 14px; top: 0; width: 4px; height: 100%; background: #e71514; }
    .accent-right { position: absolute; right: 14px; top: 0; width: 4px; height: 100%; background: #e71514; }
    .gold-top-bar { background: linear-gradient(90deg, #b8960c, #d4af37, #f5d97e, #d4af37, #b8960c); height: 10px; position: relative; z-index: 2; margin: 0 18px; }
    .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-20deg); font-size: 160px; font-weight: 900; color: rgba(0,0,0,0.04); letter-spacing: 0.1em; pointer-events: none; z-index: 0; white-space: nowrap; }
    .badge { position: absolute; top: 24px; right: 36px; width: 84px; height: 84px; z-index: 10; }
    .badge-outer { width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #f5d97e, #d4af37, #b8960c); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(184,150,12,0.4); }
    .badge-inner { width: 66px; height: 66px; border-radius: 50%; background: linear-gradient(135deg, #d4af37, #b8960c); border: 2px solid rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; }
    .badge-text { font-size: 10px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.3; }
    .badge-star { font-size: 18px; color: #fff; line-height: 1; }
    .main-content { position: relative; z-index: 1; padding: 18px 50px 36px; flex: 1; }
    .heading-block { text-align: center; margin-top: 18px; margin-bottom: 16px; }
    .cert-label { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #888; margin-bottom: 10px; }
    .cert-title { font-family: 'Playfair Display', Georgia, serif; font-size: 46px; font-weight: 700; color: #1a1a1a; line-height: 1; margin-bottom: 6px; }
    .cert-sub { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-style: italic; color: #555; margin-bottom: 14px; }
    .gold-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 14px; }
    .gold-line { height: 2px; width: 100px; background: linear-gradient(90deg, transparent, #d4af37, transparent); }
    .gold-diamond { font-size: 18px; color: #d4af37; }
    .org-row { text-align: center; margin-bottom: 28px; }
    .org-name { font-size: 13px; font-weight: 600; color: #888; letter-spacing: 0.05em; }
    .light-sep { height: 1px; background: #e8e8e8; margin: 0 0 24px; }
    .cert-body { text-align: center; padding: 0 32px; }
    .presented-to { font-size: 14px; color: #777; margin-bottom: 10px; }
    .intern-name { font-family: 'Playfair Display', Georgia, serif; font-size: 38px; font-weight: 700; font-style: italic; color: #e71514; margin-bottom: 6px; }
    .name-underline { width: 220px; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 0 auto 20px; }
    .cert-for { font-size: 14px; color: #444; line-height: 1.7; margin-bottom: 8px; }
    .tenure { font-size: 13px; color: #777; margin-bottom: 28px; }
    .space-badge { display: inline-block; background: #f5f5f5; border: 1px solid #ddd; border-radius: 20px; padding: 5px 18px; font-size: 12px; color: #666; margin-bottom: 32px; }
    .mid-sep { display: flex; align-items: center; gap: 12px; margin-bottom: 36px; }
    .mid-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #ddd, transparent); }
    .mid-icon { font-size: 14px; color: #d4af37; }
    .sig-section { display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; padding: 0 16px; }
    .sig-block { text-align: center; }
    .sig-line-el { height: 1px; width: 180px; background: #333; margin: 0 auto 8px; }
    .sig-name { font-size: 12px; font-weight: 700; color: #1a1a1a; }
    .sig-title { font-size: 11px; color: #777; margin-top: 2px; }
    .cert-id-block { border: 1.5px solid #d4af37; border-radius: 8px; padding: 10px 20px; text-align: center; background: #fffdf5; }
    .cert-id-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 4px; }
    .cert-id-value { font-size: 14px; font-weight: 700; color: #e71514; }
    .cert-id-date { font-size: 10px; color: #aaa; margin-top: 3px; }
    .footer-top-line { height: 3px; margin: 0 18px; background: linear-gradient(90deg, #b8960c, #d4af37, #f5d97e, #d4af37, #b8960c); }
    .footer-bar { background: #1a1a1a; height: 44px; display: flex; align-items: center; justify-content: space-between; padding: 0 36px; position: relative; z-index: 2; margin: 0 18px; }
    .footer-brand { font-size: 11px; font-weight: 700; color: #fff; letter-spacing: 0.1em; }
    .footer-contact { font-size: 10px; color: #e71514; }
    @media print { body { background: #fff; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
  </style>
</head>
<body>
<div class="page">
  <div class="sidebar-left"></div>
  <div class="sidebar-right"></div>
  <div class="accent-left"></div>
  <div class="accent-right"></div>
  <div class="watermark">TMT</div>
  <div class="badge"><div class="badge-outer"><div class="badge-inner"><div class="badge-star">&#9733;</div><div class="badge-text">BEST<br/>INTERN</div></div></div></div>
  <div class="gold-top-bar"></div>
  <div class="main-content">
    <div class="heading-block">
      <div class="cert-label">TechMecha Torque Pvt. Ltd.</div>
      <div class="cert-title">CERTIFICATE</div>
      <div class="cert-sub">of Recognisation</div>
      <div class="gold-divider"><div class="gold-line"></div><div class="gold-diamond">&#9670;</div><div class="gold-line"></div></div>
      <div class="org-row"><span class="org-name">Proudly presented by TechMecha Torque Pvt. Ltd.</span></div>
    </div>
    <div class="light-sep"></div>
    <div class="cert-body">
      <p class="presented-to">This certificate is proudly presented to</p>
      <div class="intern-name">${intern.name}</div>
      <div class="name-underline"></div>
      <p class="cert-for">For outstanding performance as <strong>${intern.department}</strong><br/>at TechMecha Torque Pvt. Ltd.</p>
      <p class="tenure">From <strong>${joiningDate}</strong> to <strong>${endDate}</strong></p>
      <div class="space-badge">Space: ${intern.space} &nbsp;|&nbsp; Level: ${intern.experienceLevel}</div>
      <div class="mid-sep"><div class="mid-line"></div><div class="mid-icon">&#9670;</div><div class="mid-line"></div></div>
    </div>
    <div class="sig-section">
      <div class="sig-block">
        <div class="sig-line-el"></div>
        <div class="sig-name">Jaya Chandra Reddy Chilakamarry</div>
        <div class="sig-title">Founder &amp; CEO</div>
        <div class="sig-title">TechMecha Torque Pvt. Ltd.</div>
      </div>
      <div class="cert-id-block">
        <div class="cert-id-label">Certificate ID</div>
        <div class="cert-id-value">${certId}</div>
        <div class="cert-id-date">Issued: ${today}</div>
      </div>
    </div>
  </div>
  <div class="footer-top-line"></div>
  <div class="footer-bar">
    <span class="footer-brand">TECHMECHA TORQUE PVT. LTD.</span>
    <span class="footer-contact">team@techmechatorque.com</span>
  </div>
</div>
</body></html>`;
}
function buildCompletionLetterHtml(intern) {
  const today = formatDate(/* @__PURE__ */ new Date());
  const joiningDate = formatDate(intern.joiningDate);
  const endDate = intern.completionLetterSentAt ? formatDate(intern.completionLetterSentAt) : today;
  const refId = `TM/CL/${(/* @__PURE__ */ new Date()).getFullYear()}/${intern.id.slice(-6).toUpperCase()}`;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Completion Letter - ${intern.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #f4f4f4; }
    .page { width: 794px; min-height: 1123px; margin: 0 auto; background: #fff; display: flex; flex-direction: column; }
    .header-bar { background: #1a1a1a; padding: 0 48px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
    .logo-section { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 38px; height: 38px; background: #e71514; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: #fff; }
    .logo-text-main { font-size: 16px; font-weight: 800; color: #fff; }
    .logo-text-sub { font-size: 9px; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
    .header-meta { font-size: 10px; color: #888; text-align: right; line-height: 1.7; }
    .red-stripe { height: 4px; background: #e71514; }
    .content { padding: 44px 56px; flex: 1; }
    .contact-row { display: flex; gap: 24px; margin-bottom: 36px; font-size: 11px; color: #666; align-items: center; }
    .contact-sep { color: #ddd; }
    .address-block { margin-bottom: 32px; }
    .address-block .company { font-size: 13px; font-weight: 700; color: #111; margin-bottom: 2px; }
    .address-block .city { font-size: 12px; color: #666; }
    .subject-line { font-size: 16px; font-weight: 700; color: #111; border-left: 4px solid #e71514; padding-left: 12px; margin-bottom: 8px; }
    .subject-underline { height: 1px; background: #e5e7eb; margin-bottom: 28px; }
    .salutation { font-size: 14px; color: #333; margin-bottom: 20px; font-weight: 500; }
    .body-text { font-size: 13.5px; line-height: 1.9; color: #444; }
    .body-text p { margin-bottom: 16px; }
    .highlight-box { background: #fef2f2; border: 1px solid #fca5a5; border-left: 4px solid #e71514; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 24px 0; }
    .highlight-box p { font-size: 13.5px; color: #333; line-height: 1.8; }
    .contrib-box { background: #f9fafb; border: 1px solid #e8e8e8; border-radius: 8px; margin: 20px 0; overflow: hidden; }
    .contrib-title { background: #1a1a1a; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 20px; }
    .contrib-list { list-style: none; padding: 12px 20px; }
    .contrib-list li { font-size: 13px; color: #444; padding: 7px 0 7px 22px; position: relative; border-bottom: 1px dashed #efefef; }
    .contrib-list li:last-child { border-bottom: none; }
    .contrib-bullet { position: absolute; left: 0; top: 8px; color: #e71514; font-size: 10px; }
    .signature-section { margin-top: 44px; }
    .sig-line { width: 200px; height: 1px; background: #222; margin-bottom: 8px; margin-top: 36px; }
    .sig-name { font-size: 13px; font-weight: 700; color: #111; }
    .sig-title { font-size: 11px; color: #666; margin-top: 2px; }
    .footer-bar { background: #1a1a1a; height: 44px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; margin-top: auto; }
    .footer-brand { font-size: 11px; font-weight: 700; color: #fff; letter-spacing: 0.08em; text-transform: uppercase; }
    .footer-email { font-size: 10px; color: #e71514; }
    @media print { body { background: #fff; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
  </style>
</head>
<body>
<div class="page">
  <div class="header-bar">
    <div class="logo-section">
      <div class="logo-icon">T</div>
      <div>
        <div class="logo-text-main">TechMecha Torque</div>
        <div class="logo-text-sub">Pvt. Ltd.</div>
      </div>
    </div>
    <div class="header-meta"><div>Ref: ${refId}</div><div>Date: ${today}</div></div>
  </div>
  <div class="red-stripe"></div>
  <div class="content">
    <div class="contact-row">
      <span>+91-9876543210</span><span class="contact-sep">|</span>
      <span>team@techmechatorque.com</span><span class="contact-sep">|</span>
      <span>CIN: U74999AP2024PTC101234</span>
    </div>
    <div class="address-block">
      <div class="company">TechMecha Torque Pvt. Ltd.</div>
      <div class="city">Hyderabad, Telangana &mdash; 500001</div>
    </div>
    <div class="subject-line">Subject: Internship Completion Letter</div>
    <div class="subject-underline"></div>
    <div class="salutation">Dear ${intern.name},</div>
    <div class="body-text">
      <p>This is to certify that <strong>${intern.name}</strong> has successfully completed their internship at <strong>TechMecha Torque Pvt. Ltd.</strong> in the capacity of <strong>${intern.department}</strong> from <strong>${joiningDate}</strong> to <strong>${endDate}</strong>.</p>
      <div class="highlight-box">
        <p>During the tenure, <strong>${intern.name}</strong> demonstrated exceptional dedication and contributed significantly to our organization.</p>
      </div>
      <div class="contrib-box">
        <div class="contrib-title">Key Contributions</div>
        <ul class="contrib-list">
          <li><span class="contrib-bullet">&#9679;</span>Demonstrated strong skills in <strong>${intern.department}</strong></li>
          <li><span class="contrib-bullet">&#9679;</span>Actively participated in team projects and deliverables</li>
          <li><span class="contrib-bullet">&#9679;</span>Showed initiative and professional growth throughout the program</li>
        </ul>
      </div>
      <p>We wish <strong>${intern.name}</strong> all the best in future endeavors.</p>
      <p>Yours sincerely,</p>
    </div>
    <div class="signature-section">
      <div class="sig-line"></div>
      <div class="sig-name">JAYA CHANDRA REDDY CHILAKAMARRY</div>
      <div class="sig-title">Founder &amp; CEO &mdash; TechMecha Torque Pvt. Ltd.</div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="footer-brand">TECHMECHA TORQUE PVT. LTD.</span>
    <span class="footer-email">team@techmechatorque.com</span>
  </div>
</div>
</body></html>`;
}
function downloadDocument(intern, docType) {
  let html;
  let filename;
  if (docType === "offer") {
    html = buildOfferLetterHtml(intern);
    filename = `Offer_Letter_${intern.name.replace(/\s+/g, "_")}.html`;
  } else if (docType === "certificate") {
    html = buildCertificateHtml(intern);
    filename = `Certificate_${intern.name.replace(/\s+/g, "_")}.html`;
  } else {
    html = buildCompletionLetterHtml(intern);
    filename = `Completion_Letter_${intern.name.replace(/\s+/g, "_")}.html`;
  }
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1e4);
}
const SAMPLE_CHANNELS = [
  { id: "1", name: "General", space: "Org" },
  { id: "2", name: "Marketing Team", space: "Marketing" },
  { id: "3", name: "Learning Hub", space: "Learning" }
];
const spaceColors$1 = {
  Org: "bg-red-500/20 text-red-400 border-red-500/30",
  Marketing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
function CommunicationTab({
  internId,
  internName
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "communication.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Communication Center" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
      { label: "Channel Memberships", value: 2 },
      { label: "Direct Messages", value: "—" },
      { label: "Mentions", value: "—" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Channel Memberships" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "gap-1.5 text-xs",
            "data-ocid": "communication.add_channel_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              " Add to Channel"
            ]
          }
        )
      ] }),
      SAMPLE_CHANNELS.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg",
          "data-ocid": `communication.channel.${ch.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: ch.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs border ${spaceColors$1[ch.space]}`, children: ch.space })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "ghost",
                className: "text-xs text-muted-foreground hover:text-red-400",
                "data-ocid": `communication.remove_channel.${ch.id}`,
                children: "Remove"
              }
            )
          ]
        },
        ch.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Direct Messages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Full messaging history is available in the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `/workspace/${internId}`,
            className: "text-primary hover:underline",
            "data-ocid": "communication.workspace_link",
            children: [
              internName,
              "'s Workspace"
            ]
          }
        ),
        "."
      ] })
    ] })
  ] });
}
function KpiCard({ label, value, icon, color = "text-primary" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${color} opacity-80`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
    ] })
  ] });
}
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function weeklyTaskData(tasks) {
  const now = /* @__PURE__ */ new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);
  return DAY_LABELS.map((day, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const count = tasks.filter((t) => {
      if (t.status !== "Completed") return false;
      const at = t.updatedAt ? new Date(t.updatedAt) : null;
      return at && at.toDateString() === d.toDateString();
    }).length;
    return { day, completed: count };
  });
}
function DashboardTab({
  intern,
  performances,
  compositeScore
}) {
  const { data: notes = [], isLoading: notesLoading } = useAllDailyNotes();
  const { data: meetings = [] } = useMeetingsForIntern(intern.id);
  const { data: submissions = [] } = useSubmissions(intern.id);
  const { data: allTasks = [] } = useTasksByIntern(intern.id);
  const internNotes = notes.filter((n) => n.internId === intern.id);
  const tasksAssigned = allTasks.length;
  const tasksCompleted = allTasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const tasksPending = allTasks.filter(
    (t) => t.status === "Pending" || t.status === "InProgress"
  ).length;
  const journalEntries = internNotes.length;
  const meetingsAttended = meetings.length;
  const docsCount = submissions.length;
  const avgPerf = performances.length > 0 ? Math.round(
    performances.reduce((s, p) => s + (p.overallScore || 0), 0) / performances.length * 20
  ) : (compositeScore == null ? void 0 : compositeScore.overallScore) ?? 0;
  const weekData = weeklyTaskData(
    allTasks
  );
  const isLoading = notesLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "dashboard.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Tasks Assigned",
          value: tasksAssigned,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Tasks Completed",
          value: tasksCompleted,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
          color: "text-emerald-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Pending Tasks",
          value: tasksPending,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-5 w-5" }),
          color: "text-amber-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Performance Score",
          value: `${avgPerf}/100`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
          color: "text-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Journal Entries",
          value: journalEntries,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          color: "text-blue-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Documents",
          value: docsCount,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          color: "text-purple-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Meetings",
          value: meetingsAttended,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
          color: "text-cyan-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Attendance %",
          value: `${Math.min(100, journalEntries * 5)}%`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
          color: "text-teal-400"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Weekly Productivity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AreaChart,
        {
          data: weekData,
          margin: { top: 5, right: 10, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "completedGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#e71514", stopOpacity: 0.3 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#e71514", stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "day",
                tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
                allowDecimals: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Area,
              {
                type: "monotone",
                dataKey: "completed",
                stroke: "#e71514",
                fill: "url(#completedGrad)",
                strokeWidth: 2
              }
            )
          ]
        }
      ) })
    ] }),
    performances.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Performance Trend" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AreaChart,
        {
          data: performances.map((p) => ({
            month: `${p.year}-${String(p.month).padStart(2, "0")}`,
            score: Math.round(p.overallScore * 20)
          })),
          margin: { top: 5, right: 10, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "hsl(var(--border))"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "month",
                tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                domain: [0, 100],
                tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Area,
              {
                type: "monotone",
                dataKey: "score",
                stroke: "#e71514",
                fill: "url(#completedGrad)",
                strokeWidth: 2
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function fmt$1(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function DocRow({
  label,
  subject,
  downloadType,
  sent,
  sentAt,
  opened,
  openedAt,
  sentField,
  openedField,
  onToggle,
  onCompose,
  onDownload
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 flex-wrap", children: [
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3 w-3" }),
          " Sent ",
          sentAt ? fmt$1(sentAt) : ""
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted text-muted-foreground border border-border text-xs", children: "Not Sent" }),
        opened ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
          " Opened ",
          openedAt ? fmt$1(openedAt) : ""
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border border-border text-xs gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
          " Not Opened"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "default",
          size: "sm",
          className: "gap-1.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground",
          onClick: () => onDownload(downloadType),
          "data-ocid": `intern_detail.download_${sentField}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            " Download"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5 text-xs",
          onClick: () => onCompose(subject),
          "data-ocid": `intern_detail.send_email_${sentField}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
            " Send Email"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 text-xs text-muted-foreground",
          onClick: () => onToggle(sentField, sent),
          "data-ocid": `intern_detail.toggle_sent_${sentField}`,
          children: sent ? "Mark Unsent" : "Mark Sent"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 text-xs text-muted-foreground",
          onClick: () => onToggle(openedField, opened),
          "data-ocid": `intern_detail.toggle_opened_${openedField}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
            " ",
            opened ? "Mark Unopened" : "Mark Opened"
          ]
        }
      )
    ] })
  ] });
}
function DocumentsTab({
  intern,
  onComposeEmail,
  onToggleDoc
}) {
  const docs = [
    {
      label: "Offer Letter",
      subject: "Offer Letter",
      downloadType: "offer",
      sent: intern.offerLetterSent,
      sentAt: intern.offerLetterSentAt,
      opened: intern.offerLetterOpened,
      openedAt: intern.offerLetterOpenedAt,
      sentField: DocumentField.offerLetterSent,
      openedField: DocumentField.offerLetterOpened
    },
    {
      label: "Certificate",
      subject: "Certificate",
      downloadType: "certificate",
      sent: intern.certificateSent,
      sentAt: intern.certificateSentAt,
      opened: intern.certificateOpened,
      openedAt: intern.certificateOpenedAt,
      sentField: DocumentField.certificateSent,
      openedField: DocumentField.certificateOpened
    },
    {
      label: "Completion Letter",
      subject: "Completion Letter",
      downloadType: "completion",
      sent: intern.completionLetterSent,
      sentAt: intern.completionLetterSentAt,
      opened: intern.completionLetterOpened,
      openedAt: intern.completionLetterOpenedAt,
      sentField: DocumentField.completionLetterSent,
      openedField: DocumentField.completionLetterOpened
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5",
      "data-ocid": "intern_detail.documents_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Document Tracking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Download, track sent and opened status for each document." }),
        docs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DocRow,
          {
            ...doc,
            onToggle: onToggleDoc,
            onCompose: onComposeEmail,
            onDownload: (type) => downloadDocument(intern, type)
          },
          doc.label
        ))
      ]
    }
  );
}
const TEMPLATE_BODIES = {
  "Offer Letter": "Dear {name},\n\nWe are pleased to extend this Offer Letter to you for your internship at TechMecha Torque Pvt. Ltd.\n\nKindly review the attached offer letter and confirm your acceptance at the earliest.\n\nLooking forward to having you on board!\n\nWarm regards,\nHR Team\nTechMecha Torque Pvt. Ltd.",
  Certificate: "Dear {name},\n\nCongratulations! Please find your Internship Certificate of Recognition attached.\n\nWe appreciate your hard work, dedication, and contributions during your time with us. It has been a pleasure having you as part of the TechMecha Torque team.\n\nWishing you all the very best in your future endeavors!\n\nWarm regards,\nHR Team\nTechMecha Torque Pvt. Ltd.",
  "Completion Letter": "Dear {name},\n\nPlease find your Internship Completion Letter attached.\n\nThis serves as an official confirmation that you have successfully completed your internship program at TechMecha Torque Pvt. Ltd. We are proud of your growth and contributions throughout the program.\n\nWe wish you great success in your career ahead!\n\nWarm regards,\nHR Team\nTechMecha Torque Pvt. Ltd.",
  Custom: ""
};
const TEMPLATE_SUBJECTS = {
  "Offer Letter": "Internship Offer Letter – TechMecha Torque Pvt. Ltd.",
  Certificate: "Certificate of Recognition – TechMecha Torque Pvt. Ltd.",
  "Completion Letter": "Internship Completion Letter – TechMecha Torque Pvt. Ltd.",
  Custom: ""
};
const TEMPLATES = [
  "Offer Letter",
  "Certificate",
  "Completion Letter",
  "Custom"
];
function EmailComposeModal({
  open,
  onOpenChange,
  internEmail,
  internName,
  defaultSubject = "Offer Letter",
  onEmailLogged
}) {
  const initialTemplate = TEMPLATES.includes(defaultSubject) ? defaultSubject : "Custom";
  const [activeTemplate, setActiveTemplate] = reactExports.useState(initialTemplate);
  const [to, setTo] = reactExports.useState(`${internName} <${internEmail}>`);
  const [cc, setCc] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState(
    TEMPLATE_SUBJECTS[initialTemplate] || (initialTemplate === "Custom" ? defaultSubject : "")
  );
  const [body, setBody] = reactExports.useState(
    TEMPLATE_BODIES[initialTemplate].replace(/\{name\}/g, internName)
  );
  const [isSending, setIsSending] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      const t = TEMPLATES.includes(defaultSubject) ? defaultSubject : "Custom";
      setActiveTemplate(t);
      setTo(`${internName} <${internEmail}>`);
      setCc("");
      setSubject(
        TEMPLATE_SUBJECTS[t] || (t === "Custom" ? defaultSubject : "")
      );
      setBody(TEMPLATE_BODIES[t].replace(/\{name\}/g, internName));
    }
  }, [open, defaultSubject, internEmail, internName]);
  const applyTemplate = (t) => {
    setActiveTemplate(t);
    setSubject(
      TEMPLATE_SUBJECTS[t] || (t === "Custom" ? "" : TEMPLATE_SUBJECTS[t])
    );
    setBody(TEMPLATE_BODIES[t].replace(/\{name\}/g, internName));
  };
  const handleSend = () => {
    if (!to.trim()) {
      ue.error("Recipient is required");
      return;
    }
    if (!subject.trim()) {
      ue.error("Subject is required");
      return;
    }
    if (!body.trim()) {
      ue.error("Message body is required");
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      const entry = {
        id: `email-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        to: to.trim(),
        cc: cc.trim(),
        subject: subject.trim(),
        body: body.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        templateType: activeTemplate === "Custom" ? null : activeTemplate
      };
      onEmailLogged == null ? void 0 : onEmailLogged(entry);
      ue.success("Email logged successfully", {
        description: `"${subject}" has been recorded in the email history.`
      });
      setIsSending(false);
      onOpenChange(false);
    }, 400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-xl w-full",
      "data-ocid": "intern_detail.email_compose_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-primary" }),
          " Compose Email"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2.5 text-xs text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Email will be ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "logged" }),
            " — real delivery requires the email service to be enabled."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Quick Template" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => applyTemplate(t),
                className: `px-3 py-1 rounded-full text-xs font-medium border transition-colors ${activeTemplate === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
                "data-ocid": `intern_detail.email_template_${t.toLowerCase().replace(/ /g, "_")}`,
                children: t
              },
              t
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "email-to",
                className: "text-xs text-muted-foreground uppercase tracking-wide",
                children: "To"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email-to",
                value: to,
                onChange: (e) => setTo(e.target.value),
                className: "bg-muted border-border text-sm",
                placeholder: "Recipient email",
                "data-ocid": "intern_detail.email_to_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "email-cc",
                className: "text-xs text-muted-foreground uppercase tracking-wide",
                children: [
                  "CC",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "normal-case text-muted-foreground/60 font-normal", children: "(optional)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email-cc",
                value: cc,
                onChange: (e) => setCc(e.target.value),
                className: "bg-muted border-border text-sm",
                placeholder: "cc@example.com",
                "data-ocid": "intern_detail.email_cc_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "email-subject",
                className: "text-xs text-muted-foreground uppercase tracking-wide",
                children: "Subject"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email-subject",
                value: subject,
                onChange: (e) => {
                  setSubject(e.target.value);
                  setActiveTemplate("Custom");
                },
                className: "bg-muted border-border text-sm",
                placeholder: "Email subject",
                "data-ocid": "intern_detail.email_subject_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "email-body",
                className: "text-xs text-muted-foreground uppercase tracking-wide",
                children: "Message"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "email-body",
                value: body,
                onChange: (e) => setBody(e.target.value),
                rows: 8,
                className: "bg-muted border-border resize-none text-sm font-mono leading-relaxed",
                placeholder: "Write your message…",
                "data-ocid": "intern_detail.email_body_textarea"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => onOpenChange(false),
              disabled: isSending,
              "data-ocid": "intern_detail.email_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: handleSend,
              disabled: isSending,
              className: "bg-primary hover:bg-primary/90 gap-1.5",
              "data-ocid": "intern_detail.email_send_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                isSending ? "Logging…" : "Send & Log Email"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
const statusColors$2 = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-muted text-muted-foreground border-border",
  OnHold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "On Leave": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Probation: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Terminated: "bg-red-500/20 text-red-400 border-red-500/30"
};
const spaceColors = {
  Org: "bg-red-500/20 text-red-400 border-red-500/30",
  Marketing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
function calcCompletionPct(intern) {
  if (!intern.startDate || !intern.expectedEndDate) return 0;
  const start = new Date(intern.startDate).getTime();
  const end = new Date(intern.expectedEndDate).getTime();
  const now = Date.now();
  if (end <= start) return 0;
  return Math.min(
    100,
    Math.max(0, Math.round((now - start) / (end - start) * 100))
  );
}
function InternAvatar({ intern }) {
  if (intern.profilePicCid) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: `https://assets.caffeine.ai/cdn/${intern.profilePicCid}`,
        alt: intern.name,
        className: "h-20 w-20 rounded-full object-cover ring-2 ring-border flex-shrink-0"
      }
    );
  }
  const initials = intern.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const hue = intern.name.charCodeAt(0) % 360;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ring-2 ring-border flex-shrink-0",
      style: { background: `hsl(${hue}, 50%, 30%)` },
      children: initials
    }
  );
}
function EnhancedHeroCard({
  intern,
  performances,
  compositeScore,
  onWhatsApp,
  onEmail,
  onEdit,
  isWhatsAppPending,
  onGenerateCertificate,
  onGenerateOfferLetter,
  onGenerateCompletionLetter,
  onAssignTask
}) {
  const completionPct = calcCompletionPct(intern);
  const avgPerf = (compositeScore == null ? void 0 : compositeScore.overallScore) ?? (performances.length > 0 ? Math.round(
    performances.reduce((s, p) => s + p.overallScore, 0) / performances.length * 20
  ) : 0);
  const scoreColor = avgPerf >= 80 ? "text-emerald-400" : avgPerf >= 60 ? "text-yellow-400" : "text-red-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InternAvatar, { intern }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground leading-tight", children: intern.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs border ${spaceColors[intern.space]}`, children: intern.space }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs border ${statusColors$2[String(intern.status)]}`,
              children: String(intern.status)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0.5 text-xs text-muted-foreground", children: [
          intern.department && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Dept:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: intern.department })
          ] }),
          intern.internshipType && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Type:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: intern.internshipType })
          ] }),
          intern.startDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Start:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: intern.startDate })
          ] }),
          intern.expectedEndDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "End:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: intern.expectedEndDate })
          ] }),
          intern.domain && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Domain: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: intern.domain })
          ] }),
          intern.mentorAssigned && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Mentor:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: intern.mentorAssigned })
          ] })
        ] }),
        completionPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Internship Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              completionPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all",
              style: { width: `${completionPct}%` }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-end gap-2", children: avgPerf > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Performance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-2xl font-bold ${scoreColor}`, children: [
          avgPerf,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/100" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5 border-emerald-600/40 text-emerald-400 hover:bg-emerald-500/10",
          onClick: onWhatsApp,
          disabled: isWhatsAppPending,
          "data-ocid": "intern_detail.whatsapp_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
            " WhatsApp"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: () => onEmail("Offer Letter"),
          "data-ocid": "intern_detail.email_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
            " Email"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: onEdit,
          "data-ocid": "intern_detail.edit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit"
          ]
        }
      ),
      onAssignTask && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: onAssignTask,
          "data-ocid": "intern_detail.assign_task_button",
          children: "Assign Task"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: onGenerateOfferLetter,
          "data-ocid": "intern_detail.gen_offer_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
            " Offer Letter"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: onGenerateCertificate,
          "data-ocid": "intern_detail.gen_cert_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
            " Certificate"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: onGenerateCompletionLetter,
          "data-ocid": "intern_detail.gen_completion_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
            " Completion Letter"
          ]
        }
      )
    ] })
  ] });
}
const FILTER_OPTIONS = ["This Week", "This Month", "All"];
function isThisWeek(dateStr) {
  const d = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  return d >= weekStart && d <= now;
}
function isThisMonth(dateStr) {
  const d = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
function NoteCard({
  note,
  internId: _internId
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [commentText, setCommentText] = reactExports.useState("");
  const addComment = useAddNoteComment();
  const handleComment = (status) => {
    if (!commentText.trim()) return;
    addComment.mutate(
      { noteId: note.id, content: commentText.trim(), status },
      {
        onSuccess: () => setCommentText("")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "bg-card border border-border",
      "data-ocid": `journal.note.${note.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: note.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((e) => !e),
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": expanded ? "Collapse" : "Expand",
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: note.workedOn }),
        note.blockers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-400 mb-0.5", children: "Blockers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-300", children: note.blockers })
        ] }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
          note.progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: note.progress })
          ] }),
          note.learningUpdates && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Learning Updates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: note.learningUpdates })
          ] }),
          note.adminComments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wider", children: "Admin Comments" }),
            note.adminComments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: c.authorName }),
                c.status && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${c.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`,
                    children: c.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.content })
            ] }, c.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Add Comment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none h-16 focus:outline-none focus:ring-1 focus:ring-primary",
                value: commentText,
                onChange: (e) => setCommentText(e.target.value),
                placeholder: "Write a comment...",
                "data-ocid": `journal.comment_input.${note.id}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs",
                  onClick: () => handleComment("approved"),
                  disabled: addComment.isPending,
                  "data-ocid": `journal.approve_button.${note.id}`,
                  children: "Approve"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs",
                  onClick: () => handleComment("needs_clarification"),
                  disabled: addComment.isPending,
                  "data-ocid": `journal.clarify_button.${note.id}`,
                  children: "Request Clarification"
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function JournalTab({ internId }) {
  const { data: notes = [], isLoading } = useDailyNotes(internId);
  const [filter, setFilter] = reactExports.useState("All");
  const filtered = notes.filter((n) => {
    if (filter === "This Week") return isThisWeek(n.date);
    if (filter === "This Month") return isThisMonth(n.date);
    return true;
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "journal.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Daily Work Journal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border text-xs", children: [
          notes.length,
          " entries"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilter(opt),
          "data-ocid": `journal.filter.${opt.toLowerCase().replace(/ /g, "_")}`,
          className: `px-3 py-1 text-xs rounded-full transition-colors ${filter === opt ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
          children: opt
        },
        opt
      )) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-3 text-center",
        "data-ocid": "journal.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No journal entries yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Journal entries will appear here once the intern submits daily updates." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCard, { note, internId }, note.id)) })
  ] });
}
const meetingTypeColors = {
  mentor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  standup: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  review: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  training: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
const attendanceColors = {
  scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  attended: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  absent: "bg-red-500/20 text-red-400 border-red-500/30"
};
function MeetingCard({ meeting }) {
  const scheduledMs = Number(meeting.scheduledAt) / 1e6;
  const isPast = scheduledMs < Date.now();
  const dateStr = new Date(scheduledMs).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
  const durationMins = Number(meeting.durationMinutes);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-2",
      "data-ocid": `meetings.card.${meeting.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: meeting.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              " ",
              dateStr
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs border ${meetingTypeColors[meeting.meetingType] ?? "bg-muted text-muted-foreground border-border"}`,
                children: meeting.meetingType
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs border ${attendanceColors[isPast ? "attended" : "scheduled"]}`,
                children: isPast ? "attended" : "scheduled"
              }
            )
          ] })
        ] }),
        durationMins > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Duration: ",
          durationMins,
          " min"
        ] }),
        meeting.joinLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: meeting.joinLink,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-1.5 text-xs text-primary hover:underline",
            "data-ocid": `meetings.join_link.${meeting.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
              " Join Meeting"
            ]
          }
        )
      ]
    }
  );
}
function ScheduleMeetingModal({
  internId,
  onClose
}) {
  const schedule = useScheduleMeeting();
  const [form, setForm] = reactExports.useState({
    title: "",
    scheduledAt: "",
    durationMinutes: BigInt(30),
    meetingType: "mentor",
    joinLink: "",
    participantIds: [internId]
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      scheduledAt: BigInt(new Date(form.scheduledAt).getTime()) * BigInt(1e6),
      durationMinutes: form.durationMinutes,
      meetingType: form.meetingType,
      joinLink: form.joinLink || void 0,
      participantIds: form.participantIds
    };
    schedule.mutate(payload, { onSuccess: onClose });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-4",
      "data-ocid": "meetings.schedule_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Schedule Meeting" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              placeholder: "Meeting Title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              required: true,
              "data-ocid": "meetings.title_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              value: form.scheduledAt,
              onChange: (e) => setForm((f) => ({ ...f, scheduledAt: e.target.value })),
              required: true,
              "data-ocid": "meetings.date_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              value: form.meetingType,
              onChange: (e) => setForm((f) => ({ ...f, meetingType: e.target.value })),
              "data-ocid": "meetings.type_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mentor", children: "Mentor Meeting" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "standup", children: "Standup" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "review", children: "Review" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "training", children: "Training" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              placeholder: "Join Link (optional)",
              value: form.joinLink,
              onChange: (e) => setForm((f) => ({ ...f, joinLink: e.target.value })),
              "data-ocid": "meetings.link_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "sm",
                disabled: schedule.isPending,
                "data-ocid": "meetings.submit_button",
                children: "Schedule"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "meetings.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function MeetingsTab({
  internId,
  isAdmin
}) {
  const { data: meetings = [], isLoading } = useMeetingsForIntern(internId);
  const [scheduleOpen, setScheduleOpen] = reactExports.useState(false);
  const now = Date.now();
  const upcoming = meetings.filter(
    (m) => Number(m.scheduledAt) / 1e6 >= now
  );
  const past = meetings.filter((m) => Number(m.scheduledAt) / 1e6 < now);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "meetings.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Meetings & Sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border text-xs", children: [
          meetings.length,
          " total"
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "gap-1.5",
          onClick: () => setScheduleOpen(true),
          "data-ocid": "meetings.schedule_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Schedule Meeting"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: [
        "Upcoming (",
        upcoming.length,
        ")"
      ] }),
      upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-muted/30 border border-border rounded-xl p-6 text-center text-sm text-muted-foreground",
          "data-ocid": "meetings.upcoming_empty_state",
          children: "No upcoming meetings scheduled."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: upcoming.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingCard, { meeting: m }, m.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: [
        "Past (",
        past.length,
        ")"
      ] }),
      past.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-muted/30 border border-border rounded-xl p-6 text-center text-sm text-muted-foreground",
          "data-ocid": "meetings.past_empty_state",
          children: "No past meetings on record."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: past.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingCard, { meeting: m }, m.id)) })
    ] }),
    scheduleOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScheduleMeetingModal,
      {
        internId,
        onClose: () => setScheduleOpen(false)
      }
    )
  ] });
}
function fmt(date) {
  if (!date) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function FieldRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-0.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-words", children: value || "—" })
  ] });
}
function OverviewTab({ intern }) {
  const fields = [
    ["Full Name", intern.name],
    ["Email Address", intern.email],
    ["Phone", intern.phone],
    ["Space", intern.space],
    ["Status", intern.status],
    ["Experience Level", intern.experienceLevel],
    ["Department", intern.department],
    ["Joining Date", fmt(intern.joiningDate)],
    ["Last Contacted", fmt(intern.lastContactedAt)],
    ["Last WhatsApp", fmt(intern.lastWhatsAppedAt)],
    ["Created At", fmt(intern.createdAt)],
    ["Last Updated", fmt(intern.updatedAt)]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-5",
      "data-ocid": "intern_detail.overview_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: fields.map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRow, { label, value }, label)) }),
        intern.adminNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Admin Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap", children: intern.adminNotes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns/$id/edit", params: { id: intern.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            "data-ocid": "intern_detail.overview_edit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
              " Edit Intern"
            ]
          }
        ) }) })
      ]
    }
  );
}
function convertScore(raw) {
  return {
    internId: raw.internId,
    overallScore: raw.overallScore,
    breakdown: raw.breakdown,
    improvementSuggestions: raw.improvementSuggestions,
    computedAt: Number(raw.computedAt) / 1e6
  };
}
function useCompositeScore(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["compositeScore", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return null;
      try {
        const raw = await actor.getCompositeScore(
          sessionToken,
          internId
        );
        if (!raw) return null;
        if (Array.isArray(raw)) {
          if (raw.length === 0) return null;
          return convertScore(raw[0]);
        }
        return convertScore(raw);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId
  });
}
function useComputeCompositeScore() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (internId) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.computeCompositeScore(sessionToken, internId);
      return convertScore(result);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["compositeScore", data.internId] });
      ue.success("Performance score recomputed");
    },
    onError: (e) => ue.error(e.message || "Failed to compute score")
  });
}
const DIMENSION_COLORS = {
  productivity: "#e71514",
  communication: "#3b82f6",
  learning: "#8b5cf6",
  attendance: "#10b981"
};
function ScoreMeter({
  value,
  label,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
        value,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full transition-all",
        style: { width: `${value}%`, background: color }
      }
    ) })
  ] });
}
function PerformanceCenterTab({
  internId,
  performances,
  compositeScore,
  isLoading
}) {
  var _a, _b, _c;
  const compute = useComputeCompositeScore();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, i)) });
  }
  const overall = (compositeScore == null ? void 0 : compositeScore.overallScore) ?? (performances.length > 0 ? Math.round(
    performances.reduce((s, p) => s + p.overallScore, 0) / performances.length * 20
  ) : 0);
  const breakdown = (compositeScore == null ? void 0 : compositeScore.breakdown) ?? {
    productivity: Math.round(
      (((_a = performances[performances.length - 1]) == null ? void 0 : _a.taskScore) ?? 3) * 20
    ),
    communication: Math.round(
      (((_b = performances[performances.length - 1]) == null ? void 0 : _b.communicationScore) ?? 3) * 20
    ),
    learning: 60,
    attendance: Math.round(
      (((_c = performances[performances.length - 1]) == null ? void 0 : _c.attendanceScore) ?? 3) * 20
    )
  };
  const suggestions = (compositeScore == null ? void 0 : compositeScore.improvementSuggestions) ?? [
    ...breakdown.productivity < 60 ? ["Improve task completion rate and meet deadlines consistently"] : [],
    ...breakdown.communication < 60 ? ["Submit daily notes more regularly and attend standups"] : [],
    ...breakdown.attendance < 60 ? ["Increase active days; aim for 5 days/week activity"] : [],
    ...overall >= 80 ? ["Excellent performance — consider for PPO recommendation"] : []
  ];
  const trendData = performances.map((p) => ({
    period: `${p.year}-${String(p.month).padStart(2, "0")}`,
    Tasks: Math.round(p.taskScore * 20),
    Communication: Math.round(p.communicationScore * 20),
    Attendance: Math.round(p.attendanceScore * 20),
    Initiative: Math.round(p.initiativeScore * 20)
  }));
  const overallColor = overall >= 80 ? "text-emerald-400" : overall >= 60 ? "text-yellow-400" : "text-red-400";
  const overallBg = overall >= 80 ? "bg-emerald-500/10 border-emerald-500/30" : overall >= 60 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-red-500/10 border-red-500/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "perf_center.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `border rounded-xl p-5 ${overallBg} flex items-center justify-between gap-4`,
        "data-ocid": "perf_center.score_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Overall Performance Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-5xl font-bold mt-1 ${overallColor}`, children: [
              overall,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-normal text-muted-foreground", children: "/100" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${overallBg} border text-xs`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 mr-1" }),
              overall >= 80 ? "Excellent" : overall >= 60 ? "Good" : "Needs Improvement"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "gap-1.5 text-xs",
                onClick: () => compute.mutate(internId),
                disabled: compute.isPending,
                "data-ocid": "perf_center.recompute_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `h-3 w-3 ${compute.isPending ? "animate-spin" : ""}`
                    }
                  ),
                  "Recompute"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Score Breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScoreMeter,
        {
          value: breakdown.productivity,
          label: "Productivity",
          color: DIMENSION_COLORS.productivity
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScoreMeter,
        {
          value: breakdown.communication,
          label: "Communication",
          color: DIMENSION_COLORS.communication
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScoreMeter,
        {
          value: breakdown.learning,
          label: "Learning",
          color: DIMENSION_COLORS.learning
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScoreMeter,
        {
          value: breakdown.attendance,
          label: "Attendance",
          color: DIMENSION_COLORS.attendance
        }
      )
    ] }),
    trendData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Monthly Score Trends" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        LineChart,
        {
          data: trendData,
          margin: { top: 5, right: 10, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "hsl(var(--border))"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "period",
                tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                domain: [0, 100],
                tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
            Object.entries(DIMENSION_COLORS).map(([key, color]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: key.charAt(0).toUpperCase() + key.slice(1),
                stroke: color,
                strokeWidth: 2,
                dot: { r: 3 }
              },
              key
            ))
          ]
        }
      ) })
    ] }),
    trendData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Dimension Performance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: trendData.slice(-4),
          margin: { top: 5, right: 10, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "hsl(var(--border))"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "period",
                tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                domain: [0, 100],
                tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "Tasks",
                fill: DIMENSION_COLORS.productivity,
                radius: [2, 2, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "Communication",
                fill: DIMENSION_COLORS.communication,
                radius: [2, 2, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "Attendance",
                fill: DIMENSION_COLORS.attendance,
                radius: [2, 2, 0, 0]
              }
            )
          ]
        }
      ) })
    ] }),
    suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }),
        " Improvement Suggestions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: suggestions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start gap-2 text-sm text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "→" }),
            " ",
            s
          ]
        },
        String(i)
      )) })
    ] })
  ] });
}
function usePerformances(internId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["performances", internId],
    queryFn: async () => {
      if (!actor || !internId) return [];
      const results = await actor.listPerformances(internId);
      return results.map(convertPerformance);
    },
    enabled: !!actor && !isFetching && !!internId
  });
}
function useAddPerformance() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.addPerformance(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertPerformance(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["performances", data.internId] });
      ue.success("Performance record added");
    },
    onError: (e) => ue.error(e.message || "Failed to add performance record")
  });
}
function useUpdatePerformance() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updatePerformance(sessionToken, id, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertPerformance(result.ok);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["performances", data.internId] });
      ue.success("Performance record updated");
    },
    onError: (e) => ue.error(e.message || "Failed to update performance record")
  });
}
function useDeletePerformance() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, internId }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.deletePerformance(sessionToken, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return { id, internId };
    },
    onSuccess: ({ internId }) => {
      qc.invalidateQueries({ queryKey: ["performances", internId] });
      ue.success("Performance record deleted");
    },
    onError: (e) => ue.error(e.message || "Failed to delete performance record")
  });
}
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const SCORE_COLORS = {
  task: "#e71514",
  attendance: "#3b82f6",
  communication: "#22c55e",
  initiative: "#f97316"
};
const defaultForm = () => ({
  month: (/* @__PURE__ */ new Date()).getMonth() + 1,
  year: (/* @__PURE__ */ new Date()).getFullYear(),
  taskScore: 3,
  attendanceScore: 3,
  communicationScore: 3,
  initiativeScore: 3,
  overallScore: 3,
  adminNotes: ""
});
function autoOverall(f) {
  return +((f.taskScore + f.attendanceScore + f.communicationScore + f.initiativeScore) / 4).toFixed(2);
}
function ScoreInput({
  label,
  name,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 5,
          step: 0.5,
          value,
          onChange: (e) => onChange(Number(e.target.value)),
          className: "flex-1 accent-primary",
          "data-ocid": `perf_modal.${name}_slider`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground w-8 text-right", children: value })
    ] })
  ] });
}
function AddEditModal({
  open,
  onOpenChange,
  internId,
  initial,
  editId,
  onAdd,
  onUpdate,
  isPending
}) {
  const [form, setForm] = reactExports.useState(() => ({
    ...defaultForm(),
    ...initial
  }));
  const set = (k, v) => {
    setForm((prev) => {
      const next = { ...prev, [k]: v };
      if (k !== "overallScore") next.overallScore = autoOverall(next);
      return next;
    });
  };
  const handleSubmit = () => {
    if (editId) {
      onUpdate(editId, performanceUpdatePayload(form));
    } else {
      onAdd(performanceCreatePayload({ ...form, internId }));
    }
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-md",
      "data-ocid": "perf_modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editId ? "Edit Performance" : "Add Performance Record" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: String(form.month),
                  onValueChange: (v) => set("month", Number(v)),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "bg-muted border-border",
                        "data-ocid": "perf_modal.month_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border max-h-60 overflow-y-auto", children: MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(i + 1), children: m }, m)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: form.year,
                  onChange: (e) => set("year", Number(e.target.value)),
                  className: "bg-muted border-border",
                  "data-ocid": "perf_modal.year_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreInput,
            {
              label: "Task Score",
              name: "task",
              value: form.taskScore,
              onChange: (v) => set("taskScore", v)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreInput,
            {
              label: "Attendance Score",
              name: "attendance",
              value: form.attendanceScore,
              onChange: (v) => set("attendanceScore", v)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreInput,
            {
              label: "Communication Score",
              name: "communication",
              value: form.communicationScore,
              onChange: (v) => set("communicationScore", v)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreInput,
            {
              label: "Initiative Score",
              name: "initiative",
              value: form.initiativeScore,
              onChange: (v) => set("initiativeScore", v)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-muted px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Overall Score (auto)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-primary", children: form.overallScore })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Admin Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: form.adminNotes,
                onChange: (e) => set("adminNotes", e.target.value),
                rows: 3,
                className: "bg-muted border-border resize-none text-sm",
                placeholder: "Optional notes…",
                "data-ocid": "perf_modal.notes_textarea"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => onOpenChange(false),
              "data-ocid": "perf_modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSubmit,
              disabled: isPending,
              className: "bg-primary hover:bg-primary/90",
              "data-ocid": "perf_modal.submit_button",
              children: editId ? "Update" : "Add Record"
            }
          )
        ] })
      ]
    }
  ) });
}
function PerformanceTab({
  internId,
  performances,
  onAdd,
  onUpdate,
  onDelete,
  isAddPending
}) {
  const updatePerformance = useUpdatePerformance();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editRecord, setEditRecord] = reactExports.useState(null);
  const sorted = [...performances].sort(
    (a, b) => a.year !== b.year ? a.year - b.year : a.month - b.month
  );
  const last6 = sorted.slice(-6);
  const chartData = last6.map((p) => ({
    name: `${MONTHS[p.month - 1].slice(0, 3)} ${p.year}`,
    task: p.taskScore,
    attendance: p.attendanceScore,
    communication: p.communicationScore,
    initiative: p.initiativeScore
  }));
  const openAdd = () => {
    setEditRecord(null);
    setModalOpen(true);
  };
  const openEdit = (p) => {
    setEditRecord(p);
    setModalOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "intern_detail.performance_panel", children: [
    chartData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Score Trends (Last 6 Months)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        LineChart,
        {
          data: chartData,
          margin: { top: 4, right: 8, bottom: 4, left: -20 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "rgba(255,255,255,0.07)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11, fill: "#a1a1aa" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [0, 5], tick: { fontSize: 11, fill: "#a1a1aa" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "#111111",
                  border: "1px solid #1f1f1f",
                  borderRadius: "8px",
                  fontSize: 12
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Legend,
              {
                iconType: "circle",
                iconSize: 8,
                wrapperStyle: { fontSize: 12, paddingTop: 8 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "task",
                stroke: SCORE_COLORS.task,
                strokeWidth: 2,
                dot: { r: 3 },
                name: "Task"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "attendance",
                stroke: SCORE_COLORS.attendance,
                strokeWidth: 2,
                dot: { r: 3 },
                name: "Attendance"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "communication",
                stroke: SCORE_COLORS.communication,
                strokeWidth: 2,
                dot: { r: 3 },
                name: "Communication"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "initiative",
                stroke: SCORE_COLORS.initiative,
                strokeWidth: 2,
                dot: { r: 3 },
                name: "Initiative"
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Performance Records" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            performances.length,
            " record",
            performances.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "gap-1.5 bg-primary hover:bg-primary/90",
            onClick: openAdd,
            "data-ocid": "intern_detail.add_performance_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Add Record"
            ]
          }
        )
      ] }),
      sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-10",
          "data-ocid": "intern_detail.performance_empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No performance records yet. Add the first one." })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-left", children: [
          "Period",
          "Task",
          "Attend.",
          "Comm.",
          "Init.",
          "Overall",
          "Notes",
          ""
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "pb-2 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wide last:pr-0",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors",
            "data-ocid": `intern_detail.performance_row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 pr-4 font-medium", children: [
                MONTHS[p.month - 1].slice(0, 3),
                " ",
                p.year
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: p.taskScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: p.attendanceScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: p.communicationScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: p.initiativeScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: p.overallScore.toFixed(1) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 max-w-[120px] truncate text-muted-foreground text-xs", children: p.adminNotes || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7 hover:text-primary",
                    onClick: () => openEdit(p),
                    "data-ocid": `intern_detail.edit_performance_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 hover:text-destructive",
                      "data-ocid": `intern_detail.delete_performance_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "intern_detail.delete_perf_dialog", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Record" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        "Delete performance record for",
                        " ",
                        MONTHS[p.month - 1],
                        " ",
                        p.year,
                        "?"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "intern_detail.delete_perf_cancel", children: "Cancel" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogAction,
                        {
                          onClick: () => onDelete(p.id),
                          className: "bg-destructive hover:bg-destructive/90",
                          "data-ocid": "intern_detail.delete_perf_confirm",
                          children: "Delete"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) })
            ]
          },
          p.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddEditModal,
      {
        open: modalOpen,
        onOpenChange: setModalOpen,
        internId,
        editId: editRecord == null ? void 0 : editRecord.id,
        initial: editRecord ? {
          month: editRecord.month,
          year: editRecord.year,
          taskScore: editRecord.taskScore,
          attendanceScore: editRecord.attendanceScore,
          communicationScore: editRecord.communicationScore,
          initiativeScore: editRecord.initiativeScore,
          overallScore: editRecord.overallScore,
          adminNotes: editRecord.adminNotes
        } : void 0,
        onAdd,
        onUpdate,
        isPending: isAddPending || updatePerformance.isPending
      }
    )
  ] });
}
function convertMilestone(raw) {
  const toOpt = (v) => {
    if (!v) return void 0;
    if (Array.isArray(v))
      return v.length > 0 ? Number(v[0]) / 1e6 : void 0;
    if (typeof v === "bigint") return Number(v) / 1e6;
    return void 0;
  };
  return {
    id: raw.id,
    name: raw.name,
    status: raw.status,
    completedAt: toOpt(raw.completedAt)
  };
}
function convertProject(raw) {
  return {
    id: raw.id,
    internId: raw.internId,
    projectName: raw.projectName,
    role: raw.role,
    startDate: raw.startDate,
    status: raw.status,
    completionPercent: raw.completionPercent,
    milestones: raw.milestones.map(convertMilestone),
    deliverables: raw.deliverables
  };
}
function useProjectParticipations(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["projects", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return [];
      try {
        const results = await actor.getProjectsByIntern(sessionToken, internId);
        return results.map(convertProject);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId
  });
}
function useCreateProjectParticipation() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.createProjectParticipation(
        sessionToken,
        payload.internId,
        payload.projectName,
        payload.role,
        payload.startDate
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["projects", internId] });
      ue.success("Project participation added");
    },
    onError: (e) => ue.error(e.message || "Failed to add project")
  });
}
function useUpdateMilestone() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      milestoneId,
      status,
      internId
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updateMilestone(
        sessionToken,
        projectId,
        milestoneId,
        status
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return { internId };
    },
    onSuccess: (_, { internId }) => {
      qc.invalidateQueries({ queryKey: ["projects", internId] });
      ue.success("Milestone updated");
    },
    onError: (e) => ue.error(e.message || "Failed to update milestone")
  });
}
const PROJECT_TIMELINE = [
  "Project Assigned",
  "Training Completed",
  "First Submission",
  "Mid Review",
  "Final Review",
  "Internship Completion"
];
const statusColors$1 = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  completed: "bg-muted text-muted-foreground border-border",
  on_hold: "bg-amber-500/20 text-amber-400 border-amber-500/30"
};
function AddProjectModal({
  internId,
  onClose
}) {
  const create = useCreateProjectParticipation();
  const [form, setForm] = reactExports.useState({
    projectName: "",
    role: "",
    startDate: "",
    milestones: [{ id: 1, value: "" }],
    deliverables: [""]
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    create.mutate(
      {
        internId,
        projectName: form.projectName,
        role: form.role,
        startDate: form.startDate,
        milestones: form.milestones.map((m) => m.value).filter(Boolean),
        deliverables: form.deliverables.filter(Boolean)
      },
      { onSuccess: onClose }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-6 w-full max-w-lg space-y-4",
      "data-ocid": "projects.add_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Add Project Participation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              placeholder: "Project Name",
              value: form.projectName,
              onChange: (e) => setForm((f) => ({ ...f, projectName: e.target.value })),
              required: true,
              "data-ocid": "projects.project_name_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              placeholder: "Role",
              value: form.role,
              onChange: (e) => setForm((f) => ({ ...f, role: e.target.value })),
              required: true,
              "data-ocid": "projects.role_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground",
              value: form.startDate,
              onChange: (e) => setForm((f) => ({ ...f, startDate: e.target.value })),
              required: true,
              "data-ocid": "projects.start_date_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Milestones" }),
            form.milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground mb-1",
                placeholder: `Milestone ${m.id}`,
                value: m.value,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  milestones: f.milestones.map(
                    (ms) => ms.id === m.id ? { ...ms, value: e.target.value } : ms
                  )
                })),
                "data-ocid": `projects.milestone_input.${m.id}`
              },
              m.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-primary hover:underline",
                onClick: () => setForm((f) => ({
                  ...f,
                  milestones: [
                    ...f.milestones,
                    { id: f.milestones.length + 1, value: "" }
                  ]
                })),
                children: "+ Add Milestone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "sm",
                disabled: create.isPending,
                "data-ocid": "projects.submit_button",
                children: "Add Project"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "projects.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function ProjectCard({
  project,
  internId
}) {
  const updateMilestone = useUpdateMilestone();
  const completedCount = project.milestones.filter(
    (m) => m.status === "completed"
  ).length;
  const timelineStep = Math.min(
    Math.floor(project.completionPercent / 100 * PROJECT_TIMELINE.length),
    PROJECT_TIMELINE.length - 1
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-4",
      "data-ocid": `projects.card.${project.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground", children: project.projectName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: project.role })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs border ${statusColors$1[project.status]}`, children: project.status.replace("_", " ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Completion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              project.completionPercent,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: project.completionPercent, className: "h-1.5" })
        ] }),
        project.milestones.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: [
            "Milestones (",
            completedCount,
            "/",
            project.milestones.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: project.milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity",
              onClick: () => updateMilestone.mutate({
                projectId: project.id,
                milestoneId: m.id,
                status: m.status === "completed" ? "pending" : "completed",
                internId
              }),
              "data-ocid": `projects.milestone.${m.id}`,
              children: [
                m.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-sm ${m.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`,
                    children: m.name
                  }
                )
              ]
            },
            m.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Project Timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: PROJECT_TIMELINE.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pb-3 last:pb-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-3 w-3 rounded-full flex-shrink-0 ${i <= timelineStep ? "bg-primary" : "bg-muted border-2 border-border"}`
              }
            ),
            i < PROJECT_TIMELINE.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-1 ml-px w-px bg-border",
                style: { top: `${i * 28 + 12}px`, height: "28px" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs ${i <= timelineStep ? "text-foreground" : "text-muted-foreground"}`,
                children: step
              }
            )
          ] }, step)) })
        ] })
      ]
    }
  );
}
function ProjectsTab({
  internId,
  isAdmin
}) {
  const { data: projects = [], isLoading } = useProjectParticipations(internId);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }, i)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "projects.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Project Participation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border text-xs", children: [
          projects.length,
          " projects"
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "gap-1.5",
          onClick: () => setAddOpen(true),
          "data-ocid": "projects.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Add Project"
          ]
        }
      )
    ] }),
    projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-3 text-center",
        "data-ocid": "projects.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "h-10 w-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No projects yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Assign this intern to a project to track milestones and deliverables." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, internId }, p.id)) }),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddProjectModal,
      {
        internId,
        onClose: () => setAddOpen(false)
      }
    )
  ] });
}
const KANBAN_COLS = [
  "Pending",
  "InProgress",
  "UnderReview",
  "Completed"
];
const statusColors = {
  Pending: "bg-muted text-muted-foreground border-border",
  InProgress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  UnderReview: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  ReworkNeeded: "bg-orange-500/20 text-orange-400 border-orange-500/30"
};
const statusLabels = {
  Pending: "Pending",
  InProgress: "In Progress",
  UnderReview: "Under Review",
  Completed: "Completed",
  Rejected: "Rejected",
  ReworkNeeded: "Rework Needed"
};
const priorityColors = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
function isOverdue(deadline) {
  if (!deadline) return false;
  return Number(deadline) / 1e6 < Date.now();
}
function TaskCard({ task }) {
  const overdue = isOverdue(task.deadline);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-2",
      "data-ocid": `tasks.card.${task.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-snug line-clamp-2", children: task.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs border flex-shrink-0 ${priorityColors[task.priority] ?? "bg-muted text-muted-foreground border-border"}`,
              children: task.priority
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs border ${statusColors[task.status] ?? "bg-muted text-muted-foreground border-border"}`,
              children: statusLabels[task.status] ?? task.status
            }
          ),
          task.deadline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-xs flex items-center gap-1 ${overdue ? "text-red-400" : "text-muted-foreground"}`,
              children: [
                overdue ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                new Date(Number(task.deadline) / 1e6).toLocaleDateString()
              ]
            }
          )
        ] }),
        task.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: task.description })
      ]
    }
  );
}
function KanbanView({ tasks }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto", children: KANBAN_COLS.map((col) => {
    const colTasks = tasks.filter((t) => t.status === col);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/30 border border-border rounded-xl p-3 min-w-[160px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: statusLabels[col] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted text-muted-foreground border-border text-xs", children: colTasks.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            colTasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-lg p-2.5 text-xs",
                "data-ocid": `tasks.kanban.${t.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground line-clamp-2", children: t.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-xs border ${priorityColors[t.priority] ?? ""}`,
                        children: t.priority
                      }
                    ),
                    isOverdue(t.deadline) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3 text-red-400" })
                  ] })
                ]
              },
              t.id
            )),
            colTasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground text-center py-4", children: "No tasks" })
          ] })
        ]
      },
      col
    );
  }) });
}
function TaskCenterTab({
  internId,
  isAdmin: _isAdmin
}) {
  const { data: tasks = [], isLoading } = useTasksByIntern(internId);
  const [view, setView] = reactExports.useState("list");
  const active = tasks.filter(
    (t) => t.status !== "Completed" && t.status !== "Rejected"
  );
  const overdue = tasks.filter(
    (t) => isOverdue(t.deadline) && t.status !== "Completed"
  );
  const completed = tasks.filter((t) => t.status === "Completed");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "tasks.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Task Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border text-xs", children: [
          tasks.length,
          " total"
        ] }),
        overdue.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30 text-xs", children: [
          overdue.length,
          " overdue"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setView("list"),
            className: `p-1.5 rounded-md transition-colors ${view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`,
            "aria-label": "List view",
            "data-ocid": "tasks.list_view_toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setView("kanban"),
            className: `p-1.5 rounded-md transition-colors ${view === "kanban" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`,
            "aria-label": "Kanban view",
            "data-ocid": "tasks.kanban_view_toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Kanban, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-10 flex flex-col items-center gap-3 text-center",
        "data-ocid": "tasks.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No tasks yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tasks assigned to this intern will appear here." })
        ]
      }
    ) : view === "kanban" ? /* @__PURE__ */ jsxRuntimeExports.jsx(KanbanView, { tasks }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      active.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: [
          "Active (",
          active.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: active.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task: t }, t.id)) })
      ] }),
      overdue.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-red-400 uppercase tracking-wider mb-2", children: [
          "Overdue (",
          overdue.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: overdue.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task: t }, t.id)) })
      ] }),
      completed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: [
          "Completed (",
          completed.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: completed.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task: t }, t.id)) })
      ] })
    ] })
  ] });
}
const MILESTONES = [
  { key: "joined", label: "Joined Internship", icon: "🎯" },
  { key: "onboarding", label: "Completed Onboarding", icon: "📋" },
  { key: "training", label: "Completed Training", icon: "🎓" },
  { key: "first_project", label: "Assigned First Project", icon: "🗂️" },
  { key: "first_submission", label: "First Submission", icon: "📤" },
  { key: "midterm", label: "Mid-Term Review", icon: "🔍" },
  { key: "final_eval", label: "Final Evaluation", icon: "📊" },
  { key: "certificate", label: "Certificate Generated", icon: "🏆" },
  { key: "completed", label: "Internship Completed", icon: "✅" }
];
function deriveTimeline(internStatus, startDate, certSent, _endDate) {
  const statusOrder = ["Active", "Completed"];
  const statusIdx = statusOrder.indexOf(internStatus);
  return MILESTONES.map((m, i) => {
    const isCompleted = m.key === "joined" && !!startDate || m.key === "certificate" && !!certSent || m.key === "completed" && internStatus === "Completed" || i === 0 && !!startDate || statusIdx >= 1 && i <= 7;
    const isInProgress = !isCompleted && (m.key === "onboarding" && internStatus === "Active" || m.key === "first_project" && internStatus === "Active");
    return {
      key: m.key,
      completedAt: isCompleted && m.key === "joined" ? startDate : void 0,
      status: isCompleted ? "completed" : isInProgress ? "in_progress" : "pending"
    };
  });
}
function TimelineTab({
  intern
}) {
  const milestones = deriveTimeline(
    intern.status,
    intern.startDate,
    intern.certificateSent,
    intern.expectedEndDate
  );
  const completed = milestones.filter((m) => m.status === "completed").length;
  const completionPct = Math.round(completed / MILESTONES.length * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "timeline.tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Internship Timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border text-xs", children: [
        completionPct,
        "% complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overall Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            completed,
            "/",
            MILESTONES.length,
            " milestones"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-500",
            style: { width: `${completionPct}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative space-y-0", children: MILESTONES.map((m, i) => {
        const ms = milestones[i];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-4 relative",
            "data-ocid": `timeline.milestone.${m.key}`,
            children: [
              i < MILESTONES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `absolute left-3.5 top-7 w-0.5 h-8 ${ms.status === "completed" ? "bg-primary" : "bg-border"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-1", children: ms.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-7 w-7 text-primary" }) : ms.status === "in_progress" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-7 w-7 text-muted-foreground/40" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8 min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: `text-sm font-medium ${ms.status === "completed" ? "text-foreground" : ms.status === "in_progress" ? "text-primary" : "text-muted-foreground"}`,
                    children: [
                      m.icon,
                      " ",
                      m.label
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: ms.completedAt ?? (ms.status === "in_progress" ? "In Progress" : "Pending") })
              ] })
            ]
          },
          m.key
        );
      }) })
    ] })
  ] });
}
function convertDocRecord(raw) {
  return {
    id: raw.id,
    internId: raw.internId,
    docType: raw.docType,
    category: raw.category,
    fileName: raw.fileName,
    approvalStatus: raw.approvalStatus,
    currentVersion: raw.currentVersion,
    generatedDate: raw.generatedDate,
    isArchived: raw.isArchived,
    versions: raw.versions.map((v) => ({
      version: v.version,
      generatedBy: v.generatedBy,
      generatedAt: Number(v.generatedAt) / 1e6,
      notes: v.notes
    }))
  };
}
function useDocumentRecords(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["documentRecords", internId],
    queryFn: async () => {
      if (!actor || !sessionToken || !internId) return [];
      try {
        const results = await actor.getDocumentsByIntern(sessionToken, internId);
        return results.map(convertDocRecord);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken && !!internId
  });
}
function EmailHistoryPanel({
  entries,
  onCompose
}) {
  if (entries.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-center",
        "data-ocid": "intern_detail.email_history_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-7 w-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "No emails sent yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Emails you compose and log for this intern will appear here. Real delivery requires the email service to be enabled." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-1.5 mt-1",
              onClick: onCompose,
              "data-ocid": "intern_detail.email_history.compose_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                " Compose Email"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": "intern_detail.email_history_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Email History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              entries.length,
              " email",
              entries.length !== 1 ? "s" : "",
              " logged this session"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-xs",
              onClick: onCompose,
              "data-ocid": "intern_detail.email_history.compose_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                " New Email"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: entries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "li",
          {
            className: "px-5 py-3.5 hover:bg-muted/30 transition-colors",
            "data-ocid": `intern_detail.email_history.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: entry.subject }),
                  entry.templateType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5", children: entry.templateType })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
                  "To: ",
                  entry.to,
                  entry.cc ? ` · CC: ${entry.cc}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2 whitespace-pre-wrap", children: entry.body })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                entry.timestamp.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              ] })
            ] })
          },
          entry.id
        )) })
      ]
    }
  );
}
function HeroSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-6 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-20 rounded-full flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-md" })
    ] })
  ] }) });
}
function InternDetailPage() {
  const { id } = useParams({ from: "/protected/layout/interns/$id" });
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { data: intern, isLoading } = useIntern(id);
  const { data: performances = [], isLoading: performancesLoading } = usePerformances(id);
  const { data: activities = [] } = useActivities(id);
  const { data: compositeScore = null } = useCompositeScore(id || "");
  const { data: _documentRecords = [] } = useDocumentRecords(id || "");
  const logWhatsApp = useLogWhatsApp();
  const updateDoc = useUpdateDocumentState();
  const deleteIntern = useDeleteIntern();
  const addPerformance = useAddPerformance();
  const updatePerformance = useUpdatePerformance();
  const deletePerf = useDeletePerformance();
  const [emailModalOpen, setEmailModalOpen] = reactExports.useState(false);
  const [emailSubject, setEmailSubject] = reactExports.useState("Offer Letter");
  const [emailLog, setEmailLog] = reactExports.useState([]);
  const handleDelete = () => {
    deleteIntern.mutate(id, {
      onSuccess: () => navigate({ to: "/interns" })
    });
  };
  const handleWhatsApp = () => {
    if (!intern) return;
    logWhatsApp.mutate(intern.id, {
      onSuccess: () => {
        window.open(`https://wa.me/91${intern.phone}`, "_blank", "noopener");
      }
    });
  };
  const openEmailModal = (subject) => {
    setEmailSubject(subject);
    setEmailModalOpen(true);
  };
  const handleEmailLogged = (entry) => {
    setEmailLog((prev) => [entry, ...prev]);
    const docMap = {
      "Offer Letter": DocumentField.offerLetterSent,
      Certificate: DocumentField.certificateSent,
      "Completion Letter": DocumentField.completionLetterSent
    };
    if (entry.templateType) {
      const field = docMap[entry.templateType];
      if (field) updateDoc.mutate({ internId: id, field, value: true });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", "data-ocid": "intern_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" })
    ] });
  }
  if (!intern) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 flex flex-col items-center justify-center min-h-[400px] gap-3",
        "data-ocid": "intern_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-foreground", children: "Intern not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This intern may have been deleted." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to Interns"
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 space-y-5 max-w-6xl mx-auto",
      "data-ocid": "intern_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnhancedHeroCard,
          {
            intern,
            performances,
            compositeScore,
            onWhatsApp: handleWhatsApp,
            onEmail: () => setEmailModalOpen(true),
            onEdit: () => navigate({ to: "/interns/$id/edit", params: { id } }),
            onDelete: handleDelete,
            isWhatsAppPending: logWhatsApp.isPending,
            onGenerateCertificate: () => downloadDocument(intern, "certificate"),
            onGenerateOfferLetter: () => downloadDocument(intern, "offer"),
            onGenerateCompletionLetter: () => downloadDocument(intern, "completion")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", "data-ocid": "intern_detail.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-card border border-border overflow-x-auto whitespace-nowrap flex-nowrap flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "overview",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.overview_tab",
                children: "Overview"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "dashboard",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.dashboard_tab",
                children: "Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "tasks",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.tasks_tab",
                children: "Tasks"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "journal",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.journal_tab",
                children: "Journal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "performance",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.performance_tab",
                children: "Performance"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "documents",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.documents_tab",
                children: "Documents"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "projects",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.projects_tab",
                children: "Projects"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "meetings",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.meetings_tab",
                children: "Meetings"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "communication",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.communication_tab",
                children: "Communication"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "timeline",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.timeline_tab",
                children: "Timeline"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "email",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.email_tab",
                children: "Email History"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "activity",
                className: "whitespace-nowrap",
                "data-ocid": "intern_detail.activity_tab",
                children: "Activity Log"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "dashboard", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DashboardTab,
            {
              intern,
              performances,
              compositeScore
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tasks", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCenterTab, { internId: id || "", isAdmin: isAdmin() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "journal", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JournalTab, { internId: id || "" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "projects", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsTab, { internId: id || "", isAdmin: isAdmin() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "meetings", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingsTab, { internId: id || "", isAdmin: isAdmin() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "communication", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommunicationTab, { internId: id || "", internName: intern.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTab, { intern }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { intern }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-5",
                "data-ocid": "intern_detail.extended_profile_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-3", children: "Extended Profile" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm", children: [
                    intern.dob && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date of Birth" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.dob })
                    ] }),
                    intern.college && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "College" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.college })
                    ] }),
                    intern.department && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Department" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.department })
                    ] }),
                    intern.domain && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Domain" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.domain })
                    ] }),
                    intern.mentorAssigned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mentor Assigned" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.mentorAssigned })
                    ] }),
                    intern.internshipType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Internship Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.internshipType })
                    ] }),
                    intern.stipendAmount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Stipend" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
                        "₹",
                        intern.stipendAmount.toLocaleString("en-IN")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PPO Candidate" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.ppoCandidate ? "Yes" : "No" })
                    ] }),
                    intern.performanceTier && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Performance Tier" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.performanceTier })
                    ] }),
                    intern.startDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Start Date" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.startDate })
                    ] }),
                    intern.expectedEndDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Expected End Date" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: intern.expectedEndDate })
                    ] })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "documents", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DocumentsTab,
            {
              intern,
              onComposeEmail: openEmailModal,
              onToggleDoc: (field, current) => updateDoc.mutate({ internId: id, field, value: !current })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "performance", className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PerformanceCenterTab,
              {
                internId: id || "",
                performances,
                compositeScore,
                isLoading: performancesLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PerformanceTab,
              {
                internId: id,
                performances,
                onAdd: (p) => addPerformance.mutate(p),
                onUpdate: (pid, p) => updatePerformance.mutate({ id: pid, payload: p }),
                onDelete: (pid) => deletePerf.mutate({ id: pid, internId: id }),
                isAddPending: addPerformance.isPending
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "email", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmailHistoryPanel,
            {
              entries: emailLog,
              onCompose: () => openEmailModal("Custom")
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "activity", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityLog, { activities }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmailComposeModal,
          {
            open: emailModalOpen,
            onOpenChange: setEmailModalOpen,
            internEmail: intern.email,
            internName: intern.name,
            defaultSubject: emailSubject,
            onEmailLogged: handleEmailLogged
          }
        )
      ]
    }
  );
}
export {
  InternDetailPage
};
