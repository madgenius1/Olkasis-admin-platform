"use client";
// Shared compliance page components — imported per-route below

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, Siren, FileLock, FileWarning, AlertTriangle,
  CheckCircle, Eye, Download, Filter, Search,
} from "lucide-react";
import { MOCK_AML_ALERTS, MOCK_AUDIT_LOGS, MOCK_STR_REPORTS } from "@/src/lib/mockData";
import { formatKES, relativeTime } from "@/src/lib/utils";
import { ROLE_LABELS } from "@/src/types";

// ─── Compliance Overview ──────────────────────────────────────────
export function ComplianceOverview() {
  const open = MOCK_AML_ALERTS.filter((a) => a.status === "open").length;
  const critical = MOCK_AML_ALERTS.filter((a) => a.severity === "critical").length;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Compliance</h1>
          <p className="page-subtitle">AML monitoring, audit trails, STR reporting & regulatory oversight</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Open AML Alerts", value: open, color: "text-red-700 bg-red-50 border-red-200" },
          { label: "Critical Alerts", value: critical, color: "text-red-900 bg-red-100 border-red-300" },
          { label: "STRs Submitted (MTD)", value: 3, color: "text-blue-700 bg-blue-50 border-blue-200" },
          { label: "Audit Events Today", value: 48, color: "text-slate-700 bg-slate-50 border-slate-200" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-5 ${s.color}`}>
            <p className="text-3xl font-black font-mono">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "AML Alerts", desc: `${open} open · ${critical} critical`, href: "/compliance/aml-alerts", icon: Siren, color: "bg-red-700" },
          { title: "Audit Logs", desc: "Full admin action trail", href: "/compliance/audit-logs", icon: FileLock, color: "bg-blue-700" },
          { title: "STR Reports", desc: "Suspicious transaction reports", href: "/compliance/str", icon: FileWarning, color: "bg-amber-700" },
          { title: "KYC Review", desc: "24 pending verifications", href: "/kyc", icon: ShieldCheck, color: "bg-emerald-700" },
        ].map((card) => (
          <Link key={card.title} href={card.href} className="card-section p-5 hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-1">{card.title}</h4>
            <p className="text-xs text-slate-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── AML Alerts ───────────────────────────────────────────────────
export function AMLAlerts() {
  const [alerts, setAlerts] = useState(MOCK_AML_ALERTS);
  const [filter, setFilter] = useState<"all" | "open" | "investigating" | "resolved">("all");

  const filtered = alerts.filter((a) => filter === "all" || a.status === filter);

  function updateStatus(id: string, status: typeof alerts[0]["status"]) {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">AML Alerts</h1>
          <p className="page-subtitle">Anti-money laundering transaction monitoring</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "open", "investigating", "resolved"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={filter === f ? "filter-chip-active" : "filter-chip-inactive"}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "open" && <span className="ml-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{alerts.filter(a => a.status === "open").length}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <div key={a.id} className={`card-section p-5 ${a.severity === "critical" ? "border-red-300 bg-red-50/30" : a.severity === "high" ? "border-orange-200" : ""}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${a.severity === "critical" ? "bg-red-600" : a.severity === "high" ? "bg-red-400" : a.severity === "medium" ? "bg-amber-400" : "bg-slate-300"}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-slate-800">{a.userName}</p>
                    <span className={`badge ${a.severity === "critical" || a.severity === "high" ? "badge-danger" : a.severity === "medium" ? "badge-warning" : "badge-neutral"}`}>{a.severity}</span>
                    <span className="badge-purple badge">{a.type.replace(/_/g, " ")}</span>
                  </div>
                  <p className="text-sm text-slate-600">{a.description}</p>
                  {a.amount && <p className="text-xs text-slate-500 mt-1">Amount: <strong>{formatKES(a.amount, true)}</strong></p>}
                  <p className="text-xs text-slate-400 mt-1">{relativeTime(a.triggeredAt)}{a.assignedTo ? ` · Assigned to ${a.assignedTo}` : ""}</p>
                </div>
              </div>
              <span className={`badge shrink-0 ${a.status === "open" ? "badge-danger" : a.status === "investigating" ? "badge-warning" : a.status === "resolved" ? "badge-success" : "badge-neutral"}`}>
                {a.status}
              </span>
            </div>

            {a.notes && <p className="text-xs text-slate-500 italic mb-3 pl-5">Note: {a.notes}</p>}

            <div className="flex gap-2 pl-5 flex-wrap">
              {a.status === "open" && (
                <button onClick={() => updateStatus(a.id, "investigating")} className="text-xs font-semibold text-amber-700 border border-amber-200 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg">
                  Start Investigation
                </button>
              )}
              {(a.status === "open" || a.status === "investigating") && (
                <>
                  <button onClick={() => updateStatus(a.id, "resolved")} className="text-xs font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 px-3 py-1.5 rounded-lg">
                    Mark Resolved
                  </button>
                  <button onClick={() => updateStatus(a.id, "escalated")} className="text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg">
                    Escalate to MLRO
                  </button>
                  <Link href="/compliance/str" className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                    File STR
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Audit Logs ───────────────────────────────────────────────────
export function AuditLogs() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_AUDIT_LOGS.filter(
    (l) => !search || l.adminName.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">Complete admin action trail — timestamped & IP-logged</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 mb-4 max-w-sm">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search admin, action, details…" className="bg-transparent text-sm outline-none w-full text-slate-700" />
      </div>

      <div className="card-section">
        <table className="data-table">
          <thead><tr><th>Timestamp</th><th>Admin</th><th>Role</th><th>Action</th><th>Target</th><th>IP</th><th>Severity</th><th>Result</th></tr></thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td className="font-mono text-xs text-slate-500">{relativeTime(log.timestamp)}</td>
                <td className="font-semibold text-slate-800">{log.adminName}</td>
                <td className="text-xs"><span className="badge-neutral badge">{ROLE_LABELS[log.adminRole]}</span></td>
                <td className="font-mono text-xs font-bold text-blue-700">{log.action}</td>
                <td className="text-xs text-slate-600">{log.target}{log.targetId ? ` #${log.targetId}` : ""}</td>
                <td className="font-mono text-xs text-slate-400">{log.ipAddress}</td>
                <td><span className={`badge ${log.severity === "critical" ? "badge-danger" : log.severity === "warning" ? "badge-warning" : "badge-neutral"}`}>{log.severity}</span></td>
                <td><span className={`badge ${log.outcome === "success" ? "badge-success" : "badge-danger"}`}>{log.outcome}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── STR Reports ──────────────────────────────────────────────────
export function STRReports() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">STR Reports</h1>
          <p className="page-subtitle">Suspicious Transaction Reports — FRC & CBK submissions</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
          <FileWarning className="w-4 h-4" /> New STR
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_STR_REPORTS.map((str) => (
          <div key={str.id} className="card-section p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-slate-800">{str.userName}</p>
                  <span className={`badge ${str.status === "submitted" ? "badge-success" : str.status === "pending_approval" ? "badge-warning" : "badge-neutral"}`}>
                    {str.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Period: {str.dateRange} · Amount: {formatKES(str.totalAmount, true)}</p>
                {str.regulatoryRef && <p className="text-xs font-mono text-blue-700 mt-0.5">Ref: {str.regulatoryRef}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Created by {str.createdBy}</p>
                <p className="text-xs text-slate-400">{relativeTime(str.createdAt)}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3"><strong>Reason:</strong> {str.reason}</p>
            <p className="text-xs text-slate-500 line-clamp-2">{str.narrative}</p>
            <div className="flex gap-2 mt-3">
              <button className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg">View Full Report</button>
              {str.status !== "submitted" && (
                <button className="text-xs font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 px-3 py-1.5 rounded-lg">Submit to FRC</button>
              )}
              <button className="text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Download className="w-3 h-3" /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Create Suspicious Transaction Report</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">User</label>
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search user name or ID…" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Reason for Report</label>
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief reason…" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Narrative</label>
                <textarea rows={4} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Detailed description of suspicious activity…" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800">Save as Draft</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
