import { jsPDF } from "jspdf";

const TMT_RED = "#e71514";
const TMT_DARK = "#1a1a1a";
const GOLD = "#b8960c";
const GOLD_LIGHT = "#d4af37";

export interface InternPdfData {
  name: string;
  department: string;
  joiningDate: Date;
  endDate?: Date;
  email: string;
  phone: string;
  space: string;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.substring(0, 2), 16),
    Number.parseInt(h.substring(2, 4), 16),
    Number.parseInt(h.substring(4, 6), 16),
  ];
}

function setColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setTextColor(r, g, b);
}

function setFillColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setFillColor(r, g, b);
}

function setDrawColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setDrawColor(r, g, b);
}

// ============================================================
// SHARED LETTER TEMPLATE (Offer + Completion)
// ============================================================
function buildLetterDoc(): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // Header bar
  setFillColor(doc, TMT_DARK);
  doc.rect(0, 0, W, 26, "F");

  // TMT logo text
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  setColor(doc, "#ffffff");
  doc.text("TechMecha", 14, 12);
  setColor(doc, TMT_RED);
  doc.text("Torque", 50, 12);
  doc.setFontSize(8);
  setColor(doc, "#aaaaaa");
  doc.text("PVT. LTD.", 14, 18);

  // Header right info
  doc.setFontSize(7.5);
  setColor(doc, "#cccccc");
  doc.text(
    "+91-9876543210  |  team@techmechatorque.com  |  CIN: U74999AP2024PTC101234",
    80,
    13,
    { align: "left" },
  );

  // Red accent underline
  setFillColor(doc, TMT_RED);
  doc.rect(0, 26, W, 1.2, "F");

  // Footer bar
  setFillColor(doc, TMT_DARK);
  doc.rect(0, H - 20, W, 20, "F");
  setFillColor(doc, TMT_RED);
  doc.rect(0, H - 21, W, 1, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setColor(doc, "#ffffff");
  doc.text("TECHMECHA TORQUE PVT. LTD.", W / 2, H - 13, { align: "center" });
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  setColor(doc, TMT_RED);
  doc.text("team@techmechatorque.com", W / 2, H - 7, { align: "center" });

  return doc;
}

function letterAddressBlock(doc: jsPDF, date: Date) {
  const today = fmtDate(date);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setColor(doc, "#555555");
  doc.text("TechMecha Torque Pvt. Ltd.", 14, 40);
  doc.text("Hyderabad, Telangana", 14, 46);
  doc.setFontSize(9.5);
  setColor(doc, TMT_DARK);
  doc.text(`Date: ${today}`, 14, 56);
}

