import { motion } from "motion/react";
import { ArrowLeft, MessageCircle, Quote, GraduationCap, Globe2, Award } from "lucide-react";

// WhatsApp CTA — reuses the same placeholder number as ContactSection.
// Replace 1234567890 with the real business number.
const WHATSAPP_URL = "https://wa.me/1234567890";

// Replace with the real founder portrait.
const FOUNDER_PHOTO =
  "https://res.cloudinary.com/dyalnmjj5/image/upload/v1779014316/hf_20260517_102805_cdc99b9e-d9b6-4759-afc2-2942ebcaffdb_o5tvvh.png";

const TRUST = [
  { icon: <GraduationCap className="w-5 h-5" />, value: "10+ years", label: "guiding students" },
  { icon: <Globe2 className="w-5 h-5" />, value: "31", label: "destinations covered" },
  { icon: <Award className="w-5 h-5" />, value: "1,000+", label: "admissions & visas supported" },
];

export default function FounderPage() {
  const goHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

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

      {/* Hero / Founder intro */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-32 pb-20 max-w-6xl mx-auto">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1D4ED8]/5 blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-8 text-center"
        >
          About Us · Meet the Founder
        </motion.p>

        <div className="relative grid md:grid-cols-[300px_1fr] gap-10 md:gap-14 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto md:mx-0"
          >
            <div className="relative w-56 h-56 md:w-[300px] md:h-[360px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <img src={FOUNDER_PHOTO} alt="Founder" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
              Founder &amp; CEO
            </div>
          </motion.div>

          {/* Name + story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              {/* Replace with the founder's real name */}
              Founder &amp; CEO
            </h1>
            <p className="text-[#60A5FA] font-semibold mb-8">MigrateProperly</p>

            <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg">
              <p>
                I started MigrateProperly after seeing how confusing and stressful studying abroad can be
                for students and families. I wanted to build something that pairs honest, human guidance
                with smart technology — so no one has to navigate this alone.
              </p>
              <p>
                Over the years I&apos;ve watched too many bright students give up — not because they
                weren&apos;t capable, but because the process felt impossible to decode. Endless forms,
                conflicting advice, and agencies that disappear after taking a fee.
              </p>
              <p>
                So we built the opposite: a team that stays with you from your very first question to your
                visa approval and beyond — backed by AI that does the heavy lifting, and real people who
                genuinely care about where you end up.
              </p>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {TRUST.map((t) => (
                <div key={t.label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <div className="text-[#60A5FA] shrink-0">{t.icon}</div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">{t.value}</div>
                    <div className="text-white/40 text-xs mt-1">{t.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-10 py-16 border-y border-white/5 bg-white/[0.01]">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Quote className="w-10 h-10 text-[#60A5FA]/40 mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-medium text-white/90 leading-snug italic">
            &ldquo;Your journey matters to me, and my team is with you at every step.&rdquo;
          </p>
        </motion.div>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-6 md:px-10 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Have a question? <span className="overseas-glow font-serif italic font-normal">Talk to us.</span></h2>
          <p className="text-white/40 max-w-lg mx-auto mb-8">
            Get honest, personalised guidance from our team — no forms, no waiting.
          </p>
          <button
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-[0_0_40px_rgba(37,211,102,0.45)] active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with our team
          </button>
        </motion.div>
      </section>
    </div>
  );
}
