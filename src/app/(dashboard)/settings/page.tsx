"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Key, LogOut, Save, CheckCircle, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import { ROLE_LABELS } from "@/src/types";
import { initials } from "@/src/lib/utils";

type Tab = "profile" | "security" | "notifications" | "appearance";

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? "bg-blue-600" : "bg-slate-200"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? "left-5" : "left-0.5"}`} />
  </button>
);

export default function SettingsPage() {
  const { user, role, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "+254700000000",
    timezone: "Africa/Nairobi",
  });

  const [notifPrefs, setNotifPrefs] = useState({
    amlAlerts: true, kycApprovals: true, largeTransactions: true,
    systemAlerts: true, loginAlerts: true, dailyReport: false,
    weeklyDigest: true, email: true, push: true, slack: false,
  });

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "profile", label: "Profile", icon: User },
    { key: "security", label: "Security", icon: Shield },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="page-header">
        <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Account, security & preferences</p></div>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg text-sm font-semibold animate-fade-in">
            <CheckCircle className="w-4 h-4" /> Saved
          </div>
        )}
      </div>

      {/* Profile card */}
      <div className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm mb-5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-xl font-black">
          {initials(user?.name ?? "A")}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg">{user?.name}</p>
          <p className="text-sm text-slate-500">{role ? ROLE_LABELS[role] : ""} · {user?.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge-success badge">Active</span>
            <span className={`badge ${user?.is2FAEnabled ? "badge-success" : "badge-danger"}`}>2FA {user?.is2FAEnabled ? "ON" : "OFF"}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="card-section p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ label: "Full Name", key: "name", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Phone", key: "phone", type: "tel" }, { label: "Timezone", key: "timezone", type: "text" }].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                <input type={f.type} value={profile[f.key as keyof typeof profile]} onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={save} className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-4">
          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Current Password</label>
                <div className="relative">
                  <input type={showOldPwd ? "text" : "password"} className="w-full border border-slate-200 rounded-lg px-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onClick={() => setShowOldPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showOldPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">New Password</label>
                <div className="relative">
                  <input type={showNewPwd ? "text" : "password"} className="w-full border border-slate-200 rounded-lg px-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onClick={() => setShowNewPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                <input type="password" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">Update Password</button>
            </div>
          </div>

          <div className="card-section p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800">Two-Factor Authentication</h3>
                <p className="text-xs text-slate-500 mt-0.5">Using Google Authenticator / Authy</p>
              </div>
              <span className={`badge ${user?.is2FAEnabled ? "badge-success" : "badge-danger"}`}>{user?.is2FAEnabled ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex gap-2">
              <button className="text-sm font-semibold border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"><Key className="w-4 h-4" /> Regenerate Backup Codes</button>
              <button className="text-sm font-semibold border border-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50">Reconfigure 2FA</button>
            </div>
          </div>

          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-3">Danger Zone</h3>
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl">
              <div>
                <p className="font-semibold text-red-800 text-sm">Sign out all sessions</p>
                <p className="text-xs text-red-600 mt-0.5">Terminates all active admin sessions immediately</p>
              </div>
              <button onClick={logout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                <LogOut className="w-4 h-4" /> Sign out all
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="space-y-4">
          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-4">Alert Types</h3>
            <div className="space-y-3">
              {[
                { key: "amlAlerts", label: "AML Alerts", desc: "Suspicious transaction and pattern alerts" },
                { key: "kycApprovals", label: "KYC Submissions", desc: "New KYC awaiting review" },
                { key: "largeTransactions", label: "Large Transactions", desc: "Transactions exceeding threshold" },
                { key: "systemAlerts", label: "System Alerts", desc: "API downtime, high error rates" },
                { key: "loginAlerts", label: "Login Alerts", desc: "Logins from new IPs or devices" },
                { key: "dailyReport", label: "Daily Report", desc: "End-of-day performance summary" },
                { key: "weeklyDigest", label: "Weekly Digest", desc: "Weekly KPI and growth summary" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-2">
                  <div><p className="text-sm font-semibold text-slate-800">{n.label}</p><p className="text-xs text-slate-500">{n.desc}</p></div>
                  <Toggle value={notifPrefs[n.key as keyof typeof notifPrefs] as boolean} onChange={() => setNotifPrefs((p) => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))} />
                </div>
              ))}
            </div>
          </div>

          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-4">Delivery Channels</h3>
            <div className="space-y-3">
              {[{ key: "email", label: "Email" }, { key: "push", label: "Browser Push" }, { key: "slack", label: "Slack" }].map((ch) => (
                <div key={ch.key} className="flex items-center justify-between py-2">
                  <p className="text-sm font-semibold text-slate-800">{ch.label}</p>
                  <Toggle value={notifPrefs[ch.key as keyof typeof notifPrefs] as boolean} onChange={() => setNotifPrefs((p) => ({ ...p, [ch.key]: !p[ch.key as keyof typeof p] }))} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={save} className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800"><Save className="w-4 h-4" /> Save</button>
          </div>
        </div>
      )}

      {tab === "appearance" && (
        <div className="space-y-4">
          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-4">Theme</h3>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              {[{ value: "light" as const, label: "Light", icon: Sun }, { value: "dark" as const, label: "Dark", icon: Moon }].map((t) => (
                <button key={t.value} onClick={() => setTheme(t.value)} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === t.value ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <t.icon className={`w-6 h-6 ${theme === t.value ? "text-blue-600" : "text-slate-400"}`} />
                  <span className={`text-sm font-semibold ${theme === t.value ? "text-blue-700" : "text-slate-600"}`}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-4">Display Preferences</h3>
            <div className="space-y-3">
              {["Compact data tables", "Show row numbers", "Animate charts", "Show KES symbol prefix"].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <p className="text-sm font-semibold text-slate-800">{p}</p>
                  <button className="relative w-10 h-5 rounded-full bg-slate-200 shrink-0">
                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
