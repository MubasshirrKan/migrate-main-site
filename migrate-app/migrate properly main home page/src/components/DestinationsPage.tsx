import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/1234567890";

const REGIONS = ["All", "UK & Commonwealth", "Europe", "Asia"] as const;
type Region = (typeof REGIONS)[number];

type Country = {
  flag: string;
  name: string;
  region: Exclude<Region, "All">;
  tagline: string;
  highlight?: string;
  stats: [string, string][];
  bestFor?: string;
};

// Per-spec: compact info per country, NO university lists.
const COUNTRIES: Country[] = [
  {
    flag: "🇬🇧", name: "United Kingdom", region: "UK & Commonwealth",
    tagline: "World-class degrees · 1-year master's",
    stats: [
      ["Bachelor", "£11,000–£38,000"],
      ["Master", "£9,000–£30,000+ (1 yr)"],
      ["Living (sharing)", "£900–£1,300/mo"],
      ["IELTS", "6.0–6.5 UG / 6.5–7.0 PG · MOI often ok"],
      ["Visa (Dhaka)", "~94–99%"],
      ["Spouse", "Allowed for 12+ month PG"],
    ],
    bestFor: "Business · Engineering · CS · Finance",
  },
  {
    flag: "🇨🇦", name: "Canada", region: "UK & Commonwealth",
    tagline: "Strong PR pathways after study",
    stats: [
      ["Bachelor", "CAD 22,000–55,000"],
      ["Master", "CAD 15,000–40,000"],
      ["Living (sharing)", "CAD 1,000–1,600/mo"],
      ["IELTS", "6.0–6.5 · MOI often ok (SDS stricter)"],
      ["Visa (Dhaka)", "~50–70%"],
      ["Spouse", "Open Work Permit"],
    ],
    bestFor: "Engineering · CS/IT · Business · Healthcare",
  },
  {
    flag: "🇦🇺", name: "Australia", region: "UK & Commonwealth",
    tagline: "High visa success · full spouse work rights",
    stats: [
      ["Bachelor", "AUD 20,000–65,000"],
      ["Master", "AUD 22,000–65,000"],
      ["Living (sharing)", "AUD 1,200–1,800/mo"],
      ["IELTS", "6.0–6.5+ · MOI possible"],
      ["Visa (Dhaka)", "~95–99%"],
      ["Spouse", "Full work rights (esp. PG)"],
    ],
    bestFor: "Engineering · IT · Business · Medicine",
  },
  {
    flag: "🇳🇿", name: "New Zealand", region: "UK & Commonwealth",
    tagline: "Welcoming · high acceptance",
    stats: [
      ["Costs", "Moderate–high (like Australia)"],
      ["Acceptance", "Good for Bangladeshi students"],
    ],
  },
  {
    flag: "🇩🇪", name: "Germany", region: "Europe",
    tagline: "Mostly tuition-free public universities",
    highlight: "Most affordable",
    stats: [
      ["Tuition", "Mostly €0 · €0–3,500/yr some states"],
      ["Living (sharing)", "€850–€1,300/mo total"],
      ["Blocked account", "€11,904/yr (~17 lakh BDT)"],
      ["IELTS", "6.0–6.5 · German B1/B2 often needed"],
      ["Visa (Dhaka)", "~90%+ with full docs"],
      ["Spouse", "Family reunion · work possible"],
    ],
  },
  {
    flag: "🇵🇱", name: "Poland", region: "Europe",
    tagline: "Affordable EU degrees in English",
    stats: [
      ["Bachelor", "€1,500–€5,000"],
      ["Master", "€2,000–€6,000"],
      ["Living (sharing)", "€450–€800/mo"],
      ["IELTS", "5.5–6.5"],
    ],
  },
  { flag: "🇮🇪", name: "Ireland", region: "Europe", tagline: "English-taught · strong acceptance",
    stats: [["Tuition", "€1,000–€20,000"], ["Acceptance", "Good via embassy / VFS Dhaka"]] },
  { flag: "🇳🇱", name: "Netherlands", region: "Europe", tagline: "English-taught · strong acceptance",
    stats: [["Tuition", "€1,000–€20,000"], ["Acceptance", "Good via embassy / VFS Dhaka"]] },
  { flag: "🇸🇪", name: "Sweden", region: "Europe", tagline: "English-taught · strong acceptance",
    stats: [["Tuition", "€1,000–€20,000"], ["Acceptance", "Good via embassy / VFS Dhaka"]] },
  { flag: "🇫🇷", name: "France", region: "Europe", tagline: "English-taught · strong acceptance",
    stats: [["Tuition", "€1,000–€20,000"], ["Acceptance", "Good via embassy / VFS Dhaka"]] },
  { flag: "🇮🇹", name: "Italy", region: "Europe", tagline: "English-taught · strong acceptance",
    stats: [["Tuition", "€1,000–€20,000"], ["Acceptance", "Good via embassy / VFS Dhaka"]] },
  { flag: "🇷🇴", name: "Romania", region: "Europe", tagline: "Very affordable · Medicine popular",
    stats: [["Tuition", "€1,000–€8,000"], ["Living (sharing)", "€400–€700/mo"], ["Acceptance", "High"]] },
  { flag: "🇭🇺", name: "Hungary", region: "Europe", tagline: "Very affordable · Medicine popular",
    stats: [["Tuition", "€1,000–€8,000"], ["Living (sharing)", "€400–€700/mo"], ["Acceptance", "High"]] },
  { flag: "🇨🇿", name: "Czech Republic", region: "Europe", tagline: "Very affordable · Medicine popular",
    stats: [["Tuition", "€1,000–€8,000"], ["Living (sharing)", "€400–€700/mo"], ["Acceptance", "High"]] },
  { flag: "🇱🇹", name: "Lithuania", region: "Europe", tagline: "Very affordable Baltic option",
    stats: [["Tuition", "€1,000–€8,000"], ["Living (sharing)", "€400–€700/mo"], ["Acceptance", "High"]] },
  { flag: "🇱🇻", name: "Latvia", region: "Europe", tagline: "Very affordable Baltic option",
    stats: [["Tuition", "€1,000–€8,000"], ["Living (sharing)", "€400–€700/mo"], ["Acceptance", "High"]] },
  { flag: "🇪🇪", name: "Estonia", region: "Europe", tagline: "Very affordable Baltic option",
    stats: [["Tuition", "€1,000–€8,000"], ["Living (sharing)", "€400–€700/mo"], ["Acceptance", "High"]] },
  { flag: "🇪🇸", name: "Spain", region: "Europe", tagline: "Affordable · English programs available",
    stats: [["Tuition", "Affordable ranges · English programs"]] },
  { flag: "🇵🇹", name: "Portugal", region: "Europe", tagline: "Affordable · English programs available",
    stats: [["Tuition", "Affordable ranges · English programs"]] },
  { flag: "🇦🇹", name: "Austria", region: "Europe", tagline: "Affordable · English programs available",
    stats: [["Tuition", "Affordable ranges · English programs"]] },
  { flag: "🇨🇾", name: "Cyprus", region: "Europe", tagline: "English programs · good EU access",
    stats: [["Tuition", "€3,500–€11,000+"], ["Notes", "Moderate costs · strong EU access"]] },
  { flag: "🇩🇰", name: "Denmark", region: "Europe", tagline: "Nordic destination · English-taught",
    stats: [["Programs", "English-taught options · ask us for details"]] },
  { flag: "🇳🇴", name: "Norway", region: "Europe", tagline: "Nordic destination · English-taught",
    stats: [["Programs", "English-taught options · ask us for details"]] },
  { flag: "🇫🇮", name: "Finland", region: "Europe", tagline: "Nordic destination · English-taught",
    stats: [["Programs", "English-taught options · ask us for details"]] },
  { flag: "🇧🇪", name: "Belgium", region: "Europe", tagline: "EU destination · English-taught",
    stats: [["Programs", "English-taught EU options · ask us for details"]] },
  { flag: "🇲🇹", name: "Malta", region: "Europe", tagline: "EU destination · English-taught",
    stats: [["Programs", "English-taught EU options · ask us for details"]] },
  { flag: "🇸🇰", name: "Slovakia", region: "Europe", tagline: "Affordable EU destination",
    stats: [["Programs", "Affordable EU options · ask us for details"]] },
  { flag: "🇭🇷", name: "Croatia", region: "Europe", tagline: "Affordable EU destination",
    stats: [["Programs", "Affordable EU options · ask us for details"]] },
  { flag: "🇸🇮", name: "Slovenia", region: "Europe", tagline: "Affordable EU destination",
    stats: [["Programs", "Affordable EU options · ask us for details"]] },
  {
    flag: "🇰🇷", name: "South Korea", region: "Asia",
    tagline: "GKS scholarships · often no IELTS",
    stats: [["Tuition", "$4,400–$12,000+"], ["Scholarships", "GKS often waives IELTS"]],
  },
  {
    flag: "🇲🇾", name: "Malaysia", region: "Asia",
    tagline: "Very popular · easy process · low cost",
    highlight: "Popular pick",
    stats: [
      ["Bachelor", "$3,200–$7,500+ (MYR 15k–35k+)"],
      ["Living (sharing)", "MYR 1,200–2,000/mo (~$270–$450)"],
      ["IELTS", "Often low/waived · MOI strong"],
      ["Visa", "~95%"],
      ["Spouse", "Possible"],
    ],
  },
];

