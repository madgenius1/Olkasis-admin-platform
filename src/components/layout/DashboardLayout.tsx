"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import {
  LayoutDashboard, Users, ShieldCheck, TrendingUp, Wallet, ArrowLeftRight,
  HeadphonesIcon, BookOpen, Bot, BarChart3, Megaphone, ShieldAlert,
  Settings, LogOut, ChevronDown, ChevronRight, Menu, X, Bell,
  Sun, Moon, Search, UserCog, FileCheck, FileWarning, FileLock,
  CandlestickChart, Package, Layers, Banknote, AlertCircle, MessageSquare,
  GraduationCap, Newspaper, Activity, ClipboardList, Users2, ListChecks,
  Siren, BookMarked, LineChart, PieChart, Boxes, ToggleLeft,
} from "lucide-react";
import { initials } from "@/src/lib/utils";
import { ROLE_LABELS } from "@/src/types";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavItem[];
  badge?: string | number;
  badgeVariant?: "danger" | "warning" | "info";
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "Users", icon: Users, children: [
      { label: "User Directory", icon: Users2, href: "/users" },
      { label: "Waitlist", icon: ListChecks, href: "/users/waitlist" },
    ],
  },
  {
    label: "KYC", icon: FileCheck, children: [
      { label: "Review Queue", icon: ClipboardList, href: "/kyc", badge: 24, badgeVariant: "warning" },
      { label: "KYC Review", icon: FileCheck, href: "/kyc/review/KYC001" },
    ],
  },
  {
    label: "Compliance", icon: ShieldCheck, children: [
      { label: "Overview", icon: ShieldCheck, href: "/compliance" },
      { label: "AML Alerts", icon: Siren, href: "/compliance/aml-alerts", badge: 7, badgeVariant: "danger" },
      { label: "Audit Logs", icon: FileLock, href: "/compliance/audit-logs" },
      { label: "STR Reports", icon: FileWarning, href: "/compliance/str" },
    ],
  },
  {
    label: "Trading", icon: TrendingUp, children: [
      { label: "Overview", icon: CandlestickChart, href: "/trading" },
      { label: "Orders", icon: ClipboardList, href: "/trading/orders" },
      { label: "Holdings", icon: Package, href: "/trading/holdings" },
      { label: "Market Data", icon: LineChart, href: "/trading/market-data" },
      { label: "Derivatives", icon: Layers, href: "/trading/derivatives" },
    ],
  },
  {
    label: "Wallets", icon: Wallet, children: [
      { label: "Overview", icon: Wallet, href: "/wallets" },
      { label: "Transactions", icon: Banknote, href: "/wallets/transactions" },
    ],
  },
  {
    label: "P2P Transfers", icon: ArrowLeftRight, children: [
      { label: "Transfers", icon: ArrowLeftRight, href: "/p2p" },
      { label: "Disputes", icon: AlertCircle, href: "/p2p/disputes", badge: 2, badgeVariant: "warning" },
    ],
  },
  {
    label: "Support", icon: HeadphonesIcon, children: [
      { label: "Overview", icon: HeadphonesIcon, href: "/support" },
      { label: "Tickets", icon: MessageSquare, href: "/support/tickets" },
      { label: "Live Chat", icon: MessageSquare, href: "/support/live-chat" },
    ],
  },
  {
    label: "Content", icon: BookOpen, children: [
      { label: "News & Media", icon: Newspaper, href: "/content" },
      { label: "Learning Hub", icon: GraduationCap, href: "/content/learning" },
    ],
  },
  { label: "Rafiki AI", icon: Bot, href: "/rafiki" },
  {
    label: "Reports", icon: BarChart3, children: [
      { label: "Overview", icon: BarChart3, href: "/reports" },
      { label: "Financial", icon: PieChart, href: "/reports/financial" },
      { label: "Trading", icon: CandlestickChart, href: "/reports/trading" },
      { label: "Regulatory", icon: BookMarked, href: "/reports/regulatory" },
    ],
  },
  { label: "Marketing", icon: Megaphone, href: "/marketing" },
  { label: "Risk", icon: ShieldAlert, href: "/risk" },
  {
    label: "System", icon: Activity, children: [
      { label: "Configuration", icon: ToggleLeft, href: "/system" },
      { label: "Performance", icon: Activity, href: "/system/performance" },
    ],
  },
  { label: "Admins", icon: Boxes, href: "/admins" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

function NavItemRow({
  item,
  depth = 0,
  currentPath,
}: {
  item: NavItem;
  depth?: number;
  currentPath: string;
}) {
  const isActive = item.href
    ? currentPath === item.href || currentPath.startsWith(item.href + "/")
    : false;

  const hasActiveChild = item.children?.some(
    (c) => c.href && (currentPath === c.href || currentPath.startsWith(c.href + "/"))
  );

  const [open, setOpen] = useState<boolean>(hasActiveChild ?? false);

  const BadgePill = ({ v }: { v: NavItem["badge"]; variant: NavItem["badgeVariant"] }) =>
    v !== undefined ? (
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
        item.badgeVariant === "danger" ? "bg-red-500 text-white" :
        item.badgeVariant === "warning" ? "bg-amber-500 text-white" :
        "bg-blue-500 text-white"
      }`}>{v}</span>
    ) : null;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`sidebar-item w-full text-left ${hasActiveChild ? "active" : ""}`}
          style={{ paddingLeft: depth > 0 ? `${1 + depth * 0.75}rem` : undefined }}
        >
          <item.icon className="w-4 h-4 shrink-0" />
          <span className="flex-1 truncate">{item.label}</span>
          <BadgePill v={item.badge} variant={item.badgeVariant} />
          {open
            ? <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-60" />
            : <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />}
        </button>
        {open && (
          <div className="mt-0.5 space-y-0.5">
            {item.children.map((child) => (
              <NavItemRow key={child.label} item={child} depth={depth + 1} currentPath={currentPath} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      className={`sidebar-item ${isActive ? "active" : ""}`}
      style={{ paddingLeft: depth > 0 ? `${1.5 + depth * 0.75}rem` : undefined }}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      <BadgePill v={item.badge} variant={item.badgeVariant} />
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full flex flex-col transition-all duration-300
          lg:relative lg:translate-x-0
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "w-64" : "w-16"}`}
        style={{ backgroundColor: "var(--zanari-navy)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-white font-black text-sm">Z</span>
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-white font-black text-base leading-none tracking-tight">Zanari</p>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mt-0.5">Admin</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="ml-auto text-white/40 hover:text-white transition-colors hidden lg:block"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {sidebarOpen && <p className="sidebar-section-label mb-1">Navigation</p>}
          {NAV_ITEMS.map((item) =>
            sidebarOpen ? (
              <NavItemRow key={item.label} item={item} currentPath={pathname} />
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                title={item.label}
                className={`flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="w-4 h-4" />
              </Link>
            )
          )}
        </nav>

        {/* User footer */}
        {sidebarOpen ? (
          <div className="border-t border-white/10 p-3 shrink-0">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials(user?.name ?? "A")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
                <p className="text-white/40 text-[10px] truncate">{role ? ROLE_LABELS[role] : ""}</p>
              </div>
              <button onClick={logout} title="Logout" className="text-white/40 hover:text-white transition-colors">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-white/10 py-3 flex flex-col items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {initials(user?.name ?? "A")}
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 flex items-center gap-4 px-4 lg:px-6 h-14 shrink-0 shadow-sm">
          <button
            className="lg:hidden text-slate-600 hover:text-slate-900"
            onClick={() => setMobileSidebarOpen((o) => !o)}
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              placeholder="Search users, orders, tickets…"
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="live-badge hidden sm:flex">
              <span className="live-dot" /> Live
            </div>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button className="relative w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {initials(user?.name ?? "A")}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-slate-800 leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{role ? ROLE_LABELS[role] : ""}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
