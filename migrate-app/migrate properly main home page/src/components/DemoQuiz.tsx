import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { questions, renderQuestionHighlight, AnalyzingUX, MatchPercentage, AlternativeChip, resolveQuestion, revealContent, alternativeDestinations, type Language } from "./QuizFlow";

export default function DemoQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Results & Transition Flow states
  const [isFinished, setIsFinished] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDestination, setShowDestination] = useState(false);
  const [revealStep, setRevealStep] = useState<"counting" | "completed">("counting");
  const [destinationCountry, setDestinationCountry] = useState("Canada");

  // Video scrubber logic matching QuizFlow
  useEffect(() => {
    let animationFrameId: number;

    const performUpdate = () => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration) || video.duration === 0 || isFinished) {
        animationFrameId = requestAnimationFrame(performUpdate);
        return;
      }

      const targetProgress = questions.length > 1 ? currentQuestion / (questions.length - 1) : 0;
      let targetTime = targetProgress * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));

      const currentTime = video.currentTime;
      const diff = targetTime - currentTime;

      if (diff > 0.05) {
        if (video.paused) {
          video.play().catch(() => {});
        }
        if (diff > 1.5) {
          video.playbackRate = 1.5;
        } else {
          video.playbackRate = 1.0;
        }
        if (video.currentTime >= targetTime - 0.05) {
          video.pause();
          video.currentTime = targetTime;
        }
      } else if (diff < -0.05) {
        if (!video.paused) video.pause();
        video.currentTime = currentTime + diff * 0.1;
      } else {
        if (!video.paused) video.pause();
      }

      animationFrameId = requestAnimationFrame(performUpdate);
    };

    animationFrameId = requestAnimationFrame(performUpdate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentQuestion, isFinished]);

  // Keep body overflow hidden like QuizFlow
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Smooth scroll container behavior on question change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentQuestion]);

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: prev[currentQuestion] === option ? "" : option, // Toggle selection
    }));
  };

  const handleNavigateHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleResetSandbox = () => {
    setIsFinished(false);
    setIsAnalyzing(false);
    setShowDestination(false);
    setRevealStep("counting");
    setCurrentQuestion(0);
    setSelectedOptions({});
  };

  const resolvedQuestion = resolveQuestion(questions[currentQuestion], language);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#030509] text-white overflow-hidden font-sans pt-24 md:pt-28">
      
      {/* Background Videos & Images Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* standard question matching video */}
        {!isFinished && (
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779632558/hf_20260524_130816_d0e147d9-4b3b-4dc2-a02f-0919a012d1af_tgqtup.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }}
          />
        )}

        {/* Transition video between final answer and Analyzing phase */}
        <AnimatePresence>
          {isFinished && !showDestination && (
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
        
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Top Header & Horizontal Tab Switched Bar (Only visible when not finished) */}
      {!isFinished && (
        <header className="absolute top-0 inset-x-0 z-50 bg-black/40 border-b border-white/5 backdrop-blur-xl">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse" />
                <span className="text-sm font-bold text-white tracking-widest uppercase font-mono">
                  Quiz Design Sandbox
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Language toggle */}
                <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                  {(["en", "bn"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                        language === lang ? "bg-blue-600 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {lang === "en" ? "EN" : "বাংলা"}
                    </button>
                  ))}
                </div>

                {/* Finish & Preview Button */}
                <button
                  onClick={() => setIsFinished(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-600/90 text-sm font-medium hover:bg-blue-600 hover:border-blue-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Finish & Preview Result
                </button>

                <button
                  onClick={handleNavigateHome}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/15 hover:border-white/20 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Exit Demo
                </button>
              </div>
            </div>

            {/* Scrollable Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 no-scrollbar">
              {questions.map((q, idx) => {
                const isActive = currentQuestion === idx;
                const hasSelection = !!selectedOptions[idx];
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs md:text-sm font-mono tracking-wider transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-blue-600 border-blue-500 text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        : hasSelection
                        ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40"
                        : "bg-white/5 border-white/5 text-white/50 hover:text-white/80 hover:bg-white/10"
                    }`}
                    title={q.question[language]}
                  >
                    Q{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </header>
      )}

      {/* Main Split Layout Preview / Analyzing / Result Page */}
      <div className="relative z-20 w-full h-full flex flex-col lg:flex-row overflow-hidden">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={`preview-${currentQuestion}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col lg:flex-row"
            >
              {/* LEFT HALF - Question Layout */}
              <div className="w-full lg:w-[45%] xl:w-1/2 p-8 pt-10 lg:pt-0 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative">
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full lg:w-1 lg:h-full bg-white/5">
                  <div
                    style={{
                      width: typeof window !== "undefined" && window.innerWidth >= 1024 ? "100%" : `${((currentQuestion) / questions.length) * 100}%`,
                      height: typeof window !== "undefined" && window.innerWidth >= 1024 ? `${((currentQuestion) / questions.length) * 100}%` : "100%",
                    }}
                    className="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] h-1 lg:h-auto lg:w-1 transition-all duration-300"
                  />
                </div>

                <div className="max-w-xl mx-auto lg:mx-0 w-full relative z-10">
                  <div className="flex flex-col gap-6 mb-8">
                    <div className="inline-flex items-center gap-3">
                      <span className="text-blue-400 font-mono text-sm tracking-widest">
                        {String(currentQuestion + 1).padStart(2, "0")}
                      </span>
                      <div className="w-12 h-[1px] bg-blue-500/30" />
                      <span className="text-white/40 font-mono text-sm tracking-widest">
                        {String(questions.length).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">
                      {resolvedQuestion.tagline}
                    </span>
                  </div>

                  <h2
                    className={`font-medium tracking-tight leading-[1.1] text-white ${
                      resolvedQuestion.question.length > 120
                        ? "text-2xl md:text-3xl lg:text-4xl"
                        : resolvedQuestion.question.length > 80
                        ? "text-3xl md:text-4xl lg:text-5xl"
                        : "text-3xl md:text-5xl lg:text-6xl"
                    }`}
                  >
                    {renderQuestionHighlight(resolvedQuestion.question)}
                  </h2>
                </div>
              </div>

              {/* RIGHT HALF - Option Buttons Preview */}
              <div
                ref={scrollContainerRef}
                className="w-full lg:w-[55%] xl:w-1/2 p-8 pb-32 lg:p-24 flex flex-col justify-center overflow-y-auto scrollbar-hide bg-gradient-to-l from-transparent to-white/[0.01]"
              >
                <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 w-full">
                  {resolvedQuestion.options.map((option, idx) => {
                    const letters = ["A", "B", "C", "D", "E", "F"];
                    const isSelected = selectedOptions[currentQuestion] === option;
                    return (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(option)}
                        className={`group relative border p-4 py-5 md:p-8 rounded-xl lg:rounded-2xl flex items-center lg:items-center gap-4 md:gap-6 text-left transition-all duration-300 backdrop-blur-xl lg:backdrop-blur-md shadow-xl lg:shadow-none overflow-hidden cursor-pointer ${
                          isSelected
                            ? "border-blue-500/80 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            : "border-white/10 bg-[#0a0f1c]/90 lg:bg-black/40 hover:bg-black/60 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <div
                          className={`flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 mt-0 rounded-full border flex items-center justify-center transition-all duration-300 font-medium text-sm md:text-base relative z-10 ${
                            isSelected
                              ? "border-blue-400 bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                              : "border-white/20 bg-black/60 lg:bg-transparent group-hover:border-blue-400 group-hover:bg-blue-500/20 text-white/50 group-hover:text-blue-300"
                          }`}
                        >
                          {letters[idx]}
                        </div>

                        <span
                          className={`text-sm md:text-xl font-light transition-all duration-300 flex-1 leading-snug relative z-10 ${
                            isSelected ? "text-white font-normal" : "text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                          }`}
                        >
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
              <AnalyzingUX language={language} onComplete={() => {
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
                
                {/* Background layout details matching QuizFlow */}
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

                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto pt-10 pb-24">
                  <AnimatePresence mode="wait">
                    {revealStep === "counting" ? (
                      <motion.div
                        key="counting"
                        className="flex flex-col items-center justify-center min-h-[60vh] w-full"
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                      >
                        <MatchPercentage
                          language={language}
                          onComplete={() => setRevealStep("completed")}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full flex flex-col items-center"
                      >
                        <span className="text-white/50 uppercase tracking-[0.3em] text-xs md:text-sm font-light mb-4">
                          {revealContent[language].destinationLabel}
                        </span>
                        <div
                          className="flex flex-col items-center justify-center mb-16"
                          style={{ perspective: 1000 }}
                        >
                          <motion.h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7.5rem] font-black tracking-tighter flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 mb-2 pb-2 leading-[1.1] text-center px-4">
                            {destinationCountry.split(" ").map((word, wordIndex) => (
                              <span key={wordIndex} className="inline-block whitespace-nowrap">
                                {word.split("").map((char, index) => (
                                  <motion.span
                                    key={`${wordIndex}-${index}`}
                                    initial={{ opacity: 0, y: 80, scale: 0.8, filter: "blur(20px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    transition={{
                                      duration: 1.2,
                                      delay: (wordIndex * 5 + index) * 0.08,
                                      type: "spring",
                                      damping: 12,
                                      stiffness: 150
                                    }}
                                    className="text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-500 drop-shadow-[0_0_45px_rgba(59,130,246,0.9)] inline-block"
                                  >
                                    {char}
                                  </motion.span>
                                ))}
                              </span>
                            ))}
                          </motion.h2>

                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                            className="flex items-center justify-center gap-2 md:gap-3 bg-emerald-500/20 border-2 border-emerald-500/50 px-6 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-md shadow-[0_0_50px_rgba(52,211,153,0.4)] max-w-[90vw]"
                          >
                            <svg className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 font-black tracking-[0.1em] uppercase text-xl sm:text-2xl md:text-3xl drop-shadow-md text-center">
                              {revealContent[language].matchFound}
                            </span>
                          </motion.div>

                          {/* Other Matches */}
                          <div className="flex flex-col items-center gap-2 mt-8">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.3, duration: 0.6 }}
                              className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                            >
                              {revealContent[language].alternativesLabel}
                            </motion.div>
                            <div className="flex flex-wrap justify-center gap-3">
                              {alternativeDestinations.map((country, idx) => (
                                <span key={idx}>
                                  <AlternativeChip
                                    flag={country.flag}
                                    name={country.name}
                                    percent={country.percent}
                                    index={idx}
                                  />
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Custom blurred content section */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full relative"
                        >
                          <div className="text-left mb-6 flex items-center justify-between px-2">
                            <div>
                              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">{revealContent[language].roadmapTitle}</h3>
                              <p className="text-white/50 text-sm">{revealContent[language].roadmapSubtitle}</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-blue-400/80 text-sm font-medium">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                              </span>
                              {revealContent[language].liveResults}
                            </div>
                          </div>

                          <div className="relative rounded-[2rem] border border-white/10 bg-[#060B1A]/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">

                            {/* ── SECTION 1: Why {country} — VISIBLE ── */}
                            <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-white/5 bg-white/[0.02]">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                  <span className="text-xl">✨</span>
                                </div>
                                <h4 className="text-lg md:text-xl font-medium text-white text-left">
                                  {revealContent[language].whyTitle.replace("{country}", destinationCountry)}
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                {revealContent[language].reasons.map((reason, idx) => (
                                  <div key={idx} className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                      <h5 className="text-white font-medium text-sm">{reason.title}</h5>
                                      <p className="text-white/60 text-xs mt-1">{reason.desc.replace(/\{country\}/g, destinationCountry)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ── SECTION 2: Top University Matches — header visible, content locked ── */}
                            <div className="border-b border-white/5">
                              {/* Header — clear, same style as Why section */}
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25 shrink-0">
                                  <span className="text-xl">🎓</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].topMatchesTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                                    {revealContent[language].topMatchesBadge}
                                  </span>
                                </div>
                              </div>
                              {/* Content — blurred & locked */}
                              <div className="px-6 md:px-8 pb-6 flex flex-col gap-3 blur-[3px] opacity-60 select-none pointer-events-none">
                                {[
                                  { pct: "94%", tag: "Best Match" },
                                  { pct: "88%", tag: "Strong Fit" },
                                  { pct: "81%", tag: "Good Fit" },
                                  { pct: "76%", tag: "Possible" },
                                ].map((u, i) => (
                                  <div key={i} className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl border border-white/5">
                                    <div className="w-9 h-9 rounded-lg bg-white/10 shrink-0" />
                                    <div className="flex-1">
                                      <div className="h-3.5 w-36 bg-white/25 rounded mb-1.5" />
                                      <div className="h-2.5 w-24 bg-white/10 rounded" />
                                    </div>
                                    <span className="text-emerald-400 font-bold text-sm shrink-0">{u.pct}</span>
                                    <span className="text-[10px] text-emerald-400/70 font-medium shrink-0 hidden md:block">{u.tag}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ── SECTION 3: Scholarship Opportunities — header visible, content locked ── */}
                            <div className="border-b border-white/5">
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center border border-amber-500/25 shrink-0">
                                  <span className="text-xl">💰</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].scholarshipsTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold">
                                    {revealContent[language].scholarshipsBadge}
                                  </span>
                                </div>
                              </div>
                              <div className="px-6 md:px-8 pb-6 flex flex-col gap-3 blur-[4px] opacity-50 select-none pointer-events-none">
                                {revealContent[language].scholarshipItems.map((item, i) => (
                                  <div key={i} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/20 shrink-0" />
                                    <div className="flex-1">
                                      <div className="h-3 w-40 bg-white/20 rounded mb-1.5" />
                                      <div className="h-2.5 w-28 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-5 w-14 bg-amber-400/20 rounded-full" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ── SECTION 4: Visa Route & Timeline — header visible, content locked ── */}
                            <div className="border-b border-white/5">
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/25 shrink-0">
                                  <span className="text-xl">🛂</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].visaTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">
                                    {revealContent[language].visaBadge}
                                  </span>
                                </div>
                              </div>
                              <div className="px-6 md:px-8 pb-6 blur-[4px] opacity-45 select-none pointer-events-none">
                                <div className="flex flex-col gap-2.5">
                                  {revealContent[language].visaSteps.map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                      <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                                        <span className="text-blue-300 text-xs font-bold">{i + 1}</span>
                                      </div>
                                      <div className="flex-1 h-3 bg-white/15 rounded" style={{ width: `${80 - i * 10}%` }} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* ── SECTION 5: Application Action Plan — header visible, content locked ── */}
                            <div>
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center border border-purple-500/25 shrink-0">
                                  <span className="text-xl">📋</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].applicationTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold">
                                    {revealContent[language].applicationBadge}
                                  </span>
                                </div>
                              </div>
                              <div className="px-6 md:px-8 pb-6 blur-[5px] opacity-35 select-none pointer-events-none">
                                <div className="flex flex-col gap-2.5">
                                  {revealContent[language].applicationItems.map((_, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                                      <div className="w-4 h-4 rounded border border-purple-400/40 mt-0.5 shrink-0" />
                                      <div className="flex-1 h-3 bg-white/15 rounded" style={{ width: `${70 - i * 8}%` }} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* ── Overlay gradient + Lock CTA ── */}
                            <div className="absolute bottom-0 left-0 right-0 h-[72%] bg-gradient-to-t from-[#060B1A] via-[#060B1A]/85 to-transparent flex flex-col items-center justify-end pb-10 px-6">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 2, ease: "backOut" }}
                                className="w-16 h-16 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
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
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">{revealContent[language].unlockTitle}</h4>
                                <p className="text-white/60 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">{revealContent[language].unlockDesc}</p>
                                                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                  <button onClick={handleResetSandbox} className="group relative overflow-hidden bg-white/10 border border-white/20 text-white w-full sm:w-auto px-8 py-4 rounded-full font-bold uppercase tracking-[0.1em] text-sm hover:bg-white/25 hover:border-white/30 transition-all shrink-0 cursor-pointer">
                                    Restart Demo Sandbox
                                  </button>
                                  <button onClick={handleNavigateHome} className="group relative overflow-hidden bg-blue-600 text-white w-full sm:w-auto px-8 py-4 rounded-full font-bold uppercase tracking-[0.1em] text-sm hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all shrink-0 cursor-pointer">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                      Exit Sandbox
                                      <svg className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div key="waiting" className="w-full h-full pointer-events-none" exit={{ opacity: 0 }} />
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
