"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Users, TrendingUp, Wallet, ArrowLeftRight, ShieldAlert,
  ArrowUpRight, ArrowDownRight, Activity, RefreshCw,
} from "lucide-react";
import {
  MOCK_REVENUE_DATA, MOCK_AUM_DATA, MOCK_USER_GROWTH,
  MOCK_VOLUME_DATA, MOCK_AML_ALERTS, MOCK_ORDERS, MOCK_WALLET_TRANSACTIONS,
} from "@/lib/mockData";
import { formatKES, formatNumber, relativeTime } from "@/lib/utils";

const KPI_CARDS = [
  { label: "Total Users", value: "48,291", delta: "+240 today", up: true, icon: Users, color: "bg-blue-50 text-blue-700" },
  { label: "Total AUM", value: "KES 3.07B", delta: "+2.4% this week", up: true, icon: TrendingUp, color: "bg-emerald-50 text-emerald-700" },
  { label: "Wallet Balances", value: "KES 842M", delta: "+1.1% today", up: true, icon: Wallet, color: "bg-amber-50 text-amber-700" },
  { label: "P2P Volume (Today)", value: "KES 12.4M", delta: "-3.2% vs yesterday", up: false, icon: ArrowLeftRight, color: "bg-purple-50 text-purple-700" },
  { label: "Open AML Alerts", value: "7", delta: "+2 since yesterday", up: false, icon: ShieldAlert, color: "bg-red-50 text-red-700" },
  { label: "Active Sessions", value: "4", delta: "admins online now", up: true, icon: Activity, color: "bg-sky-50 text-sky-700" },
];

export default function DashboardPage() {
  const latestAUM = MOCK_AUM_DATA[MOCK_AUM_DATA.length - 1];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p className="page-subtitle">Real-time platform overview — updated every 30s</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge"><span className="live-dot" /> Live</div>
          <button className="flex items-center gap-2 border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {KPI_CARDS.map((k) => (
          <div key={k.label} className="kpi-card">
            <div className={`stat-icon-wrap ${k.color} mb-3`}><k.icon className="w-4.5 h-4.5" /></div>
            <p className="stat-label">{k.label}</p>
            <p className="kpi-value text-lg">{k.value}</p>
            <p className={`text-xs font-semibold mt-1 flex items-center gap-0.5 ${k.up ? "text-emerald-600" : "text-red-500"}`}>
              {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue */}
        <div className="card-section lg:col-span-2">
          <div className="card-section-header">
            <h3 className="card-section-title">Revenue — Last 7 Months</h3>
            <span className="badge-success badge">↑ +18.4% YoY</span>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_REVENUE_DATA} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "Montserrat" }} />
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

        {/* AUM */}
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">AUM Growth</h3>
          </div>
          <div className="p-5">
            <p className="text-2xl font-black font-mono text-slate-900">{formatKES(latestAUM.total, true)}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">+24.7% YoY</p>
            <ResponsiveContainer width="100%" height={160} className="mt-3">
              <AreaChart data={MOCK_AUM_DATA}>
                <defs>
                  <linearGradient id="aumG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip formatter={(v: number) => formatKES(v, true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 11 }} />
                <Area type="monotone" dataKey="total" stroke="#1E40AF" fill="url(#aumG)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* User growth + volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">User Growth — This Week</h3>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={MOCK_USER_GROWTH}>
                <defs>
                  <linearGradient id="ugG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => formatNumber(v)} />
                <Tooltip contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Area type="monotone" dataKey="users" name="Total Users" stroke="#059669" fill="url(#ugG)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">Trade Volume — This Week</h3>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={MOCK_VOLUME_DATA} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={(v: number) => formatKES(v, true)} contentStyle={{ fontFamily: "Montserrat", fontSize: 12 }} />
                <Bar dataKey="buyVolume" name="Buy" stackId="a" fill="#059669" />
                <Bar dataKey="sellVolume" name="Sell" stackId="a" fill="#1E40AF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent orders */}
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">Recent Orders</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_ORDERS.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">{o.userName}</p>
                  <p className="text-xs text-slate-500">{o.side.toUpperCase()} {o.ticker} · {o.quantity.toLocaleString()} shares</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold">{formatKES(o.totalValue, true)}</p>
                  <span className={`badge text-[10px] ${o.status === "executed" ? "badge-success" : o.status === "pending" ? "badge-warning" : o.status === "cancelled" ? "badge-neutral" : "badge-danger"}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_WALLET_TRANSACTIONS.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">{t.user}</p>
                  <p className="text-xs text-slate-500">{t.category}</p>
                  <p className="text-[10px] text-slate-400">{relativeTime(t.timestamp)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-mono font-bold ${t.type === "deposit" || t.type === "p2p_receive" ? "text-emerald-600" : "text-slate-800"}`}>
                    {t.type === "deposit" || t.type === "p2p_receive" ? "+" : "-"}{formatKES(t.amount, true)}
                  </p>
                  <span className={`badge text-[10px] ${t.status === "completed" ? "badge-success" : t.status === "pending" ? "badge-warning" : "badge-danger"}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AML alerts */}
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">AML Alerts</h3>
            <span className="badge-danger badge">{MOCK_AML_ALERTS.filter(a => a.status === "open").length} Open</span>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_AML_ALERTS.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-start gap-3 px-5 py-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.severity === "critical" ? "bg-red-600" : a.severity === "high" ? "bg-red-400" : a.severity === "medium" ? "bg-amber-400" : "bg-slate-400"}`} />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{a.userName}</p>
                  <p className="text-xs text-slate-500 truncate">{a.description}</p>
                  <p className="text-[10px] text-slate-400">{relativeTime(a.triggeredAt)}</p>
                </div>
                <span className={`badge text-[10px] shrink-0 ${a.severity === "critical" || a.severity === "high" ? "badge-danger" : a.severity === "medium" ? "badge-warning" : "badge-neutral"}`}>
                  {a.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
