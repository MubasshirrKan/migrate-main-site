import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function StickyPromoBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY >= window.innerHeight * 0.45);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[200] bg-zinc-950/85 backdrop-blur-2xl border-b border-white/10"
        >
          <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-3">
            {/* Left: Logo + Brand */}
            <div className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png"
                alt="Migrate Properly Logo"
                className="w-8 h-8 object-contain drop-shadow-lg"
              />
              <span className="hidden sm:block font-sans font-bold text-white tracking-widest uppercase text-sm">
                Migrate<span className="font-light">Properly</span>
              </span>
            </div>

            {/* Center: Promo text */}
            <p className="font-sans text-xs sm:text-sm text-white/70 tracking-wide">
              Take the Free Quiz &amp;{" "}
              <span className="text-white font-semibold">Unlock 50% Off</span>
            </p>

            {/* Right: CTA */}
            <button
              onClick={() => { window.history.pushState({}, "", "/quiz"); window.dispatchEvent(new PopStateEvent("popstate")); }}
              className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md font-sans text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span className="overseas-glow" style={{ fontStyle: "normal" }}>
                Play Now
              </span>
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
