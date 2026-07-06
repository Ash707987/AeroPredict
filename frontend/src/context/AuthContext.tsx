import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getMe } from "../services/authService";
import type { User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setSession: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("aeropredict_token"));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getMe();
        if (mounted) setUser(currentUser);
      } catch {
        localStorage.removeItem("aeropredict_token");
        if (mounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      setSession: (nextToken) => {
        localStorage.setItem("aeropredict_token", nextToken);
        setToken(nextToken);
      },
      logout: () => {
        localStorage.removeItem("aeropredict_token");
        setToken(null);
        setUser(null);
      }
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