function CountryCard({ c, index }: { c: Country; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col"
    >
      {c.highlight && (
        <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
          {c.highlight}
        </span>
      )}
      <div className="text-4xl mb-4 leading-none">{c.flag}</div>
      <h3 className="text-xl font-bold text-white mb-1">{c.name}</h3>
      <p className="text-white/45 text-sm mb-5">{c.tagline}</p>

      <dl className="space-y-2 mb-1">
        {c.stats.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-2 last:border-0">
            <dt className="text-white/40 text-xs font-medium shrink-0">{k}</dt>
            <dd className="text-white/75 text-xs font-medium text-right">{v}</dd>
          </div>
        ))}
      </dl>

      {c.bestFor && (
        <p className="text-white/40 text-xs mt-4 pt-4 border-t border-white/5">
          <span className="text-[#60A5FA] font-semibold">Best for:</span> {c.bestFor}
        </p>
      )}
    </motion.article>
  );
}

export default function DestinationsPage() {
  const [region, setRegion] = useState<Region>("All");
  const goHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const list = COUNTRIES.filter((c) => region === "All" || c.region === region);

  return (
    <div className="bg-zinc-950 text-white font-sans antialiased min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <button onClick={goHome} className="flex items-center gap-2 font-bold text-white text-lg tracking-widest uppercase">
          <img src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png" alt="Logo" className="w-7 h-7 object-contain" />
          Migrate<span className="font-light">Properly</span>
        </button>
        <button onClick={goHome} className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </nav>

      {/* Header */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-32 pb-12 text-center max-w-4xl mx-auto">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          31 destinations · one platform
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="relative text-4xl md:text-6xl font-black tracking-tight mb-5">
          Where will you <span className="overseas-glow font-serif italic font-normal">study?</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="relative text-white/50 max-w-2xl mx-auto">
          From the UK to Malaysia, our AI matches your budget, grades, and goals to the right destination —
          then we guide you, step by step, all the way to your visa.
        </motion.p>
      </section>

      {/* Region filter */}
      <div className="flex flex-wrap justify-center gap-3 px-6 mb-12">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`text-sm font-semibold px-5 py-2.5 rounded-full border transition-all ${
              region === r
                ? "bg-white text-zinc-950 border-white"
                : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="px-6 md:px-10 lg:px-16 pb-24 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((c, i) => (
            <React.Fragment key={c.name}>
              <CountryCard c={c} index={i} />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 text-center border-t border-white/5">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Not sure which country fits you?</h2>
        <p className="text-white/40 max-w-lg mx-auto mb-8">Take the free quiz or chat with our team — we&apos;ll match you in minutes.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => { window.history.pushState({}, "", "/quiz"); window.dispatchEvent(new PopStateEvent("popstate")); }}
            className="bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] active:scale-95"
          >
            Play the Quiz
          </button>
          <button
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full transition-all"
          >
            <MessageCircle className="w-5 h-5" /> Chat with our team
          </button>
        </div>
      </section>
    </div>
  );
}
