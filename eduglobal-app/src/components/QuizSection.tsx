import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import QuizFlow from "./QuizFlow";
import AboutSection from "./AboutSection";

export default function QuizSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 0.95], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.25], [1.4, 1]);
  const titleRotateX = useTransform(scrollYProgress, [0.1, 0.25], [60, 0]);
  
  const titleFilter = useTransform(scrollYProgress, (p) => {
    if (p < 0.1) return "blur(24px)";
    if (p >= 0.25) return "none"; // explicit 'none' prevents browser text blurring rendering bug
    const val = 24 - ((p - 0.1) / 0.15) * 24;
    return `blur(${val}px)`;
  });

  // Start the white overlay at the very end of the scroll, reaching full white precisely when the section finishes
  const whiteOverlayOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const buttonsOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.95, 1], [40, 0]);
  const buttonsScale = useTransform(scrollYProgress, [0.95, 1], [0.9, 1]);
  const buttonsPointerEvents = useTransform(scrollYProgress, (v) => v > 0.98 ? "auto" : "none");

  const targetTimeRef = useRef(0);

  const currentTimeRef = useRef(0);

  useEffect(() => {
    // Keep target time continuously synced with scroll relative to video duration
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (videoRef.current && !Number.isNaN(videoRef.current.duration)) {
        targetTimeRef.current = latest * videoRef.current.duration;
      }
    });

    let animationFrameId: number;

    let lastRenderTime = 0;

    const render = (time: DOMHighResTimeStamp) => {
      if (videoRef.current && !Number.isNaN(videoRef.current.duration)) {
        // Lerp towards target: using a bit higher alpha for responsiveness since we stagger updates
        currentTimeRef.current += (targetTimeRef.current - currentTimeRef.current) * 0.1;
        
        // Throttle actual video updates to ~16fps (60ms) to prevent overwhelming the video decoder
        // This solves the stuttering/lag during fast scrolling.
        if (time - lastRenderTime > 60) {
          if (Math.abs(videoRef.current.currentTime - currentTimeRef.current) > 0.02) {
            videoRef.current.currentTime = currentTimeRef.current;
            lastRenderTime = time;
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-white">
      {/* Sticky container that stays on screen while scrolling through the 400vh */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-black">
        
        {/* Scroll-driven Video Background */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1778947932/hf_20260516_160425_8fd72773-1973-4efb-8b90-be496f11f543_r09btl.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
          playsInline
          preload="auto"
          // We intentionally omit 'muted' and 'autoplay'
          // No 'controls' added
        />
        
        
        {/* Content Bottom Centered over the Video */}
        <div className="relative z-20 flex flex-col items-center justify-end text-center px-6 md:px-12 w-full h-full pb-16 md:pb-24 perspective-[1000px]">
          <div className="flex flex-col items-center gap-8 perspective-[1000px]">
            <motion.h2 
              style={{
                opacity: titleOpacity,
                y: titleY,
                filter: titleFilter,
                scale: titleScale,
                rotateX: titleRotateX,
                transformOrigin: "center bottom",
              }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white leading-[1.05] drop-shadow-2xl"
            >
              Let's find out your <em className="font-serif italic font-light text-[#60A5FA]">destination.</em>
            </motion.h2>

            <motion.div 
              style={{ opacity: titleOpacity }}
              className="flex flex-col items-center gap-4 mt-8"
            >
              <span className="text-white/50 font-sans text-[10px] uppercase tracking-[0.3em]">
                Keep Scrolling
              </span>
              <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                 <motion.div 
                   animate={{ y: ["-100%", "200%"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-white"
                 />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final White Overlay with Beam Effect */}
        <motion.div 
          style={{ opacity: whiteOverlayOpacity }}
          className="absolute inset-0 bg-[#eef2f6] z-30 pointer-events-none flex items-center justify-center overflow-hidden" 
        >
          {/* Background Ambient Darkening */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-300/50 mix-blend-multiply" />

          {/* The Diagonal Light Beam */}
          <div className="absolute -top-[50%] left-[5%] w-[35%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent rotate-[40deg] blur-[50px] opacity-100" />
          <div className="absolute -top-[50%] left-[15%] w-[10%] h-[200%] bg-white rotate-[40deg] blur-[20px] opacity-80" />
          
          {/* Intense blue highlight behind the buttons to give that glassy blue vibe */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div
            style={{ 
              opacity: buttonsOpacity, 
              y: buttonsY,
              scale: buttonsScale,
              pointerEvents: buttonsPointerEvents as any
            }}
            className="flex flex-col gap-6 items-center px-4"
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <span className="text-[#1D4ED8] font-mono text-xs md:text-sm tracking-widest font-semibold uppercase">Your Journey Begins</span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-slate-800 text-center max-w-2xl px-4 leading-tight">
                Let's find your dream destination
              </h3>
            </div>
            
            <div className="flex flex-col gap-3 items-center w-full">
              <motion.button 
                initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsQuizOpen(true)}
              className="relative group flex items-center justify-center rounded-[3rem] p-[6px] bg-white/50 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05),inset_0_4px_10px_rgba(255,255,255,1),0_10px_40px_rgba(37,99,235,0.2)] transition-all duration-300 backdrop-blur-xl border border-white/40"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-[#eef2ff]/50 blur-[4px] pointer-events-none"></div>
              
              <div className="relative flex items-center justify-center rounded-[2.5rem] bg-gradient-to-b from-[#4F8EF7] to-[#1D4ED8] px-10 py-4 w-full h-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-4px_8px_rgba(0,0,0,0.2)] overflow-hidden group-hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),inset_0_-4px_10px_rgba(0,0,0,0.2),0_4px_20px_rgba(37,99,235,0.5)] transition-shadow duration-300">
                
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                
                {/* Top Inner Light / Reflection */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>

                <span className="relative z-10 flex items-center gap-2 text-white font-sans font-medium text-[1.05rem] tracking-wide">
                  Take the Quiz

                  {/* Sparkle Icon */}
                  <motion.svg 
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-[1.1rem] h-[1.1rem] ml-1 drop-shadow-md" 
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 2C11 2 11.5 8 16 8.5C11.5 9 11 15 11 15C11 15 10.5 9 6 8.5C10.5 8 11 2 11 2Z" fill="white"/>
                    <path d="M19 12C19 12 19.2 15 21 15.2C19.2 15.4 19 18.4 19 18.4C19 18.4 18.8 15.4 17 15.2C18.8 15 19 12 19 12Z" fill="white"/>
                    <path d="M7 16C7 16 7.2 18 9 18.2C7.2 18.4 7 20.4 7 20.4C7 20.4 6.8 18.4 5 18.2C6.8 18 7 16 7 16Z" fill="white"/>
                  </motion.svg>
                </span>
              </div>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAboutOpen(true)}
              className="group flex flex-col items-center justify-center p-2"
            >
              <span className="text-black/60 group-hover:text-black transition-colors font-medium text-sm md:text-[15px] relative">
                Already Taken
                <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-black/40 group-hover:bg-black transition-colors"></span>
              </span>
            </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isQuizOpen && (
          <QuizFlow onClose={() => setIsQuizOpen(false)} />
        )}
        {isAboutOpen && (
          <AboutSection onClose={() => setIsAboutOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
