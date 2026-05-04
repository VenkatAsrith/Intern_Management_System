import type { Intern } from "@/types";

const COMPANY_NAME = "TechMecha Torque";
const COMPANY_SUBTITLE = "Intern Management System";
const PRIMARY = "#e71514";

function fmtDate(d?: Date): string {
  if (!d)
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const baseStyles = `
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#111;}
  @page{size:A4;margin:0;}
  @media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact;}}
`;

// ─── Offer Letter ────────────────────────────────────────────────────────────

export function generateOfferLetter(intern: Intern): string {
  const joiningDate = fmtDate(intern.joiningDate);
  const today = fmtDate();
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Offer Letter - ${intern.name}</title><style>
    ${baseStyles}
    .page{width:210mm;min-height:297mm;margin:0 auto;padding:28mm 22mm;position:relative;background:#fff;}
    .header{display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid ${PRIMARY};margin-bottom:28px;}
    .brand{display:flex;align-items:center;gap:12px;}
    .logo{width:48px;height:48px;background:${PRIMARY};border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;font-weight:900;}
    .brand-name{font-size:18px;font-weight:700;color:#111;}
    .brand-sub{font-size:12px;color:#666;margin-top:2px;}
    .doc-label{background:${PRIMARY};color:#fff;padding:6px 16px;border-radius:6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
    .date-block{font-size:12px;color:#555;margin-bottom:20px;}
    h1{font-size:22px;font-weight:800;color:${PRIMARY};margin-bottom:8px;text-align:center;}
    .subject-line{text-align:center;font-size:14px;color:#444;margin-bottom:28px;text-decoration:underline;font-weight:600;}
    p{font-size:13px;line-height:1.75;color:#333;margin-bottom:14px;}
    .highlight{font-weight:700;color:#111;}
    .details-box{border:1px solid #e0e0e0;border-radius:8px;padding:16px 20px;background:#fafafa;margin:20px 0;}
    .details-box table{width:100%;border-collapse:collapse;}
    .details-box td{padding:6px 8px;font-size:13px;}
    .details-box td:first-child{font-weight:600;color:#555;width:40%;}
    .signature-section{margin-top:48px;display:flex;justify-content:space-between;}
    .sig-block{text-align:center;}
    .sig-line{border-top:1px solid #555;width:160px;margin:0 auto 6px;padding-top:6px;font-size:12px;color:#555;}
    .footer{position:fixed;bottom:12mm;left:22mm;right:22mm;text-align:center;font-size:10px;color:#aaa;border-top:1px solid #e0e0e0;padding-top:8px;}
  </style></head><body><div class="page">
    <div class="header">
      <div class="brand">
        <div class="logo">T</div>
        <div><div class="brand-name">${COMPANY_NAME}</div><div class="brand-sub">${COMPANY_SUBTITLE}</div></div>
      </div>
      <span class="doc-label">Offer Letter</span>
    </div>
    <div class="date-block">Date: ${today}</div>
    <h1>Internship Offer Letter</h1>
    <div class="subject-line">Sub: Offer of Internship Position — ${intern.department}</div>
    <p>Dear <span class="highlight">${intern.name}</span>,</p>
    <p>We are delighted to extend this offer of an internship position at <span class="highlight">${COMPANY_NAME}</span>. After careful consideration, we are pleased to invite you to join our <span class="highlight">${intern.space}</span> team.</p>
    <div class="details-box">
      <table>
        <tr><td>Candidate Name:</td><td><strong>${intern.name}</strong></td></tr>
        <tr><td>Email Address:</td><td>${intern.email}</td></tr>
        <tr><td>Phone Number:</td><td>${intern.phone}</td></tr>
        <tr><td>Department:</td><td>${intern.department}</td></tr>
        <tr><td>Enterprise Space:</td><td>${intern.space}</td></tr>
        <tr><td>Experience Level:</td><td>${intern.experienceLevel}</td></tr>
        <tr><td>Date of Joining:</td><td>${joiningDate}</td></tr>
      </table>
    </div>
    <p>This internship is designed to provide you with hands-on experience in your field of interest. You will work closely with our experienced team members and be expected to contribute meaningfully to ongoing projects.</p>
    <p>Please confirm your acceptance of this offer by signing and returning a copy of this letter. We look forward to welcoming you to the ${COMPANY_NAME} family.</p>
    <p>Congratulations, and we are excited about your joining!</p>
    <div class="signature-section">
      <div class="sig-block">
        <div class="sig-line">Authorized Signatory</div>
        <div style="font-size:11px;color:#555;">${COMPANY_NAME}</div>
      </div>
      <div class="sig-block">
        <div class="sig-line">Candidate Signature</div>
        <div style="font-size:11px;color:#555;">${intern.name}</div>
      </div>
    </div>
    <div class="footer">${COMPANY_NAME} | ${COMPANY_SUBTITLE} | Confidential Document</div>
  </div></body></html>`;
}

// ─── Certificate of Appreciation ─────────────────────────────────────────────

export function generateCertificate(intern: Intern): string {
  const today = fmtDate();
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificate - ${intern.name}</title><style>
    ${baseStyles}
    .page{width:297mm;height:210mm;margin:0 auto;background:#fff;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;}
    .border-outer{position:absolute;inset:10px;border:4px solid ${PRIMARY};border-radius:6px;pointer-events:none;}
    .border-inner{position:absolute;inset:18px;border:1.5px solid #d4a017;border-radius:4px;pointer-events:none;}
    .content{position:relative;z-index:1;text-align:center;width:100%;padding:20px 60px;}
    .logo-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:12px;}
    .logo{width:56px;height:56px;background:${PRIMARY};border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;font-weight:900;}
    .brand-name{font-size:22px;font-weight:800;color:#111;}
    .brand-sub{font-size:12px;color:#888;margin-top:2px;}
    .cert-title{font-size:38px;font-weight:900;color:${PRIMARY};letter-spacing:3px;text-transform:uppercase;margin:10px 0 4px;font-family:Georgia,serif;}
    .cert-subtitle{font-size:14px;color:#555;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;}
    .presented-to{font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
    .intern-name{font-size:36px;font-weight:700;color:#111;font-family:Georgia,serif;border-bottom:2px solid #d4a017;display:inline-block;padding-bottom:4px;margin-bottom:12px;}
    .desc{font-size:13px;color:#444;line-height:1.7;max-width:520px;margin:0 auto 16px;}
    .meta-row{display:flex;align-items:center;justify-content:center;gap:48px;margin-top:12px;}
    .meta-item{text-align:center;}
    .meta-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#aaa;margin-bottom:2px;}
    .meta-value{font-size:13px;font-weight:600;color:#333;}
    .sig-section{display:flex;justify-content:space-between;width:100%;padding:0 60px;margin-top:16px;}
    .sig-block{text-align:center;}
    .sig-line{border-top:1px solid #555;width:140px;margin:0 auto 4px;padding-top:4px;font-size:11px;color:#555;}
    .seal{position:absolute;bottom:30px;right:50px;width:70px;height:70px;border:3px solid ${PRIMARY};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .seal-text{font-size:8px;font-weight:700;text-align:center;color:${PRIMARY};text-transform:uppercase;line-height:1.2;}
  </style></head><body><div class="page">
    <div class="border-outer"></div>
    <div class="border-inner"></div>
    <div class="content">
      <div class="logo-row">
        <div class="logo">T</div>
        <div><div class="brand-name">${COMPANY_NAME}</div><div class="brand-sub">${COMPANY_SUBTITLE}</div></div>
      </div>
      <div class="cert-title">Certificate</div>
      <div class="cert-subtitle">of Appreciation &amp; Achievement</div>
      <div class="presented-to">This Certificate is Proudly Presented To</div>
      <div class="intern-name">${intern.name}</div>
      <div class="desc">In recognition of the successful completion of the internship program in the <strong>${intern.department}</strong> department within the <strong>${intern.space}</strong> enterprise space, demonstrating outstanding dedication, skill, and professional conduct.</div>
      <div class="meta-row">
        <div class="meta-item"><div class="meta-label">Department</div><div class="meta-value">${intern.department}</div></div>
        <div class="meta-item"><div class="meta-label">Enterprise Space</div><div class="meta-value">${intern.space}</div></div>
        <div class="meta-item"><div class="meta-label">Date Issued</div><div class="meta-value">${today}</div></div>
      </div>
      <div class="sig-section">
        <div class="sig-block"><div class="sig-line">Program Director</div></div>
        <div class="sig-block"><div class="sig-line">CEO, ${COMPANY_NAME}</div></div>
      </div>
    </div>
    <div class="seal"><div class="seal-text">OFFICIAL<br/>SEAL<br/>✦</div></div>
  </div></body></html>`;
}

// ─── Completion Letter ────────────────────────────────────────────────────────

export function generateCompletionLetter(intern: Intern): string {
  const today = fmtDate();
  const joiningDate = fmtDate(intern.joiningDate);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Completion Letter - ${intern.name}</title><style>
    ${baseStyles}
    .page{width:210mm;min-height:297mm;margin:0 auto;padding:28mm 22mm;position:relative;background:#fff;}
    .header{display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid ${PRIMARY};margin-bottom:28px;}
    .brand{display:flex;align-items:center;gap:12px;}
    .logo{width:48px;height:48px;background:${PRIMARY};border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;font-weight:900;}
    .brand-name{font-size:18px;font-weight:700;color:#111;}
    .brand-sub{font-size:12px;color:#666;margin-top:2px;}
    .doc-label{background:${PRIMARY};color:#fff;padding:6px 16px;border-radius:6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
    .date-block{font-size:12px;color:#555;margin-bottom:20px;}
    h1{font-size:22px;font-weight:800;color:${PRIMARY};margin-bottom:8px;text-align:center;}
    .subject-line{text-align:center;font-size:14px;color:#444;margin-bottom:28px;text-decoration:underline;font-weight:600;}
    p{font-size:13px;line-height:1.75;color:#333;margin-bottom:14px;}
    .highlight{font-weight:700;color:#111;}
    .details-box{border:1px solid #e0e0e0;border-radius:8px;padding:16px 20px;background:#fafafa;margin:20px 0;}
    .details-box table{width:100%;border-collapse:collapse;}
    .details-box td{padding:6px 8px;font-size:13px;}
    .details-box td:first-child{font-weight:600;color:#555;width:40%;}
    .signature-section{margin-top:48px;display:flex;justify-content:space-between;}
    .sig-block{text-align:center;}
    .sig-line{border-top:1px solid #555;width:160px;margin:0 auto 6px;padding-top:6px;font-size:12px;color:#555;}
    .footer{position:fixed;bottom:12mm;left:22mm;right:22mm;text-align:center;font-size:10px;color:#aaa;border-top:1px solid #e0e0e0;padding-top:8px;}
  </style></head><body><div class="page">
    <div class="header">
      <div class="brand">
        <div class="logo">T</div>
        <div><div class="brand-name">${COMPANY_NAME}</div><div class="brand-sub">${COMPANY_SUBTITLE}</div></div>
      </div>
      <span class="doc-label">Completion Letter</span>
    </div>
    <div class="date-block">Date: ${today}</div>
    <h1>Internship Completion Letter</h1>
    <div class="subject-line">Sub: Successful Completion of Internship Programme</div>
    <p>To Whom It May Concern,</p>
    <p>This is to certify that <span class="highlight">${intern.name}</span> has successfully completed their internship program with <span class="highlight">${COMPANY_NAME}</span> in the <span class="highlight">${intern.department}</span> department.</p>
    <div class="details-box">
      <table>
        <tr><td>Name:</td><td><strong>${intern.name}</strong></td></tr>
        <tr><td>Email:</td><td>${intern.email}</td></tr>
        <tr><td>Phone:</td><td>${intern.phone}</td></tr>
        <tr><td>Department:</td><td>${intern.department}</td></tr>
        <tr><td>Enterprise Space:</td><td>${intern.space}</td></tr>
        <tr><td>Experience Level:</td><td>${intern.experienceLevel}</td></tr>
        <tr><td>Date of Joining:</td><td>${joiningDate}</td></tr>
        <tr><td>Completion Date:</td><td>${today}</td></tr>
      </table>
    </div>
    <p>During the tenure of the internship, <span class="highlight">${intern.name}</span> demonstrated commendable dedication, professionalism, and a strong aptitude for learning. Their contributions to the ${intern.space} space have been valuable.</p>
    <p>We wish <span class="highlight">${intern.name}</span> continued success in their career and commend them for their hard work and commitment throughout the programme.</p>
    <p>This letter is issued as a mark of successful completion and may be used for official purposes.</p>
    <div class="signature-section">
      <div class="sig-block">
        <div class="sig-line">Authorized Signatory</div>
        <div style="font-size:11px;color:#555;">${COMPANY_NAME}</div>
      </div>
      <div class="sig-block">
        <div class="sig-line">HR Manager</div>
        <div style="font-size:11px;color:#555;">${COMPANY_NAME}</div>
      </div>
    </div>
    <div class="footer">${COMPANY_NAME} | ${COMPANY_SUBTITLE} | Confidential Document</div>
  </div></body></html>`;
}

// ─── Print / Download trigger ─────────────────────────────────────────────────

export function downloadDocument(html: string, _filename: string) {
  const win = window.open(
    "",
    "_blank",
    "width=900,height=700,menubar=yes,toolbar=yes",
  );
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
  // Trigger print dialog after content loads
  win.onload = () => {
    win.focus();
    win.print();
  };
  // Fallback: try print after short delay
  setTimeout(() => {
    try {
      win.focus();
      win.print();
    } catch {}
  }, 800);
}
