import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";

type QuestionType = {
  id: number;
  tagline: string;
  question: string;
  options: string[];
  condition?: (answers: Record<number, string>) => boolean;
};

const questions: QuestionType[] = [
  {
    id: 1,
    tagline: "Q1 — Language comfort",
    question: "Before we start — which language feels **more comfortable** for you to chat in?",
    options: ["English", "Bangla", "Mix both — I'll switch when I need to"]
  },
  {
    id: 2,
    tagline: "Q2 — Study level",
    question: "What are you planning to **study abroad** for?",
    options: ["Bachelor's degree — my first degree", "Master's degree", "Still deciding between the two"]
  },
  {
    id: 3,
    tagline: "Q3 — Personal ties for the move",
    question: "Master's plans often come at a stage of life with more personal ties. When you picture **settling into a new country**, which of these feels closest to **your own situation**?",
    options: ["Someone close to me would share this move", "I'd be making this move on my own", "It isn't fully settled yet"],
    condition: (answers) => answers[2] === "Master's degree"
  },
  {
    id: 4,
    tagline: "Q4 — Yearly budget",
    question: "Roughly how much can your family arrange for **one full year** abroad — tuition and living costs together?",
    options: ["~200K–1.1M BDT", "~1.1M–2.1M BDT", "~2.1M–3.5M BDT", "~3.5M–5.7M BDT", "~5.7M BDT+", "I'm not sure yet"]
  },
  {
    id: 5,
    tagline: "Q5 — Tuition mindset",
    question: "When you think about **tuition fees**, which sentence sounds most like you?",
    options: ["tuition as close to free as possible", "moderate fee if the country is worth it", "quality matters more than the price tag"]
  },
  {
    id: 6,
    tagline: "Q6 — Everyday living cost",
    question: "Picture your **daily life** abroad — rent, food, transport. What suits you best?",
    options: ["happy to share a room and cook at home", "a simple, comfortable life is enough", "want my own space and an easy lifestyle"]
  },
  {
    id: 7,
    tagline: "Q7 — Weather",
    question: "Bangladesh is warm most of the year. How do you feel about **cold, snowy winters**?",
    options: ["I'd love it", "I can manage with a good jacket", "I'd rather have mild weather", "I really don't want long, harsh winters"]
  },
  {
    id: 8,
    tagline: "Q8 — Language of study and daily life",
    question: "Studying in English is easy for you. But would you be okay living in a country where the local language **isn't English**?",
    options: ["prefer English everywhere", "English classes a must, local language fine", "no problem at all"]
  },
  {
    id: 9,
    tagline: "Q9 — IELTS exam status",
    question: "Have you taken the **IELTS exam** yet? It tells us how ready your application is and which universities are already within reach.",
    options: ["Yes — I have my result", "I haven't taken it yet"]
  },
  {
    id: 10,
    tagline: "Q10 — IELTS band score",
    question: "Great — what **overall band score** did you receive?",
    options: ["Band 7.0 or above", "Band 6.0–6.5", "Band 5.0–5.5", "Below Band 5.0"],
    condition: (answers) => answers[9] === "Yes — I have my result"
  },
  {
    id: 11,
    tagline: "Q11 — IELTS test plan",
    question: "No problem — when are you **planning to take** the IELTS?",
    options: ["Within the next 3 months", "In about 3 to 6 months", "Later than 6 months from now", "I'm not sure yet"],
    condition: (answers) => answers[9] === "I haven't taken it yet"
  },
  {
    id: 12,
    tagline: "Q12 — Work while studying",
    question: "Many students **work part-time** to support themselves. How important is that for you?",
    options: ["Very important", "Helpful, but not something I depend on", "Not important"]
  },
  {
    id: 13,
    tagline: "Q13 — Staying long-term",
    question: "**After your degree**, what feels right to you?",
    options: ["settle there and build a life (PR/long-term)", "stay if good chances come, otherwise return", "plan to come back to Bangladesh"]
  },
  {
    id: 14,
    tagline: "Q14 — University reputation",
    question: "Two real options: a **world-famous university**, or a **lesser-known one that costs much less**. Which pulls you more?",
    options: ["the famous name", "somewhere in between", "the affordable one"]
  },
  {
    id: 15,
    tagline: "Q15 — Bangladeshi community",
    question: "When you land, would you like to have **other Bangladeshis** around you?",
    options: ["Yes — a familiar community", "a few would be nice", "I'd prefer a fresh, totally new crowd"]
  },
  {
    id: 16,
    tagline: "Q16 — Learning a new language (scenario)",
    question: "Picture two routes to the same career goal. Route A is in an **English-speaking country** and costs noticeably more. Route B **costs far less and has good job prospects** — but for your first year you'd be **learning the local language** alongside your studies. Which would you choose?",
    options: ["Route B", "It depends", "Route A"]
  },
  {
    id: 17,
    tagline: "Q17 — Comfort zone vs. risk (personality)",
    question: "Imagine you are choosing where to study abroad. On one side, countries like the USA — **more popular, familiar**, clearer career path, but **more expensive and competitive**. On the other, countries where **tuition may be much lower** but the career path is **more underrated**. Which feels closer to what you'd consider?",
    options: ["familiar country with clearer path", "good balance", "less obvious country if tuition is low"]
  },
  {
    id: 18,
    tagline: "Q18 — A cold country with the best prospects (scenario)",
    question: "Imagine the country that offers you the **strongest job and PR prospects** also happens to have **severe weather** (intense cold/warm). Knowing your future could be noticeably brighter there, what would you decide?",
    options: ["I'd go", "I'd think carefully", "I'd pass"]
  },
  {
    id: 19,
    tagline: "Q19 — Lifestyle and surroundings",
    question: "**Outside class**, what kind of place would make you happiest?",
    options: ["a big, busy city", "a calm, mid-sized town", "doesn't matter much"]
  },
  {
    id: 20,
    tagline: "Q20 — Long-term goal",
    question: "**Think 5–10 years ahead**. What does success look like for you?",
    options: ["a strong career and life abroad", "international experience then a career back in Bangladesh", "a globally respected degree", "still figuring this out"]
  },
  {
    id: 21,
    tagline: "Q21 — The deciding factor (tie-breaker)",
    question: "Last one! If you could keep only **ONE thing** as your top priority, what would it be?",
    options: ["lowest possible cost", "a top, well-known university", "the best job and PR chances", "the richest new experience and culture"]
  }
];

