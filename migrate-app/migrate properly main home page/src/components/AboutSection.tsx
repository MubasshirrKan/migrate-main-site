import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

import AIFileCheckingSection from "./AIFileCheckingSection";
import HowItWorksSection from "./HowItWorksSection";
import HowMigrateProperlyWorksSection from "./HowMigrateProperlyWorksSection";
import TestimonialSection from "./TestimonialSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";

export default function AboutSection({ onClose }: { onClose: () => void }) {
  const isClosing = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current) return;
      // If at the very top and scrolling up significantly, close the section
      if (scrollContainerRef.current.scrollTop <= 0 && e.deltaY < -10 && !isClosing.current) {
        isClosing.current = true;
        onClose();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollContainerRef.current) return;
      const touchEndY = e.touches[0].clientY;
      // If swiping down (which equals scrolling up), close the section
      if (scrollContainerRef.current.scrollTop <= 0 && touchEndY - touchStartY > 20 && !isClosing.current) {
        isClosing.current = true;
        onClose();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onClose]);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Text 1: We Work Smarter with AI Technology.
  const t1Opacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const t1Y = useTransform(smoothProgress, [0, 0.15, 0.25], [0, 0, -80]);
  const t1Filter = useTransform(smoothProgress, [0, 0.15, 0.25], ["blur(0px)", "blur(0px)", "blur(20px)"]);

  // Text 2: Experts Who Truly Care About Your Success.
  const t2Opacity = useTransform(smoothProgress, [0.2, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const t2Y = useTransform(smoothProgress, [0.2, 0.35, 0.55, 0.65], [80, 0, 0, -80]);
  const t2Filter = useTransform(smoothProgress, [0.2, 0.35, 0.55, 0.65], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  // Text 3: 10 Years of Proven Excellence.
  const t3Opacity = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 1]);
  const t3Y = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], [80, 0, 0, 0]);
  const t3Filter = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(0px)"]);

  const [displayCount, setDisplayCount] = useState(0);
  const count = useTransform(smoothProgress, [0.6, 0.75], [0, 10]);
  useMotionValueEvent(count, "change", (latest) => {
    setDisplayCount(Math.round(latest));
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -20]);

  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <motion.div
      ref={scrollContainerRef}
      initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
      animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      exit={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-[#05080C] overflow-y-auto overflow-x-hidden"
    >
      <div ref={targetRef} className="h-[400vh] w-full relative">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center bg-black">
          
          <motion.div 
            initial={{ scale: 1.1, filter: "blur(20px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image with scroll zoom */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full">
              <img 
                src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1779014316/hf_20260517_102805_cdc99b9e-d9b6-4759-afc2-2942ebcaffdb_o5tvvh.png" 
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Dark gradient overlay on bg to make text more readable */}
              <div className="absolute inset-0 bg-black/40 z-[5]" />
            </motion.div>

            {/* The Text titles (hidden behind cutout) */}
            <div className="absolute top-[35%] w-full -translate-y-1/2 z-10 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute flex items-center justify-center w-full max-w-5xl px-4"
              >
                <motion.div 
                  style={{ opacity: t1Opacity, y: t1Y, filter: t1Filter }} 
                  className="relative px-8 py-12 md:px-20 md:py-16 rounded-[2.5rem] bg-zinc-950/20 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.03)_inset] backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-12 opacity-50" />
                  
                  <span className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] tracking-[0.3em] uppercase font-bold mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)_inset]">
                    Intelligence
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-sans font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 leading-[1.1] relative z-10">
                    We Work Smarter <br className="hidden sm:block" />
                    <em className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white/40 block mt-2 pb-2">with AI Technology.</em>
                  </h2>
                </motion.div>
              </motion.div>
              
              <motion.div 
                style={{ opacity: t2Opacity, y: t2Y, filter: t2Filter }} 
                className="absolute flex items-center justify-center w-full max-w-5xl px-4"
              >
                <div className="relative px-8 py-12 md:px-20 md:py-16 rounded-[2.5rem] bg-zinc-950/20 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.03)_inset] backdrop-blur-[20px]">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-12 opacity-50" />

                  <span className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] tracking-[0.3em] uppercase font-bold mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)_inset]">
                    Dedication
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-sans font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 leading-[1.1] relative z-10">
                    Experts Who Truly <br className="hidden sm:block" />
                    <em className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white/40 block mt-2 pb-2">Care About Your Success.</em>
                  </h2>
                </div>
              </motion.div>

              <motion.div 
                style={{ opacity: t3Opacity, y: t3Y, filter: t3Filter }} 
                className="absolute flex items-center justify-center w-full max-w-5xl px-4"
              >
                <div className="relative px-8 py-12 md:px-20 md:py-16 rounded-[2.5rem] bg-zinc-950/20 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.03)_inset] backdrop-blur-[20px]">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-12 opacity-50" />

                  <span className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] tracking-[0.3em] uppercase font-bold mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)_inset]">
                    Commitment
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-sans font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 leading-[1.1] relative z-10">
                    {displayCount} Years of <br className="hidden sm:block" />
                    <em className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white/40 block mt-2 pb-2">Proven Excellence.</em>
                  </h2>
                </div>
              </motion.div>
            </div>

            {/* Description at the bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-6 md:bottom-12 left-0 right-0 z-[70] flex justify-center px-4 pointer-events-none"
            >
              <div className="max-w-3xl text-center px-6 py-4">
                <p className="text-[10px] md:text-[11px] lg:text-[13px] text-white/70 font-light leading-relaxed">
                  Choosing the right academic destination is more than just picking a university on a map. 
                  It's about finding an ecosystem where your ambitions can thrive. We leverage data-driven 
                  matching and deep global insights to place students in environments built for their success.
                </p>
              </div>
            </motion.div>

            {/* Cutout Image over the text */}
            <motion.img 
              style={{ scale: bgScale }}
              src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1779014316/Untitled_3_hl1uqq.png" 
              alt="Cutout Background Element"
              className="absolute inset-0 z-20 w-full h-full object-cover object-center pointer-events-none origin-center"
            />

            {/* Fade to black at bottom to blend smoothly into the next section */}
            <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 lg:h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-[60] pointer-events-none" />

            {/* Hint overlay on top of everything */}
            <motion.div 
               style={{ opacity: headerOpacity, y: headerY }}
               className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-white/50 flex flex-col items-center gap-2 uppercase tracking-[0.3em] text-[10px] font-bold"
            >
               Scroll to explore
               <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden mt-1">
                 <motion.div 
                   animate={{ y: ["-100%", "200%"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-white"
                 />
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Continuing the journey after the pinned section */}
      <AIFileCheckingSection />
      <HowItWorksSection />
      <HowMigrateProperlyWorksSection />
      <TestimonialSection />
      <ContactSection />
      <FooterSection />
      
      {/* We can add a bottom spacer or close-triggering area if needed, but the scroll event handles upward scroll */}
    </motion.div>
  );
}
