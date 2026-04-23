"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, User, Wallet, TrendingUp, Clock, Shield,
  MessageSquare, Phone, Mail, MapPin, Ban, RefreshCw,
  LogOut, Bell, Edit, Flag,
} from "lucide-react";
import { MOCK_USERS } from "@/lib/mockData";
import { formatKES, formatNumber, relativeTime, initials } from "@/lib/utils";
import { KYC_BADGE, STATUS_BADGE } from "@/types";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const user = MOCK_USERS.find((u) => u.id === params.id) ?? MOCK_USERS[0];

  const infoRows = [
    { label: "Full Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Date of Birth", value: user.dob },
    { label: "Gender", value: user.gender },
    { label: "Nationality", value: user.nationality },
    { label: "Address", value: `${user.address.street}, ${user.address.city}, ${user.address.county}` },
    { label: "CDSC Number", value: user.cdscNumber ?? "—" },
    { label: "Device OS", value: user.deviceOS ?? "—" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/users" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Users
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-semibold text-slate-800">{user.name}</span>
      </div>

      {/* Hero */}
      <div className="card-section p-6 mb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-2xl font-black shrink-0">
            {initials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
              <span className={`${STATUS_BADGE[user.accountStatus]} badge capitalize`}>{user.accountStatus}</span>
              <span className={`${KYC_BADGE[user.kycStatus]} badge capitalize`}>{user.kycStatus.replace("_", " ")}</span>
              <span className="badge-neutral badge capitalize">{user.accountType}</span>
            </div>
            <p className="text-sm text-slate-500">{user.email} · {user.phone}</p>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{user.zanariId} · Joined {new Date(user.registeredAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Suspend", icon: Ban, cls: "text-red-600 border-red-200 hover:bg-red-50" },
              { label: "Reset PIN", icon: RefreshCw, cls: "text-amber-600 border-amber-200 hover:bg-amber-50" },
              { label: "Force Logout", icon: LogOut, cls: "text-slate-600 border-slate-200 hover:bg-slate-50" },
              { label: "Notify", icon: Bell, cls: "text-blue-600 border-blue-200 hover:bg-blue-50" },
            ].map((a) => (
              <button key={a.label} className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${a.cls}`}>
                <a.icon className="w-3.5 h-3.5" /> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Portfolio Value", value: formatKES(user.portfolio.totalValue, true), sub: `P&L: ${user.portfolio.pnl >= 0 ? "+" : ""}${formatKES(user.portfolio.pnl, true)}`, good: user.portfolio.pnl >= 0 },
          { label: "Check-In Wallet", value: formatKES(user.wallet.checkIn, true), sub: `Held: ${formatKES(user.wallet.held, true)}` },
          { label: "Account Wallet", value: formatKES(user.wallet.account, true), sub: `Pending: ${formatKES(user.wallet.pending, true)}` },
          { label: "Total Trades", value: formatNumber(user.totalTrades), sub: `Deposits: ${formatKES(user.totalDeposits, true)}` },
        ].map((s) => (
          <div key={s.label} className="kpi-card">
            <p className="stat-label">{s.label}</p>
            <p className="kpi-value text-lg">{s.value}</p>
            <p className={`text-xs font-semibold mt-1 ${s.good === false ? "text-red-500" : "text-slate-500"}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Personal info */}
        <div className="card-section lg:col-span-1">
          <div className="card-section-header">
            <h3 className="card-section-title">Personal Information</h3>
            <button className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"><Edit className="w-3 h-3" /> Edit</button>
          </div>
          <div className="divide-y divide-slate-50">
            {infoRows.map((r) => (
              <div key={r.label} className="flex justify-between px-5 py-2.5 text-sm">
                <span className="text-slate-500 font-medium shrink-0 mr-4">{r.label}</span>
                <span className="text-slate-800 font-semibold text-right">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance + login history */}
        <div className="lg:col-span-2 space-y-4">
          {/* Compliance */}
          <div className="card-section">
            <div className="card-section-header">
              <h3 className="card-section-title">Compliance</h3>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-100 px-2">
              {[
                { label: "Flags", value: user.complianceFlags, bad: user.complianceFlags > 0 },
                { label: "Open Tickets", value: user.openTickets, bad: user.openTickets > 0 },
                { label: "Risk Profile", value: user.riskProfile, bad: false },
              ].map((c) => (
                <div key={c.label} className="text-center py-4">
                  <p className={`text-2xl font-black font-mono ${c.bad ? "text-red-600" : "text-slate-800"}`}>{c.value}</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 uppercase tracking-wide">{c.label}</p>
                </div>
              ))}
            </div>
            <div className="px-5 pb-4 flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                <Flag className="w-3.5 h-3.5" /> Add Flag
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> Add Note
              </button>
              <Link href="/kyc" className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors">
                <Shield className="w-3.5 h-3.5" /> View KYC
              </Link>
            </div>
          </div>

          {/* Login history */}
          <div className="card-section">
            <div className="card-section-header">
              <h3 className="card-section-title">Login History</h3>
            </div>
            {user.loginHistory.length > 0 ? (
              <table className="data-table">
                <thead><tr><th>Time</th><th>Device</th><th>Location</th><th>IP</th><th>Result</th></tr></thead>
                <tbody>
                  {user.loginHistory.map((l, i) => (
                    <tr key={i}>
                      <td className="font-mono text-xs">{relativeTime(l.timestamp)}</td>
                      <td className="text-xs">{l.device}</td>
                      <td className="text-xs">{l.location}</td>
                      <td className="font-mono text-xs">{l.ip}</td>
                      <td><span className={`badge ${l.success ? "badge-success" : "badge-danger"}`}>{l.success ? "Success" : "Failed"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state text-slate-400 text-sm">No login history available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
