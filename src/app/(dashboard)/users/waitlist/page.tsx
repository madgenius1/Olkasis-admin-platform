"use client";

import { useState } from "react";
import { ListChecks, Send, Clock, CheckCircle, UserPlus } from "lucide-react";
import { MOCK_WAITLIST } from "@/src/lib/mockData";
import { relativeTime } from "@/src/lib/utils";

export default function WaitlistPage() {
  const [entries, setEntries] = useState(MOCK_WAITLIST);

  function invite(id: string) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, status: "invited" as const } : e));
  }

  const waiting = entries.filter((e) => e.status === "waiting").length;
  const invited = entries.filter((e) => e.status === "invited").length;
  const registered = entries.filter((e) => e.status === "registered").length;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Waitlist</h1>
          <p className="page-subtitle">Manage users awaiting platform access</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <Send className="w-4 h-4" /> Invite All Pending
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Waiting", value: waiting, icon: Clock, color: "bg-amber-50 text-amber-700" },
          { label: "Invited", value: invited, icon: Send, color: "bg-blue-50 text-blue-700" },
          { label: "Registered", value: registered, icon: CheckCircle, color: "bg-emerald-50 text-emerald-700" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon-wrap ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div><p className="stat-label">{s.label}</p><p className="stat-value">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <h3 className="card-section-title">Waitlist Queue ({entries.length})</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Joined</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="font-mono font-bold text-slate-400">{e.position}</td>
                <td className="font-semibold text-slate-800">{e.name}</td>
                <td className="text-slate-500">{e.email}</td>
                <td className="font-mono text-xs">{e.phone}</td>
                <td>
                  <span className={`badge ${e.source === "referral" ? "badge-purple" : e.source === "organic" ? "badge-neutral" : e.source === "social" ? "badge-info" : "badge-gold"}`}>
                    {e.source}
                  </span>
                </td>
                <td className="text-xs text-slate-500">{relativeTime(e.joinedAt)}</td>
                <td>
                  <span className={`badge ${e.status === "registered" ? "badge-success" : e.status === "invited" ? "badge-info" : "badge-warning"}`}>
                    {e.status}
                  </span>
                </td>
                <td>
                  {e.status === "waiting" && (
                    <button
                      onClick={() => invite(e.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Invite
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
