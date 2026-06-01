import React from "react";
import { motion } from "motion/react";

// 31 destinations (order per spec). ISO 3166-1 alpha-2 codes drive the flag SVGs
// (served from flagcdn.com). Real dedicated flag icons — no emoji.
const COUNTRIES: { code: string; name: string }[] = [
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "nz", name: "New Zealand" },
  { code: "se", name: "Sweden" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "it", name: "Italy" },
  { code: "nl", name: "Netherlands" },
  { code: "dk", name: "Denmark" },
  { code: "no", name: "Norway" },
  { code: "fi", name: "Finland" },
  { code: "ie", name: "Ireland" },
  { code: "pl", name: "Poland" },
  { code: "pt", name: "Portugal" },
  { code: "ro", name: "Romania" },
  { code: "hu", name: "Hungary" },
  { code: "mt", name: "Malta" },
  { code: "es", name: "Spain" },
  { code: "at", name: "Austria" },
  { code: "be", name: "Belgium" },
  { code: "cz", name: "Czech Republic" },
  { code: "sk", name: "Slovakia" },
  { code: "lt", name: "Lithuania" },
  { code: "lv", name: "Latvia" },
  { code: "ee", name: "Estonia" },
  { code: "hr", name: "Croatia" },
  { code: "si", name: "Slovenia" },
  { code: "kr", name: "South Korea" },
  { code: "my", name: "Malaysia" },
  { code: "cy", name: "Cyprus" },
];

// One flag tile: grayscale by default, true color on hover, name underneath.
function FlagItem({ code, name }: { code: string; name: string }) {
  return (
    <div className="group flex shrink-0 flex-col items-center gap-2.5 w-24 md:w-28">
      <div className="relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border border-white/10 shadow-md transition-all duration-300 group-hover:border-white/30 group-hover:scale-105">
        <img
          src={`https://flagcdn.com/${code}.svg`}
          alt={`${name} flag`}
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className="text-white/50 group-hover:text-white text-[11px] md:text-xs font-medium text-center leading-tight whitespace-nowrap transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

// One row of all flags; rendered twice back-to-back for a seamless infinite loop.
function Row() {
  return (
    <div className="flex shrink-0 items-start gap-6 md:gap-8 pr-6 md:pr-8">
      {COUNTRIES.map((c) => (
        <React.Fragment key={c.code}>
          <FlagItem code={c.code} name={c.name} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function CountriesMarquee() {
  return (
    <section className="relative bg-zinc-950 py-16 md:py-24 overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-10 md:mb-14 px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#60A5FA] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4"
        >
          31 destinations · one platform
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-sans font-bold tracking-tight text-white"
        >
          Countries we <span className="overseas-glow font-serif italic font-normal">work with</span>
        </motion.h2>
      </div>

      {/* Marquee — slides right → left, infinite loop, pauses on hover */}
      <div className="relative z-10 flex w-max animate-[mp-marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

      <style>{`
        @keyframes mp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
