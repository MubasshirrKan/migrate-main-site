import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import QuizSection from "./components/QuizSection";
import StickyPromoBar from "./components/StickyPromoBar";
import DemoQuiz from "./components/DemoQuiz";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // Tracked here so the sticky promo bar can be hidden while the quiz overlay is open.
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  if (currentPath === "/demo-quiz") {
    return <DemoQuiz />;
  }

  return (
    <main className="bg-zinc-950 font-sans antialiased text-white selection:bg-[#F27D26] selection:text-white">
      {!isQuizOpen && <StickyPromoBar />}
      <Hero />
      <StatsSection />
      <QuizSection isQuizOpen={isQuizOpen} setIsQuizOpen={setIsQuizOpen} />
    </main>
  );
}
