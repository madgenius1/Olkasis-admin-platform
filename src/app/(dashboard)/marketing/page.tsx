"use client";

import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Megaphone, Trophy, TrendingUp, RefreshCw, Plus, Users, DollarSign, Percent, Zap, ArrowUpRight } from "lucide-react";
import { MOCK_CAMPAIGNS, MOCK_REFERRALS, MOCK_COHORT_DATA, MOCK_USER_GROWTH } from "@/src/lib/mockData";
import { formatKES, formatNumber } from "@/src/lib/utils";

type Tab = "campaigns" | "referrals" | "cohort" | "churn";

export default function MarketingPage() {
  const [tab, setTab] = useState<Tab>("campaigns");
  const [showCreate, setShowCreate] = useState(false);

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "campaigns", label: "Campaigns", icon: Megaphone },
    { key: "referrals", label: "Referral Program", icon: Trophy },
    { key: "cohort", label: "Cohort Analysis", icon: TrendingUp },
    { key: "churn", label: "Churn & Retention", icon: RefreshCw },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Marketing & Growth</h1><p className="page-subtitle">Campaigns, referrals, retention & user acquisition</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Active Campaigns", value: MOCK_CAMPAIGNS.filter(c => c.status === "active").length, icon: Megaphone, color: "bg-blue-50 text-blue-700" },
          { label: "Total Referrals", value: formatNumber(MOCK_REFERRALS.reduce((a, r) => a + r.referralsCount, 0)), icon: Users, color: "bg-emerald-50 text-emerald-700" },
          { label: "Bonus Paid", value: formatKES(MOCK_REFERRALS.reduce((a, r) => a + r.totalBonus, 0), true), icon: DollarSign, color: "bg-amber-50 text-amber-700" },
          { label: "Avg Conversion", value: "18.4%", icon: Percent, color: "bg-purple-50 text-purple-700" },
        ].map((k) => (
          <div key={k.label} className="stat-card">
            <div className={`stat-icon-wrap ${k.color}`}><k.icon className="w-5 h-5" /></div>
            <div><p className="stat-label">{k.label}</p><p className="stat-value">{k.value}</p></div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit flex-wrap">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {tab === "campaigns" && (
        <div className="space-y-4">
          {MOCK_CAMPAIGNS.map((c) => (
            <div key={c.id} className="card-section p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-bold text-slate-800">{c.name}</h4>
                    <span className={`badge ${c.status === "active" ? "badge-success" : c.status === "paused" ? "badge-warning" : c.status === "ended" ? "badge-neutral" : "badge-info"}`}>{c.status}</span>
                    <span className="badge-purple badge">{c.type}</span>
                  </div>
                  <p className="text-xs text-slate-500">Reward: <strong>{c.reward}</strong> · Started {c.startDate}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">Edit</button>
                  <button className={`text-xs font-semibold border px-3 py-1.5 rounded-lg transition-colors ${c.status === "active" ? "text-amber-700 border-amber-200 hover:bg-amber-50" : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"}`}>
                    {c.status === "active" ? "Pause" : "Activate"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 mb-3">
                {[{ l: "Uses", v: formatNumber(c.uses) }, { l: "Budget", v: formatKES(c.budget, true) }, { l: "Spent", v: formatKES(c.spent, true) }, { l: "Conversion", v: `${c.conversionRate}%` }, { l: "ROI", v: `${c.roi}x` }].map((m) => (
                  <div key={m.l}><p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{m.l}</p><p className="font-mono font-bold text-slate-800 mt-0.5">{m.v}</p></div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Budget utilisation</span><span>{c.budget > 0 ? ((c.spent / c.budget) * 100).toFixed(0) : 0}%</span></div>
                <div className="progress-bar-track">
                  <div className={`progress-bar-fill ${c.spent / c.budget > 0.8 ? "bg-red-500" : "bg-blue-600"}`} style={{ width: `${c.budget > 0 ? Math.min(100, (c.spent / c.budget) * 100) : 0}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "referrals" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">Top Referrers</h3></div>
            <div className="p-4 space-y-2">
              {MOCK_REFERRALS.map((r, i) => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${i === 0 ? "bg-amber-500 text-white" : i === 1 ? "bg-slate-400 text-white" : i === 2 ? "bg-amber-800 text-white" : "bg-slate-200 text-slate-600"}`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{r.referrerName}</p>
                    <p className="text-xs text-slate-500">{r.successfulReferrals}/{r.referralsCount} successful</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-sm text-emerald-700">{formatKES(r.totalBonus, true)}</p>
                    <p className="text-xs text-slate-400">earned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">Referral Analytics</h3></div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={MOCK_REFERRALS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="referrerName" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="referralsCount" name="Total" fill="#64748B" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="successfulReferrals" name="Successful" fill="#1E40AF" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === "cohort" && (
        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Retention Cohort Analysis</h3><span className="text-xs text-slate-500">% still active at each month mark</span></div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Cohort</th><th>Users</th><th>Month 1</th><th>Month 2</th><th>Month 3</th><th>Month 6</th><th>Month 12</th></tr></thead>
              <tbody>
                {MOCK_COHORT_DATA.map((c) => (
                  <tr key={c.cohort}>
                    <td className="font-bold text-slate-800">{c.cohort}</td>
                    <td className="font-mono">{formatNumber(c.users)}</td>
                    {[c.month1, c.month2, c.month3, c.month6, c.month12].map((val, i) => (
                      <td key={i}>
                        {val !== undefined ? (
                          <span className="inline-block px-2 py-1 rounded-md text-xs font-bold font-mono" style={{ background: `rgba(30,64,175,${val / 100})`, color: val > 50 ? "white" : "#1E40AF" }}>{val}%</span>
                        ) : <span className="text-slate-300 text-xs">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "churn" && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "30-Day Churn Rate", value: "2.1%", good: true },
              { label: "Inactive Users (90d)", value: "4,820", good: false },
              { label: "Re-engaged (MTD)", value: "284", good: true },
            ].map((s) => (
              <div key={s.label} className="kpi-card">
                <p className="stat-label">{s.label}</p>
                <p className="kpi-value text-2xl">{s.value}</p>
                <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${s.good ? "text-emerald-600" : "text-red-500"}`}>
                  {s.good ? <ArrowUpRight className="w-3 h-3" /> : <Zap className="w-3 h-3" />} vs last period
                </p>
              </div>
            ))}
          </div>
          <div className="card-section">
            <div className="card-section-header"><h3 className="card-section-title">New vs Churned — Weekly</h3></div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={MOCK_USER_GROWTH}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="churned" name="Churned" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Create New Campaign</h2>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Campaign Name</label><input className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. April Deposit Bonus" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Type</label><select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none"><option>referral</option><option>onboarding</option><option>trading</option><option>deposit</option></select></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Budget (KES)</label><input type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none" placeholder="500000" /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Reward</label><input className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none" placeholder="KES 500 per referral" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800">Create Campaign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
