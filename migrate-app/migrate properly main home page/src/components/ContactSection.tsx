import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.37 1.23 4.79L2 22l5.35-1.18A9.972 9.972 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.33c-1.58 0-3.08-.41-4.38-1.13l-.31-.18-3.03.67.68-2.91-.2-.31A8.257 8.257 0 013.67 12c0-4.6 3.73-8.33 8.33-8.33 4.6 0 8.33 3.73 8.33 8.33s-3.73 8.33-8.33 8.33zm4.49-6.19c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.33-.02-.45-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.12.17 1.77 2.69 4.28 3.77.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.09-.23-.15-.48-.27zM12 22h.01V22z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section className="relative bg-zinc-950 py-24 md:py-36 flex items-center justify-center overflow-hidden">
      {/* Ghost "Contact Us" watermark */}
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <span className="font-sans font-black text-[20vw] leading-none tracking-tighter whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white/[0.09] via-white/[0.06] to-transparent">
          Contact Us
        </span>
      </motion.div>

      {/* Background & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(37,99,235,0.08)_0%,transparent_70%)] z-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex flex-col items-start text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[11px] tracking-[0.2em] uppercase font-bold mb-6">
              Questions? Ask Away
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-white mb-6">
              Have a question?<br className="hidden md:block" /> We reply instantly.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-light mb-12 max-w-md">
              From choosing the right country to entry requirements and visa steps — whatever you're unsure about, just ask. Message our study abroad experts on WhatsApp and get clear answers in minutes, not days.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-400/30 transition-colors">
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-blue-300 transition-colors" />
                </div>
                <div>
                  <p className="text-white/40 text-sm font-medium tracking-wide">Email Us</p>
                  <p className="text-white/80 group-hover:text-white transition-colors">hello@migrateproperly.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-400/30 transition-colors">
                  <Phone className="w-5 h-5 text-white/70 group-hover:text-purple-300 transition-colors" />
                </div>
                <div>
                  <p className="text-white/40 text-sm font-medium tracking-wide">Call Us</p>
                  <p className="text-white/80 group-hover:text-white transition-colors">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400/30 transition-colors">
                  <MapPin className="w-5 h-5 text-white/70 group-hover:text-emerald-300 transition-colors" />
                </div>
                <div>
                  <p className="text-white/40 text-sm font-medium tracking-wide">Visit Us</p>
                  <p className="text-white/80 group-hover:text-white transition-colors">123 Innovation Drive, Tech City</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md p-10 md:p-14 rounded-[2.5rem] bg-[#050505] border border-[#25D366]/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(37,211,102,0.1),0_0_40px_rgba(37,211,102,0.05)_inset] overflow-hidden group">
              {/* WhatsApp Brand Colors Ambient Light */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 via-transparent to-[#128C7E]/10 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Animated Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-[#25D366]/20 rounded-full blur-[40px] pointer-events-none"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#128C7E]/20 rounded-full blur-[50px] pointer-events-none"
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#25D366] blur-[20px] opacity-40 animate-pulse group-hover:opacity-70 transition-opacity" />
                  <div className="w-24 h-24 rounded-full bg-[#1e1e1e] border border-[#25D366]/40 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(37,211,102,0.3)_inset] overflow-hidden">
                    <WhatsAppIcon className="w-12 h-12 text-[#25D366]" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tight mb-4 group-hover:text-[#25D366] transition-colors duration-500">
                  Got a question? Chat with us live.
                </h3>

                <p className="text-white/50 text-base font-light mb-10 leading-relaxed">
                  Skip the forms and inbox waits. Talk one-on-one with our admissions experts on WhatsApp and get instant, personalised answers — the moment a question comes up.
                </p>

                <button
                  onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                  className="relative w-full px-8 py-5 rounded-2xl group/btn outline-none overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] bg-[#25D366] border border-[#128C7E] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay pointer-events-none" />

                  {/* Sweep Animation */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <span className="relative z-10 text-black font-semibold text-lg flex items-center gap-3">
                    Start Chat on WhatsApp
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>

                <p className="mt-4 text-white/30 text-xs font-mono tracking-widest uppercase">
                  We reply <span className="text-[#25D366]/80 font-bold">instantly</span>
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
