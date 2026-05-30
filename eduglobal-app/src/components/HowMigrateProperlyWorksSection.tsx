import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ClipboardEdit, BrainCircuit, Globe, PlaneTakeoff, User, Landmark } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Tell Us About You",
    description: "Share your background, budget, and skills to help us understand your profile. We build a comprehensive picture of your ambitions.",
    icon: <ClipboardEdit className="w-7 h-7 text-white/80 group-hover:text-blue-300 transition-colors" />,
    gradient: "from-blue-500/20 via-blue-900/5 to-transparent",
    borderGlow: "hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]",
    className: "md:col-span-1 lg:col-span-1"
  },
  {
    num: "02",
    title: "AI Analyzes & Matches",
    description: "Our agentic AI processes real-time visa regulations, cost of living indices, and job market data to find your optimal study destination. Lightning fast and highly accurate.",
    icon: <BrainCircuit className="w-7 h-7 text-white/80 group-hover:text-purple-300 transition-colors" />,
    gradient: "from-purple-500/20 via-purple-900/5 to-transparent",
    borderGlow: "hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]",
    className: "md:col-span-2 lg:col-span-2"
  },
  {
    num: "03",
    title: "Perfect Country",
    description: "Receive a deeply curated list with match scores and detailed insights on exactly why each country fits your unique profile.",
    icon: <Globe className="w-7 h-7 text-white/80 group-hover:text-emerald-300 transition-colors" />,
    gradient: "from-emerald-500/20 via-emerald-900/5 to-transparent",
    borderGlow: "hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]",
    className: "md:col-span-2 lg:col-span-2"
  },
  {
    num: "04",
    title: "Prepare & Move",
    description: "Generate AI SOPs instantly or get an Optional Human Expert Review for ৳10,000 to finalize your journey.",
    icon: <PlaneTakeoff className="w-7 h-7 text-white/80 group-hover:text-indigo-300 transition-colors" />,
    gradient: "from-indigo-500/20 via-indigo-900/5 to-transparent",
    borderGlow: "hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]",
    className: "md:col-span-1 lg:col-span-1"
  }
];

