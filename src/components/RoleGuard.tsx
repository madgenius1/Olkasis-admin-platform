"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { canAccess } from "../lib/permissions";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

interface RoleGuardProps {
  children: ReactNode;
}

/**
 * RoleGuard — wraps any page that requires a specific permission.
 *
 * Usage (inside a page component):
 *   <RoleGuard><PageContent /></RoleGuard>
 *
 * It reads the current pathname and the authenticated user's role,
 * then either renders children or shows an access-denied screen.
 *
 * Note: coarse-grained route protection is already handled by
 * middleware.ts (unauthenticated redirect). RoleGuard provides the
 * fine-grained RBAC layer on top of that.
 */
export default function RoleGuard({ children }: RoleGuardProps) {
  const { isAuthenticated, role } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  // Not yet hydrated / redirecting
  if (!isAuthenticated || !role) return null;

  // Role does not have access to this path
  if (!canAccess(role, pathname)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            Your role does not have permission to view this page. Contact a
            Super Admin if you believe this is an error.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}