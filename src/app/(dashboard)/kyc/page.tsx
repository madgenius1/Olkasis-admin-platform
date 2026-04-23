"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle, XCircle, AlertTriangle, FileCheck } from "lucide-react";
import { MOCK_KYC_QUEUE } from "@/lib/mockData";
import { relativeTime } from "@/lib/utils";
import type { KYCPriority } from "@/types";

const PRIORITY_COLOR: Record<KYCPriority, string> = {
  urgent: "badge-danger",
  high: "badge-warning",
  normal: "badge-neutral",
};

export default function KYCQueuePage() {
  const [queue] = useState(MOCK_KYC_QUEUE);

  const stats = [
    { label: "Pending Review", value: queue.length, icon: Clock, color: "bg-amber-50 text-amber-700" },
    { label: "Urgent", value: queue.filter((k) => k.priority === "urgent").length, icon: AlertTriangle, color: "bg-red-50 text-red-700" },
    { label: "Approved Today", value: 48, icon: CheckCircle, color: "bg-emerald-50 text-emerald-700" },
    { label: "Rejected Today", value: 6, icon: XCircle, color: "bg-red-50 text-red-700" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">KYC Review Queue</h1>
          <p className="page-subtitle">Pending identity verifications awaiting review</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <FileCheck className="w-4 h-4" /> Batch Approve
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon-wrap ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div><p className="stat-label">{s.label}</p><p className="stat-value">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <h3 className="card-section-title">Pending KYC ({queue.length})</h3>
          <div className="flex gap-2">
            <select className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none text-slate-600">
              <option>Sort by: Wait Time</option>
              <option>Sort by: Priority</option>
              <option>Sort by: Risk Score</option>
            </select>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>User</th><th>Account Type</th><th>Submitted</th><th>Wait</th><th>Provider</th><th>Risk Score</th><th>Priority</th><th>Action</th></tr>
          </thead>
          <tbody>
            {queue.map((k) => (
              <tr key={k.id}>
                <td>
                  <div>
                    <p className="font-semibold text-slate-800">{k.userName}</p>
                    <p className="text-xs text-slate-500">{k.userEmail}</p>
                  </div>
                </td>
                <td><span className="badge-neutral badge capitalize">{k.accountType}</span></td>
                <td className="text-xs text-slate-500">{relativeTime(k.submittedAt)}</td>
                <td className="font-mono font-bold text-amber-700">{k.waitTime}</td>
                <td>
                  <span className="badge-info badge">{k.verificationProvider.replace("_", " ")}</span>
                  <span className={`badge ml-1 ${k.providerStatus === "passed" ? "badge-success" : k.providerStatus === "failed" ? "badge-danger" : "badge-warning"}`}>
                    {k.providerStatus.replace("_", " ")}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar-track w-12">
                      <div className={`progress-bar-fill ${k.riskScore > 50 ? "bg-red-500" : k.riskScore > 25 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${k.riskScore}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold">{k.riskScore}</span>
                  </div>
                </td>
                <td><span className={`badge ${PRIORITY_COLOR[k.priority]}`}>{k.priority}</span></td>
                <td>
                  <Link href={`/kyc/review/${k.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
