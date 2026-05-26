import { Button } from "@/components/ui/button";
import type { Intern } from "@/types";
import type { Course } from "@/types/lms";
import { Download } from "lucide-react";
import { useRef } from "react";

interface CertificateDownloadProps {
  intern: Intern;
  course: Course;
  issuedAt: Date;
}

export function CertificateDownload({
  intern,
  course,
  issuedAt,
}: CertificateDownloadProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const cert = certRef.current;
    if (!cert) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download the certificate");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${intern.name}</title>
          <style>
            @page { size: A4 landscape; margin: 0; }
            body { margin: 0; font-family: 'Inter', system-ui, sans-serif; }
            .cert { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; }
            .cert-inner { width: 90%; height: 85%; border: 3px solid #e71514; border-radius: 16px; padding: 48px; background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; }
            .cert-inner::before { content: ''; position: absolute; inset: 8px; border: 1px solid #e7151440; border-radius: 12px; pointer-events: none; }
            .logo { font-size: 28px; font-weight: 800; color: #e71514; letter-spacing: 2px; margin-bottom: 8px; }
            .subtitle { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 32px; }
            .title { font-size: 42px; font-weight: 700; color: #fff; margin-bottom: 16px; }
            .presented { font-size: 16px; color: #aaa; margin-bottom: 12px; }
            .name { font-size: 36px; font-weight: 700; color: #e71514; margin-bottom: 16px; }
            .course { font-size: 18px; color: #ccc; margin-bottom: 8px; }
            .date { font-size: 14px; color: #777; margin-bottom: 40px; }
            .footer { display: flex; gap: 80px; margin-top: auto; }
            .sig { text-align: center; }
            .sig-line { width: 160px; border-top: 1px solid #555; margin-bottom: 8px; }
            .sig-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <div class="cert">
            <div class="cert-inner">
              <div class="logo">TECHMECHA TORQUE</div>
              <div class="subtitle">Intern Management System</div>
              <div class="title">Certificate of Completion</div>
              <div class="presented">This is proudly presented to</div>
              <div class="name">${intern.name}</div>
              <div class="course">For successfully completing the course<br/><strong style="color:#fff;">${course.title}</strong></div>
              <div class="date">Issued on ${issuedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
              <div class="footer">
                <div class="sig">
                  <div class="sig-line"></div>
                  <div class="sig-label">Authorized Signatory</div>
                </div>
                <div class="sig">
                  <div class="sig-line"></div>
                  <div class="sig-label">Program Director</div>
                </div>
              </div>
            </div>
          </div>
          <script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 300); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={handleDownload}
        data-ocid="lms.certificate_download_button"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </Button>
      <div ref={certRef} className="hidden" />
    </>
  );
}
