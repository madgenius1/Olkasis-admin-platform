"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Eye, AlertTriangle, User } from "lucide-react";
import { MOCK_KYC_QUEUE } from "@/lib/mockData";
import { relativeTime } from "@/lib/utils";

const REJECTION_REASONS = [
  "Document expired",
  "Document unclear / unreadable",
  "Name mismatch",
  "Date of birth mismatch",
  "Suspected fraudulent document",
  "Liveness check failed",
  "Selfie does not match ID",
  "Incomplete submission",
];

export default function KYCReviewPage() {
  const { id } = useParams<{ id: string }>();
  const entry = MOCK_KYC_QUEUE.find((k) => k.id === id) ?? MOCK_KYC_QUEUE[0];
  const [decision, setDecision] = useState<"approve" | "reject" | "request_docs" | null>(null);
  const [reason, setReason] = useState(REJECTION_REASONS[0]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit() { setSubmitted(true); }

  if (submitted) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${decision === "approve" ? "bg-emerald-100" : "bg-red-100"}`}>
          {decision === "approve"
            ? <CheckCircle className="w-8 h-8 text-emerald-600" />
            : <XCircle className="w-8 h-8 text-red-600" />}
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          KYC {decision === "approve" ? "Approved" : decision === "reject" ? "Rejected" : "Documents Requested"}
        </h2>
        <p className="text-slate-500 text-sm mb-6">The user will be notified via email and push notification.</p>
        <Link href="/kyc" className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Queue
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/kyc" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> KYC Queue
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-semibold text-slate-800">{entry.userName}</span>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">KYC Review — {entry.userName}</h1>
          <p className="page-subtitle">Submitted {relativeTime(entry.submittedAt)} · {entry.accountType} account</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`badge ${entry.priority === "urgent" ? "badge-danger" : entry.priority === "high" ? "badge-warning" : "badge-neutral"}`}>
            {entry.priority} priority
          </span>
          <span className="text-xs text-slate-500 font-semibold">Risk: {entry.riskScore}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Submitted info */}
        <div className="card-section">
          <div className="card-section-header">
            <h3 className="card-section-title">Submitted Information</h3>
          </div>
          <div className="p-5 space-y-3">
            {entry.documents.map((doc) => (
              <div key={doc.type} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-600">{doc.type.replace("_", " ")}</span>
                  <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:text-blue-800">
                    <Eye className="w-3.5 h-3.5" /> View Full
                  </button>
                </div>
                <div className="w-full h-32 bg-slate-200 rounded-lg flex items-center justify-center">
                  <User className="w-10 h-10 text-slate-400" />
                </div>
                {doc.ocrData && (
                  <div className="mt-3 space-y-1">
                    {Object.entries(doc.ocrData).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-slate-500 capitalize">{k}</span>
                        <span className="font-mono font-semibold text-slate-800">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Liveness + risk */}
        <div className="space-y-4">
          <div className="card-section">
            <div className="card-section-header">
              <h3 className="card-section-title">Liveness Check</h3>
              <span className={`badge ${(entry.livenessScore ?? 0) >= 85 ? "badge-success" : "badge-warning"}`}>
                {entry.providerStatus.replace("_", " ")}
              </span>
            </div>
            <div className="p-5">
              <div className="w-full h-32 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                <User className="w-10 h-10 text-slate-300" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 font-semibold">Liveness Score</span>
                <div className="flex items-center gap-2">
                  <div className="progress-bar-track w-24">
                    <div className={`progress-bar-fill ${(entry.livenessScore ?? 0) >= 85 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${entry.livenessScore ?? 0}%` }} />
                  </div>
                  <span className="font-mono font-bold text-sm">{entry.livenessScore ?? "—"}%</span>
                </div>
              </div>
            </div>
          </div>

          {entry.riskFlags.length > 0 && (
            <div className="card-section border-amber-200">
              <div className="card-section-header">
                <h3 className="card-section-title">Risk Flags</h3>
                <span className="badge-warning badge">{entry.riskFlags.length} flags</span>
              </div>
              <div className="p-4 space-y-2">
                {entry.riskFlags.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-800">{f.type}</p>
                      <p className="text-xs text-amber-600">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {entry.coHolders && (
            <div className="card-section">
              <div className="card-section-header">
                <h3 className="card-section-title">Co-Holders</h3>
              </div>
              <div className="p-4 space-y-2">
                {entry.coHolders.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.relationship} · {c.email}</p>
                    </div>
                    <span className={`badge ${c.kycStatus === "verified" ? "badge-success" : c.kycStatus === "pending" ? "badge-warning" : "badge-danger"}`}>
                      {c.kycStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decision panel */}
      <div className="card-section p-6">
        <h3 className="font-bold text-slate-800 mb-4">Decision</h3>
        <div className="flex gap-3 mb-4 flex-wrap">
          {[
            { key: "approve" as const, label: "Approve KYC", icon: CheckCircle, cls: "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
            { key: "reject" as const, label: "Reject KYC", icon: XCircle, cls: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100" },
            { key: "request_docs" as const, label: "Request Documents", icon: RefreshCw, cls: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100" },
          ].map((d) => (
            <button
              key={d.key}
              onClick={() => setDecision(d.key)}
              className={`flex items-center gap-2 border-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${d.cls} ${decision === d.key ? "ring-2 ring-offset-1 ring-blue-500" : ""}`}
            >
              <d.icon className="w-4 h-4" /> {d.label}
            </button>
          ))}
        </div>

        {decision === "reject" && (
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Rejection Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {REJECTION_REASONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Internal Note (optional)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Add context for audit trail…" />
        </div>

        <button
          onClick={submit}
          disabled={!decision}
          className="bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors"
        >
          Submit Decision
        </button>
      </div>
    </div>
  );
}
