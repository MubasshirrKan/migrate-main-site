import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Route as RouteIcon, Bot, FileCheck2, BookOpen, BarChart3, Users,
  Bell, Search, Sun, Moon, Send, Upload, Download, CheckCircle2, Clock, AlertCircle,
  ArrowRight, ArrowLeft, Sparkles, GraduationCap, Plane, FileText, Wallet, Globe2,
  CalendarDays, ChevronRight, Lock, MessageCircle, ExternalLink, TrendingUp, Trophy
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/1234567890";

// ── Student (mock) ───────────────────────────────────────────────────────────
const STUDENT = {
  name: "Rafiq Ahmed",
  first: "Rafiq",
  initials: "RA",
  goal: "Master's · Computer Science",
  matchScore: 89,
  destination: "Canada",
  intake: "Fall 2026",
};

type SectionId = "overview" | "roadmap" | "coach" | "documents" | "resources" | "reports" | "community";

const NAV: { id: SectionId; label: string; short: string; icon: React.ReactNode }[] = [
  { id: "overview",  label: "Dashboard",  short: "Home",     icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { id: "roadmap",   label: "My Roadmap", short: "Roadmap",  icon: <RouteIcon className="w-[18px] h-[18px]" /> },
  { id: "coach",     label: "AI Coach",   short: "Coach",    icon: <Bot className="w-[18px] h-[18px]" /> },
  { id: "documents", label: "Documents",  short: "Docs",     icon: <FileCheck2 className="w-[18px] h-[18px]" /> },
  { id: "resources", label: "Resources",  short: "Files",    icon: <BookOpen className="w-[18px] h-[18px]" /> },
  { id: "reports",   label: "Reports",    short: "Reports",  icon: <BarChart3 className="w-[18px] h-[18px]" /> },
  { id: "community", label: "Community",  short: "Group",    icon: <Users className="w-[18px] h-[18px]" /> },
];

// ── Small UI helpers ─────────────────────────────────────────────────────────
const card = "rounded-2xl border border-[var(--p-border)] bg-[var(--p-surface)]";

function StatusPill({ status }: { status: "done" | "progress" | "pending" | "locked" }) {
  const map = {
    done:     { c: "text-emerald-500 bg-emerald-500/12 border-emerald-500/25", t: "Done",        i: <CheckCircle2 className="w-3 h-3" /> },
    progress: { c: "text-blue-500 bg-blue-500/12 border-blue-500/25",          t: "In progress", i: <Clock className="w-3 h-3" /> },
    pending:  { c: "text-amber-500 bg-amber-500/12 border-amber-500/25",       t: "Pending",     i: <AlertCircle className="w-3 h-3" /> },
    locked:   { c: "text-[var(--p-muted)] bg-[var(--p-surface2)] border-[var(--p-border)]", t: "Locked", i: <Lock className="w-3 h-3" /> },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${map.c}`}>
      {map.i}{map.t}
    </span>
  );
}

function Ring({ value, size = 132, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--p-border)" strokeWidth="9" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#ringGrad)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - value / 100) }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F8EF7" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[var(--p-text)] text-3xl font-black tracking-tight">{value}%</span>
        {label && <span className="text-[var(--p-muted)] text-[10px] uppercase tracking-wider mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <p className="text-[#4F8EF7] text-[11px] font-bold uppercase tracking-[0.25em] mb-2">{eyebrow}</p>
      <h2 className="text-[var(--p-text)] text-2xl md:text-3xl font-black tracking-tight">{title}</h2>
      {sub && <p className="text-[var(--p-muted)] text-sm mt-2 max-w-2xl">{sub}</p>}
    </div>
  );
}

// ── Sections ─────────────────────────────────────────────────────────────────
function Overview({ go }: { go: (s: SectionId) => void }) {
  const stats = [
    { label: "Application progress", value: "62%", icon: <TrendingUp className="w-5 h-5" />, tint: "text-blue-500 bg-blue-500/12" },
    { label: "Profile match", value: `${STUDENT.matchScore}%`, icon: <Trophy className="w-5 h-5" />, tint: "text-emerald-500 bg-emerald-500/12" },
    { label: "Documents ready", value: "5 / 8", icon: <FileCheck2 className="w-5 h-5" />, tint: "text-amber-500 bg-amber-500/12" },
    { label: "Next deadline", value: "12 days", icon: <CalendarDays className="w-5 h-5" />, tint: "text-rose-500 bg-rose-500/12" },
  ];
  const tasks = [
    { t: "Upload IELTS score report", due: "Due in 3 days", s: "pending" as const },
    { t: "Finalize Statement of Purpose draft", due: "In review", s: "progress" as const },
    { t: "Confirm financial documents", due: "Due in 12 days", s: "pending" as const },
  ];
  const activity = [
    { t: "AI Coach answered your visa question", time: "2h ago", i: <Bot className="w-4 h-4" /> },
    { t: "Transcript verified by our team", time: "Yesterday", i: <CheckCircle2 className="w-4 h-4" /> },
    { t: "New scholarship match: Canada Merit Grant", time: "2 days ago", i: <Sparkles className="w-4 h-4" /> },
  ];
  return (
    <div className="space-y-6">
      {/* Hero strip */}
      <div className={`${card} relative overflow-hidden p-6 md:p-8`}>
        <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-blue-600/10 blur-[90px] pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <Ring value={STUDENT.matchScore} label="match" />
          <div className="flex-1 min-w-0">
            <p className="text-[#4F8EF7] text-[11px] font-bold uppercase tracking-[0.25em] mb-2">Your top destination</p>
            <h3 className="text-[var(--p-text)] text-3xl md:text-4xl font-black tracking-tight mb-1">
              {STUDENT.destination} <span className="overseas-glow font-serif italic font-normal">is your best match</span>
            </h3>
            <p className="text-[var(--p-muted)] text-sm mb-5">{STUDENT.goal} · {STUDENT.intake} intake</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => go("reports")} className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:shadow-[0_0_30px_rgba(37,99,235,0.45)] transition-all">
                View full report <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => go("roadmap")} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--p-text)] px-5 py-2.5 rounded-full border border-[var(--p-border-strong)] hover:bg-[var(--p-surface2)] transition-all">
                Continue roadmap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`${card} p-5`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.tint}`}>{s.icon}</div>
            <div className="text-[var(--p-text)] text-2xl font-black tracking-tight">{s.value}</div>
            <div className="text-[var(--p-muted)] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming tasks */}
        <div className={`${card} p-6 lg:col-span-2 min-w-0`}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[var(--p-text)] font-bold">Upcoming tasks</h3>
            <button onClick={() => go("roadmap")} className="text-[#4F8EF7] text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">See all <ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.t} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--p-border)] bg-[var(--p-surface2)]">
                <div className="w-9 h-9 rounded-lg bg-blue-500/12 text-blue-500 flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[var(--p-text)] text-sm font-medium truncate">{t.t}</div>
                  <div className="text-[var(--p-muted)] text-xs">{t.due}</div>
                </div>
                <StatusPill status={t.s} />
              </div>
            ))}
          </div>
        </div>
        {/* Activity */}
        <div className={`${card} p-6 min-w-0`}>
          <h3 className="text-[var(--p-text)] font-bold mb-5">Recent activity</h3>
          <div className="space-y-4">
            {activity.map((a) => (
              <div key={a.t} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--p-surface2)] text-[#4F8EF7] flex items-center justify-center shrink-0">{a.i}</div>
                <div className="min-w-0">
                  <div className="text-[var(--p-text)] text-sm leading-snug">{a.t}</div>
                  <div className="text-[var(--p-muted)] text-xs mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Roadmap() {
  const phases = [
    { n: "01", title: "Discover your destination", desc: "Complete the AI quiz and lock your best-fit country.", s: "done" as const, icon: <Globe2 className="w-5 h-5" />, items: ["Profile assessment", "AI country match", "Budget & goals confirmed"] },
    { n: "02", title: "Shortlist universities", desc: "Pick programs that match your profile and budget.", s: "done" as const, icon: <GraduationCap className="w-5 h-5" />, items: ["Review matched universities", "Check entry requirements", "Confirm intake & deadlines"] },
    { n: "03", title: "Prepare your documents", desc: "Build SOP, gather transcripts, financials and tests.", s: "progress" as const, icon: <FileText className="w-5 h-5" />, items: ["IELTS score (pending)", "SOP draft (in review)", "Transcripts (verified)", "Financial proof (pending)"] },
    { n: "04", title: "Submit applications", desc: "Apply to your shortlisted universities with our team.", s: "pending" as const, icon: <Send className="w-5 h-5" />, items: ["Application forms", "Document upload", "Fee payment"] },
    { n: "05", title: "Visa application", desc: "Step-by-step visa file prep, financials and interview prep.", s: "locked" as const, icon: <Plane className="w-5 h-5" />, items: ["Document checklist", "Financial threshold", "Interview prep"] },
    { n: "06", title: "Pre-departure", desc: "Accommodation, forex, packing and arrival checklist.", s: "locked" as const, icon: <Wallet className="w-5 h-5" />, items: ["Accommodation", "Forex & banking", "Arrival registration"] },
  ];
  return (
    <div>
      <SectionHead eyebrow="Step by step" title="Your migration roadmap" sub="Every stage from your first question to your visa approval and beyond — we guide you through each one." />
      <div className="relative">
        <div className="absolute left-[26px] top-2 bottom-2 w-px bg-[var(--p-border)] hidden sm:block" />
        <div className="space-y-4">
          {phases.map((p) => (
            <div key={p.n} className="relative flex gap-5">
              <div className={`relative z-10 shrink-0 w-[54px] h-[54px] rounded-2xl flex items-center justify-center border ${
                p.s === "done" ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                : p.s === "progress" ? "bg-blue-500/15 text-blue-500 border-blue-500/30"
                : "bg-[var(--p-surface2)] text-[var(--p-muted)] border-[var(--p-border)]"}`}>
                {p.icon}
              </div>
              <div className={`${card} flex-1 p-5 md:p-6`}>
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <span className="text-[var(--p-muted)] font-mono text-xs">{p.n}</span>
                  <h3 className="text-[var(--p-text)] font-bold">{p.title}</h3>
                  <span className="ml-auto"><StatusPill status={p.s} /></span>
                </div>
                <p className="text-[var(--p-muted)] text-sm mb-4">{p.desc}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {p.items.map((it) => (
                    <div key={it} className="flex items-center gap-2 text-sm text-[var(--p-text2)]">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.s === "done" ? "text-emerald-500" : "text-[var(--p-muted)]"}`} />
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Coach() {
  const [msgs, setMsgs] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: `Hi ${STUDENT.first}! 👋 I'm your AI Coach. Ask me anything about your applications, visa, documents, or scholarships.` },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const suggestions = [
    "What documents do I still need?",
    "How much bank balance for a Canada visa?",
    "Improve my SOP opening line",
  ];

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: "Great question — based on your Canada profile, here's what I'd suggest next. (This is a demo response; connect your Gemini/Claude key to enable live answers.)" }]);
    }, 700);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-13.5rem)] lg:h-[calc(100dvh-11rem)] min-h-[440px]">
      <SectionHead eyebrow="Personal AI coach" title="Ask anything, anytime" />
      <div className={`${card} flex-1 flex flex-col overflow-hidden`}>
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === "bot" ? "bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] text-white" : "bg-[var(--p-surface2)] text-[var(--p-text)] font-semibold text-xs"}`}>
                {m.role === "bot" ? <Bot className="w-4 h-4" /> : STUDENT.initials}
              </div>
              <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "bot" ? "bg-[var(--p-surface2)] text-[var(--p-text2)] rounded-tl-sm" : "bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] text-white rounded-tr-sm"}`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="border-t border-[var(--p-border)] p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs text-[var(--p-text2)] border border-[var(--p-border)] hover:border-[#4F8EF7]/50 hover:text-[var(--p-text)] rounded-full px-3 py-1.5 transition-colors">
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input
              value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Message your AI Coach…"
              className="flex-1 bg-[var(--p-surface2)] border border-[var(--p-border)] rounded-xl px-4 py-3 text-sm text-[var(--p-text)] placeholder:text-[var(--p-muted)] focus:outline-none focus:border-[#4F8EF7]/60"
            />
            <button type="submit" className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] text-white flex items-center justify-center hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] transition-all">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Documents() {
  const docs = [
    { t: "Academic transcripts", s: "done" as const, note: "Verified by our team" },
    { t: "Passport copy", s: "done" as const, note: "Verified" },
    { t: "IELTS score report", s: "pending" as const, note: "Upload required" },
    { t: "Statement of Purpose", s: "progress" as const, note: "AI + expert review in progress" },
    { t: "Letters of recommendation (2)", s: "progress" as const, note: "1 of 2 received" },
    { t: "Financial proof / bank statement", s: "pending" as const, note: "Upload required" },
    { t: "CV / Résumé", s: "done" as const, note: "Verified" },
    { t: "Visa application form", s: "locked" as const, note: "Unlocks after applications" },
  ];
  return (
    <div>
      <SectionHead eyebrow="Document checker" title="Your document vault" sub="Upload once. Our AI checks formatting and completeness, then a human expert reviews the critical ones." />
      <div className={`${card} p-5 mb-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--p-text)] text-sm font-semibold">Overall completeness</span>
            <span className="text-[var(--p-text)] text-sm font-bold">5 / 8</span>
          </div>
          <div className="h-2.5 rounded-full bg-[var(--p-surface2)] overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "62%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full bg-gradient-to-r from-[#4F8EF7] to-[#1D4ED8]" />
          </div>
        </div>
        <button className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white px-5 py-3 rounded-xl bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] transition-all shrink-0">
          <Upload className="w-4 h-4" /> Upload document
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {docs.map((d) => (
          <div key={d.t} className={`${card} p-4 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              d.s === "done" ? "bg-emerald-500/12 text-emerald-500"
              : d.s === "progress" ? "bg-blue-500/12 text-blue-500"
              : d.s === "pending" ? "bg-amber-500/12 text-amber-500"
              : "bg-[var(--p-surface2)] text-[var(--p-muted)]"}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[var(--p-text)] text-sm font-medium truncate">{d.t}</div>
              <div className="text-[var(--p-muted)] text-xs truncate">{d.note}</div>
            </div>
            <StatusPill status={d.s} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Resources() {
  const items = [
    { t: "Complete Study Abroad Guide", type: "PDF · 48 pages", icon: <BookOpen className="w-5 h-5" />, free: true },
    { t: "SOP Template & Examples", type: "DOCX · editable", icon: <FileText className="w-5 h-5" />, free: true },
    { t: "Canada Country Guide", type: "PDF · tuition, visa, PR", icon: <Globe2 className="w-5 h-5" />, free: true },
    { t: "IELTS Prep Pack", type: "PDF + audio", icon: <GraduationCap className="w-5 h-5" />, free: false },
    { t: "Financial Documents Checklist", type: "PDF · 1 page", icon: <Wallet className="w-5 h-5" />, free: true },
    { t: "Visa Interview Question Bank", type: "PDF · 60+ Qs", icon: <Plane className="w-5 h-5" />, free: false },
  ];
  return (
    <div>
      <SectionHead eyebrow="Digital resources" title="Everything you need, in one place" sub="Guides, templates and checklists — built specifically for Bangladeshi students." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((r) => (
          <div key={r.t} className={`${card} p-5 flex flex-col group hover:border-[var(--p-border-strong)] transition-colors`}>
            <div className="w-11 h-11 rounded-xl bg-blue-500/12 text-[#4F8EF7] flex items-center justify-center mb-4">{r.icon}</div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[var(--p-text)] font-semibold text-sm leading-tight">{r.t}</h3>
              {r.free
                ? <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/12 px-2 py-0.5 rounded-full">FREE</span>
                : <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
            </div>
            <p className="text-[var(--p-muted)] text-xs mb-5">{r.type}</p>
            <button className={`mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl py-2.5 transition-all ${
              r.free ? "text-white bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:shadow-[0_0_24px_rgba(37,99,235,0.4)]"
                     : "text-[var(--p-text)] border border-[var(--p-border-strong)] hover:bg-[var(--p-surface2)]"}`}>
              {r.free ? <><Download className="w-4 h-4" /> Download</> : <><Lock className="w-3.5 h-3.5" /> Unlock</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reports() {
  const matches = [
    { name: "Canada", pct: 89 },
    { name: "Australia", pct: 82 },
    { name: "Germany", pct: 76 },
    { name: "United Kingdom", pct: 71 },
  ];
  const readiness = [
    { label: "Academic profile", pct: 90 },
    { label: "Language (IELTS)", pct: 55 },
    { label: "Financial readiness", pct: 70 },
    { label: "Documents", pct: 62 },
  ];
  return (
    <div>
      <SectionHead eyebrow="Reports" title="Your personalised report" sub="A living snapshot of your profile, match scores and readiness across every dimension." />
      <div className="grid lg:grid-cols-2 gap-4">
        <div className={`${card} p-6`}>
          <h3 className="text-[var(--p-text)] font-bold mb-5">Destination match scores</h3>
          <div className="space-y-4">
            {matches.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[var(--p-text)] font-medium">{m.name}</span>
                  <span className="text-[var(--p-muted)] font-semibold">{m.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--p-surface2)] overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full bg-gradient-to-r from-[#4F8EF7] to-[#1D4ED8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${card} p-6`}>
          <h3 className="text-[var(--p-text)] font-bold mb-5">Readiness breakdown</h3>
          <div className="space-y-4">
            {readiness.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[var(--p-text)] font-medium">{m.label}</span>
                  <span className="text-[var(--p-muted)] font-semibold">{m.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--p-surface2)] overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${m.pct >= 75 ? "bg-emerald-500" : m.pct >= 60 ? "bg-blue-500" : "bg-amber-500"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${card} p-6 lg:col-span-2`}>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/12 text-[#4F8EF7] flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5" /></div>
            <div>
              <h3 className="text-[var(--p-text)] font-bold mb-2">What this means for you</h3>
              <p className="text-[var(--p-muted)] text-sm leading-relaxed">
                Your academics are strong and your destination match is excellent. The biggest lever right now is your <span className="text-[var(--p-text)] font-medium">IELTS</span> — booking a test in the next 3 months would lift your readiness above 80% and unlock more scholarship options. Your AI Coach can build a study plan whenever you're ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Community() {
  const channels = [
    { t: "Canada Aspirants 🇨🇦", members: "2,140 members", last: "Riya: Got my GIC approved today! 🎉" },
    { t: "IELTS Study Group", members: "3,860 members", last: "Coach: New speaking practice session at 8 PM" },
    { t: "SOP & Documents Help", members: "1,520 members", last: "Tanvir: Sharing my SOP that got accepted" },
    { t: "Scholarships & Funding", members: "2,705 members", last: "Admin: 3 new fully-funded grants posted" },
  ];
  return (
    <div>
      <SectionHead eyebrow="WhatsApp community" title="You're never doing this alone" sub="Join thousands of Bangladeshi students sharing wins, documents and answers every day." />
      <div className={`${card} relative overflow-hidden p-6 md:p-8 mb-5`}>
        <div className="absolute -top-12 -right-8 w-60 h-60 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0"><MessageCircle className="w-7 h-7" /></div>
          <div className="flex-1">
            <h3 className="text-[var(--p-text)] text-xl font-bold mb-1">Join the Migrate Properly community</h3>
            <p className="text-[var(--p-muted)] text-sm">Real-time help from peers and our advisors — free for every student.</p>
          </div>
          <button onClick={() => window.open(WHATSAPP_URL, "_blank")} className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.45)] transition-all shrink-0">
            <MessageCircle className="w-5 h-5" /> Open WhatsApp
          </button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {channels.map((c) => (
          <button key={c.t} onClick={() => window.open(WHATSAPP_URL, "_blank")} className={`${card} p-5 text-left flex items-center gap-4 hover:border-[var(--p-border-strong)] transition-colors group`}>
            <div className="w-11 h-11 rounded-xl bg-[#25D366]/12 text-[#25D366] flex items-center justify-center shrink-0"><Users className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[var(--p-text)] font-semibold text-sm truncate">{c.t}</h4>
                <span className="text-[var(--p-muted)] text-[11px] shrink-0">{c.members}</span>
              </div>
              <p className="text-[var(--p-muted)] text-xs truncate mt-1">{c.last}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--p-muted)] group-hover:text-[#25D366] transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Theme tokens ───────────────────────────────────────────────────────────
const THEME_CSS = `
.mp-portal{
  --p-bg:#08080b; --p-surface:#101014; --p-surface2:#17171d;
  --p-border:rgba(255,255,255,0.08); --p-border-strong:rgba(255,255,255,0.16);
  --p-text:#ffffff; --p-text2:rgba(255,255,255,0.72); --p-muted:rgba(255,255,255,0.45);
}
.mp-portal.light{
  --p-bg:#eef3fa; --p-surface:#ffffff; --p-surface2:#f3f7fc;
  --p-border:rgba(13,26,46,0.09); --p-border-strong:rgba(13,26,46,0.16);
  --p-text:#0d1a2e; --p-text2:#3a4a5e; --p-muted:#6b7689;
}
.mp-portal ::-webkit-scrollbar{width:8px;height:8px;}
.mp-portal ::-webkit-scrollbar-thumb{background:var(--p-border-strong);border-radius:8px;}
`;

export default function StudentPortal() {
  const [section, setSection] = useState<SectionId>("overview");
  const [light, setLight] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mp-portal-theme");
    if (saved === "light") setLight(true);
  }, []);
  const toggleTheme = () => {
    setLight((l) => {
      localStorage.setItem("mp-portal-theme", !l ? "light" : "dark");
      return !l;
    });
  };

  const go = (s: SectionId) => { setSection(s); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const current = NAV.find((n) => n.id === section)!;

  return (
    <div className={`mp-portal ${light ? "light" : ""} min-h-screen overflow-x-hidden bg-[var(--p-bg)] font-sans antialiased`}>
      <style>{THEME_CSS}</style>

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[var(--p-bg)]/85 backdrop-blur-xl border-b border-[var(--p-border)]">
        <div className="flex items-center gap-4 px-4 md:px-8 h-16 lg:pr-72">
          <button onClick={() => go("overview")} className="flex items-center gap-2 shrink-0">
            <img src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="hidden sm:block font-bold text-[var(--p-text)] tracking-widest uppercase text-sm">Migrate<span className="font-light">Properly</span></span>
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md ml-4 px-4 py-2 rounded-full bg-[var(--p-surface2)] border border-[var(--p-border)]">
            <Search className="w-4 h-4 text-[var(--p-muted)]" />
            <input placeholder="Search resources, tasks, universities…" className="bg-transparent text-sm text-[var(--p-text)] placeholder:text-[var(--p-muted)] focus:outline-none w-full" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="w-10 h-10 rounded-full border border-[var(--p-border)] bg-[var(--p-surface)] text-[var(--p-text)] flex items-center justify-center hover:border-[var(--p-border-strong)] transition-colors">
              {light ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
            </button>
            <div className="relative">
              <button onClick={() => setNotifOpen((o) => !o)} className="w-10 h-10 rounded-full border border-[var(--p-border)] bg-[var(--p-surface)] text-[var(--p-text)] flex items-center justify-center hover:border-[var(--p-border-strong)] transition-colors relative">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-[var(--p-surface)]" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className={`${card} absolute right-0 mt-2 w-72 p-3 z-50 shadow-2xl`}>
                    <p className="text-[var(--p-text)] text-xs font-bold uppercase tracking-wider px-2 mb-2">Notifications</p>
                    {["Your transcript was verified ✅", "New scholarship match found ✨", "SOP review completed by expert"].map((n) => (
                      <div key={n} className="text-[var(--p-text2)] text-sm px-2 py-2 rounded-lg hover:bg-[var(--p-surface2)]">{n}</div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] text-white flex items-center justify-center font-bold text-sm shrink-0">{STUDENT.initials}</div>
          </div>
        </div>
      </header>

      {/* Main content (left of right rail) */}
      <main className="lg:mr-64 px-4 md:px-8 py-6 md:py-8 pb-28 lg:pb-10">
        {section === "overview" && (
          <div className="mb-7">
            <p className="text-[var(--p-muted)] text-sm">Welcome back,</p>
            <h1 className="text-[var(--p-text)] text-2xl md:text-3xl font-black tracking-tight">{STUDENT.first} 👋</h1>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={section} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            {section === "overview" && <Overview go={go} />}
            {section === "roadmap" && <Roadmap />}
            {section === "coach" && <Coach />}
            {section === "documents" && <Documents />}
            {section === "resources" && <Resources />}
            {section === "reports" && <Reports />}
            {section === "community" && <Community />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Right navigation rail (desktop) */}
      <aside className="hidden lg:flex flex-col fixed right-0 top-0 h-full w-64 border-l border-[var(--p-border)] bg-[var(--p-surface)] z-30 pt-20 px-4 pb-6">
        <p className="text-[var(--p-muted)] text-[11px] font-bold uppercase tracking-[0.2em] px-3 mb-3">Menu</p>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                section === n.id
                  ? "bg-gradient-to-r from-[#4F8EF7] to-[#1D4ED8] text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)]"
                  : "text-[var(--p-text2)] hover:bg-[var(--p-surface2)] hover:text-[var(--p-text)]"}`}>
              {n.icon}{n.label}
              {section === n.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Upgrade / support card */}
        <div className="mt-auto rounded-2xl border border-[var(--p-border)] bg-[var(--p-surface2)] p-4">
          <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-3"><MessageCircle className="w-4 h-4" /></div>
          <p className="text-[var(--p-text)] text-sm font-semibold mb-1">Need a human?</p>
          <p className="text-[var(--p-muted)] text-xs mb-3 leading-relaxed">Chat with our advisors on WhatsApp anytime.</p>
          <button onClick={() => window.open(WHATSAPP_URL, "_blank")} className="w-full text-xs font-bold text-white py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] transition-colors">Chat now</button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--p-surface)]/95 backdrop-blur-xl border-t border-[var(--p-border)] flex items-stretch px-1 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {NAV.map((n) => (
          <button key={n.id} onClick={() => go(n.id)} aria-label={n.label}
            className={`flex-1 min-w-0 flex flex-col items-center gap-1 py-1.5 rounded-lg transition-colors ${section === n.id ? "text-[#4F8EF7]" : "text-[var(--p-muted)]"}`}>
            {n.icon}
            <span className="text-[9px] font-medium truncate max-w-full px-0.5">{n.short}</span>
          </button>
        ))}
      </nav>

      {/* Mobile section title bar */}
      <div className="lg:hidden sr-only">{current.label}</div>
    </div>
  );
}
