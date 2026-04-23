"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  CandlestickChart, TrendingUp, TrendingDown, Package, Layers,
  XCircle, Download, AlertTriangle, CheckCircle, ChevronRight,
} from "lucide-react";
import {
  MOCK_ORDERS, MOCK_NSE_STOCKS, MOCK_NSE_ETFS, MOCK_VOLUME_DATA,
  MOCK_DERIVATIVES_POSITIONS, MOCK_DERIVATIVES_CERTS,
} from "@/lib/mockData";
import { formatKES, formatNumber, relativeTime } from "@/lib/utils";
import type { OrderStatus } from "@/types";

// ─── Trading Overview ─────────────────────────────────────────────
export function TradingOverview() {
  const executed = MOCK_ORDERS.filter((o) => o.status === "executed").length;
  const pending = MOCK_ORDERS.filter((o) => o.status === "pending").length;
  const failed = MOCK_ORDERS.filter((o) => o.status === "failed").length;
  const volume = MOCK_ORDERS.filter((o) => o.status === "executed").reduce((a, o) => a + o.totalValue, 0);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Trading Overview</h1><p className="page-subtitle">Real-time order flow, market data & settlement tracking</p></div>
        <div className="live-badge"><span className="live-dot" /> Live</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Executed Today", value: executed, color: "bg-emerald-50 text-emerald-700" },
          { label: "Pending Orders", value: pending, color: "bg-amber-50 text-amber-700" },
          { label: "Failed Orders", value: failed, color: "bg-red-50 text-red-700" },
          { label: "Volume (Today)", value: formatKES(volume, true), color: "bg-blue-50 text-blue-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color} border-current/20`}>
            <p className="text-2xl font-black font-mono">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wide mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Volume — This Week</h3></div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MOCK_VOLUME_DATA} barSize={20}>
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

        <div className="card-section">
          <div className="card-section-header"><h3 className="card-section-title">Live Order Feed</h3><div className="live-badge"><span className="live-dot" />Live</div></div>
          <div className="divide-y divide-slate-50">
            {MOCK_ORDERS.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${o.side === "buy" ? "text-emerald-700" : "text-red-600"}`}>{o.side.toUpperCase()}</span>
                    <span className="font-semibold text-slate-800">{o.ticker}</span>
                    <span className="text-xs text-slate-500">{o.quantity.toLocaleString()} @ {formatKES(o.price)}</span>
                  </div>
                  <p className="text-xs text-slate-400">{o.userName} · {relativeTime(o.placedAt)}</p>
                </div>
                <span className={`badge ${o.status === "executed" ? "badge-success" : o.status === "pending" ? "badge-warning" : o.status === "cancelled" ? "badge-neutral" : "badge-danger"}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Orders", href: "/trading/orders", icon: CandlestickChart },
          { title: "Holdings", href: "/trading/holdings", icon: Package },
          { title: "Derivatives", href: "/trading/derivatives", icon: Layers },
        ].map((c) => (
          <Link key={c.title} href={c.href} className="card-section p-5 flex items-center justify-between hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center"><c.icon className="w-5 h-5 text-blue-700" /></div>
              <span className="font-bold text-slate-800">{c.title}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Orders ───────────────────────────────────────────────────────
export function Orders() {
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const filtered = MOCK_ORDERS.filter((o) => statusFilter === "all" || o.status === statusFilter);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Orders</h1><p className="page-subtitle">Full order book — view, filter & cancel orders</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "pending", "executed", "cancelled", "failed"] as const).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)} className={statusFilter === f ? "filter-chip-active" : "filter-chip-inactive"}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card-section overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Order ID</th><th>User</th><th>Ticker</th><th>Side</th><th>Type</th><th>Qty</th><th>Price</th><th>Value</th><th>Status</th><th>Placed</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="font-mono text-xs text-blue-700">{o.id}</td>
                <td className="font-semibold text-slate-800">{o.userName}</td>
                <td className="font-mono font-bold">{o.ticker}</td>
                <td><span className={`badge ${o.side === "buy" ? "badge-success" : "badge-danger"}`}>{o.side}</span></td>
                <td className="text-xs text-slate-500">{o.type}</td>
                <td className="font-mono">{formatNumber(o.quantity)}</td>
                <td className="font-mono text-sm">{formatKES(o.price)}</td>
                <td className="font-mono font-semibold">{formatKES(o.totalValue, true)}</td>
                <td><span className={`badge ${o.status === "executed" ? "badge-success" : o.status === "pending" ? "badge-warning" : o.status === "cancelled" ? "badge-neutral" : "badge-danger"}`}>{o.status}</span></td>
                <td className="text-xs text-slate-500">{relativeTime(o.placedAt)}</td>
                <td>
                  {o.status === "pending" && (
                    <button className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Holdings ─────────────────────────────────────────────────────
export function Holdings() {
  const holdings = [
    { ticker: "SCOM", name: "Safaricom PLC", totalShares: 48200000, marketValue: 903750000, users: 31200, avgCost: 17.20, currentPrice: 18.75, pnl: 74710000 },
    { ticker: "EQTY", name: "Equity Group", totalShares: 29280000, marketValue: 1370304000, users: 24800, avgCost: 43.10, currentPrice: 46.80, pnl: 108336000 },
    { ticker: "KCB", name: "KCB Group PLC", totalShares: 29010000, marketValue: 1108182000, users: 19200, avgCost: 36.50, currentPrice: 38.20, pnl: 49317000 },
    { ticker: "EABL", name: "East African Breweries", totalShares: 5992000, marketValue: 854460000, users: 8400, avgCost: 138.00, currentPrice: 142.50, pnl: 26964000 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Platform Holdings</h1><p className="page-subtitle">Aggregated platform-wide stock positions</p></div>
      </div>
      <div className="card-section overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Ticker</th><th>Company</th><th>Total Shares</th><th>Market Value</th><th>Users</th><th>Avg Cost</th><th>Current Price</th><th>Total P&L</th><th>P&L %</th></tr></thead>
          <tbody>
            {holdings.map((h) => {
              const pnlPct = ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
              return (
                <tr key={h.ticker}>
                  <td className="font-mono font-bold text-blue-700">{h.ticker}</td>
                  <td className="font-semibold text-slate-800">{h.name}</td>
                  <td className="font-mono">{formatNumber(h.totalShares)}</td>
                  <td className="font-mono font-semibold">{formatKES(h.marketValue, true)}</td>
                  <td className="font-mono">{formatNumber(h.users)}</td>
                  <td className="font-mono">{formatKES(h.avgCost)}</td>
                  <td className="font-mono">{formatKES(h.currentPrice)}</td>
                  <td className={`font-mono font-semibold ${h.pnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>{formatKES(h.pnl, true)}</td>
                  <td className={`font-mono font-semibold ${pnlPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>{pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Market Data ──────────────────────────────────────────────────
export function MarketData() {
  const allStocks = [...MOCK_NSE_STOCKS, ...MOCK_NSE_ETFS];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Market Data</h1><p className="page-subtitle">NSE equities, ETFs, pricing & trading status</p></div>
        <div className="live-badge"><span className="live-dot" />NSE Live</div>
      </div>
      <div className="card-section overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Ticker</th><th>Name</th><th>Sector</th><th>Price</th><th>Change</th><th>Volume</th><th>Market Cap</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {allStocks.map((s) => (
              <tr key={s.ticker}>
                <td className="font-mono font-bold text-blue-700">{s.ticker}</td>
                <td className="font-semibold text-slate-800">{s.name}</td>
                <td className="text-xs text-slate-500">{s.sector}</td>
                <td className="font-mono font-bold">{formatKES(s.lastPrice)}</td>
                <td>
                  <div className={`flex items-center gap-1 font-mono text-xs font-semibold ${s.changePct >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {s.changePct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {s.changePct >= 0 ? "+" : ""}{s.changePct.toFixed(2)}%
                  </div>
                </td>
                <td className="font-mono text-xs">{formatNumber(s.volume)}</td>
                <td className="font-mono text-xs">{formatKES(s.marketCap, true)}</td>
                <td><span className={`badge ${s.tradingStatus === "active" ? "badge-success" : s.tradingStatus === "halted" ? "badge-warning" : "badge-danger"}`}>{s.tradingStatus}</span></td>
                <td>
                  {s.tradingStatus !== "halted" && (
                    <button className="text-xs font-semibold text-amber-600 hover:text-amber-800">Halt</button>
                  )}
                  {s.tradingStatus === "halted" && (
                    <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-800">Resume</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Derivatives ──────────────────────────────────────────────────
export function Derivatives() {
  const [tab, setTab] = useState<"positions" | "certifications">("positions");

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Derivatives</h1><p className="page-subtitle">Futures & options positions, margin monitoring & certifications</p></div>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {[{ key: "positions" as const, label: "Positions" }, { key: "certifications" as const, label: "Certifications" }].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "positions" && (
        <div className="space-y-3">
          {MOCK_DERIVATIVES_POSITIONS.map((pos) => (
            <div key={pos.id} className={`card-section p-5 ${pos.status === "margin_call" ? "border-red-300 bg-red-50/30" : pos.status === "at_risk" ? "border-amber-300 bg-amber-50/20" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-slate-800">{pos.userName}</p>
                    <span className="font-mono text-xs text-blue-700 font-bold">{pos.ticker}</span>
                    <span className="badge-neutral badge">{pos.type}</span>
                    <span className={`badge ${pos.direction === "long" ? "badge-success" : "badge-danger"}`}>{pos.direction}</span>
                    <span className={`badge ${pos.status === "open" ? "badge-success" : pos.status === "at_risk" ? "badge-warning" : pos.status === "margin_call" ? "badge-danger" : "badge-neutral"}`}>{pos.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-xs text-slate-500">Expires: {pos.expiry}</p>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-bold ${pos.pnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>{pos.pnl >= 0 ? "+" : ""}{formatKES(pos.pnl, true)}</p>
                  <p className={`text-xs font-semibold ${pos.pnlPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>{pos.pnlPct >= 0 ? "+" : ""}{pos.pnlPct.toFixed(2)}%</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-3">
                {[
                  { label: "Margin Used", value: formatKES(pos.marginUsed, true) },
                  { label: "Margin Avail.", value: formatKES(pos.marginAvailable, true) },
                  { label: "Utilisation", value: `${pos.marginUtilization.toFixed(1)}%` },
                  { label: "Entry", value: formatKES(pos.entryPrice) },
                  { label: "Liquidation", value: formatKES(pos.liquidationPrice) },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{m.label}</p>
                    <p className="font-mono font-bold text-slate-800 mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Margin Utilisation</span><span>{pos.marginUtilization.toFixed(1)}%</span></div>
                <div className="progress-bar-track">
                  <div className={`progress-bar-fill ${pos.marginUtilization > 90 ? "bg-red-500" : pos.marginUtilization > 70 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pos.marginUtilization}%` }} />
                </div>
              </div>
              {pos.status === "margin_call" && (
                <div className="flex gap-2">
                  <button className="text-xs font-semibold text-amber-700 border border-amber-200 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100">Send Reminder</button>
                  <button className="text-xs font-semibold text-red-700 border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100">Force Liquidate</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "certifications" && (
        <div className="card-section">
          <table className="data-table">
            <thead><tr><th>User</th><th>Submitted</th><th>Score</th><th>Pass Mark</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {MOCK_DERIVATIVES_CERTS.map((c) => (
                <tr key={c.id}>
                  <td className="font-semibold text-slate-800">{c.userName}</td>
                  <td className="text-xs text-slate-500">{relativeTime(c.submittedAt)}</td>
                  <td>
                    <span className={`font-mono font-bold text-sm ${c.score >= c.passMark ? "text-emerald-600" : "text-red-500"}`}>{c.score}%</span>
                  </td>
                  <td className="font-mono text-sm text-slate-500">{c.passMark}%</td>
                  <td><span className={`badge ${c.status === "approved" ? "badge-success" : c.status === "rejected" ? "badge-danger" : "badge-warning"}`}>{c.status.replace("_", " ")}</span></td>
                  <td>
                    {c.status === "pending_review" && (
                      <div className="flex gap-2">
                        <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>
                        <button className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
