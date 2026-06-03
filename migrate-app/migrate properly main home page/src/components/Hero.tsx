import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Globe, FileCheck } from "lucide-react";

const SEG1 = "Planning to";
const SEG2 = "study ";
const SEG3 = "overseas?";
const S1 = SEG1.length;
const S2 = SEG2.length;
const S3 = SEG3.length;
const TOTAL = S1 + S2 + S3;

function Cursor() {
  return (
    <span
      className="animate-[cursor-blink_1s_step-end_infinite]"
      style={{
        display: "inline-block",
        width: "2px",
        height: "0.85em",
        background: "white",
        verticalAlign: "middle",
        marginLeft: "1px",
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);
  const [activeBubble, setActiveBubble] = useState<1 | 2>(1);
  const [typedCount, setTypedCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // SPA navigation helper (same pattern used elsewhere in the app)
  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const openStories = () =>
    window.dispatchEvent(new CustomEvent("mp:open-about", { detail: { scrollTo: "success-stories" } }));
  const openQuiz = () => navigateTo("/quiz");
  const openLogin = () => navigateTo("/portal");

  // Shared nav items for desktop + mobile menus
  const navItems = [
    { label: "About Us", action: () => navigateTo("/about") },
    { label: "Destinations", action: () => navigateTo("/destinations") },
    { label: "Success Stories", action: openStories },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sharedY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Auto-cycle thought bubbles every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBubble(prev => (prev === 1 ? 2 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect: 1100ms delay then 100ms per character
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setTypedCount(prev => {
          if (prev >= TOTAL) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
    }, 1100);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const seg1Text = SEG1.slice(0, Math.min(typedCount, S1));
  const seg2Text = SEG2.slice(0, Math.max(0, Math.min(typedCount - S1, S2)));
  const seg3Text = SEG3.slice(0, Math.max(0, Math.min(typedCount - S1 - S2, S3)));
  const typingDone = typedCount >= TOTAL;

  const getBubbleAnimate = (num: 1 | 2) => ({
    opacity:
      hoveredBubble !== null
        ? hoveredBubble === num ? 1 : 0.6
        : activeBubble === num ? 1 : 0.6,
    filter:
      hoveredBubble !== null
        ? hoveredBubble === num ? "blur(0px)" : "blur(4px)"
        : activeBubble === num ? "blur(0px)" : "blur(4px)",
  });

  const getBubbleTransition = () => ({
    duration: hoveredBubble !== null ? 0.3 : 0.9,
    ease: "easeInOut" as const,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-zinc-950"
    >
      {/* 0. INITIAL REVEAL SHUTTERS */}
      <div className="absolute inset-0 z-[100] flex pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: i * 0.08 }}
            className="h-full flex-1 bg-zinc-950 origin-top"
          />
        ))}
      </div>

      {/* 1. LAYER 0: BACKGROUND */}
      <motion.div style={{ y: sharedY }} className="absolute inset-0 z-0 scale-110">
        <motion.div
          initial={{ scale: 1.2, filter: "brightness(0.5) blur(15px)" }}
          animate={{ scale: 1, filter: "brightness(1) blur(0px)" }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778932304/hf_20260516_111400_19846629-d21c-4157-9381-36f710135e28_qiqby4.png"
            alt="Study Abroad Background"
            className="w-full h-full object-cover object-center opacity-80"
          />
        </motion.div>
        {/* Darker on mobile so the glassy thought-bubbles + headline read clearly */}
        <div className="absolute inset-0 bg-black/55 md:bg-black/30" />
      </motion.div>

      {/* 2. LAYER 1: THOUGHT BUBBLE 1 — behind cutout on desktop (depth), in front on mobile (so it isn't occluded by the figure) */}
      <motion.div style={{ y: sharedY }} className="absolute inset-0 z-[26] md:z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="absolute top-[28%] md:top-[22%] left-[4%] sm:left-[10%] md:left-[12%] lg:left-[16%] pointer-events-auto cursor-pointer"
          onMouseEnter={() => setHoveredBubble(1)}
          onMouseLeave={() => setHoveredBubble(null)}
        >
          <motion.div
            animate={getBubbleAnimate(1)}
            transition={getBubbleTransition()}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#3B82F6]/30 blur-[40px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex items-center gap-4 md:gap-5 bg-black/55 md:bg-white/10 backdrop-blur-2xl border border-white/20 p-4 pr-6 md:p-5 md:pr-8 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.05)] overflow-hidden">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 shrink-0 shadow-inner">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-white/30"
                  />
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-[#60A5FA]" />
                </div>
                <div className="flex flex-col relative z-20">
                  <span className="font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-[#93C5FD] mb-0.5">
                    AI Match Analysis
                  </span>
                  <span className="font-serif text-base md:text-xl lg:text-2xl text-white tracking-wide drop-shadow-md">
                    Which <em className="font-light text-[#60A5FA] italic">country</em>
                    <br className="sm:hidden" /> should I choose?
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3. LAYER 2: CUTOUT FOREGROUND */}
      <motion.div style={{ y: sharedY }} className="absolute inset-0 z-20 pointer-events-none scale-110">
        <motion.div
          initial={{ scale: 1.2, filter: "brightness(0.5) blur(15px)" }}
          animate={{ scale: 1, filter: "brightness(1) blur(0px)" }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778936717/Untitled_1_popkya.png"
            alt="Subject Cutout"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </motion.div>

      {/* 3.5. LAYER 2.5: THOUGHT BUBBLE 2 (IN FRONT OF CUTOUT) */}
      <motion.div style={{ y: sharedY }} className="absolute inset-0 z-[25] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="absolute top-[48%] md:top-[45%] right-[4%] sm:right-[10%] md:right-[12%] lg:right-[16%] pointer-events-auto cursor-pointer"
          onMouseEnter={() => setHoveredBubble(2)}
          onMouseLeave={() => setHoveredBubble(null)}
        >
          <motion.div
            animate={getBubbleAnimate(2)}
            transition={getBubbleTransition()}
          >
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#3B82F6]/30 blur-[40px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex items-center gap-4 md:gap-5 bg-black/55 md:bg-white/10 backdrop-blur-2xl border border-white/20 p-4 pr-6 md:p-5 md:pr-8 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.05)] overflow-hidden">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 shrink-0 shadow-inner">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-white/30"
                  />
                  <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-[#60A5FA]" />
                </div>
                <div className="flex flex-col relative z-20">
                  <span className="font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-[#93C5FD] mb-0.5">
                    Document Checker
                  </span>
                  <span className="font-serif text-base md:text-xl lg:text-2xl text-white tracking-wide drop-shadow-md">
                    Are my <em className="font-light text-[#60A5FA] italic">documents</em>
                    <br className="sm:hidden" /> ready yet?
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 4. LAYER 3: UI ELEMENTS */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-12 pointer-events-none">

        {/* Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="flex justify-between items-center pointer-events-auto"
        >
          <div className="flex items-center gap-2 font-sans font-bold text-white text-lg md:text-xl tracking-widest uppercase">
            <img
              src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png"
              alt="Migrate Properly Logo"
              className="w-10 h-10 object-contain drop-shadow-lg"
            />
            <span>Migrate<span className="font-light">Properly</span></span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-10">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-white/80 hover:text-white font-sans text-xs uppercase tracking-[0.15em] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Login + Play Quiz */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openLogin}
              className="px-6 py-3 rounded-full text-white/90 hover:text-white font-sans font-semibold text-xs tracking-widest uppercase border border-white/25 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Login
            </button>
            <button
              onClick={openQuiz}
              className="px-6 py-3 rounded-full text-white font-sans font-semibold text-xs tracking-widest uppercase bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all"
            >
              Play Quiz
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-md text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </motion.header>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-20 left-6 right-6 z-50 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl p-4 flex flex-col gap-1 pointer-events-auto shadow-2xl"
            >
              {navItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => { setMenuOpen(false); item.action(); }}
                  className="text-left text-white/80 hover:text-white hover:bg-white/5 font-sans text-sm uppercase tracking-[0.12em] px-4 py-3 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); openLogin(); }}
                className="mt-2 px-4 py-3 rounded-xl text-white/90 font-sans font-semibold text-sm tracking-widest uppercase border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => { setMenuOpen(false); openQuiz(); }}
                className="px-4 py-3 rounded-xl text-white font-sans font-semibold text-sm tracking-widest uppercase bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] hover:from-[#5b97ff] hover:to-[#1E40AF] transition-all"
              >
                Play Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom: Hero Headline + Scroll Indicator */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-8 pb-4 pointer-events-auto">

          <div className="flex flex-col items-start gap-4 z-10 w-full md:w-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(15px)", rotateX: -20 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              style={{ transformOrigin: "bottom left" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-[-0.03em] leading-[0.95]"
            >
              {/* Line 1: SEG1 */}
              <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] block">
                {seg1Text}
                {typedCount < S1 && <Cursor />}
              </span>
              {/* Line 2: SEG2 + SEG3 */}
              <span className="block mt-1">
                <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                  {seg2Text}
                </span>
                {typedCount >= S1 && typedCount < S1 + S2 && <Cursor />}
                <span className="overseas-glow font-serif italic pr-2 font-light">
                  {seg3Text}
                </span>
                {typedCount >= S1 + S2 && !typingDone && <Cursor />}
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
            className="hidden md:flex flex-col items-center gap-4 shrink-0"
          >
            <span className="text-white/50 font-sans text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
              Scroll down
            </span>
            <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden backdrop-blur-sm rounded-full">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
