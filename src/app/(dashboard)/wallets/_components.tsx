"use client";

import { useState } from "react";
import { Wallet, Banknote, Download, ArrowUpRight, ArrowDownRight, Search, RefreshCw } from "lucide-react";
import { MOCK_WALLET_TRANSACTIONS } from "@/lib/mockData";
import { formatKES, relativeTime } from "@/lib/utils";
import { TX_STATUS_BADGE } from "@/types";
import type { TransactionStatus, TransactionType } from "@/types";

// ─── Wallet Overview ──────────────────────────────────────────────
export function WalletsOverview() {
  const totalCheckIn = 284200000;
  const totalAccount = 558000000;
  const pendingDeposits = 8400000;
  const pendingWithdrawals = 12800000;

  const paymentBreakdown = [
    { method: "M-Pesa", pct: 68, amount: 2840000000, color: "bg-emerald-500" },
    { method: "Card", pct: 18, amount: 751500000, color: "bg-blue-500" },
    { method: "Bank Transfer", pct: 14, amount: 584500000, color: "bg-purple-500" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Wallets</h1><p className="page-subtitle">Platform-wide wallet balances, deposits & withdrawals</p></div>
        <div className="live-badge"><span className="live-dot" />Live</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Check-In Wallets", value: formatKES(totalCheckIn, true), sub: "All users combined", color: "bg-blue-50 text-blue-700" },
          { label: "Total Account Wallets", value: formatKES(totalAccount, true), sub: "All users combined", color: "bg-emerald-50 text-emerald-700" },
          { label: "Pending Deposits", value: formatKES(pendingDeposits, true), sub: "Awaiting confirmation", color: "bg-amber-50 text-amber-700" },
          { label: "Pending Withdrawals", value: formatKES(pendingWithdrawals, true), sub: "Processing", color: "bg-purple-50 text-purple-700" },
        ].map((s) => (
          <div key={s.label} className="kpi-card">
            <p className="stat-label">{s.label}</p>
            <p className="kpi-value text-lg">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-section p-5">
          <h3 className="card-section-title mb-4">Payment Method Breakdown — MTD</h3>
          <div className="space-y-4">
            {paymentBreakdown.map((p) => (
              <div key={p.method}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-slate-700">{p.method}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800">{formatKES(p.amount, true)}</span>
                    <span className="text-xs text-slate-400">{p.pct}%</span>
                  </div>
                </div>
                <div className="progress-bar-track">
                  <div className={`progress-bar-fill ${p.color}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-section p-5">
          <h3 className="card-section-title mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {MOCK_WALLET_TRANSACTIONS.slice(0, 6).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">{t.user}</p>
                  <p className="text-xs text-slate-500">{t.category} · {relativeTime(t.timestamp)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-mono font-bold ${t.type === "deposit" || t.type === "p2p_receive" || t.type === "refund" ? "text-emerald-600" : "text-slate-700"}`}>
                    {["deposit", "p2p_receive", "refund", "credit", "dividend"].includes(t.type) ? "+" : "-"}{formatKES(t.amount, true)}
                  </p>
                  <span className={`badge text-[10px] ${TX_STATUS_BADGE[t.status]}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Transactions ─────────────────────────────────────────────────
export function Transactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | TransactionType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | TransactionStatus>("all");
  const [showReverse, setShowReverse] = useState<string | null>(null);

  const filtered = MOCK_WALLET_TRANSACTIONS.filter((t) => {
    const matchSearch = !search || t.user.toLowerCase().includes(search.toLowerCase()) || t.ref.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || t.type === typeFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Transactions</h1><p className="page-subtitle">All deposits, withdrawals, P2P transfers & trade settlements</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search user or ref…" className="bg-transparent text-sm outline-none w-40 text-slate-700" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none">
          <option value="all">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="p2p_send">P2P Send</option>
          <option value="p2p_receive">P2P Receive</option>
          <option value="trade_buy">Trade Buy</option>
          <option value="trade_sell">Trade Sell</option>
          <option value="refund">Refund</option>
          <option value="dividend">Dividend</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none">
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="reversed">Reversed</option>
        </select>
      </div>

      <div className="card-section overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Ref</th><th>User</th><th>Type</th><th>Method</th><th>Amount</th><th>Fee</th><th>Status</th><th>Time</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td className="font-mono text-xs text-blue-700">{t.ref}</td>
                <td className="font-semibold text-slate-800">{t.user}</td>
                <td><span className="badge-neutral badge text-[10px]">{t.category}</span></td>
                <td><span className={`badge ${t.method === "mpesa" ? "badge-success" : t.method === "card" ? "badge-info" : t.method === "bank_transfer" ? "badge-purple" : "badge-neutral"}`}>{t.method.replace("_", " ")}</span></td>
                <td className={`font-mono font-semibold text-sm ${["deposit","p2p_receive","refund","credit","dividend"].includes(t.type) ? "text-emerald-600" : "text-slate-800"}`}>
                  {["deposit","p2p_receive","refund","credit","dividend"].includes(t.type) ? "+" : "-"}{formatKES(t.amount, true)}
                </td>
                <td className="font-mono text-xs text-slate-500">{t.fee > 0 ? formatKES(t.fee) : "—"}</td>
                <td><span className={`badge ${TX_STATUS_BADGE[t.status]}`}>{t.status}</span></td>
                <td className="text-xs text-slate-500">{relativeTime(t.timestamp)}</td>
                <td>
                  <div className="flex gap-1.5">
                    {t.status === "completed" && (
                      <button onClick={() => setShowReverse(t.id)} className="text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-0.5">
                        <RefreshCw className="w-3 h-3" /> Reverse
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReverse && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Reverse Transaction</h2>
            <p className="text-sm text-slate-500 mb-5">This will reverse <strong>{showReverse}</strong> and return funds to the sender. This action is logged.</p>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Reason</label>
              <textarea rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-none" placeholder="State reason for reversal…" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReverse(null)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowReverse(null)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700">Confirm Reversal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
