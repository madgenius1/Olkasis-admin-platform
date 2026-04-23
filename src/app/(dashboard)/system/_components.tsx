"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ToggleLeft, ToggleRight, Activity, AlertTriangle, Settings, Clock, Banknote, TrendingUp, RefreshCw } from "lucide-react";
import { MOCK_FEATURE_FLAGS, MOCK_GLOBAL_LIMITS, MOCK_SYSTEM_METRICS, MOCK_SYSTEM_ALERTS } from "@/lib/mockData";
import { formatKES } from "@/lib/utils";
import type { FeatureFlag, GlobalLimit } from "@/types";

// ─── System Configuration ─────────────────────────────────────────
export function SystemConfig() {
  const [flags, setFlags] = useState<FeatureFlag[]>(MOCK_FEATURE_FLAGS);
  const [limits, setLimits] = useState<GlobalLimit[]>(MOCK_GLOBAL_LIMITS);
  const [tab, setTab] = useState<"flags" | "limits" | "hours" | "fees">("flags");

  const tabs = [
    { key: "flags" as const, label: "Feature Flags", icon: ToggleLeft },
    { key: "limits" as const, label: "Global Limits", icon: Banknote },
    { key: "hours" as const, label: "Trading Hours", icon: Clock },
    { key: "fees" as const, label: "Fee Structure", icon: TrendingUp },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">System Configuration</h1><p className="page-subtitle">Feature flags, limits, trading hours & fee structures</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50"><RefreshCw className="w-4 h-4" /> Reload</button>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800"><Settings className="w-4 h-4" /> Save Changes</button>
        </div>
      </div>

      {/* Maintenance mode */}
      <div className="flex items-center justify-between p-4 mb-5 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center"><Settings className="w-4 h-4 text-slate-600" /></div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Maintenance Mode</p>
            <p className="text-xs text-slate-500">Disables user-facing app while keeping admin access</p>
          </div>
        </div>
        <button className="flex items-center gap-2 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Enable Maintenance Mode</button>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit flex-wrap">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {tab === "flags" && (
        <div className="space-y-3">
          {(["trading", "payments", "ai", "social", "experimental"] as FeatureFlag["category"][]).map((cat) => {
            const catFlags = flags.filter((f) => f.category === cat);
            if (!catFlags.length) return null;
            return (
              <div key={cat} className="card-section">
                <div className="card-section-header">
                  <h3 className="card-section-title capitalize">{cat}</h3>
                  <span className="text-xs text-slate-500">{catFlags.filter(f => f.enabled).length}/{catFlags.length} enabled</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {catFlags.map((flag) => (
                    <div key={flag.id} className="flex items-center justify-between px-5 py-3.5">
                      <div className="min-w-0 flex-1 mr-4">
                        <p className="font-semibold text-slate-800 text-sm">{flag.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{flag.description}</p>
                        {flag.updatedBy && <p className="text-xs text-slate-400 mt-0.5">Updated by {flag.updatedBy}</p>}
                      </div>
                      <button
                        onClick={() => setFlags((prev) => prev.map((f) => f.id === flag.id ? { ...f, enabled: !f.enabled } : f))}
                        className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${flag.enabled ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"}`}
                      >
                        {flag.enabled ? <><ToggleRight className="w-4 h-4" /> Enabled</> : <><ToggleLeft className="w-4 h-4" /> Disabled</>}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "limits" && (
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">Global Transaction Limits</h3>
            <span className="text-xs text-amber-600 font-semibold">⚠ Changes apply platform-wide immediately</span>
          </div>
          <div className="p-5 space-y-6">
            {limits.map((limit) => (
              <div key={limit.id}>
                <div className="flex items-start justify-between mb-2">
                  <div><p className="font-semibold text-slate-800 text-sm">{limit.name}</p><p className="text-xs text-slate-500">{limit.description}</p></div>
                  <div className="text-right"><p className="font-mono font-bold text-blue-700">{formatKES(limit.value)}</p><p className="text-xs text-slate-400">Current value</p></div>
                </div>
                <input type="range" min={limit.min} max={limit.max} step={(limit.max - limit.min) / 100} value={limit.value}
                  onChange={(e) => setLimits((prev) => prev.map((l) => l.id === limit.id ? { ...l, value: Number(e.target.value) } : l))}
                  className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Min: {formatKES(limit.min, true)}</span><span>Max: {formatKES(limit.max, true)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "hours" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">NSE Trading Hours</h3></div>
            <div className="p-5 space-y-3">
              {[{ day: "Monday – Friday", open: "09:00", close: "15:00" }, { day: "Pre-market", open: "08:00", close: "09:00" }, { day: "After-hours", open: "15:00", close: "16:00" }].map((h) => (
                <div key={h.day} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <p className="font-semibold text-slate-800 text-sm">{h.day}</p>
                  <div className="flex items-center gap-2">
                    <input defaultValue={h.open} className="w-20 border border-slate-200 rounded px-2 py-1 text-xs font-mono text-center focus:outline-none" />
                    <span className="text-xs text-slate-400">—</span>
                    <input defaultValue={h.close} className="w-20 border border-slate-200 rounded px-2 py-1 text-xs font-mono text-center focus:outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">Trading Holidays 2026</h3><button className="text-xs text-blue-600 font-semibold hover:text-blue-800">+ Add</button></div>
            <div className="p-4 space-y-2">
              {[{ date: "2026-04-18", name: "Good Friday" }, { date: "2026-05-01", name: "Labour Day" }, { date: "2026-06-01", name: "Madaraka Day" }, { date: "2026-10-20", name: "Mashujaa Day" }, { date: "2026-12-12", name: "Jamhuri Day" }, { date: "2026-12-25", name: "Christmas Day" }].map((h) => (
                <div key={h.date} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded">{h.date}</span>
                    <span className="text-sm font-semibold text-slate-800">{h.name}</span>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-600 font-semibold">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "fees" && (
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">Fee Structure</h3>
            <span className="text-xs text-slate-500">Regulatory fees (NSE, CDSC) are fixed</span>
          </div>
          <table className="data-table">
            <thead><tr><th>Fee Name</th><th>Rate</th><th>Basis</th><th>Min</th><th>Max</th><th>Type</th><th>Action</th></tr></thead>
            <tbody>
              {[
                { name: "Brokerage Fee", value: "0.5%", basis: "Per trade", min: "KES 5", max: "—", editable: true },
                { name: "NSE Levy", value: "0.12%", basis: "Per trade", min: "—", max: "—", editable: false },
                { name: "CDSC Levy", value: "0.12%", basis: "Per trade", min: "—", max: "—", editable: false },
                { name: "P2P Transfer Fee", value: "0.1%", basis: "Per transfer", min: "KES 5", max: "KES 1,000", editable: true },
                { name: "Withdrawal Fee (M-Pesa)", value: "KES 30", basis: "Flat", min: "—", max: "—", editable: true },
                { name: "Withdrawal Fee (Bank)", value: "0.2%", basis: "Per withdrawal", min: "KES 200", max: "KES 2,000", editable: true },
              ].map((f) => (
                <tr key={f.name}>
                  <td className="font-semibold text-slate-800">{f.name}</td>
                  <td className="font-mono font-bold text-blue-700">{f.value}</td>
                  <td className="text-xs text-slate-500">{f.basis}</td>
                  <td className="font-mono text-xs">{f.min}</td>
                  <td className="font-mono text-xs">{f.max}</td>
                  <td>{f.editable ? <span className="badge-success badge">Editable</span> : <span className="badge-neutral badge">Fixed</span>}</td>
                  <td>{f.editable && <button className="text-xs text-blue-600 font-semibold hover:text-blue-800">Edit</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── System Performance ───────────────────────────────────────────
export function SystemPerformance() {
  const uptimeSeries = Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    api: 98 + Math.random() * 2,
    payment: 96 + Math.random() * 4,
    trading: 99 + Math.random() * 1,
    p50: 40 + Math.random() * 20,
    p95: 120 + Math.random() * 60,
    p99: 240 + Math.random() * 120,
  }));

  const statusColor: Record<string, string> = {
    healthy: "text-emerald-700 bg-emerald-50 border-emerald-200",
    degraded: "text-amber-700 bg-amber-50 border-amber-200",
    down: "text-red-700 bg-red-50 border-red-200",
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">System Performance</h1><p className="page-subtitle">API health, response times, error rates & alerts</p></div>
        <div className="live-badge"><span className="live-dot" /> Live · Updates every 30s</div>
      </div>

      {MOCK_SYSTEM_ALERTS.filter((a) => !a.resolved).length > 0 && (
        <div className="space-y-2 mb-5">
          {MOCK_SYSTEM_ALERTS.filter((a) => !a.resolved).map((alert) => (
            <div key={alert.id} className={`flex items-start gap-3 p-4 rounded-xl border ${alert.severity === "critical" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
              <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold ${alert.severity === "critical" ? "text-red-800" : "text-amber-800"}`}>{alert.type}</p>
                <p className={`text-xs mt-0.5 ${alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`}>{alert.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`badge ${alert.severity === "critical" ? "badge-danger" : "badge-warning"}`}>{alert.service}</span>
                <button className="text-xs font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 rounded px-2 py-1">Acknowledge</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
        {MOCK_SYSTEM_METRICS.map((m) => (
          <div key={m.service} className={`kpi-card border ${statusColor[m.status].split(" ").slice(1).join(" ")}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">{m.service}</p>
              <span className={`badge text-[10px] px-1.5 py-0.5 border ${statusColor[m.status]}`}>{m.status}</span>
            </div>
            <p className="font-mono font-bold text-2xl text-slate-900 mb-2">{m.uptime.toFixed(2)}%</p>
            <div className="space-y-1 text-xs">
              {[{ l: "P50", v: `${m.p50}ms` }, { l: "P95", v: `${m.p95}ms` }, { l: "P99", v: `${m.p99}ms` }].map((r) => (
                <div key={r.l} className="flex justify-between text-slate-500"><span>{r.l}</span><span className="font-mono font-semibold text-slate-700">{r.v}</span></div>
              ))}
              <div className={`flex justify-between font-semibold ${m.errorRate > 0.2 ? "text-amber-600" : "text-slate-500"}`}>
                <span>Error rate</span><span className="font-mono">{m.errorRate.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Uptime — 24h</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={uptimeSeries}>
                <defs>
                  <linearGradient id="apiG3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={3} />
                <YAxis domain={[94, 100]} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} contentStyle={{ fontFamily: "Montserrat", fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="api" name="API" stroke="#1E40AF" fill="url(#apiG3)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="payment" name="Payment GW" stroke="#D97706" fill="none" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                <Area type="monotone" dataKey="trading" name="Trading" stroke="#059669" fill="none" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Response Times — 24h</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={uptimeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={3} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}ms`} />
                <Tooltip formatter={(v: number) => `${v.toFixed(0)}ms`} contentStyle={{ fontFamily: "Montserrat", fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="p50" name="P50" stroke="#059669" fill="none" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="p95" name="P95" stroke="#D97706" fill="none" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="p99" name="P99" stroke="#DC2626" fill="none" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
