import { useState, useEffect, lazy, Suspense, type ReactNode } from "react";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import QuizSection from "./components/QuizSection";
import QuizFlow from "./components/QuizFlow";
import StickyPromoBar from "./components/StickyPromoBar";

// Route-only pages are code-split so the homepage ships only what it needs.
const DemoQuiz = lazy(() => import("./components/DemoQuiz"));
const CareersPage = lazy(() => import("./components/CareersPage"));
const FounderPage = lazy(() => import("./components/FounderPage"));
const DestinationsPage = lazy(() => import("./components/DestinationsPage"));
const StudentPortal = lazy(() => import("./components/StudentPortal"));
const PrivacyPolicyPage = lazy(() => import("./components/LegalPage").then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import("./components/LegalPage").then(m => ({ default: m.TermsPage })));

// Minimal fallback that matches the site background so route loads never flash.
const RouteFallback = () => <div className="min-h-screen bg-zinc-950" />;
const page = (node: ReactNode) => <Suspense fallback={<RouteFallback />}>{node}</Suspense>;

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // Tracked here so the sticky promo bar can be hidden while the quiz overlay is open.
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    const handleOpenQuiz = () => setIsQuizOpen(true);
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("mp:open-quiz", handleOpenQuiz);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("mp:open-quiz", handleOpenQuiz);
    };
  }, []);

  const navTo = (p: string) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (currentPath === "/demo-quiz") {
    return page(<DemoQuiz />);
  }

  // Quiz has its own link; the result lives on its own page (/quiz/result).
  if (currentPath === "/quiz") {
    return <QuizFlow onClose={() => navTo("/")} />;
  }

  if (currentPath === "/quiz/result") {
    return <QuizFlow mode="result" onClose={() => navTo("/")} />;
  }

  if (currentPath === "/careers") {
    return page(<CareersPage />);
  }

  if (currentPath === "/about") {
    return page(<FounderPage />);
  }

  if (currentPath === "/destinations") {
    return page(<DestinationsPage />);
  }

  if (currentPath === "/portal") {
    return page(<StudentPortal />);
  }

  if (currentPath === "/privacy") {
    return page(<PrivacyPolicyPage />);
  }

  if (currentPath === "/terms") {
    return page(<TermsPage />);
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