function PathComparison() {
  const [isSmart, setIsSmart] = useState(false);

  // Smooth morphing curved paths (Start x=120, End x=880)
  const paths = {
    top: {
      smart: "M 120 150 C 300 130, 400 130, 500 150 C 600 170, 700 170, 880 150",
      messy: "M 120 150 C 200 -50, 400 350, 500 50 C 650 -150, 800 250, 880 150"
    },
    middle: {
      smart: "M 120 150 C 300 150, 400 150, 500 150 C 600 150, 700 150, 880 150",
      messy: "M 120 150 C 250 350, 350 -150, 500 250 C 650 500, 800 -50, 880 150"
    },
    bottom: {
      smart: "M 120 150 C 300 170, 400 170, 500 150 C 600 130, 700 130, 880 150",
      messy: "M 120 150 C 300 50, 450 350, 500 100 C 550 -100, 750 300, 880 150"
    }
  };

  const obstacles = [
    { x: 300, y: 30, text: "Endless Paperwork", delay: 0.1 },
    { x: 500, y: 250, text: "Visa Confusion", delay: 0.2 },
    { x: 700, y: 30, text: "Missed Deadlines", delay: 0.3 },
  ];

  const smartTags = [
    { x: 300, y: 100, text: "AI Profile Match", delay: 0.1 },
    { x: 500, y: 200, text: "Instant SOPs", delay: 0.2 },
    { x: 700, y: 100, text: "Seamless Visa", delay: 0.3 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)", y: 50 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-6xl mx-auto mt-24 md:mt-40 rounded-[2.5rem] bg-[#020202] border border-white/[0.04] overflow-hidden group shadow-[0_0_80px_rgba(0,0,0,0.8)]"
    >
      {/* Background ambient light */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isSmart ? 0.3 : 0.08,
          background: isSmart 
            ? "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 100%)"
            : "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(239,68,68,0.15) 0%, rgba(0,0,0,0) 100%)"
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 lg:p-14 pb-0 relative z-20 gap-8">
        <div className="max-w-xl">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">The Journey</span> <br className="hidden md:block"/> vs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-serif italic font-light">The Struggle</span>
          </h3>
          <p className="text-white/40 mt-6 text-sm md:text-base leading-relaxed font-light">
            Experience the difference between navigating the complex global education system alone, versus moving with intelligent, autonomous AI precision.
          </p>
        </div>
        
        <div className="p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] flex backdrop-blur-xl relative shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.3)_inset]">
          <button 
            onClick={() => setIsSmart(false)}
            className={`relative z-10 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 w-[140px] sm:w-[170px] ${!isSmart ? 'text-red-300' : 'text-white/40 hover:text-white/70'}`}
          >
            Standalone Process
          </button>
          
          <button 
            onClick={() => setIsSmart(true)}
            className={`relative z-10 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 w-[140px] sm:w-[170px] ${isSmart ? 'text-blue-300' : 'text-white/40 hover:text-white/70'}`}
          >
            MigrateProperly
            <AnimatePresence>
              {!isSmart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 1 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                >
                  <div className="animate-bounce flex flex-col items-center">
                    <div className="bg-blue-600/90 text-white text-[10px] sm:text-xs px-3 py-1.5 rounded-lg font-medium shadow-[0_0_20px_rgba(37,99,235,0.6)] whitespace-nowrap">
                      Click MigrateProperly
                    </div>
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-blue-600/90" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          
          <motion.div 
            className="absolute top-1.5 bottom-1.5 rounded-full z-0 pointer-events-none"
            initial={false}
            animate={{ 
              width: "calc(50% - 6px)",
              left: isSmart ? "50%" : "6px",
              backgroundColor: isSmart ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 68, 68, 0.15)",
              borderColor: isSmart ? "rgba(59, 130, 246, 0.3)" : "rgba(239, 68, 68, 0.3)",
              boxShadow: isSmart ? "0 0 20px rgba(59,130,246,0.2)" : "0 0 20px rgba(239,68,68,0.2)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ border: "1px solid" }}
          />
        </div>
      </div>

      <div className="w-full relative h-[350px] md:h-[450px] z-10 mt-8 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="smartGrad" x1="0" y1="0" x2="1" y2="0">
               <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
               <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
               <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="messyGrad" x1="0" y1="0" x2="1" y2="0">
               <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
               <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
               <stop offset="100%" stopColor="#71717a" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glowSmart" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="8" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowMessy" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="4" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Background inside SVG */}
          <motion.g initial={false} animate={{ opacity: isSmart ? 0.05 : 0.02 }} transition={{ duration: 1.5 }}>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="1000" height="300" fill="url(#gridPattern)" />
          </motion.g>

          {/* Paths */}
          {[paths.top, paths.middle, paths.bottom].map((pathObj, i) => (
            <g key={i}>
              {/* Base Glowing Path */}
              <motion.path 
                initial={false}
                animate={{ 
                  d: isSmart ? pathObj.smart : pathObj.messy,
                  stroke: isSmart ? "url(#smartGrad)" : "url(#messyGrad)",
                  strokeWidth: isSmart ? (i === 1 ? 4 : 2) : 2
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                fill="transparent"
                strokeLinecap="round"
                filter={isSmart ? "url(#glowSmart)" : "url(#glowMessy)"}
              />
              {/* Animated Flowing Particles */}
              <motion.path 
                initial={false}
                animate={{ 
                  d: isSmart ? pathObj.smart : pathObj.messy,
                  stroke: isSmart ? "#ffffff" : "#ef4444",
                  strokeDashoffset: [1000, 0]
                }}
                transition={{ 
                   d: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                   strokeDashoffset: { duration: isSmart ? 3 : 8, repeat: Infinity, ease: "linear" }
                }}
                fill="transparent"
                strokeWidth={isSmart ? (i === 1 ? 3 : 2) : 1}
                strokeDasharray={isSmart ? "40 120" : "10 50"}
                strokeLinecap="round"
                className={isSmart ? "opacity-90" : "opacity-40"}
              />
            </g>
          ))}
          
          {/* SVG floating tags */}
          <AnimatePresence>
             {!isSmart && obstacles.map((obs, i) => (
                <motion.g 
                  key={`obs-${i}`}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: obs.delay, type: "spring", bounce: 0.4 }}
                >
                  <rect x={obs.x - 85} y={obs.y - 15} width="170" height="30" rx="15" fill="#271c19" stroke="#ef4444" strokeWidth="1" />
                  <circle cx={obs.x - 70} cy={obs.y} r="6" fill="#ef4444" />
                  <text x={obs.x - 55} y={obs.y + 4} fill="#fca5a5" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.5">{obs.text.toUpperCase()}</text>
                </motion.g>
             ))}
             {isSmart && smartTags.map((tag, i) => (
                <motion.g 
                  key={`tag-${i}`}
                  initial={{ opacity: 0, scale: 0, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: tag.delay, type: "spring", bounce: 0.4 }}
                >
                  <rect x={tag.x - 85} y={tag.y - 15} width="170" height="30" rx="15" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                  <circle cx={tag.x - 70} cy={tag.y} r="6" fill="#3b82f6" />
                  <text x={tag.x - 55} y={tag.y + 3} fill="#93c5fd" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.5">{tag.text.toUpperCase()}</text>
                </motion.g>
             ))}
          </AnimatePresence>

          {/* Student Node */}
          <foreignObject x="40" y="110" width="80" height="80" style={{ overflow: 'visible' }}>
            <div className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center relative backdrop-blur-xl transition-all duration-1000 ${isSmart ? 'bg-blue-500/10 border-blue-400/30' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 ${isSmart ? 'opacity-100 shadow-[0_0_40px_rgba(59,130,246,0.5)]' : 'opacity-0'}`} />
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 ${!isSmart ? 'opacity-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'opacity-0'}`} />
              <User className={`w-8 h-8 relative z-10 transition-colors duration-1000 ${isSmart ? 'text-blue-300' : 'text-red-400/50'}`} />
              <div className="absolute -bottom-8 flex justify-center w-full">
                <span className={`text-[10px] tracking-widest font-mono whitespace-nowrap transition-colors duration-1000 ${isSmart ? 'text-blue-200' : 'text-red-300/40'}`}>STUDENT</span>
              </div>
            </div>
          </foreignObject>

          {/* Destination Node */}
          <foreignObject x="880" y="110" width="80" height="80" style={{ overflow: 'visible' }}>
            <div className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center relative backdrop-blur-xl transition-all duration-1000 ${isSmart ? 'bg-emerald-500/10 border-emerald-400/30' : 'bg-zinc-500/5 border-zinc-500/20'}`}>
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 ${isSmart ? 'opacity-100 shadow-[0_0_40px_rgba(16,185,129,0.5)]' : 'opacity-0'}`} />
              <Landmark className={`w-8 h-8 relative z-10 transition-colors duration-1000 ${isSmart ? 'text-emerald-300' : 'text-zinc-500'}`} />
              <div className="absolute -bottom-8 flex justify-center w-full">
                <span className={`text-[10px] tracking-widest font-mono whitespace-nowrap transition-colors duration-1000 ${isSmart ? 'text-emerald-200' : 'text-zinc-500'}`}>UNIVERSITY</span>
              </div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </motion.div>
  );
}

export default function HowMigrateProperlyWorksSection() {
  return (
    <section className="relative min-h-screen bg-black py-32 flex flex-col justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black z-0 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-400 tracking-[0.2em] text-xs uppercase mb-6 block font-semibold flex items-center gap-4">
               <span className="w-12 h-px bg-blue-400/80"></span> Workflow
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-[1.05]">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic font-serif font-light pr-2">MigrateProperly</span><br/>Works.
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 max-w-sm text-lg font-light leading-relaxed pb-2 lg:text-right"
          >
            Get up and running in four intelligent steps. Advanced AI handles the complexity so you can focus on your future.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min lg:auto-rows-[420px]">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-[2rem] bg-zinc-950 border border-white/5 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:-translate-y-2 flex flex-col justify-between p-8 md:p-10 lg:p-12 ${step.borderGlow} ${step.className}`}
            >
              {/* Noise Texture Background */}
              <div 
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay group-hover:opacity-[0.06] transition-opacity duration-1000 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
              ></div>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`} />
              
              {/* Massive Structural Number */}
              <div className="absolute -right-6 -top-12 text-[12rem] md:text-[14rem] lg:text-[16rem] font-sans font-extrabold text-white/[0.02] select-none group-hover:text-white/[0.04] transition-colors duration-1000 pointer-events-none tracking-tighter mix-blend-plus-lighter">
                {step.num}
              </div>

              {/* Icon Container */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {step.icon}
              </div>
              
              {/* Content Container */}
              <div className="relative z-10 mt-16 lg:mt-auto flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-white/30 tracking-widest group-hover:text-white/60 transition-colors duration-500">STEP {step.num}</span>
                  <div className="h-px bg-white/10 flex-1 max-w-[40px] group-hover:max-w-full group-hover:bg-white/30 transition-all duration-1000 ease-[0.16,1,0.3,1]" />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-medium text-white tracking-tight leading-[1.1] group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h3>
                
                <p className="text-white/40 text-base lg:text-lg font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <PathComparison />
      </div>
    </section>
  );
}
