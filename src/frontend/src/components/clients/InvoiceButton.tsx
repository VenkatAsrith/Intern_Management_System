import { InvoiceGeneratorModal } from "@/components/clients/InvoiceGeneratorModal";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types/clients";
import { FileText } from "lucide-react";
import { useState } from "react";

interface InvoiceButtonProps {
  client: Client;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  label?: string;
}

export function InvoiceButton({
  client,
  variant = "outline",
  size = "sm",
  label = "Invoice",
}: InvoiceButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className="border-primary/30 text-primary hover:bg-primary/10"
        data-ocid="invoice.open_modal_button"
      >
        <FileText className="h-3.5 w-3.5" />
        {size !== "icon" && <span className="ml-1.5">{label}</span>}
      </Button>

      <InvoiceGeneratorModal
        clientId={client.id}
        client={client}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
