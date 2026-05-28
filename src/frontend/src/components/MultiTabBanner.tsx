import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";

interface MultiTabBannerProps {
  showBanner: boolean;
  dismiss: () => void;
}

export function MultiTabBanner({ showBanner, dismiss }: MultiTabBannerProps) {
  if (!showBanner) return null;

  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-2 bg-amber-500/15 border-b border-amber-500/30"
      role="alert"
      data-ocid="multitab.banner"
    >
      <p className="text-xs text-amber-400 font-medium">
        Record updated in another tab — refresh to see the latest changes.
      </p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 gap-1"
          onClick={() => window.location.reload()}
          data-ocid="multitab.refresh_button"
        >
          <RefreshCw className="h-3 w-3" /> Refresh
        </Button>
        <button
          type="button"
          aria-label="Dismiss banner"
          className="text-amber-400/60 hover:text-amber-400 transition-colors"
          onClick={dismiss}
          data-ocid="multitab.close_button"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
