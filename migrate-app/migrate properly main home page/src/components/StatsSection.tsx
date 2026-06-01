import { motion, useInView, useMotionValue, useTransform, animate, useScroll, MotionValue } from "motion/react";
import React, { useRef, useEffect } from "react";

function Counter({ to, isInView }: { to: number; isInView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 });
      return controls.stop;
    }
  }, [isInView, to, count]);

  return <motion.span>{rounded}</motion.span>;
}

function WaveLine({ 
  children, 
  lineIndex, 
  scrollYProgress, 
  variants, 
  className = ""
}: { 
  children: React.ReactNode; 
  lineIndex: number; 
  scrollYProgress: MotionValue<number>; 
  variants: any; 
  className?: string; 
}) {
  const x = useTransform(scrollYProgress, (v) => {
    // Horizontal shifting for flowing feel
    return Math.sin((v * Math.PI * 4) - (lineIndex * 0.5)) * 48;
  });

  const y = useTransform(scrollYProgress, (v) => {
    // Vertical wave
    return Math.cos((v * Math.PI * 4) - (lineIndex * 0.5)) * 16;
  });

  const rotate = useTransform(scrollYProgress, (v) => {
    return Math.sin((v * Math.PI * 4) - (lineIndex * 0.5)) * 1.5;
  });

  return (
    <motion.div 
      variants={variants} 
      className={className}
      style={{ x, y, rotate }}
    >
      {children}
    </motion.div>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-zinc-950 flex flex-col justify-center overflow-hidden py-32 px-6 md:px-12 lg:px-24"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-[100rem] mx-auto flex flex-col items-start"
      >
        <motion.div variants={itemVariants} className="font-mono text-xs md:text-sm text-[#93C5FD] tracking-[0.2em] uppercase mb-12 md:mb-20 flex items-center gap-4">
          <span className="opacity-50">//</span> PROVEN SUCCESS
        </motion.div>

        <h2 className="text-[1.4rem] sm:text-[2rem] md:text-[3.5rem] lg:text-[4.6rem] xl:text-[5.2rem] font-sans font-medium tracking-tight text-white leading-[1.1] flex flex-col items-start gap-2 md:gap-4 w-full">
          <WaveLine lineIndex={0} scrollYProgress={scrollYProgress} variants={itemVariants} className="flex items-center gap-x-[0.3em] whitespace-nowrap">
            <span className="text-[#60A5FA]"><Counter to={1000} isInView={isInView} />+ students</span> have already
          </WaveLine>

          <WaveLine lineIndex={1} scrollYProgress={scrollYProgress} variants={itemVariants} className="flex items-center gap-x-[0.3em] whitespace-nowrap">
            discovered their <span className="text-[#60A5FA]">ideal</span>
          </WaveLine>

          <WaveLine lineIndex={2} scrollYProgress={scrollYProgress} variants={itemVariants} className="flex items-center gap-x-[0.3em] whitespace-nowrap">
            <span className="text-[#60A5FA]">study abroad</span> destination
          </WaveLine>

          <WaveLine lineIndex={3} scrollYProgress={scrollYProgress} variants={itemVariants} className="flex items-center gap-4 md:gap-6 mt-2 md:mt-4 whitespace-nowrap">
            <span className="text-white/40">— in just one minute.</span>
            
            <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group pointer-events-auto cursor-default shrink-0">
               {/* Invisible interaction area to prevent highlighting text around it easily */}
               <div className="absolute inset-0 z-10" />
               <div className="absolute inset-0 bg-[#3B82F6]/30 blur-[20px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 rounded-full border-[1px] md:border-2 border-dashed border-white/20 group-hover:border-[#60A5FA]/50 transition-colors duration-500"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[6px] md:inset-[10px] rounded-full border-[1px] md:border-2 border-dashed border-white/10 group-hover:border-[#60A5FA]/30 transition-colors duration-500"
               />
               <div className="relative z-20 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white group-hover:bg-[#60A5FA] group-hover:shadow-[0_0_15px_rgba(96,165,250,0.8)] transition-all duration-500" />
            </div>
          </WaveLine>
        </h2>
      </motion.div>
    </section>
  );
}
