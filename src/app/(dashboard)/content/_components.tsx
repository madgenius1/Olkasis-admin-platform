"use client";

import { useState } from "react";
import {
  Newspaper, GraduationCap, Plus, Bell, Eye, Edit,
  Trash2, BookOpen, Star, Award,
} from "lucide-react";
import { MOCK_NEWS, MOCK_LESSONS, MOCK_BADGES } from "@/lib/mockData";
import { relativeTime } from "@/lib/utils";
import type { LessonStatus } from "@/types";

// ─── News & Content ───────────────────────────────────────────────
export function ContentNews() {
  const [articles, setArticles] = useState(MOCK_NEWS);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">News & Media</h1><p className="page-subtitle">Publish market news, push notifications & content</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Published", value: articles.filter((a) => a.status === "published").length, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          { label: "Scheduled", value: articles.filter((a) => a.status === "scheduled").length, color: "bg-amber-50 text-amber-700 border-amber-200" },
          { label: "Drafts", value: articles.filter((a) => a.status === "draft").length, color: "bg-slate-50 text-slate-700 border-slate-200" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
            <p className="text-2xl font-black font-mono">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {articles.map((a) => (
          <div key={a.id} className="card-section p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-bold text-slate-800">{a.title}</p>
                  <span className={`badge ${a.status === "published" ? "badge-success" : a.status === "scheduled" ? "badge-warning" : "badge-neutral"}`}>
                    {a.status}
                  </span>
                  <span className="badge-neutral badge">{a.category}</span>
                  {a.isPushNotification && <span className="badge-info badge flex items-center gap-1"><Bell className="w-2.5 h-2.5" /> Push</span>}
                </div>
                <p className="text-sm text-slate-600">{a.summary}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span>By {a.author}</span>
                  {a.publishedAt && <span>{relativeTime(a.publishedAt)}</span>}
                  {a.views > 0 && <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{a.views.toLocaleString()} views</span>}
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Create New Article</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Title</label>
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Article headline…" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Summary</label>
                <textarea rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Brief summary…" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Category</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none">
                    <option>Market Update</option><option>Macro</option><option>Products</option><option>Company News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Status</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none">
                    <option>draft</option><option>published</option><option>scheduled</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm font-semibold text-slate-700">Send as push notification</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800">Publish Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Learning Hub ─────────────────────────────────────────────────
export function LearningHub() {
  const [lessonTab, setLessonTab] = useState<"lessons" | "badges">("lessons");
  const [statusFilter, setStatusFilter] = useState<"all" | LessonStatus>("all");

  const filtered = MOCK_LESSONS.filter((l) => statusFilter === "all" || l.status === statusFilter);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1 className="page-title">Learning Hub</h1><p className="page-subtitle">Lessons, quizzes, badges & completion tracking</p></div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> New Lesson
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Lessons", value: MOCK_LESSONS.length },
          { label: "Published", value: MOCK_LESSONS.filter((l) => l.status === "published").length },
          { label: "Total Completions", value: MOCK_LESSONS.reduce((a, l) => a + l.completions, 0).toLocaleString() },
          { label: "Badges Created", value: MOCK_BADGES.length },
        ].map((s) => (
          <div key={s.label} className="kpi-card">
            <p className="stat-label">{s.label}</p>
            <p className="kpi-value text-xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {[{ key: "lessons" as const, label: "Lessons", icon: BookOpen }, { key: "badges" as const, label: "Badges", icon: Award }].map((t) => (
          <button key={t.key} onClick={() => setLessonTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${lessonTab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {lessonTab === "lessons" && (
        <>
          <div className="flex gap-2 mb-4">
            {(["all", "published", "draft", "archived"] as const).map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)} className={statusFilter === f ? "filter-chip-active" : "filter-chip-inactive"}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((l) => (
              <div key={l.id} className="card-section p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-bold text-slate-800">{l.title}</p>
                      <span className={`badge ${l.status === "published" ? "badge-success" : l.status === "draft" ? "badge-neutral" : "badge-warning"}`}>{l.status}</span>
                      <span className={`badge ${l.difficulty === "beginner" ? "badge-success" : l.difficulty === "intermediate" ? "badge-warning" : "badge-danger"}`}>{l.difficulty}</span>
                      <span className="badge-neutral badge">{l.type}</span>
                    </div>
                    <p className="text-sm text-slate-600">{l.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span>{l.duration} min</span>
                      <span>{l.category}</span>
                      {l.completions > 0 && <span>{l.completions.toLocaleString()} completions</span>}
                      {l.avgRating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{l.avgRating.toFixed(1)}
                        </span>
                      )}
                      {l.quizPassRate !== undefined && l.quizPassRate > 0 && <span>Quiz pass: {l.quizPassRate}%</span>}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600"><Edit className="w-3.5 h-3.5" /></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {lessonTab === "badges" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_BADGES.map((b) => (
            <div key={b.id} className="card-section p-5 text-center">
              <div className="text-4xl mb-3">{b.icon}</div>
              <p className="font-bold text-slate-800 mb-1">{b.name}</p>
              <p className="text-xs text-slate-500 mb-3">{b.description}</p>
              <p className="text-xs text-slate-400 mb-2">{b.criteria}</p>
              <p className="text-sm font-mono font-bold text-blue-700">{b.earnedCount.toLocaleString()} earned</p>
              <div className="flex gap-2 mt-3 justify-center">
                <button className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1 rounded-lg"><Edit className="w-3 h-3 inline mr-1" />Edit</button>
              </div>
            </div>
          ))}
          <button className="card-section p-5 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer min-h-[180px] border-dashed">
            <Plus className="w-8 h-8 mb-2" />
            <p className="text-sm font-semibold">New Badge</p>
          </button>
        </div>
      )}
    </div>
  );
}
