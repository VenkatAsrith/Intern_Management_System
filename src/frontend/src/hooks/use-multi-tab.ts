import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "record-updated";

export function triggerCrossTabUpdate(recordId: string): void {
  localStorage.setItem(STORAGE_KEY, `${recordId}:${Date.now()}`);
}

export function useMultiTab(): {
  showBanner: boolean;
  updatedId: string | null;
  dismiss: () => void;
} {
  const [showBanner, setShowBanner] = useState(false);
  const [updatedId, setUpdatedId] = useState<string | null>(null);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      const [id] = e.newValue.split(":");
      setUpdatedId(id ?? null);
      setShowBanner(true);
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const dismiss = useCallback(() => {
    setShowBanner(false);
    setUpdatedId(null);
  }, []);

  return { showBanner, updatedId, dismiss };
}
