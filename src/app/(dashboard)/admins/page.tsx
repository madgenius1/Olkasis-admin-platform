"use client";

import { useState } from "react";
import { Users, Plus, Shield, CheckCircle, XCircle, Key, Globe, Trash2, Edit } from "lucide-react";
import { MOCK_ADMIN_USERS } from "@/src/lib/mockData";
import { ROLE_LABELS } from "@/src/types";
import type { AdminUser, AdminRole } from "@/src/types";
import { relativeTime, initials } from "@/src/lib/utils";

const ROLE_COLOR: Record<AdminRole, string> = {
  super_admin: "bg-purple-100 text-purple-800 border-purple-200",
  compliance: "bg-blue-100 text-blue-800 border-blue-200",
  customer_support: "bg-emerald-100 text-emerald-800 border-emerald-200",
  operations: "bg-amber-100 text-amber-800 border-amber-200",
  marketing: "bg-pink-100 text-pink-800 border-pink-200",
  data_analyst: "bg-slate-100 text-slate-700 border-slate-200",
};

const IP_WHITELIST = [
  { id: "IP001", address: "192.168.1.0/24", label: "Office Network", addedBy: "Sarah Kimani", addedAt: "2024-01-01" },
  { id: "IP002", address: "197.232.12.88", label: "Jane VPN", addedBy: "Sarah Kimani", addedAt: "2025-06-15" },
  { id: "IP003", address: "196.201.214.0/24", label: "Ops Team VPN", addedBy: "Mike Ops", addedAt: "2025-08-20" },
];

const ACTIVE_SESSIONS = [
  { adminName: "Sarah Kimani", role: "super_admin" as AdminRole, ip: "192.168.1.100", device: "Chrome / macOS", location: "Nairobi, KE", since: "2026-04-16T08:00:00Z" },
  { adminName: "Jane Compliance", role: "compliance" as AdminRole, ip: "192.168.1.101", device: "Firefox / Windows", location: "Nairobi, KE", since: "2026-04-16T07:45:00Z" },
  { adminName: "Tom Support", role: "customer_support" as AdminRole, ip: "192.168.1.102", device: "Chrome / macOS", location: "Nairobi, KE", since: "2026-04-16T09:00:00Z" },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [tab, setTab] = useState<"admins" | "ip" | "sessions">("admins");
  const [showInvite, setShowInvite] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<AdminRole>("customer_support");

  function toggleStatus(id: string) {
    setAdmins((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === "active" ? "suspended" : "active" } : a));
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Admin Management</h1><p className="page-subtitle">Admin users, roles, IP whitelisting & session management</p></div>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Invite Admin
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Admins", value: admins.length, icon: Users },
          { label: "Active", value: admins.filter(a => a.status === "active").length, icon: CheckCircle },
          { label: "2FA Enabled", value: admins.filter(a => a.is2FAEnabled).length, icon: Shield },
          { label: "Active Sessions", value: ACTIVE_SESSIONS.length, icon: Globe },
        ].map((k) => (
          <div key={k.label} className="stat-card">
            <div className="stat-icon-wrap bg-blue-50 text-blue-700"><k.icon className="w-5 h-5" /></div>
            <div><p className="stat-label">{k.label}</p><p className="stat-value text-2xl">{k.value}</p></div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {[{ key: "admins" as const, label: "Admin Users" }, { key: "ip" as const, label: "IP Whitelist" }, { key: "sessions" as const, label: "Active Sessions" }].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "admins" && (
        <div className="card-section overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Admin</th><th>Role</th><th>Status</th><th>2FA</th><th>Last Login</th><th>IP</th><th>Actions</th></tr></thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">{initials(admin.name)}</div>
                      <div><p className="font-semibold text-slate-800">{admin.name}</p><p className="text-xs text-slate-500">{admin.email}</p></div>
                    </div>
                  </td>
                  <td><span className={`badge border ${ROLE_COLOR[admin.role]}`}>{ROLE_LABELS[admin.role]}</span></td>
                  <td><span className={`badge ${admin.status === "active" ? "badge-success" : admin.status === "suspended" ? "badge-danger" : "badge-neutral"}`}>{admin.status}</span></td>
                  <td>{admin.is2FAEnabled ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-400" />}</td>
                  <td className="text-xs text-slate-500 font-mono">{relativeTime(admin.lastLogin)}</td>
                  <td className="font-mono text-xs text-slate-500">{admin.ipAddress}</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-amber-600 transition-colors"><Key className="w-3.5 h-3.5" /></button>
                      {admin.role !== "super_admin" && (
                        <button onClick={() => toggleStatus(admin.id)} className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${admin.status === "active" ? "text-amber-700 hover:bg-amber-50" : "text-emerald-700 hover:bg-emerald-50"}`}>
                          {admin.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "ip" && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 flex items-start gap-2">
            <Shield className="w-4 h-4 mt-0.5 shrink-0" />
            <p>Only listed IP addresses and ranges can access the admin panel. Changes take effect immediately.</p>
          </div>
          <div className="card-section">
            <div className="card-section-header">
              <h3 className="card-section-title">Whitelisted IPs</h3>
              <button className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:text-blue-800"><Plus className="w-3.5 h-3.5" /> Add IP</button>
            </div>
            <table className="data-table">
              <thead><tr><th>IP / Range</th><th>Label</th><th>Added By</th><th>Date</th><th>Action</th></tr></thead>
              <tbody>
                {IP_WHITELIST.map((ip) => (
                  <tr key={ip.id}>
                    <td className="font-mono font-semibold text-blue-700">{ip.address}</td>
                    <td className="font-semibold text-slate-800">{ip.label}</td>
                    <td className="text-slate-500">{ip.addedBy}</td>
                    <td className="font-mono text-xs text-slate-500">{ip.addedAt}</td>
                    <td><button className="text-xs text-red-500 font-semibold hover:text-red-700 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "sessions" && (
        <div className="card-section overflow-x-auto">
          <div className="card-section-header">
            <h3 className="card-section-title">Active Sessions</h3>
            <div className="live-badge"><span className="live-dot" />Live</div>
          </div>
          <table className="data-table">
            <thead><tr><th>Admin</th><th>Role</th><th>IP</th><th>Device</th><th>Location</th><th>Since</th><th>Action</th></tr></thead>
            <tbody>
              {ACTIVE_SESSIONS.map((s, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{initials(s.adminName)}</div>
                      <span className="font-semibold text-slate-800">{s.adminName}</span>
                    </div>
                  </td>
                  <td><span className={`badge border ${ROLE_COLOR[s.role]}`}>{ROLE_LABELS[s.role]}</span></td>
                  <td className="font-mono text-xs">{s.ip}</td>
                  <td className="text-xs text-slate-500">{s.device}</td>
                  <td className="text-xs text-slate-500">{s.location}</td>
                  <td className="text-xs text-slate-500">{relativeTime(s.since)}</td>
                  <td><button className="text-xs font-semibold text-red-500 hover:text-red-700">Force Logout</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showInvite && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Invite Admin User</h2>
            <p className="text-sm text-slate-500 mb-5">They'll receive an email to set up their account and 2FA.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="admin@zanari.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Role</label>
                <select value={newRole} onChange={(e) => setNewRole(e.target.value as AdminRole)} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {(Object.entries(ROLE_LABELS) as [AdminRole, string][]).filter(([k]) => k !== "super_admin").map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                ⚠ 2FA will be mandatory. Invite expires in 48 hours.
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowInvite(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowInvite(false)} className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
