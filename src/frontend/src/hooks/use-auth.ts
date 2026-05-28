import { useBackend } from "@/lib/backend";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "tmtims_session";
const DISPLAY_KEY = "tmtims_display";
const ROLE_KEY = "tmtims_role";
const PERMISSIONS_KEY = "tmtims_permissions";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionToken: string | null;
  displayName: string | null;
  role: string;
  permissions: string[];
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

function readSession(): {
  token: string;
  display: string;
  role: string;
  permissions: string[];
} | null {
  try {
    const token = localStorage.getItem(SESSION_KEY);
    const display = localStorage.getItem(DISPLAY_KEY);
    if (token && display) {
      const role = localStorage.getItem(ROLE_KEY) ?? "";
      let permissions: string[] = [];
      try {
        permissions = JSON.parse(localStorage.getItem(PERMISSIONS_KEY) ?? "[]");
      } catch {
        permissions = [];
      }
      return { token, display, role, permissions };
    }
  } catch {
    // localStorage not available
  }
  return null;
}

export function useAuth(): AuthState {
  const { actor, isFetching } = useBackend();
  const saved = readSession();

  // Start in loading state when there's a saved session to validate
  const [sessionToken, setSessionToken] = useState<string | null>(
    saved?.token ?? null,
  );
  const [displayName, setDisplayName] = useState<string | null>(
    saved?.display ?? null,
  );
  const [role, setRole] = useState<string>(saved?.role ?? "");
  const [permissions, setPermissions] = useState<string[]>(
    saved?.permissions ?? [],
  );
  // Loading = true only while actor is fetching or while we're validating a saved session
  const [isLoading, setIsLoading] = useState(() => !!saved?.token);
  const validated = useRef(false);

  // Validate saved session once actor is available
  useEffect(() => {
    if (!actor || isFetching || validated.current) return;
    const storedToken = saved?.token;
    if (!storedToken) {
      setIsLoading(false);
      validated.current = true;
      return;
    }
    validated.current = true;
    actor
      .validateSession(storedToken)
      .then((result) => {
        if (result.__kind__ === "ok") {
          // Session still valid — keep it, update from server
          setDisplayName(result.ok.displayName);
          setRole(result.ok.role ?? "");
          const perms = result.ok.permissions ?? [];
          setPermissions(perms);
          localStorage.setItem(DISPLAY_KEY, result.ok.displayName);
          localStorage.setItem(ROLE_KEY, result.ok.role ?? "");
          localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(perms));
        } else {
          // Session expired/invalid — clear it
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(DISPLAY_KEY);
          localStorage.removeItem(ROLE_KEY);
          localStorage.removeItem(PERMISSIONS_KEY);
          setSessionToken(null);
          setDisplayName(null);
          setRole("");
          setPermissions([]);
        }
      })
      .catch(() => {
        // Network error — keep local session, don't clear
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [actor, isFetching, saved?.token]);

  const login = useCallback(
    async (username: string, password: string) => {
      if (!actor) throw new Error("Not connected");
      setIsLoading(true);
      try {
        const result = await actor.login(username, password);
        if (result.__kind__ === "err")
          throw new Error("Invalid username or password");
        const perms = result.ok.permissions ?? [];
        localStorage.setItem(SESSION_KEY, result.ok.sessionToken);
        localStorage.setItem(DISPLAY_KEY, result.ok.displayName);
        localStorage.setItem(ROLE_KEY, result.ok.role ?? "");
        localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(perms));
        setSessionToken(result.ok.sessionToken);
        setDisplayName(result.ok.displayName);
        setRole(result.ok.role ?? "");
        setPermissions(perms);
      } finally {
        setIsLoading(false);
      }
    },
    [actor],
  );

  const logout = useCallback(async () => {
    const token = sessionToken;
    // Clear state immediately for snappy UX
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(DISPLAY_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(PERMISSIONS_KEY);
    setSessionToken(null);
    setDisplayName(null);
    setRole("");
    setPermissions([]);
    if (actor && token) {
      try {
        await actor.logout(token);
      } catch {
        // ignore logout errors
      }
    }
  }, [actor, sessionToken]);

  const hasPermission = useCallback(
    (permission: string) => permissions.includes(permission),
    [permissions],
  );

  const isAdmin = useCallback(
    () => role === "superAdmin" || role === "admin",
    [role],
  );

  const isSuperAdmin = useCallback(() => role === "superAdmin", [role]);

  return {
    isAuthenticated: !!sessionToken,
    isLoading,
    sessionToken,
    displayName,
    role,
    permissions,
    login,
    logout,
    hasPermission,
    isAdmin,
    isSuperAdmin,
  };
}
