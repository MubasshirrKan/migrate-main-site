import { motion } from "motion/react";
import { Upload, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function HowItWorksSection() {
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const activeVideoRef = useRef<0 | 1>(0);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const crossfadeDuration = 2.0; // 2 seconds crossfade

    const onTimeUpdate1 = () => {
      if (activeVideoRef.current !== 0) return;
      if (v1.duration && v1.currentTime >= v1.duration - crossfadeDuration) {
        activeVideoRef.current = 1;
        setActiveVideo(1);
        v2.currentTime = 0;
        v2.play().catch(() => {});
      }
    };

    const onTimeUpdate2 = () => {
      if (activeVideoRef.current !== 1) return;
      if (v2.duration && v2.currentTime >= v2.duration - crossfadeDuration) {
        activeVideoRef.current = 0;
        setActiveVideo(0);
        v1.currentTime = 0;
        v1.play().catch(() => {});
      }
    };

    v1.addEventListener('timeupdate', onTimeUpdate1);
    v2.addEventListener('timeupdate', onTimeUpdate2);
    
    v1.play().catch(() => {});

    return () => {
      v1.removeEventListener('timeupdate', onTimeUpdate1);
      v2.removeEventListener('timeupdate', onTimeUpdate2);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-start overflow-hidden pt-20 md:pt-32">
      {/* Fullscreen Video Background with smooth dual-video loop crossfade */}
      <video 
        ref={video1Ref}
        muted 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 0 ? 'opacity-70' : 'opacity-0'}`}
        src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779116801/hf_20260518_142534_1848f323-b39e-4759-85cb-4856b118b4ee_j0rrpb.mp4"
      />
      <video 
        ref={video2Ref}
        muted 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 1 ? 'opacity-70' : 'opacity-0'}`}
        src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779116801/hf_20260518_142534_1848f323-b39e-4759-85cb-4856b118b4ee_j0rrpb.mp4"
      />

      {/* Top Fade Gradient for Smooth Entry */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black/80 to-black object-cover z-0" />
      
      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl text-center flex flex-col items-center justify-start flex-1 pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
          }}
          className="flex flex-col items-center gap-6 perspective-[1000px]"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[5rem] leading-[1.1] font-sans font-extrabold tracking-tighter flex flex-col items-center">
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -40, filter: "blur(15px)", scale: 0.8 },
                visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              style={{ transformOrigin: "bottom center" }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm pb-1"
            >
              Choose Wisely.
            </motion.span>
            
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -40, filter: "blur(15px)", scale: 0.8 },
                visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              style={{ transformOrigin: "bottom center" }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white/90 drop-shadow-[0_0_40px_rgba(96,165,250,0.6)]"
            >
              Choose Right.
            </motion.span>
          </h2>

          {/* Subtitle paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg font-sans text-sm md:text-base text-white/50 leading-relaxed tracking-wide text-center"
          >
            AI-matched destinations, expert guidance, and a clear path — so you land exactly where you're meant to be.
          </motion.p>

          {/* Decorative glowing line below */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0, filter: "blur(10px)" },
              visible: { opacity: 1, scaleX: 1, filter: "blur(0px)", transition: { duration: 1.5, ease: "easeInOut" } }
            }}
            style={{ transformOrigin: "center" }}
            className="h-[3px] max-w-[400px] mt-4 w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_30px_rgba(96,165,250,1)] rounded-full"
          />
        </motion.div>

        {/* Bottom Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-auto pb-12"
        >
          <button className="relative px-8 py-4 rounded-full group outline-none overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] backdrop-blur-md min-w-[240px]">
             
             {/* Glass reflection top highlight */}
             <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-full pointer-events-none"></div>
             
             {/* Subtle bottom blueish glow internally */}
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

             {/* Top border glow */}
             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
             {/* Bottom border glow */}
             <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
             
             {/* Shimmer effect */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-[shimmer_2s_infinite_ease-in-out]" />
             </div>

             {/* Text */}
             <span className="relative z-10 text-white font-medium text-lg tracking-wide flex items-center justify-center gap-2 drop-shadow-md transition-colors">
               Take Service
               <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
             </span>
          </button>
        </motion.div>
      </div>
      
    </section>
  );
}
