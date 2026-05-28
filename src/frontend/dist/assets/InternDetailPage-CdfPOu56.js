import { j as jsxRuntimeExports, I as FileText, J as User, q as Badge, E as Eye, l as Button, r as reactExports, D as Dialog, m as DialogContent, n as DialogHeader, o as DialogTitle, K as DialogFooter, N as ue, L as Link, O as useBackend, P as useQuery, Q as convertPerformance, u as useAuth, R as useQueryClient, T as useMutation, V as performanceUpdatePayload, W as performanceCreatePayload, X as useParams, w as useNavigate, Y as useIntern, Z as useLogWhatsApp, _ as useUpdateDocumentState, v as useDeleteIntern, p as Skeleton, G as ArrowLeft, C as Clock } from "./index-Fes9v1FI.js";
import { A as Activity } from "./activity-DTxm9M7Q.js";
import { P as Plus } from "./plus-BaV3q_e8.js";
import { T as Trash2 } from "./trash-2-DdreQTBL.js";
import { T as TrendingUp } from "./trending-up-CKappicI.js";
import { M as MessageCircle } from "./message-circle-CU333RNN.js";
import { S as Send } from "./send-DB4bwyCg.js";
import { D as Download } from "./download-BXJoaHpc.js";
import { M as Mail } from "./mail-XmoXen85.js";
import { I as Input } from "./input-c3RLJhH7.js";
import { L as Label } from "./label-BkHoCj3b.js";
import { T as Textarea } from "./textarea-C38mBxqU.js";
import { C as CircleAlert } from "./circle-alert-CETCrPEZ.js";
import { P as Pencil } from "./pencil-VZrSpyJP.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BNpE8GDg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CMxv2F83.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line } from "./LineChart-CRafAT_O.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CdXRVIS9.js";
import { a as useActivities } from "./use-dashboard-djPoqkIi.js";
import "./index-Dty2Pq1p.js";
import "./index-BJzhuyB3.js";
import "./index-XezQyXZK.js";
import "./index-vZVdx1MD.js";
import "./chevron-down-CXO-u7hj.js";
import "./check-DNYA6atX.js";
import "./index-D2b0qIZK.js";
var DocumentField = /* @__PURE__ */ ((DocumentField2) => {
  DocumentField2["offerLetterSent"] = "offerLetterSent";
  DocumentField2["offerLetterOpened"] = "offerLetterOpened";
  DocumentField2["certificateSent"] = "certificateSent";
  DocumentField2["certificateOpened"] = "certificateOpened";
  DocumentField2["completionLetterSent"] = "completionLetterSent";
  DocumentField2["completionLetterOpened"] = "completionLetterOpened";
  return DocumentField2;
})(DocumentField || {});
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
const spaceColors = {
  Org: "bg-red-500/20 text-red-400 border-red-500/30",
  Marketing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Learning: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
const statusColors = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-muted text-muted-foreground border-border",
  OnHold: "bg-amber-500/20 text-amber-400 border-amber-500/30"
};
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
function InternAvatar({ intern }) {
  if (intern.profilePicCid) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: `https://assets.caffeine.ai/cdn/${intern.profilePicCid}`,
        alt: intern.name,
        className: "h-20 w-20 rounded-full object-cover ring-2 ring-border"
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
function InternDetailPage() {
  const { id } = useParams({ from: "/protected/layout/interns/$id" });
  const navigate = useNavigate();
  const { data: intern, isLoading } = useIntern(id);
  const { data: performances = [] } = usePerformances(id);
  const { data: activities = [] } = useActivities(id);
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-5 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InternAvatar, { intern }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground leading-tight", children: intern.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs border ${spaceColors[intern.space]}`, children: intern.space }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs border ${statusColors[intern.status]}`,
                  children: intern.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 truncate", children: intern.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              intern.phone,
              " · ",
              intern.department
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-1.5 border-emerald-600/40 text-emerald-400 hover:bg-emerald-500/10",
                onClick: handleWhatsApp,
                disabled: logWhatsApp.isPending,
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
                onClick: () => openEmailModal("Offer Letter"),
                "data-ocid": "intern_detail.email_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
                  " Email"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns/$id/edit", params: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-1.5",
                "data-ocid": "intern_detail.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                  " Edit"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  className: "gap-1.5",
                  "data-ocid": "intern_detail.delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                    " Delete"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "intern_detail.dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Intern" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "Are you sure you want to delete",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: intern.name }),
                    "? This action cannot be undone and will remove all performance records and activity logs."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "intern_detail.cancel_button", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: handleDelete,
                      className: "bg-destructive hover:bg-destructive/90",
                      "data-ocid": "intern_detail.confirm_button",
                      children: "Delete Intern"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", "data-ocid": "intern_detail.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto bg-card border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", "data-ocid": "intern_detail.overview_tab", children: "Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "documents",
                "data-ocid": "intern_detail.documents_tab",
                children: "Documents"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "performance",
                "data-ocid": "intern_detail.performance_tab",
                children: "Performance"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "email", "data-ocid": "intern_detail.email_tab", children: "Email History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "activity", "data-ocid": "intern_detail.activity_tab", children: "Activity Log" })
          ] }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "performance", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PerformanceTab,
            {
              internId: id,
              performances,
              onAdd: (p) => addPerformance.mutate(p),
              onUpdate: (pid, p) => updatePerformance.mutate({ id: pid, payload: p }),
              onDelete: (pid) => deletePerf.mutate({ id: pid, internId: id }),
              isAddPending: addPerformance.isPending
            }
          ) }),
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
