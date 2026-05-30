import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { PlaneTakeoff, Globe, FileCheck } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Both background and cutout must move at the exact same speed
  // because the background image still contains the subject. 
  // If they move at different speeds, a duplicate subject is revealed.
  const sharedY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
      <motion.div 
        style={{ y: sharedY }}
        className="absolute inset-0 z-0 scale-110"
      >
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
        <div className="absolute inset-0 bg-black/30" /> {/* Darken for readability */}
      </motion.div>

      {/* 2. LAYER 1: ANIMATED THOUGHT BUBBLES (BEHIND CUTOUT) */}
      <motion.div 
        style={{ y: sharedY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {/* Thought Bubble 1: Left side */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="absolute top-[28%] md:top-[22%] left-[4%] sm:left-[10%] md:left-[12%] lg:left-[16%] pointer-events-auto cursor-pointer"
          onMouseEnter={() => setHoveredBubble(1)}
          onMouseLeave={() => setHoveredBubble(null)}
        >
          <motion.div
            animate={{ 
              opacity: hoveredBubble === 1 ? 1 : 0.85,
              filter: hoveredBubble === 1 ? "blur(0px)" : "blur(2.5px)"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative group"
            >
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 bg-[#3B82F6]/30 blur-[40px] rounded-full pointer-events-none" />

            {/* High-Tech Glass Card */}
            <div className="relative z-10 flex items-center gap-4 md:gap-5 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 pr-6 md:p-5 md:pr-8 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.05)] overflow-hidden">
              
              {/* Inner subtle glass gradient highlight */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

              {/* Icon Container */}
              <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 shrink-0 shadow-inner">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-white/30"
                />
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-[#60A5FA]" />
              </div>

              {/* Typography */}
              <div className="flex flex-col relative z-20">
                <span className="font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-[#93C5FD] mb-0.5 drop-shadow-sm">
                  AI Match Analysis
                </span>
                <span className="font-serif text-base md:text-xl lg:text-2xl text-white tracking-wide drop-shadow-md">
                  Which <em className="font-light text-[#60A5FA] italic">country</em><br className="sm:hidden" /> should I choose?
                </span>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* 3. LAYER 2: CUTOUT FOREGROUND */}
      <motion.div 
        style={{ y: sharedY }}
        className="absolute inset-0 z-20 pointer-events-none scale-110"
      >
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
        {/* Soft bottom gradient to blend into the next section */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </motion.div>

      {/* 3.5. LAYER 2.5: ANIMATED THOUGHT BUBBLES (IN FRONT OF CUTOUT) */}
      <motion.div 
        style={{ y: sharedY }}
        className="absolute inset-0 z-[25] pointer-events-none"
      >
        {/* Thought Bubble 2: Right side */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="absolute top-[48%] md:top-[45%] right-[4%] sm:right-[10%] md:right-[12%] lg:right-[16%] pointer-events-auto cursor-pointer"
          onMouseEnter={() => setHoveredBubble(2)}
          onMouseLeave={() => setHoveredBubble(null)}
        >
          <motion.div
            animate={{ 
              opacity: hoveredBubble === 2 ? 1 : (hoveredBubble === 1 ? 0.6 : 1),
              filter: hoveredBubble === 2 ? "blur(0px)" : (hoveredBubble === 1 ? "blur(2.5px)" : "blur(0px)")
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <motion.div 
              animate={{ y: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="relative group"
            >
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 bg-[#3B82F6]/30 blur-[40px] rounded-full pointer-events-none" />

            {/* High-Tech Glass Card */}
            <div className="relative z-10 flex items-center gap-4 md:gap-5 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 pr-6 md:p-5 md:pr-8 rounded-[2rem] shadow-[0_8px_32px_rgba(255,255,255,0.05)] overflow-hidden">
              
              {/* Inner subtle glass gradient highlight */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

              {/* Icon Container */}
              <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 shrink-0 shadow-inner">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-white/30"
                />
                <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-[#60A5FA]" />
              </div>

              {/* Typography */}
              <div className="flex flex-col relative z-20">
                <span className="font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-[#93C5FD] mb-0.5 drop-shadow-sm">
                  Document Checker
                </span>
                <span className="font-serif text-base md:text-xl lg:text-2xl text-white tracking-wide drop-shadow-md">
                  Are my <em className="font-light text-[#60A5FA] italic">documents</em><br className="sm:hidden" /> ready yet?
                </span>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 4. LAYER 3: UI ELEMENTS (Navbar, CTA, Scroll Indication) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
        
        {/* Navbar */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="flex justify-between items-center pointer-events-auto"
        >
          <div className="flex items-center gap-2 font-sans font-bold text-white text-lg md:text-xl tracking-widest uppercase">
            <img src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png" alt="Migrate Properly Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
            <span>Migrate<span className="font-light">Properly</span></span>
          </div>
          <nav className="hidden md:flex gap-10">
             {["AI Matcher", "Doc Verify", "Destinations", "Process"].map((item) => (
               <a 
                key={item} 
                href="#" 
                className="text-white/80 hover:text-white font-sans text-xs uppercase tracking-[0.15em] transition-colors"
              >
                 {item}
               </a>
             ))}
          </nav>
          <button className="hidden sm:block px-6 py-3 border border-white/20 rounded-full text-white font-sans text-xs tracking-widest uppercase backdrop-blur-md hover:bg-white hover:text-black transition-all">
            Get Started
          </button>
        </motion.header>

        {/* Bottom Elements */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-8 pb-4 pointer-events-auto">
          
          <div className="flex flex-col items-start gap-4 z-10 w-full md:w-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(15px)", rotateX: -20 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              style={{ transformOrigin: "bottom left" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-[-0.03em] leading-[0.95]"
            >
              <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] block">Planning to</span>
              <span className="block mt-1">
                <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">study </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white/90 drop-shadow-[0_0_30px_rgba(96,165,250,0.4)] font-serif italic pr-2 font-light">overseas?</span>
              </span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
            className="flex flex-col items-center gap-4 hidden md:flex shrink-0"
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
