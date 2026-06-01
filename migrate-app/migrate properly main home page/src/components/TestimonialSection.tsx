import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ArrowRight, ArrowLeft } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Master's Student, UK",
    content: "MigrateProperly turned a deeply stressful visa process into a seamless journey. Their AI matched my profile perfectly and I had my SOP ready in hours, not weeks.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    color: "from-blue-500/20 to-indigo-500/0"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Undergrad, Canada",
    content: "I was overwhelmed by the endless paperwork and conflicting advice. The intelligent workflow guided me step-by-step. Now I'm living my dream in Toronto.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=david",
    color: "from-emerald-500/20 to-teal-500/0"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "PhD Candidate, Germany",
    content: "The level of precision in their document checking saved me from a rejection. It caught a minor discrepancy I would never have noticed on my own.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=elena",
    color: "from-orange-500/20 to-red-500/0"
  },
  {
    id: 4,
    name: "Aisha Patel",
    role: "MBA Student, USA",
    content: "A truly professional, transparent, and intelligent platform. I felt supported by top-tier experts every step of the way without paying exorbitant agency fees.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=aisha",
    color: "from-purple-500/20 to-pink-500/0"
  },
  {
    id: 5,
    name: "Michael Osei",
    role: "MSc Engineering, Australia",
    content: "An absolute game-changer. I secured a 50% scholarship thanks to the unique profile-building assistance. The platform is responsive, fast, and highly accurate.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael",
    color: "from-cyan-500/20 to-blue-500/0"
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCardProps = (index: number) => {
    const total = testimonials.length;
    let diff = index - currentIndex;
    
    // Normalize diff to -total/2 to total/2
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    const isCenter = diff === 0;
    const isHidden = Math.abs(diff) > 1;

    const isMobile = windowWidth < 768;
    const xBase = isMobile ? 260 : 400; 
    
    let x = diff * xBase; 
    let z = Math.abs(diff) * -200;
    let rotateY = diff * -25;
    let scale = isCenter ? 1 : (isMobile ? 0.9 : 0.85);
    let opacity = isHidden ? 0 : (isCenter ? 1 : 0.3);
    let filter = isHidden ? "blur(10px)" : (isCenter ? "blur(0px)" : "blur(4px)");
    let zIndex = 100 - Math.abs(diff) * 10;

    return { 
      x, 
      z, 
      rotateY, 
      scale, 
      opacity, 
      zIndex,
      filter,
      pointerEvents: isHidden ? "none" as const : "auto" as const 
    };
  };

  return (
    <section className="relative w-full py-32 overflow-hidden bg-[#020202]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/10 via-emerald-900/10 to-purple-900/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] tracking-[0.3em] uppercase font-bold mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)_inset]">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
            Trusted by Ambitious <br className="hidden md:block"/>
            <span className="overseas-glow font-serif italic font-light pr-2">
              Global Students
            </span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            See how our company has turned the complex journey of studying abroad into a streamlined, confident experience.
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div 
          className="relative w-full mx-auto h-[480px] md:h-[450px] flex justify-center items-center"
          style={{ perspective: "2000px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative w-full max-w-5xl h-full flex justify-center items-center" style={{ transformStyle: "preserve-3d" }}>
            {testimonials.map((testimonial, index) => {
              const props = getCardProps(index);
              
              return (
                <motion.div
                  key={testimonial.id}
                  animate={{
                    x: props.x,
                    z: props.z,
                    rotateY: props.rotateY,
                    scale: props.scale,
                    opacity: props.opacity,
                    filter: props.filter,
                    zIndex: props.zIndex
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute w-[90%] max-w-[500px]"
                  style={{ 
                    pointerEvents: props.pointerEvents,
                    transformStyle: "preserve-3d" 
                  }}
                  onClick={() => {
                    if (props.x !== 0) {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }
                  }}
                >
                  <div className={`relative w-full bg-zinc-950/90 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.02)_inset] overflow-hidden group ${props.x !== 0 ? 'cursor-pointer' : ''}`}>
                    {/* Dynamic Gradient Background based on testimonial color */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-30 transition-opacity duration-1000 group-hover:opacity-50 pointer-events-none`} />
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                      <Quote className="w-20 h-20 text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                      <div>
                        <div className="flex gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                          ))}
                        </div>
                        <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 p-1 shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full animate-spin-slow opacity-50" />
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="relative z-10 w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-base">{testimonial.name}</h4>
                          <p className="text-white/40 text-xs tracking-wide">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-12 z-50 pointer-events-none">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:-translate-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:translate-x-2"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8 relative z-50">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setIsAutoPlaying(false);
              }}
              className="relative py-2 px-1 focus:outline-none"
            >
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  i === currentIndex ? "w-8 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