function letterSignature(doc: jsPDF, y: number) {
  setDrawColor(doc, "#333333");
  doc.setLineWidth(0.4);
  doc.line(14, y + 10, 80, y + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  setColor(doc, TMT_DARK);
  doc.text("JAYA CHANDRA REDDY CHILAKAMARRY", 14, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Founder & CEO", 14, y + 22);
  doc.text("TechMecha Torque Pvt. Ltd.", 14, y + 28);
}

// ============================================================
// OFFER LETTER
// ============================================================
export function generateOfferLetter(intern: InternPdfData): void {
  const doc = buildLetterDoc();

  letterAddressBlock(doc, new Date());

  // Subject
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setColor(doc, TMT_DARK);
  doc.text("Subject: Offer of Internship", 14, 68);
  setFillColor(doc, TMT_RED);
  doc.rect(14, 70, 80, 0.6, "F");

  // Salutation
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor(doc, TMT_DARK);
  doc.text(`Dear ${intern.name},`, 14, 80);

  // Body para 1
  const para1 = doc.splitTextToSize(
    `We are delighted to offer you an internship position as ${intern.department} at TechMecha Torque Pvt. Ltd., commencing from ${fmtDate(intern.joiningDate)}. This internship will provide you with valuable hands-on experience in ${intern.department} and contribute to your professional development.`,
    182,
  );
  doc.text(para1, 14, 90);

  // Details box
  const detailsY = 90 + para1.length * 6 + 6;
  setFillColor(doc, "#f7f7f7");
  setDrawColor(doc, "#dddddd");
  doc.setLineWidth(0.4);
  doc.roundedRect(14, detailsY, 182, 42, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setColor(doc, TMT_DARK);
  doc.text("Details of Internship:", 20, detailsY + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  setColor(doc, "#333333");
  const bullets = [
    `Role: ${intern.department}`,
    `Start Date: ${fmtDate(intern.joiningDate)}`,
    "Duration: As per internship program",
    "Location: TechMecha Torque Pvt. Ltd.",
  ];
  bullets.forEach((b, i) => {
    doc.text(`\u2022  ${b}`, 22, detailsY + 18 + i * 6);
  });

  // Closing para
  const closeY = detailsY + 50;
  doc.setFontSize(10);
  setColor(doc, TMT_DARK);
  const closePara = doc.splitTextToSize(
    "We look forward to welcoming you to our team. Please confirm your acceptance by signing and returning this letter.",
    182,
  );
  doc.text(closePara, 14, closeY);

  // Yours sincerely
  doc.text("Yours sincerely,", 14, closeY + closePara.length * 6 + 8);
  letterSignature(doc, closeY + closePara.length * 6 + 14);

  doc.save(
    `offer-letter-${intern.name.toLowerCase().replace(/\s+/g, "-")}.pdf`,
  );
}

// ============================================================
// COMPLETION LETTER
// ============================================================
export function generateCompletionLetter(intern: InternPdfData): void {
  const doc = buildLetterDoc();

  letterAddressBlock(doc, new Date());

  // Subject
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setColor(doc, TMT_DARK);
  doc.text("Subject: Internship Completion Letter", 14, 68);
  setFillColor(doc, TMT_RED);
  doc.rect(14, 70, 100, 0.6, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor(doc, TMT_DARK);
  doc.text(`Dear ${intern.name},`, 14, 80);

  const endStr = intern.endDate ? fmtDate(intern.endDate) : "present";
  const para1 = doc.splitTextToSize(
    `This is to certify that ${intern.name} has successfully completed their internship at TechMecha Torque Pvt. Ltd. in the capacity of ${intern.department} from ${fmtDate(intern.joiningDate)} to ${endStr}.`,
    182,
  );
  doc.text(para1, 14, 90);

  let y = 90 + para1.length * 6 + 6;
  const para2 = doc.splitTextToSize(
    `During the tenure, ${intern.name} demonstrated exceptional dedication and contributed significantly to our organization.`,
    182,
  );
  doc.text(para2, 14, y);

  // Key contributions box
  y += para2.length * 6 + 8;
  setFillColor(doc, "#f7f7f7");
  setDrawColor(doc, "#dddddd");
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, 182, 40, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setColor(doc, TMT_DARK);
  doc.text("Key Contributions:", 20, y + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  setColor(doc, "#333333");
  const contributions = [
    `Demonstrated strong skills in ${intern.department}`,
    "Actively participated in team projects and deliverables",
    "Showed initiative and professional growth throughout the program",
  ];
  contributions.forEach((c, i) => {
    doc.text(`\u2022  ${c}`, 22, y + 18 + i * 7);
  });

  y += 48;
  doc.setFontSize(10);
  setColor(doc, TMT_DARK);
  doc.text(`We wish ${intern.name} all the best in future endeavors.`, 14, y);
  y += 10;
  doc.text("Yours sincerely,", 14, y);
  letterSignature(doc, y + 6);

  doc.save(
    `completion-letter-${intern.name.toLowerCase().replace(/\s+/g, "-")}.pdf`,
  );
}

// ============================================================
// CERTIFICATE OF RECOGNITION
// ============================================================
export function generateCertificate(intern: InternPdfData): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // White background
  setFillColor(doc, "#ffffff");
  doc.rect(0, 0, W, H, "F");

  // Left black sidebar
  setFillColor(doc, TMT_DARK);
  doc.rect(0, 0, 10, H, "F");
  // Right black sidebar
  doc.rect(W - 10, 0, 10, H, "F");

  // Left red accent strip
  setFillColor(doc, TMT_RED);
  doc.rect(10, 0, 3, H, "F");
  // Right red accent strip
  doc.rect(W - 13, 0, 3, H, "F");

  // Watermark TMT text (very light)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(110);
  doc.setTextColor(230, 230, 230);
  doc.text("TMT", W / 2, H / 2 + 20, { align: "center", angle: 345 });

  // Gold top bar
  setFillColor(doc, GOLD_LIGHT);
  doc.rect(13, 0, W - 26, 8, "F");

  // CERTIFICATE heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  setColor(doc, TMT_DARK);
  doc.text("CERTIFICATE", W / 2, 36, { align: "center" });

  // "of Recognition" subheading italic
  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(18);
  setColor(doc, "#444444");
  doc.text("of Recognition", W / 2, 48, { align: "center" });

  // Gold decorative line under heading
  setFillColor(doc, GOLD_LIGHT);
  doc.rect(50, 53, 110, 1.5, "F");
  setFillColor(doc, TMT_RED);
  doc.rect(50, 54.5, 110, 0.6, "F");

  // Gold badge (circle) top right
  const bx = W - 38;
  const by = 22;
  setFillColor(doc, GOLD_LIGHT);
  doc.circle(bx, by, 16, "F");
  setDrawColor(doc, GOLD);
  doc.setLineWidth(0.8);
  doc.circle(bx, by, 15, "D");
  setFillColor(doc, GOLD);
  doc.circle(bx, by, 11, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  setColor(doc, "#ffffff");
  doc.text("BEST", bx, by - 2, { align: "center" });
  doc.text("INTERN", bx, by + 4, { align: "center" });

  // TechMecha Torque small brand under gold line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setColor(doc, "#888888");
  doc.text("TechMecha Torque Pvt. Ltd.", W / 2, 64, { align: "center" });

  // Divider
  setFillColor(doc, "#e0e0e0");
  doc.rect(40, 68, 130, 0.4, "F");

  // Presented to
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setColor(doc, "#666666");
  doc.text("This certificate is proudly presented to", W / 2, 80, {
    align: "center",
  });

  // Intern name — large, red
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  setColor(doc, TMT_RED);
  doc.text(intern.name, W / 2, 96, { align: "center" });

  // Name underline gold
  const nameW = doc.getTextWidth(intern.name);
  setFillColor(doc, GOLD_LIGHT);
  doc.rect(W / 2 - nameW / 2, 99, nameW, 0.8, "F");

  // Role and tenure
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setColor(doc, "#444444");
  const roleText = doc.splitTextToSize(
    `For outstanding performance as ${intern.department} at TechMecha Torque Pvt. Ltd.`,
    160,
  );
  doc.text(roleText, W / 2, 112, { align: "center" });

  const endStr = intern.endDate ? fmtDate(intern.endDate) : "Present";
  doc.setFontSize(10);
  setColor(doc, "#666666");
  doc.text(
    `From ${fmtDate(intern.joiningDate)} to ${endStr}`,
    W / 2,
    112 + roleText.length * 7 + 4,
    { align: "center" },
  );

  // Decorative diamond divider
  const midY = 148;
  setFillColor(doc, GOLD_LIGHT);
  doc.rect(40, midY, 58, 0.5, "F");
  // center diamond
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  setColor(doc, GOLD_LIGHT);
  doc.text("\u25C6", W / 2, midY + 3, { align: "center" });
  doc.rect(112, midY, 58, 0.5, "F");

  // Space label badge
  setFillColor(doc, "#f0f0f0");
  setDrawColor(doc, "#cccccc");
  doc.setLineWidth(0.3);
  doc.roundedRect(W / 2 - 25, 154, 50, 10, 5, 5, "FD");
  doc.setFontSize(8);
  setColor(doc, "#888888");
  doc.text(`Space: ${intern.space}`, W / 2, 160.5, { align: "center" });

  // Bottom signature section
  const sigY = 210;

  // Left column – Founder signature
  setDrawColor(doc, "#333333");
  doc.setLineWidth(0.4);
  doc.line(30, sigY, 95, sigY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  setColor(doc, TMT_DARK);
  doc.text("Jaya Chandra Reddy Chilakamarry", 30, sigY + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setColor(doc, "#666666");
  doc.text("Founder & CEO", 30, sigY + 14);
  doc.text("TechMecha Torque Pvt. Ltd.", 30, sigY + 20);

  // Right column – CID
  setFillColor(doc, "#f7f7f7");
  setDrawColor(doc, GOLD_LIGHT);
  doc.setLineWidth(0.5);
  doc.roundedRect(W - 90, sigY - 10, 60, 38, 3, 3, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setColor(doc, TMT_DARK);
  doc.text("Certificate ID", W - 60, sigY - 2, { align: "center" });
  setFillColor(doc, GOLD_LIGHT);
  doc.rect(W - 90, sigY + 2, 60, 0.5, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor(doc, TMT_RED);
  const certId = `TMT-${intern.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()}-${intern.joiningDate.getFullYear()}`;
  doc.text(certId, W - 60, sigY + 12, { align: "center" });

  // Footer bar
  setFillColor(doc, TMT_DARK);
  doc.rect(13, H - 26, W - 26, 26, "F");
  setFillColor(doc, GOLD_LIGHT);
  doc.rect(13, H - 27, W - 26, 1.2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setColor(doc, "#ffffff");
  doc.text("TECHMECHA TORQUE PVT. LTD.", W / 2, H - 16, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  setColor(doc, TMT_RED);
  doc.text("team@techmechatorque.com", W / 2, H - 9, { align: "center" });

  doc.save(`certificate-${intern.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
