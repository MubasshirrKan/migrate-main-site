/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import QuizSection from "./components/QuizSection";

export default function App() {
  return (
    <main className="bg-zinc-950 font-sans antialiased text-white selection:bg-[#F27D26] selection:text-white">
      <Hero />
      <StatsSection />
      <QuizSection />
    </main>
  );
}
