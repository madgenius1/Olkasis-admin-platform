"use client";

import { useState } from "react";
import { ArrowLeftRight, AlertCircle, Download, Search } from "lucide-react";
import { MOCK_P2P_TRANSFERS, MOCK_P2P_DISPUTES } from "@/src/lib/mockData";
import { formatKES, relativeTime } from "@/src/lib/utils";
import type { P2PStatus } from "@/src/types";

// ─── P2P Transfers ────────────────────────────────────────────────
export function P2PTransfers() {
  const [statusFilter, setStatusFilter] = useState<"all" | P2PStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_P2P_TRANSFERS.filter((t) => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchSearch = !search || t.senderName.toLowerCase().includes(search.toLowerCase()) || t.receiverName.toLowerCase().includes(search.toLowerCase()) || t.ref.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalVolume = MOCK_P2P_TRANSFERS.filter((t) => t.status === "completed").reduce((a, t) => a + t.amount, 0);
  const totalFees = MOCK_P2P_TRANSFERS.filter((t) => t.status === "completed").reduce((a, t) => a + t.fee, 0);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">P2P Transfers</h1><p className="page-subtitle">Peer-to-peer transfer monitoring & controls</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Volume (MTD)", value: formatKES(totalVolume, true) },
          { label: "Fees Collected", value: formatKES(totalFees, true) },
          { label: "Total Transfers", value: MOCK_P2P_TRANSFERS.length },
          { label: "Disputed", value: MOCK_P2P_TRANSFERS.filter((t) => t.hasDispute).length },
        ].map((s) => (
          <div key={s.label} className="kpi-card">
            <p className="stat-label">{s.label}</p>
            <p className="kpi-value text-lg">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sender, receiver, ref…" className="bg-transparent text-sm outline-none w-40 text-slate-700" />
        </div>
        {(["all", "completed", "pending", "disputed", "failed"] as const).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)} className={statusFilter === f ? "filter-chip-active" : "filter-chip-inactive"}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card-section overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Ref</th><th>Sender</th><th>Receiver</th><th>Amount</th><th>Fee</th><th>Type</th><th>Method</th><th>Status</th><th>Time</th></tr></thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td className="font-mono text-xs text-blue-700">{t.ref}</td>
                <td className="font-semibold text-slate-800">{t.senderName}</td>
                <td className="font-semibold text-slate-800">{t.receiverName}</td>
                <td className="font-mono font-bold">{formatKES(t.amount, true)}</td>
                <td className="font-mono text-xs text-slate-500">{formatKES(t.fee)}</td>
                <td><span className={`badge ${t.type === "business" ? "badge-purple" : t.type === "gift" ? "badge-gold" : "badge-neutral"}`}>{t.type}</span></td>
                <td><span className="badge-neutral badge">{t.method.replace("_", " ")}</span></td>
                <td><span className={`badge ${t.status === "completed" ? "badge-success" : t.status === "pending" ? "badge-warning" : t.status === "disputed" ? "badge-danger" : "badge-neutral"}`}>{t.status}</span></td>
                <td className="text-xs text-slate-500">{relativeTime(t.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── P2P Disputes ─────────────────────────────────────────────────
export function P2PDisputes() {
  const [disputes, setDisputes] = useState(MOCK_P2P_DISPUTES);

  function resolve(id: string, resolution: string) {
    setDisputes((prev) => prev.map((d) => d.id === id ? { ...d, status: "resolved_refund" as const, resolution } : d));
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">P2P Disputes</h1><p className="page-subtitle">Review and resolve transfer disputes</p></div>
        <span className="badge-danger badge">{disputes.filter((d) => d.status === "open" || d.status === "investigating").length} Active</span>
      </div>

      <div className="space-y-4">
        {disputes.map((d) => (
          <div key={d.id} className={`card-section p-5 ${d.priority === "high" ? "border-red-200 bg-red-50/20" : d.priority === "medium" ? "border-amber-200 bg-amber-50/10" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-slate-800">{d.ref}</p>
                  <span className={`badge ${d.priority === "high" ? "badge-danger" : d.priority === "medium" ? "badge-warning" : "badge-neutral"}`}>{d.priority} priority</span>
                  <span className={`badge ${d.status === "open" ? "badge-danger" : d.status === "investigating" ? "badge-warning" : "badge-success"}`}>{d.status.replace("_", " ")}</span>
                </div>
                <p className="text-sm text-slate-600"><strong>{d.senderName}</strong> → <strong>{d.receiverName}</strong> · {formatKES(d.amount, true)}</p>
                <p className="text-sm text-slate-700 mt-1"><strong>Reason:</strong> {d.reason}</p>
                <p className="text-xs text-slate-500 mt-1">{d.description}</p>
                <p className="text-xs text-slate-400 mt-1">Opened {relativeTime(d.openedAt)}</p>
              </div>
              {d.resolution && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-700 max-w-xs">
                  <strong>Resolution:</strong> {d.resolution}
                </div>
              )}
            </div>

            {(d.status === "open" || d.status === "investigating") && (
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => resolve(d.id, "Transfer reversed — funds returned to sender.")} className="text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg">
                  Reverse Transfer
                </button>
                <button onClick={() => resolve(d.id, "Dispute rejected — transfer deemed valid.")} className="text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg">
                  Reject Dispute
                </button>
                <button className="text-xs font-semibold text-amber-700 border border-amber-200 hover:bg-amber-50 px-3 py-1.5 rounded-lg">
                  Escalate to Legal
                </button>
                <button className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                  Request Evidence
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
