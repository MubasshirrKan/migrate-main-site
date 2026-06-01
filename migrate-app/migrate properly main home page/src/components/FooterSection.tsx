import { motion } from "motion/react";
import { ArrowRight, Linkedin, Instagram } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <footer className="relative bg-[#020202] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-blue-900/10 via-emerald-900/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="col-span-1 lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 font-sans font-bold text-white text-xl md:text-2xl tracking-widest uppercase mb-6"
            >
              <img src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png" alt="Migrate Properly Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg" />
              <span>Migrate<span className="font-light">Properly</span></span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white/40 max-w-sm mb-8 leading-relaxed font-light"
            >
              Transforming the global education journey with intelligent guidance, unmatched precision, and dedicated expert support.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-4"
            >
              {[Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 transform hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Destinations', path: '/destinations' },
                { label: 'Careers', path: '/careers' },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => navigateTo(item.path)} className="text-white/40 hover:text-[#34D399] transition-colors font-light relative group flex items-center gap-2 cursor-pointer">
                    <span className="w-0 h-[1px] bg-[#34D399] group-hover:w-3 transition-all duration-300" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => navigateTo(item.path)} className="text-white/40 hover:text-[#34D399] transition-colors font-light relative group flex items-center gap-2 cursor-pointer">
                    <span className="w-0 h-[1px] bg-[#34D399] group-hover:w-3 transition-all duration-300" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Advanced Creative Footer Bottom */}
        <div className="relative border-t border-white/10 pt-20 flex flex-col items-center gap-12 overflow-hidden">
          
          {/* Abstract Animated Centerpiece */}
          <div className="relative w-full max-w-3xl mx-auto h-80 md:h-[480px] flex items-center justify-center pointer-events-auto mt-8 mb-4">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-emerald-500/10 to-blue-600/10 blur-[60px] rounded-full opacity-30" />
            
            {/* Animated Concentric Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-52 h-52 md:w-[340px] md:h-[340px] rounded-full border border-dashed border-white/10"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 md:w-[480px] md:h-[480px] rounded-full border border-white/5 border-dashed"
            />
            
            {/* Center Logo/Icon */}
            <div className="relative z-10 w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)_inset] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 pointer-events-none transition-opacity duration-700 opacity-0" />
              <img src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png" alt="Migrate Properly Icon" className="w-12 h-12 md:w-16 md:h-16 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            </div>

            {/* Orbiting Destinations */}
            {/* Track 1: Clockwise */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-52 h-52 md:w-[340px] md:h-[340px] rounded-full"
            >
              {[
                { name: "USA", flag: "🇺🇸" },
                { name: "UK", flag: "🇬🇧" },
                { name: "Canada", flag: "🇨🇦" },
                { name: "Australia", flag: "🇦🇺" },
              ].map((dest, i, arr) => {
                const angle = (i * 360) / arr.length;
                return (
                  <div 
                    key={dest.name}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="absolute left-1/2 -top-6 md:-top-8 -translate-x-1/2 shrink-0">
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 md:w-16 md:h-16 bg-[#050505] border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center transform transition-transform"
                      >
                        <span className="text-3xl md:text-5xl leading-none">{dest.flag}</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Track 2: Counter-Clockwise */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 md:w-[480px] md:h-[480px] rounded-full"
            >
              {[
                { name: "Germany", flag: "🇩🇪" },
                { name: "France", flag: "🇫🇷" },
                { name: "Ireland", flag: "🇮🇪" },
                { name: "New Zealand", flag: "🇳🇿" },
              ].map((dest, i, arr) => {
                const angle = (i * 360) / arr.length;
                return (
                  <div 
                    key={dest.name}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="absolute left-1/2 -top-5 md:-top-6 -translate-x-1/2 shrink-0">
                      <motion.div 
                        animate={{ rotate: 360 }} // Counter to parent's -360
                        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 md:w-14 md:h-14 bg-[#090909] border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center transform transition-transform"
                      >
                        <span className="text-2xl md:text-4xl leading-none">{dest.flag}</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-8 mt-12 pb-6 z-10 border-t border-white/5 pt-8">
            <p className="text-white/30 text-sm font-light">
              &copy; {currentYear} MigrateProperly. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <button onClick={() => navigateTo("/privacy")} className="text-white/40 hover:text-white transition-colors text-sm font-light cursor-pointer">Privacy Policy</button>
              <button onClick={() => navigateTo("/terms")} className="text-white/40 hover:text-white transition-colors text-sm font-light cursor-pointer">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
