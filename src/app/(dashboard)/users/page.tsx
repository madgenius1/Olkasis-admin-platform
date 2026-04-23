"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Users, UserCheck, UserX, Clock, Download } from "lucide-react";
import { MOCK_USERS } from "@/src/lib/mockData";
import { formatKES, formatNumber, relativeTime, initials } from "@/src/lib/utils";
import { KYC_BADGE, STATUS_BADGE } from "@/src/types";
import type { AccountStatus, KYCStatus } from "@/src/types";

type StatusFilter = "all" | AccountStatus;
type KYCFilter = "all" | KYCStatus;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [kycFilter, setKycFilter] = useState<KYCFilter>("all");

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.OlkasisId.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchStatus = statusFilter === "all" || u.accountStatus === statusFilter;
    const matchKYC = kycFilter === "all" || u.kycStatus === kycFilter;
    return matchSearch && matchStatus && matchKYC;
  });

  const stats = [
    { label: "Total Users", value: formatNumber(48291), icon: Users, color: "bg-blue-50 text-blue-700" },
    { label: "Active", value: formatNumber(42840), icon: UserCheck, color: "bg-emerald-50 text-emerald-700" },
    { label: "KYC Pending", value: "24", icon: Clock, color: "bg-amber-50 text-amber-700" },
    { label: "Suspended", value: "18", icon: UserX, color: "bg-red-50 text-red-700" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Directory</h1>
          <p className="page-subtitle">Search, filter and manage all platform users</p>
        </div>
        <div className="flex gap-2">
          <Link href="/users/waitlist" className="flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            Waitlist
          </Link>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon-wrap ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, ID…"
            className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
          />
        </div>
        <select
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={kycFilter} onChange={(e) => setKycFilter(e.target.value as KYCFilter)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none bg-white"
        >
          <option value="all">All KYC</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="not_started">Not Started</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-section">
        <div className="card-section-header">
          <h3 className="card-section-title">Users ({filtered.length})</h3>
          <span className="text-xs text-slate-500">Showing mock data · {filtered.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Zanari ID</th>
                <th>Account</th>
                <th>KYC</th>
                <th>Status</th>
                <th>Portfolio</th>
                <th>Wallet</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {initials(u.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-xs text-blue-700 font-semibold">{u.OlkasisId}</td>
                  <td>
                    <span className="badge-neutral badge capitalize">{u.accountType}</span>
                  </td>
                  <td>
                    <span className={`${KYC_BADGE[u.kycStatus]} badge capitalize`}>{u.kycStatus.replace("_", " ")}</span>
                  </td>
                  <td>
                    <span className={`${STATUS_BADGE[u.accountStatus]} badge capitalize`}>{u.accountStatus}</span>
                  </td>
                  <td className="font-mono font-semibold text-sm">{formatKES(u.portfolio.totalValue, true)}</td>
                  <td className="font-mono text-sm">{formatKES(u.wallet.checkIn + u.wallet.account, true)}</td>
                  <td className="text-xs text-slate-500">{relativeTime(u.lastActive)}</td>
                  <td>
                    <Link href={`/users/${u.id}`} className="text-xs text-blue-600 font-semibold hover:text-blue-800">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
