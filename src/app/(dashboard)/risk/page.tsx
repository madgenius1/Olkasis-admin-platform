"use client";

import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { ShieldAlert, AlertTriangle, TrendingDown, Zap, CheckCircle } from "lucide-react";
import { MOCK_RISK_INCIDENTS, MOCK_MARGIN_CALLS, MOCK_CONCENTRATION_RISK } from "@/src/lib/mockData";
import { formatKES, formatNumber, relativeTime } from "@/src/lib/utils";
import type { RiskLevel } from "@/src/types";

const RISK_COLOR: Record<RiskLevel, string> = { low: "#059669", medium: "#D97706", high: "#DC2626", critical: "#7F1D1D" };
type Tab = "overview" | "concentration" | "margin" | "operational";

export default function RiskPage() {
  const [tab, setTab] = useState<Tab>("overview");

  const openIncidents = MOCK_RISK_INCIDENTS.filter((r) => r.status !== "resolved").length;
  const criticalIncidents = MOCK_RISK_INCIDENTS.filter((r) => r.severity === "critical").length;

  const radarData = [
    { subject: "AML", value: 42 }, { subject: "Market", value: 68 },
    { subject: "Credit", value: 35 }, { subject: "Operational", value: 55 },
    { subject: "Liquidity", value: 28 }, { subject: "Cyber", value: 48 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Risk Management</h1><p className="page-subtitle">Concentration risk, margin monitoring, incidents & operational oversight</p></div>
        <div className="flex items-center gap-2">
          {criticalIncidents > 0 && <span className="badge-danger badge animate-pulse"><Zap className="w-3 h-3" /> {criticalIncidents} Critical</span>}
          <span className="badge-warning badge">{openIncidents} Open Incidents</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Open Incidents", value: openIncidents, icon: AlertTriangle, color: "bg-red-50 text-red-700" },
          { label: "Margin Calls", value: MOCK_MARGIN_CALLS.filter(m => m.status === "issued").length, icon: TrendingDown, color: "bg-amber-50 text-amber-700" },
          { label: "Positions At Risk", value: 2, icon: Zap, color: "bg-orange-50 text-orange-700" },
          { label: "Settled Today", value: 284, icon: CheckCircle, color: "bg-emerald-50 text-emerald-700" },
        ].map((k) => (
          <div key={k.label} className="stat-card">
            <div className={`stat-icon-wrap ${k.color}`}><k.icon className="w-5 h-5" /></div>
            <div><p className="stat-label">{k.label}</p><p className="stat-value text-2xl">{k.value}</p></div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit flex-wrap">
        {(["overview", "concentration", "margin", "operational"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{t}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">Risk Score Matrix</h3><span className="text-xs text-slate-500">0–100 scale</span></div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontFamily: "Montserrat" }} />
                  <Radar name="Risk" dataKey="value" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">Active Incidents</h3></div>
            <div className="p-3 space-y-2">
              {MOCK_RISK_INCIDENTS.map((inc) => (
                <div key={inc.id} className={`p-3 rounded-lg border ${inc.status === "resolved" ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-200"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: RISK_COLOR[inc.severity] }} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{inc.type}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{inc.description}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{relativeTime(inc.detectedAt)}</p>
                      </div>
                    </div>
                    <span className={`badge shrink-0 ${inc.severity === "critical" || inc.severity === "high" ? "badge-danger" : inc.severity === "medium" ? "badge-warning" : "badge-neutral"}`}>{inc.severity}</span>
                  </div>
                  {inc.status !== "resolved" && (
                    <div className="flex gap-2 mt-2 pl-4">
                      <button className="text-xs text-blue-600 font-semibold">Investigate</button>
                      <button className="text-xs text-emerald-600 font-semibold">Mark Resolved</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "concentration" && (
        <div className="space-y-5">
          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">Platform Concentration by Stock</h3></div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MOCK_CONCENTRATION_RISK} layout="vertical" barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="ticker" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} width={50} />
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                  <Bar dataKey="platformPct" radius={[0, 4, 4, 0]}>
                    {MOCK_CONCENTRATION_RISK.map((c, i) => <Cell key={i} fill={RISK_COLOR[c.riskLevel]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-section">
            <table className="data-table">
              <thead><tr><th>Ticker</th><th>Company</th><th>Platform Holding</th><th>Share of AUM</th><th>Users</th><th>Risk</th></tr></thead>
              <tbody>
                {MOCK_CONCENTRATION_RISK.map((c) => (
                  <tr key={c.ticker}>
                    <td className="font-mono font-bold text-blue-700">{c.ticker}</td>
                    <td className="font-semibold text-slate-800">{c.companyName}</td>
                    <td className="font-mono font-semibold">{formatKES(c.platformHolding, true)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar-track w-16"><div className="progress-bar-fill" style={{ width: `${c.platformPct}%`, background: RISK_COLOR[c.riskLevel] }} /></div>
                        <span className="text-xs font-semibold">{c.platformPct}%</span>
                      </div>
                    </td>
                    <td className="font-mono">{formatNumber(c.userCount)}</td>
                    <td><span className={`badge ${c.riskLevel === "medium" ? "badge-warning" : "badge-success"}`}>{c.riskLevel}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "margin" && (
        <div className="space-y-4">
          {MOCK_MARGIN_CALLS.map((m) => (
            <div key={m.id} className={`card-section p-5 ${m.status === "issued" ? "border-amber-200 bg-amber-50/30" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-slate-800">{m.userName}</p>
                    <span className={`badge ${m.status === "issued" ? "badge-warning" : m.status === "met" ? "badge-success" : "badge-danger"}`}>{m.status}</span>
                  </div>
                  <p className="text-xs text-slate-500">{m.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Deadline</p>
                  <p className="text-sm font-bold text-red-600 font-mono">{m.deadline.split("T")[1]?.slice(0, 5)} · {m.deadline.split("T")[0]}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                {[{ l: "Current Margin", v: formatKES(m.currentMargin), c: "text-red-600" }, { l: "Required", v: formatKES(m.requiredMargin), c: "text-slate-800" }, { l: "Shortfall", v: formatKES(m.marginShortfall), c: "text-red-700" }].map((s) => (
                  <div key={s.l}><p className="text-xs text-slate-500 font-semibold uppercase">{s.l}</p><p className={`font-mono font-bold mt-0.5 ${s.c}`}>{s.v}</p></div>
                ))}
              </div>
              <div className="progress-bar-track mb-3">
                <div className="progress-bar-fill bg-red-500" style={{ width: `${m.requiredMargin > 0 ? Math.min(100, (m.currentMargin / m.requiredMargin) * 100) : 0}%` }} />
              </div>
              {m.status === "issued" && (
                <div className="flex gap-2">
                  <button className="text-xs font-semibold text-amber-700 border border-amber-200 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100">Send Reminder</button>
                  <button className="text-xs font-semibold text-red-700 border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100">Force Liquidate</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "operational" && (
        <div className="space-y-3">
          {[
            { label: "Failed Settlement Rate", value: "1.6%", threshold: "2.0%", status: "ok", trend: "stable" },
            { label: "Reconciliation Breaks (MTD)", value: "3", threshold: "5 max", status: "ok", trend: "improving" },
            { label: "Broker Integration Uptime", value: "99.2%", threshold: "99.0% SLA", status: "ok", trend: "stable" },
            { label: "Order Processing Errors", value: "0.08%", threshold: "0.1%", status: "ok", trend: "stable" },
            { label: "Unmatched Trades", value: "2", threshold: "0 target", status: "alert", trend: "worsening" },
          ].map((r) => (
            <div key={r.label} className={`card-section p-4 flex items-center justify-between ${r.status === "alert" ? "border-amber-200 bg-amber-50/40" : ""}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${r.status === "ok" ? "bg-emerald-500" : "bg-amber-500"}`} />
                <div><p className="font-semibold text-slate-800 text-sm">{r.label}</p><p className="text-xs text-slate-500">Threshold: {r.threshold}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-900">{r.value}</p>
                  <p className={`text-xs font-semibold ${r.trend === "improving" ? "text-emerald-600" : r.trend === "worsening" ? "text-red-500" : "text-slate-400"}`}>{r.trend}</p>
                </div>
                <span className={`badge ${r.status === "ok" ? "badge-success" : "badge-warning"}`}>{r.status === "ok" ? "Within limits" : "Needs attention"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
