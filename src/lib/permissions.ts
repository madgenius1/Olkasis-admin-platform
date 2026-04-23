import type { AdminRole } from "../types";

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["*"],
  compliance: [
    "/dashboard", "/users", "/kyc", "/compliance",
    "/compliance/aml-alerts", "/compliance/audit-logs", "/compliance/str",
    "/reports", "/reports/financial", "/reports/trading", "/reports/regulatory",
    "/admins",
  ],
  customer_support: [
    "/dashboard", "/users", "/support", "/support/tickets", "/support/live-chat",
    "/p2p", "/p2p/disputes", "/wallets", "/wallets/transactions",
  ],
  operations: [
    "/dashboard", "/users", "/trading", "/trading/orders", "/trading/holdings",
    "/trading/market-data", "/trading/derivatives", "/wallets", "/wallets/transactions",
    "/p2p", "/p2p/disputes", "/reports", "/reports/financial", "/reports/trading",
    "/risk", "/system", "/system/performance",
  ],
  marketing: [
    "/dashboard", "/users", "/marketing", "/content", "/content/learning",
    "/reports", "/reports/financial",
  ],
  data_analyst: [
    "/dashboard", "/reports", "/reports/financial", "/reports/trading",
    "/reports/regulatory", "/users", "/marketing", "/risk",
  ],
};

export function canAccess(role: AdminRole, path: string): boolean {
  const perms = ROLE_PERMISSIONS[role];
  if (perms.includes("*")) return true;
  return perms.some((perm) => {
    if (perm === path) return true;
    const regex = new RegExp("^" + perm.replace(/:[^/]+/g, "[^/]+") + "$");
    return regex.test(path);
  });
}
