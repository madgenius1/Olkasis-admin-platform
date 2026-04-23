"use client";

import { useState } from "react";
import { Bot, Flag, CheckCircle, AlertTriangle, MessageSquare, Settings, BarChart3, TrendingUp } from "lucide-react";
import { MOCK_RAFIKI_CONVERSATIONS } from "@/src/lib/mockData";
import { relativeTime } from "@/src/lib/utils";
import type { RafikiConversation } from "@/src/types";

type RafikiTab = "conversations" | "flagged" | "metrics" | "config";

export default function RafikiPage() {
  const [tab, setTab] = useState<RafikiTab>("conversations");
  const [conversations, setConversations] = useState(MOCK_RAFIKI_CONVERSATIONS);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Rafiki, a helpful and knowledgeable investment assistant for Zanari. You help users understand investments, market data, and how to use the Zanari platform. You never provide specific investment advice or guarantee returns. Always recommend users consult a licensed financial advisor for major decisions."
  );
  const [blacklist, setBlacklist] = useState(["guaranteed returns", "get rich quick", "pyramid", "ponzi"]);
  const [newTopic, setNewTopic] = useState("");

  const flagged = conversations.filter((c) => c.isFlagged);

  function approve(id: string) {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, actionStatus: "approved" as const } : c));
  }

  function dismiss(id: string) {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, isFlagged: false } : c));
  }

  const tabs: { key: RafikiTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "conversations", label: "All Conversations", icon: MessageSquare },
    { key: "flagged", label: `Flagged (${flagged.length})`, icon: Flag },
    { key: "metrics", label: "Performance", icon: BarChart3 },
    { key: "config", label: "Configuration", icon: Settings },
  ];

  const ConversationCard = ({ c }: { c: RafikiConversation }) => (
    <div className={`card-section p-5 ${c.isFlagged ? "border-amber-300 bg-amber-50/20" : ""}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-bold text-slate-800">{c.userName}</p>
            <span className="badge-neutral badge">{c.topic}</span>
            {c.isFlagged && <span className="badge-warning badge flex items-center gap-1"><Flag className="w-2.5 h-2.5" /> Flagged</span>}
            {c.escalated && <span className="badge-danger badge">Escalated</span>}
          </div>
          <p className="text-xs text-slate-400">{relativeTime(c.timestamp)}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`badge ${c.sentiment === "positive" ? "badge-success" : c.sentiment === "negative" ? "badge-danger" : "badge-neutral"}`}>
            {c.sentiment}
          </span>
          {c.satisfactionScore && (
            <span className="text-xs font-mono font-bold text-amber-600">{c.satisfactionScore}/5 ★</span>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="p-3 bg-slate-100 rounded-lg">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">User</p>
          <p className="text-sm text-slate-800">{c.query}</p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-xs font-bold text-blue-500 uppercase mb-1">Rafiki</p>
          <p className="text-sm text-slate-700">{c.response}</p>
        </div>
      </div>

      {c.flagReason && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium">{c.flagReason}</p>
        </div>
      )}

      {c.isFlagged && c.actionStatus === "pending" && (
        <div className="flex gap-2">
          <button onClick={() => approve(c.id)} className="text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Approve Response
          </button>
          <button onClick={() => dismiss(c.id)} className="text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg">
            Dismiss Flag
          </button>
          <button className="text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg">
            Block Topic
          </button>
        </div>
      )}
      {c.actionStatus === "approved" && <span className="badge-success badge flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Approved</span>}
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rafiki AI Oversight</h1>
          <p className="page-subtitle">Conversation logs, flagged responses, performance metrics & configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge"><span className="live-dot" />Active</div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Queries Today", value: "1,248", icon: MessageSquare, color: "bg-blue-50 text-blue-700" },
          { label: "Flagged", value: flagged.length, icon: Flag, color: "bg-amber-50 text-amber-700" },
          { label: "Escalated", value: conversations.filter(c => c.escalated).length, icon: AlertTriangle, color: "bg-red-50 text-red-700" },
          { label: "Avg Satisfaction", value: "4.2 / 5", icon: TrendingUp, color: "bg-emerald-50 text-emerald-700" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon-wrap ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div><p className="stat-label">{s.label}</p><p className="stat-value">{s.value}</p></div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit flex-wrap">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {/* All Conversations */}
      {tab === "conversations" && (
        <div className="space-y-3">
          {conversations.map((c) => <ConversationCard key={c.id} c={c} />)}
        </div>
      )}

      {/* Flagged */}
      {tab === "flagged" && (
        <div className="space-y-3">
          {flagged.length === 0 ? (
            <div className="empty-state text-slate-400">
              <CheckCircle className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
              <p className="text-sm font-semibold">No flagged conversations</p>
            </div>
          ) : (
            flagged.map((c) => <ConversationCard key={c.id} c={c} />)
          )}
        </div>
      )}

      {/* Metrics */}
      {tab === "metrics" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card-section p-5">
              <h3 className="card-section-title mb-4">Top Query Topics</h3>
              <div className="space-y-3">
                {[
                  { topic: "Trading Help", count: 428, pct: 34 },
                  { topic: "Account Info", count: 312, pct: 25 },
                  { topic: "Withdrawals", count: 186, pct: 15 },
                  { topic: "Investment Advice", count: 162, pct: 13 },
                  { topic: "KYC / Verification", count: 112, pct: 9 },
                  { topic: "Compliance Risk", count: 48, pct: 4 },
                ].map((t) => (
                  <div key={t.topic}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">{t.topic}</span>
                      <span className="font-mono text-slate-500">{t.count} · {t.pct}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill bg-blue-500" style={{ width: `${t.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-section p-5">
              <h3 className="card-section-title mb-4">Response Quality</h3>
              <div className="space-y-4">
                {[
                  { label: "User Satisfaction", value: "4.2 / 5.0", pct: 84, color: "bg-emerald-500" },
                  { label: "Query Resolution Rate", value: "87.4%", pct: 87, color: "bg-blue-500" },
                  { label: "Escalation Rate", value: "3.2%", pct: 3, color: "bg-amber-500" },
                  { label: "Flag Rate", value: "1.8%", pct: 2, color: "bg-red-500" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600 font-medium">{m.label}</span>
                      <span className="font-mono font-bold text-slate-800">{m.value}</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className={`progress-bar-fill ${m.color}`} style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Config */}
      {tab === "config" && (
        <div className="space-y-5">
          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-1">System Prompt</h3>
            <p className="text-xs text-slate-500 mb-4">Defines Rafiki's personality, capabilities and guardrails. Changes take effect immediately.</p>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={6}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-800"
            />
            <div className="flex justify-end mt-3">
              <button className="bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">Save Prompt</button>
            </div>
          </div>

          <div className="card-section p-6">
            <h3 className="font-bold text-slate-800 mb-1">Topic Blacklist</h3>
            <p className="text-xs text-slate-500 mb-4">Rafiki will decline to engage with any queries containing these terms.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {blacklist.map((t) => (
                <span key={t} className="flex items-center gap-1.5 badge-danger badge">
                  {t}
                  <button onClick={() => setBlacklist((prev) => prev.filter((b) => b !== t))} className="hover:text-red-900 ml-0.5">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newTopic} onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Add blacklisted topic…"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => { if (newTopic.trim()) { setBlacklist((p) => [...p, newTopic.trim()]); setNewTopic(""); } }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
