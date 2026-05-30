import { motion, useMotionValue, useTransform, useAnimationFrame } from "motion/react";
import { useRef } from "react";
import { Fingerprint, FileText, Globe, Banknote, Mail, PenLine, Languages, HeartPulse, Sparkles } from "lucide-react";

function DocumentCard({ doc, i, total, rotation, counterRotation }: any) {
  const angle = (i / total) * 360;

  const filter = useTransform(rotation, (r: number) => {
    let adjusted = (r + angle) % 360;
    if (adjusted < 0) adjusted += 360;
    
    // Front is 0, Back is 180
    const rad = adjusted * Math.PI / 180;
    const z = Math.cos(rad); // 1 at front, -1 at back

    const blurObj = ((1 - z) / 2) * 8;
    const brightObj = 0.3 + ((z + 1) / 2) * 0.9;
    
    return `blur(${blurObj}px) brightness(${brightObj})`;
  });

  const opacity = useTransform(rotation, (r: number) => {
    let adjusted = (r + angle) % 360;
    if (adjusted < 0) adjusted += 360;
    const rad = adjusted * Math.PI / 180;
    const z = Math.cos(rad);
    return 0.2 + ((z + 1) / 2) * 0.8;
  });

  return (
    <div 
      className="absolute"
      style={{ 
          transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(clamp(250px, 40vw, 500px))`,
          transformStyle: 'preserve-3d'
      }}
    >
        <motion.div style={{ transformStyle: 'preserve-3d', rotateY: counterRotation }}>
          <div style={{ transform: `rotateY(${-angle}deg)`, transformStyle: 'preserve-3d' }}>
              <motion.div 
                className="flex flex-col items-center justify-center w-36 md:w-44 p-4 md:p-5 border border-blue-500/20 bg-zinc-950/60 backdrop-blur-[12px] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(59,130,246,0.3)]"
                style={{ filter, opacity }}
              >
                  <div className="mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{doc.icon}</div>
                  <span className="text-white/90 text-xs md:text-sm text-center font-medium leading-tight">{doc.title}</span>
              </motion.div>
          </div>
        </motion.div>
    </div>
  );
}

export default function AIFileCheckingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const documents = [
    { title: "Passport & IDs", icon: <Fingerprint className="w-6 h-6 text-blue-300" /> },
    { title: "Academic Transcripts", icon: <FileText className="w-6 h-6 text-blue-300" /> },
    { title: "Visa Applications", icon: <Globe className="w-6 h-6 text-blue-300" /> },
    { title: "Financial Proofs", icon: <Banknote className="w-6 h-6 text-blue-300" /> },
    { title: "Recommendation Letters", icon: <Mail className="w-6 h-6 text-blue-300" /> },
    { title: "Statement of Purpose", icon: <PenLine className="w-6 h-6 text-blue-300" /> },
    { title: "Language Tests", icon: <Languages className="w-6 h-6 text-blue-300" /> },
    { title: "Medical Records", icon: <HeartPulse className="w-6 h-6 text-blue-300" /> },
  ];

  const rotation = useMotionValue(0);
  const counterRotation = useTransform(rotation, (r) => -r);
  const isDragging = useRef(false);
  const velocity = useRef(10);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      velocity.current = velocity.current * 0.95 + 10 * 0.05; 
      const step = (velocity.current * delta) / 1000;
      rotation.set(rotation.get() + step);
    }
  });

  const handlePanStart = () => {
    isDragging.current = true;
    velocity.current = 0;
  };

  const handlePan = (event: any, info: any) => {
    rotation.set(rotation.get() + info.delta.x * 0.5);
  };

  const handlePanEnd = (event: any, info: any) => {
    isDragging.current = false;
    velocity.current = info.velocity.x * 0.5;
  };

  return (
    <section ref={containerRef} className="relative min-h-[100vh] bg-black flex md:items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ clipPath: "inset(15% 5% 15% 5% round 30px)", opacity: 0, scale: 0.95 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full flex flex-col pt-24"
      >
        {/* Fullscreen Background */}
        <img 
          src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1779030446/hf_20260517_141817_0432cb5d-fcb9-45f7-96be-0039e1d05648_svqlmr.png" 
          alt="AI Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Top Fade Gradient for Smooth Entry from Previous Section */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-48 lg:h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center justify-start text-center pointer-events-none px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl max-w-5xl font-sans font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] leading-[1.1]"
          >
            Struggling With Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-400 mt-2 inline-block pb-2">Study Abroad Documents?</span>
          </motion.h2>
        </div>

        {/* 3D Cylinder Container */}
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y" 
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
            <motion.div className="absolute w-[1px] h-[1px] top-1/2 left-1/2" style={{ transformStyle: 'preserve-3d', rotateY: rotation }}>
               {documents.map((doc, i) => (
                 <DocumentCard 
                   key={i} 
                   doc={doc} 
                   i={i} 
                   total={documents.length} 
                   rotation={rotation} 
                   counterRotation={counterRotation} 
                 />
               ))}
            </motion.div>
            
            {/* Cutout Element */}
            <img 
              src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1779030445/Untitled_4_pp3ukz.png" 
              alt="Cutout Overlay"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              style={{ transform: 'translateZ(1px)' }}
            />
        </motion.div>
        
        {/* Check Documents Button */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <button className="relative px-10 py-5 rounded-full group outline-none overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(37,99,235,0.2)] backdrop-blur-md hover:backdrop-blur-xl min-w-[280px] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
             
             {/* Glass reflection top highlight */}
             <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-full pointer-events-none"></div>
             
             {/* Subtle bottom blueish glow internally */}
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

             {/* Top border glow */}
             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
             {/* Bottom border glow */}
             <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
             
             {/* Shimmer effect */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-[shimmer_2.5s_infinite_ease-in-out]" />
             </div>

             {/* Text */}
             <span className="relative z-10 text-white/90 group-hover:text-white font-medium text-[20px] tracking-wide flex items-center justify-center gap-3 drop-shadow-md transition-colors">
               Check Documents
               <Sparkles className="w-5 h-5 text-blue-300 group-hover:text-blue-200 group-hover:animate-pulse transition-colors drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
             </span>
             
          </button>
        </motion.div>

        {/* Smooth Transition Gradient to Next Section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-40 pointer-events-none" />
      </motion.div>
    </section>
  );
}