const analyzingTexts = [
  "Synthesizing profile data...",
  "Evaluating academic pathways...",
  "Mapping global opportunities...",
  "Calculating visa viability...",
  "Finalizing ideal destination..."
];

function AnalyzingUX({ onComplete }: { onComplete: () => void }) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % analyzingTexts.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      key="analyzing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-black overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        playsInline
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
      >
        <source src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779695034/robotreduce_saturatioin_uuoexz.mp4" type="video/mp4" />
      </video>
      
      {/* Subtle concentric rings focused over video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-white/5 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vh] h-[85vh] rounded-full border border-white/5 z-0" />

      {/* Main Central Layout */}
      <div className="relative w-[340px] md:w-[420px] aspect-square flex items-center justify-center z-10">

        {/* The rotating gradient rings with arrows representing the loop */}
        <motion.div 
          className="absolute inset-0 z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <defs>
              <linearGradient id="gradTop" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradBottom" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Top Arc -> Right Arrow */}
            <path d="M 30 100 A 70 70 0 0 1 170 100" stroke="url(#gradTop)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 152 82 L 170 100 L 188 82" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

            {/* Bottom Arc -> Left Arrow */}
            <path d="M 170 100 A 70 70 0 0 1 30 100" stroke="url(#gradBottom)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 12 118 L 30 100 L 48 118" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Center Text Area */}
        <div className="absolute z-30 flex flex-col items-center justify-center w-[200px] bg-[#020e26]/60 backdrop-blur-md p-6 rounded-full aspect-square shadow-[0_0_40px_rgba(0,10,30,0.8)] border border-white/5">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight pt-2">
            Analyzing
            <br />
            Profile
          </h2>
          <div className="h-4 mt-2 overflow-hidden w-full relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute text-blue-300 text-[10px] md:text-xs font-semibold tracking-wider uppercase text-center"
              >
                {analyzingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Concept Badges */}
        <motion.div 
          className="absolute left-[-15%] top-[10%] z-40"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-5 py-2 md:py-2.5 rounded-lg border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <span className="text-white text-sm md:text-base font-semibold tracking-wide drop-shadow-md">Costs</span>
          </div>
        </motion.div>

        <motion.div 
          className="absolute right-[-15%] bottom-[15%] z-40"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] px-5 py-2 md:py-2.5 rounded-lg border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <span className="text-white text-sm md:text-base font-semibold tracking-wide drop-shadow-md">Academics</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[-10%] left-[20%] z-40"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
           <div className="w-10 h-10 bg-[#091a42] rounded-full border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
             <div className="w-3 h-3 bg-blue-400 shadow-[0_0_10px_#60a5fa] rounded-sm" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
           </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
}

