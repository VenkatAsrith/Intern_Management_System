import { useBackend } from "@/lib/backend";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "tmtims_session";
const DISPLAY_KEY = "tmtims_display";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionToken: string | null;
  displayName: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

function readSession(): { token: string; display: string } | null {
  try {
    const token = localStorage.getItem(SESSION_KEY);
    const display = localStorage.getItem(DISPLAY_KEY);
    if (token && display) return { token, display };
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
          // Session still valid — keep it, update displayName from server
          setDisplayName(result.ok.displayName);
          localStorage.setItem(DISPLAY_KEY, result.ok.displayName);
        } else {
          // Session expired/invalid — clear it
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(DISPLAY_KEY);
          setSessionToken(null);
          setDisplayName(null);
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
        localStorage.setItem(SESSION_KEY, result.ok.sessionToken);
        localStorage.setItem(DISPLAY_KEY, result.ok.displayName);
        setSessionToken(result.ok.sessionToken);
        setDisplayName(result.ok.displayName);
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
    setSessionToken(null);
    setDisplayName(null);
    if (actor && token) {
      try {
        await actor.logout(token);
      } catch {
        // ignore logout errors
      }
    }
  }, [actor, sessionToken]);

  return {
    isAuthenticated: !!sessionToken,
    isLoading,
    sessionToken,
    displayName,
    login,
    logout,
  };
}
