import type { Intern } from "@/types";

type DocType = "offer" | "certificate" | "completion";

function formatDate(date?: Date | string): string {
  const d = date ? new Date(date) : new Date();
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buildOfferLetterHtml(intern: Intern): string {
  const joiningDate = formatDate(intern.joiningDate);
  const today = formatDate(new Date());
  const refId = `TM/OL/${new Date().getFullYear()}/${intern.id.slice(-6).toUpperCase()}`;
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

function buildCertificateHtml(intern: Intern): string {
  const today = formatDate(new Date());
  const joiningDate = formatDate(intern.joiningDate);
  const endDate = intern.completionLetterSentAt
    ? formatDate(intern.completionLetterSentAt)
    : "Present";
  const certId = `TMT-${intern.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()}-${intern.joiningDate.getFullYear()}`;

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

function buildCompletionLetterHtml(intern: Intern): string {
  const today = formatDate(new Date());
  const joiningDate = formatDate(intern.joiningDate);
  const endDate = intern.completionLetterSentAt
    ? formatDate(intern.completionLetterSentAt)
    : today;
  const refId = `TM/CL/${new Date().getFullYear()}/${intern.id.slice(-6).toUpperCase()}`;

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

export function downloadDocument(intern: Intern, docType: DocType): void {
  let html: string;
  let filename: string;
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
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