const renderQuestionHighlight = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] font-semibold">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={index} className="text-white">{part}</span>;
  });
};

export default function QuizFlow({ onClose }: { onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [history, setHistory] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDestination, setShowDestination] = useState(false);
  const [destinationCountry, setDestinationCountry] = useState("Canada");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // We removed the timeout logic, so this array relies solely on the callback from onEnded
  useEffect(() => {
    // Only cleanup frame loop if necessary
  }, [isAnalyzing]);

  useEffect(() => {
    let animationFrameId: number;

    const performUpdate = () => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration) || video.duration === 0) {
        animationFrameId = requestAnimationFrame(performUpdate);
        return;
      }

      const targetProgress = isFinished ? 1 : (questions.length > 1 ? currentQuestion / (questions.length - 1) : 0);
      let targetTime = targetProgress * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      
      const currentTime = video.currentTime;
      const diff = targetTime - currentTime;
      
      if (diff > 0.05) {
        // Play forward native for smooth transition
        if (video.paused) {
          video.play().catch(() => {});
        }
        
        // Speed up if trailing far behind
        if (diff > 1.5) {
          video.playbackRate = 1.5;
        } else {
          video.playbackRate = 1.0;
        }
        
        // Safety lock, don't overshoot target
        if (video.currentTime >= targetTime - 0.05) {
          video.pause();
          video.currentTime = targetTime;
        }
      } else if (diff < -0.05) {
        // Scrub back gracefully
        if (!video.paused) video.pause();
        video.currentTime = currentTime + diff * 0.1;
      } else {
        // Snapped
        if (!video.paused) video.pause();
      }

      animationFrameId = requestAnimationFrame(performUpdate);
    };

    animationFrameId = requestAnimationFrame(performUpdate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentQuestion, isFinished]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestion]);

  const handleOptionClick = (option: string) => {
    const questionId = questions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    setHistory([...history, currentQuestion]);

    let nextQ = currentQuestion + 1;
    
    // Find the next question that condition satisfies
    while (nextQ < questions.length) {
      if (questions[nextQ].condition) {
        if (questions[nextQ].condition!(newAnswers)) {
          break;
        } else {
          // skip this question
          nextQ++;
        }
      } else {
        break;
      }
    }

    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevQuestion = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQuestion(prevQuestion);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex bg-[#030509] text-white overflow-hidden font-sans"
    >
      {/* Background Video Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.video
          ref={videoRef}
          src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779632558/hf_20260524_130816_d0e147d9-4b3b-4dc2-a02f-0919a012d1af_tgqtup.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          animate={{ opacity: isFinished ? 0 : 1 }}
          transition={{ duration: 1.5 }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }}
        />

        <AnimatePresence>
          {isFinished && (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779642013/migrateproperly_eee40w.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={() => setIsAnalyzing(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Top Nav Elements */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-medium text-white/70 tracking-widest uppercase">Assess & Match</span>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 flex items-center gap-4">
        {history.length > 0 && !isFinished && (
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        <button 
          onClick={onClose} 
          className="w-10 h-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Split Content Area */}
      <div className="relative z-20 w-full h-full flex flex-col lg:flex-row">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full flex flex-col lg:flex-row"
            >
              {/* LEFT HALF - Question */}
              <div className="w-full lg:w-[45%] xl:w-1/2 p-8 pt-28 md:p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative">
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full lg:w-1 lg:h-full bg-white/5">
                  <motion.div 
                    initial={{ width: "0%", height: "0%" }}
                    animate={{ 
                      width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "100%" : `${((currentQuestion) / questions.length) * 100}%`,
                      height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${((currentQuestion) / questions.length) * 100}%` : "100%" 
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] h-1 lg:h-auto lg:w-1"
                  />
                </div>

                <div className="max-w-xl mx-auto lg:mx-0 w-full relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-6 mb-8"
                  >
                    <div className="inline-flex items-center gap-3">
                      <span className="text-blue-400 font-mono text-sm tracking-widest">{String(currentQuestion + 1).padStart(2, '0')}</span>
                      <div className="w-12 h-[1px] bg-blue-500/30" />
                      <span className="text-white/40 font-mono text-sm tracking-widest">{String(questions.length).padStart(2, '0')}</span>
                    </div>
                    
                    <span className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">
                      {questions[currentQuestion].tagline}
                    </span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-medium tracking-tight leading-[1.1] ${
                      questions[currentQuestion].question.length > 120 ? "text-2xl md:text-3xl lg:text-4xl" :
                      questions[currentQuestion].question.length > 80 ? "text-3xl md:text-4xl lg:text-5xl" :
                      "text-3xl md:text-5xl lg:text-6xl"
                    }`}
                  >
                    {renderQuestionHighlight(questions[currentQuestion].question)}
                  </motion.h2>
                </div>
              </div>

              {/* RIGHT HALF - Options */}
              <div 
                ref={scrollContainerRef}
                className="w-full lg:w-[55%] xl:w-1/2 p-8 pb-32 md:p-16 lg:p-24 flex flex-col justify-center overflow-y-auto scrollbar-hide bg-gradient-to-l from-transparent to-white/[0.01]"
              >
                <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 w-full">
                  {questions[currentQuestion].options.map((option, idx) => {
                    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                    return (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.4 + idx * 0.1, 
                          duration: 0.6, 
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(option)}
                        className="group relative border border-white/10 bg-black/40 p-6 md:p-8 rounded-2xl flex items-start lg:items-center gap-6 text-left transition-all duration-300 backdrop-blur-md hover:bg-black/60 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                        
                        <div className="flex-shrink-0 w-10 h-10 mt-1 lg:mt-0 rounded-full border border-white/20 group-hover:border-blue-400 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors duration-300 text-white/50 group-hover:text-blue-300 font-medium text-sm md:text-base relative z-10">
                          {letters[idx]}
                        </div>

                        <span className="text-lg md:text-xl font-light text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 flex-1 leading-snug relative z-10">
                          {option}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            isAnalyzing ? (
              <AnalyzingUX key="analyzing" onComplete={() => {
                setIsAnalyzing(false);
                setShowDestination(true);
              }} />
            ) : showDestination ? (
              <motion.div 
                key="destination"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-start p-6 md:p-12 text-center bg-[#02040a] overflow-y-auto overflow-x-hidden no-scrollbar"
              >
                <div className="fixed inset-0 pointer-events-none">
                  <img 
                    src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1779722888/hf_20260525_152410_d9d195a6-7e6b-4f28-bd0d-5dd71701b3c4_ilupfc.png" 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  {/* Atmospheric Grid */}
                  <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }} />
                  {/* Glowing core */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center z-10 w-full max-w-4xl mt-10 md:mt-20 shrink-0 pb-20"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col items-center gap-4 mb-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-blue-300 font-bold tracking-[0.1em] text-xs md:text-sm uppercase drop-shadow-md">89% Match Found</span>
                    </div>
                  </motion.div>
                  
                  <span className="text-white/50 uppercase tracking-[0.3em] text-xs md:text-sm font-light mb-2">Your Ideal Destination is</span>
                  <div className="flex justify-center mt-2 mb-12 perspective-[1000px]">
                    <motion.h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter flex">
                      {destinationCountry.split('').map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.8, filter: 'blur(20px)' }}
                          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                          transition={{ 
                            duration: 1.2, 
                            delay: 1.2 + (index * 0.08), 
                            type: "spring", 
                            damping: 12, 
                            stiffness: 150 
                          }}
                          className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-300 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </motion.h2>
                  </div>
                  
                  {/* Custom blurred content section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full relative"
                  >
                    <div className="text-left mb-6 flex items-center justify-between px-2">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">Top University Matches</h3>
                        <p className="text-white/50 text-sm">Tailored to your budget, academics & goals</p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-blue-400/80 text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Live Results
                      </div>
                    </div>

                    <div className="relative rounded-[2rem] border border-white/10 bg-[#060B1A]/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">
                      {/* 1st Result (Visible) */}
                      <div className="p-6 md:p-8 flex items-start gap-4 md:gap-6 border-b border-white/5 bg-white/[0.02]">
                         <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 flex items-center justify-center border border-blue-500/20 shrink-0">
                           <span className="text-2xl">🎓</span>
                         </div>
                         <div className="flex-1 text-left">
                           <div className="flex flex-wrap items-center gap-3 mb-2">
                             <h4 className="text-lg md:text-xl font-medium text-white">Top Tier University</h4>
                             <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">92% Match</span>
                           </div>
                           <p className="text-white/60 text-sm mb-4 leading-relaxed">Perfect alignment with your budget and post-study work visa goals in {destinationCountry}.</p>
                           <div className="flex flex-wrap gap-2">
                             <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs font-medium border border-white/5">High PR Success</span>
                             <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs font-medium border border-white/5">Strong ROI</span>
                           </div>
                         </div>
                      </div>

                      {/* 2nd Result (Semi-blurred) */}
                      <div className="p-6 md:p-8 flex items-start gap-4 md:gap-6 border-b border-white/5 bg-white/[0.01] opacity-70 blur-[3px] select-none pointer-events-none">
                         <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0"></div>
                         <div className="flex-1 text-left">
                           <div className="flex flex-wrap items-center gap-3 mb-3">
                             <div className="h-6 w-48 bg-white/20 rounded-md"></div>
                             <div className="h-5 w-20 bg-white/20 rounded-md"></div>
                           </div>
                           <div className="h-4 w-3/4 bg-white/10 rounded-md mb-2"></div>
                           <div className="h-4 w-1/2 bg-white/10 rounded-md mb-4"></div>
                         </div>
                      </div>

                      {/* 3rd Result (Fully blurred) */}
                      <div className="p-6 md:p-8 flex items-start gap-4 md:gap-6 opacity-30 blur-[6px] select-none pointer-events-none">
                         <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 shrink-0"></div>
                         <div className="flex-1 text-left">
                           <div className="h-6 w-56 bg-white/20 rounded-md mb-4"></div>
                           <div className="h-4 w-2/3 bg-white/10 rounded-md mb-3"></div>
                           <div className="h-4 w-1/2 bg-white/10 rounded-md"></div>
                         </div>
                      </div>

                      {/* Overlay Lock / CTA */}
                      <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-gradient-to-t from-[#060B1A] via-[#060B1A]/95 to-transparent flex flex-col items-center justify-end pb-12 px-6">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 2, ease: "backOut" }}
                          className="w-16 h-16 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                        >
                          <svg className="w-7 h-7 text-blue-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </motion.div>
                        <motion.div
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ duration: 0.8, delay: 2.2 }}
                           className="text-center"
                        >
                          <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">Unlock Your Full Roadmap</h4>
                          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                            Get immediate access to your personalized university list, hidden scholarship opportunities, and a step-by-step visa strategy.
                          </p>
                          
                          <button onClick={onClose} className="group relative overflow-hidden bg-blue-600 text-white w-full sm:w-auto px-8 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.1em] text-sm hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all shrink-0">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              Unlock Masterclass & Insights
                              <svg className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="waiting" className="w-full h-full pointer-events-none" exit={{ opacity: 0 }} />
            )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
