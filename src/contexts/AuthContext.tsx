"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { AdminUser, AdminRole } from "../types";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AdminUser | null;
  role: AdminRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER: AdminUser = {
  id: "ADM001",
  name: "Sarah Kimani",
  email: "sarah.k@zanari.com",
  role: "super_admin",
  lastLogin: new Date().toISOString(),
  ipAddress: "192.168.1.100",
  is2FAEnabled: true,
  status: "active",
  createdAt: "2023-01-01",
  permissions: ["*"],
};

function setCookie(name: string, value: string, hours = 8) {
  const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = sessionStorage.getItem("zanari_admin_user");
      return stored ? (JSON.parse(stored) as AdminUser) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const loggedInUser: AdminUser = { ...DEMO_USER, email };
    setUser(loggedInUser);
    sessionStorage.setItem("zanari_admin_user", JSON.stringify(loggedInUser));
    // Set cookie so middleware can validate the session
    setCookie("zanari_admin_session", loggedInUser.id);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("zanari_admin_user");
    deleteCookie("zanari_admin_session");
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: user !== null,
        user,
        role: user?.role ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
