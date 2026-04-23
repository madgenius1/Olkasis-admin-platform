"use client";

import { useState } from "react";
import {
  HeadphonesIcon, MessageSquare, Clock, CheckCircle, AlertTriangle,
  Send, Search, ChevronDown, User, Inbox,
} from "lucide-react";
import { MOCK_TICKETS, MOCK_LIVE_CHATS } from "@/src/lib/mockData";
import { relativeTime } from "@/src/lib/utils";
import { PRIORITY_BADGE } from "@/src/types";
import type { TicketStatus, TicketPriority } from "@/src/types";
import Link from "next/link";

// ─── Support Overview ─────────────────────────────────────────────
export function SupportOverview() {
  const open = MOCK_TICKETS.filter((t) => t.status === "open").length;
  const inProgress = MOCK_TICKETS.filter((t) => t.status === "in_progress").length;
  const resolved = MOCK_TICKETS.filter((t) => t.status === "resolved").length;
  const urgent = MOCK_TICKETS.filter((t) => t.priority === "urgent").length;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Customer Support</h1><p className="page-subtitle">Ticket management, live chat & support analytics</p></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Open Tickets", value: open, color: "bg-red-50 text-red-700 border-red-200" },
          { label: "In Progress", value: inProgress, color: "bg-amber-50 text-amber-700 border-amber-200" },
          { label: "Resolved Today", value: resolved, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          { label: "Urgent", value: urgent, color: "bg-red-100 text-red-800 border-red-300" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-5 ${s.color}`}>
            <p className="text-3xl font-black font-mono">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {[
          { title: "Ticket Queue", desc: `${open} open · ${urgent} urgent`, href: "/support/tickets", icon: Inbox },
          { title: "Live Chat", desc: `${MOCK_LIVE_CHATS.filter(c => c.status === "waiting").length} waiting · ${MOCK_LIVE_CHATS.filter(c => c.status === "active").length} active`, href: "/support/live-chat", icon: MessageSquare },
        ].map((c) => (
          <Link key={c.title} href={c.href} className="card-section p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <c.icon className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-slate-800">{c.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* SLA metrics */}
      <div className="card-section p-5">
        <h3 className="card-section-title mb-4">SLA Performance — This Week</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "First Response (Target: 1h)", actual: "42 min", pct: 94, good: true },
            { label: "Resolution Time (Target: 24h)", actual: "18.4h", pct: 82, good: true },
            { label: "SLA Breach Rate", actual: "6%", pct: 6, good: false },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600 font-medium">{m.label}</span>
                <span className={`font-mono font-bold ${m.good ? "text-emerald-600" : "text-red-500"}`}>{m.actual}</span>
              </div>
              <div className="progress-bar-track">
                <div className={`progress-bar-fill ${m.good ? "bg-emerald-500" : "bg-red-500"}`} style={{ width: `${Math.min(100, m.pct)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tickets ──────────────────────────────────────────────────────
export function Tickets() {
  const [tickets] = useState(MOCK_TICKETS);
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TicketStatus>("all");

  const filtered = tickets.filter((t) => statusFilter === "all" || t.status === statusFilter);
  const selectedTicket = tickets.find((t) => t.id === selected);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Support Tickets</h1><p className="page-subtitle">All open, in-progress and resolved tickets</p></div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "open", "in_progress", "pending_user", "resolved", "closed"] as const).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)} className={statusFilter === f ? "filter-chip-active" : "filter-chip-inactive"}>
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Ticket list */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected === t.id ? "border-blue-400 bg-blue-50" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-bold text-slate-800 text-sm truncate">{t.subject}</p>
                <span className={`badge ${PRIORITY_BADGE[t.priority]} shrink-0`}>{t.priority}</span>
              </div>
              <p className="text-xs text-slate-500">{t.userName} · {t.category}</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`badge text-[10px] ${t.status === "open" ? "badge-danger" : t.status === "in_progress" ? "badge-warning" : t.status === "resolved" ? "badge-success" : "badge-neutral"}`}>
                  {t.status.replace("_", " ")}
                </span>
                <span className="text-[10px] text-slate-400">{relativeTime(t.createdAt)}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Ticket detail */}
        <div className="lg:col-span-3">
          {selectedTicket ? (
            <div className="card-section flex flex-col h-full min-h-[500px]">
              <div className="card-section-header">
                <div>
                  <p className="font-bold text-slate-800">{selectedTicket.subject}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedTicket.ref} · {selectedTicket.userName} · <span className="font-mono">{selectedTicket.userEmail}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${PRIORITY_BADGE[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
                  <select className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none text-slate-600">
                    <option>Assign agent…</option>
                    <option>Tom Support</option>
                    <option>Jane Compliance</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedTicket.messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.sender === "agent" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${m.sender === "user" ? "bg-slate-400" : "bg-blue-600"}`}>
                      {m.sender === "user" ? "U" : "A"}
                    </div>
                    <div className={`max-w-xs p-3 rounded-xl text-sm ${m.sender === "agent" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                      <p className={`text-[10px] font-bold mb-1 ${m.sender === "agent" ? "text-blue-200" : "text-slate-500"}`}>{m.senderName}</p>
                      <p>{m.content}</p>
                      <p className={`text-[10px] mt-1 ${m.sender === "agent" ? "text-blue-200" : "text-slate-400"}`}>{relativeTime(m.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-4 flex gap-2">
                <textarea
                  value={reply} onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply…"
                  rows={2}
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button onClick={() => setReply("")} className="w-9 h-9 rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center justify-center transition-colors self-end">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="card-section flex items-center justify-center h-[500px]">
              <div className="text-center text-slate-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-semibold">Select a ticket to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Live Chat ────────────────────────────────────────────────────
export function LiveChat() {
  const [sessions, setSessions] = useState(MOCK_LIVE_CHATS);
  const [selected, setSelected] = useState<string | null>(MOCK_LIVE_CHATS[0]?.id ?? null);
  const [message, setMessage] = useState("");

  const selectedSession = sessions.find((s) => s.id === selected);

  function acceptChat(id: string) {
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, status: "active" as const, agentName: "Tom Support" } : s));
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Live Chat</h1><p className="page-subtitle">Real-time user support sessions</p></div>
        <div className="flex items-center gap-2">
          <div className="live-badge"><span className="live-dot" />Live</div>
          <span className="badge-warning badge">{sessions.filter((s) => s.status === "waiting").length} Waiting</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Session list */}
        <div className="lg:col-span-2 space-y-2">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected === s.id ? "border-blue-400 bg-blue-50" : "bg-white border-slate-200 hover:border-slate-300"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-slate-800 text-sm">{s.userName}</p>
                <span className={`badge ${s.status === "active" ? "badge-success" : s.status === "waiting" ? "badge-warning" : "badge-neutral"}`}>
                  {s.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{s.topic ?? "No topic"}</p>
              {s.status === "waiting" && (
                <p className="text-xs text-amber-600 font-semibold mt-1">Queue position: #{s.queue}</p>
              )}
              <p className="text-[10px] text-slate-400 mt-1">{relativeTime(s.startedAt)}</p>
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="lg:col-span-3">
          {selectedSession ? (
            <div className="card-section flex flex-col min-h-[500px]">
              <div className="card-section-header">
                <div>
                  <p className="font-bold text-slate-800">{selectedSession.userName}</p>
                  <p className="text-xs text-slate-500">{selectedSession.topic} · Started {relativeTime(selectedSession.startedAt)}</p>
                </div>
                {selectedSession.status === "waiting" && (
                  <button onClick={() => acceptChat(selectedSession.id)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors">
                    Accept Chat
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                {selectedSession.status === "waiting" ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-400">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm font-semibold">User is waiting in queue</p>
                      <p className="text-xs mt-1">Click "Accept Chat" to begin</p>
                    </div>
                  </div>
                ) : (
                  selectedSession.messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.sender === "agent" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${m.sender === "user" ? "bg-slate-400" : "bg-blue-600"}`}>
                        {m.sender === "user" ? "U" : "A"}
                      </div>
                      <div className={`max-w-xs p-3 rounded-xl text-sm ${m.sender === "agent" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                        <p>{m.content}</p>
                        <p className={`text-[10px] mt-1 ${m.sender === "agent" ? "text-blue-200" : "text-slate-400"}`}>{relativeTime(m.timestamp)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {selectedSession.status === "active" && (
                <div className="border-t border-slate-100 p-4 flex gap-2">
                  <textarea
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message…"
                    rows={2}
                    className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button onClick={() => setMessage("")} className="w-9 h-9 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center transition-colors self-end">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card-section flex items-center justify-center h-[500px]">
              <div className="text-center text-slate-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-semibold">Select a session</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
