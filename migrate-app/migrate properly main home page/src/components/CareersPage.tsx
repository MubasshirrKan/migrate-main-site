import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  BrainCircuit, Globe, Users, Zap, Heart, Rocket,
  ArrowRight, Plus, Minus, Upload, ChevronRight, MapPin, Clock
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Student First, Always",
    body: "Every decision we make starts with one question: does this make it easier for a student to reach their goal? That's our north star.",
    color: "from-rose-500/20 to-rose-900/5",
    glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] group-hover:border-rose-500/40",
    accent: "text-rose-400",
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "AI-First Thinking",
    body: "We pair honest human guidance with smart technology. If there's a smarter way to do something, we build it — then we hand it to the student.",
    color: "from-blue-500/20 to-blue-900/5",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:border-blue-500/40",
    accent: "text-blue-400",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Ambition",
    body: "We work across 31 countries and counting. Our team thinks in passports, not postcodes — every member helps open a door to the world.",
    color: "from-emerald-500/20 to-emerald-900/5",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
    accent: "text-emerald-400",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Move Fast, Build Well",
    body: "We're a lean team that ships. We value clarity over meetings, action over analysis — but we never cut corners where it counts for students.",
    color: "from-amber-500/20 to-amber-900/5",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] group-hover:border-amber-500/40",
    accent: "text-amber-400",
  },
];

const BENEFITS = [
  { icon: <Rocket className="w-5 h-5" />, title: "Purpose-driven work", body: "Every feature you ship helps a real student land their visa. The impact is immediate and visible." },
  { icon: <Globe className="w-5 h-5" />, title: "Remote-flexible", body: "Work from wherever you do your best thinking. We care about output, not office presence." },
  { icon: <BrainCircuit className="w-5 h-5" />, title: "Build with cutting-edge AI", body: "You'll work with the latest LLMs and AI tools as core infrastructure, not side projects." },
  { icon: <Users className="w-5 h-5" />, title: "Small team, high ownership", body: "No bureaucracy. You'll own your work end-to-end and see the results of your decisions fast." },
  { icon: <Heart className="w-5 h-5" />, title: "Learning budget", body: "Courses, conferences, certifications — we invest in your growth because it helps the whole team." },
  { icon: <Zap className="w-5 h-5" />, title: "Competitive pay", body: "Fair, transparent compensation reviewed regularly. We pay for the impact you create." },
];

