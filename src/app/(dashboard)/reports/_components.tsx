"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { BarChart3, Download, FileText, TrendingUp, PieChart as PieIcon, BookMarked } from "lucide-react";
import { MOCK_REVENUE_DATA, MOCK_AUM_DATA, MOCK_VOLUME_DATA, MOCK_USER_GROWTH } from "@/src/lib/mockData";
import { formatKES, formatNumber } from "@/src/lib/utils";
import Link from "next/link";

const PIE_COLORS = ["#1E40AF", "#059669", "#D97706", "#7C3AED"];

// ─── Reports Overview ─────────────────────────────────────────────
export function ReportsOverview() {
  const ytd = MOCK_REVENUE_DATA.reduce((a, r) => a + r.total, 0);
  const latestAUM = MOCK_AUM_DATA[MOCK_AUM_DATA.length - 1];
  const aumBreakdown = [
    { name: "Equities", value: latestAUM.equities },
    { name: "ETFs", value: latestAUM.etfs },
    { name: "Bonds", value: latestAUM.bonds },
    { name: "Cash", value: latestAUM.cash },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Reports</h1><p className="page-subtitle">Financial performance, trading analytics & regulatory data</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <Download className="w-4 h-4" /> Export Package
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "YTD Revenue", value: formatKES(ytd, true), sub: "+18.4% YoY" },
          { label: "Total AUM", value: formatKES(latestAUM.total, true), sub: "+24.7% YoY" },
          { label: "Avg Monthly Rev", value: formatKES(ytd / MOCK_REVENUE_DATA.length, true), sub: "+11.2% YoY" },
          { label: "Trading Fee Share", value: "68.4%", sub: "of total revenue" },
        ].map((k) => (
          <div key={k.label} className="kpi-card">
            <p className="stat-label">{k.label}</p>
            <p className="kpi-value text-xl">{k.value}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="card-section lg:col-span-2">
          <div className="card-section-header"><h3 className="card-section-title">Revenue — Last 7 Months</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MOCK_REVENUE_DATA} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => formatKES(v, true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="trading" name="Trading" stackId="a" fill="#1E40AF" />
                <Bar dataKey="p2p" name="P2P" stackId="a" fill="#059669" />
                <Bar dataKey="withdrawal" name="Withdrawal" stackId="a" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">AUM Breakdown</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={aumBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                  {aumBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatKES(v, true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {aumBreakdown.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} /><span className="text-slate-600 font-medium">{item.name}</span></div>
                  <span className="font-mono font-semibold text-slate-800">{formatKES(item.value, true)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Financial Reports", desc: "Revenue, fees, net cash flow, AUM analytics", href: "/reports/financial", icon: BarChart3, color: "bg-blue-700" },
          { title: "Trading Reports", desc: "Order volume, settlement, broker reconciliation", href: "/reports/trading", icon: TrendingUp, color: "bg-emerald-700" },
          { title: "Regulatory Reports", desc: "CBK, FRC submissions, STRs, data exports", href: "/reports/regulatory", icon: BookMarked, color: "bg-amber-700" },
        ].map((r) => (
          <Link key={r.title} href={r.href} className="card-section p-5 hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 ${r.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}><r.icon className="w-5 h-5 text-white" /></div>
            <h4 className="font-bold text-slate-800 mb-1">{r.title}</h4>
            <p className="text-xs text-slate-500">{r.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Financial Reports ────────────────────────────────────────────
export function FinancialReports() {
  const totalRevenue = MOCK_REVENUE_DATA.reduce((a, r) => a + r.total, 0);
  const latestAUM = MOCK_AUM_DATA[MOCK_AUM_DATA.length - 1];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Financial Reports</h1><p className="page-subtitle">Revenue, fees, cash flow & AUM analytics</p></div>
        <div className="flex gap-2">
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none bg-white">
            <option>April 2026</option><option>March 2026</option><option>Q1 2026</option><option>YTD 2026</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "YTD Revenue", value: formatKES(totalRevenue, true) },
          { label: "Total AUM", value: formatKES(latestAUM.total, true) },
          { label: "Total Deposits", value: "KES 4.8B" },
          { label: "Total Withdrawals", value: "KES 2.1B" },
        ].map((k) => (
          <div key={k.label} className="kpi-card"><p className="stat-label">{k.label}</p><p className="kpi-value">{k.value}</p></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">AUM Over Time</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MOCK_AUM_DATA}>
                <defs><linearGradient id="aumG2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1E40AF" stopOpacity={0.15} /><stop offset="95%" stopColor="#1E40AF" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1e9).toFixed(1)}B`} />
                <Tooltip formatter={(v: number) => formatKES(v, true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Area type="monotone" dataKey="total" name="AUM" stroke="#1E40AF" fill="url(#aumG2)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Cash Flow</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_USER_GROWTH.map((d, i) => ({ ...d, deposits: 680000000 + i * 12000000, withdrawals: -(290000000 + i * 8000000) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(Math.abs(v) / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={(v: number) => formatKES(Math.abs(v), true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Bar dataKey="deposits" name="Deposits" fill="#059669" radius={[3, 3, 0, 0]} />
                <Bar dataKey="withdrawals" name="Withdrawals" fill="#EF4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-header"><h3 className="card-section-title">Fee Breakdown — YTD</h3></div>
        <table className="data-table">
          <thead><tr><th>Fee Type</th><th>Amount (YTD)</th><th>Share</th><th>Trend</th><th>MoM Change</th></tr></thead>
          <tbody>
            {[
              { name: "Trading / Brokerage Fees", amount: 28620000, pct: 68.4 },
              { name: "P2P Transfer Fees", amount: 8498000, pct: 20.3 },
              { name: "Withdrawal Fees", amount: 3882000, pct: 9.3 },
              { name: "Subscription Fees", amount: 840000, pct: 2.0 },
            ].map((r) => (
              <tr key={r.name}>
                <td className="font-semibold text-slate-800">{r.name}</td>
                <td className="font-mono font-semibold">{formatKES(r.amount, true)}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar-track w-20"><div className="progress-bar-fill bg-blue-600" style={{ width: `${r.pct}%` }} /></div>
                    <span className="text-xs font-semibold">{r.pct}%</span>
                  </div>
                </td>
                <td><span className="badge-success badge">↑ Growing</span></td>
                <td className="text-emerald-600 font-semibold text-xs">+{(Math.random() * 8 + 4).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Trading Reports ──────────────────────────────────────────────
export function TradingReports() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Trading Reports</h1><p className="page-subtitle">Order flow, settlement tracking & broker reconciliation</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800"><Download className="w-4 h-4" /> Export</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Trades (MTD)", value: "8,420", sub: "+12.3% MoM" },
          { label: "Volume (MTD)", value: "KES 681M", sub: "+18.7% MoM" },
          { label: "Settlement Rate", value: "98.4%", sub: "T+3 on-time" },
          { label: "Failed Trades", value: "134", sub: "-22.4% MoM" },
        ].map((k) => (
          <div key={k.label} className="kpi-card">
            <p className="stat-label">{k.label}</p>
            <p className="kpi-value">{k.value}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Daily Trade Volume</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_VOLUME_DATA} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={(v: number) => formatKES(v, true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="buyVolume" name="Buy" stackId="a" fill="#059669" />
                <Bar dataKey="sellVolume" name="Sell" stackId="a" fill="#1E40AF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Order Type Distribution</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={[{ name: "Market Buy", value: 28 }, { name: "Limit Buy", value: 32 }, { name: "Market Sell", value: 20 }, { name: "Limit Sell", value: 15 }, { name: "Stop Loss", value: 5 }]} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                  {[0, 1, 2, 3, 4].map((i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-header"><h3 className="card-section-title">Settlement Status — This Week</h3></div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>Total Trades</th><th>Settled T+1</th><th>Settled T+3</th><th>Pending</th><th>Failed</th><th>Broker Match</th></tr></thead>
          <tbody>
            {["Mon 14 Apr", "Tue 15 Apr", "Wed 16 Apr"].map((d, i) => (
              <tr key={d}>
                <td className="font-semibold">{d}</td>
                <td className="font-mono">{formatNumber(1200 + i * 240)}</td>
                <td className="font-mono text-emerald-700">{formatNumber(480 + i * 95)}</td>
                <td className="font-mono text-blue-700">{formatNumber(680 + i * 130)}</td>
                <td className="font-mono text-amber-700">{i === 2 ? 284 : 0}</td>
                <td className="font-mono text-red-600">{8 + i * 3}</td>
                <td><span className="badge-success badge">✓ Reconciled</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Regulatory Reports ───────────────────────────────────────────
export function RegulatoryReports() {
  const submissions = [
    { id: "REG001", type: "Daily Transaction Summary", regulator: "CBK", period: "15 Apr 2026", status: "submitted", dueDate: "16 Apr 2026", submittedAt: "16 Apr 2026 06:00" },
    { id: "REG002", type: "Monthly AML Report", regulator: "FRC", period: "March 2026", status: "submitted", dueDate: "15 Apr 2026", submittedAt: "12 Apr 2026 14:30" },
    { id: "REG003", type: "Suspicious Transaction Report", regulator: "FRC", period: "15 Apr 2026", status: "submitted", dueDate: "16 Apr 2026", submittedAt: "16 Apr 2026 08:00" },
    { id: "REG004", type: "Daily Transaction Summary", regulator: "CBK", period: "16 Apr 2026", status: "pending", dueDate: "17 Apr 2026", submittedAt: "—" },
    { id: "REG005", type: "Quarterly CMA Filing", regulator: "CMA", period: "Q1 2026", status: "overdue", dueDate: "14 Apr 2026", submittedAt: "—" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Regulatory Reports</h1><p className="page-subtitle">CBK, CMA & FRC submissions — compliance data exports</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800"><FileText className="w-4 h-4" /> Generate Report</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Submitted On-Time", value: "3", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
          { label: "Pending", value: "1", color: "text-amber-700 bg-amber-50 border-amber-200" },
          { label: "Overdue", value: "1", color: "text-red-700 bg-red-50 border-red-200" },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-3xl font-black font-mono">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-section mb-5">
        <div className="card-section-header"><h3 className="card-section-title">Regulatory Submissions</h3></div>
        <table className="data-table">
          <thead><tr><th>Report Type</th><th>Regulator</th><th>Period</th><th>Due</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id}>
                <td className="font-semibold text-slate-800">{s.type}</td>
                <td><span className="badge-info badge">{s.regulator}</span></td>
                <td className="font-mono text-xs">{s.period}</td>
                <td className="font-mono text-xs">{s.dueDate}</td>
                <td className="font-mono text-xs">{s.submittedAt}</td>
                <td><span className={`badge ${s.status === "submitted" ? "badge-success" : s.status === "pending" ? "badge-warning" : "badge-danger"}`}>{s.status}</span></td>
                <td><button className="text-xs text-blue-600 font-semibold hover:text-blue-800">{s.status === "submitted" ? "Download" : "Submit Now"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <h3 className="card-section-title">Data Exports</h3>
          <button className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:text-blue-800"><Download className="w-3.5 h-3.5" /> New Export</button>
        </div>
        <div className="p-4 space-y-2">
          {[
            { label: "User Data Export (GDPR)", format: "CSV + ZIP", size: "12.4 MB", generatedAt: "15 Apr 2026" },
            { label: "Transaction Records — Q1 2026", format: "CSV", size: "48.2 MB", generatedAt: "05 Apr 2026" },
            { label: "KYC Documents Bulk", format: "ZIP", size: "2.1 GB", generatedAt: "01 Apr 2026" },
            { label: "Audit Logs — March 2026", format: "CSV", size: "8.7 MB", generatedAt: "01 Apr 2026" },
          ].map((ex) => (
            <div key={ex.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{ex.label}</p>
                  <p className="text-xs text-slate-500">{ex.format} · {ex.size} · Generated {ex.generatedAt}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