const ROLES = [
  {
    title: "Student Counsellor / Education Advisor",
    dept: "Advisory",
    type: "Full-time",
    location: "Dhaka / Remote",
    color: "text-[#60A5FA]",
    dot: "bg-[#1D4ED8]",
    description:
      "You'll be the human half of our AI+human model — guiding students from their first question to their visa approval. You'll work directly with students, understand their goals, and make sure they feel supported every step of the way.",
    responsibilities: [
      "Conduct consultations with students and families to understand goals and concerns",
      "Guide students through country selection, university shortlisting, and application timelines",
      "Review AI-generated recommendations and add your human judgment before delivery",
      "Support students through offer acceptance, pre-departure, and arrival",
    ],
    requirements: [
      "1–3 years of experience in student counselling, education, or a related field",
      "Strong knowledge of at least one study-abroad destination (UK, Canada, Europe, or Australia)",
      "Empathetic communicator — you listen before you advise",
      "Familiarity with visa processes and IELTS requirements is a strong plus",
    ],
  },
  {
    title: "Admissions & Documentation Specialist",
    dept: "Operations",
    type: "Full-time",
    location: "Dhaka / Hybrid",
    color: "text-blue-400",
    dot: "bg-blue-500",
    description:
      "You're the engine behind every successful application. You'll manage the end-to-end admissions pipeline — tracking deadlines, verifying documents, and making sure nothing slips through the cracks.",
    responsibilities: [
      "Prepare and review student applications for universities across 31 countries",
      "Verify academic transcripts, financial documents, and identity papers",
      "Coordinate with institutions for offer letters, conditional acceptances, and deferrals",
      "Maintain accurate tracking of every application in our CRM",
    ],
    requirements: [
      "Detail-oriented — you catch errors others miss",
      "Experience in admissions processing, documentation, or academic admin preferred",
      "Comfortable handling multiple parallel applications under tight deadlines",
      "Proficiency in Google Workspace and CRM tools",
    ],
  },
  {
    title: "Visa Support Officer",
    dept: "Visa",
    type: "Full-time",
    location: "Dhaka",
    color: "text-emerald-400",
    dot: "bg-emerald-500",
    description:
      "Visa is the most stressful part of studying abroad. You'll take that stress away — preparing iron-clad applications, coaching students on interviews, and tracking every case to approval.",
    responsibilities: [
      "Prepare complete visa application files for UK, Schengen, Canada, Australia, and more",
      "Coach students on financial documentation and interview preparation",
      "Monitor application progress and communicate updates clearly to students",
      "Stay current on changing immigration rules across all our markets",
    ],
    requirements: [
      "Strong knowledge of student visa processes in at least one major corridor",
      "High attention to detail — a missing document can cost a student a semester",
      "Calm under pressure; able to reassure anxious students and families",
      "Prior experience at a visa consultancy or embassy support role preferred",
    ],
  },
  {
    title: "AI / Product Developer",
    dept: "Tech",
    type: "Full-time",
    location: "Remote",
    color: "text-purple-400",
    dot: "bg-purple-500",
    description:
      "You'll build the technology that powers our matching engine, AI document tools, and student-facing platform. This is a high-ownership role — you'll go from idea to production with real students using your work within days.",
    responsibilities: [
      "Build and iterate on our AI matching and recommendation engine",
      "Develop student-facing features: quiz flows, destination pages, document tools",
      "Integrate LLM APIs (Gemini, Claude, etc.) for document drafting and guidance",
      "Own performance, reliability, and UX quality end-to-end",
    ],
    requirements: [
      "Proficiency in React, TypeScript, and modern web tooling",
      "Experience with LLM APIs and prompt engineering",
      "Ability to move fast without sacrificing code quality",
      "Interest in the education and migration space is a strong plus",
    ],
  },
  {
    title: "Marketing & Outreach Associate",
    dept: "Growth",
    type: "Full-time / Part-time",
    location: "Dhaka / Remote",
    color: "text-pink-400",
    dot: "bg-pink-500",
    description:
      "You'll grow our reach among Bangladeshi students who need exactly what we offer. From social content to WhatsApp campaigns to university fairs — you'll find where students are and show up there.",
    responsibilities: [
      "Create content that speaks directly to student anxieties and aspirations",
      "Run social media, WhatsApp, and email campaigns with clear conversion goals",
      "Represent MigrateProperly at education fairs and school outreach events",
      "Track campaign performance and iterate quickly based on data",
    ],
    requirements: [
      "Strong writer in both English and Bangla",
      "Understanding of what Bangladeshi students worry about when planning to study abroad",
      "Experience with Facebook/Instagram ads and content creation",
      "Data-literate — you know what a good CTR looks like",
    ],
  },
  {
    title: "General Application",
    dept: "Open",
    type: "Flexible",
    location: "Remote / Dhaka",
    color: "text-white/60",
    dot: "bg-white/30",
    description:
      "Don't see your exact role above? We're always interested in exceptional people. Tell us what you're good at and how you'd contribute to our mission — we'll figure out where you fit.",
    responsibilities: [
      "Share your strongest skill and how it maps to what we do",
      "Tell us about a time you helped someone navigate a complex process",
    ],
    requirements: [
      "A genuine interest in education access and helping students succeed",
      "Any background — if your skills are strong and your values align, apply",
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Apply", body: "Submit your details below. No lengthy cover letter required — just tell us who you are and what you're good at." },
  { step: "02", title: "Short call", body: "If there's a strong match, we'll set up a 20-minute call to get to know each other and answer your questions." },
  { step: "03", title: "Task or interview", body: "A small, paid task or a deeper conversation depending on the role — nothing that takes more than a couple of hours." },
  { step: "04", title: "Offer", body: "Fast decisions. We move quickly because we know your time matters." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoleCard({ role, open, onToggle }: { role: typeof ROLES[0]; open: boolean; onToggle: () => void }) {
  const [applying, setApplying] = useState(false);

  // Reset the application form whenever this card collapses (accordion close).
  useEffect(() => {
    if (!open) setApplying(false);
  }, [open]);

  return (
    <motion.div
      layout
      className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 md:p-8 flex items-start gap-4 group"
      >
        <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${role.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="text-white font-semibold text-lg leading-tight">{role.title}</h3>
            <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/8 ${role.color}`}>
              {role.dept}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-white/40 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{role.type}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-white/30 group-hover:text-white/60 transition-colors shrink-0 mt-1"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
        </motion.div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 pt-0 border-t border-white/5">
              <p className="text-white/60 text-sm leading-relaxed mt-6 mb-8">{role.description}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">What you'll do</h4>
                  <ul className="space-y-2.5">
                    {role.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <ArrowRight className={`w-4 h-4 shrink-0 mt-0.5 ${role.color}`} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">What we're looking for</h4>
                  <ul className="space-y-2.5">
                    {role.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${role.dot}`} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setApplying(a => !a)}
                className="flex items-center gap-2 bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95"
              >
                Apply for this role
                <ArrowRight className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {applying && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8"
                  >
                    <ApplicationForm role={role.title} onCancel={() => setApplying(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ApplicationForm({ role, onCancel }: { role: string; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your full name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (!cvFile) return setError("Please attach your CV.");
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5"
        >
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <motion.path
              strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </svg>
        </motion.div>
        <h4 className="text-white font-semibold text-lg mb-2">Application received</h4>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
          Thanks, {name.split(" ")[0]}. We'll review your application and reach out if there's a strong match.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-white/8 rounded-2xl p-6 bg-white/[0.02]">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-semibold">Your application</h4>
        <button type="button" onClick={onCancel} className="text-white/30 hover:text-white/60 transition-colors">
          <Minus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Full name <span className="text-[#60A5FA]">*</span>
          </label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1D4ED8]/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all"
          />
        </div>
        <div>
          <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Email <span className="text-[#60A5FA]">*</span>
          </label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1D4ED8]/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">LinkedIn profile</label>
        <input
          type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/your-profile"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1D4ED8]/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all"
        />
      </div>

      <div>
        <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
          Why do you want to join? <span className="text-white/30 font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          value={message} onChange={e => setMessage(e.target.value)}
          rows={3}
          placeholder="Tell us what draws you to this work..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1D4ED8]/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
          CV / Resume <span className="text-[#60A5FA]">*</span>
        </label>
        <label className="flex items-center gap-4 bg-white/[0.03] border border-dashed border-white/15 rounded-xl px-4 py-4 cursor-pointer hover:border-[#1D4ED8]/40 hover:bg-white/[0.05] transition-all group">
          <Upload className="w-5 h-5 text-white/30 group-hover:text-[#60A5FA]/60 transition-colors shrink-0" />
          <div>
            <span className="block text-white/70 text-sm font-medium">
              {cvFile ? cvFile.name : "Click to upload your CV"}
            </span>
            <span className="text-white/30 text-xs">PDF, DOC or DOCX</span>
          </div>
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => e.target.files?.[0] && setCvFile(e.target.files[0])} />
        </label>
      </div>

      {error && (
        <p className="text-[#60A5FA] text-sm font-medium">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95"
        >
          Submit application
          <ArrowRight className="w-4 h-4" />
        </button>
        <button type="button" onClick={onCancel} className="text-white/40 hover:text-white/60 text-sm transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  // Accordion: only one role open at a time (null = all closed).
  const [openRole, setOpenRole] = useState<string | null>(null);
  const heroRef   = useRef<HTMLDivElement>(null);
  const rolesRef  = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef  = useRef<HTMLDivElement>(null);

  const valuesInView   = useInView(valuesRef,   { once: true, margin: "-80px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" });
  const processInView  = useInView(processRef,  { once: true, margin: "-80px" });

  const scrollToRoles = () => {
    rolesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBack = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="bg-zinc-950 text-white font-sans antialiased min-h-screen overflow-x-hidden">

      {/* ── Sticky nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 font-bold text-white text-lg tracking-widest uppercase"
        >
          <img
            src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png"
            alt="Logo" className="w-7 h-7 object-contain"
          />
          Migrate<span className="font-light">Properly</span>
        </button>
        <button
          onClick={scrollToRoles}
          className="text-sm font-semibold text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
        >
          Open roles <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[700px] md:min-h-[800px] flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#1D4ED8]/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#60A5FA] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 flex items-center justify-center gap-2 sm:gap-3 px-4"
        >
          <span className="w-4 sm:w-6 h-px bg-[#1D4ED8]/60 shrink-0" />
          <span className="text-center">Careers at MigrateProperly</span>
          <span className="w-4 sm:w-6 h-px bg-[#1D4ED8]/60 shrink-0" />
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          Help students{" "}
          <span className="overseas-glow font-serif italic font-normal">
            reach the world
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl text-white/50 text-lg md:text-xl leading-relaxed mb-10"
        >
          We pair honest human guidance with AI to make studying abroad possible for any student in Bangladesh.
          Join us and do the most meaningful work of your career.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={scrollToRoles}
            className="flex items-center gap-2 bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] active:scale-95 text-sm"
          >
            See open roles
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => valuesRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full transition-all text-sm"
          >
            Our culture
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 inset-x-0 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 text-center px-4"
        >
          {[
            { n: "31", label: "countries" },
            { n: "1,000+", label: "students helped" },
            { n: "5", label: "open roles" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-black text-white">{s.n}</div>
              <div className="text-white/35 text-xs uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} className="px-6 md:px-10 lg:px-16 py-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-4">How we work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            What we stand for
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Our values aren't a poster on the wall. They're the decisions we make every day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative p-6 rounded-2xl border border-white/8 bg-gradient-to-b ${v.color} hover:border-white/20 transition-all duration-300 ${v.glow}`}
            >
              <div className={`${v.accent} mb-4`}>{v.icon}</div>
              <h3 className="text-white font-bold text-base mb-3 leading-tight">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section ref={benefitsRef} className="px-6 md:px-10 lg:px-16 py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-4">The perks</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Why join us
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
              >
                <div className="text-[#60A5FA] shrink-0 mt-0.5">{b.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{b.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section ref={rolesRef} className="px-6 md:px-10 lg:px-16 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-4">Join the team</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Open roles
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm">
            Click any role to read the full description and apply directly below it.
          </p>
        </div>

        <div className="space-y-3">
          {ROLES.map((role, i) => (
            <div key={role.title} id={`role-${i}`} className="scroll-mt-24">
              <RoleCard
                role={role}
                open={openRole === role.title}
                onToggle={() => setOpenRole(prev => (prev === role.title ? null : role.title))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section ref={processRef} className="px-6 md:px-10 lg:px-16 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-4">What to expect</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
              How we hire
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm">
              We keep it simple, fast, and respectful of your time.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-white/8 bg-white/[0.02]"
              >
                <span className="text-[#60A5FA]/40 font-black text-3xl leading-none block mb-4">{p.step}</span>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.body}</p>
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-white/15" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="px-6 md:px-10 py-24 text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
            Don't see the right role?
          </h2>
          <p className="text-white/40 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            We're always interested in exceptional people. Send us a general application — we read every one.
          </p>
          <button
            onClick={() => {
              const lastIdx = ROLES.length - 1;
              setOpenRole(ROLES[lastIdx].title);
              // Scroll to the actual General Application card (not the section top),
              // after it has expanded.
              setTimeout(() => {
                document.getElementById(`role-${lastIdx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 140);
            }}
            className="flex items-center gap-2 mx-auto border border-white/15 hover:border-[#1D4ED8]/50 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full transition-all text-sm"
          >
            Submit a general application
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
